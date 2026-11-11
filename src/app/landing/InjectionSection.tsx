import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { InjectionFeatures } from "./InjectionFeatures";
import tesamorelinIpamorelinVial from "../../assets/landing-reference/tesamorelin-ipamorelin-vial.png";
import nadInjectionVial from "../../assets/landing-reference/nad-injection-vial-v2.png";
import "./InjectionSection.css";

export function InjectionSection() {
  return <section className="injection-experience" id="care-in-motion" aria-labelledby="injection-title">
    <header className="injection-heading">
      <h1 id="injection-title">Your <em>compounding network.</em><br/>All in one platform.</h1>
    </header>
    <div className="injection-editorial-hero">
      <div className="injection-editorial-arc" aria-hidden="true">
        <svg viewBox="0 0 1600 560" preserveAspectRatio="none" focusable="false">
          <defs>
            <linearGradient id="injection-arc-line" x1="0" x2="1">
              <stop offset="0" stopColor="#8fb1d1" stopOpacity="0" />
              <stop offset=".15" stopColor="#8fb1d1" stopOpacity=".7" />
              <stop offset=".85" stopColor="#8fb1d1" stopOpacity=".7" />
              <stop offset="1" stopColor="#8fb1d1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M-40 438C360 190 1010 76 1640 28" fill="none" stroke="url(#injection-arc-line)" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        {/* HTML dots stay round however wide the stretched arc becomes. x/y are points computed on the path above. */}
        {[{ x: 133, y: 345.6, size: 7 }, { x: 377, y: 250.2, size: 9 }, { x: 1042, y: 95.9, size: 11 }, { x: 1370, y: 52.8, size: 13 }].map((orb, i) =>
          <span key={orb.x} className="injection-editorial-orb" style={{ left: `${orb.x / 16}%`, top: `${orb.y / 5.6}%`, width: orb.size, height: orb.size, animationDelay: `${i * -1.1}s` }} />)}
      </div>
      <div className="injection-editorial-art">
        <img className="injection-editorial-bottle injection-editorial-bottle-back" src={tesamorelinIpamorelinVial} alt="Tesamorelin / Ipamorelin vial" width="480" height="640" decoding="async" />
        <img className="injection-editorial-bottle injection-editorial-bottle-front" src={nadInjectionVial} alt="Nicotinamide Adenine Dinucleotide (NAD+) injection vial" width="916" height="1142" decoding="async" />
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
