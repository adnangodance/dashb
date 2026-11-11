import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Check, Pause, Play } from "lucide-react";
import { landingAsset } from "./assets";
import "./QualitySection.css";

const formulations = [
  { name: "NAD+", image: "Product-image-1.png" },
  { name: "Testosterone Cypionate", image: "Product-image-4.png" },
  { name: "Glutathione", image: "Product-image-6.png" },
  { name: "Nandrolone Decanoate", image: "Product-image-3.png" },
  { name: "Tri-Mix", image: "Product-image-2.png" },
  { name: "Sermorelin", image: "Product-image-5.png" },
];

// Each check points at a part of the vial. x/y are percentages of the vial image box;
// side says which way the callout label extends.
const checks = [
  { title: "Sterility", detail: "Batch checked for purity and contaminants", callout: "Solution · sterile", x: 56, y: 80, side: "right" },
  { title: "Sourcing", detail: "FDA-registered, GMP-certified ingredients", callout: "API · verified source", x: 36, y: 50, side: "left" },
  { title: "USP <797> / <800>", detail: "Aligned with compounding safety standards", callout: "Seal · USP <797>", x: 52, y: 19, side: "right" },
  { title: "Third-party testing", detail: "Independently verified before release", callout: "Lab report · 3rd party", x: 66, y: 60, side: "right" },
  { title: "Dosage form", detail: "Tailored to the patient's treatment plan", callout: "Form · injectable", x: 34, y: 72, side: "left" },
] as const;

const COUNT = formulations.length;
const STEP_ANGLE = 360 / COUNT;
const STEP_MS = 650;
const HOLD_MS = 1600;
const ROTATE_MS = 1200;
const pad = (n: number) => String(n).padStart(2, "0");
const wrap = (n: number) => ((n % COUNT) + COUNT) % COUNT;

export function QualitySection() {
  const rootRef = useRef<HTMLElement>(null);
  // `turn` keeps counting past COUNT so the ring always rotates the short way round.
  const [turn, setTurn] = useState(0);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  // False while the ring is turning, so overlays only appear once a vial reaches the front.
  const [settled, setSettled] = useState(true);
  const firstTurn = useRef(true);
  const index = wrap(turn);
  const running = visible && !reduced && !paused && settled;

  useEffect(() => {
    if (firstTurn.current) { firstTurn.current = false; return; }
    if (reduced) return;
    setSettled(false);
    const timer = window.setTimeout(() => setSettled(true), ROTATE_MS);
    return () => clearTimeout(timer);
  }, [turn, reduced]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => { setReduced(motion.matches); setVisible(inView && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); }, { threshold: .3 });
    observer.observe(root);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer.disconnect(); motion.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);

  // Inspection loop: tick each check, hold on "passed", then rotate to the next vial.
  useEffect(() => {
    if (!running) return;
    const done = step >= checks.length;
    const timer = window.setTimeout(() => {
      if (done) { setTurn(t => t + 1); setStep(0); }
      else setStep(s => s + 1);
    }, done ? HOLD_MS : STEP_MS);
    return () => clearTimeout(timer);
  }, [running, step]);

  const go = (target: number) => {
    let delta = wrap(target - index);
    if (delta > COUNT / 2) delta -= COUNT;
    setTurn(t => t + delta);
    setStep(0);
  };

  const shownStep = reduced ? checks.length : step;
  const passed = shownStep >= checks.length;
  const active = passed || !settled ? -1 : shownStep;
  const progress = shownStep / checks.length;
  const current = formulations[index];

  return (
    <section ref={rootRef} id="quality" className="slrx-lab" aria-labelledby="slrx-lab-heading"
      data-scanning={running && !passed} data-passed={passed} data-settled={settled} data-running={running}
      style={{ "--lab-turn": `${-turn * STEP_ANGLE}deg` } as CSSProperties}>
      <div className="slrx-lab-grid" aria-hidden="true" />
      <div className="slrx-lab-glow" aria-hidden="true" />

      <header className="slrx-lab-header">
        <p className="slrx-lab-kicker"><span aria-hidden="true" data-paused={!running} />Quality lab · {running ? "live inspection" : "inspection paused"}</p>
        <h2 id="slrx-lab-heading">Pharmacy-grade quality,<span>in every formulation.</span></h2>
        <p className="slrx-lab-sub">The standards behind every order, from where ingredients come from to how each batch is tested before it ships.</p>
      </header>

      <div className="slrx-lab-stage">
        <div className="slrx-lab-meta">
          <p className="slrx-lab-count"><strong>{pad(index + 1)}</strong> / {pad(COUNT)}</p>
          <h3 className="slrx-lab-name"><span key={current.name}>{current.name}</span></h3>
          <p className="slrx-lab-type">Injectable vial · compounded to order</p>
          <div className="slrx-lab-nav">
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous formulation"><ArrowLeft size={18} /></button>
            <button type="button" onClick={() => setPaused(p => !p)} aria-label={paused ? "Resume inspection" : "Pause inspection"} aria-pressed={paused} disabled={reduced}>
              {paused || reduced ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next formulation"><ArrowRight size={18} /></button>
          </div>
          <a className="slrx-lab-cta" href="?view=sales-catalog">Explore the catalog <ArrowRight size={15} aria-hidden="true" /></a>
        </div>

        <div className="slrx-lab-carousel" aria-hidden="true">
          <div className="slrx-lab-floor" />
          <div className="slrx-lab-ring">
            {formulations.map((item, i) => {
              const offset = wrap(i - index);
              const distance = Math.min(offset, COUNT - offset);
              const front = distance === 0;
              return <div key={item.name} className="slrx-lab-vial" data-distance={distance} style={{ "--lab-angle": `${i * STEP_ANGLE}deg` } as CSSProperties}>
                <div className="slrx-lab-vial-body">
                  <img src={landingAsset(item.image)} alt="" decoding="async" />
                  <img className="slrx-lab-reflection" src={landingAsset(item.image)} alt="" decoding="async" />
                  {front && <>
                    <div className="slrx-lab-scanner"><span /></div>
                    {checks.map((check, c) => <div key={check.title} className="slrx-lab-spot"
                      data-state={c < shownStep ? "done" : c === active ? "active" : "pending"} data-side={check.side}
                      style={{ left: `${check.x}%`, top: `${check.y}%` }}>
                      <i />
                      <span className="slrx-lab-callout">{check.callout}</span>
                    </div>)}
                    <div className="slrx-lab-stamp"><Check size={13} strokeWidth={3} /> Passed</div>
                  </>}
                </div>
              </div>;
            })}
          </div>
          <p className="slrx-lab-caption">{passed ? "All five checks passed" : active < 0 ? "Loading sample…" : checks[active].callout}</p>
        </div>

        <div className="slrx-lab-report">
          <div className="slrx-lab-report-head">
            <span>Inspection report</span>
            <span className="slrx-lab-status">{passed ? "All checks passed" : !settled ? "Loading sample…" : `Check ${shownStep + 1} of ${checks.length}`}</span>
          </div>
          <p className="slrx-lab-report-subject">{current.name}</p>
          <ol>
            {checks.map((check, i) => {
              const state = i < shownStep ? "done" : i === active ? "active" : "pending";
              return <li key={check.title} data-state={state}>
                <span className="slrx-lab-tick" aria-hidden="true">{state === "done" && <Check size={12} strokeWidth={3} />}</span>
                <span className="slrx-lab-check-text"><strong>{check.title}</strong><small>{check.detail}</small></span>
                <span className="slrx-lab-result" aria-hidden="true">{state === "done" ? "Pass" : state === "active" ? "…" : ""}</span>
              </li>;
            })}
          </ol>
          <div className="slrx-lab-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})`, transition: step === 0 ? "none" : undefined }} /></div>
        </div>
      </div>

      <ul className="slrx-lab-rail" aria-label="Formulations">
        {formulations.map((item, i) => <li key={item.name}>
          <button type="button" aria-pressed={i === index} onClick={() => go(i)}
            style={i === index ? { "--lab-chip": progress, ...(step === 0 ? { "--lab-chip-speed": "0s" } : {}) } as CSSProperties : undefined}>{item.name}</button>
        </li>)}
      </ul>
    </section>
  );
}
