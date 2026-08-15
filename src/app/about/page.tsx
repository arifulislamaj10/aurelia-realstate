import Image from "next/image";
import Link from "next/link";
import { agency, agencyStats, team } from "@/data/agency";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL, developer } from "@/data/creator";

export default function AboutPage() {
  return (
    <div className="page-top bg-background pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <p className="label-luxury text-accent">About Us</p>
        <h1 className="headline-editorial mt-3 max-w-3xl text-3xl text-primary sm:text-4xl lg:text-5xl">
          {agency.name}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {agency.description}           Established in {agency.established}, we serve buyers and sellers across the United States, United Kingdom, Canada, and international markets.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {agencyStats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-4 text-center sm:p-5">
              <p className="font-display text-2xl text-accent sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <section className="mt-14 sm:mt-16">
          <h2 className="headline-editorial text-2xl text-primary sm:text-3xl">Our Team</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {team.map((member) => (
              <div key={member.name} className="glass-card overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="font-display text-xl text-primary">{member.name}</p>
                  <p className="text-sm text-accent">{member.role}</p>
                  <p className="mt-2 text-sm text-muted">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 sm:mt-16">
          <h2 className="headline-editorial text-2xl text-primary sm:text-3xl">What We Do</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {agency.specialties.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm text-primary"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-14 flex flex-col gap-4 sm:flex-row sm:gap-5">
          <Button href="/properties" size="lg">
            Browse Properties
          </Button>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center justify-center rounded-full border border-border px-8 py-4 text-sm font-medium text-primary transition-colors hover:bg-white"
          >
            {CONTACT_EMAIL}
          </a>
        </section>

        <p className="mt-10 text-xs text-muted">
          Website demo built by {developer.name}.{" "}
          <Link href="/contact" className="text-accent hover:underline">
            Contact the developer
          </Link>
        </p>
      </div>
    </div>
  );
}
