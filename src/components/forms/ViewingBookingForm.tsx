"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/data/creator";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/Button";

interface ViewingBookingFormProps {
  properties: Property[];
  preselectedPropertyId?: string;
}

export function ViewingBookingForm({
  properties,
  preselectedPropertyId,
}: ViewingBookingFormProps) {
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
        <p className="font-display text-2xl text-primary">Viewing Confirmed</p>
        <p className="mt-2 text-sm text-muted">
          Your request has been received. Confirmation will be sent to your email.
        </p>
        <p className="label-luxury mt-4 text-muted">
          Demo mode. Production notifies {CONTACT_EMAIL}
        </p>
      </div>
    );
  }

  const inputClass =
    "glass-input w-full rounded-xl px-4 py-3.5 text-sm text-foreground";

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-luxury mb-2 block text-muted">Full Name</label>
          <input required type="text" name="name" placeholder="Your full name" className={inputClass} />
        </div>
        <div>
          <label className="label-luxury mb-2 block text-muted">Email</label>
          <input required type="email" name="email" placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="label-luxury mb-2 block text-muted">Property</label>
        <select
          required
          name="propertyId"
          defaultValue={preselectedPropertyId || ""}
          className={inputClass}
        >
          <option value="" disabled>Select a property...</option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}, {p.city}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-luxury mb-2 block text-muted">Preferred Date</label>
          <input
            required
            type="date"
            name="preferredDate"
            min={new Date().toISOString().split("T")[0]}
            className={inputClass}
          />
        </div>
        <div>
          <label className="label-luxury mb-2 block text-muted">Preferred Time</label>
          <select required name="preferredTime" className={inputClass}>
            <option value="" disabled>Select a time...</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label-luxury mb-2 block text-muted">Notes</label>
        <textarea
          name="notes"
          rows={3}
          placeholder="Special requests or questions..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <Button type="submit" variant="secondary" size="lg" className="w-full" disabled={loading}>
        {loading ? "Booking..." : "Request Viewing"}
      </Button>
    </form>
  );
}
