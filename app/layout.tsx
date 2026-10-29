import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { siteImage } from "@/lib/assets";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  title: {
    default: `Gamers Marketplace You Can Trust | ${BRAND.name}`,
    template: `%s | ${BRAND.name}`,
  },
  description: `Buy and sell game accounts, boosting, top ups, items and hourly services across ${BRAND.stats.games.toLocaleString("en-US")}+ games. Every order is covered by ${BRAND.protection}.`,
  openGraph: {
    siteName: BRAND.name,
    type: "website",
    images: [siteImage("og-default") ?? "/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} page-glow min-h-screen font-sans`}
      >
        {children}
        <Toaster theme="light" position="bottom-right" />
      </body>
    </html>
  );
}
