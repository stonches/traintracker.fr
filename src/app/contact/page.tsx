import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Clock, MessageCircle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact - Train Tracker France',
  description: 'Contactez l\'équipe Train Tracker France. Support technique, questions, suggestions - nous sommes là pour vous aider 24/7.',
  keywords: 'contact Train Tracker France, support, aide, questions, suggestions, feedback',
  openGraph: {
    title: 'Contact - Train Tracker France',
    description: 'Contactez l\'équipe Train Tracker France pour toute question ou suggestion.',
    url: 'https://traintracker.fr/contact',
    siteName: 'Train Tracker France',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://traintracker.fr/contact',
    languages: {
      'fr': 'https://traintracker.fr/contact',
      'en': 'https://traintracker.fr/en/contact',
    },
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contactez-Nous
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Notre équipe est là pour vous aider. Posez vos questions, signalez un problème ou partagez vos suggestions.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un message
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informations de Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <a 
                      href="mailto:contact@traintracker.com"
                      className="font-medium text-gray-900 hover:text-blue-600"
                    >
                      contact@traintracker.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">Support</div>
                    <div className="font-medium text-gray-900">24/7</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="text-sm text-gray-600">Localisation</div>
                    <div className="font-medium text-gray-900">France</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="text-sm text-gray-600">SNCF Info</div>
                    <div className="font-medium text-gray-900">3635</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <MessageCircle className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-900">Temps de Réponse</h3>
              </div>
              <p className="text-blue-800">
                Nous nous engageons à répondre à tous les messages dans les 24 heures. 
                Pour les problèmes urgents, utilisez notre chat en ligne.
              </p>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Questions Fréquentes
              </h3>
              <div className="space-y-3">
                <a href="#faq-data" className="block text-blue-600 hover:text-blue-800">
                  Comment sont mises à jour les données ?
                </a>
                <a href="#faq-offline" className="block text-blue-600 hover:text-blue-800">
                  L'application fonctionne-t-elle hors ligne ?
                </a>
                <a href="#faq-accuracy" className="block text-blue-600 hover:text-blue-800">
                  Quelle est la précision des horaires ?
                </a>
                <a href="#faq-coverage" className="block text-blue-600 hover:text-blue-800">
                  Toutes les gares sont-elles couvertes ?
                </a>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-orange-900">Information Importante</h4>
                  <p className="text-sm text-orange-800 mt-1">
                    Pour les urgences ferroviaires, contactez directement la SNCF au 3635. 
                    Train Tracker France n'est pas un service officiel SNCF.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Questions Fréquentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div id="faq-data">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Comment sont mises à jour les données ?
              </h3>
              <p className="text-gray-700">
                Nos données sont synchronisées avec l'API officielle SNCF toutes les 30 secondes 
                pour garantir des informations en temps réel. Nous utilisons uniquement des sources officielles.
              </p>
            </div>

            <div id="faq-offline">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                L'application fonctionne-t-elle hors ligne ?
              </h3>
              <p className="text-gray-700">
                Oui, notre application PWA peut fonctionner hors ligne avec les dernières données mises en cache. 
                Cependant, les informations en temps réel nécessitent une connexion internet.
              </p>
            </div>

            <div id="faq-accuracy">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Quelle est la précision des horaires ?
              </h3>
              <p className="text-gray-700">
                Nos horaires proviennent directement de la SNCF et sont mis à jour en temps réel. 
                La précision dépend de la qualité des données fournies par l'opérateur ferroviaire.
              </p>
            </div>

            <div id="faq-coverage">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Toutes les gares sont-elles couvertes ?
              </h3>
              <p className="text-gray-700">
                Nous couvrons plus de 3000 gares françaises, incluant toutes les gares SNCF principales 
                et la plupart des stations régionales. Si une gare manque, contactez-nous.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Comment signaler un problème technique ?
              </h3>
              <p className="text-gray-700">
                Utilisez le formulaire de contact ci-dessus en sélectionnant "Problème technique". 
                Décrivez le problème en détail avec votre navigateur et appareil utilisé.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibent text-gray-900 mb-3">
                Proposez-vous une API publique ?
              </h3>
              <p className="text-gray-700">
                Actuellement, nous ne proposons pas d'API publique. Si vous êtes intéressé par un accès API, 
                contactez-nous pour discuter de vos besoins.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}