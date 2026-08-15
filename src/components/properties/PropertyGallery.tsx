"use client";

import { useState } from "react";
import Image from "next/image";

interface PropertyGalleryProps {
  images: string[];
  imageLabels?: string[];
  title: string;
}

export function PropertyGallery({ images, imageLabels, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeLabel = imageLabels?.[activeIndex];

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:aspect-[16/9]">
        <Image
          src={images[activeIndex]}
          alt={`${title}${activeLabel ? ` - ${activeLabel}` : ""}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />
        {activeLabel && (
          <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            {activeLabel}
          </span>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg text-left ${
                i === activeIndex ? "ring-2 ring-accent" : "opacity-75 hover:opacity-100"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="120px" />
              {imageLabels?.[i] && (
                <span className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-[9px] font-medium uppercase tracking-wide text-white">
                  {imageLabels[i]}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
