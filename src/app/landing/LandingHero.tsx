import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ModalLayer } from "../responsive-ui";
import { Grip, X } from "lucide-react";
import "@fontsource-variable/geist";
import { landingAsset } from "./assets";
import { InjectionSection } from "./InjectionSection";
import "./LandingHero.css";
import "./LandingHeroCentered.css";

const navigation = [
  { label: "Platform", href: "#how-it-works" },
  { label: "Our pharmacies", href: "#our-partners" },
  { label: "Quality", href: "#quality" },
  { label: "Sales", href: "?view=sales" },
];

// The white cap holds until the header has scrolled by, then pulls back to reveal the gradient.
const CAP_SCROLL_START = 80;
const CAP_SCROLL_RANGE = 305;
const CAP_MIN_SCALE = { x: 0.571, y: 0.75 };
const HEADER_FLOAT_SCROLL = 50;

export function HeroBackdrop() {
  const capRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.max(0, Math.min(1, (window.scrollY - CAP_SCROLL_START) / CAP_SCROLL_RANGE));
      capRef.current!.style.transform = `scale(${1 - progress * (1 - CAP_MIN_SCALE.x)}, ${1 - progress * (1 - CAP_MIN_SCALE.y)})`;
    };
    const schedule = () => { frame ||= requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); };
  }, []);
  return (
    <div className="slrx-launch-backdrop" aria-hidden="true">
      <div className="slrx-launch-backdrop-glow" />
      <div className="slrx-launch-backdrop-stripes" />
      <div ref={capRef} className="slrx-launch-backdrop-cap" />
    </div>
  );
}

export function LandingHero({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > HEADER_FLOAT_SCROLL);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1000px)");
    const close = () => setMenuOpen(false);
    media.addEventListener("change", close);
    window.addEventListener("hashchange", close);
    return () => { media.removeEventListener("change", close); window.removeEventListener("hashchange", close); };
  }, []);

  return (
    <section id="hero" className="slrx-hero slrx-hero-centered" aria-labelledby="injection-title">
      <header className="slrx-hero-header slrx-float-header" data-scrolled={scrolled}>
        <div className="slrx-float-row">
          <div className="slrx-hero-navigation">
            <nav className="slrx-hero-desktop-links" aria-label="Main navigation">
              {navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
            </nav>
            <a className="slrx-hero-brand" href="#hero" onClick={() => setMenuOpen(false)}>
              <img alt="" aria-hidden="true" width="27" height="22" src={landingAsset("new_logo.svg")} />
              <span>Scriptlinkrx</span>
            </a>
            <div className="slrx-hero-account">
              <a className="slrx-hero-login" href="?view=login">Log in</a>
              <a className="slrx-hero-register" href="?view=register">Get started</a>
            </div>
          </div>
          <button type="button" className="slrx-hero-menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="slrx-mobile-navigation" onClick={() => setMenuOpen(open => !open)}>
            {menuOpen ? <X size={21} strokeWidth={1.6} /> : <Grip size={21} strokeWidth={1.6} />}
          </button>
        </div>
        {menuOpen && createPortal(<ModalLayer onClose={() => setMenuOpen(false)} className="landing-menu-layer fixed inset-0 flex justify-end bg-black/35" label="Main navigation">
        <nav id="slrx-mobile-navigation" className="slrx-hero-mobile-links" aria-label="Mobile navigation" onClick={event => {
          const link = (event.target as Element).closest<HTMLAnchorElement>("a");
          if (link) { event.preventDefault(); setMenuOpen(false); onNavigate(link.getAttribute("href") ?? "#hero"); }
        }}>
          <div className="slrx-mobile-menu-heading"><span>ScriptLinkRx</span><button type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)}><X size={22} /></button></div>
          {navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
          <a href="?view=login">Log in</a>
          <a href="?view=register">Get started</a>
          <a href="?view=request-demo">Request a demo</a>
        </nav>
        </ModalLayer>, document.body)}
      </header>

      <HeroBackdrop />
      <InjectionSection />
    </section>
  );
}
