import { useCallback, useEffect, useRef, useState, type MouseEvent, type KeyboardEvent } from "react";
import { landingAsset } from "./assets";
import partners from "./partners.json";
import coverage from "./coverage-map.json";
import "./LandingPartners.css";
export { default as journeySteps } from "./journey.json";

// The public directory includes one pharmacy without a logo.
export const partnerCount = 16;

export function useLandingCarousel(count: number, gap: number, autoplay = false) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const stepWidth = useCallback(() => {
    const element = ref.current;
    return element ? (gap ? (element.firstElementChild as HTMLElement)?.offsetWidth + gap : element.clientWidth) : 0;
  }, [gap]);
  const scrollTo = useCallback((next: number) => {
    ref.current?.scrollTo({
      left: Math.max(0, Math.min(next, count - 1)) * stepWidth(),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [count, stepWidth]);
  const onScroll = () => {
    const width = stepWidth();
    if (width) setIndex(Math.max(0, Math.min(count - 1, Math.round((ref.current?.scrollLeft ?? 0) / width))));
  };

  useEffect(() => {
    const element = ref.current;
    if (!element || !autoplay) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let pressed = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.4 });
    observer.observe(element);
    const down = () => { pressed = true; };
    const up = () => { pressed = false; };
    element.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    const timer = window.setInterval(() => {
      if (!visible || pressed || document.hidden || motion.matches || element.matches(":hover, :focus-within")) return;
      const width = stepWidth();
      if (width) scrollTo((Math.round(element.scrollLeft / width) + 1) % count);
    }, 2000);
    return () => {
      observer.disconnect();
      clearInterval(timer);
      element.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [autoplay, count, scrollTo, stepWidth]);

  return { ref, index, onScroll, scrollTo };
}

function PartnerLogo({ partner, duplicate = false }: { partner: typeof partners[number]; duplicate?: boolean }) {
  const [square, setSquare] = useState(partner.square);
  return <img src={landingAsset(partner.image)} alt={duplicate ? "" : partner.name} loading="lazy" decoding="async"
    className={`slrx-trust-logo ${square ? "slrx-trust-logo-square" : ""}`}
    onLoad={event => {
      const { naturalWidth, naturalHeight } = event.currentTarget;
      setSquare(naturalHeight > 0 && naturalWidth / naturalHeight < 1.25);
    }} />;
}

export function LandingPartners() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    let visible = false;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return <section ref={sectionRef} id="our-partners" className="slrx-trust-section" aria-labelledby="slrx-trust-heading">
    <div className="slrx-trust-panel">
      <div className="slrx-trust-pharmacies">
        <h2 id="slrx-trust-heading">Trusted by leading compounding pharmacies</h2>
        <div className="slrx-trust-viewport" tabIndex={0} role="region" aria-label="Partner pharmacy logos">
          <div className="slrx-trust-track" style={{ animationPlayState: active ? "running" : "paused" }}>
            {[false, true].map(duplicate => <div key={String(duplicate)} className={`slrx-trust-logo-group${duplicate ? " slrx-trust-logo-group-copy" : ""}`} aria-hidden={duplicate || undefined}>
              {partners.map(partner => <div className="slrx-trust-logo-slot" key={partner.image}><PartnerLogo partner={partner} duplicate={duplicate} /></div>)}
            </div>)}
          </div>
        </div>
      </div>
      <dl className="slrx-trust-facts">
        {[
          { value: String(partnerCount), label: "Partner pharmacies" },
          { value: "503A", label: "Patient prescriptions" },
          { value: "503B", label: "Office-use supply" },
          { value: "1", label: "Connected platform" },
        ].map(fact => <div key={fact.label} className="slrx-trust-fact"><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
      </dl>
    </div>
    <p className="slrx-trust-disclaimer">Logos and trademarks are the property of their respective owners.</p>
  </section>;
}

const maxCount = Math.max(...coverage.states.map(state => state.partners.length), 1);
const mapClass = (name: string) => `slrx-coverage-map-section-${name}`;
type MapState = typeof coverage.states[number];
type Selection = { state: MapState; x: number; y: number };

export function LandingCoverage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selection) return;
    const dismiss = (event: globalThis.MouseEvent | globalThis.KeyboardEvent) => {
      if ((event instanceof globalThis.KeyboardEvent && event.key === "Escape") ||
        (event instanceof globalThis.MouseEvent && !contentRef.current?.contains(event.target as Node))) setSelection(null);
    };
    document.addEventListener("click", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => { document.removeEventListener("click", dismiss); document.removeEventListener("keydown", dismiss); };
  }, [selection]);

  const fill = (state: MapState) => {
    if (selection && selection.state.id === state.id) return "#244c7e";
    if (!state.partners.length) return "#edf2f7";
    const ratio = state.partners.length / maxCount;
    return ratio <= 0.34 ? "#d6e5f2" : ratio <= 0.67 ? "#b3cde4" : "#8fafd0";
  };

  function select(event: MouseEvent<SVGElement> | KeyboardEvent<SVGElement>, state: MapState) {
    if (!state.id) return;
    if ("key" in event && event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (selection?.state.id === state.id) { setSelection(null); return; }
    const rect = contentRef.current!.getBoundingClientRect();
    const target = event.currentTarget.getBoundingClientRect();
    const x = "clientX" in event ? event.clientX : target.left + target.width / 2;
    const y = "clientY" in event ? event.clientY : target.top + target.height / 2;
    setSelection({ state, x: Math.max(12, Math.min(x - rect.left, rect.width - 396)), y: Math.max(12, Math.min(y - rect.top, rect.height - 340)) });
  }

  return <section id="coverage-map" className={`slrx-section-wrapper ${mapClass("section")}`}>
    <div className={mapClass("container")}>
      <h2 className={mapClass("heading")}><span className={mapClass("heading-line")}>Proudly serving</span><span className={mapClass("heading-line")}>nationwide.</span></h2>
      <p className={mapClass("description")}>Select a state to view licensed pharmacy partners.</p>
      <div className={mapClass("map-container")}>
        <div ref={contentRef} className={mapClass("map-content")} onClick={() => setSelection(null)}>
          <div className={`${mapClass("map")} ${inView ? mapClass("map-in-view") : ""}`}>
            <svg viewBox="-30 55 820 510" width="100%" aria-label="Pharmacy coverage by state">
              {coverage.states.map(state => <path key={state.name} d={state.path} fill={fill(state)} stroke="#f8fbff" strokeWidth="1"
                className={mapClass("geography")} role={state.id ? "button" : undefined} tabIndex={state.id ? 0 : undefined}
                aria-label={`${state.name}: ${state.partners.length} pharmacies licensed`} aria-pressed={state.id ? selection?.state.id === state.id : undefined}
                onClick={event => select(event, state)} onKeyDown={event => select(event, state)} />)}
              {coverage.markers.map(marker => {
                const state = coverage.states.find(state => state.id === marker.id)!;
                return <g key={marker.id} transform={marker.transform}>
                  {marker.name ? <g className={mapClass("marker-group")} aria-hidden="true" onClick={event => select(event, state)}>
                    <circle r="10" className={mapClass("marker")} fill={fill(state)} />
                    <text textAnchor="middle" dy="3" className={mapClass("marker-text")} style={{ fill: selection?.state.id === state.id ? "#fff" : undefined }}>{marker.id}</text>
                    <text textAnchor="middle" y="24" className={mapClass("marker-label")}>{marker.name}</text>
                  </g> : <text textAnchor="middle" className={mapClass("state-label")} style={{ fill: selection?.state.id === state.id ? "#fff" : undefined }}>{marker.id}</text>}
                </g>;
              })}
            </svg>
          </div>
          {selection && <div className={mapClass("info-card")} style={{ left: selection.x, top: selection.y }} onClick={event => event.stopPropagation()} role="region" aria-labelledby="slrx-coverage-info-title">
            <div className={mapClass("info-header")}>
              <p id="slrx-coverage-info-title" className={mapClass("info-title")} aria-live="polite">{selection.state.name}</p>
              <button type="button" className={mapClass("info-close")} aria-label="Close pharmacy details" onClick={() => {
                contentRef.current?.querySelector<SVGElement>('[aria-pressed="true"]')?.focus();
                setSelection(null);
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
            </div>
            <p className={mapClass("info-count")}>{selection.state.partners.length} {selection.state.partners.length === 1 ? "pharmacy" : "pharmacies"} licensed</p>
            {selection.state.partners.length ? <ul className={mapClass("info-list")}>
              {selection.state.partners.map(name => <li className={mapClass("info-item")} key={name}>
                <span className={mapClass("info-icon")} aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" /></svg></span>
                <span><span className={mapClass("info-name")}>{name}</span><span className={mapClass("info-state")}>{selection.state.name}</span></span>
              </li>)}
            </ul> : <p className={mapClass("info-empty")}>Coming soon</p>}
          </div>}
        </div>
      </div>
    </div>
  </section>;
}
