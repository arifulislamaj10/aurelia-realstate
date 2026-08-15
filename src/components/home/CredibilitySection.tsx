import Link from "next/link";
import { agency } from "@/data/agency";
import {
  CONTACT_EMAIL,
  credentials,
  developer,
  experience,
  techStack,
  ventures,
} from "@/data/creator";
import { Button } from "@/components/ui/Button";

export function CredibilitySection() {
  return (
    <>
      <section className="border-y border-border bg-white/50 py-16 backdrop-blur-sm sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="label-luxury text-accent">The Engineer Behind {agency.name}</p>
              <h2 className="headline-editorial mt-3 text-3xl text-primary sm:text-4xl lg:text-5xl">
                Built by someone who ships <em>production</em> systems
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">
                {developer.name}, {developer.headline.toLowerCase()}. This demo reflects
                real work at growing companies, backed by shipped products and client delivery.
              </p>

              <div className="mt-5 rounded-2xl border border-accent/20 bg-accent/5 p-4 sm:mt-6 sm:p-5">
                <p className="label-luxury text-muted">Email only</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-1 block break-all text-base font-medium text-primary transition-colors hover:text-accent"
                >
                  {CONTACT_EMAIL}
                </a>
                <p className="mt-1 text-xs text-muted">I reply within 24 hours</p>
              </div>

              <div className="mt-5 flex w-full flex-col gap-3 sm:mt-6 sm:w-auto sm:flex-row">
                <Button href="/contact" variant="secondary" size="sm" className="w-full sm:w-auto">
                  Work With Me
                </Button>
                <Link
                  href={developer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary transition-all hover:border-accent hover:text-accent sm:w-auto"
                >
                  LinkedIn Profile
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {credentials.map((item) => (
                  <div key={item.label} className="glass-card rounded-2xl p-4 text-center sm:p-5">
                    <p className="font-display text-2xl text-accent sm:text-3xl">{item.value}</p>
                    <p className="label-luxury mt-2 text-[0.6rem] text-muted sm:text-[0.6875rem]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 glass-card rounded-2xl p-5 sm:mt-6 sm:p-6">
                <p className="label-luxury text-muted">Professional Experience</p>
                <div className="mt-4 space-y-5 sm:mt-5">
                  {experience.map((job) => (
                    <div
                      key={job.company}
                      className="border-b border-border pb-5 last:border-0 last:pb-0"
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <p className="font-display text-lg text-primary sm:text-xl">{job.company}</p>
                        <p className="text-xs text-muted">{job.period}</p>
                      </div>
                      <p className="mt-0.5 text-sm font-medium text-accent">{job.role}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{job.highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 glass-card rounded-2xl p-5">
                <p className="label-luxury text-muted">Education</p>
                <p className="mt-2 text-sm font-medium text-primary">{developer.education}</p>
                <p className="mt-1 text-xs text-muted">Grade 3.56, Computer Science and Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="label-luxury text-accent">Ventures and Products</p>
              <h2 className="headline-editorial mt-3 text-3xl text-primary sm:text-4xl lg:text-5xl">
                Real projects. Real <em>delivery.</em>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                The {agency.name} demo is one part of a broader body of work. Each project below
                represents a full product built and delivered.
              </p>
            </div>
            <p className="text-sm text-muted">{ventures.length} projects showcased</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
            {ventures.map((venture) => (
              <div key={venture.name} className="glass-card rounded-2xl p-5 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="label-luxury text-accent">{venture.type}</p>
                    <h3 className="mt-1 font-display text-xl text-primary sm:text-2xl">
                      {venture.name}
                    </h3>
                  </div>
                  <span className="w-fit rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
                    {venture.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{venture.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 glass-card rounded-2xl p-5 sm:mt-10 sm:p-8">
            <p className="label-luxury text-muted">Technical Stack</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-white/60 px-3 py-1.5 text-xs text-primary sm:px-4 sm:py-2 sm:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
