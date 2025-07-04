import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { Scale, AlertTriangle, Shield, FileText } from 'lucide-react';

export const metadata = getMetadata(
  pageMetadata.fr.terms.title,
  pageMetadata.fr.terms.description,
  '/conditions',
  'fr'
);

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>Train Tracker</span>
              <span>/</span>
              <span className="text-gray-900">Conditions d'utilisation</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Conditions d'utilisation
            </h1>
            <p className="text-lg text-gray-600">
              Dernière mise à jour : 10 décembre 2024
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <div className="flex items-start space-x-3 mb-6">
              <Scale className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Conditions générales</h2>
                <p className="text-gray-600 leading-relaxed">
                  L'utilisation du site Train Tracker France (traintracker.fr) est soumise aux présentes 
                  conditions générales d'utilisation. En accédant au site, vous acceptez ces conditions 
                  dans leur intégralité.
                </p>
              </div>
            </div>
          </div>

          {/* Service Description */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Description du service</h2>
            
            <div className="space-y-4 text-gray-600">
              <p>
                Train Tracker France est un service d'information sur les transports ferroviaires français 
                qui agrège des données publiques provenant de sources officielles, notamment :
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>API SNCF pour les horaires et perturbations</li>
                <li>transport.data.gouv.fr pour les données régionales</li>
                <li>Données ouvertes des autorités de transport</li>
              </ul>
              
              <p>
                Le service fournit des informations sur les horaires, retards, grèves et perturbations 
                du réseau ferroviaire français à titre informatif uniquement.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-warning-50 border border-warning-200 rounded-2xl p-8 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-warning-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-warning-800 mb-4">Avertissements et limitations</h2>
                
                <div className="space-y-4 text-warning-800">
                  <div>
                    <h3 className="font-semibold mb-2">Service indépendant</h3>
                    <p>
                      <strong>Train Tracker France est un service indépendant et n'est PAS affilié à la SNCF, 
                      au gouvernement français ou à toute autorité de transport officielle.</strong>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Exactitude des informations</h3>
                    <p>
                      Les informations sont fournies "en l'état" sans garantie d'exactitude, de complétude 
                      ou de disponibilité. Les données peuvent contenir des erreurs ou être obsolètes.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Vérification recommandée</h3>
                    <p>
                      Vous devez toujours vérifier les informations auprès des sources officielles 
                      (SNCF, gares, applications officielles) avant de prendre des décisions de voyage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Rules */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Règles d'utilisation</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Utilisation autorisée</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Consultation des informations de transport pour usage personnel</li>
                  <li>Partage des liens vers les pages du site</li>
                  <li>Utilisation normale des fonctionnalités proposées</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Utilisation interdite</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Extraction automatisée massive de données (scraping)</li>
                  <li>Tentatives d'intrusion ou de perturbation du service</li>
                  <li>Utilisation à des fins commerciales sans autorisation</li>
                  <li>Reproduction ou redistribution des contenus sans accord</li>
                  <li>Utilisation de robots ou scripts automatisés</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Disponibilité du service</h2>
            
            <div className="space-y-4 text-gray-600">
              <p>
                Nous nous efforçons de maintenir le service disponible 24h/24 et 7j/7, 
                mais nous ne garantissons pas une disponibilité continue.
              </p>
              
              <p>Le service peut être interrompu pour :</p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintenance technique programmée ou urgente</li>
                <li>Problèmes techniques imprévisibles</li>
                <li>Indisponibilité des sources de données externes</li>
                <li>Cas de force majeure</li>
              </ul>
              
              <p>
                Nous nous réservons le droit de modifier, suspendre ou arrêter le service 
                à tout moment sans préavis.
              </p>
            </div>
          </div>

          {/* Liability */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <div className="flex items-start space-x-3 mb-6">
              <Shield className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation de responsabilité</h2>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-600">
              <p>
                <strong className="text-gray-900">Train Tracker France ne peut être tenu responsable :</strong>
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Des inexactitudes, erreurs ou omissions dans les informations</li>
                <li>Des retards, annulations ou modifications non signalés</li>
                <li>Des conséquences de l'utilisation des informations fournies</li>
                <li>Des dommages directs ou indirects liés à l'utilisation du service</li>
                <li>Des pertes financières dues à des informations erronées</li>
                <li>De l'indisponibilité temporaire ou permanente du service</li>
              </ul>
              
              <p>
                L'utilisateur reconnaît utiliser le service à ses propres risques et 
                être seul responsable des décisions prises sur la base des informations consultées.
              </p>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <div className="flex items-start space-x-3 mb-6">
              <FileText className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Propriété intellectuelle</h2>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Contenu du site</h3>
                <p>
                  Le design, l'interface, les textes originaux et la structure du site sont protégés 
                  par les droits d'auteur. Toute reproduction sans autorisation est interdite.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Données de transport</h3>
                <p>
                  Les données de transport proviennent de sources publiques et ouvertes. 
                  Nous ne revendiquons aucun droit sur ces données.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Marques</h3>
                <p>
                  Les marques et logos mentionnés (SNCF, TGV, TER, etc.) appartiennent à leurs 
                  propriétaires respectifs et sont utilisés à des fins d'information uniquement.
                </p>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Protection des données</h2>
            
            <div className="space-y-4 text-gray-600">
              <p>
                Le traitement de vos données personnelles est régi par notre 
                <a href="/confidentialite" className="text-primary-600 hover:text-primary-700 font-medium">
                  {' '}Politique de confidentialité
                </a>, qui fait partie intégrante des présentes conditions.
              </p>
              
              <p>
                En utilisant le service, vous consentez au traitement de vos données 
                conformément à cette politique.
              </p>
            </div>
          </div>

          {/* Applicable Law */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Droit applicable et juridiction</h2>
            
            <div className="space-y-4 text-gray-600">
              <p>
                Les présentes conditions sont régies par le droit français. 
                Tout litige sera soumis à la juridiction compétente française.
              </p>
              
              <p>
                En cas de nullité d'une clause, les autres dispositions restent en vigueur.
              </p>
            </div>
          </div>

          {/* Modifications */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Modifications des conditions</h2>
            
            <div className="space-y-4 text-gray-600">
              <p>
                Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. 
                Les modifications prennent effet dès leur publication sur le site.
              </p>
              
              <p>
                Il est de votre responsabilité de consulter régulièrement ces conditions. 
                L'utilisation continue du service après modification vaut acceptation des nouvelles conditions.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-primary-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-primary-900 mb-6">Contact juridique</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Questions juridiques</h3>
                <p className="text-primary-800">
                  Pour toute question relative aux présentes conditions : 
                  <span className="font-medium"> legal@traintracker.fr</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Support général</h3>
                <p className="text-primary-800">
                  Pour l'assistance technique : 
                  <span className="font-medium"> contact@traintracker.fr</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Signalement d'abus</h3>
                <p className="text-primary-800">
                  Pour signaler une utilisation abusive : 
                  <span className="font-medium"> abuse@traintracker.fr</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}