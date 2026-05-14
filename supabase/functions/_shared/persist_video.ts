// Persists a remote (often presigned, short-lived) video URL into our own
// public Supabase Storage bucket so download links never expire.

export async function persistVideoToStorage(
  admin: any,
  sourceUrl: string,
  opts: { bucket?: string; key: string },
): Promise<string> {
  const bucket = opts.bucket || "ms-videos";
  const res = await fetch(sourceUrl);
  if (!res.ok) throw new Error(`fetch upstream video failed: ${res.status}`);
  const contentType = res.headers.get("content-type") || "video/mp4";
  const buf = new Uint8Array(await res.arrayBuffer());
  const { error } = await admin.storage.from(bucket).upload(opts.key, buf, {
    contentType,
    upsert: true,
  });
  if (error) throw new Error(`storage upload failed: ${error.message}`);
  const { data } = admin.storage.from(bucket).getPublicUrl(opts.key);
  if (!data?.publicUrl) throw new Error("no public url");
  return data.publicUrl;
}

export function safeVideoKey(prefix: string, id: string) {
  const cleanId = id.replace(/[^a-z0-9-]+/gi, "-");
  const ts = Date.now();
  return `${prefix}/${cleanId}-${ts}.mp4`;
}
