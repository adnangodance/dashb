import { useEffect, useRef, useState } from "react";
import { injectionProgress } from "./injection-motion";
import { landingAsset } from "./assets";
import type { InjectionScene } from "./injection-scene";

export function BottleModel() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = canvasRef.current!;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const modelRequest = new AbortController();
    let disposed = false;
    let scene: InjectionScene | undefined;
    let frame = 0;
    let target = 0;
    let current = 0;
    let visible = false;
    let loading = false;
    let previousTime = 0;

    const paint = (time: number) => {
      frame = 0;
      const elapsed = Math.min(64, time - (previousTime || time - 16));
      previousTime = time;
      current += (target - current) * (1 - Math.exp(-elapsed / 100));
      if (Math.abs(target - current) < 0.0001) current = target;
      scene?.render(motionPreference.matches ? 0.65 : current);
      if (visible && !document.hidden && current !== target) frame = requestAnimationFrame(paint);
    };
    const schedule = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(paint);
    };
    const measure = () => {
      const bounds = host.getBoundingClientRect();
      target = injectionProgress(bounds.top, bounds.height, window.innerHeight);
      if (motionPreference.matches) current = target;
      schedule();
    };
    const load = async () => {
      if (loading || scene) return;
      loading = true;
      try {
        const { createInjectionScene } = await import("./injection-scene");
        if (disposed) return;
        const loadedScene = await createInjectionScene(host, () => setReady(false), modelRequest.signal);
        if (disposed) { loadedScene.dispose(); return; }
        scene = loadedScene;
        current = target;
        scene.render(motionPreference.matches ? 0.65 : target);
        setReady(true);
        schedule();
      } catch (error) {
        if (disposed) return;
        console.warn("Injection animation is using its static fallback.", error);
      }
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) { void load(); measure(); }
      else { cancelAnimationFrame(frame); frame = 0; previousTime = 0; }
    }, { rootMargin: "300px" });
    visibility.observe(host);
    const resize = new ResizeObserver(() => { scene?.resize(); measure(); });
    resize.observe(host);
    const documentVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; previousTime = 0; }
      else measure();
    };
    const preferenceChange = () => measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    document.addEventListener("visibilitychange", documentVisibility);
    motionPreference.addEventListener("change", preferenceChange);
    measure();
    return () => {
      disposed = true;
      modelRequest.abort();
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", documentVisibility);
      motionPreference.removeEventListener("change", preferenceChange);
      scene?.dispose();
    };
  }, []);

  return <figure className={`injection-card-model${ready ? " is-ready" : ""}`} aria-label="3D model of a NAD+ injection vial with its original silver cap and label">
    <div className="injection-card-canvas" ref={canvasRef} aria-hidden="true" />
    <img className="injection-card-fallback" src={landingAsset("Product-image-1.png")} width="960" height="1280" alt="" aria-hidden="true" loading="lazy" decoding="async" />
  </figure>;
}
