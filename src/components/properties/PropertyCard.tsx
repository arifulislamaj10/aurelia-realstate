import Image from "next/image";
import Link from "next/link";
import { agency } from "@/data/agency";
import { Property } from "@/types/property";
import { formatNumber, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface PropertyCardProps {
  property: Property;
}

function statusVariant(status: Property["status"]) {
  switch (status) {
    case "for-sale":
      return "sale" as const;
    case "for-rent":
      return "rent" as const;
    case "pending":
      return "pending" as const;
    default:
      return "sold" as const;
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  const exteriorLabel = property.imageLabels?.[0] ?? "Exterior";

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group glass-card flex flex-col overflow-hidden rounded-2xl transition-shadow hover:shadow-lg hover:shadow-black/8"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={`${property.title} exterior`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
          <Badge variant={statusVariant(property.status)}>
            {property.status.replace("-", " ")}
          </Badge>
          <Badge variant="glass">{exteriorLabel}</Badge>
          {property.has360Tour && <Badge variant="glass">360°</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="label-luxury text-[0.6rem] text-accent sm:text-[0.6875rem]">
          {agency.name}
        </p>
        <p className="font-display text-2xl text-primary sm:text-3xl">
          {formatPrice(property.price, property.status, property.state)}
        </p>
        <h3 className="mt-1 font-display text-lg text-primary sm:text-xl">
          {property.title}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {property.city}, {property.state}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-border pt-3 text-xs text-muted sm:mt-4 sm:gap-4 sm:pt-4">
          {property.bedrooms > 0 && <span>{property.bedrooms} bed</span>}
          <span>{property.bathrooms} bath</span>
          <span>{formatNumber(property.sqft)} sqft</span>
          {property.images.length > 1 && (
            <span>{property.images.length} photos</span>
          )}
        </div>
      </div>
    </Link>
  );
}
