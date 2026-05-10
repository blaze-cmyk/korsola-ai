import { Globe } from "lucide-react";

const cols = [
  { title: "Products", links: ["Marketing Studio", "Spaces", "AI Actors", "Avatars", "Catalog Sync", "API", "iOS App", "Android App"] },
  { title: "Get started", links: ["Academy", "Documentation", "Support", "Terms of use", "Privacy policy", "Cookies policy", "Trust center", "Affiliates"] },
  { title: "Company", links: ["Pricing", "About us", "Careers", "Search trends", "Blog", "Events", "Press room"] },
  { title: "Get in touch", links: ["Customer support", "Instagram", "YouTube", "LinkedIn", "TikTok", "Discord", "X", "Reddit"] },
];

export function LpFooter() {
  return (
    <footer className="bg-ink text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-[1.4fr_repeat(4,1fr)] gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-9 h-9 rounded-[10px] bg-white text-ink font-display font-extrabold text-lg">K</span>
              <span className="text-[15px] font-display font-extrabold tracking-[0.14em] text-white">KORSOLA</span>
            </div>
            <p className="mt-5 text-white/55 text-[13px] leading-relaxed max-w-xs">
              The Shopify-native AI ad platform. More than 18,000 brands ship UGC
              ads with Korsola.
            </p>
            <button className="mt-5 inline-flex items-center gap-1.5 px-3 h-8 rounded-md bg-white/5 border border-white/10 text-white text-[12px]">
              <Globe className="w-3.5 h-3.5" /> English
            </button>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-violet font-display font-bold text-[14px]">{c.title}</div>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-white/65 hover:text-white text-[13px]">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap justify-between gap-4 text-white/40 text-[12px]">
          <span>Copyright © 2026 Korsola.AI — All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Guides & Support</a>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Giant wordmark watermark */}
      <div className="overflow-hidden pb-6">
        <div className="text-center font-display font-extrabold tracking-tighter text-white/[0.04] select-none leading-none" style={{ fontSize: "clamp(120px, 22vw, 320px)" }}>
          korsola
        </div>
      </div>
    </footer>
  );
}
