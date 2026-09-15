import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
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
    <dialog ref={dialog} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="cart-conflict-title" aria-describedby="cart-conflict-description" className="fixed inset-0 m-auto max-h-none w-[calc(100%_-_64px)] max-w-[380px] overflow-visible border-0 bg-transparent p-0 text-[#171717] outline-none backdrop:bg-black/55 backdrop:backdrop-blur-[3px]">
      <div className="relative flex max-h-[calc(100dvh_-_80px)] min-h-0 flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <button type="button" onClick={onClose} aria-label="Close cart notice" className="absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-full text-[#777] transition-colors hover:bg-[#f3f3f3] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"><X size={15} strokeWidth={1.8} /></button>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-5 pt-8 text-center sm:px-8">
          <div aria-hidden="true" className="mb-3 flex items-center justify-center gap-2 text-[19px] leading-6"><span>🛒</span><span>📦</span><span>✨</span></div>
          <h2 id="cart-conflict-title" ref={heading} tabIndex={-1} className="text-[18px] font-semibold leading-6 tracking-[-0.025em] text-[#171717] outline-none">Switch to {conflict.incomingType} products?</h2>
          <p id="cart-conflict-description" className="mx-auto mt-2 max-w-[280px] text-[12px] leading-[19px] text-[#777]">You have {conflict.existingType} products in your cart. To add {conflict.incomingType} products, you’ll need to clear all current items first.</p>
        </div>
        <footer className="flex shrink-0 flex-wrap items-center justify-center gap-x-4 gap-y-1 px-5 pb-7">
          <button type="button" onClick={onClear} className="h-9 rounded-[10px] bg-black px-5 text-[12px] font-medium text-white transition-colors hover:bg-[#292929] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Clear cart</button>
          <button type="button" onClick={onClose} className="h-9 rounded-[10px] px-2 text-[12px] font-medium text-[#777] transition-colors hover:bg-[#f5f5f5] hover:text-[#222] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Keep current cart</button>
        </footer>
      </div>
    </dialog>, document.body,
  );
}
