import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const items = [
  { q: "Why is Korsola the best AI ad generator for Shopify brands?", a: "We're the only platform built specifically for DTC: one-click Shopify install, auto-catalog sync, and a credit system priced for $2 ads — not $200 ads. Every feature is tuned for ROAS, not cinematic vanity." },
  { q: "How do I make my first ad with Korsola?", a: "Install on Shopify, paste a product URL, pick an actor and a script template, and hit generate. You'll have 10–20 ad variations in under 90 seconds." },
  { q: "Do I need any video editing experience?", a: "No. The Marketing Studio handles script, voiceover, captions, hook, and CTA automatically. Spaces lets you go deeper if you want to." },
  { q: "Can I use Korsola ads on Meta and TikTok?", a: "Yes. Export 9:16, 1:1, and 16:9 in one click. Captions are baked in, audio is normalized for ad platforms." },
  { q: "Is there a free trial?", a: "No free plan, no trial — but your first month is 30% off any plan, and we're priced so the first 5 ads pay for the entire month." },
];

export function LpFaq() {
  return (
    <section className="bg-ink text-white py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display font-extrabold text-white text-5xl md:text-7xl tracking-tight leading-[1.02]">
          Frequently asked<br />questions
        </h2>
        <p className="mt-6 text-white/60 text-[16px] max-w-md mx-auto">
          Everything you need to know about shipping ads with Korsola.
        </p>

        <Accordion type="single" collapsible className="mt-14 text-left divide-y divide-white/10">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`f-${i}`} className="border-0">
              <AccordionTrigger className="py-6 text-lg font-display font-bold text-white hover:no-underline">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/60 text-base leading-relaxed pb-6">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <a href="/faq" className="inline-block mt-10 text-white/70 hover:text-white text-[14px] font-semibold">
          See the full FAQ →
        </a>
      </div>
    </section>
  );
}
