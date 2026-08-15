import Image from "next/image";
import { agency } from "@/data/agency";
import { testimonials } from "@/data/testimonials";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-accent"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="border-y border-border bg-white/50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-luxury text-accent">Client Stories</p>
          <h2 className="headline-editorial mt-2 text-3xl text-primary sm:text-4xl">
            Trusted by buyers and sellers <em>across markets</em>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Real feedback from clients who searched, enquired, and booked viewings through{" "}
            {agency.name}.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {testimonials.map((item) => (
            <figure
              key={item.id}
              className="glass-card flex h-full flex-col rounded-2xl p-5 sm:p-6"
            >
              <Stars count={item.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-primary">{item.name}</p>
                  <p className="truncate text-xs text-muted">
                    {item.role} · {item.location}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
