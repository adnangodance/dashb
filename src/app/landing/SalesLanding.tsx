import { useEffect, type MouseEvent } from "react";
import { ArrowRight, PenLine } from "lucide-react";
import "@fontsource-variable/geist";
import { landingAsset } from "./assets";
import { HeroBackdrop } from "./LandingHero";
import "./LandingPage.css";
import "./LandingHero.css";
import "./LandingHeroCentered.css";
import "./LandingResponsive.css";
import "./SalesLanding.css";

const APPLY_LINK = "?view=w9";

export function SalesLanding({ onBackToLanding, onApply }: { onBackToLanding: () => void; onApply: () => void }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Apply to the sales team | ScriptLinkRx";
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  function backToLanding(event: MouseEvent) {
    event.preventDefault();
    onBackToLanding();
  }

  function apply(event: MouseEvent) {
    event.preventDefault();
    onApply();
  }

  return (
    <main className="slrx-landing slrx-sales">
      <div className="slrx-landing-intro slrx-landing-intro-centered">
        <section id="hero" className="slrx-hero slrx-hero-centered" aria-labelledby="slrx-sales-heading">
          <header className="slrx-hero-header">
            <div className="slrx-hero-navigation">
              <a className="slrx-hero-brand" href="?view=landing" onClick={backToLanding}>
                <img alt="" aria-hidden="true" width="27" height="22" src={landingAsset("new_logo.svg")} />
                <span>Scriptlinkrx</span>
              </a>
              <div className="slrx-hero-account">
                <a className="slrx-hero-register" href={APPLY_LINK} onClick={apply}>Apply now</a>
              </div>
            </div>
          </header>

          <HeroBackdrop />
          <div className="slrx-launch-hero">
            <div className="slrx-stat-badge-slot">
              <span className="slrx-stat-badge"><strong>Application</strong> ScriptLinkRx sales team</span>
            </div>
            <h1 id="slrx-sales-heading" className="slrx-launch-heading">
              <span>You are applying to join</span><span>the <em>ScriptLinkRx sales team.</em></span>
            </h1>
            <div className="slrx-launch-pills">
              <span>Six short steps</span>
              <span><PenLine size={16} aria-hidden="true" /> W-9 and signature</span>
            </div>
            <div className="slrx-launch-field-wrap">
              <a className="slrx-launch-apply" href={APPLY_LINK} onClick={apply}>Start your application <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
            <p className="slrx-launch-description">This is your application to sell ScriptLinkRx, the platform connecting clinics with 503A and 503B compounding pharmacies.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
