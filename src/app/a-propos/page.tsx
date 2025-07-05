import React from 'react';
import { Metadata } from 'next';
import { Train, Target, Users, Shield, Clock, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: "À Propos | Train Tracker France",
  description: "Découvrez Train Tracker France, le service indépendant d'informations ferroviaires en temps réel. Notre mission, notre équipe et nos valeurs.",
  keywords: "a propos train tracker france, equipe, mission, service ferroviaire independant",
  authors: [{ name: "Train Tracker France" }],
  creator: "Train Tracker France",
  publisher: "Train Tracker France",
  alternates: {
    canonical: "https://traintracker.fr/a-propos/",
    languages: {
      "fr": "https://traintracker.fr/a-propos/",
      "en": "https://traintracker.fr/en/about/",
    },
  },
  openGraph: {
    title: "À Propos | Train Tracker France",
    description: "Découvrez Train Tracker France, le service indépendant d'informations ferroviaires",
    url: "https://traintracker.fr/a-propos/",
    siteName: "Train Tracker France",
    locale: "fr_FR",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <Train className="h-12 w-12 text-blue-600" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                À Propos de Train Tracker France
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Votre plateforme indépendante d'informations ferroviaires en temps réel pour 
              un voyage en train plus serein et mieux informé.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Target className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Notre Mission</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Train Tracker France a pour mission de démocratiser l'accès aux informations 
                ferroviaires en temps réel. Nous croyons que chaque voyageur mérite d'avoir 
                accès à des informations précises, actualisées et facilement accessibles 
                pour planifier ses déplacements en train.
              </p>
              <p className="text-lg text-gray-600">
                En centralisant les données de 50 grandes gares françaises, nous offrons 
                une expérience utilisateur optimisée qui vous permet de prendre des décisions 
                éclairées pour vos voyages.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50</div>
                  <div className="text-sm text-gray-600">Gares couvertes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">30s</div>
                  <div className="text-sm text-gray-600">Mises à jour</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Disponibilité</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                  <div className="text-sm text-gray-600">Langues</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre travail quotidien et notre engagement 
              envers nos utilisateurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fiabilité</h3>
              <p className="text-gray-600">
                Nous nous engageons à fournir des informations précises et à jour, 
                avec des mises à jour toutes les 30 secondes pour vous garantir 
                les données les plus récentes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibilité</h3>
              <p className="text-gray-600">
                Notre plateforme est conçue pour être accessible à tous, 
                avec une interface intuitive et un service disponible 
                en français et en anglais.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparence</h3>
              <p className="text-gray-600">
                Service indépendant non affilié à la SNCF, nous communiquons 
                clairement sur nos sources de données et nos limitations 
                pour maintenir votre confiance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Sources de Données</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">API SNCF Connect pour les horaires officiels</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">transport.data.gouv.fr pour les données ouvertes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Informations temps réel sur les perturbations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Données de géolocalisation des gares</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Technologie Moderne</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Train Tracker France utilise des technologies web modernes pour 
                vous offrir une expérience rapide et fluide. Notre plateforme 
                est optimisée pour tous les appareils et conçue selon les 
                meilleures pratiques de performance web.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Interface responsive pour mobile et desktop</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Mises à jour automatiques en temps réel</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Mode hors ligne pour consulter les données en cache</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Optimisé pour les Core Web Vitals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 border border-yellow-200">
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Service Indépendant - Avertissement Important
                </h3>
                <p className="text-yellow-700 leading-relaxed">
                  Train Tracker France est un service indépendant et n'est <strong>PAS affilié</strong> à la SNCF, 
                  au gouvernement français ou à toute autorité de transport officielle. 
                  Les informations fournies le sont à titre informatif uniquement et ne remplacent pas 
                  les sources officielles. Nous recommandons toujours de vérifier les informations 
                  critiques directement auprès de la SNCF ou sur les panneaux d'affichage en gare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}