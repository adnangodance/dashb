import { Check, X } from "lucide-react";
import { landingAsset } from "./assets";
import { partnerCount } from "./LandingInteractions";
import "./PlatformComparison.css";

const comparisons = [
  { old: `${partnerCount} pharmacies`, connected: `${partnerCount} pharmacies` },
  { old: `${partnerCount} logins`, connected: "1 login" },
  { old: `${partnerCount} workflows`, connected: "1 workflow" },
  { old: "Multiple vendors", connected: "1 platform" },
  { old: "High overhead", connected: "Lower overhead" },
];

export function PlatformComparison() {
  return (
    <section className="slrx-comparison" id="old-vs-new" aria-label="The old way compared with ScriptLinkRx">
      <div className="slrx-comparison-grid">
        <article className="slrx-comparison-card slrx-comparison-old">
          <p className="slrx-comparison-label">The old way</p>
          <h2>Complex. Costly.<span>Hard to scale.</span></h2>
          <ul>
            {comparisons.map(row => <li key={row.old}>
              <span className="slrx-comparison-icon" aria-hidden="true"><X size={14} strokeWidth={1.7} /></span>
              {row.old}
            </li>)}
          </ul>
        </article>

        <div className="slrx-comparison-divider" aria-hidden="true"><span>vs</span></div>

        <article className="slrx-comparison-card slrx-comparison-connected">
          <p className="slrx-comparison-label">
            <img src={landingAsset("new_logo.svg")} width="24" height="19" alt="" aria-hidden="true" />
            The ScriptLinkRx way
          </p>
          <h2>Simple. Unified.<span>Built for growth.</span></h2>
          <ul>
            {comparisons.map(row => <li key={row.connected}>
              <span className="slrx-comparison-icon" aria-hidden="true"><Check size={15} strokeWidth={1.8} /></span>
              {row.connected}
            </li>)}
          </ul>
        </article>
      </div>
    </section>
  );
}
