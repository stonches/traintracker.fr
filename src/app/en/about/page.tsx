import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { Train, Shield, Users, Zap } from 'lucide-react';

export const metadata = getMetadata(
  pageMetadata.en.about.title,
  pageMetadata.en.about.description,
  '/en/about',
  'en'
);

export default function EnglishAboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>Train Tracker</span>
              <span>/</span>
              <span className="text-gray-900">About</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Train Tracker France
            </h1>
            <p className="text-lg text-gray-600">
              Independent real-time SNCF train tracking service
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-warning-50 border border-warning-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-warning-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-semibold text-warning-800 mb-2">
                  Important Disclaimer
                </h2>
                <p className="text-warning-800 leading-relaxed">
                  <strong>Train Tracker France is an independent service and is NOT affiliated with SNCF, 
                  the French government, or any official transport authority in France.</strong> 
                  Information is provided for informational purposes and may not be complete or accurate. 
                  Please verify official information before traveling.
                </p>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Train Tracker France was created to provide French travelers with simple and quick access 
              to real-time railway transport information. Our goal is to improve the travel experience 
              by centralizing data from various official sources.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Real-time</h3>
                <p className="text-sm text-gray-600">
                  Continuously updated information to keep you informed of the latest changes.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Train className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">National Coverage</h3>
                <p className="text-sm text-gray-600">
                  Train tracking across the entire SNCF network, TGV, TER, Intercités and Transilien.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Intuitive Interface</h3>
                <p className="text-sm text-gray-600">
                  Clean design and features designed to facilitate your travel planning.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Features</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🚄 Real-time Train Tracking</h3>
                <p className="text-gray-600">
                  Check departure and arrival times updated continuously, 
                  with indication of delays and cancellations.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">⚠️ Strike Alerts</h3>
                <p className="text-gray-600">
                  Stay informed about current and upcoming SNCF strikes, with assessment of their impact 
                  on your itinerary.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🗺️ Journey Planner</h3>
                <p className="text-gray-600">
                  Find the best routes with real-time calculation of disruptions 
                  and alternative suggestions.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🌍 Bilingual Interface</h3>
                <p className="text-gray-600">
                  Service available in French and English to welcome all travelers.
                </p>
              </div>
            </div>
          </div>

          {/* Data Sources */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Sources</h2>
            <p className="text-gray-600 mb-6">
              We exclusively use official and public data sources:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">SNCF API</strong>
                  <span className="text-gray-600"> - Official SNCF data for schedules and disruptions</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">transport.data.gouv.fr</strong>
                  <span className="text-gray-600"> - National transport data platform</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Regional open data</strong>
                  <span className="text-gray-600"> - Information from regional transport networks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quality & Accuracy */}
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quality and Accuracy</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                We are committed to providing information as accurate as possible. 
                However, data comes from external sources and may sometimes be 
                incomplete or have update delays.
              </p>
              
              <p>
                <strong>Important recommendations:</strong>
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Always verify official information before departure</li>
                <li>Check official SNCF websites and applications for booking</li>
                <li>When in doubt, contact SNCF or your station directly</li>
                <li>Allow extra time in case of reported disruptions</li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-primary-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-primary-900 mb-4">Contact Us</h2>
            <p className="text-primary-800 mb-4">
              Have questions, suggestions or experiencing a technical issue?
            </p>
            
            <div className="space-y-2">
              <div>
                <strong className="text-primary-900">Email:</strong>
                <span className="text-primary-800 ml-2">contact@traintracker.fr</span>
              </div>
              
              <div>
                <strong className="text-primary-900">Technical Support:</strong>
                <span className="text-primary-800 ml-2">We respond within 48h on weekdays</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}