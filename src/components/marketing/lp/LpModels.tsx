const featured = [
  { name: "Seedance 2.0", desc: "Videos with sharp motion and precise prompt control.", brand: "S", grad: "linear-gradient(135deg,#1e293b,#7c3aed)" },
  { name: "Lyria 3", desc: "Studio-quality music generation in any style or genre.", brand: "L", grad: "linear-gradient(135deg,#ec4899,#fde68a)" },
  { name: "Nano Banana Pro", desc: "Advanced image generation with high detail and consistency.", brand: "G", grad: "linear-gradient(135deg,#fbbf24,#f97316)" },
  { name: "Veo 3.1", desc: "Flawless audio-video sync with style and character control.", brand: "V", grad: "linear-gradient(135deg,#0ea5e9,#a855f7)" },
  { name: "Eleven v3", desc: "Dramatic voiceovers for creative control and experimentation.", brand: "E", grad: "linear-gradient(135deg,#8b5cf6,#ec4899)" },
  { name: "Kling 2.5", desc: "Cinematic motion with reference-image fidelity.", brand: "K", grad: "linear-gradient(135deg,#10b981,#0ea5e9)" },
];

export function LpModels() {
  return (
    <section className="bg-ink text-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-white font-display font-extrabold text-2xl md:text-3xl">
          Explore featured models
        </h2>

        <div className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((m) => (
            <div
              key={m.name}
              className="snap-start shrink-0 w-[300px] md:w-[340px] aspect-[5/4] rounded-2xl relative overflow-hidden border border-white/10"
              style={{ background: m.grad }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-2">
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-white text-black text-xs font-extrabold">
                    {m.brand}
                  </span>
                  <span className="font-display font-bold text-white text-lg">{m.name}</span>
                </div>
                <p className="mt-2 text-white/80 text-[13px] leading-snug">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-paper p-10 md:p-16 text-center">
          <h3 className="font-display font-extrabold text-oxblood text-3xl md:text-5xl tracking-tight max-w-2xl mx-auto leading-[1.05]">
            With all the latest models
          </h3>
          <p className="mt-5 text-oxblood/70 text-[16px] md:text-[18px] max-w-xl mx-auto leading-relaxed">
            Get access to the world's leading AI companies so you never have to choose
            between the best models and the easiest workflow.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3 max-w-3xl mx-auto">
            {[
              "linear-gradient(135deg,#fce7f3,#a78bfa)",
              "linear-gradient(135deg,#94a3b8,#1e293b)",
              "linear-gradient(135deg,#0ea5e9,#1e3a8a)",
            ].map((g, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-2xl relative overflow-hidden"
                style={{ background: g }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-white font-semibold text-sm">
                  {["GPT 2", "Nano Banana 2", "Veo 3.1"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
