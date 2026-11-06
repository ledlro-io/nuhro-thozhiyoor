"use client";

import React, { useEffect, useRef } from "react";

const W = 300;
const H = 130;

interface Props {
  onUse: (dataUrl: string) => void;
  onCancel: () => void;
}

/** Modal where the admin draws a signature with mouse, finger or stylus. */
export default function SignaturePad({ onUse, onCancel }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#14213d";
  }, []);

  const point = (e: React.PointerEvent<HTMLCanvasElement>): [number, number] => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return [((e.clientX - r.left) * W) / r.width, ((e.clientY - r.top) * H) / r.height];
  };

  const down = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    drawing.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    ctx.beginPath();
    ctx.moveTo(...point(e));
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(...point(e));
    ctx.stroke();
  };

  const clear = () => canvasRef.current?.getContext("2d")?.clearRect(0, 0, W, H);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="w-full max-w-sm rounded-2xl border border-gold-primary/20 bg-surface p-4 shadow-2xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gold-primary">Draw signature</p>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="block w-full touch-none rounded-lg border border-dashed border-mutedText bg-white"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={() => (drawing.current = false)}
          onPointerLeave={() => (drawing.current = false)}
        />
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => canvasRef.current && onUse(canvasRef.current.toDataURL())}
            className="rounded-lg bg-gold-primary px-3 py-1.5 text-xs font-bold uppercase text-background hover:brightness-110"
          >
            Use
          </button>
          <button
            type="button"
            onClick={clear}
            className="rounded-lg border border-gold-primary/20 px-3 py-1.5 text-xs font-semibold text-parchment hover:bg-gold-primary/10"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gold-primary/20 px-3 py-1.5 text-xs font-semibold text-parchment hover:bg-gold-primary/10"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}