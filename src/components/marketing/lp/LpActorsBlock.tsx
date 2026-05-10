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
        <div className="rounded-3xl bg-[#0e0e10] border border-white/10 p-8 md:p-12 relative overflow-hidden grid md:grid-cols-[1fr_auto] items-center gap-8 min-h-[260px]">
          <div>
            <h2 className="font-serif font-normal text-white text-3xl md:text-5xl tracking-tight leading-[1.05]">
              The most realistic and captivating AI videos
            </h2>
            <p className="mt-4 text-white/60 text-[15px] max-w-2xl">
              Motion control, video generation, image studio, emotional control, AI editing. Every creative tool your brand needs, in one place. Use 1,000+ ready-made avatars or upload one photo and build your own.
            </p>
          </div>
          <div className="md:justify-self-end">
            <GradientCTAButton href="/shopify">Create Your AI Ad</GradientCTAButton>
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
            <div className="relative flex justify-center items-center gap-5 pt-6 pb-2">
              {/* Video 1 */}
              <div className="relative pb-7">
                <div className="relative rounded-2xl overflow-hidden bg-black" style={{ width: "clamp(170px, 42vw, 215px)", aspectRatio: "9 / 16" }}>
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
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 font-serif italic text-white text-[15px] whitespace-nowrap">
                  EXISTING VIDEO
                </span>
              </div>
              {/* Video 2 */}
              <div className="relative pb-7">
                <div className="relative rounded-2xl overflow-hidden bg-black" style={{ width: "clamp(170px, 42vw, 215px)", aspectRatio: "9 / 16" }}>
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
                <span className="absolute left-1/2 bottom-0 -translate-x-1/2 font-serif italic text-white text-[15px] whitespace-nowrap">
                  WITH YOUR PRODUCT
                </span>
              </div>
            </div>
            <div className="mt-auto pt-6">
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
