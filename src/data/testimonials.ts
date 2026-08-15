export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "us-buyer",
    quote:
      "The photo galleries and map view made it easy to shortlist homes before we flew in. We booked a viewing online and had an offer accepted within two weeks.",
    name: "Sarah Mitchell",
    role: "Home Buyer",
    location: "Austin, United States",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
  },
  {
    id: "uk-seller",
    quote:
      "Our listing looked premium from day one — exterior shots, room-by-room photos, and a clear enquiry form. Viewing requests came in faster than with our old site.",
    name: "James Whitfield",
    role: "Property Seller",
    location: "Manchester, United Kingdom",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
  },
  {
    id: "ca-investor",
    quote:
      "I could compare condos across cities, check locations on the map, and send a detailed enquiry in minutes. The team replied the next day with exactly what I needed.",
    name: "Priya Sharma",
    role: "Investor",
    location: "Toronto, Canada",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    rating: 5,
  },
  {
    id: "uk-buyer",
    quote:
      "Booking a viewing took less than a minute. Maria walked us through the property with full confidence because every detail was already on the listing page.",
    name: "Emily Clarke",
    role: "First-Time Buyer",
    location: "London, United Kingdom",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    rating: 5,
  },
];
