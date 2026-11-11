import { useState } from "react";
import { Check, X } from "lucide-react";
import { landingAsset } from "./assets";
import { partnerCount } from "./LandingInteractions";
import firstChoice from "@/assets/pharmacies/first-choice.png";
import dca from "@/assets/pharmacies/dca.png";
import lush from "@/assets/pharmacies/lush.png";
import nationalHealthRx from "@/assets/pharmacies/national-health-rx.png";
import optimalBalance from "@/assets/pharmacies/optimal-balance.png";
import pharmko from "@/assets/pharmacies/pharmko.png";
import vios from "@/assets/pharmacies/vios.png";
import "./PlatformComparison.css";

type Mode = "old" | "connected";

const comparisons = [
  { old: `${partnerCount} pharmacies to manage`, connected: `${partnerCount} pharmacies, one network` },
  { old: `${partnerCount} logins`, connected: "1 login" },
  { old: `${partnerCount} workflows`, connected: "1 workflow" },
  { old: "Faxes, portals and phone calls", connected: "1 platform" },
  { old: "High overhead", connected: "Lower overhead" },
];

const copy = {
  old: {
    label: "The old way",
    title: ["Complex. Costly.", "Hard to scale."],
    note: "Every pharmacy you add is another portal, another invoice and another inbox to watch.",
    footer: `${partnerCount} portals · ${partnerCount} invoices`,
  },
  connected: {
    label: "With ScriptLinkRx",
    title: ["Simple. Unified.", "Built for growth."],
    note: "Same network of pharmacies, one connected workflow. Add partners without adding work.",
    footer: "One hub · every pharmacy",
  },
} as const;

// Diagram geometry (SVG viewBox 0 0 640 420).
const CLINIC = { x: 96, y: 210 };
const HUB = { x: 300, y: 210 };
const NODE_X = 500;
// Same round pharmacy icons used on catalog product cards after login.
const PHARMACY_ICONS = [
  { label: "1st Choice", src: firstChoice },
  { label: "DCA Pharmacy", src: dca },
  { label: "Lush Pharmacy", src: lush },
  { label: "National Health RX", src: nationalHealthRx },
  { label: "Optimal Balance", src: optimalBalance },
  { label: "Pharmko", src: pharmko },
  { label: "VIOS Pharmacy", src: vios },
];
const NODES = [
  ...PHARMACY_ICONS.map((icon, i) => ({ y: 42 + i * 48, ...icon })),
  { y: 42 + 7 * 48, label: `+${partnerCount - PHARMACY_ICONS.length} more`, src: undefined },
];
const CHANNELS = ["Portal", "Fax", "Phone", "Email", "Portal", "Fax", "Portal", "Email"];

const hubPath = (y: number) => `M${HUB.x + 30},${HUB.y} C${HUB.x + 120},${HUB.y} ${NODE_X - 110},${y} ${NODE_X - 18},${y}`;
// Old-way lines take deliberately uneven routes so the tangle reads at a glance.
const tanglePath = (y: number, i: number) => {
  const bend = (i % 2 ? -1 : 1) * (60 + (i % 3) * 40);
  return `M${CLINIC.x + 44},${CLINIC.y} C${190 + i * 14},${CLINIC.y + bend} ${330 - i * 10},${y - bend * .6} ${NODE_X - 18},${y}`;
};

export function PlatformComparison() {
  const [mode, setMode] = useState<Mode>("connected");
  const connected = mode === "connected";
  const content = copy[mode];

  return (
    <section className="slrx-comparison" id="old-vs-new" aria-labelledby="slrx-comparison-heading" data-mode={mode}>
      <header className="slrx-comparison-header">
        <h2 id="slrx-comparison-heading">One connection.<span>Every pharmacy.</span></h2>
        <p>Every compounding pharmacy has its own portal, fax line and pricing sheet. ScriptLinkRx brings them into one catalog, one checkout and one dashboard.</p>
        <div className="slrx-comparison-toggle" role="group" aria-label="Compare workflows">
          <span className="slrx-comparison-toggle-thumb" aria-hidden="true" />
          {(["old", "connected"] as const).map(value => <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)}>
            {copy[value].label}
          </button>)}
        </div>
      </header>

      <div className="slrx-comparison-grid">
        <figure className="slrx-comparison-diagram" aria-hidden="true">
          <svg viewBox="0 0 640 420" role="presentation">
            <defs>
              <linearGradient id="slrx-cmp-line" x1="0" x2="1">
                <stop offset="0" stopColor="#7595b5" stopOpacity=".35" />
                <stop offset="1" stopColor="#7595b5" stopOpacity=".9" />
              </linearGradient>
              <clipPath id="slrx-cmp-node-clip"><circle r="15" /></clipPath>
            </defs>

            {/* Old way: clinic wired to every pharmacy separately. */}
            <g className="slrx-cmp-old">
              {NODES.map((node, i) => <path key={i} d={tanglePath(node.y, i)} className="slrx-cmp-tangle" />)}
              {NODES.map((node, i) => i % 2 === 0 && <g key={i} transform={`translate(${398 - (i % 4) * 22},${node.y + (i ? 2 : 14)})`} className="slrx-cmp-chip">
                <rect x="-24" y="-10" width="48" height="20" rx="10" />
                <text textAnchor="middle" dy="3.5">{CHANNELS[i]}</text>
              </g>)}
            </g>

            {/* ScriptLinkRx: one line into the hub, the hub fans out. */}
            <g className="slrx-cmp-new">
              <path d={`M${CLINIC.x + 44},${CLINIC.y} L${HUB.x - 30},${HUB.y}`} className="slrx-cmp-trunk" />
              <path d={`M${CLINIC.x + 44},${CLINIC.y} L${HUB.x - 30},${HUB.y}`} className="slrx-cmp-flow" />
              {NODES.map((node, i) => <g key={i}>
                <path d={hubPath(node.y)} className="slrx-cmp-branch" />
                <path d={hubPath(node.y)} className="slrx-cmp-flow" style={{ animationDelay: `${i * -.35}s` }} />
              </g>)}
              <circle cx={HUB.x} cy={HUB.y} r="54" className="slrx-cmp-hub-ring" />
              <circle cx={HUB.x} cy={HUB.y} r="38" className="slrx-cmp-hub" />
              <image href={landingAsset("new_logo.svg")} x={HUB.x - 16} y={HUB.y - 13} width="32" height="26" className="slrx-cmp-hub-logo" />
            </g>

            <g className="slrx-cmp-clinic">
              <rect x={CLINIC.x - 54} y={CLINIC.y - 26} width="108" height="52" rx="16" />
              <text x={CLINIC.x} y={CLINIC.y + 5} textAnchor="middle">Your clinic</text>
            </g>

            {NODES.map((node, i) => <g key={i} className="slrx-cmp-node" transform={`translate(${NODE_X},${node.y})`}>
              <circle r="16" />
              {node.src
                ? <image href={node.src} x="-16" y="-16" width="32" height="32" preserveAspectRatio="xMidYMid slice" clipPath="url(#slrx-cmp-node-clip)" className="slrx-cmp-node-icon" />
                : <text className="slrx-cmp-node-rx" textAnchor="middle" dy="4">+{partnerCount - PHARMACY_ICONS.length}</text>}
              {node.src && <circle r="16" className="slrx-cmp-node-ring" />}
              <text className="slrx-cmp-node-label" x="26" dy="4">{node.label}</text>
            </g>)}
          </svg>
          <figcaption className="slrx-comparison-diagram-caption">
            <strong key={mode}>{content.title[0]} <span>{content.title[1]}</span></strong>
            <small>{content.footer}</small>
          </figcaption>
        </figure>

        <article className="slrx-comparison-card" aria-live="polite">
          <p className="slrx-comparison-label">
            {connected && <img src={landingAsset("new_logo.svg")} width="22" height="18" alt="" aria-hidden="true" />}
            {content.label}
          </p>
          <ul key={mode}>
            {comparisons.map((row, i) => <li key={row.old} style={{ animationDelay: `${i * 50}ms` }}>
              <span className="slrx-comparison-icon" aria-hidden="true">
                {connected ? <Check size={13} strokeWidth={2.4} /> : <X size={13} strokeWidth={2} />}
              </span>
              {connected ? row.connected : row.old}
            </li>)}
          </ul>
          <p className="slrx-comparison-note">{content.note}</p>
        </article>
      </div>
    </section>
  );
}
