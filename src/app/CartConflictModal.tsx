import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowRightLeft, Info, X } from "lucide-react";
import type { CartConflict } from "./cart-rules";

export function CartConflictModal({ conflict, onClose, onClear }: {
  conflict: CartConflict;
  onClose: () => void;
  onClear: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    dialog.current?.showModal();
    heading.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  return createPortal(
    <dialog
      ref={dialog}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      aria-labelledby="cart-conflict-title"
      aria-describedby="cart-conflict-description cart-conflict-removal"
      className="fixed inset-0 m-auto max-h-none w-[calc(100%_-_32px)] max-w-[440px] overflow-visible border-0 bg-transparent p-0 text-[#171717] outline-none backdrop:bg-black/35 backdrop:backdrop-blur-[3px]"
    >
      <div className="relative flex max-h-[calc(100dvh_-_32px)] min-h-0 flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_24px_80px_-16px_rgba(0,0,0,0.28)] ring-1 ring-black/5">
        <button type="button" onClick={onClose} aria-label="Close cart notice" className="absolute right-2.5 top-2.5 z-10 flex size-11 items-center justify-center rounded-full text-[#8a8a8a] transition-colors hover:bg-[#f5f5f5] hover:text-[#171717] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
          <X size={17} strokeWidth={1.8} />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-7 sm:px-7">
          <div className="flex items-center gap-3.5 pr-7">
            <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-[13px] border border-[#eaeaea] bg-[#fafafa] text-[#404040] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <ArrowRightLeft size={20} strokeWidth={1.7} />
            </span>
            <h2 id="cart-conflict-title" ref={heading} tabIndex={-1} className="text-[22px] font-semibold leading-7 tracking-[-0.03em] outline-none">Switch to {conflict.incomingType}?</h2>
          </div>
          <p id="cart-conflict-description" className="mt-5 text-[14px] leading-[23px] text-[#707070]">Your cart contains <strong className="font-medium text-[#303030]">{conflict.existingType} products</strong>. You’ll need to clear it before adding {conflict.incomingType} products.</p>

          <div id="cart-conflict-removal" className="mt-4 flex items-start gap-2 rounded-[10px] bg-[#f6f6f6] px-3 py-2.5 text-[#707070]">
            <Info size={15} strokeWidth={1.8} aria-hidden="true" className="mt-0.5 shrink-0 text-[#8a8a8a]" />
            <p className="text-[13px] leading-5">All items in your current cart will be removed.</p>
          </div>
        </div>

        <footer className="grid shrink-0 grid-cols-1 gap-2.5 border-t border-[#ededed] bg-[#fcfcfc] px-6 py-5 min-[380px]:grid-cols-2 sm:px-7">
          <button type="button" onClick={onClose} className="min-h-11 rounded-full border border-[#dedede] bg-white px-3 py-2.5 text-[14px] font-medium text-[#404040] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors hover:bg-[#f5f5f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Keep current cart</button>
          <button type="button" onClick={onClear} className="min-h-11 rounded-full bg-black px-3 py-2.5 text-[14px] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#252525] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Clear cart</button>
        </footer>
      </div>
    </dialog>, document.body,
  );
}
