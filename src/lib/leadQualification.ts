import { LeadProfile, LeadTier, QualificationResult } from "@/types/chatbot";

const tierLabels: Record<LeadTier, string> = {
  hot: "Hot Lead",
  warm: "Warm Lead",
  cold: "Cold Lead",
};

export function getTierLabel(tier: LeadTier): string {
  return tierLabels[tier];
}

export function qualifyLead(profile: LeadProfile): QualificationResult {
  let score = 0;
  const reasons: string[] = [];

  switch (profile.timeline) {
    case "asap":
      score += 40;
      reasons.push("Ready to move or buy soon");
      break;
    case "1-3months":
      score += 25;
      reasons.push("Timeline within 1 to 3 months");
      break;
    case "3-6months":
      score += 10;
      reasons.push("Planning ahead within 6 months");
      break;
    case "exploring":
      reasons.push("Still exploring options");
      break;
  }

  if (profile.intent === "buy" || profile.intent === "rent" || profile.intent === "viewing") {
    score += 20;
    reasons.push("Clear buying or renting intent");
  } else if (profile.intent === "sell") {
    score += 15;
    reasons.push("Seller enquiry");
  } else {
    score += 5;
  }

  if (profile.budget && profile.budget !== "not-sure") {
    score += 15;
    reasons.push("Budget range provided");

    if (
      profile.budget.includes("15m") ||
      profile.budget.includes("10m") ||
      profile.budget.includes("50k")
    ) {
      score += 10;
      reasons.push("Strong budget fit for premium listings");
    }
  }

  if (profile.propertyInterest && profile.propertyInterest !== "none") {
    score += 20;
    reasons.push("Interested in a specific listing");
  }

  if (profile.location && profile.location !== "not-sure") {
    score += 10;
    reasons.push("Preferred area identified");
  }

  if (profile.email && profile.name) {
    score += 5;
    reasons.push("Contact details captured");
  }

  let tier: LeadTier = "cold";
  if (score >= 60) tier = "hot";
  else if (score >= 30) tier = "warm";

  const intentLabel =
    profile.intent === "buy"
      ? "buying"
      : profile.intent === "rent"
        ? "renting"
        : profile.intent === "sell"
          ? "selling"
          : profile.intent === "viewing"
            ? "booking a viewing"
            : "enquiring";

  const summary = `${getTierLabel(tier)}: ${profile.name ?? "Prospect"} is ${intentLabel}${
    profile.propertyInterest && profile.propertyInterest !== "none"
      ? ` about ${profile.propertyInterest}`
      : " worldwide"
  }. Score ${score}/100.`;

  return { tier, score, summary, reasons };
}

export function buildEnquiryEmail(profile: LeadProfile, result: QualificationResult): string {
  const subject = encodeURIComponent(
    `[${getTierLabel(result.tier)}] Aurelia Estates enquiry from ${profile.name ?? "Prospect"}`
  );

  const body = encodeURIComponent(
    [
      `Lead tier: ${getTierLabel(result.tier)} (${result.score}/100)`,
      "",
      `Name: ${profile.name ?? "Not provided"}`,
      `Email: ${profile.email ?? "Not provided"}`,
      `Intent: ${profile.intent ?? "Not provided"}`,
      `Location: ${profile.location ?? "Not provided"}`,
      `Timeline: ${profile.timeline ?? "Not provided"}`,
      `Budget: ${profile.budget ?? "Not provided"}`,
      `Property interest: ${profile.propertyInterest ?? "None"}`,
      "",
      profile.message ? `Message:\n${profile.message}` : "",
      "",
      "Qualification notes:",
      ...result.reasons.map((r) => `- ${r}`),
      "",
      "Sent via Aurelia Estates website chatbot (demo).",
    ]
      .filter(Boolean)
      .join("\n")
  );

  return `mailto:?subject=${subject}&body=${body}`;
}
