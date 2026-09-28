import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bell, Check, ClipboardCheck, FlaskConical, Truck, UserRound } from "lucide-react";
import { landingAsset } from "./assets";
import journey from "./journey.json";
import "./OrderJourney.css";

const steps = [
  { image: "step_1.png", icon: UserRound, label: "Patient & treatment", detail: "Care tailored to their needs" },
  { image: "step_2.png", icon: ClipboardCheck, label: "Order submitted", detail: "Sent to your pharmacy partner" },
  { image: "step_3_flask.png", icon: FlaskConical, label: "Pharmacy preparation", detail: "Compounded, checked, and ready" },
  { image: "step_4.png", icon: Truck, label: "Shipment tracking", detail: "Follow every mile in your dashboard" },
  { image: "step_5.png", icon: Bell, label: "Delivery & follow-up", detail: "Confirmations and refill reminders" },
];

export function OrderJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: .25 });
    observer.observe(element);
    const timer = window.setInterval(() => {
      if (visible && !motion.matches && !document.hidden && !element.matches(":hover, :focus-within")) {
        setIndex(value => (value + 1) % steps.length);
      }
    }, 2000);
    return () => { observer.disconnect(); window.clearInterval(timer); };
  }, []);

  return (
    <section className="slrx-journey" id="how-it-works" aria-labelledby="slrx-journey-heading">
      <header className="slrx-journey-header">
        <h2 id="slrx-journey-heading">From your practice<span>to your patient’s door.</span></h2>
        <p>One connected journey. Every step in view.</p>
      </header>

      <div className="slrx-journey-grid" ref={ref}>
        <div className="slrx-journey-story">
          <div className="slrx-journey-art" aria-hidden="true">
            {steps.map((step, stepIndex) => (
              <img key={step.image} src={landingAsset(step.image)} alt="" loading="lazy" decoding="async"
                className={stepIndex === index ? "is-active" : ""} />
            ))}
          </div>
          <div className="slrx-journey-story-copy" id="slrx-journey-detail">
            <div key={index} className="slrx-journey-copy-reveal">
              <h3>{journey[index].title}</h3>
              <p>{journey[index].description}</p>
            </div>
          </div>
        </div>

        <div className="slrx-journey-overview">
          <div className="slrx-journey-overview-header">
            <h3>Your order journey</h3>
          </div>
          <ol className="slrx-journey-timeline">
            {steps.map((step, stepIndex) => {
              const Icon = step.icon;
              const complete = stepIndex < index;
              return (
                <li key={step.label} className={`${complete ? "is-complete" : ""} ${stepIndex === index ? "is-current" : ""}`}>
                  <button type="button" onClick={() => setIndex(stepIndex)} aria-pressed={stepIndex === index} aria-controls="slrx-journey-detail">
                    <span className="slrx-journey-step-icon" aria-hidden="true">
                      {complete ? <Check size={18} strokeWidth={1.8} /> : <Icon size={18} strokeWidth={1.6} />}
                    </span>
                    <span className="slrx-journey-step-copy">
                      <span className="slrx-journey-step-title">{step.label}</span>
                      <span className="slrx-journey-step-description">{step.detail}</span>
                    </span>
                    <span className="slrx-journey-step-number" aria-hidden="true">{String(stepIndex + 1).padStart(2, "0")}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <a className="slrx-journey-demo" href="?view=request-demo">See it in action <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
