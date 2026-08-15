export function formatPrice(price: number, status: string, region?: string): string {
  const isPH = region === "Pampanga" || region === "Philippines";
  const formatted = new Intl.NumberFormat(isPH ? "en-PH" : "en-US", {
    style: "currency",
    currency: isPH ? "PHP" : "USD",
    maximumFractionDigits: 0,
  }).format(price);

  return status === "for-rent" ? `${formatted}/mo` : formatted;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
