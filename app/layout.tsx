import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { NestoraProvider } from "@/context/NestoraContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { ComparisonFloatingBar } from "@/components/property/ComparisonFloatingBar";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0F17",
};

export const metadata: Metadata = {
  title: "NESTORA | Find a place worth calling home",
  description:
    "Discover exceptionally curated luxury real estate, apartments, and sky villas across Kolkata and Eastern India. Powered by intelligent discovery and verified advisory.",
  keywords: [
    "luxury real estate",
    "Nestora",
    "Kolkata apartments",
    "New Town penthouses",
    "Alipore luxury homes",
    "Ballygunge residences",
    "villas in Rajarhat",
    "CINIX property marketplace",
  ],
  authors: [{ name: "NESTORA Real Estate & CINIX Engineering" }],
  openGraph: {
    title: "NESTORA | Luxury Real Estate & Residences",
    description: "Discover curated luxury homes and sky residences in the places you love.",
    type: "website",
    locale: "en_IN",
    siteName: "NESTORA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${playfairDisplay.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-[#C5A880]/30 selection:text-[#5A4320]">
        <NestoraProvider>
          <Navbar />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileBottomBar />
          <ComparisonFloatingBar />
          <ToastContainer />
        </NestoraProvider>
      </body>
    </html>
  );
}
