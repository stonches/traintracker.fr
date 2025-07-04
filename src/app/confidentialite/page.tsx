import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { Shield, Eye, Database, UserCheck } from 'lucide-react';

export const metadata = getMetadata(
  pageMetadata.fr.privacy.title,
  pageMetadata.fr.privacy.description,
  '/confidentialite',
  'fr'
);

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>Train Tracker</span>
              <span>/</span>
              <span className="text-gray-900">Politique de confidentialité</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Politique de confidentialité
            </h1>
            <p className="text-lg text-gray-600">
              Conforme au RGPD - Dernière mise à jour : 10 décembre 2024
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <div className="flex items-start space-x-3 mb-6">
              <Shield className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  Train Tracker France respecte votre vie privée et s'engage à protéger vos données personnelles. 
                  Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons 
                  vos informations conformément au Règlement Général sur la Protection des Données (RGPD).
                </p>
              </div>
            </div>
          </div>

          {/* Data Controller */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Responsable du traitement</h2>
            
            <div className="space-y-4 text-gray-600">
              <div>
                <strong className="text-gray-900">Service :</strong> Train Tracker France
              </div>
              <div>
                <strong className="text-gray-900">Email :</strong> contact@traintracker.fr
              </div>
              <div>
                <strong className="text-gray-900">DPO :</strong> dpo@traintracker.fr
              </div>
            </div>
          </div>

          {/* Data Collection */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <div className="flex items-start space-x-3 mb-6">
              <Database className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Données collectées</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Données collectées automatiquement</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Adresse IP anonymisée</li>
                  <li>Type de navigateur et version</li>
                  <li>Système d'exploitation</li>
                  <li>Pages visitées et durée de visite</li>
                  <li>Référent (site d'origine)</li>
                  <li>Préférences de langue</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Données de navigation</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Recherches de gares effectuées</li>
                  <li>Itinéraires consultés</li>
                  <li>Préférences d'affichage (langue, région)</li>
                  <li>Historique de recherche local (stocké dans votre navigateur)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Formulaire de contact</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Nom et prénom (optionnel)</li>
                  <li>Adresse email</li>
                  <li>Sujet et message</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Usage */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <div className="flex items-start space-x-3 mb-6">
              <Eye className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Utilisation des données</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Finalités du traitement</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Fournir le service de suivi des trains</li>
                  <li>Améliorer l'expérience utilisateur</li>
                  <li>Analyser l'utilisation du site (statistiques anonymes)</li>
                  <li>Répondre aux demandes de support</li>
                  <li>Assurer la sécurité du service</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Base légale</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li><strong>Intérêt légitime</strong> : Fonctionnement du service et amélioration</li>
                  <li><strong>Consentement</strong> : Analytics et cookies non essentiels</li>
                  <li><strong>Exécution d'un contrat</strong> : Réponse aux demandes de contact</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies et technologies similaires</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookies essentiels</h3>
                <p className="text-gray-600 mb-2">
                  Ces cookies sont nécessaires au fonctionnement du site :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Préférences de langue</li>
                  <li>Paramètres d'accessibilité</li>
                  <li>Sécurité et prévention des fraudes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookies d'analyse (Google Analytics)</h3>
                <p className="text-gray-600 mb-2">
                  Avec votre consentement, nous utilisons Google Analytics pour :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Mesurer l'audience du site</li>
                  <li>Comprendre l'utilisation des fonctionnalités</li>
                  <li>Améliorer le service</li>
                </ul>
                <p className="text-sm text-gray-500 mt-2">
                  Durée de conservation : 26 mois maximum
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">LocalStorage</h3>
                <p className="text-gray-600">
                  Nous utilisons le stockage local de votre navigateur pour sauvegarder vos préférences 
                  et l'historique de vos recherches récentes. Ces données restent sur votre appareil.
                </p>
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Partage des données</h2>
            
            <div className="space-y-4 text-gray-600">
              <p>
                <strong className="text-gray-900">Nous ne vendons jamais vos données personnelles.</strong>
              </p>
              
              <p>Nous partageons des données uniquement dans les cas suivants :</p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Prestataires techniques :</strong> Hébergement (Cloudflare), analytics (Google)</li>
                <li><strong>Obligation légale :</strong> Réquisition judiciaire ou administrative</li>
                <li><strong>Sécurité :</strong> Protection contre la fraude ou les abus</li>
              </ul>
              
              <p className="mt-4">
                Tous nos prestataires sont situés dans l'UE ou disposent de garanties appropriées 
                pour le transfert de données.
              </p>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Conservation des données</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Logs de connexion</span>
                <span className="text-gray-600">6 mois</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Analytics (Google)</span>
                <span className="text-gray-600">26 mois</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Demandes de contact</span>
                <span className="text-gray-600">3 ans</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Préférences utilisateur</span>
                <span className="text-gray-600">Jusqu'à suppression</span>
              </div>
            </div>
          </div>

          {/* User Rights */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <div className="flex items-start space-x-3 mb-6">
              <UserCheck className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Vos droits RGPD</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">✅ Droit d'accès</h3>
                <p className="text-sm text-gray-600">Connaître les données que nous avons sur vous</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">✏️ Droit de rectification</h3>
                <p className="text-sm text-gray-600">Corriger des données inexactes</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🗑️ Droit à l'effacement</h3>
                <p className="text-sm text-gray-600">Supprimer vos données personnelles</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">⏸️ Droit de limitation</h3>
                <p className="text-sm text-gray-600">Suspendre le traitement de vos données</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📦 Droit à la portabilité</h3>
                <p className="text-sm text-gray-600">Récupérer vos données dans un format standard</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🚫 Droit d'opposition</h3>
                <p className="text-sm text-gray-600">Vous opposer au traitement pour motif légitime</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <p className="text-primary-800">
                <strong>Pour exercer vos droits :</strong> Envoyez un email à 
                <span className="font-medium"> dpo@traintracker.fr</span> avec une copie de votre pièce d'identité.
                Délai de réponse : 30 jours maximum.
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sécurité</h2>
            
            <div className="space-y-4 text-gray-600">
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                pour protéger vos données :
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Chiffrement HTTPS sur l'ensemble du site</li>
                <li>Anonymisation des adresses IP</li>
                <li>Accès limité aux données personnelles</li>
                <li>Surveillance des accès et des activités suspectes</li>
                <li>Sauvegardes sécurisées et chiffrées</li>
              </ul>
            </div>
          </div>

          {/* Contact & Complaints */}
          <div className="bg-primary-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-primary-900 mb-6">Contact et réclamations</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Délégué à la Protection des Données</h3>
                <p className="text-primary-800">
                  Email : <span className="font-medium">dpo@traintracker.fr</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Autorité de contrôle</h3>
                <p className="text-primary-800">
                  Vous pouvez également déposer une réclamation auprès de la 
                  <span className="font-medium"> Commission Nationale de l'Informatique et des Libertés (CNIL)</span> 
                  sur <span className="font-medium">www.cnil.fr</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Modifications</h3>
                <p className="text-primary-800">
                  Cette politique peut être mise à jour. Nous vous informerons des changements 
                  significatifs par une notification sur le site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}