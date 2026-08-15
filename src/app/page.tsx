import { Hero } from "@/components/home/Hero";
import { SearchSection } from "@/components/home/SearchSection";
import { AgencyStrip } from "@/components/home/AgencyStrip";
import { ServicesSection } from "@/components/home/ServicesSection";
import {
  CTASection,
  FeaturedProperties,
} from "@/components/home/FeaturedProperties";
import { NewsSection } from "@/components/home/NewsSection";
import { VideoSection } from "@/components/home/VideoSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LocationSection } from "@/components/home/LocationSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchSection />
      <AgencyStrip />
      <ServicesSection />
      <FeaturedProperties />
      <TestimonialsSection />
      <VideoSection />
      <NewsSection />
      <LocationSection />
      <CTASection />
    </>
  );
}
