const cards = [
  {
    caption: "Bring your brand in",
    body: "Drop a Shopify URL or upload your product. Korsola learns your visuals, voice and offer in seconds — no setup, no spreadsheets.",
  },
  {
    caption: "Cast, script & generate",
    body: "Pick from 1,000+ AI actors or your own avatar, choose a format, and batch UGC, try-ons, unboxings and tutorials in one click.",
  },
  {
    caption: "Get winning ads",
    body: "Export 9:16, 1:1 and 16:9 ready for Meta, TikTok and YouTube — on-brand, on-budget, no surprise bills.",
  },
];

export function LpHowItWorks() {
  return (
    <section id="how" className="bg-white py-20 md:py-28" style={{ fontFamily: "Manrope, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2
            className="font-extrabold text-[#0f0f10] tracking-tight text-4xl md:text-6xl leading-[1.05]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            One place to create{" "}
            <span className="italic font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              anything
            </span>
          </h2>
          <p className="mt-5 text-[#5b5b60] text-[17px] md:text-[19px] leading-relaxed max-w-2xl">
            Pick your starting point. Every tool, every model, every format — all in one workflow.
          </p>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.caption}>
              <div className="aspect-[4/5] rounded-[28px] bg-[#0f0f10]" />
              <div className="mt-6">
                <h3
                  className="italic text-[22px] md:text-[24px] text-[#0f0f10]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {c.caption}
                </h3>
                <p
                  className="mt-3 text-[#5b5b60] text-[15px] md:text-[16px] leading-relaxed max-w-sm"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
