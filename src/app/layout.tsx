import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/seo/GoogleAnalytics';
import { ServiceWorkerRegistration } from '@/components/seo/ServiceWorkerRegistration';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Train Tracker France",
  description: "Suivez vos trains en France en temps réel",
  metadataBase: new URL('https://traintracker.fr'),
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192x192.png',
  },
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Train Tracker',
    'application-name': 'Train Tracker France',
    'msapplication-TileColor': '#0088ce',
    'msapplication-TileImage': '/icons/icon-144x144.png',
    'theme-color': '#0088ce',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className="antialiased font-inter bg-white text-gray-900">
        <ServiceWorkerRegistration />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
