import { ReelCard } from "./ReelCard";
import { GradientCTAButton } from "../GradientCTAButton";
import { REEL_GRADIENTS } from "./reels";

export function LpActorsBlock() {
  return (
    <section className="bg-ink text-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5">
        {/* Big hero card */}
        <div className="rounded-3xl bg-[#0e0e10] border border-white/10 p-8 md:p-12 relative overflow-hidden grid md:grid-cols-2 items-center gap-8 min-h-[360px]">
          <div>
            <h2 className="font-display font-extrabold text-white text-3xl md:text-5xl tracking-tight leading-[1.05]">
              The most realistic and{" "}
              <span className="font-serif italic font-normal">captivating AI Actors</span>
            </h2>
            <p className="mt-4 text-white/60 text-[15px] max-w-md">
              The best AI UGC library with 1,000+ AI Actors trained on real
              creators.
            </p>
            <div className="mt-6">
              <GradientCTAButton href="/shopify">Create Your AI Ad</GradientCTAButton>
            </div>
          </div>
          {/* isometric stack of reels */}
          <div className="relative h-[260px] md:h-[320px]">
            {[
              { top: "0%", left: "30%", w: "35%", rot: 8 },
              { top: "10%", left: "55%", w: "30%", rot: -10 },
              { top: "25%", left: "5%", w: "32%", rot: -6 },
              { top: "40%", left: "40%", w: "30%", rot: 4 },
              { top: "50%", left: "70%", w: "28%", rot: 12 },
            ].map((p, i) => (
              <div key={i} className="absolute" style={{ top: p.top, left: p.left, width: p.w, transform: `rotate(${p.rot}deg)` }}>
                <ReelCard gradient={REEL_GRADIENTS[i + 2]} tag="" />
              </div>
            ))}
          </div>
        </div>

        {/* 2 sub cards */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl bg-[#0e0e10] border border-white/10 p-7">
            <div className="grid grid-cols-3 gap-2">
              {REEL_GRADIENTS.slice(0, 3).map((g, i) => (
                <div key={i} className="aspect-[9/16] rounded-xl" style={{ background: g }} />
              ))}
            </div>
            <p className="mt-3 text-white/50 text-[12px] text-center">Actors holding your product · ◦ ●</p>
            <h3 className="mt-5 font-display font-extrabold text-white text-2xl">
              Create your own <span className="font-serif italic font-normal">AI Actor</span>
            </h3>
            <p className="mt-2 text-white/60 text-[14px] leading-relaxed">
              Generate a face — and make them hold your product, show your app, and
              wear your clothes.
            </p>
          </div>

          <div className="rounded-3xl bg-[#0e0e10] border border-white/10 p-7 relative">
            <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold">Soon!</span>
            <div className="grid grid-cols-2 gap-2">
              {[REEL_GRADIENTS[1], REEL_GRADIENTS[5]].map((g, i) => (
                <div key={i} className="aspect-[9/16] rounded-xl relative overflow-hidden" style={{ background: g }}>
                  {i === 1 && (
                    <span className="absolute inset-0 grid place-items-end p-3 text-white text-xs font-semibold text-center">
                      like I know the fires are over
                    </span>
                  )}
                </div>
              ))}
            </div>
            <h3 className="mt-5 font-display font-extrabold text-white text-2xl">
              AI Video <span className="font-serif italic font-normal">Editing</span>
            </h3>
            <p className="mt-2 text-white/60 text-[14px] leading-relaxed">
              Add B-rolls, music, captions and transitions in one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
