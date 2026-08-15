import { Suspense } from "react";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { agency } from "@/data/agency";
import { filterProperties } from "@/data/properties";

interface PropertiesPageProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    status?: string;
    bedrooms?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;
  const filtered = filterProperties({
    query: params.q,
    type: params.type,
    status: params.status,
    bedrooms: params.bedrooms ? Number(params.bedrooms) : undefined,
  });

  return (
    <div className="page-top bg-background pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="label-luxury text-accent">{agency.name}</p>
          <h1 className="headline-editorial mt-3 text-3xl text-primary sm:text-4xl lg:text-5xl">
            Premium properties, <em>presented</em> properly
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Browse homes, condos, and commercial listings with exterior and interior
            photos on every property.
          </p>
        </div>

        <Suspense fallback={<div className="h-32 rounded-2xl bg-border" />}>
          <PropertyFilters />
        </Suspense>

        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="glass-card mt-10 rounded-2xl p-8 text-center sm:mt-12 sm:p-12">
            <p className="font-display text-xl text-primary sm:text-2xl">No matching properties</p>
            <p className="mt-2 text-sm text-muted sm:text-base">
              Adjust your filters to explore our full portfolio.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
