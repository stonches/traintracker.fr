import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { Train, Shield, Users, Zap } from 'lucide-react';

export const metadata = getMetadata(
  pageMetadata.fr.about.title,
  pageMetadata.fr.about.description,
  '/a-propos',
  'fr'
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>Train Tracker</span>
              <span>/</span>
              <span className="text-gray-900">À propos</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              À propos de Train Tracker France
            </h1>
            <p className="text-lg text-gray-600">
              Service indépendant de suivi des trains SNCF en temps réel
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-warning-50 border border-warning-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-warning-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-semibold text-warning-800 mb-2">
                  Avertissement important
                </h2>
                <p className="text-warning-800 leading-relaxed">
                  <strong>Train Tracker France est un service indépendant et n'est PAS affilié à la SNCF, 
                  au gouvernement français ou à toute autorité de transport officielle en France.</strong> 
                  Les informations sont fournies à titre informatif et peuvent ne pas être complètes ou exactes. 
                  Veuillez vérifier les informations officielles avant de voyager.
                </p>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Train Tracker France a été créé pour fournir aux voyageurs français un accès simple et rapide 
              aux informations de transport ferroviaire en temps réel. Notre objectif est d'améliorer 
              l'expérience de voyage en centralisant les données de différentes sources officielles.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Temps réel</h3>
                <p className="text-sm text-gray-600">
                  Informations actualisées en continu pour vous tenir informé des dernières modifications.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Train className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Couverture nationale</h3>
                <p className="text-sm text-gray-600">
                  Suivi des trains sur l'ensemble du réseau SNCF, TGV, TER, Intercités et Transilien.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Interface intuitive</h3>
                <p className="text-sm text-gray-600">
                  Design épuré et fonctionnalités pensées pour faciliter votre planification de voyage.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos fonctionnalités</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🚄 Suivi des trains en temps réel</h3>
                <p className="text-gray-600">
                  Consultez les horaires de départ et d'arrivée mis à jour en continu, 
                  avec indication des retards et des annulations.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">⚠️ Alertes grèves</h3>
                <p className="text-gray-600">
                  Soyez informé des grèves SNCF en cours et à venir, avec évaluation de leur impact 
                  sur votre itinéraire.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🗺️ Planificateur d'itinéraire</h3>
                <p className="text-gray-600">
                  Trouvez les meilleurs trajets avec calcul en temps réel des perturbations 
                  et propositions d'alternatives.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🌍 Interface bilingue</h3>
                <p className="text-gray-600">
                  Service disponible en français et en anglais pour accueillir tous les voyageurs.
                </p>
              </div>
            </div>
          </div>

          {/* Data Sources */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sources de données</h2>
            <p className="text-gray-600 mb-6">
              Nous utilisons exclusivement des sources de données officielles et publiques :
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">API SNCF</strong>
                  <span className="text-gray-600"> - Données officielles de la SNCF pour les horaires et perturbations</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">transport.data.gouv.fr</strong>
                  <span className="text-gray-600"> - Plateforme nationale des données de transport</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Données ouvertes régionales</strong>
                  <span className="text-gray-600"> - Informations des réseaux de transport régionaux</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quality & Accuracy */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Qualité et exactitude</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Nous nous engageons à fournir des informations aussi précises que possible. 
                Cependant, les données proviennent de sources externes et peuvent parfois être 
                incomplètes ou présenter des délais de mise à jour.
              </p>
              
              <p>
                <strong>Recommandations importantes :</strong>
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Vérifiez toujours les informations officielles avant votre départ</li>
                <li>Consultez les sites web et applications officielles SNCF pour la réservation</li>
                <li>En cas de doute, contactez directement la SNCF ou votre gare</li>
                <li>Prévoyez du temps supplémentaire en cas de perturbations signalées</li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-primary-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-primary-900 mb-4">Nous contacter</h2>
            <p className="text-primary-800 mb-4">
              Vous avez des questions, suggestions ou rencontrez un problème technique ?
            </p>
            
            <div className="space-y-2">
              <div>
                <strong className="text-primary-900">Email :</strong>
                <span className="text-primary-800 ml-2">contact@traintracker.fr</span>
              </div>
              
              <div>
                <strong className="text-primary-900">Support technique :</strong>
                <span className="text-primary-800 ml-2">Nous répondons sous 48h en semaine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}