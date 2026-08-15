export type LeadTier = "hot" | "warm" | "cold";

export type LeadIntent = "buy" | "rent" | "sell" | "viewing" | "general";

export type LeadTimeline = "asap" | "1-3months" | "3-6months" | "exploring";

export interface LeadProfile {
  intent?: LeadIntent;
  location?: string;
  timeline?: LeadTimeline;
  budget?: string;
  propertyInterest?: string;
  name?: string;
  email?: string;
  message?: string;
}

export interface QualificationResult {
  tier: LeadTier;
  score: number;
  summary: string;
  reasons: string[];
}

export interface QuickReply {
  value: string;
  label: string;
}

export interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
  tier?: LeadTier;
  quickReplies?: QuickReply[];
  quickRepliesUsed?: boolean;
  searchResults?: {
    query: string;
    items: {
      id: string;
      slug: string;
      title: string;
      city: string;
      bedrooms: number;
      priceLabel: string;
    }[];
  };
  qualification?: QualificationResult;
}
