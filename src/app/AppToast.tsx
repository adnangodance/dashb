import { useEffect, useState } from "react";
import { Bell, Check, TriangleAlert, X, XCircle } from "lucide-react";

export type ToastType = "success" | "info" | "warning" | "error";

export type ToastMessage = {
  id: number;
  type: ToastType;
  message: string;
};

const AUTO_CLOSE_SECONDS = 6;

const TOAST_APPEARANCE = {
  success: { icon: Check, surface: "bg-[#edf6ef]/95", iconStyle: "bg-[#e7f5eb] text-[#26834a]", accent: "text-[#26834a]" },
  info: { icon: Bell, surface: "bg-[#f3f4f9]/95", iconStyle: "bg-[#efedff] text-[#5c59e8]", accent: "text-[#5c59e8]" },
  warning: { icon: TriangleAlert, surface: "bg-[#fff5e5]/95", iconStyle: "bg-[#fff0d5] text-[#a86810]", accent: "text-[#a86810]" },
  error: { icon: XCircle, surface: "bg-[#fce8e7]/95", iconStyle: "bg-[#fff0ee] text-[#e5483f]", accent: "text-[#df4f47]" },
};

export function AppToast({ toast, onClose }: { toast: ToastMessage; onClose: () => void }) {
  const [secondsRemaining, setSecondsRemaining] = useState(AUTO_CLOSE_SECONDS);
  const isWarning = toast.type === "warning" || toast.type === "error";
  const appearance = TOAST_APPEARANCE[toast.type];
  const Icon = appearance.icon;

  useEffect(() => {
    const expiresAt = Date.now() + AUTO_CLOSE_SECONDS * 1000;
    const countdown = window.setInterval(() => {
      setSecondsRemaining(Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000)));
    }, 250);
    const dismissal = window.setTimeout(onClose, AUTO_CLOSE_SECONDS * 1000);

    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(dismissal);
    };
  }, [onClose]);

  return (
    <div
      className="fixed bottom-6 left-1/2 z-[10000] w-[min(460px,calc(100vw-24px))] -translate-x-1/2"
      onKeyDown={event => { if (event.key === "Escape") onClose(); }}
    >
      <div className={`app-toast-enter rounded-[18px] border border-white/40 p-2 shadow-[0_12px_36px_-18px_rgba(25,30,50,0.16)] backdrop-blur-[6px] ${appearance.surface}`}>
        <div className="flex items-center gap-2.5 rounded-[12px] border border-white/50 bg-white/95 px-3 py-3 shadow-[0_4px_14px_-5px_rgba(20,20,30,0.1)]">
          <span aria-hidden="true" className={`flex size-8 shrink-0 items-center justify-center rounded-full ${appearance.iconStyle}`}>
            <Icon size={16} strokeWidth={toast.type === "success" ? 2.3 : 1.9} />
          </span>
          <div className="min-w-0 flex-1" role={isWarning ? "alert" : "status"} aria-atomic="true">
            <p className="break-words text-[12px] font-medium leading-[19px] text-[#343940]">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-7 shrink-0 rounded-[7px] border border-[#e7e8ec] bg-[#fafafa] px-2.5 text-[10px] font-medium text-[#34363c] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-colors hover:bg-[#f0f1f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c59e8]"
          >
            Got it
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss notification"
            className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#eeeff2] text-[#8a8f99] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#f5f5f7] hover:text-[#34363c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c59e8]"
          >
            <X size={13} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
        <p aria-hidden="true" className="px-2 pb-0.5 pt-2.5 text-center text-[10px] leading-[15px] text-[#6e7580]">
          This message will automatically close in{" "}
          <span className={`font-medium tabular-nums ${appearance.accent}`}>{secondsRemaining} sec</span>
        </p>
      </div>
    </div>
  );
}
