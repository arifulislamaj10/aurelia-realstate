import Link from "next/link";
import { agency } from "@/data/agency";
import { newsItems } from "@/data/news";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsPage() {
  return (
    <div className="page-top bg-background pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <p className="label-luxury text-accent">News</p>
        <h1 className="headline-editorial mt-3 text-3xl text-primary sm:text-4xl lg:text-5xl">
          Latest from {agency.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted sm:text-base">
            Market updates, open viewing events, and new listings from Aurelia Estates.
        </p>

        <div className="mt-10 space-y-4">
          {newsItems.map((item) => (
            <article
              key={item.slug}
              className="glass-card rounded-2xl p-5 sm:flex sm:items-start sm:justify-between sm:gap-8 sm:p-7"
            >
              <div className="max-w-2xl">
                <p className="label-luxury text-muted">{item.category}</p>
                <h2 className="mt-2 font-display text-xl text-primary sm:text-2xl">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.excerpt}</p>
              </div>
              <p className="mt-4 shrink-0 text-sm text-muted sm:mt-2">{formatDate(item.date)}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted">
          Want to list with us?{" "}
          <Link href="/sell" className="font-medium text-accent hover:underline">
            Sell your property
          </Link>
        </p>
      </div>
    </div>
  );
}
