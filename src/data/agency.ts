import { CONTACT_EMAIL } from "@/data/creator";

export const agency = {
  name: "Aurelia Estates",
  shortName: "Aurelia",
  tagline: "Premium Property Specialists",
  location: "United States · United Kingdom · Canada",
  region: "Worldwide",
  description:
    "Aurelia Estates helps buyers, sellers, and investors find the right property with full exterior and interior galleries, map locations, AI lead qualification, and easy viewing bookings.",
  strip: {
    eyebrow: "Why Aurelia Estates",
    headline: "List smarter.",
    headlineEm: "Close with confidence.",
    subline:
      "Full galleries, map locations, AI lead qualification, and one-click viewings — everything serious buyers expect, built into one polished agency site.",
    features: [
      "Exterior & interior galleries",
      "Map locations",
      "AI lead qualification",
      "Online viewings",
    ],
  },
  email: CONTACT_EMAIL,
  established: "2018",
  offices: [
    {
      name: "United States",
      address: "Serving buyers and sellers nationwide",
    },
    {
      name: "United Kingdom",
      address: "Residential and commercial across major markets",
    },
    {
      name: "Canada",
      address: "Homes, condos, and estates coast to coast",
    },
  ],
  mapEmbedUrl:
    "https://maps.google.com/maps?q=London,+United+Kingdom&z=5&output=embed",
  specialties: [
    "Residential Sales",
    "Luxury Listings",
    "Property Rentals",
    "Commercial Leasing",
    "Investment Properties",
  ],
};

export const team = [
  {
    name: "Maria Aurelia",
    role: "Founder & Broker",
    bio: "15 years helping clients buy and sell premium property across multiple markets.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Rafael Santos",
    role: "Senior Property Consultant",
    bio: "Specialises in luxury homes, condos, and high-intent buyer enquiries.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Jenny Cruz",
    role: "Leasing Specialist",
    bio: "Handles rentals and commercial listings with clear photo-led presentations.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
];

export const agencyStats = [
  { value: "150+", label: "Active Listings", hint: "Live on site" },
  { value: "48hr", label: "Avg. Response", hint: "Leads answered fast" },
  { value: "95%", label: "Client Satisfaction", hint: "Buyers come back" },
  { value: "500+", label: "Viewings / Year", hint: "Booked online" },
];

export const featuredVideo = {
  title: "Walk through a featured listing",
  description:
    "Full house walkthrough from the exterior facade to the living areas, kitchen, and bedrooms before you book a viewing with Aurelia Estates.",
  youtubeId: "CBgPCPd1Iic",
  label: "Modern Home Full Walkthrough",
};

export const houseTourVideos = [
  {
    youtubeId: "CBgPCPd1Iic",
    title: "Modern Contemporary House Walkthrough",
    label: "Exterior to interior tour",
  },
  {
    youtubeId: "itVidSefLCI",
    title: "Family Home Tour",
    label: "Full property walkthrough",
  },
  {
    youtubeId: "FDyedsSrYxA",
    title: "Modern Home Tour",
    label: "Minimalist design",
  },
  {
    youtubeId: "a7SKv3UYWcQ",
    title: "Luxury Home Room Tour",
    label: "Living, kitchen, bedroom",
  },
];
