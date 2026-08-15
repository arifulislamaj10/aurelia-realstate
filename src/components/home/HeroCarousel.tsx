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
    <section className="relative h-[min(78dvh,38rem)] min-h-[28rem] sm:h-[100dvh] sm:min-h-0">
      {/* Background slides */}
      <div className="absolute inset-0 overflow-hidden">
        {heroSlides.map((item, index) => (
          <div
            key={item.id}
            aria-hidden={index !== current}
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-500",
              index === current ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={item.image}
              alt={item.region}
              fill
              priority
              quality={95}
              sizes="100vw"
              className="hero-bg-zoom hero-bg-image object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        <div className="grain absolute inset-0 opacity-20" />
      </div>

      {/* Content — lower left, above background */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-6 pt-20 sm:px-6 sm:pb-12 sm:pt-32 md:px-8 lg:px-10 lg:pb-14">
        <div className="relative max-w-2xl">
          <div className="hero-slide-text">
            <h1 className="headline-editorial text-[2rem] leading-[1.05] text-white sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]">
              {slide.headline} <em>{slide.headlineEm}</em>
            </h1>

            <p className="mt-4 hidden max-w-lg text-sm leading-relaxed text-white/90 sm:block sm:text-base">
              {slide.description}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-5 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
          <Button
            href="/properties"
            variant="glass"
            size="lg"
            className="w-full sm:w-auto sm:border-accent/20 sm:bg-accent sm:text-primary sm:shadow-lg sm:shadow-accent/25 sm:hover:bg-accent-light sm:hover:shadow-xl sm:hover:-translate-y-0.5"
          >
            Browse Listings
          </Button>
          <div className="hidden sm:contents">
            <Button href="/book-viewing" variant="glass" size="lg">
              Book a Viewing
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="relative z-10 mt-8 flex items-center gap-2 sm:mt-10">
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
