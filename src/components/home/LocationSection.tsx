import Link from "next/link";
import { agency } from "@/data/agency";

export function LocationSection() {
  return (
    <section className="border-t border-border bg-background-dark py-12 text-foreground-light sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="label-luxury text-accent-light">Visit Us</p>
            <h2 className="headline-editorial mt-2 text-3xl sm:text-4xl">
              Global offices
            </h2>
            <div className="mt-6 space-y-4">
              {agency.offices.map((office) => (
                <div key={office.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium">{office.name}</p>
                  <p className="mt-1 text-sm text-white/60">{office.address}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-accent-light"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Aurelia Estates map"
              src={agency.mapEmbedUrl}
              className="aspect-[4/3] w-full border-0 lg:aspect-square"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
