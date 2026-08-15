import Image from "next/image";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { agency } from "@/data/agency";

const benefits = [
  {
    title: "Maximum Exposure",
    description:
      "Your property presented on a platform built to attract qualified, high-intent buyers.",
  },
  {
    title: "Editorial Presentation",
    description:
      "Strong photography and clear copy that give buyers confidence from the first visit.",
  },
  {
    title: "Qualified Enquiries",
    description:
      "Forms that capture intent, budget, and timeline alongside basic contact details.",
  },
  {
    title: "Dedicated Agent",
    description:
      "A senior agent guides you from valuation through to completion.",
  },
];

export default function SellPage() {
  return (
    <div>
      <section className="relative flex min-h-[45vh] items-end overflow-hidden pb-12 pt-24 sm:min-h-[50vh] sm:pb-16 sm:pt-28">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=85"
            alt="Luxury property"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          <div className="grain absolute inset-0" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
          <p className="label-luxury text-accent-light">Sell With {agency.name}</p>
          <h1 className="headline-editorial mt-3 max-w-2xl text-3xl text-foreground-light sm:text-5xl lg:text-6xl">
            List your property with a <em>trusted</em> premium agency
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/65 sm:mt-5 sm:text-base">
            {agency.name} helps sellers reach serious buyers with exterior and interior
            photos on every listing and a polished enquiry experience.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="label-luxury text-accent">Why List Here</p>
              <h2 className="headline-editorial mt-3 text-3xl text-primary sm:text-4xl">
                Marketing that matches your property&apos;s calibre
              </h2>
              <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="border-b border-border pb-5 last:border-0 last:pb-0">
                    <h3 className="font-display text-lg text-primary sm:text-xl">{benefit.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <LeadCaptureForm
              intent="sell"
              title="Request a Valuation"
              subtitle="Tell us about your property. A senior agent will respond within 24 hours."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
