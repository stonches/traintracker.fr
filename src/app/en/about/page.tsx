import React from 'react';
import { Metadata } from 'next';
import { Train, Target, Users, Shield, Clock, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: "About | Train Tracker France",
  description: "Discover Train Tracker France, the independent real-time railway information service. Our mission, team and values.",
  keywords: "about train tracker france, team, mission, independent railway service",
  authors: [{ name: "Train Tracker France" }],
  creator: "Train Tracker France",
  publisher: "Train Tracker France",
  alternates: {
    canonical: "https://traintracker.fr/en/about/",
    languages: {
      "fr": "https://traintracker.fr/a-propos/",
      "en": "https://traintracker.fr/en/about/",
    },
  },
  openGraph: {
    title: "About | Train Tracker France",
    description: "Discover Train Tracker France, the independent railway information service",
    url: "https://traintracker.fr/en/about/",
    siteName: "Train Tracker France",
    locale: "en_US",
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
                About Train Tracker France
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your independent real-time railway information platform for 
              a more peaceful and better informed train journey.
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
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Train Tracker France's mission is to democratize access to 
                real-time railway information. We believe that every traveler 
                deserves access to accurate, up-to-date and easily accessible 
                information to plan their train journeys.
              </p>
              <p className="text-lg text-gray-600">
                By centralizing data from 50 major French stations, we offer 
                an optimized user experience that allows you to make informed 
                decisions for your travels.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50</div>
                  <div className="text-sm text-gray-600">Covered stations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">30s</div>
                  <div className="text-sm text-gray-600">Updates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Availability</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                  <div className="text-sm text-gray-600">Languages</div>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide our daily work and our commitment 
              to our users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-600">
                We are committed to providing accurate and up-to-date information, 
                with updates every 30 seconds to guarantee you the most recent data.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                Our platform is designed to be accessible to everyone, 
                with an intuitive interface and service available 
                in French and English.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency</h3>
              <p className="text-gray-600">
                As an independent service not affiliated with SNCF, we clearly 
                communicate about our data sources and limitations 
                to maintain your trust.
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Data Sources</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">SNCF Connect API for official schedules</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">transport.data.gouv.fr for open data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Real-time disruption information</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Station geolocation data</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Modern Technology</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Train Tracker France uses modern web technologies to 
                offer you a fast and smooth experience. Our platform 
                is optimized for all devices and designed according to 
                web performance best practices.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Responsive interface for mobile and desktop</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Automatic real-time updates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Offline mode to view cached data</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Optimized for Core Web Vitals</span>
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
                  Independent Service - Important Notice
                </h3>
                <p className="text-yellow-700 leading-relaxed">
                  Train Tracker France is an independent service and is <strong>NOT affiliated</strong> with SNCF, 
                  the French government or any official transport authority. 
                  The information provided is for informational purposes only and does not replace 
                  official sources. We always recommend verifying critical information 
                  directly with SNCF or on station display boards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}