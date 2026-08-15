export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: "luxury-listings-2026",
    title: "Strong demand for premium listings in early 2026",
    excerpt:
      "Aurelia Estates added new furnished units and luxury homes with exterior and interior galleries across multiple markets.",
    date: "2026-02-10",
    category: "Market Update",
  },
  {
    slug: "open-viewing-weekend",
    title: "Open viewing weekend now booking online",
    excerpt:
      "Selected properties are open for scheduled viewings. Book online or send an email enquiry.",
    date: "2026-01-28",
    category: "Events",
  },
  {
    slug: "first-time-buyer-guide",
    title: "First-time buyer guide for 2026",
    excerpt:
      "A quick look at what buyers can expect when searching for their next home this quarter.",
    date: "2026-01-15",
    category: "Guides",
  },
  {
    slug: "new-listings-photo-tours",
    title: "New listings with full photo tours",
    excerpt:
      "Every new Aurelia Estates listing includes exterior shots, interior rooms, and map location before you enquire.",
    date: "2025-12-20",
    category: "Listings",
  },
];

export function getNewsItem(slug: string): NewsItem | undefined {
  return newsItems.find((item) => item.slug === slug);
}
