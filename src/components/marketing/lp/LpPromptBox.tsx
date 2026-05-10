import { Sparkles } from "lucide-react";

// Placeholder — animated edit-video prompt box ships in a follow-up loop.
export function LpPromptBox() {
  return (
    <section className="bg-bone py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 h-7 rounded-full bg-violet/10 text-violet text-[11px] font-bold uppercase tracking-wider">
            Coming this week
          </span>
          <h2 className="mt-4 font-display font-extrabold text-ink tracking-tight text-3xl md:text-5xl leading-[1.05]">
            Edit any video with{" "}
            <span className="font-serif italic font-normal">a sentence</span>.
          </h2>
        </div>

        <div className="mt-10 rounded-3xl bg-ink p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(60% 60% at 50% 0%, oklch(0.58 0.22 300 / 0.4), transparent 70%)" }} />
          <div className="relative max-w-2xl mx-auto bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4">
            <div className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-2">Prompt</div>
            <p className="text-white/80 text-[15px] leading-relaxed">
              Swap the actor for someone in their 40s, change the background to a cozy
              kitchen, and add captions in French.
            </p>
            <div className="mt-4 flex items-center justify-end">
              <button className="mk-cta inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-[13px] font-bold">
                Generate <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
