import { useEffect, useRef } from "react";

const LINE_OFFSETS = [-180, 0, 86, 172, 257, 343, 428, 514, 780];
const BASE_HEIGHT = 600;
const PARTICLES_PER_LINE = 3;
const LABEL_PARTICLES = 6;
const PARTICLE_SPEED = 0.035;
const LABEL_INSET = 68;
const LABEL_HEIGHT = 32;
const LOGO_CHIP = { width: 76, height: 32, padding: 8, shadow: 8 };
// Logos stay hidden near the launch field, where they would cover the headline.
const LOGO_REVEAL_POSITION = 0.52;
const LOGO_REVEAL_RANGE = 0.08;
const LOGO_EDGE_FADE = 30;

type Point = { x: number; y: number };
type Curve = [Point, Point, Point, Point];

function curvePoint([a, b, c, d]: Curve, t: number): Point {
  const u = 1 - t;
  const at = (axis: "x" | "y") => u * u * u * a[axis] + 3 * u * u * t * b[axis] + 3 * u * t * t * c[axis] + t * t * t * d[axis];
  return { x: at("x"), y: at("y") };
}

function renderLogoChip(image: HTMLImageElement, scale: number) {
  const { width, height, padding, shadow } = LOGO_CHIP;
  const chip = document.createElement("canvas");
  chip.width = (width + shadow * 2) * scale;
  chip.height = (height + shadow * 2) * scale;
  const context = chip.getContext("2d");
  if (!context) return null;
  context.scale(scale, scale);
  context.shadowColor = "rgba(0, 0, 0, 0.08)";
  context.shadowBlur = shadow;
  context.shadowOffsetY = 2;
  context.fillStyle = "#fff";
  context.beginPath();
  context.roundRect(shadow, shadow, width, height, height / 2);
  context.fill();
  context.shadowColor = "transparent";
  const fit = Math.min((width - padding * 2) / image.naturalWidth, (height - 10) / image.naturalHeight);
  const logoWidth = image.naturalWidth * fit;
  const logoHeight = image.naturalHeight * fit;
  context.drawImage(image, shadow + (width - logoWidth) / 2, shadow + (height - logoHeight) / 2, logoWidth, logoHeight);
  return chip;
}

/** Curves fan out from the launch field; particles flow through it from left to right. */
export function HeroParticleField({ side, label, logos }: { side: "left" | "right"; label?: string; logos?: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A labelled field draws one straight line from the label to the launch field.
    const offsets = label ? [BASE_HEIGHT / 2] : LINE_OFFSETS;
    const perLine = label ? LABEL_PARTICLES : PARTICLES_PER_LINE;
    const particles = logos
      // Each line carries two logos half a loop apart, a quarter loop from the next line's.
      ? logos.map((_, index) => {
        const line = index % offsets.length;
        return { line, progress: (line * 0.25 + Math.floor(index / offsets.length) * 0.5) % 1, green: index % 3 === 0 };
      })
      : offsets.flatMap((_, line) => Array.from({ length: perLine }, (_, index) => ({
        line,
        progress: ((line * 0.37 + index / perLine) + (side === "left" ? 0 : 0.21)) % 1,
        green: (line + index) % 3 === 0,
      })));
    const logoChips: (HTMLCanvasElement | null)[] = particles.map(() => null);
    let curves: Curve[] = [];
    let origin: Point = { x: 0, y: 0 };
    let width = 0;
    let height = 0;

    function resize() {
      const bounds = canvas!.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      width = bounds.width;
      height = bounds.height;
      canvas!.width = Math.round(width * scale);
      canvas!.height = Math.round(height * scale);
      const center = height / 2;
      // Part of the canvas can sit past the viewport edge on narrower screens.
      origin = { x: Math.max(0, -bounds.left) + LABEL_INSET, y: center };
      curves = offsets.map(offset => {
        const start = offset / BASE_HEIGHT * height;
        const end = center + (start - center) * 0.05;
        if (label) return [origin, { x: width * 0.5, y: center }, { x: width * 0.75, y: center }, { x: width, y: center }];
        return [{ x: 0, y: start }, { x: width * 0.35, y: start }, { x: width * 0.72, y: end }, { x: width, y: end }];
      });
    }

    function draw() {
      const scale = window.devicePixelRatio || 1;
      context!.setTransform(scale, 0, 0, scale, 0, 0);
      context!.clearRect(0, 0, width, height);
      if (side === "right") {
        context!.translate(width, 0);
        context!.scale(-1, 1);
      }
      context!.lineWidth = 1;
      context!.strokeStyle = "rgba(0, 0, 0, 0.07)";
      for (const [a, b, c, d] of curves) {
        context!.beginPath();
        context!.moveTo(a.x, a.y);
        context!.bezierCurveTo(b.x, b.y, c.x, c.y, d.x, d.y);
        context!.stroke();
      }
      const chips: { chip: HTMLCanvasElement; x: number; y: number; alpha: number }[] = [];
      particles.forEach((particle, index) => {
        // The left side flows into the launch field and the right side flows out of it.
        const position = side === "right" ? 1 - particle.progress : particle.progress;
        const point = curvePoint(curves[particle.line], position);
        const chip = logoChips[index];
        const reveal = chip ? Math.max(0, Math.min(1, (LOGO_REVEAL_POSITION - position) / LOGO_REVEAL_RANGE + 1)) : 0;
        const size = particle.green ? 3.5 : 3;
        context!.globalAlpha = Math.min(1, (1 - position) * 12, label ? position * 12 : 1) * (1 - reveal);
        context!.fillStyle = particle.green ? "#10b981" : "rgba(0, 0, 0, 0.2)";
        context!.fillRect(point.x - size / 2, point.y - size / 2, size, size);
        if (!chip || !reveal) return;
        const edge = Math.min(point.y, height - point.y, position * width) / LOGO_EDGE_FADE;
        chips.push({ chip, x: side === "right" ? width - point.x : point.x, y: point.y, alpha: reveal * Math.max(0, Math.min(1, edge)) });
      });
      // Reset the mirrored transform so logos are not drawn backwards.
      context!.setTransform(scale, 0, 0, scale, 0, 0);
      const { width: chipWidth, height: chipHeight, shadow } = LOGO_CHIP;
      for (const { chip, x, y, alpha } of chips) {
        context!.globalAlpha = alpha;
        context!.drawImage(chip, x - chipWidth / 2 - shadow, y - chipHeight / 2 - shadow, chipWidth + shadow * 2, chipHeight + shadow * 2);
      }
      context!.globalAlpha = 1;
      if (label) drawLabel(label);
    }

    function drawLabel(text: string) {
      context!.font = '500 13px "Geist Variable", sans-serif';
      context!.textBaseline = "middle";
      const labelWidth = context!.measureText(text).width + 37;
      const left = origin.x - labelWidth / 2;
      const top = origin.y - LABEL_HEIGHT / 2;
      context!.shadowColor = "rgba(0, 0, 0, 0.08)";
      context!.shadowBlur = 10;
      context!.shadowOffsetY = 2;
      context!.fillStyle = "#fff";
      context!.beginPath();
      context!.roundRect(left, top, labelWidth, LABEL_HEIGHT, LABEL_HEIGHT / 2);
      context!.fill();
      context!.shadowColor = "transparent";
      context!.fillStyle = "#10b981";
      context!.fillRect(left + 14, origin.y - 2.5, 5, 5);
      context!.fillStyle = "#0b0b0b";
      context!.fillText(text, left + 25, origin.y + 0.5);
    }

    resize();
    draw();
    logos?.forEach((source, index) => {
      const image = new Image();
      image.onload = () => {
        logoChips[index] = renderLogoChip(image, window.devicePixelRatio || 1);
        if (reducedMotion) draw();
      };
      image.src = source;
    });
    const redraw = () => { resize(); draw(); };
    const resizeObserver = new ResizeObserver(redraw);
    resizeObserver.observe(canvas);
    window.addEventListener("resize", redraw);
    void document.fonts.ready.then(draw);
    const stopResizing = () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", redraw);
    };
    if (reducedMotion) return stopResizing;

    let frame = 0;
    let previous = 0;
    function tick(time: number) {
      const elapsed = previous ? Math.min(time - previous, 64) / 1000 : 0;
      previous = time;
      for (const particle of particles) particle.progress = (particle.progress + elapsed * PARTICLE_SPEED) % 1;
      draw();
      frame = requestAnimationFrame(tick);
    }
    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (entry.isIntersecting) frame = requestAnimationFrame(tick);
    });
    visibility.observe(canvas);
    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      stopResizing();
    };
  }, [side, label, logos]);

  return <canvas ref={canvasRef} className={`slrx-particle-field slrx-particle-field-${side}`} aria-hidden="true" />;
}
