import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const items = [
  {
    q: "Why is Korsola the best AI ad generator for Shopify and DTC brands?",
    a: "Korsola is the only platform built end-to-end for performance-driven DTC teams. One-click Shopify install auto-syncs your catalog, product photos, and brand kit — so generations stay on-brand without prompting acrobatics. Pricing is engineered for $2 ads, not $200 cinematic spots: transparent per-ad cost, no surprise overages, and a credit system that lets you ship dozens of variations per product without burning a quarterly budget. Every model, format, and template is selected and tuned against one metric: ROAS.",
  },
  {
    q: "How do I make my first ad with Korsola?",
    a: "Three steps. (1) Install Korsola from the Shopify App Store and your products sync automatically. (2) Pick a product, choose a creator avatar (or upload your own), and select a format — UGC, unboxing, try-on, tutorial, or static. (3) Hit generate. In under 90 seconds you'll have 10–20 fully-edited ad variations with hooks, captions, voiceover, and CTAs ready to download or push straight to Meta and TikTok Ads Manager.",
  },
  {
    q: "Do I need video editing or prompting experience?",
    a: "Zero. Marketing Studio handles script writing (Claude Sonnet 4.5), voiceover (ElevenLabs), captions, hook variation, pacing, and CTA placement automatically. If you want full creative control, jump into Spaces — our node-based canvas where you can chain models, branch ideas, swap actors, and remix winning ads with the rest of your team. Beginner-friendly defaults, expert-grade depth.",
  },
  {
    q: "Can I use Korsola ads on Meta, TikTok, YouTube, and Shopify storefronts?",
    a: "Yes. Every ad exports in 9:16, 1:1, and 16:9 with one click. Captions are burned in, audio is loudness-normalized to platform specs (Meta -14 LUFS, TikTok -10 LUFS), and files are encoded H.264/AAC under the per-platform size limits. You can also push directly into Meta Ads Manager and TikTok Ads Manager via native integrations — no manual download, upload, or re-encoding.",
  },
  {
    q: "How does Korsola keep my brand consistent across every ad?",
    a: "When you connect Shopify we ingest your logo, brand colors, fonts, product photography, and tone-of-voice into a persistent brand kit. Every generation — whether it's a UGC reel, a static carousel, or a unboxing video — pulls from that kit automatically. You can also lock specific avatars, voices, and visual styles per product so a returning customer recognizes your brand at a glance, even across hundreds of variations.",
  },
  {
    q: "What AI models power Korsola, and do I have to choose between them?",
    a: "We run the best model for each job behind the scenes: Seedance 2 and Kling for video, Nano Banana Pro and Flux 2 for image, Claude Sonnet 4.5 for scripts, ElevenLabs for voice. You don't pick models — you pick outcomes. Need a UGC unboxing? We route to the right stack automatically. Power users in Spaces can override every node and swap models per generation.",
  },
  {
    q: "Is my data and content safe? Do you train on my brand assets?",
    a: "Never. You own every asset Korsola generates — full commercial rights, no watermarks, no attribution required. We do not train any models on your products, prompts, or generated outputs. Infrastructure is SOC 2 Type II and GDPR compliant, with regional data residency available on Business and Enterprise plans.",
  },
  {
    q: "Is there a free trial or money-back guarantee?",
    a: "We don't offer a free plan, but new accounts get 30% off the first month on any tier. Pricing is structured so the first 5 winning ads typically pay for the entire month. If Korsola isn't a fit in the first 14 days, email us and we'll refund unused credits — no questions asked.",
  },
  {
    q: "Can my whole team work in Korsola together?",
    a: "Yes. Business plans include unlimited seats with shared credits, shared brand kits, shared avatars, and shared Spaces canvases. Your media buyer, creative director, and editor all work from the same source of truth. Role-based permissions, per-user credit limits, and SSO are available on Enterprise.",
  },
];

export function LpFaq() {
  return (
    <section className="bg-ink text-white py-24 md:py-32 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#4f3bd6]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#8b7bff]/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-display font-extrabold text-white text-5xl md:text-7xl tracking-tight leading-[1.02]">
          Frequently <span className="font-serif italic font-normal">asked</span><br />questions
        </h2>
        <p className="mt-6 text-white/60 text-[16px] max-w-md mx-auto font-body">
          Everything you need to know about shipping ads with Korsola.
        </p>

        <Accordion type="single" collapsible className="mt-14 text-left divide-y divide-white/10">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`f-${i}`} className="border-0">
              <AccordionTrigger className="py-6 text-lg font-display font-bold text-white hover:no-underline">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/65 text-base leading-relaxed pb-6 font-body">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <a href="/faq" className="inline-block mt-10 text-white/70 hover:text-white text-[14px] font-semibold transition-colors">
          See the full FAQ →
        </a>
      </div>
    </section>
  );
}
