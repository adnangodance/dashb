import { useLayoutEffect, type ReactNode, type RefObject } from "react";
import { sectionRevealFrame } from "./section-motion";
import "./LandingSection.css";

export function LandingSection({ children, tone = "products" }: { children: ReactNode; tone?: "products" | "journey" }) {
  return (
    <div className="slrx-section-stage" data-tone={tone}>
      <div className="slrx-section-surface">{children}</div>
    </div>
  );
}

export function useLandingSectionMotion(ref: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const stages = Array.from(root.querySelectorAll<HTMLElement>(".slrx-section-stage"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 700px)");
    let frame = 0;

    function draw() {
      frame = 0;
      if (document.hidden) return;
      // Batch geometry reads before writing styles to avoid repeated layout work.
      const updates = stages.map(stage => ({
        stage,
        ...sectionRevealFrame(stage.getBoundingClientRect().top, window.innerHeight, compact.matches),
      }));
      updates.forEach(({ stage, scale, radius, shadow, progress }) => {
        const still = reducedMotion.matches;
        stage.style.setProperty("--section-scale", String(still ? 1 : scale));
        stage.style.setProperty("--section-radius", `${still ? 0 : radius}px`);
        stage.style.setProperty("--section-shadow", String(still ? 0 : shadow));
        stage.dataset.entering = String(!still && progress > 0 && progress < 1);
      });
    }

    function schedule() {
      if (!frame && !document.hidden) frame = requestAnimationFrame(draw);
    }

    const resizeObserver = new ResizeObserver(schedule);
    stages.forEach(stage => resizeObserver.observe(stage));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    reducedMotion.addEventListener("change", schedule);
    compact.addEventListener("change", schedule);
    draw();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      reducedMotion.removeEventListener("change", schedule);
      compact.removeEventListener("change", schedule);
      stages.forEach(stage => {
        stage.style.removeProperty("--section-scale");
        stage.style.removeProperty("--section-radius");
        stage.style.removeProperty("--section-shadow");
        delete stage.dataset.entering;
      });
    };
  }, [ref]);
}
