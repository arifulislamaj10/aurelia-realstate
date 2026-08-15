"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { AUTOPLAY_MS, heroSlides } from "@/data/heroSlides";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const total = heroSlides.length;
  const slide = heroSlides[current];

  const goTo = useCallback(
    (index: number) => setCurrent((index + total) % total),
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    heroSlides.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
    });
  }, []);

  return (
    <section className="relative h-[100dvh] overflow-hidden">
      {/* Background slides — fixed full-viewport layers for stable height */}
      <div className="absolute inset-0 h-full w-full">
        {heroSlides.map((item, index) => (
          <div
            key={item.id}
            aria-hidden={index !== current}
            className={cn(
              "absolute inset-0 h-full w-full",
              index === current ? "z-10 opacity-100" : "z-0 opacity-0"
            )}
          >
            <Image
              src={item.image}
              alt={item.region}
              fill
              priority
              quality={95}
              sizes="100vw"
              className="hero-bg-zoom object-cover object-center"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        <div className="grain absolute inset-0 opacity-20" />
      </div>

      {/* Content — image and text switch instantly with each slide */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-8 pt-28 sm:px-6 sm:pb-12 sm:pt-32 md:px-8 lg:px-10 lg:pb-14">
        <div className="relative max-w-2xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 rounded-3xl bg-gradient-to-t from-black/70 via-black/40 to-transparent sm:-inset-x-10"
          />
          <div className="hero-slide-text relative">
            <p className="label-luxury text-accent-light">{slide.region}</p>

            <h1 className="headline-editorial mt-3 text-[2.25rem] leading-[1.05] text-foreground-light sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]">
              {slide.headline} <em>{slide.headlineEm}</em>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
              {slide.description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
          <Button href="/properties" variant="secondary" size="lg">
            Browse Listings
          </Button>
          <Button href="/book-viewing" variant="glass" size="lg">
            Book a Viewing
          </Button>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center gap-2">
          {heroSlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === current ? "w-8 bg-accent-light" : "w-2 bg-white/35 hover:bg-white/55"
              )}
              aria-label={`Show ${item.region} slide`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
