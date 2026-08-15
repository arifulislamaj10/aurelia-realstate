"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (type !== "all") params.set("type", type);
    if (status !== "all") params.set("status", status);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="glass-card w-full rounded-2xl p-4 sm:p-6 lg:p-8"
    >
      <div className="mb-4 sm:mb-5">
        <p className="label-luxury text-accent">Search</p>
        <p className="mt-1 font-display text-xl text-primary sm:text-2xl">
          Find your next property
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
        <div className="sm:col-span-2 lg:col-span-5">
          <label className="label-luxury mb-2 block text-muted">Location</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="City, postcode, or neighbourhood..."
            className="glass-input w-full rounded-xl px-4 py-3.5 text-foreground"
          />
        </div>

        <div className="lg:col-span-3">
          <label className="label-luxury mb-2 block text-muted">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="glass-input w-full rounded-xl px-4 py-3.5 text-foreground"
          >
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <label className="label-luxury mb-2 block text-muted">Listing</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="glass-input w-full rounded-xl px-4 py-3.5 text-foreground"
          >
            <option value="all">Buy / Rent</option>
            <option value="for-sale">For Sale</option>
            <option value="for-rent">For Rent</option>
          </select>
        </div>

        <div className="sm:col-span-2 lg:col-span-2 lg:flex lg:items-end">
          <Button type="submit" variant="secondary" className="w-full">
            Search Properties
          </Button>
        </div>
      </div>
    </form>
  );
}
