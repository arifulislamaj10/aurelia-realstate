import { agency, agencyStats } from "@/data/agency";

export function AgencyStrip() {
  const { strip } = agency;

  return (
    <section className="bg-background-dark py-14 text-foreground-light sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="max-w-xl">
            <p className="label-luxury text-accent-light">{strip.eyebrow}</p>
            <h2 className="headline-editorial mt-3 text-[2rem] leading-[1.08] sm:text-4xl lg:text-[2.75rem]">
              {strip.headline} <em>{strip.headlineEm}</em>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
              {strip.subline}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {strip.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/85 sm:text-sm"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {agencyStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
              >
                <p className="font-display text-3xl leading-none text-accent-light sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-white">{stat.label}</p>
                <p className="mt-0.5 text-xs text-white/45">{stat.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
