import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

const deva = Noto_Sans_Devanagari({
  variable: "--font-deva",
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  display: "swap",
  fallback: ["Nirmala UI", "Mangal", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Ghat Watch · Durga visarjan 2026, Bhopal",
  description: "Bhopal immersion ghats ranked by water-quality risk against CPCB class B, with report page for every reading.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${deva.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 pb-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
