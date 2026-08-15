import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyChatbot } from "@/components/chat/PropertyChatbot";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#12141a",
};

export const metadata: Metadata = {
  title: "Aurelia Estates | Premium Real Estate Platform",
  description:
    "Aurelia Estates lists homes, condos, and commercial properties with exterior and interior photos, AI lead qualification, and online viewing bookings. Built for agencies in the US, UK, Canada, and beyond.",
  keywords: [
    "real estate platform",
    "property listings",
    "luxury homes",
    "Aurelia Estates",
    "real estate agency website",
  ],
  openGraph: {
    title: "Aurelia Estates | Premium Real Estate Platform",
    description:
      "Premium property discovery with exterior and interior galleries on every listing.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable} h-full overflow-x-hidden`}>
      <body className="flex min-h-full flex-col overflow-x-hidden antialiased">
        <Navbar />
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <Footer />
        <PropertyChatbot />
      </body>
    </html>
  );
}
