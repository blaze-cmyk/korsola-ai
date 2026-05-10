import { ArrowRight } from "lucide-react";
import { ReelCard } from "./ReelCard";
import { REEL_GRADIENTS } from "./reels";

export function LpFeaturesBento() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h2 className="font-display font-extrabold text-oxblood tracking-tight text-4xl md:text-6xl leading-[1.02] max-w-2xl">
            Start simple.<br />Scale when you're ready.
          </h2>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-oxblood/70 text-[15px] max-w-md">
              From a single tool to a complete workflow, at your own pace.
            </p>
            <a href="/shopify" className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-ink text-white text-[14px] font-semibold">
              Start creating <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 grid-rows-2 gap-4 md:auto-rows-fr">
          {/* Card 1 — tall light */}
          <div className="md:row-span-2 rounded-3xl bg-bone-2 border border-line p-7 flex flex-col">
            <h3 className="font-display font-extrabold text-ink text-2xl">Every tool, ready to go</h3>
            <p className="mt-3 text-ink-soft text-[14px] leading-relaxed">
              Image, video, audio, 3D — thirty tools, no setup. Open what you need,
              make what you want.
            </p>
            <div className="mt-6 flex-1 rounded-2xl bg-white p-4 flex flex-col gap-3">
              <div className="flex gap-2">
                {["ALL", "IMAGE", "VIDEO", "AUDIO"].map((t, i) => (
                  <span key={t} className={`px-3 h-7 rounded-full grid place-items-center text-[11px] font-bold ${i === 0 ? "bg-ink text-white" : "text-ink-soft"}`}>{t}</span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {REEL_GRADIENTS.slice(0, 4).map((g, i) => (
                  <div key={i} className="rounded-lg relative overflow-hidden aspect-square" style={{ background: g }}>
                    <span className="absolute bottom-1.5 left-1.5 text-[8px] uppercase font-bold text-white/90 tracking-wider">
                      {["Image gen", "Video gen", "Video edit", "Audio"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 — wide dark */}
          <div className="md:col-span-2 rounded-3xl bg-ink text-white p-7 relative overflow-hidden min-h-[300px]">
            <h3 className="font-display font-extrabold text-2xl max-w-md">
              Your entire creative process on one node-based canvas
            </h3>
            <p className="mt-3 text-white/70 text-[14px] max-w-md leading-relaxed">
              All your tools. All your workflows. One infinite, node-based canvas.
              Branch ideas, compare versions, work with your team — all in Spaces.
            </p>
            {/* mini node diagram */}
            <svg viewBox="0 0 400 220" className="absolute right-0 bottom-0 w-[60%] max-w-md h-auto opacity-90">
              <path d="M40,170 Q 150,170 200,100 T 360,40" stroke="#7c3aed" strokeWidth="2" fill="none" />
              <path d="M40,170 Q 150,170 220,150 T 360,180" stroke="#ec4899" strokeWidth="2" fill="none" />
              <rect x="20" y="155" width="40" height="30" rx="6" fill="#1f2937" stroke="#374151" />
              <rect x="320" y="20" width="80" height="50" rx="6" fill="url(#gA)" />
              <rect x="320" y="160" width="80" height="50" rx="6" fill="url(#gB)" />
              <defs>
                <linearGradient id="gA" x1="0" x2="1"><stop stopColor="#7c3aed" /><stop offset="1" stopColor="#3b82f6" /></linearGradient>
                <linearGradient id="gB" x1="0" x2="1"><stop stopColor="#ec4899" /><stop offset="1" stopColor="#f97316" /></linearGradient>
              </defs>
            </svg>
            <span className="absolute top-7 right-24 px-2 py-0.5 rounded bg-violet text-white text-[10px] font-bold">Paolo</span>
            <span className="absolute bottom-16 right-32 px-2 py-0.5 rounded bg-pink-500 text-white text-[10px] font-bold">Marina</span>
          </div>

          {/* Card 3 — oxblood */}
          <div className="rounded-3xl p-7 text-white relative overflow-hidden" style={{ background: "var(--mk-oxblood)" }}>
            <h3 className="font-display font-extrabold text-xl">One place, whole team</h3>
            <p className="mt-2 text-white/75 text-[14px] leading-relaxed">
              Organize brand assets, generated content, and workflows with Projects.
              Your team works together, your work stays together.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {[REEL_GRADIENTS[7], REEL_GRADIENTS[2]].map((g, i) => (
                <div key={i} className="aspect-[4/5] rounded-lg" style={{ background: g }} />
              ))}
            </div>
          </div>

          {/* Card 4 — teal */}
          <div className="rounded-3xl p-7 text-white relative overflow-hidden" style={{ background: "var(--mk-teal)" }}>
            <h3 className="font-display font-extrabold text-xl">Workflow in one click</h3>
            <p className="mt-2 text-white/75 text-[14px] leading-relaxed">
              Save any complex on-brand workflow as an App. The next person runs it
              in one click.
            </p>
            <div className="mt-6 relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden" style={{ background: REEL_GRADIENTS[3] }} />
              <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/95 text-ink text-[11px] font-extrabold tracking-wider border-2 border-pink-400">
                RUN APP
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
