import { HeroCarousel } from "@/components/home/HeroCarousel";

export function Hero() {
  return <HeroCarousel />;
}

export function CustomerJourney() {
  const steps = [
    {
      step: "01",
      title: "Discovery",
      description:
        "Buyers find the right listings through search, filters, and curated featured properties.",
    },
    {
      step: "02",
      title: "Lead Capture",
      description:
        "Enquiry forms collect intent, budget, and timeline before an agent gets involved.",
    },
    {
      step: "03",
      title: "Qualification",
      description:
        "Inquiries are organised by intent so agents focus on prospects ready to move forward.",
    },
    {
      step: "04",
      title: "Viewing",
      description:
        "Prospects book viewings online. Calendar sync reduces the back-and-forth that slows deals.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background-dark py-16 text-foreground-light sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="label-luxury text-accent">The Conversion System</p>
          <h2 className="headline-editorial mt-3 text-3xl sm:text-4xl lg:text-5xl">
            From first impression to <em>signed offer</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-light sm:mt-5 sm:text-base">
            A complete digital workflow built around how property transactions actually
            happen. Search, enquiry, qualification, and booking in one connected system.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.title} className="glass rounded-2xl p-5 sm:p-6 lg:p-7">
              <p className="label-luxury text-accent">{step.step}</p>
              <h3 className="mt-3 font-display text-xl sm:text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55 sm:mt-3">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyCustomSection() {
  const points = [
    {
      title: "Generic sites get ignored. Custom platforms get enquiries.",
      body: "Buyers notice the difference immediately when every listing shows exterior and interior photos. Aurelia Estates is built for that standard.",
    },
    {
      title: "Speed builds trust.",
      body: "Fast load times, smooth interactions, and a polished mobile experience keep buyers on your site long enough to enquire.",
    },
    {
      title: "Built to work with your existing tools.",
      body: "CRM integration, calendar sync, MLS feeds, and lead qualification can connect to the systems your agency already uses.",
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label-luxury text-accent">Why Work With a Developer</p>
            <h2 className="headline-editorial mt-3 text-3xl text-primary sm:text-4xl lg:text-5xl">
              Your agency needs more than a <em>template</em> website
            </h2>
            <div className="accent-line mt-5 sm:mt-6" />
            <p className="mt-5 text-sm leading-relaxed text-muted sm:mt-6 sm:text-base">
              This demo for Aurelia Estates shows what is possible when real
              engineering goes into a premium real estate platform. Exterior and
              interior galleries, enquiry forms, and viewing bookings in one place.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {points.map((point, i) => (
              <div key={point.title} className="glass-card rounded-2xl p-5 sm:p-7">
                <span className="label-luxury text-accent">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg text-primary sm:text-xl">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
