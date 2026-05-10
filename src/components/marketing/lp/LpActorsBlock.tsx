import { ReelCard } from "./ReelCard";
import { GradientCTAButton } from "../GradientCTAButton";
import { REEL_GRADIENTS } from "./reels";

export function LpActorsBlock() {
  return (
    <section
      className="text-white py-20 md:py-28 relative"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #2a2a2e 0%, #141416 45%, #050505 100%)",
      }}
    >
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
          <div className="rounded-3xl bg-[#0e0e10] border border-white/10 p-7 w-full mx-auto flex flex-col" style={{ maxWidth: 486 }}>
            <div className="relative -mx-7 -mt-7 pt-10 pb-4 overflow-hidden rounded-t-3xl">
              {/* Top solid black band */}
              <div className="absolute inset-x-0 top-0 h-10 bg-[#0e0e10] z-20 pointer-events-none" />
              {/* Videos row — middle is hero, sides overflow & dim */}
              <div className="flex items-center justify-center gap-3 px-2">
                {["/videos/actors/actor_1.mp4", "/videos/actors/actor_2.mp4", "/videos/actors/actor_3.mp4"].map((src, i) => {
                  const isMain = i === 1;
                  return (
                    <div
                      key={i}
                      className="relative shrink-0 rounded-2xl overflow-hidden bg-black"
                      style={{
                        width: isMain ? 230 : 215,
                        aspectRatio: "9 / 16",
                        marginLeft: i === 0 ? -40 : 0,
                        marginRight: i === 2 ? -40 : 0,
                      }}
                    >
                      <video
                        src={src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                      />
                      {!isMain && (
                        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="mt-3 text-white/85 text-[13px] text-center">Actors holding your product</p>
            <div className="mt-3 flex justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/85" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
            </div>
            <h3 className="mt-6 font-display font-extrabold text-white text-2xl">
              Create your own <span className="font-serif italic font-normal">AI Actor</span>
            </h3>
            <p className="mt-2 text-white/60 text-[14px] leading-relaxed">
              Generate a face — and make them hold your product, show your app, and
              wear your clothes.
            </p>
          </div>

          <div className="rounded-3xl bg-[#0e0e10] border border-white/10 p-7 w-full mx-auto flex flex-col min-h-[623px]" style={{ maxWidth: 486 }}>
            <div className="relative -mx-7 -mt-7 h-[430px] overflow-hidden rounded-t-3xl">
              <div className="absolute inset-x-0 top-0 h-12 bg-[#0e0e10] z-20 pointer-events-none" />
              <div className="absolute left-[9%] top-[126px] sm:left-[10%] sm:top-[128px]">
                <span className="absolute left-1/2 -top-7 -translate-x-1/2 font-serif italic text-white text-[15px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] whitespace-nowrap z-10">
                  EXISTING VIDEO
                </span>
                <div className="relative rounded-2xl overflow-hidden bg-black" style={{ width: "clamp(174px, 40vw, 205px)", aspectRatio: "9 / 16" }}>
                  <video
                    src="/videos/actors/edit_1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute right-[9%] top-[66px] sm:right-[10%] sm:top-[68px]">
                <div className="relative rounded-2xl overflow-hidden bg-black" style={{ width: "clamp(174px, 40vw, 205px)", aspectRatio: "9 / 16" }}>
                  <video
                    src="/videos/actors/edit_2.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute left-1/2 -bottom-7 -translate-x-1/2 font-serif italic text-white text-[15px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] whitespace-nowrap z-10">
                  WITH YOUR PRODUCT
                </span>
              </div>
            </div>
            <div className="mt-auto">
            <h3 className="font-display font-extrabold text-white text-2xl">
              AI Video <span className="font-serif italic font-normal">Editing</span>
            </h3>
            <p className="mt-2 text-white/60 text-[14px] leading-relaxed">
              Edit any AI video — drop in your product, swap faces, tweak motion, and add B-rolls or music in one click.
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
