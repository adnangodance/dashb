import { ArrowUpRight, Building2, Check, UserRound } from "lucide-react";
import { landingAsset } from "./assets";
import "./CompoundingSection.css";

export function CompoundingSection() {
  return (
    <section id="compounding-options" className="slrx-compounding" aria-labelledby="compounding-heading">
      <div className="slrx-compounding-header">
        <div>
          <p className="slrx-compounding-eyebrow"><span aria-hidden="true" />503A &amp; 503B NETWORK</p>
          <h2 id="compounding-heading" className="slrx-compounding-heading">
            For your patients.<br /><span>For your practice.</span>
          </h2>
        </div>
        <div className="slrx-compounding-introduction">
          <p className="slrx-compounding-intro">
            Individual prescriptions. Office-use supply. Both connected through one compounding platform.
          </p>
          <a className="slrx-compounding-link" href="?view=sales-catalog">
            Explore the catalog <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="slrx-compounding-panel">
        <div className="slrx-compounding-grid">
          <article className="slrx-compounding-card slrx-compounding-card-patient" aria-labelledby="compounding-503a">
            <div className="slrx-compounding-visual" aria-hidden="true">
              <span className="slrx-compounding-number">503A</span>
              <div className="slrx-compounding-orbit" />
              <img className="slrx-compounding-art slrx-compounding-art-patient" src={landingAsset("step_1.png")} width="275" height="351" alt="" loading="lazy" decoding="async" />
              <div className="slrx-compounding-note">
                <span className="slrx-compounding-note-icon"><UserRound size={17} strokeWidth={1.6} /></span>
                <span><strong>Made for one.</strong><span>A prescription. A patient.</span></span>
                <span className="slrx-compounding-note-check"><Check size={12} strokeWidth={2} /></span>
              </div>
            </div>
            <div className="slrx-compounding-copy">
              <h3 id="compounding-503a" className="slrx-compounding-title"><span className="slrx-compounding-type">503A</span>Personalized patient care.</h3>
              <p className="slrx-compounding-description">
                Connect with compounding pharmacies for medications tailored to each patient’s prescribed strength, dosage form, and treatment.
              </p>
            </div>
          </article>

          <article className="slrx-compounding-card slrx-compounding-card-practice" aria-labelledby="compounding-503b">
            <div className="slrx-compounding-visual" aria-hidden="true">
              <span className="slrx-compounding-number">503B</span>
              <div className="slrx-compounding-orbit" />
              <img className="slrx-compounding-art slrx-compounding-art-practice" src={landingAsset("step_4.png")} width="294" height="322" alt="" loading="lazy" decoding="async" />
              <div className="slrx-compounding-note">
                <span className="slrx-compounding-note-icon"><Building2 size={17} strokeWidth={1.6} /></span>
                <span><strong>Ready for your practice.</strong><span>Office-use supply.</span></span>
                <span className="slrx-compounding-note-check"><Check size={12} strokeWidth={2} /></span>
              </div>
            </div>
            <div className="slrx-compounding-copy">
              <h3 id="compounding-503b" className="slrx-compounding-title"><span className="slrx-compounding-type">503B</span>Support for in-office care.</h3>
              <p className="slrx-compounding-description">
                Source office-use medications through our 503B outsourcing facility network and manage supply for your practice in the same place.
              </p>
            </div>
          </article>
        </div>

        <div className="slrx-compounding-connector" aria-hidden="true">
          <img src={landingAsset("new_logo.svg")} width="28" height="23" alt="" />
        </div>

        <div className="slrx-compounding-footer">
          <div className="slrx-compounding-brand"><img src={landingAsset("new_logo.svg")} width="22" height="18" alt="" aria-hidden="true" /><span>One connected platform.</span></div>
          <p>Two ways to compound. One place to manage your orders.</p>
        </div>
      </div>
    </section>
  );
}
