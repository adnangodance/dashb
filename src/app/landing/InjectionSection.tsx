import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { InjectionFeatures } from "./InjectionFeatures";
import tesamorelinIpamorelinVial from "../../assets/landing-reference/tesamorelin-ipamorelin-vial.png";
import nadInjectionVial from "../../assets/landing-reference/nad-injection-vial-v2.png";
import "./InjectionSection.css";

export function InjectionSection() {
  return <section className="injection-experience" id="care-in-motion" aria-labelledby="injection-title">
    <header className="injection-heading">
      <h2 id="injection-title">503A &amp; 503B products.<br/>For your patients and your practice.</h2>
    </header>
    <div className="injection-editorial-hero">
      <svg className="injection-editorial-arc" viewBox="0 0 1600 560" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="injection-editorial-glow">
            <stop stopColor="#f7ffff" stopOpacity=".85" />
            <stop offset="1" stopColor="#a1d9dc" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M-40 438C360 190 1010 76 1640 28" fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray=".1 9" strokeLinecap="round" />
        {[{ x: 133, y: 340, r: 5 }, { x: 377, y: 232, r: 7 }, { x: 1042, y: 89, r: 9 }, { x: 1370, y: 50, r: 12 }].map(orb => <g key={orb.x}>
          <circle cx={orb.x} cy={orb.y} r={orb.r * 3} fill="url(#injection-editorial-glow)" />
          <circle cx={orb.x} cy={orb.y} r={orb.r} fill="#f7ffff" />
        </g>)}
      </svg>
      <div className="injection-editorial-art">
        <img className="injection-editorial-bottle injection-editorial-bottle-back" src={tesamorelinIpamorelinVial} alt="Tesamorelin / Ipamorelin vial" width="480" height="640" loading="lazy" decoding="async" />
        <img className="injection-editorial-bottle injection-editorial-bottle-front" src={nadInjectionVial} alt="Nicotinamide Adenine Dinucleotide (NAD+) injection vial" width="916" height="1142" loading="lazy" decoding="async" />
      </div>
      <div className="injection-editorial-actions">
        <a className="injection-editorial-start" href="?view=register">Get started</a>
        <a className="injection-editorial-explore" href="?view=sales-catalog">Explore the catalog</a>
      </div>
    </div>
    <InjectionFeatures />
  </section>;
}

export default function InjectionPreview() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Care in motion | ScriptLinkRx";
    return () => { document.title = previous; };
  }, []);
  return <main className="injection-preview">
    <div className="injection-preview-bar"><a href="?view=landing">ScriptLink<span>Rx</span></a><a href="?view=landing">Back to home <ArrowUpRight size={15}/></a></div>
    <InjectionSection />
    <footer className="injection-preview-footer"><span>Thoughtfully connected.<br/>From practice to patient.</span><a href="?view=landing">Discover ScriptLinkRx <ArrowUpRight size={20}/></a></footer>
  </main>;
}
