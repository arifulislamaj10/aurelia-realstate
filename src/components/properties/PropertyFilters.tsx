"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { filterProperties } from "@/data/properties";

export function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = useMemo(
    () => ({
      q: searchParams.get("q") || "",
      type: searchParams.get("type") || "all",
      status: searchParams.get("status") || "all",
      bedrooms: searchParams.get("bedrooms") || "",
    }),
    [searchParams]
  );

  const resultCount = useMemo(
    () =>
      filterProperties({
        query: current.q || undefined,
        type: current.type,
        status: current.status,
        bedrooms: current.bedrooms ? Number(current.bedrooms) : undefined,
      }).length,
    [current]
  );

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/properties?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-lg text-primary sm:text-xl">Refine Search</h2>
        <span className="label-luxury text-muted">{resultCount} properties</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-5">
          <label className="label-luxury mb-2 block text-muted">Location</label>
          <input
            type="text"
            defaultValue={current.q}
            onChange={(e) => updateFilters("q", e.target.value)}
            placeholder="City, postcode, or neighbourhood..."
            className="glass-input w-full rounded-xl px-4 py-3.5"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="label-luxury mb-2 block text-muted">Type</label>
          <select
            value={current.type}
            onChange={(e) => updateFilters("type", e.target.value)}
            className="glass-input w-full rounded-xl px-4 py-3.5"
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
            value={current.status}
            onChange={(e) => updateFilters("status", e.target.value)}
            className="glass-input w-full rounded-xl px-4 py-3.5"
          >
            <option value="all">Buy / Rent</option>
            <option value="for-sale">For Sale</option>
            <option value="for-rent">For Rent</option>
          </select>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className="label-luxury mb-2 block text-muted">Min Bedrooms</label>
          <select
            value={current.bedrooms}
            onChange={(e) => updateFilters("bedrooms", e.target.value)}
            className="glass-input w-full rounded-xl px-4 py-3.5"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
    </div>
  );
}
