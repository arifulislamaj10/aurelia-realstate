"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/data/creator";
import { Button } from "@/components/ui/Button";

interface LeadCaptureFormProps {
  intent?: "buy" | "sell" | "rent" | "viewing";
  propertyTitle?: string;
  title?: string;
  subtitle?: string;
}

export function LeadCaptureForm({
  intent = "buy",
  propertyTitle,
  title = "Get in Touch",
  subtitle = "Send your enquiry by email. I respond within 24 hours.",
}: LeadCaptureFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <p className="font-display text-2xl text-primary">Enquiry Received</p>
        <p className="mt-2 text-sm text-muted">
          Thank you{propertyTitle ? ` for your interest in ${propertyTitle}` : ""}.
          I&apos;ll reply to your email shortly.
        </p>
        <p className="label-luxury mt-4 text-muted">
          Demo mode. Production routes to {CONTACT_EMAIL}
        </p>
      </div>
    );
  }

  const inputClass =
    "glass-input w-full rounded-xl px-4 py-3.5 text-sm text-foreground";

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      <p className="label-luxury text-accent">{title === "Get in Touch" ? "Enquiry" : title}</p>
      <h3 className="mt-2 font-display text-2xl text-primary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>
      <p className="mt-3 text-xs text-muted">
        Replies sent to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-accent hover:underline">
          {CONTACT_EMAIL}
        </a>
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="label-luxury mb-2 block text-muted">Full Name</label>
          <input required type="text" name="name" placeholder="John Smith" className={inputClass} />
        </div>

        <div>
          <label className="label-luxury mb-2 block text-muted">Email</label>
          <input
            required
            type="email"
            name="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className="label-luxury mb-2 block text-muted">Interest</label>
          <select name="intent" defaultValue={intent} className={inputClass}>
            <option value="buy">Buying</option>
            <option value="sell">Selling</option>
            <option value="rent">Renting</option>
            <option value="viewing">Booking a viewing</option>
            <option value="project">Agency website or project enquiry</option>
          </select>
        </div>

        <div>
          <label className="label-luxury mb-2 block text-muted">Message</label>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell me about your agency, project, budget, or timeline..."
            className={`${inputClass} resize-none`}
          />
        </div>

        <Button type="submit" variant="secondary" className="w-full" disabled={loading}>
          {loading ? "Sending..." : "Send Enquiry"}
        </Button>
      </form>
    </div>
  );
}
