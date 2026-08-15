import Link from "next/link";
import { agency } from "@/data/agency";
import { newsItems } from "@/data/news";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function NewsSection() {
  const latest = newsItems.slice(0, 3);

  return (
    <section className="border-y border-border bg-white/50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-luxury text-accent">Latest News</p>
            <h2 className="headline-editorial mt-2 text-3xl text-primary sm:text-4xl">
              Updates from {agency.name}
            </h2>
          </div>
          <Link
            href="/news"
            className="text-sm font-medium text-accent transition-colors hover:text-accent-dark"
          >
            View all news
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {latest.map((item) => (
            <article key={item.slug} className="glass-card rounded-2xl p-5 sm:p-6">
              <p className="label-luxury text-muted">{item.category}</p>
              <h3 className="mt-2 font-display text-lg text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.excerpt}</p>
              <p className="mt-4 text-xs text-muted">{formatDate(item.date)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
