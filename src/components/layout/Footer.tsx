import Link from "next/link";
import { agency } from "@/data/agency";
import { CONTACT_EMAIL, developer } from "@/data/creator";

export function Footer() {
  return (
    <footer className="mt-auto bg-background-dark text-foreground-light">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                <span className="font-display text-lg text-accent">A</span>
              </div>
              <span className="font-display text-2xl">{agency.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50 sm:mt-5">
              {agency.description}
            </p>
            <p className="mt-3 text-xs text-white/40">
              Platform demo built by {developer.name}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block break-all text-sm text-accent-light transition-colors hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="lg:col-span-2">
            <h4 className="label-luxury text-white/40">Navigate</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li><Link href="/about" className="transition-colors hover:text-accent-light">About</Link></li>
              <li><Link href="/news" className="transition-colors hover:text-accent-light">News</Link></li>
              <li><Link href="/properties" className="transition-colors hover:text-accent-light">Properties</Link></li>
              <li><Link href="/book-viewing" className="transition-colors hover:text-accent-light">Book Viewing</Link></li>
              <li><Link href="/sell" className="transition-colors hover:text-accent-light">Sell</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-accent-light">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="label-luxury text-white/40">Specialties</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              {agency.specialties.slice(0, 5).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="label-luxury text-white/40">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                {agency.location}
                <br />
                <span className="text-white/40">{agency.region}</span>
              </li>
              <li>
                <a
                  href={`mailto:${agency.email}`}
                  className="break-all transition-colors hover:text-accent-light"
                >
                  {agency.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-8 text-xs text-white/30 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {agency.name}. Demo by {developer.name}</p>
          <p>Email only contact</p>
        </div>
      </div>
    </footer>
  );
}
