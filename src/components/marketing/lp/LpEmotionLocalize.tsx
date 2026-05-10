import { ReelCard } from "./ReelCard";
import { REEL_GRADIENTS } from "./reels";

const brands = ["arcads", "Eleven", "Seedance", "Veo", "Kling"];

export function LpEmotionLocalize() {
  return (
    <section
      className="text-white pb-20 md:pb-28 relative"
      style={{
        background: "linear-gradient(180deg, #2a2a2c 0%, #141416 50%, #050505 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl bg-[#0e0e10] border border-white/10 p-7">
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-[9/16] rounded-xl relative overflow-hidden" style={{ background: REEL_GRADIENTS[3] }}>
                <span className="absolute inset-0 grid place-items-center text-white text-3xl">😲</span>
              </div>
              <div className="aspect-[9/16] rounded-xl relative overflow-hidden" style={{ background: REEL_GRADIENTS[7] }}>
                <span className="absolute bottom-3 left-3 text-white text-xs font-semibold">[Excited]</span>
              </div>
            </div>
            <h3 className="mt-5 font-display font-extrabold text-white text-2xl">
              Emotion <span className="font-serif italic font-normal">control</span>
            </h3>
            <p className="mt-2 text-white/60 text-[14px] leading-relaxed">
              You have full emotion control. Just write how you want it.
            </p>
          </div>

          <div className="rounded-3xl bg-[#0e0e10] border border-white/10 p-7 relative overflow-hidden">
            <div className="text-white/40 text-[13px] absolute top-6 left-6 select-none">Salut, ce mai faci?</div>
            <div className="text-white/40 text-[13px] absolute top-12 right-6 select-none">¿cómo estás?</div>
            <div className="text-white/40 text-[13px] absolute bottom-32 left-6 select-none">Selam, nasılsın?</div>
            <div className="text-white/40 text-[13px] absolute bottom-40 right-6 select-none">Cześć, jak się</div>
            <div className="mx-auto w-[140px] aspect-[9/16] rounded-xl relative overflow-hidden" style={{ background: REEL_GRADIENTS[8] }}>
              <span className="absolute bottom-3 inset-x-0 text-center text-white text-[10px] font-semibold">J'AI ÉTÉ MÉCANICIEN</span>
            </div>
            <p className="mt-3 text-center text-white/80 text-[13px]">French · 🇫🇷 🇬🇧 🇪🇸 🇩🇪 🇮🇹</p>
            <h3 className="mt-5 font-display font-extrabold text-white text-2xl">
              Localize in every <span className="font-serif italic font-normal">language</span>
            </h3>
            <p className="mt-2 text-white/60 text-[14px] leading-relaxed">
              Accurate translation in more than 30 languages. Reach the world.
            </p>
          </div>
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
