export type PropertyType = "house" | "apartment" | "condo" | "commercial" | "land";
export type ListingStatus = "for-sale" | "for-rent" | "sold" | "pending";

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  status: ListingStatus;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  images: string[];
  imageLabels?: string[];
  lat?: number;
  lng?: number;
  videoUrl?: string;
  has360Tour?: boolean;
  featured: boolean;
  amenities: string[];
  yearBuilt: number;
  agent: {
    name: string;
    title: string;
    phone: string;
    email: string;
    image: string;
  };
}

export interface PropertyFilters {
  query?: string;
  type?: PropertyType | "all";
  status?: ListingStatus | "all";
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  city?: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  message: string;
  intent: "buy" | "sell" | "rent" | "viewing" | "project";
  propertyId?: string;
}

export interface ViewingBookingData {
  name: string;
  email: string;
  propertyId: string;
  propertyTitle: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}
