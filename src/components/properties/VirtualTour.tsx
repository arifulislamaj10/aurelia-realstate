"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface VirtualTourProps {
  images: string[];
  imageLabels?: string[];
  title: string;
  videoUrl?: string;
  has360Tour?: boolean;
}

export function VirtualTour({
  images,
  imageLabels,
  title,
  videoUrl,
  has360Tour,
}: VirtualTourProps) {
  const [panIndex, setPanIndex] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  if (!videoUrl && !has360Tour) return null;

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setOffset((prev) => ({
      x: Math.max(-80, Math.min(80, prev.x + dx * 0.15)),
      y: Math.max(-40, Math.min(40, prev.y + dy * 0.1)),
    }));
    if (Math.abs(dx) > 30) {
      setPanIndex((i) => {
        const next = dx > 0 ? i - 1 : i + 1;
        return Math.max(0, Math.min(images.length - 1, next));
      });
      setOffset({ x: 0, y: 0 });
    }
  }

  function onPointerUp() {
    dragging.current = false;
  }

  return (
    <div className="mt-6 space-y-4 sm:mt-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">Virtual Tour</h2>
          <p className="mt-1 text-sm text-muted">
            Video walkthrough and 360° views, like premium developer sites.
          </p>
        </div>
        {has360Tour && (
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            360° Available
          </span>
        )}
      </div>

      {videoUrl && (
        <div className="overflow-hidden rounded-2xl border border-border">
          <iframe
            title={`Video tour of ${title}`}
            src={videoUrl}
            className="aspect-video w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {has360Tour && (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted">
            Drag to look around
          </p>
          <div
            className="relative aspect-[16/10] cursor-grab overflow-hidden rounded-2xl border border-border active:cursor-grabbing sm:aspect-[16/9]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <Image
              src={images[panIndex]}
              alt={`360 view of ${title}`}
              fill
              className="object-cover transition-transform duration-75"
              style={{ transform: `scale(1.12) translate(${offset.x}px, ${offset.y}px)` }}
              sizes="(max-width: 1024px) 100vw, 66vw"
              draggable={false}
            />
            {imageLabels?.[panIndex] && (
              <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                {imageLabels[panIndex]}
              </span>
            )}
          </div>
          <div className="mt-2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPanIndex(i)}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i === panIndex ? "bg-accent" : "bg-border"
                }`}
                aria-label={`View angle ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
