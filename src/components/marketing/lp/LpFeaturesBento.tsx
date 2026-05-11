import { ArrowRight } from "lucide-react";
import { ReelCard } from "./ReelCard";
import { REEL_GRADIENTS } from "./reels";
import workflowBubbles from "@/assets/workflow-bubbles.png";

export function LpFeaturesBento() {
  return (
    <section className="bg-paper py-20 md:py-28 bg-white">
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

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {/* Card 1 — tall light */}
          <div className="md:row-span-2 md:h-[928px] rounded-3xl border border-line p-7 flex flex-col overflow-hidden border-[#e3e3e3] bg-[#e3e3e3]">
            <h3 className="font-display font-extrabold text-ink text-2xl">Every tool, ready to generate.</h3>
            <p className="mt-3 text-ink-soft text-[14px] leading-relaxed">
              Image, video, motion control, editing. Every model, zero setup. Open
              what you need, run what converts.
            </p>
            <div className="mt-6 flex-1 flex items-end justify-end -mr-12 -mb-7 min-h-[280px] overflow-hidden px-px pr-0 pl-[77px]">
              <img
                src="/images/tools-grid.png"
                alt="Tools grid showing image generator, video generator, video editor, and audio tools"
                loading="lazy"
                className="w-[125%] h-auto max-w-none object-contain object-bottom rounded-2xl select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Card 2 — wide dark */}
          <div className="md:col-span-2 rounded-3xl bg-ink text-white relative overflow-hidden min-h-[320px] md:h-[400px] md:self-start">
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

          {/* Card 3 — video bg */}
          <div className="rounded-3xl p-7 text-white relative overflow-hidden border-[#e3e3e3] min-h-[320px] md:h-[512px] md:max-w-[391px] md:w-full" style={{ background: "var(--mk-oxblood)" }}>
            <video
              src="/videos/creative-suite-spaces.webm"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10">
              <h3 className="font-display font-extrabold text-xl">One place, whole team</h3>
              <p className="mt-2 text-white/85 text-[14px] leading-relaxed">
                Shared credits, shared avatars, shared brand assets. Your media buyer and creative director work from the same platform. Your brand stays consistent across every ad.
              </p>
            </div>
          </div>

          {/* Card 4 — teal */}
          <div className="rounded-3xl p-7 text-white relative overflow-hidden border-[#e3e3e3] min-h-[320px] md:h-[512px] md:max-w-[391px] md:w-full" style={{ background: "var(--mk-teal)" }}>
            <img
              src={workflowBubbles}
              alt="Korsola workflow connecting Meta, TikTok, ChatGPT, Google, Slack, Shopify, Claude, Seedance, and Kling"
              loading="lazy"
              className="absolute inset-x-0 bottom-0 w-full h-auto select-none pointer-events-none object-cover object-bottom"
              draggable={false}
            />
            <div className="relative z-10">
              <h3 className="font-display font-extrabold text-xl">Your winning workflow. One click.</h3>
              <p className="mt-2 text-white/75 text-[14px] leading-relaxed">
                Build your UGC generation flow once. Save it as a template. Every new product runs through it in one click — no rebriefing, no starting over.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
