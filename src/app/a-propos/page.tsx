import { Metadata } from 'next';
import { Train, Shield, Clock, Users, Globe, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À Propos - Train Tracker France',
  description: 'Découvrez Train Tracker France, la plateforme de référence pour les horaires de trains français en temps réel. Notre mission, notre équipe et notre engagement qualité.',
  keywords: 'à propos Train Tracker France, qui sommes nous, mission, équipe, qualité SNCF',
  openGraph: {
    title: 'À Propos - Train Tracker France',
    description: 'Découvrez Train Tracker France, la plateforme de référence pour les horaires de trains français en temps réel.',
    url: 'https://traintracker.fr/a-propos',
    siteName: 'Train Tracker France',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://traintracker.fr/a-propos',
    languages: {
      'fr': 'https://traintracker.fr/a-propos',
      'en': 'https://traintracker.fr/en/about',
    },
  },
};

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              À Propos de Train Tracker France
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              La plateforme de référence pour consulter les horaires de trains français en temps réel
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-6">
            <Train className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Notre Mission</h2>
          </div>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Train Tracker France a pour mission de fournir un accès simple, rapide et fiable aux informations 
              ferroviaires en temps réel pour tous les voyageurs français. Nous croyons que l'information de transport 
              doit être accessible à tous, partout et à tout moment.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Notre plateforme agrège les données officielles SNCF pour offrir une expérience utilisateur optimale, 
              que vous planifiez votre voyage ou que vous soyez déjà en déplacement. Nous nous engageons à maintenir 
              la plus haute qualité de service avec des données précises et des temps de réponse optimaux.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Temps Réel</h3>
            </div>
            <p className="text-gray-700">
              Données actualisées toutes les 30 secondes directement depuis l'API officielle SNCF 
              pour une information toujours à jour.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Couverture Complète</h3>
            </div>
            <p className="text-gray-700">
              Plus de 3000 gares françaises couvertes, des grandes métropoles aux petites stations rurales, 
              pour un service universel.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
            </div>
            <p className="text-gray-700">
              Interface ultra-rapide avec optimisations avancées et mise en cache intelligente 
              pour une expérience fluide.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Fiabilité</h3>
            </div>
            <p className="text-gray-700">
              Données officielles SNCF avec garantie de précision et architecture robuste 
              pour une disponibilité 24/7.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Accessible</h3>
            </div>
            <p className="text-gray-700">
              Interface mobile-first, multilingue et accessible, conçue pour tous les utilisateurs 
              quel que soit leur appareil.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Train className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Tous Services</h3>
            </div>
            <p className="text-gray-700">
              TGV, TER, Intercités, Eurostar, Thalys - tous les services ferroviaires français 
              dans une seule plateforme unifiée.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre Équipe</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Train Tracker France est développé par une équipe passionnée de développeurs et d'experts 
              en transport ferroviaire. Nous combinons expertise technique et connaissance approfondie 
              du réseau ferroviaire français pour créer la meilleure expérience possible.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Notre équipe est distribuée à travers la France et travaille en collaboration étroite 
              pour maintenir et améliorer continuellement notre plateforme. Nous sommes guidés par 
              l'innovation, la qualité et le service aux voyageurs.
            </p>
          </div>
        </section>

        {/* Quality Commitment */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Engagement Qualité</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Précision des Données</h3>
              <p className="text-gray-700 leading-relaxed">
                Nous utilisons exclusivement les données officielles SNCF et mettons en place des contrôles 
                qualité rigoureux pour garantir la fiabilité de l'information diffusée.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Disponibilité</h3>
              <p className="text-gray-700 leading-relaxed">
                Notre infrastructure est conçue pour assurer une disponibilité maximale avec des systèmes 
                de redondance et de monitoring en temps réel.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Amélioration Continue</h3>
              <p className="text-gray-700 leading-relaxed">
                Nous écoutons nos utilisateurs et intégrons régulièrement de nouvelles fonctionnalités 
                et améliorations basées sur leurs retours.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Support Utilisateur</h3>
              <p className="text-gray-700 leading-relaxed">
                Notre équipe support est disponible pour répondre à vos questions et résoudre 
                rapidement tout problème technique.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-blue-600 rounded-lg shadow-md p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Une Question ? Un Problème ?</h2>
          <p className="text-blue-100 mb-6">
            Notre équipe est là pour vous aider. Contactez-nous pour toute question ou suggestion.
          </p>
          <a
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Nous Contacter
          </a>
        </section>

        {/* Disclaimer */}
        <div className="mt-12 bg-gray-100 rounded-lg p-6">
          <p className="text-sm text-gray-600 text-center">
            Train Tracker France est un service indépendant et n'est PAS affilié à la SNCF, 
            au gouvernement français ou à toute autorité de transport officielle. Nous utilisons 
            les données publiques SNCF pour fournir nos services d'information.
          </p>
        </div>
      </main>
    </div>
  );
}