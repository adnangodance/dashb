import { useEffect, useId, useLayoutEffect, useRef, useState, type HTMLAttributes, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";

/** Compact catalog sheets share the More sheet's layout and modal behavior. */
export function CompactBottomSheet({ title, children, onClose, id }: {
  title: string; children: ReactNode; onClose: () => void; id: string;
}) {
  const panel = useRef<HTMLElement>(null);
  const swipeStart = useRef<number | null>(null);
  useModalFocus(panel, true, onClose);
  return createPortal(<div className="dashboard-more-layer catalog-sheet-layer">
    <button type="button" tabIndex={-1} aria-hidden="true" className="dashboard-more-backdrop" onClick={onClose} />
    <section ref={panel} id={id} className="dashboard-more-sheet catalog-sheet" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} tabIndex={-1}>
      <header className="dashboard-more-header" onPointerDown={event => {
        if ((event.target as HTMLElement).closest("button")) return;
        swipeStart.current = event.clientY;
        event.currentTarget.setPointerCapture(event.pointerId);
      }} onPointerUp={event => {
        if (swipeStart.current !== null && event.clientY - swipeStart.current > 65) onClose();
        swipeStart.current = null;
      }} onPointerCancel={() => { swipeStart.current = null; }}>
        <span className="dashboard-more-grabber" aria-hidden="true" />
        <div className="flex items-center justify-between gap-3 px-5 pb-3">
          <h2 id={`${id}-title`} className="text-[20px] font-semibold text-[#111]" tabIndex={-1} data-initial-focus>{title}</h2>
          <button type="button" aria-label={`Close ${title}`} onClick={onClose} className="flex size-11 shrink-0 items-center justify-center rounded-full bg-black/5 text-[24px] text-[#333]"><span aria-hidden="true">×</span></button>
        </div>
      </header>
      <div className="dashboard-more-content">{children}</div>
    </section>
  </div>, document.body);
}

/** Keeps compact filters intrinsic-sized; existing desktop wraps/grids can opt out. */
export function ScrollableTabs({ children, activeKey, desktopLayout, as: Tag = "div", className = "", ...props }: HTMLAttributes<HTMLElement> & {
  activeKey?: string | number;
  desktopLayout?: "wrap" | "column" | "grid";
  as?: "div" | "nav";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  useLayoutEffect(() => {
    const row = ref.current;
    if (!row) return;
    const update = () => {
      const left = row.scrollLeft > 1;
      const right = row.scrollLeft + row.clientWidth < row.scrollWidth - 1;
      setEdges(previous => previous.left === left && previous.right === right ? previous : { left, right });
    };
    update();
    row.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    const observeSizes = () => {
      resize.disconnect();
      resize.observe(row);
      Array.from(row.children).forEach(child => resize.observe(child));
      update();
    };
    observeSizes();
    const content = new MutationObserver(observeSizes);
    content.observe(row, { childList: true, subtree: true, characterData: true });
    return () => { row.removeEventListener("scroll", update); resize.disconnect(); content.disconnect(); };
  }, []);
  useLayoutEffect(() => {
    const row = ref.current;
    if (!row) return;
    // Fitting desktop rows need no scroll adjustment.
    if (row.scrollWidth <= row.clientWidth + 1) return;
    row.querySelector<HTMLElement>('[aria-selected="true"], [aria-pressed="true"], [aria-current="page"], [data-active="true"], input:checked')
      ?.closest<HTMLElement>("button, label, [data-scroll-item]")
      ?.scrollIntoView({ inline: "nearest", block: "nearest", behavior: motionBehavior() });
  }, [activeKey]);
  return <Tag {...props} ref={ref} className={`scrollable-tabs overflow-x-auto overscroll-x-contain flex-nowrap snap-x snap-proximity ${className}`}
    data-desktop-layout={desktopLayout} data-scroll-left={edges.left} data-scroll-right={edges.right}
    onClickCapture={event => {
      props.onClickCapture?.(event);
      const row = event.currentTarget;
      const item = (event.target as HTMLElement).closest<HTMLElement>("button, label, [data-scroll-item]");
      if (item && !item.matches(":disabled") && row.scrollWidth > row.clientWidth + 1) {
        item.scrollIntoView({ inline: "nearest", block: "nearest", behavior: motionBehavior() });
      }
    }}>{children}</Tag>;
}

export function ViewportSizing() {
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const root = document.documentElement;
    const update = () => {
      if (viewport.scale !== 1) return;
      root.style.setProperty("--viewport-height", `${viewport.height}px`);
      root.style.setProperty("--viewport-top", `${viewport.offsetTop}px`);
      root.style.setProperty("--keyboard-inset", `${Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)}px`);
      root.classList.toggle("keyboard-open", window.innerHeight - viewport.height > 150);
    };
    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
      ["--viewport-height", "--viewport-top", "--keyboard-inset"].forEach(key => root.style.removeProperty(key));
      root.classList.remove("keyboard-open");
    };
  }, []);
  return null;
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Mounted only with the compact dashboard navigation; public navigation is unaffected. */
export function useDashboardTabBar() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.dashboardTabs = "true";
    let blurTimer: ReturnType<typeof setTimeout>;
    const update = () => {
      const element = document.activeElement;
      const editing = element instanceof HTMLElement && (
        element.matches('textarea, select, input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]):not([type="range"]):not([type="color"]):not([type="hidden"])') || element.isContentEditable
      );
      root.classList.toggle("dashboard-input-focused", editing);
    };
    const focusin = () => { clearTimeout(blurTimer); update(); };
    const focusout = () => { blurTimer = setTimeout(update, 100); };
    update();
    document.addEventListener("focusin", focusin);
    document.addEventListener("focusout", focusout);
    return () => {
      clearTimeout(blurTimer);
      document.removeEventListener("focusin", focusin);
      document.removeEventListener("focusout", focusout);
      delete root.dataset.dashboardTabs;
      root.classList.remove("dashboard-input-focused");
    };
  }, []);
}

let scrollLocks = 0;
let releaseScroll = () => {};
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    if (scrollLocks++ === 0) {
      const bodyOverflow = document.body.style.overflow;
      const rootOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.classList.add("has-modal");
      releaseScroll = () => {
        document.body.style.overflow = bodyOverflow;
        document.documentElement.style.overflow = rootOverflow;
        document.documentElement.classList.remove("has-modal");
      };
    }
    return () => { if (--scrollLocks === 0) releaseScroll(); };
  }, [active]);
}

const layers: HTMLElement[] = [];
const focusable = 'a[href],button:not(:disabled),input:not(:disabled):not([type="hidden"]),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])';

/** Shared by custom sheets and navigation; native dialogs keep their own focus trap. */
export function useModalFocus(ref: RefObject<HTMLElement>, active: boolean, onClose: () => void) {
  const close = useRef(onClose);
  close.current = onClose;
  useBodyScrollLock(active);
  useEffect(() => {
    const element = ref.current;
    if (!active || !element) return;
    const previous = document.activeElement as HTMLElement | null;
    layers.push(element);
    const candidates = () => Array.from(element.querySelectorAll<HTMLElement>(focusable)).filter(node => node.tabIndex >= 0 && node.getClientRects().length && !node.closest('[hidden], [inert]'));
    const isTop = () => layers.at(-1) === element && !document.querySelector("dialog[open]");
    const frame = requestAnimationFrame(() => {
      if (isTop() && !element.contains(document.activeElement)) (element.querySelector<HTMLElement>("[data-initial-focus]") ?? candidates()[0] ?? element).focus({ preventScroll: true });
    });
    const keydown = (event: KeyboardEvent) => {
      if (!isTop()) return;
      if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close.current(); }
      if (event.key !== "Tab") return;
      const items = candidates();
      const first = items[0];
      const last = items.at(-1);
      if (!first) { event.preventDefault(); element.focus(); }
      else if (event.shiftKey && (document.activeElement === first || !element.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !element.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    const focusin = (event: FocusEvent) => {
      if (isTop() && !element.contains(event.target as Node)) (candidates()[0] ?? element).focus({ preventScroll: true });
    };
    document.addEventListener("keydown", keydown);
    document.addEventListener("focusin", focusin);
    return () => {
      cancelAnimationFrame(frame);
      layers.splice(layers.indexOf(element), 1);
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("focusin", focusin);
      requestAnimationFrame(() => {
        if (previous?.isConnected && !document.querySelector("dialog[open]") && (!layers.length || layers.at(-1)?.contains(previous))) previous.focus({ preventScroll: true });
      });
    };
  }, [active, ref]);
}

export function ModalLayer({ children, onClose, className = "", labelledBy, label }: {
  children: ReactNode; onClose: () => void; className?: string; labelledBy?: string; label?: string;
}) {
  const compactNavigation = useMediaQuery("(max-width: 1023px)");
  const ref = useRef<HTMLDivElement>(null);
  const headingId = useId();
  useLayoutEffect(() => {
    const root = ref.current;
    const panel = root && Array.from(root.children).find(child => child.tagName !== "BUTTON");
    if (!root || !panel) return;
    Array.from(root.children).filter(child => child.tagName === "BUTTON").forEach(button => {
      (button as HTMLElement).tabIndex = -1;
      button.setAttribute("aria-hidden", "true");
    });
    panel.classList.add("modal-panel");
    const heading = panel.querySelector<HTMLElement>(".mobile-page-title, h2");
    if (heading) {
      if (!heading.id) heading.id = headingId;
      heading.tabIndex = -1;
      heading.dataset.initialFocus = "true";
      root.setAttribute("aria-labelledby", heading.id);
      let header: HTMLElement = heading;
      while (header.parentElement && header.parentElement !== panel) header = header.parentElement;
      if (header !== heading) header.classList.add("modal-header");
    }
    const footer = panel.querySelector("footer") ?? panel.querySelector("form > div:last-child") ?? panel.lastElementChild;
    if (footer?.matches('footer, div[class*="border-t"], div[class*="justify-end"], div[class*="sticky"][class*="bottom"]')) footer.classList.add("modal-footer");
  }, [headingId, compactNavigation]);
  useModalFocus(ref, true, onClose);
  return <div ref={ref} role="dialog" aria-modal="true" aria-labelledby={labelledBy} aria-label={labelledBy ? undefined : label ?? "Dialog"} tabIndex={-1}
    className={`modal-layer ${className}`} onClick={event => { event.stopPropagation(); if (event.target === event.currentTarget) onClose(); }}>
    {children}
  </div>;
}

export const motionBehavior = (): ScrollBehavior => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
