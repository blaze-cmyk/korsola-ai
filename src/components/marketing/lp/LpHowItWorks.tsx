const cards = [
  {
    caption: "Choose your model",
    body: "Pick the AI model that fits your creative goal. From cinematic video to realistic product visuals.",
  },
  {
    caption: "Shape your ad",
    body: "Edit, translate, extend, subtitle, upscale and remix your video using AI tools.",
  },
  {
    caption: "Start from proven formats",
    body: "Use ready-made ad presets built for performance marketers.",
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
            Create better video ads{" "}
            <span className="italic font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              with AI
            </span>
          </h2>
          <p className="mt-5 text-[#5b5b60] text-[17px] md:text-[19px] leading-relaxed max-w-2xl">
            Forget switching between dozens of tools, complex timelines, and slow production.
            Korsola gives you everything you need to create, refine, and launch video ads with AI.
          </p>
        </div>

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
