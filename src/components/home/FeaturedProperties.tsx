import { PropertyCard } from "@/components/properties/PropertyCard";
import { Button } from "@/components/ui/Button";
import { agency } from "@/data/agency";
import { getFeaturedProperties } from "@/data/properties";
import { CONTACT_EMAIL } from "@/data/creator";

export function FeaturedProperties() {
  const featured = getFeaturedProperties(6);

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="label-luxury text-accent">Featured Listings</p>
            <h2 className="headline-editorial mt-2 text-3xl text-primary sm:text-4xl">
              Exterior and interior on every property
            </h2>
          </div>
          <Button href="/properties" variant="outline" className="w-full sm:w-auto">
            View All {getFeaturedProperties().length} Listings
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="glass-dark rounded-2xl p-6 text-foreground-light sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <h2 className="headline-editorial text-2xl sm:text-3xl lg:text-4xl">
              Ready to view a property?
            </h2>
            <p className="mt-3 text-sm text-white/65 sm:text-base">
              Book a viewing online or email {agency.name}. We respond within 48 hours.
            </p>
          </div>
          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row lg:mt-0 lg:w-auto">
            <Button href="/book-viewing" variant="secondary" size="lg" className="w-full sm:w-auto">
              Book Viewing
            </Button>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-8 py-4 text-sm font-medium tracking-wide text-foreground-light transition-all hover:bg-white/10 sm:w-auto"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
