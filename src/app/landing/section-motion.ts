const clamp = (value: number) => Math.max(0, Math.min(1, value));

// Measure the untransformed stage so scaling the panel cannot change its progress.
export function sectionRevealFrame(top: number, viewportHeight: number, compact = false) {
  const progress = clamp((viewportHeight - top) / Math.max(viewportHeight * 1.35, 1));
  const expansion = progress < .55
    ? .75 * progress / .55
    : .75 + .25 * (progress - .55) / .45;
  const corner = progress < .72
    ? 1 - (1 - 16 / 52) * progress / .72
    : (16 / 52) * (1 - progress) / .28;
  return {
    progress,
    scale: 1 - (compact ? .06 : .16) * (1 - expansion),
    radius: (compact ? 28 : 52) * corner,
    shadow: (compact ? .08 : .14) * (1 - progress),
  };
}
