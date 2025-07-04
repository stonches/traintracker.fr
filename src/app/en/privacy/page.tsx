import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { Shield, Eye, Database, UserCheck } from 'lucide-react';

export const metadata = getMetadata(
  pageMetadata.en.privacy.title,
  pageMetadata.en.privacy.description,
  '/en/privacy',
  'en'
);

export default function EnglishPrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>Train Tracker</span>
              <span>/</span>
              <span className="text-gray-900">Privacy Policy</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              GDPR Compliant - Last updated: December 10, 2024
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <div className="flex items-start space-x-3 mb-6">
              <Shield className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  Train Tracker France respects your privacy and is committed to protecting your personal data. 
                  This privacy policy explains how we collect, use and protect 
                  your information in accordance with the General Data Protection Regulation (GDPR).
                </p>
              </div>
            </div>
          </div>

          {/* Data Controller */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Controller</h2>
            
            <div className="space-y-4 text-gray-600">
              <div>
                <strong className="text-gray-900">Service:</strong> Train Tracker France
              </div>
              <div>
                <strong className="text-gray-900">Email:</strong> contact@traintracker.fr
              </div>
              <div>
                <strong className="text-gray-900">DPO:</strong> dpo@traintracker.fr
              </div>
            </div>
          </div>

          {/* Data Collection */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <div className="flex items-start space-x-3 mb-6">
              <Database className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Collected</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Automatically collected data</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Anonymized IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and visit duration</li>
                  <li>Referrer (originating site)</li>
                  <li>Language preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Browsing data</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Station searches performed</li>
                  <li>Routes consulted</li>
                  <li>Display preferences (language, region)</li>
                  <li>Local search history (stored in your browser)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact form</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>First and last name (optional)</li>
                  <li>Email address</li>
                  <li>Subject and message</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Usage */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <div className="flex items-start space-x-3 mb-6">
              <Eye className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Usage</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Processing purposes</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Provide train tracking service</li>
                  <li>Improve user experience</li>
                  <li>Analyze site usage (anonymous statistics)</li>
                  <li>Respond to support requests</li>
                  <li>Ensure service security</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal basis</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li><strong>Legitimate interest</strong>: Service operation and improvement</li>
                  <li><strong>Consent</strong>: Analytics and non-essential cookies</li>
                  <li><strong>Contract performance</strong>: Response to contact requests</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies and Similar Technologies</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Essential cookies</h3>
                <p className="text-gray-600 mb-2">
                  These cookies are necessary for the site to function:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Language preferences</li>
                  <li>Accessibility settings</li>
                  <li>Security and fraud prevention</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Analytics cookies (Google Analytics)</h3>
                <p className="text-gray-600 mb-2">
                  With your consent, we use Google Analytics to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Measure site audience</li>
                  <li>Understand feature usage</li>
                  <li>Improve the service</li>
                </ul>
                <p className="text-sm text-gray-500 mt-2">
                  Retention period: 26 months maximum
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">LocalStorage</h3>
                <p className="text-gray-600">
                  We use your browser's local storage to save your preferences 
                  and recent search history. This data remains on your device.
                </p>
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Sharing</h2>
            
            <div className="space-y-4 text-gray-600">
              <p>
                <strong className="text-gray-900">We never sell your personal data.</strong>
              </p>
              
              <p>We share data only in the following cases:</p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Technical providers:</strong> Hosting (Cloudflare), analytics (Google)</li>
                <li><strong>Legal obligation:</strong> Judicial or administrative requisition</li>
                <li><strong>Security:</strong> Protection against fraud or abuse</li>
              </ul>
              
              <p className="mt-4">
                All our providers are located in the EU or have appropriate guarantees 
                for data transfer.
              </p>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Retention</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Connection logs</span>
                <span className="text-gray-600">6 months</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Analytics (Google)</span>
                <span className="text-gray-600">26 months</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Contact requests</span>
                <span className="text-gray-600">3 years</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">User preferences</span>
                <span className="text-gray-600">Until deletion</span>
              </div>
            </div>
          </div>

          {/* User Rights */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <div className="flex items-start space-x-3 mb-6">
              <UserCheck className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your GDPR Rights</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">✅ Right of access</h3>
                <p className="text-sm text-gray-600">Know what data we have about you</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">✏️ Right of rectification</h3>
                <p className="text-sm text-gray-600">Correct inaccurate data</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🗑️ Right to erasure</h3>
                <p className="text-sm text-gray-600">Delete your personal data</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">⏸️ Right to restriction</h3>
                <p className="text-sm text-gray-600">Suspend processing of your data</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📦 Right to portability</h3>
                <p className="text-sm text-gray-600">Retrieve your data in a standard format</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🚫 Right to object</h3>
                <p className="text-sm text-gray-600">Object to processing for legitimate reasons</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <p className="text-primary-800">
                <strong>To exercise your rights:</strong> Send an email to 
                <span className="font-medium"> dpo@traintracker.fr</span> with a copy of your ID.
                Response time: 30 days maximum.
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Security</h2>
            
            <div className="space-y-4 text-gray-600">
              <p>
                We implement appropriate technical and organizational measures 
                to protect your data:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>HTTPS encryption throughout the site</li>
                <li>IP address anonymization</li>
                <li>Limited access to personal data</li>
                <li>Monitoring of access and suspicious activities</li>
                <li>Secure and encrypted backups</li>
              </ul>
            </div>
          </div>

          {/* Contact & Complaints */}
          <div className="bg-primary-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-primary-900 mb-6">Contact and Complaints</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Data Protection Officer</h3>
                <p className="text-primary-800">
                  Email: <span className="font-medium">dpo@traintracker.fr</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Supervisory authority</h3>
                <p className="text-primary-800">
                  You can also file a complaint with the 
                  <span className="font-medium"> Commission Nationale de l'Informatique et des Libertés (CNIL)</span> 
                  at <span className="font-medium">www.cnil.fr</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">Changes</h3>
                <p className="text-primary-800">
                  This policy may be updated. We will inform you of significant changes 
                  through a notification on the site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}