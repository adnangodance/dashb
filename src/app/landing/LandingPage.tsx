import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Star } from "lucide-react";
import { landingAsset } from "./assets";
import { LandingHero } from "./LandingHero";
import { LandingSection, useLandingSectionMotion } from "./LandingSection";
import { FooterWordmark } from "./FooterWordmark";
import { OrderJourney } from "./OrderJourney";
import { PlatformComparison } from "./PlatformComparison";
import { QualitySection } from "./QualitySection";
import { ScrollableTabs } from "../responsive-ui";

import { LandingPartners, LandingCoverage, useLandingCarousel, partnerCount } from "./LandingInteractions";
import "./LandingPage.css";
import "./LandingResponsive.css";

type Props = { onLoginClick: () => void; onRegisterClick: () => void; onRequestDemoClick: () => void; onCatalogClick: () => void; onSalesClick: () => void };

function TestimonialRating() {
  return <span className="slrx-testimonials-rating" role="img" aria-label="5 star rating">
    {Array.from({ length: 5 }, (_, index) => <Star key={index} size={16} fill="currentColor" strokeWidth={1} aria-hidden="true" />)}
  </span>;
}

export function LandingPage({ onLoginClick, onRegisterClick, onRequestDemoClick, onCatalogClick, onSalesClick }: Props) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "ScriptLinkRx | Compounding Pharmacy Network";
    return () => { document.title = previousTitle; };
  }, []);

  const pageRef = useRef<HTMLElement>(null);
  const [showMobileCta, setShowMobileCta] = useState(false);
  useEffect(() => {
    const hero = pageRef.current?.querySelector("#hero");
    const end = pageRef.current?.querySelector("#cta");
    if (!hero || !end) return;
    let pastHero = false;
    let nearEnd = false;
    const update = () => setShowMobileCta(pastHero && !nearEnd);
    const heroObserver = new IntersectionObserver(([entry]) => { pastHero = !entry.isIntersecting && entry.boundingClientRect.bottom < 0; update(); });
    const endObserver = new IntersectionObserver(([entry]) => { nearEnd = entry.isIntersecting; update(); });
    heroObserver.observe(hero);
    endObserver.observe(end);
    return () => { heroObserver.disconnect(); endObserver.disconnect(); };
  }, []);
  useLandingSectionMotion(pageRef);

  const { ref: testimonialRef, index: testimonialIndex, onScroll: updateTestimonialIndex, scrollTo: scrollTestimonial } = useLandingCarousel(3, 22);

  function handleLinkClick(event: MouseEvent<HTMLElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") ?? "";
    const actions: Record<string, () => void> = { "?view=login": onLoginClick, "?view=register": onRegisterClick, "?view=request-demo": onRequestDemoClick, "?view=sales-catalog": onCatalogClick, "?view=sales": onSalesClick };
    if (actions[href]) { event.preventDefault(); actions[href](); window.scrollTo(0, 0); }
    else if (href.startsWith("#")) {
      event.preventDefault();
      if (href === "#hero") window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      else document.getElementById(href.slice(1))?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  }

  return (
    <main ref={pageRef} className="slrx-landing" onClick={handleLinkClick}>
      <div className="slrx-landing-intro slrx-landing-intro-centered">
        <LandingHero onNavigate={href => {
          const actions: Record<string, () => void> = { "?view=login": onLoginClick, "?view=register": onRegisterClick, "?view=request-demo": onRequestDemoClick, "?view=sales": onSalesClick };
          if (actions[href]) { actions[href](); window.scrollTo(0, 0); }
          else requestAnimationFrame(() => document.getElementById(href.slice(1))?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
        }} />
      </div>
      <LandingPartners />
      <LandingSection tone="journey">
        <OrderJourney />
      </LandingSection>
      <PlatformComparison />
      <section id="specialty-services" className="slrx-specialty-cards-section">
        <h2 className="slrx-specialty-cards-heading">
          <span className="slrx-specialty-cards-heading-line">
            {"We provide custom compounding solutions"}
          </span>
          <span className="slrx-specialty-cards-heading-line">
            {"for a wide range of specialties"}
          </span>
        </h2>
        <div className="slrx-specialty-cards-rail">
          <article className="slrx-specialty-cards-card">
            <img alt="" loading="lazy" decoding="async" className="slrx-specialty-cards-card-image" style={{"position": "absolute", "height": "100%", "width": "100%", "left": "0", "top": "0", "right": "0", "bottom": "0"}} src={landingAsset("hormone_therapy.png")} />
            <div className="slrx-specialty-cards-card-overlay" aria-hidden="true">

            </div>
            <div className="slrx-specialty-cards-card-text">
              <h3 className="slrx-specialty-cards-card-title">
                {"Hormone Therapy"}
              </h3>
              <p className="slrx-specialty-cards-card-description">
                {"Injectable, topical, and oral HRT and TRT solutions for men and women."}
              </p>
            </div>
          </article>
          <article className="slrx-specialty-cards-card">
            <img alt="" loading="lazy" decoding="async" className="slrx-specialty-cards-card-image" style={{"position": "absolute", "height": "100%", "width": "100%", "left": "0", "top": "0", "right": "0", "bottom": "0"}} src={landingAsset("weight_management.png")} />
            <div className="slrx-specialty-cards-card-overlay" aria-hidden="true">

            </div>
            <div className="slrx-specialty-cards-card-text">
              <h3 className="slrx-specialty-cards-card-title">
                {"Weight Management"}
              </h3>
              <p className="slrx-specialty-cards-card-description">
                {"Injectable and oral solutions for medically supervised weight management."}
              </p>
            </div>
          </article>
          <article className="slrx-specialty-cards-card">
            <img alt="" loading="lazy" decoding="async" className="slrx-specialty-cards-card-image" style={{"position": "absolute", "height": "100%", "width": "100%", "left": "0", "top": "0", "right": "0", "bottom": "0"}} src={landingAsset("sexual_health.png")} />
            <div className="slrx-specialty-cards-card-overlay" aria-hidden="true">

            </div>
            <div className="slrx-specialty-cards-card-text">
              <h3 className="slrx-specialty-cards-card-title">
                {"Sexual Health"}
              </h3>
              <p className="slrx-specialty-cards-card-description">
                {"Personalized treatments that help men and women restore confidence and intimacy."}
              </p>
            </div>
          </article>
          <article className="slrx-specialty-cards-card">
            <img alt="" loading="lazy" decoding="async" className="slrx-specialty-cards-card-image" style={{"position": "absolute", "height": "100%", "width": "100%", "left": "0", "top": "0", "right": "0", "bottom": "0"}} src={landingAsset("hair_skin.png")} />
            <div className="slrx-specialty-cards-card-overlay" aria-hidden="true">

            </div>
            <div className="slrx-specialty-cards-card-text">
              <h3 className="slrx-specialty-cards-card-title">
                {"Hair & Skin"}
              </h3>
              <p className="slrx-specialty-cards-card-description">
                {"Topical and oral formulations for hair restoration and healthier skin."}
              </p>
            </div>
          </article>
          <article className="slrx-specialty-cards-card">
            <img alt="" loading="lazy" decoding="async" className="slrx-specialty-cards-card-image" style={{"position": "absolute", "height": "100%", "width": "100%", "left": "0", "top": "0", "right": "0", "bottom": "0"}} src={landingAsset("general_health.png")} />
            <div className="slrx-specialty-cards-card-overlay" aria-hidden="true">

            </div>
            <div className="slrx-specialty-cards-card-text">
              <h3 className="slrx-specialty-cards-card-title">
                {"General Health & Wellness"}
              </h3>
              <p className="slrx-specialty-cards-card-description">
                {"Topical, oral, and injectable solutions for everyday wellness needs."}
              </p>
            </div>
          </article>
        </div>
      </section>
      <QualitySection />
      <section id="feedback" className="slrx-testimonials-section">
        <div className="slrx-testimonials-header">
          <h2 className="slrx-testimonials-heading">
            <span className="slrx-testimonials-heading-line">
              {"Here’s what our"}
            </span>
            <span className="slrx-testimonials-heading-line">
              {"great customers say"}
            </span>
          </h2>
          <div className="slrx-testimonials-controls">
            <ScrollableTabs activeKey={testimonialIndex} className="slrx-testimonials-dots" role="tablist" aria-label="Testimonials">
              <button type="button" role="tab" aria-selected={testimonialIndex === 0} aria-label="Testimonial from Dr. Michael Chen" className={`slrx-testimonials-dot ${testimonialIndex >= 0 ? "slrx-testimonials-dot-active" : ""}`} onClick={() => scrollTestimonial(0)}>

              </button>
              <button type="button" role="tab" aria-selected={testimonialIndex === 1} aria-label="Testimonial from Sarah Johnson" className={`slrx-testimonials-dot ${testimonialIndex >= 1 ? "slrx-testimonials-dot-active" : ""}`} onClick={() => scrollTestimonial(1)}>

              </button>
              <button type="button" role="tab" aria-selected={testimonialIndex === 2} aria-label="Testimonial from Dr. Lisa Rodriguez" className={`slrx-testimonials-dot ${testimonialIndex >= 2 ? "slrx-testimonials-dot-active" : ""}`} onClick={() => scrollTestimonial(2)}>

              </button>
            </ScrollableTabs>
            <button type="button" className="slrx-testimonials-arrow" aria-label="Previous testimonial" onClick={() => scrollTestimonial(testimonialIndex - 1)}>
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
                <path d="M6 1L1 6l5 5M1 6h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">

                </path>
              </svg>
            </button>
            <button type="button" className="slrx-testimonials-arrow" aria-label="Next testimonial" onClick={() => scrollTestimonial(testimonialIndex + 1)}>
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
                <path d="M8 1l5 5-5 5M13 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">

                </path>
              </svg>
            </button>
          </div>
        </div>
        <div className="slrx-testimonials-rail" ref={testimonialRef} onScroll={updateTestimonialIndex}>
          <figure className="slrx-testimonials-card">
            <blockquote className="slrx-testimonials-quote">
              {"I can now offer precise dermatology prescriptions without sourcing headaches. My patients get exactly what they need, when they need it."}
            </blockquote>
            <figcaption className="slrx-testimonials-card-footer">
              <div>
                <p className="slrx-testimonials-name">
                  {"Dr. Michael Chen"}
                </p>
                <p className="slrx-testimonials-role">
                  {"Dermatologist, Advanced Skin Care"}
                </p>
              </div>
              <TestimonialRating />
            </figcaption>
          </figure>
          <figure className="slrx-testimonials-card">
            <blockquote className="slrx-testimonials-quote">
              {"ScriptlinkRx cut our turnaround time by 50% and boosted client satisfaction with custom anti-aging formulas. Our clients love the results!"}
            </blockquote>
            <figcaption className="slrx-testimonials-card-footer">
              <div>
                <p className="slrx-testimonials-name">
                  {"Sarah Johnson"}
                </p>
                <p className="slrx-testimonials-role">
                  {"Med Spa Owner, Rejuvenate"}
                </p>
              </div>
              <TestimonialRating />
            </figcaption>
          </figure>
          <figure className="slrx-testimonials-card">
            <blockquote className="slrx-testimonials-quote">
              {"Since partnering with ScriptlinkRx, our weight loss clinic has expanded offerings by 30%. The custom metabolic compounds have been a game-changer for our patients."}
            </blockquote>
            <figcaption className="slrx-testimonials-card-footer">
              <div>
                <p className="slrx-testimonials-name">
                  {"Dr. Lisa Rodriguez"}
                </p>
                <p className="slrx-testimonials-role">
                  {"Director, New Life Weight Management"}
                </p>
              </div>
              <TestimonialRating />
            </figcaption>
          </figure>
        </div>
      </section>
      <section id="certifications" className="slrx-certifications-section">
        <div className="slrx-certifications-container">
          <h2 className="slrx-certifications-heading">
            <span className="slrx-certifications-heading-line">
              {"Certifications Behind Every"}
            </span>
            <span className="slrx-certifications-heading-line">
              {"Partnership"}
            </span>
          </h2>
        </div>
        <div className="slrx-certifications-band">
          <img alt="" loading="lazy" decoding="async" className="slrx-certifications-band-background" style={{"position": "absolute", "height": "100%", "width": "100%", "left": "0", "top": "0", "right": "0", "bottom": "0"}} src={landingAsset("cert-band-bg.png")} />
          <div className="slrx-certifications-logos">
            <div>
              <img alt="LegitScript Certification" loading="lazy" width="162" height="62" decoding="async" className="slrx-certifications-legit-script-logo" src={landingAsset("legitscript-logo.svg")} />
            </div>
            <div>
              <img alt="PCAB Certification" loading="lazy" width="142" height="83" decoding="async" className="slrx-certifications-pcab-logo" src={landingAsset("cert-pcab.png")} />
            </div>
            <div>
              <img alt="NABP Certification" loading="lazy" width="195" height="62" decoding="async" className="slrx-certifications-nabp-logo" src={landingAsset("cert-nabp.png")} />
            </div>
          </div>
        </div>
      </section>
      <div>
        <LandingCoverage />
      </div>
      <section className="slrx-stats-cards-section" id="stats">
        <div className="slrx-stats-cards-grid">
          <div className="slrx-stats-cards-card">
            <div className="slrx-stats-cards-card-top">
              <h3 className="slrx-stats-cards-title">
                {"Pharmacies"}
              </h3>
              <p className="slrx-stats-cards-description">
                {"Empower your pharmacy to grow and serve more patients with our all-in-one compounding platform."}
              </p>
            </div>
            <div className="slrx-stats-cards-card-bottom">
              <p className="slrx-stats-cards-value">
                {`${partnerCount}+`}
              </p>
            </div>
          </div>
          <div className="slrx-stats-cards-card">
            <div className="slrx-stats-cards-card-top">
              <h3 className="slrx-stats-cards-title">
                {"Product SKUS"}
              </h3>
              <p className="slrx-stats-cards-description">
                {"Access thousands of compounding formulas and customizable options to meet diverse patient needs."}
              </p>
            </div>
            <div className="slrx-stats-cards-card-bottom">
              <p className="slrx-stats-cards-value">
                {"5,000+"}
              </p>
            </div>
          </div>
          <div className="slrx-stats-cards-card">
            <div className="slrx-stats-cards-card-top">
              <h3 className="slrx-stats-cards-title">
                {"Clinics"}
              </h3>
              <p className="slrx-stats-cards-description">
                {"Partner with clinics nationwide and expand access to personalized compounding care."}
              </p>
            </div>
            <div className="slrx-stats-cards-card-bottom">
              <p className="slrx-stats-cards-value">
                {"1250+"}
              </p>
            </div>
          </div>
          <div className="slrx-stats-cards-card">
            <div className="slrx-stats-cards-card-top">
              <h3 className="slrx-stats-cards-title">
                {"Nationwide Access"}
              </h3>
              <p className="slrx-stats-cards-description">
                {"Deliver compliant compounding services across the country—wherever your patients are."}
              </p>
            </div>
            <div className="slrx-stats-cards-card-bottom">
              <img alt="" aria-hidden="true" loading="lazy" width="284" height="179" decoding="async" className="slrx-stats-cards-map" src={landingAsset("usa-map.png")} />
              <p className="slrx-stats-cards-value">
                {"50+"}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="slrx-cta-banner-section" id="cta">
        <div className="slrx-cta-banner-banner">
          <img alt="" loading="lazy" decoding="async" className="slrx-cta-banner-banner-image" style={{"position": "absolute", "height": "100%", "width": "100%", "left": "0", "top": "0", "right": "0", "bottom": "0"}} src={landingAsset("cta-banner.png")} />
          <div className="slrx-cta-banner-overlay" aria-hidden="true">

          </div>
          <div className="slrx-cta-banner-content">
            <h2 className="slrx-cta-banner-heading">
              <span className="slrx-cta-banner-heading-line">
                {"Ready to Simplify Pharmacy"}
              </span>
              <span className="slrx-cta-banner-heading-line">
                {"Fulfillment?"}
              </span>
            </h2>
            <p className="slrx-cta-banner-subtitle">
              {"Discover how ScriptLink can help your clinic streamline operations and expand treatment offerings."}
            </p>
            <div className="slrx-cta-banner-buttons">
              <a className="slrx-cta-banner-btn-white" href="?view=request-demo">
                {"Request Demo"}
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="slrx-footer-footer" id="footer">
        <div className="slrx-footer-top">
          <div className="slrx-footer-brand">
            <a href="https://www.legitscript.com" target="_blank" rel="noopener noreferrer" className="slrx-footer-badge-link" aria-label="LegitScript certified">
              <img alt="LegitScript Certified" loading="lazy" width="132" height="143" decoding="async" src={landingAsset("legit_script_certified.png")} />
            </a>
            <p className="slrx-footer-tagline">
              {"Simplify compounding, boost your offerings, and elevate patient care—no matter your specialty."}
            </p>
          </div>
          <div className="slrx-footer-links-area">
            <div className="slrx-footer-group">
              <p className="slrx-footer-group-label">
                {"Categories"}
              </p>
              <ul className="slrx-footer-link-list">
                <li>
                  <a className="slrx-footer-link" href="#specialty-services">
                    {"Weight Management"}
                  </a>
                </li>
                <li>
                  <a className="slrx-footer-link" href="#specialty-services">
                    {"Sexual Health"}
                  </a>
                </li>
                <li>
                  <a className="slrx-footer-link" href="#specialty-services">
                    {"Hormone Therapy"}
                  </a>
                </li>
                <li>
                  <a className="slrx-footer-link" href="#specialty-services">
                    {"Hair & Skin"}
                  </a>
                </li>
                <li>
                  <a className="slrx-footer-link" href="#specialty-services">
                    {"General Health & Wellness"}
                  </a>
                </li>
              </ul>
            </div>
            <div className="slrx-footer-group">
              <p className="slrx-footer-group-label">
                {"Main"}
              </p>
              <ul className="slrx-footer-link-list">
                <li>
                  <a className="slrx-footer-link" href="#hero">
                    {"Homepage"}
                  </a>
                </li>
                <li>
                  <a className="slrx-footer-link" href="?view=request-demo">
                    {"Request a demo"}
                  </a>
                </li>
                <li>
                  <a className="slrx-footer-link" href="?view=sales-catalog">
                    {"View Catalog"}
                  </a>
                </li>
              </ul>
            </div>
            <div className="slrx-footer-group">
              <p className="slrx-footer-group-label" aria-hidden="true">
                {"\u00a0"}
              </p>
              <ul className="slrx-footer-link-list">
                <li>
                  <a className="slrx-footer-link" href="https://scriptlinkrx.com/privacy-policy">
                    {"Privacy Policy"}
                  </a>
                </li>
                <li>
                  <a className="slrx-footer-link" href="https://scriptlinkrx.com/terms-and-services">
                    {"Terms and Services"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="slrx-footer-bottom">
          <p className="slrx-footer-copyright">
            © 2026 <a href="https://scriptlinkrx.com">ScriptLinkRx</a>. All rights reserved.
          </p>
          <div className="slrx-footer-utilities">
            <div className="slrx-footer-socials">
              <a href="https://www.linkedin.com/company/scriptlinkrx" target="_blank" rel="noopener noreferrer" className="slrx-footer-social-link" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.6">

                  </rect>
                  <path d="M7 10v7M7 7v.1M12 17v-4a2.5 2.5 0 0 1 5 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">

                  </path>
                </svg>
              </a>
              <a href="https://www.instagram.com/scriptlinkrx" target="_blank" rel="noopener noreferrer" className="slrx-footer-social-link" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6">

                  </rect>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6">

                  </circle>
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor">

                  </circle>
                </svg>
              </a>
            </div>
            <a className="slrx-footer-back-to-top" href="#hero">
              Back to top
              <span aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5m-6 6 6-6 6 6" />
                </svg>
              </span>
            </a>
          </div>
        </div>
        <FooterWordmark />
      </footer>
      {showMobileCta && <div className="slrx-mobile-cta"><a href="?view=register">Get started</a><a href="?view=request-demo">Request a demo</a></div>}
    </main>
  );
}
