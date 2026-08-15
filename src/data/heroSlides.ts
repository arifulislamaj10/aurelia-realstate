export interface HeroSlide {
  id: string;
  region: string;
  headline: string;
  headlineEm: string;
  description: string;
  image: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "us",
    region: "United States",
    headline: "Exceptional homes across the",
    headlineEm: "United States",
    description:
      "Listings with full exterior and interior galleries, built for buyers who expect a premium search experience.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=3840&q=95",
  },
  {
    id: "uk",
    region: "United Kingdom",
    headline: "Refined property discovery in the",
    headlineEm: "United Kingdom",
    description:
      "Present every listing properly from the outside and inside, with enquiry flows that feel as polished as the homes you sell.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=3840&q=95",
  },
  {
    id: "ca",
    region: "Canada",
    headline: "Beautiful living, beautifully",
    headlineEm: "presented",
    description:
      "Help buyers explore houses, condos, and estates with clear photos, smart filters, and viewing bookings in one place.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=3840&q=95",
  },
  {
    id: "global",
    region: "Worldwide",
    headline: "A real estate platform for",
    headlineEm: "agencies everywhere",
    description:
      "One custom site for lead capture, property search, AI qualification, and viewings. Built to impress clients in any market.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=3840&q=95",
  },
];

export const AUTOPLAY_MS = 9000;
