import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertyMap } from "@/components/properties/PropertyMap";
import { VirtualTour } from "@/components/properties/VirtualTour";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { agency } from "@/data/agency";
import { getPropertyBySlug, properties } from "@/data/properties";
import { formatNumber, formatPrice } from "@/lib/utils";

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) notFound();

  const statusVariant =
    property.status === "for-sale"
      ? "sale"
      : property.status === "for-rent"
        ? "rent"
        : "default";

  return (
    <div className="page-top bg-background pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <Link
          href="/properties"
          className="mb-5 inline-block text-sm text-muted hover:text-primary sm:mb-6"
        >
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2">
            <PropertyGallery
              images={property.images}
              imageLabels={property.imageLabels}
              title={property.title}
            />

            <div className="mt-6 sm:mt-8">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge variant={statusVariant}>
                  {property.status.replace("-", " ")}
                </Badge>
                <Badge variant="glass">{agency.name}</Badge>
                <span className="rounded-full bg-primary/5 px-3 py-1 text-xs font-medium capitalize text-primary">
                  {property.type}
                </span>
              </div>

              <h1 className="headline-editorial mt-4 text-3xl text-primary sm:text-4xl lg:text-5xl">
                {property.title}
              </h1>
              <p className="mt-2 text-sm text-muted sm:text-base">
                {property.address}, {property.city}, {property.state} {property.zip}
              </p>

              <p className="mt-3 font-display text-3xl text-accent sm:text-4xl">
                {formatPrice(property.price, property.status, property.state)}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl border border-border bg-card p-4 sm:mt-6 sm:flex sm:flex-wrap sm:gap-6 sm:p-5">
                {property.bedrooms > 0 && (
                  <div>
                    <p className="text-sm font-semibold">{property.bedrooms}</p>
                    <p className="text-xs text-muted">Bedrooms</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold">{property.bathrooms}</p>
                  <p className="text-xs text-muted">Bathrooms</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">{formatNumber(property.sqft)}</p>
                  <p className="text-xs text-muted">Sq Ft</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">{property.yearBuilt}</p>
                  <p className="text-xs text-muted">Year Built</p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <h2 className="text-lg font-semibold text-foreground sm:text-xl">About This Property</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {property.description}
                </p>
              </div>

              <div className="mt-6 sm:mt-8">
                <h2 className="text-lg font-semibold text-foreground sm:text-xl">Amenities</h2>
                <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                  {property.amenities.map((amenity) => (
                    <li key={amenity} className="text-sm text-muted">
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              <VirtualTour
                images={property.images}
                imageLabels={property.imageLabels}
                title={property.title}
                videoUrl={property.videoUrl}
                has360Tour={property.has360Tour}
              />

              <div className="mt-6 sm:mt-8">
                <PropertyMap
                  lat={property.lat}
                  lng={property.lng}
                  title={property.title}
                  address={property.address}
                  city={property.city}
                  state={property.state}
                />
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6">
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <h3 className="font-display text-lg text-primary">Interested in this property?</h3>
              <p className="mt-1 text-sm text-muted">
                Book a viewing or send an enquiry to {agency.name}.
              </p>
              <div className="mt-4">
                <Button
                  href={`/book-viewing?property=${property.id}`}
                  className="w-full"
                >
                  Book a Viewing
                </Button>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <h3 className="font-display text-lg text-primary">{agency.name}</h3>
              <p className="mt-1 text-sm text-muted">{agency.tagline}</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={property.agent.image}
                    alt={property.agent.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold">{property.agent.name}</p>
                  <p className="text-sm text-muted">{property.agent.title}</p>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href={`mailto:${property.agent.email}`}
                  className="break-all text-sm text-muted transition-colors hover:text-accent"
                >
                  {property.agent.email}
                </a>
              </div>
            </div>

            <LeadCaptureForm
              intent="viewing"
              propertyTitle={property.title}
              title="Quick Inquiry"
              subtitle="Send a message about this property. We respond within 24 hours."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
