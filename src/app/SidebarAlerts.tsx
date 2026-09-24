import { useEffect, useRef, useState, type ReactNode } from "react";

export type SidebarAlert = { id: string; label: string; content: ReactNode };
const ROTATION_MS = 15_000;

export function SidebarAlerts({ alerts, paused = false, priorityAlertId }: { alerts: SidebarAlert[]; paused?: boolean; priorityAlertId?: string }) {
  const [activeId, setActiveId] = useState<string | undefined>(priorityAlertId ?? alerts[0]?.id);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(() => typeof document === "undefined" || !document.hidden);
  const lastPriorityId = useRef(priorityAlertId);
  const activeIndex = Math.max(0, alerts.findIndex(alert => alert.id === activeId));
  const rotating = !paused && !hovered && !focused && visible && alerts.length > 1;

  useEffect(() => {
    const updateVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (priorityAlertId !== lastPriorityId.current && alerts.some(alert => alert.id === priorityAlertId)) setActiveId(priorityAlertId);
    lastPriorityId.current = priorityAlertId;
  }, [priorityAlertId, alerts]);

  useEffect(() => {
    if (!rotating) return;
    const interval = window.setInterval(() => {
      if (document.querySelector("dialog[open], [aria-modal='true']")) return;
      setActiveId(alerts[(activeIndex + 1) % alerts.length].id);
    }, ROTATION_MS);
    return () => window.clearInterval(interval);
  }, [rotating, activeIndex, alerts]);

  if (!alerts.length) return null;

  return (
    <section
      aria-label="Account alerts"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      className="mt-3"
    >
      <div className="grid" aria-live={rotating ? "off" : "polite"}>
        {alerts.map((alert, index) => (
          <div
            key={alert.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${alerts.length}: ${alert.label}`}
            aria-hidden={index !== activeIndex}
            className={`col-start-1 row-start-1 min-w-0 transition-opacity duration-200 motion-reduce:transition-none ${index === activeIndex ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}
          >
            {alert.content}
          </div>
        ))}
      </div>
    </section>
  );
}
