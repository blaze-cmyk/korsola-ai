import { ReelCard } from "./ReelCard";
import { REEL_GRADIENTS } from "./reels";
import { LpMarketingStudioCard } from "./LpMarketingStudioCard";

const brands = ["arcads", "Eleven", "Seedance", "Veo", "Kling"];

export function LpEmotionLocalize() {
  return (
    <section
      className="text-white pb-20 md:pb-28 relative"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 100%, #2a2a2e 0%, #141416 45%, #050505 100%)",
      }}
    >
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
        <div className="rounded-3xl bg-[#0e0e10] border border-white/10 p-8 md:p-12 grid md:grid-cols-2 items-center gap-8 min-h-[280px]">
          <div>
            <h3 className="font-display font-extrabold text-white text-3xl md:text-4xl tracking-tight">
              Build your own AI Agent <span className="font-serif italic font-normal">for marketing</span>
            </h3>
            <p className="mt-3 text-white/60 text-[15px] max-w-md">
              Chain models, scripts, and templates into one repeatable workflow your
              team runs in a click.
            </p>
            <div className="mt-6">
              <a href="/shopify" className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-white/10 text-white text-[14px] font-semibold border border-white/15 hover:bg-white/15">
                Create Your AI Ad ✨
              </a>
            </div>
          </div>
          {/* model cluster */}
          <div className="relative h-[200px]">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-300/40 to-violet-500/40 backdrop-blur grid place-items-center font-display font-extrabold text-white text-sm border border-white/20">
              korsola
            </div>
            {[
              { top: "0%", left: "35%", label: "S" },
              { top: "30%", left: "5%", label: "11" },
              { top: "30%", right: "5%", label: "K" },
              { bottom: "0%", left: "30%", label: "G" },
              { bottom: "5%", right: "25%", label: "V" },
            ].map((p, i) => (
              <div
                key={i}
                className="absolute w-14 h-14 rounded-2xl bg-[#1a1a1d] border border-white/10 grid place-items-center text-white font-bold"
                style={p as React.CSSProperties}
              >
                {brands[i][0]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
