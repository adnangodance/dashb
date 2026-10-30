import { useRef, type PointerEvent as ReactPointerEvent } from "react";

export function SignaturePad({ label = "Sign your signature:", onSignatureChange }: { label?: string; onSignatureChange?: (signed: boolean) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  function getPoint(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = event.currentTarget;
    const bounds = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - bounds.left) * (canvas.width / bounds.width),
      y: (event.clientY - bounds.top) * (canvas.height / bounds.height),
    };
  }

  function startDrawing(event: ReactPointerEvent<HTMLCanvasElement>) {
    const context = event.currentTarget.getContext("2d");
    if (!context) return;
    const point = getPoint(event);
    drawingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    context.beginPath();
    context.moveTo(point.x, point.y);
    onSignatureChange?.(true);
  }

  function draw(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const context = event.currentTarget.getContext("2d");
    if (!context) return;
    const point = getPoint(event);
    context.lineWidth = 2.5;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#183229";
    context.lineTo(point.x, point.y);
    context.stroke();
  }

  function clearSignature() {
    const canvas = canvasRef.current;
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    onSignatureChange?.(false);
  }

  return (
    <div className="mt-5">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[11px] font-medium">{label}</span>
        <button type="button" onClick={clearSignature} className="rounded-[7px] border border-[#d7dcda] bg-white px-3 py-1 text-[10px] font-medium text-[#4f5753] hover:bg-[#f6f7f6]">Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        width={720}
        height={220}
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={() => { drawingRef.current = false; }}
        onPointerCancel={() => { drawingRef.current = false; }}
        className="h-[145px] w-full touch-none rounded-[9px] border border-[#d7dcda] bg-white/80"
        aria-label="Digital signature drawing area"
      />
    </div>
  );
}
