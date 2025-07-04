import { Train, Mail, Phone, MapPin, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 rounded-lg p-2">
                <Train className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl">Train Tracker</div>
                <div className="text-sm text-blue-400">France</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              La plateforme de référence pour consulter les horaires de trains français en temps réel.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/traintracker-france"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/traintrackerfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/recherche" className="text-gray-300 hover:text-white transition-colors">
                  Recherche de gares
                </Link>
              </li>
              <li>
                <Link href="/itineraire" className="text-gray-300 hover:text-white transition-colors">
                  Planificateur d'itinéraire
                </Link>
              </li>
              <li>
                <Link href="/gares" className="text-gray-300 hover:text-white transition-colors">
                  Toutes les gares
                </Link>
              </li>
              <li>
                <Link href="/temps-reel" className="text-gray-300 hover:text-white transition-colors">
                  Informations temps réel
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/a-propos" className="text-gray-300 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/comment-ca-marche" className="text-gray-300 hover:text-white transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-300 hover:text-white transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <a
                  href="mailto:contact@traintracker.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  contact@traintracker.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">Support 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">France</span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-block"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2024 Train Tracker France. Tous droits réservés.
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/politique-confidentialite" className="text-gray-400 hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/conditions-utilisation" className="text-gray-400 hover:text-white transition-colors">
              Conditions d'utilisation
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
              Cookies
            </Link>
            <Link href="/plan-site" className="text-gray-400 hover:text-white transition-colors">
              Plan du site
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <p className="text-xs text-gray-500 text-center">
            Train Tracker France est un service indépendant et n'est PAS affilié à la SNCF, 
            au gouvernement français ou à toute autorité de transport officielle.
          </p>
        </div>
      </div>
    </footer>
  );
}