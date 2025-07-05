import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Train Tracker France - Horaires Trains en Temps Réel",
  description: "Train Tracker France : horaires, retards et informations en temps réel pour 50 grandes gares françaises. TGV, TER, Intercités, Eurostar.",
  keywords: "train france, sncf, horaires trains, gares france, tgv, ter",
  authors: [{ name: "Train Tracker France" }],
  creator: "Train Tracker France",
  publisher: "Train Tracker France",
  metadataBase: new URL("https://traintracker.fr"),
  alternates: {
    canonical: "/",
    languages: {
      "fr": "/",
      "en": "/en",
    },
  },
  openGraph: {
    title: "Train Tracker France - Horaires Trains en Temps Réel",
    description: "Horaires, retards et informations en temps réel pour 50 grandes gares françaises",
    url: "https://traintracker.fr",
    siteName: "Train Tracker France",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Train Tracker France",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Train Tracker France",
    description: "Horaires trains en temps réel",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verify-google-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.variable} font-sans antialiased h-full bg-gray-50`}>
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <div className="min-h-full flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
