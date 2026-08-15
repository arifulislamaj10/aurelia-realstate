interface PropertyMapProps {
  lat?: number;
  lng?: number;
  title: string;
  address: string;
  city: string;
  state: string;
}

export function PropertyMap({ lat, lng, title, address, city, state }: PropertyMapProps) {
  const query =
    lat && lng
      ? `${lat},${lng}`
      : encodeURIComponent(`${address}, ${city}, ${state}`);

  const src =
    lat && lng
      ? `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`
      : `https://maps.google.com/maps?q=${query}&z=14&output=embed`;

  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground sm:text-xl">Location</h2>
      <p className="mt-1 text-sm text-muted">
        {address}, {city}, {state}
      </p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-border">
        <iframe
          title={`Map for ${title}`}
          src={src}
          className="aspect-[16/10] w-full border-0 sm:aspect-[16/9]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
