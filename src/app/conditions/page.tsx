import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Conditions d'Utilisation | Train Tracker France",
  description: "Conditions générales d'utilisation de Train Tracker France.",
  alternates: {
    canonical: "https://traintracker.fr/conditions/",
    languages: { "fr": "https://traintracker.fr/conditions/", "en": "https://traintracker.fr/en/terms/" },
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Conditions d'Utilisation</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <p className="text-sm text-gray-500">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptation des conditions</h2>
            <p>En utilisant Train Tracker France, vous acceptez ces conditions d'utilisation.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description du service</h2>
            <p>Train Tracker France est un service indépendant d'information ferroviaire en temps réel, non affilié à la SNCF.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Limitation de responsabilité</h2>
            <p>Les informations sont fournies à titre indicatif. Vérifiez toujours les informations critiques auprès des sources officielles.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propriété intellectuelle</h2>
            <p>Le contenu de ce site est protégé par le droit d'auteur. Les données SNCF restent propriété de la SNCF.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Droit applicable</h2>
            <p>Ces conditions sont régies par le droit français.</p>
          </section>
        </div>
      </div>
    </div>
  );
}