import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { persistVideoToStorage, safeVideoKey } from "../_shared/persist_video.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-fal-webhook-request-id, x-fal-webhook-user-id, x-fal-webhook-timestamp, x-fal-webhook-signature",
};

function hex(bytes: ArrayBuffer) {
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(value: string) {
  const clean = value.trim().toLowerCase();
  if (!/^[0-9a-f]+$/.test(clean) || clean.length % 2) return null;
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return out;
}

function base64UrlToBytes(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return Uint8Array.from(atob(normalized), (c) => c.charCodeAt(0));
}

async function verifyFalSignature(req: Request, rawBody: Uint8Array) {
  const requestId = req.headers.get("x-fal-webhook-request-id");
  const userId = req.headers.get("x-fal-webhook-user-id");
  const timestamp = req.headers.get("x-fal-webhook-timestamp");
  const signature = req.headers.get("x-fal-webhook-signature");
  if (!requestId || !userId || !timestamp || !signature) return false;

  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > 300) return false;

  const signatureBytes = hexToBytes(signature);
  if (!signatureBytes) return false;

  const bodyHash = hex(await crypto.subtle.digest("SHA-256", rawBody));
  const message = new TextEncoder().encode(`${requestId}\n${userId}\n${timestamp}\n${bodyHash}`);

  const jwksResp = await fetch("https://rest.fal.ai/.well-known/jwks.json");
  if (!jwksResp.ok) return false;
  const jwks = await jwksResp.json();
  for (const key of jwks?.keys ?? []) {
    if (!key?.x) continue;
    try {
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        base64UrlToBytes(key.x),
        { name: "Ed25519" } as any,
        false,
        ["verify"],
      );
      if (await crypto.subtle.verify({ name: "Ed25519" } as any, cryptoKey, signatureBytes, message)) return true;
    } catch {
      // Try the next public key.
    }
  }
  return false;
}

function extractVideoUrl(payload: any): string | undefined {
  const raw = payload?.video?.url ?? payload?.video_url ?? payload?.url ?? payload?.output?.video?.url;
  if (typeof raw === "string") return raw;
  if (raw && typeof raw.url === "string") return raw.url;
  return undefined;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return new Response("method not allowed", { status: 405, headers: corsHeaders });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(SUPABASE_URL, SERVICE_KEY);

  try {
    const url = new URL(req.url);
    const videoId = url.searchParams.get("videoId") || undefined;
    const rawBody = new Uint8Array(await req.arrayBuffer());
    if (!(await verifyFalSignature(req, rawBody))) {
      return new Response("invalid signature", { status: 401, headers: corsHeaders });
    }

    const event = JSON.parse(new TextDecoder().decode(rawBody));
    const requestId = String(event?.request_id || "");
    if (!videoId || !requestId) return new Response("missing identifiers", { status: 400, headers: corsHeaders });

    const { data: row } = await admin
      .from("video_generations")
      .select("id, task_id, status")
      .eq("id", videoId)
      .maybeSingle();
    if (!row || row.task_id !== requestId) return new Response("ignored", { status: 200, headers: corsHeaders });

    if (event?.status === "ERROR") {
      await admin.from("video_generations").update({ status: "failed", stage: "failed", error: String(event?.error || "Fal video generation failed"), provider: "fal" }).eq("id", videoId);
      return new Response("ok", { status: 200, headers: corsHeaders });
    }

    const videoUrl = extractVideoUrl(event?.payload);
    if (!videoUrl) return new Response("no video url", { status: 200, headers: corsHeaders });

    let finalUrl = videoUrl;
    try {
      finalUrl = await persistVideoToStorage(admin, videoUrl, { key: safeVideoKey("videos", videoId) });
    } catch (e) {
      console.warn("fal webhook persist failed; storing provider URL", e);
    }
    await admin.from("video_generations").update({ status: "complete", stage: "complete", video_url: finalUrl, error: null, provider: "fal" }).eq("id", videoId);
    return new Response("ok", { status: 200, headers: corsHeaders });
  } catch (e) {
    return new Response(`webhook error: ${e instanceof Error ? e.message : "unknown"}`, { status: 500, headers: corsHeaders });
  }
});