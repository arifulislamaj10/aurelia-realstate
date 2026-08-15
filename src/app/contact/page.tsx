import Link from "next/link";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { agency } from "@/data/agency";
import { CONTACT_EMAIL, developer } from "@/data/creator";

const contactInfo = [
  {
    title: "Email",
    detail: CONTACT_EMAIL,
    sub: "Primary contact. Response within 48 hours.",
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    title: "Offices",
    detail: agency.offices[0].name,
    sub: agency.offices[0].address,
  },
  {
    title: "Developer",
    detail: developer.name,
    sub: "Website demo portfolio",
    href: developer.linkedin,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="page-top bg-background pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="label-luxury text-accent">Contact</p>
          <h1 className="headline-editorial mt-3 text-3xl text-primary sm:text-4xl lg:text-5xl">
            Get in touch with <em>{agency.name}</em>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">
            Ask about a listing, book a viewing, or enquire about selling your property.
            Email is the best way to reach us.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-5 inline-flex max-w-full break-all rounded-full border border-accent/30 bg-accent/8 px-4 py-3 text-sm font-medium text-primary transition-all hover:bg-accent/15 sm:mt-6 sm:px-5"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactInfo.map((item) => (
                <div key={item.title} className="glass-card rounded-2xl p-5">
                  <h3 className="label-luxury text-muted">{item.title}</h3>
                  {item.href ? (
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="mt-1 block break-all font-medium text-primary transition-colors hover:text-accent"
                    >
                      {item.detail}
                    </Link>
                  ) : (
                    <p className="mt-1 font-medium text-primary">{item.detail}</p>
                  )}
                  <p className="mt-0.5 text-xs text-muted">{item.sub}</p>
                </div>
              ))}
            </div>

            <div className="glass-dark mt-5 rounded-2xl p-5 text-foreground-light sm:mt-6 sm:p-7">
              <p className="label-luxury text-accent-light">About This Demo</p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                This site is a live demo for <strong className="text-white">{agency.name}</strong>,
                built by <strong className="text-white">{developer.name}</strong>,
                Software Engineer (Co-Lead) at Betopia Group, with production experience
                at Bdcalling IT Ltd. and freelance work for US clients.
              </p>
              <p className="mt-3 text-sm text-white/50">
                I specialise in real estate websites, lead generation, and viewing
                automation for agencies in the Philippines and abroad.
              </p>
            </div>
          </div>

          <LeadCaptureForm
            title="Start a Conversation"
            subtitle="Tell me about your agency or project. I reply personally by email."
          />
        </div>
      </div>
    </div>
  );
}
