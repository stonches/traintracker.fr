import { ContactForm } from '@/components/sections/ContactForm';
import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { Mail, Clock, HelpCircle, Bug } from 'lucide-react';

export const metadata = getMetadata(
  pageMetadata.fr.contact.title,
  pageMetadata.fr.contact.description,
  '/contact',
  'fr'
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>Train Tracker</span>
              <span>/</span>
              <span className="text-gray-900">Contact</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nous contacter
            </h1>
            <p className="text-lg text-gray-600">
              Une question, suggestion ou problème technique ? Nous sommes là pour vous aider.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm lang="fr" />
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Methods */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <span>Nous joindre</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Support général</h4>
                    <p className="text-gray-600 text-sm">contact@traintracker.fr</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Questions juridiques</h4>
                    <p className="text-gray-600 text-sm">legal@traintracker.fr</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Protection des données</h4>
                    <p className="text-gray-600 text-sm">dpo@traintracker.fr</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Signalement d'abus</h4>
                    <p className="text-gray-600 text-sm">abuse@traintracker.fr</p>
                  </div>
                </div>
              </div>

              {/* Response Times */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span>Délais de réponse</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Support technique</span>
                    <span className="text-gray-900 font-medium text-sm">48h</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Questions générales</span>
                    <span className="text-gray-900 font-medium text-sm">72h</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Questions RGPD</span>
                    <span className="text-gray-900 font-medium text-sm">30 jours</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  * Délais en jours ouvrés. Nous répondons plus rapidement aux urgences.
                </p>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-primary-600" />
                  <span>Questions fréquentes</span>
                </h3>
                
                <div className="space-y-4">
                  <details className="group">
                    <summary className="cursor-pointer font-medium text-gray-900 text-sm hover:text-primary-600 transition-colors">
                      Les informations sont-elles officielles ?
                    </summary>
                    <p className="text-gray-600 text-sm mt-2 ml-4">
                      Non, nous agrégeons des données publiques. Vérifiez toujours auprès des sources officielles SNCF.
                    </p>
                  </details>
                  
                  <details className="group">
                    <summary className="cursor-pointer font-medium text-gray-900 text-sm hover:text-primary-600 transition-colors">
                      Pourquoi les données ne sont pas à jour ?
                    </summary>
                    <p className="text-gray-600 text-sm mt-2 ml-4">
                      Les données proviennent d'APIs externes qui peuvent avoir des délais. Nous rafraîchissons toutes les 30 secondes.
                    </p>
                  </details>
                  
                  <details className="group">
                    <summary className="cursor-pointer font-medium text-gray-900 text-sm hover:text-primary-600 transition-colors">
                      Puis-je utiliser vos données ?
                    </summary>
                    <p className="text-gray-600 text-sm mt-2 ml-4">
                      Les données proviennent de sources ouvertes, mais notre interface est protégée. Contactez-nous pour usage commercial.
                    </p>
                  </details>
                  
                  <details className="group">
                    <summary className="cursor-pointer font-medium text-gray-900 text-sm hover:text-primary-600 transition-colors">
                      Comment supprimer mes données ?
                    </summary>
                    <p className="text-gray-600 text-sm mt-2 ml-4">
                      Contactez notre DPO à dpo@traintracker.fr avec votre demande et une pièce d'identité.
                    </p>
                  </details>
                </div>
              </div>

              {/* Bug Report */}
              <div className="bg-primary-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center space-x-2">
                  <Bug className="w-5 h-5 text-primary-600" />
                  <span>Signaler un bug</span>
                </h3>
                
                <p className="text-primary-800 text-sm mb-4">
                  Vous avez trouvé un problème technique ? Aidez-nous à l'améliorer !
                </p>
                
                <div className="space-y-2 text-primary-800 text-sm">
                  <p><strong>Informations utiles :</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Navigateur et version</li>
                    <li>Étapes pour reproduire</li>
                    <li>Capture d'écran si possible</li>
                    <li>Message d'erreur exact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}