import React from 'react';
import { Metadata } from 'next';
import TrafficInfoContent from '@/components/pages/TrafficInfoContent';

export const metadata: Metadata = {
  title: "Informations Trafic SNCF | Train Tracker France",
  description: "Perturbations, travaux et informations trafic en temps réel pour le réseau SNCF. Alertes en direct, retards et interruptions de service.",
  keywords: "info trafic sncf, perturbations train, grève sncf, travaux ligne, retards trains france",
  authors: [{ name: "Train Tracker France" }],
  creator: "Train Tracker France",
  publisher: "Train Tracker France",
  alternates: {
    canonical: "https://traintracker.fr/info-trafic/",
    languages: {
      "fr": "https://traintracker.fr/info-trafic/",
      "en": "https://traintracker.fr/en/traffic-info/",
    },
  },
  openGraph: {
    title: "Informations Trafic SNCF | Train Tracker France",
    description: "Perturbations et informations trafic en temps réel pour le réseau SNCF",
    url: "https://traintracker.fr/info-trafic/",
    siteName: "Train Tracker France",
    images: [
      {
        url: "/og-traffic-fr.jpg",
        width: 1200,
        height: 630,
        alt: "Informations Trafic - Train Tracker France",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Informations Trafic SNCF | Train Tracker France",
    description: "Trafic SNCF en temps réel",
    images: ["/twitter-traffic-fr.jpg"],
  },
};

export default function TrafficInfoPage() {
  return <TrafficInfoContent language="fr" />;
}