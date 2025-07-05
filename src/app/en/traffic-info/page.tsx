import React from 'react';
import { Metadata } from 'next';
import TrafficInfoContent from '@/components/pages/TrafficInfoContent';

export const metadata: Metadata = {
  title: "SNCF Traffic Information | Train Tracker France",
  description: "Real-time disruptions, work and traffic information for the SNCF network. Live alerts, delays and service interruptions.",
  keywords: "sncf traffic info, train disruptions, sncf strikes, line work, train delays france",
  authors: [{ name: "Train Tracker France" }],
  creator: "Train Tracker France",
  publisher: "Train Tracker France",
  alternates: {
    canonical: "https://traintracker.fr/en/traffic-info/",
    languages: {
      "fr": "https://traintracker.fr/info-trafic/",
      "en": "https://traintracker.fr/en/traffic-info/",
    },
  },
  openGraph: {
    title: "SNCF Traffic Information | Train Tracker France",
    description: "Real-time disruptions and traffic information for the SNCF network",
    url: "https://traintracker.fr/en/traffic-info/",
    siteName: "Train Tracker France",
    images: [
      {
        url: "/og-traffic-en.jpg",
        width: 1200,
        height: 630,
        alt: "Traffic Information - Train Tracker France",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SNCF Traffic Information | Train Tracker France",
    description: "Real-time SNCF traffic",
    images: ["/twitter-traffic-en.jpg"],
  },
};

export default function EnglishTrafficInfoPage() {
  return <TrafficInfoContent language="en" />;
}