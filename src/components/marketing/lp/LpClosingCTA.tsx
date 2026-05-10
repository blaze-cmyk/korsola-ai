import { ArrowRight } from "lucide-react";

export function LpClosingCTA() {
  return (
    <section className="relative h-[420px] md:h-[480px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #4c1d95 0%, #7c3aed 30%, #ec4899 60%, #f97316 100%)",
        }}
      />
      {/* faint cliff silhouette */}
      <svg viewBox="0 0 1200 480" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <path d="M0,480 L0,360 L300,340 L600,300 L850,260 L900,250 L950,260 L1000,280 L1100,310 L1200,340 L1200,480 Z" fill="rgba(0,0,0,0.45)" />
        <circle cx="900" cy="240" r="6" fill="rgba(0,0,0,0.6)" />
        <line x1="0" y1="0" x2="900" y2="240" stroke="rgba(236,72,153,0.7)" strokeWidth="2" />
        <line x1="1200" y1="0" x2="900" y2="240" stroke="rgba(236,72,153,0.7)" strokeWidth="2" />
      </svg>
      <div className="relative h-full grid place-items-center px-4 text-center">
        <div>
          <h2 className="font-display font-extrabold text-white text-5xl md:text-7xl tracking-tight">
            Be Korsola
          </h2>
          <a href="/shopify" className="mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-ink text-white text-[15px] font-semibold hover:bg-ink/85">
            Start creating <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
