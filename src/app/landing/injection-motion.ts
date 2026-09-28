export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
export const ease = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

/** Reversible pose and liquid movement as the bottle card crosses the viewport. */
export function injectionFrame(progress: number) {
  const p = clamp01(Number.isFinite(progress) ? progress : 0);
  return {
    progress: p,
    fill: 0.08 + ease(p) * 0.84,
    rotation: -0.10 + Math.sin(p * Math.PI * 2) * 0.28,
    tilt: 0.07 - Math.sin(p * Math.PI) * 0.12,
  };
}

export function injectionProgress(top: number, height: number, viewport: number) {
  return clamp01((viewport - top) / Math.max(1, viewport + height));
}
