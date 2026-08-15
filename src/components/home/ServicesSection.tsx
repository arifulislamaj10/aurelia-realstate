const services = [
  {
    title: "Property Listings",
    description:
      "Search, filter, and browse properties with gallery-rich detail pages that work on every device.",
  },
  {
    title: "Lead Capture",
    description:
      "Enquiry forms that collect intent, budget, and timeline. The information agents need to follow up properly.",
  },
  {
    title: "AI Lead Qualification",
    description:
      "A built-in AI assistant captures budget, timeline, and location — so your team only follows up on serious enquiries.",
  },
  {
    title: "Viewing Automation",
    description:
      "Prospects book viewings online. Calendar integration removes the admin work that slows agencies down.",
  },
  {
    title: "Agent Dashboard",
    description:
      "A central view of leads, bookings, and listing performance. Architecture ready for production use.",
  },
  {
    title: "Mobile First",
    description:
      "Most property searches start on a phone. Every page is built mobile-first from the ground up.",
  },
];

export function ServicesSection() {
  return (
    <section className="border-y border-border bg-white/40 py-16 backdrop-blur-sm sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-luxury text-accent">Platform Capabilities</p>
          <h2 className="headline-editorial mt-3 text-3xl text-primary sm:text-4xl lg:text-5xl">
            Every feature serves a <em>business outcome</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Each capability below maps to a real need for agencies: attracting buyers,
            capturing enquiries, and converting interest into booked viewings.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="glass-card rounded-2xl p-5 sm:p-7">
              <h3 className="font-display text-lg text-primary sm:text-xl">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
