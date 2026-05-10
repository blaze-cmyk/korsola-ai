import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { GradientCTAButton } from "./GradientCTAButton";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.jpg";

const NAV = [
  { to: "/features", label: "Features" },
  { to: "/landingpage", label: "How It Works", hash: "how" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function MarketingHeader({ overlay = false }: { overlay?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLight = overlay; // dark pill on scroll => light text in both states
  const showSolid = !overlay || scrolled;

  return (
    <header
      className={`${overlay ? "fixed" : "sticky"} left-0 right-0 z-40 transition-all duration-300 ${
        showSolid ? "top-3 px-3 sm:px-6" : "top-0"
      }`}
    >
      <div
        className={`mx-auto h-14 flex items-center justify-between transition-all duration-300 ${
          showSolid
            ? "max-w-6xl rounded-full bg-ink/70 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] px-3 sm:px-4"
            : "max-w-7xl px-4 sm:px-6 h-16"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img
            src={onLight ? logoLight : logoDark}
            alt="Korsola"
            className="w-8 h-8 object-contain"
          />
          <span className={`text-[15px] font-display font-extrabold tracking-[0.14em] ${onLight ? "text-white" : "text-ink"}`}>
            KORSOLA
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV.map((n) => (
            <Link
              key={n.to + n.label}
              to={n.to}
              className={`px-4 py-1.5 rounded-full text-[14px] font-medium transition-colors ${onLight ? "text-white/85 hover:text-white hover:bg-white/10" : "text-ink-soft hover:text-ink hover:bg-ink/5"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a href="#" className="mk-liquid-white inline-flex items-center gap-2 h-10 px-5 rounded-full text-[14px] font-semibold whitespace-nowrap">
            Login / Sign Up
          </a>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={`md:hidden grid place-items-center w-9 h-9 rounded-md ${onLight ? "text-white hover:bg-white/10" : "text-ink hover:bg-ink/5"}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {mobileOpen && (
        <nav className="md:hidden border-t border-line bg-bone/90 backdrop-blur-xl px-4 py-3 flex flex-col gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to + n.label}
              to={n.to}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-ink hover:bg-ink/5"
            >
              {n.label}
            </Link>
          ))}
          <a href="#" className="mk-liquid-purple mt-2 inline-flex items-center justify-center h-10 px-5 rounded-full text-sm font-semibold text-white">
            Login / Sign Up
          </a>
        </nav>
      )}
    </header>
  );
}
