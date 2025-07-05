import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Train Tracker France",
  description: "Politique de confidentialité de Train Tracker France. Protection des données personnelles et respect du RGPD.",
  alternates: {
    canonical: "https://traintracker.fr/confidentialite/",
    languages: { "fr": "https://traintracker.fr/confidentialite/", "en": "https://traintracker.fr/en/privacy/" },
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <p className="text-sm text-gray-500">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Collecte des données</h2>
            <p>Train Tracker France collecte uniquement les données nécessaires au fonctionnement du service :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Données de navigation anonymes via Google Analytics</li>
              <li>Préférences de langue stockées localement</li>
              <li>Historique de recherche en cache local</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Utilisation des données</h2>
            <p>Les données collectées servent uniquement à :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Améliorer l'expérience utilisateur</li>
              <li>Analyser l'utilisation du service</li>
              <li>Optimiser les performances</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Vos droits RGPD</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la portabilité</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Contact</h2>
            <p>Pour toute question relative à cette politique : contact@traintracker.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}