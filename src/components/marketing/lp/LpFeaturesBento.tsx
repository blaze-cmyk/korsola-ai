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
          <div className="md:row-span-2 rounded-3xl bg-bone-2 border border-line p-7 flex flex-col overflow-hidden">
            <h3 className="font-display font-extrabold text-ink text-2xl">Every tool, ready to go</h3>
            <p className="mt-3 text-ink-soft text-[14px] leading-relaxed">
              Image, video, audio, 3D — thirty tools, no setup. Open what you need,
              make what you want.
            </p>
            <div className="mt-6 flex-1 -mx-3 -mb-3 sm:-mx-4 sm:-mb-4 flex items-end justify-center min-h-[280px]">
              <img
                src="/images/tools-grid.png"
                alt="Tools grid showing image generator, video generator, video editor, and audio tools"
                loading="lazy"
                className="w-full h-auto max-h-full object-contain object-bottom select-none pointer-events-none rounded-2xl"
                draggable={false}
              />
            </div>
          </div>

          {/* Card 2 — wide dark */}
          <div className="md:col-span-2 rounded-3xl bg-ink text-white relative overflow-hidden min-h-[320px] md:min-h-[380px]">
            {/* Image pinned right */}
            <div className="absolute inset-y-0 right-0 w-full md:w-[62%]">
              <img
                src="/images/spaces-canvas.png"
                alt="Node-based canvas showing prompt connected to assistant, image generators, and a video generator"
                loading="lazy"
                className="w-full h-full object-cover object-left"
              />
              {/* Fade into ink on the left edge so text reads cleanly */}
              <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-ink via-ink/80 to-transparent pointer-events-none" />
            </div>
            {/* Text overlay */}
            <div className="relative z-10 p-7 md:p-10 max-w-md">
              <h3 className="font-display font-extrabold text-2xl md:text-3xl">
                Your entire creative process on one node-based canvas
              </h3>
              <p className="mt-3 text-white/75 text-[14px] leading-relaxed">
                All your tools. All your workflows. One infinite, node-based canvas.
                Branch ideas, compare versions, work with your team — all in Spaces.
              </p>
            </div>
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
