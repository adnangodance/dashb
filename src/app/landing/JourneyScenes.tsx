import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { BadgeCheck, Bell, Check, Clock3, FlaskConical, MapPin, Package, Send, Star, Truck } from "lucide-react";
import { landingAsset } from "./assets";
import { partnerCount } from "./LandingInteractions";
import viosLogo from "@/assets/pharmacies/vios.png";
import dcaLogo from "@/assets/pharmacies/dca.png";
import firstChoiceLogo from "@/assets/pharmacies/first-choice.png";
import optimalLogo from "@/assets/pharmacies/optimal-balance.png";
import pharmkoLogo from "@/assets/pharmacies/pharmko.png";

const networkLogos = [firstChoiceLogo, dcaLogo, viosLogo, optimalLogo, pharmkoLogo];
import "./JourneyScenes.css";

// Illustrative product scenes for the order journey. All people and values are fictional.

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Card({ className = "", style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  return <div className={`jsc-card jsc-in ${className}`} style={style}>{children}</div>;
}

function NeedScene(_: { reduced: boolean }) {
  return <div className="jsc-scene jsc-need">
    <Card className="jsc-patient" style={delay(0)}>
      <div className="jsc-patient-head">
        <span className="jsc-avatar">AM</span>
        <div><strong>Alex M.</strong><small>New patient · Hormone therapy</small></div>
      </div>
      <div className="jsc-rx">
        <span className="jsc-label">Treatment plan</span>
        <div className="jsc-rx-row"><span>Testosterone Cypionate</span><em>Custom strength</em></div>
        <div className="jsc-rx-row jsc-rx-muted"><span>Local stock</span><b className="jsc-flag">Not available</b></div>
      </div>
    </Card>
    <div className="jsc-chip jsc-in jsc-need-chip" style={delay(650)}>
      <span className="jsc-chip-icon"><Check size={13} strokeWidth={2.6} /></span>
      Available in your network
    </div>
    <div className="jsc-orbit jsc-in" style={delay(900)} aria-hidden="true">
      <span className="jsc-orbit-logos">{networkLogos.map((src, i) => <img key={src} src={src} alt="" style={delay(1000 + i * 90)} />)}</span>
      <small>{partnerCount} partner pharmacies</small>
    </div>
  </div>;
}

function SubmitScene(_: { reduced: boolean }) {
  const rows = [["Prescriber", "Dr. R. Patel"], ["Patient", "Alex M."], ["Product", "Testosterone Cyp. · 10 mL"]];
  return <div className="jsc-scene jsc-submit">
    <Card className="jsc-form" style={delay(0)}>
      <div className="jsc-form-head"><span className="jsc-label">New order</span><span className="jsc-timer"><Clock3 size={12} /> 0:42</span></div>
      {rows.map(([label, value], i) => <div className="jsc-field" key={label} style={delay(250 + i * 380)}>
        <span>{label}</span><strong>{value}</strong><i><Check size={11} strokeWidth={3} /></i>
      </div>)}
      <div className="jsc-send" style={delay(1500)}><Send size={14} /> Send order</div>
      <span className="jsc-cursor" style={delay(1500)} aria-hidden="true" />
    </Card>
    <div className="jsc-toast jsc-in" style={delay(2300)}>
      <span className="jsc-chip-icon"><Check size={13} strokeWidth={2.6} /></span>
      <div><strong>Order sent</strong><small>Routed to partner pharmacy</small></div>
    </div>
  </div>;
}

function CompoundScene(_: { reduced: boolean }) {
  const checks = ["Compounded", "Tested", "QA-verified"];
  return <div className="jsc-scene jsc-compound">
    <div className="jsc-pedestal jsc-in" style={delay(0)}>
      <img src={landingAsset("Product-image-4.png")} alt="" decoding="async" />
      <span className="jsc-pedestal-ring" />
    </div>
    <div className="jsc-badge jsc-in" style={delay(300)}>
      <img src={viosLogo} alt="" />
      <div><strong>Partner pharmacy</strong><small>Licensed · USP-compliant</small></div>
    </div>
    <Card className="jsc-qa" style={delay(500)}>
      <span className="jsc-label"><FlaskConical size={12} /> Batch QA</span>
      {checks.map((check, i) => <div className="jsc-qa-row" key={check} style={delay(900 + i * 450)}>
        <i><Check size={10} strokeWidth={3.2} /></i>{check}
      </div>)}
    </Card>
  </div>;
}

// cubic-bezier(.55, 0, .3, 1), solved for y at time x.
function routeEase(x: number) {
  const bez = (t: number, a: number, b: number) => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3;
  let lo = 0, hi = 1;
  for (let i = 0; i < 24; i++) { const mid = (lo + hi) / 2; if (bez(mid, .55, .3) < x) lo = mid; else hi = mid; }
  return bez((lo + hi) / 2, 0, 1);
}

const ROUTE = "M44 172 C 96 172 104 112 160 112 S 236 64 300 52";
const ROUTE_END = .86; // stop short of the destination pin, still "on the way"

function TrackScene({ reduced }: { reduced: boolean }) {
  const routeRef = useRef<SVGPathElement>(null);
  const courierRef = useRef<SVGGElement>(null);

  // One clock drives both the drawn line and the courier so they never drift apart.
  useEffect(() => {
    const path = routeRef.current, courier = courierRef.current;
    if (!path || !courier) return;
    const length = path.getTotalLength();
    const place = (progress: number) => {
      const point = path.getPointAtLength(length * progress);
      courier.setAttribute("transform", `translate(${point.x} ${point.y})`);
      path.style.strokeDashoffset = String(1 - progress);
    };
    if (reduced) { place(ROUTE_END); return; }
    let frame = 0;
    const start = performance.now() + 400;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / 3400, 0), 1);
      place(routeEase(t) * ROUTE_END);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    place(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return <div className="jsc-scene jsc-track">
    <Card className="jsc-map" style={delay(0)}>
      <svg viewBox="0 0 340 210" aria-hidden="true">
        <g className="jsc-map-roads">
          <path d="M0 150 H340 M0 84 H340 M70 0 V210 M190 0 V210 M268 0 V210 M0 30 L120 210 M220 0 L340 140" />
        </g>
        <g className="jsc-map-blocks">
          <rect x="82" y="96" width="96" height="44" rx="6" /><rect x="202" y="96" width="54" height="44" rx="6" /><rect x="202" y="10" width="54" height="64" rx="6" /><rect x="10" y="10" width="48" height="64" rx="6" />
        </g>
        <path d={ROUTE} className="jsc-route-base" />
        <path ref={routeRef} d={ROUTE} className="jsc-route" pathLength={1} />
        <circle cx="44" cy="172" r="6" className="jsc-pin-start" />
        <g ref={courierRef} className="jsc-courier" transform="translate(44 172)">
          <circle r="11" className="jsc-courier-halo" />
          <circle r="6.5" className="jsc-courier-dot" />
        </g>
      </svg>
      <span className="jsc-map-pin" aria-hidden="true"><MapPin size={16} strokeWidth={2.2} /></span>
    </Card>
    <Card className="jsc-eta" style={delay(400)}>
      <div className="jsc-eta-head"><span className="jsc-chip-icon jsc-chip-blue"><Truck size={13} /></span><div><strong>In transit</strong><small>Arriving Thursday</small></div></div>
      <div className="jsc-steps"><span className="is-done">Shipped</span><span className="is-live">On the way</span><span>Delivered</span></div>
    </Card>
  </div>;
}

function FollowScene(_: { reduced: boolean }) {
  return <div className="jsc-scene jsc-follow">
    <div className="jsc-stack">
      <div className="jsc-note jsc-in" style={delay(0)}>
        <span className="jsc-note-icon jsc-note-green"><Package size={15} /></span>
        <div><strong>Delivered</strong><small>Left at front door · 2:14 PM</small></div><time>now</time>
      </div>
      <div className="jsc-note jsc-in" style={delay(550)}>
        <span className="jsc-note-icon"><Bell size={15} /></span>
        <div><strong>Refill reminder sent</strong><small>Due in 5 days · one tap to reorder</small></div><time>auto</time>
      </div>
      <div className="jsc-note jsc-note-rating jsc-in" style={delay(1100)}>
        <span className="jsc-note-icon jsc-note-gold"><Star size={15} /></span>
        <div><strong>Patient feedback</strong><span className="jsc-stars">{[0, 1, 2, 3, 4].map(i => <Star key={i} size={13} fill="currentColor" strokeWidth={0} style={delay(1400 + i * 110)} />)}</span></div>
      </div>
    </div>
    <div className="jsc-chip jsc-in jsc-follow-chip" style={delay(1700)}>
      <span className="jsc-chip-icon"><BadgeCheck size={13} strokeWidth={2.4} /></span>
      Treatment on track
    </div>
  </div>;
}

const scenes = [NeedScene, SubmitScene, CompoundScene, TrackScene, FollowScene] as const;

export function JourneyScenes({ index, reduced = false }: { index: number; reduced?: boolean }) {
  return <div className="jsc-stage" aria-hidden="true">
    <div className="jsc-stage-grid" />
    {scenes.map((Scene, i) => <div key={i} className={`jsc-layer ${i === index ? "is-active" : ""}`}>
      {/* Remount the active scene so its entrance plays every time it is shown. */}
      {i === index ? <Scene key={`on-${index}`} reduced={reduced} /> : <Scene reduced={reduced} />}
    </div>)}
  </div>;
}
