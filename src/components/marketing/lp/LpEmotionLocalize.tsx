import { Sparkles } from "lucide-react";
import { ReelCard } from "./ReelCard";
import { REEL_GRADIENTS } from "./reels";
import { LpMarketingStudioCard } from "./LpMarketingStudioCard";
import { GradientCTAButton } from "../GradientCTAButton";
import agentCluster from "@/assets/lp-agent-cluster.png";

export function LpEmotionLocalize() {
  return (
    <section className="text-white pb-20 md:pb-28 relative pt-[60px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl bg-[#0e0e10] border border-white/10 p-7 w-full mx-auto flex flex-col min-h-[623px]" style={{ maxWidth: 486 }}>
            <div className="relative flex justify-center items-end gap-5 pt-6 pb-2">
              {/* Video 1 — lower position */}
              <div className="relative" style={{ marginTop: 40 }}>
                <div className="relative rounded-2xl overflow-hidden bg-black" style={{ width: "clamp(150px, 36vw, 180px)", aspectRatio: "9 / 16" }}>
                  <video
                    src="/videos/actors/motion_1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Video 2 — higher position */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden bg-black" style={{ width: "clamp(150px, 36vw, 180px)", aspectRatio: "9 / 16" }}>
                  <video
                    src="/videos/actors/motion_2.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="mt-auto pt-6">
              <h3 className="font-display font-extrabold text-white text-2xl">
                Motion <span className="font-serif italic font-normal">control</span>
              </h3>
              <p className="mt-2 text-white/60 text-[14px] leading-relaxed">
                Drop any reference clip and your AI actor mirrors the exact motion — gestures, pacing, vibe, all of it.
              </p>
            </div>
          </div>

          <LpMarketingStudioCard />
        </div>

        {/* Wide AI agent card */}
        <div className="rounded-3xl bg-[#0e0e10] border border-white/10 p-8 md:p-12 grid md:grid-cols-2 items-center gap-8 min-h-[360px] overflow-hidden">
          <div>
            <h3 className="font-display font-extrabold text-white text-3xl md:text-4xl tracking-tight">
              Scale your ad operation <span className="font-serif italic font-normal">with AI workflows</span>
            </h3>
            <p className="mt-3 text-white/60 text-[15px] max-w-md leading-relaxed">
              Connect Korsola to your entire stack. Shopify, TikTok, Meta, Slack, your ad workflow runs automatically so your team focuses on what wins.
            </p>
            <div className="mt-6">
              <a
                href="/shopify"
                className="group relative inline-flex items-center justify-center gap-2 h-12 w-[220px] rounded-full text-[15px] font-semibold text-white whitespace-nowrap overflow-hidden border border-white/40 bg-gradient-to-b from-[#cfc4ff] via-[#8b7bff] to-[#4f3bd6] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(40,20,120,0.5),0_10px_30px_rgba(99,58,232,0.55)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-2px_4px_rgba(40,20,120,0.6),0_14px_38px_rgba(99,58,232,0.7)] transition-all duration-300"
              >
                <span className="absolute top-0 left-3 right-3 h-1/2 rounded-t-full bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                <span className="relative drop-shadow-[0_1px_1px_rgba(40,20,120,0.4)]">Create Your AI Ad</span>
                <Sparkles className="relative w-4 h-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
              </a>
            </div>
          </div>
          <div className="relative flex items-center justify-center min-h-[260px]">
            <img
              src={agentCluster}
              alt="Korsola connected with Shopify, TikTok, Slack and more"
              className="w-full max-w-[520px] h-auto object-contain select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
