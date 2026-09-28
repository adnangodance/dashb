import { ArrowUpRight } from "lucide-react";
import { landingAsset } from "./assets";
import testosteroneCypionate from "../../assets/landing-reference/testosterone-cypionate-503b.png";
import testosteroneCypionatePropionate from "../../assets/landing-reference/testosterone-cypionate-propionate-503b.png";
import "./InjectionFeatures.css";

export function InjectionFeatures() {
  return (
    <section className="injection-features" aria-label="Explore 503A and 503B products">
      <div className="injection-feature-grid">
        <article className="injection-feature-card injection-feature-catalog" aria-labelledby="injection-503a-title">
          <span className="injection-feature-category">503A</span>
          <h3 id="injection-503a-title">Personalized prescriptions<span>for individual patients</span></h3>
          <p className="injection-feature-description">Compounded medications tailored to each patient’s prescription.</p>
          <div className="injection-feature-vials">
            <img className="injection-feature-vial injection-feature-vial-back" src={landingAsset("Product-image-6.png")} alt="Glutathione vial" loading="lazy" decoding="async" width="480" height="640" />
            <img className="injection-feature-vial injection-feature-vial-front" src={landingAsset("Product-image-2.png")} alt="Tri-Mix vial" loading="lazy" decoding="async" width="960" height="1280" />
          </div>
          <a className="injection-feature-link" href="?view=sales-catalog">Explore the catalog <ArrowUpRight size={16} aria-hidden="true" /></a>
        </article>
        <article className="injection-feature-card injection-feature-practice" aria-labelledby="injection-503b-title">
          <span className="injection-feature-category">503B</span>
          <h3 id="injection-503b-title">Office-use products<span>for your practice</span></h3>
          <p className="injection-feature-description">Source medications for in-office care through our pharmacy network.</p>
          <div className="injection-feature-vials injection-feature-practice-vials">
            <img className="injection-feature-vial injection-feature-vial-back" src={testosteroneCypionate} alt="Testosterone Cypionate vial" loading="lazy" decoding="async" width="1084" height="1429" />
          </div>
          <div className="injection-card-model injection-practice-vial-main">
            <img className="injection-practice-vial-image" src={testosteroneCypionatePropionate} alt="Testosterone Cypionate / Propionate vial" loading="lazy" decoding="async" width="423" height="581" />
          </div>
          <a className="injection-feature-link" href="?view=sales-catalog">Explore the catalog <ArrowUpRight size={16} aria-hidden="true" /></a>
        </article>
      </div>
    </section>
  );
}
