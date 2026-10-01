import { useState } from "react";
import { Menu, X } from "lucide-react";
import { landingAsset } from "./assets";
import nandroloneDecanoateVial from "../../assets/landing-reference/nandrolone-decanoate-vial.png";
import semaglutidePyridoxineVial from "../../assets/landing-reference/semaglutide-pyridoxine-vial.png";
import "./LandingHero.css";

const navigation = [
  { label: "Platform", href: "#how-it-works" },
  { label: "Our pharmacies", href: "#our-partners" },
  { label: "Quality", href: "#quality" },
];

export function LandingHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section id="hero" className="slrx-hero" aria-labelledby="slrx-hero-heading">
      <div className="slrx-hero-backdrop" aria-hidden="true">
        <svg className="slrx-hero-arc" viewBox="0 0 1600 560" preserveAspectRatio="none" focusable="false">
          <defs>
            <radialGradient id="slrx-hero-glow">
              <stop stopColor="#fff4ad" stopOpacity=".85" />
              <stop offset="1" stopColor="#ffe681" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M-40 438C360 190 1010 76 1640 28" fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray=".1 9" strokeLinecap="round" />
          {[{ x: 133, y: 340, r: 5 }, { x: 377, y: 232, r: 7 }, { x: 1042, y: 89, r: 9 }, { x: 1370, y: 50, r: 12 }].map(orb => (
            <g key={orb.x}>
              <circle cx={orb.x} cy={orb.y} r={orb.r * 3} fill="url(#slrx-hero-glow)" />
              <circle cx={orb.x} cy={orb.y} r={orb.r} fill="#fff1a5" />
            </g>
          ))}
        </svg>
      </div>
      <header className="slrx-hero-header">
        <div className="slrx-hero-navigation">
          <a className="slrx-hero-brand" href="#hero" onClick={() => setMenuOpen(false)}>
            <img alt="" aria-hidden="true" width="27" height="22" src={landingAsset("new_logo.svg")} />
            <span>Scriptlinkrx</span>
          </a>
          <nav className="slrx-hero-desktop-links" aria-label="Main navigation">
            {navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
          <div className="slrx-hero-account">
            <a className="slrx-hero-login" href="?view=login">Log in</a>
            <a className="slrx-hero-register" href="?view=register">Get started</a>
            <button type="button" className="slrx-hero-menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="slrx-mobile-navigation" onClick={() => setMenuOpen(open => !open)}>
              {menuOpen ? <X size={21} strokeWidth={1.6} /> : <Menu size={21} strokeWidth={1.6} />}
            </button>
          </div>
        </div>
        <nav id="slrx-mobile-navigation" className="slrx-hero-mobile-links" aria-label="Mobile navigation" hidden={!menuOpen} onClick={() => setMenuOpen(false)} onKeyDown={event => {
          if (event.key === "Escape") {
            setMenuOpen(false);
            document.querySelector<HTMLButtonElement>(".slrx-hero-menu-toggle")?.focus();
          }
        }}>
          {navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
          <a href="?view=login">Log in</a>
        </nav>
      </header>

      <div className="slrx-hero-main">
        <div className="slrx-hero-artwork" aria-hidden="true">
          <div className="slrx-hero-showcase">
            <div className="slrx-hero-stage-shadow" />
            <img className="slrx-hero-product slrx-hero-product-left" src={semaglutidePyridoxineVial} width="916" height="1142" alt="" decoding="async" />
            <img className="slrx-hero-product slrx-hero-product-right" src={nandroloneDecanoateVial} width="423" height="581" alt="" decoding="async" />
            <img className="slrx-hero-product slrx-hero-product-center" src={landingAsset("Product-image-1.png")} width="960" height="1280" alt="" decoding="async" fetchPriority="high" />
          </div>
        </div>
        <div className="slrx-hero-copy">
          <h1 id="slrx-hero-heading" className="slrx-hero-heading">
            Your compounding network.<br />All in one platform.
          </h1>
          <p className="slrx-hero-description">
            Access 503A and 503B partners, expand your treatment options, and manage every order in one place.
          </p>
          <div className="slrx-hero-actions">
            <a className="slrx-hero-secondary" href="?view=request-demo">Request a demo</a>
            <a className="slrx-hero-primary" href="?view=register">Get started</a>
          </div>
        </div>
      </div>
    </section>
  );
}
