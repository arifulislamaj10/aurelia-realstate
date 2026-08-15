import { HeroSearch } from "@/components/home/HeroSearch";

export function SearchSection() {
  return (
    <section className="border-b border-border bg-white/60 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        <HeroSearch />
      </div>
    </section>
  );
}
