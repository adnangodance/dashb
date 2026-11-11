import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bell, Check, ClipboardCheck, FlaskConical, Truck, UserRound } from "lucide-react";
import { JourneyScenes } from "./JourneyScenes";
import journey from "./journey.json";
import "./OrderJourney.css";

const steps = [
  { icon: UserRound, label: "Patient & treatment", detail: "Care tailored to their needs" },
  { icon: ClipboardCheck, label: "Order submitted", detail: "Sent to your pharmacy partner" },
  { icon: FlaskConical, label: "Pharmacy preparation", detail: "Compounded, checked, and ready" },
  { icon: Truck, label: "Shipment tracking", detail: "Follow every mile in your dashboard" },
  { icon: Bell, label: "Delivery & follow-up", detail: "Confirmations and refill reminders" },
];

const STEP_MS = 5200;

export function OrderJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  // Advance on a precise timer that pauses while hovered or focused, and drive the
  // current step's progress fill from the same clock.
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let elapsed = 0;
    let last = performance.now();
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: .25 });
    observer.observe(element);
    const syncMotion = () => setReduced(motion.matches);
    syncMotion();
    motion.addEventListener("change", syncMotion);
    const tick = (now: number) => {
      const running = visible && !motion.matches && !document.hidden && !element.matches(":hover, :focus-within");
      if (running) elapsed += now - last;
      last = now;
      if (elapsed >= STEP_MS) { elapsed = 0; setIndex(value => (value + 1) % steps.length); }
      timelineRef.current?.style.setProperty("--journey-progress", String(Math.min(elapsed / STEP_MS, 1)));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const reset = () => { elapsed = 0; };
    element.addEventListener("journey:reset", reset);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); motion.removeEventListener("change", syncMotion); element.removeEventListener("journey:reset", reset); };
  }, []);

  const select = (stepIndex: number) => {
    setIndex(stepIndex);
    ref.current?.dispatchEvent(new Event("journey:reset"));
  };

  return (
    <section className="slrx-journey" id="how-it-works" aria-labelledby="slrx-journey-heading">
      <header className="slrx-journey-header">
        <h2 id="slrx-journey-heading">From your practice<span>to your patient’s door.</span></h2>
        <p>One connected journey. Every step in view.</p>
      </header>

      <div className="slrx-journey-grid" ref={ref}>
        <div className="slrx-journey-story">
          <JourneyScenes index={index} reduced={reduced} />
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
            <span className="slrx-journey-counter" aria-hidden="true"><strong>{String(index + 1).padStart(2, "0")}</strong> / {String(steps.length).padStart(2, "0")}</span>
          </div>
          <ol className="slrx-journey-timeline" ref={timelineRef}>
            {steps.map((step, stepIndex) => {
              const Icon = step.icon;
              const complete = stepIndex < index;
              return (
                <li key={step.label} className={`${complete ? "is-complete" : ""} ${stepIndex === index ? "is-current" : ""}`}>
                  <button type="button" onClick={() => select(stepIndex)} aria-pressed={stepIndex === index} aria-controls="slrx-journey-detail">
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
