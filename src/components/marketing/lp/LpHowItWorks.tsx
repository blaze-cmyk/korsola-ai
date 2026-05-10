import { ReelCard } from "./ReelCard";
import { REEL_GRADIENTS } from "./reels";

const steps = [
  {
    n: "01",
    eyebrow: "Connect",
    title: "Drop your Shopify product URL",
    body: "We auto-pull every image, price, and detail. No setup, no spreadsheets.",
    grad: REEL_GRADIENTS[2],
  },
  {
    n: "02",
    eyebrow: "Generate",
    title: "Pick an AI actor and a script",
    body: "10–20 UGC variations in one batch — voiceover, captions, hook, CTA, all done.",
    grad: REEL_GRADIENTS[0],
  },
  {
    n: "03",
    eyebrow: "Ship",
    title: "Download and launch",
    body: "Export 9:16, 1:1, 16:9. Plug straight into Meta, TikTok, and YouTube ads.",
    grad: REEL_GRADIENTS[5],
  },
];

export function LpHowItWorks() {
  return (
    <section id="how" className="bg-paper py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display font-extrabold text-ink tracking-tight text-4xl md:text-6xl leading-[1.05]">
            From Shopify URL to{" "}
            <span className="font-serif italic font-normal">scroll-stopping ad</span>{" "}
            in 90 seconds.
          </h2>
          <p className="mt-4 text-ink-soft text-[16px] md:text-[18px]">
            No vendor chain. No creator wait. No surprise bills.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="rounded-3xl bg-white border border-line p-3 mk-card">
              <ReelCard gradient={s.grad} caption={s.eyebrow.toUpperCase()} tag={`STEP ${s.n}`} />
              <div className="px-3 py-5">
                <div className="text-[11px] uppercase tracking-wider text-ink-soft font-semibold">
                  {s.eyebrow}
                </div>
                <h3 className="mt-1 font-display font-extrabold text-ink text-xl">
                  {s.title}
                </h3>
                <p className="mt-2 text-ink-soft text-[14px] leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
