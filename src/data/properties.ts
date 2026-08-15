import { Property } from "@/types/property";
import { CONTACT_EMAIL } from "@/data/creator";

const agentOne = {
  name: "Maria Aurelia",
  title: "Founder, Aurelia Estates",
  phone: "",
  email: CONTACT_EMAIL,
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
};

const agentTwo = {
  name: "Rafael Santos",
  title: "Senior Property Consultant",
  phone: "",
  email: CONTACT_EMAIL,
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
};

export const properties: Property[] = [
  {
    id: "7",
    slug: "angeles-skyline-penthouse",
    title: "Skyline Penthouse",
    description:
      "Brand-new duplex-style home in a gated Angeles City subdivision. Clean modern facade with carport, shared wall layout, and a practical two-storey floor plan. Ground floor has living, dining, and kitchen; upper floor holds bedrooms and a small balcony. Ideal for families who want a recent build without condo fees.",
    price: 8900000,
    type: "house",
    status: "for-sale",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1580,
    address: "Sapang Bato Subdivision",
    city: "Angeles City",
    state: "Pampanga",
    zip: "2009",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85",
    ],
    imageLabels: ["Duplex Exterior", "Side View", "Living & Dining", "Upper Floor"],
    lat: 15.1472,
    lng: 120.5847,
    videoUrl: "https://www.youtube.com/embed/itVidSefLCI",
    has360Tour: true,
    featured: true,
    amenities: ["Duplex Layout", "Carport", "Gated Subdivision", "Recent Build", "Near Main Road"],
    yearBuilt: 2024,
    agent: agentOne,
  },
  {
    id: "1",
    slug: "angeles-city-modern-villa",
    title: "Angeles City Modern Villa",
    description:
      "A spacious modern villa in a quiet Angeles City subdivision. The property opens to a wide driveway and landscaped front garden, with a bright open-plan interior, high ceilings, and a covered patio ideal for family gatherings. Close to schools, malls, and Clark Freeport.",
    price: 18500000,
    type: "house",
    status: "for-sale",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    address: "Malabanias Road",
    city: "Angeles City",
    state: "Pampanga",
    zip: "2009",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
    ],
    imageLabels: ["Exterior", "Front View", "Living Area", "Master Bedroom"],
    lat: 15.145,
    lng: 120.5847,
    videoUrl: "https://www.youtube.com/embed/CBgPCPd1Iic",
    has360Tour: true,
    featured: true,
    amenities: ["Carport", "Garden", "Security Gate", "Open Plan Kitchen", "Covered Patio"],
    yearBuilt: 2020,
    agent: agentOne,
  },
  {
    id: "2",
    slug: "san-fernando-family-home",
    title: "San Fernando Family Home",
    description:
      "Well-maintained two-storey home in San Fernando with a clean facade, gated entry, and a practical layout for growing families. Inside features a large living and dining space, modern kitchen, and bedrooms with built-in storage. Minutes from the city centre and major roads.",
    price: 9800000,
    type: "house",
    status: "for-sale",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    address: "Brgy. Dolores",
    city: "San Fernando",
    state: "Pampanga",
    zip: "2000",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
      "https://images.unsplash.com/photo-1605276374101-de7982db5439?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85",
    ],
    imageLabels: ["Exterior", "Street View", "Interior", "Kitchen"],
    lat: 15.0319,
    lng: 120.6892,
    has360Tour: true,
    featured: true,
    amenities: ["Gated Community", "Carport", "Laundry Area", "Near Schools"],
    yearBuilt: 2016,
    agent: agentTwo,
  },
  {
    id: "3",
    slug: "clark-condo-for-rent",
    title: "Clark Area Condo Unit",
    description:
      "Furnished condo unit near Clark Freeport with resort-style building exterior and a comfortable interior suited for professionals or small families. Building includes pool, gym, and 24-hour security. Ideal for expats and business travellers.",
    price: 45000,
    type: "condo",
    status: "for-rent",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    address: "Global Gateway Logistics Park Area",
    city: "Mabalacat",
    state: "Pampanga",
    zip: "2010",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=85",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85",
    ],
    imageLabels: ["Building Exterior", "Balcony View", "Living Room", "Bedroom"],
    lat: 15.2233,
    lng: 120.5792,
    videoUrl: "https://www.youtube.com/embed/a7SKv3UYWcQ",
    featured: true,
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Furnished", "Near Clark"],
    yearBuilt: 2019,
    agent: agentOne,
  },
  {
    id: "4",
    slug: "mabalacat-townhouse",
    title: "Mabalacat Townhouse",
    description:
      "Neat three-bedroom townhouse with a compact front exterior and efficient interior layout. Ground floor has living, dining, and kitchen; upper floor holds bedrooms and a small study nook. Good option for first-time buyers near Clark and Angeles.",
    price: 6200000,
    type: "house",
    status: "for-sale",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1450,
    address: "Camachiles Phase 2",
    city: "Mabalacat",
    state: "Pampanga",
    zip: "2010",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=85",
      "https://images.unsplash.com/photo-1600047509807-ba8f84d2e445?w=1200&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85",
    ],
    imageLabels: ["Exterior", "Front Entry", "Interior", "Dining Area"],
    lat: 15.2233,
    lng: 120.56,
    featured: true,
    amenities: ["Carport", "Row House", "Near Main Road", "Ready for Occupancy"],
    yearBuilt: 2018,
    agent: agentTwo,
  },
  {
    id: "5",
    slug: "bacolor-commercial-space",
    title: "Bacolor Commercial Space",
    description:
      "Ground-floor commercial unit along a busy Bacolor road with strong street frontage and clear exterior signage space. Interior is open and ready for retail, clinic, or office fit-out. Strong foot traffic and parking available out front.",
    price: 65000,
    type: "commercial",
    status: "for-rent",
    bedrooms: 0,
    bathrooms: 1,
    sqft: 1200,
    address: "MacArthur Highway",
    city: "Bacolor",
    state: "Pampanga",
    zip: "2001",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85",
    ],
    imageLabels: ["Street Exterior", "Storefront", "Interior"],
    lat: 15.001,
    lng: 120.651,
    featured: true,
    amenities: ["Street Frontage", "Parking", "High Visibility", "Flexible Layout"],
    yearBuilt: 2015,
    agent: agentOne,
  },
  {
    id: "6",
    slug: "porac-lot-with-resthouse",
    title: "Porac Lot with Rest House",
    description:
      "Peaceful property in Porac with a native-style rest house surrounded by open land. Exterior shows the full lot and structure; interior is simple and airy, suited for weekend retreats or future development. Popular with buyers seeking space outside the city.",
    price: 12500000,
    type: "house",
    status: "for-sale",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 3200,
    address: "Brgy. Manuali",
    city: "Porac",
    state: "Pampanga",
    zip: "2008",
    images: [
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=85",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=85",
    ],
    imageLabels: ["Exterior", "Property View", "Interior", "Open Space"],
    lat: 15.072,
    lng: 120.541,
    featured: true,
    amenities: ["Large Lot", "Rest House", "Quiet Area", "Development Potential"],
    yearBuilt: 2012,
    agent: agentTwo,
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(limit = 6): Property[] {
  return properties.filter((p) => p.featured).slice(0, limit);
}

export function filterProperties(filters: {
  query?: string;
  type?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  city?: string;
}): Property[] {
  return properties.filter((property) => {
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const matches =
        property.title.toLowerCase().includes(q) ||
        property.city.toLowerCase().includes(q) ||
        property.address.toLowerCase().includes(q) ||
        property.state.toLowerCase().includes(q) ||
        q.includes("pampanga") ||
        q.includes("philippines");
      if (!matches) return false;
    }
    if (filters.type && filters.type !== "all" && property.type !== filters.type) return false;
    if (filters.status && filters.status !== "all" && property.status !== filters.status) return false;
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
    if (filters.city && !property.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    return true;
  });
}
