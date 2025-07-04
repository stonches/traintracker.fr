'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Train, Mail, ExternalLink, Github, Twitter } from 'lucide-react';
import { getTranslation, getLanguageFromPath } from '@/lib/i18n/utils';

export function Footer() {
  const pathname = usePathname();
  const currentLang = getLanguageFromPath(pathname);
  const t = (key: string) => getTranslation(currentLang, key);

  const footerLinks = {
    company: [
      { name: t('nav.about'), href: currentLang === 'fr' ? '/a-propos' : '/en/about' },
      { name: t('nav.contact'), href: currentLang === 'fr' ? '/contact' : '/en/contact' },
    ],
    legal: [
      { name: t('nav.privacy'), href: currentLang === 'fr' ? '/confidentialite' : '/en/privacy' },
      { name: t('nav.terms'), href: currentLang === 'fr' ? '/conditions' : '/en/terms' },
      { name: 'Cookies', href: currentLang === 'fr' ? '/cookies' : '/en/cookies' },
    ],
    resources: [
      { name: 'SNCF Open Data', href: 'https://www.sncf.com/fr/open-data', external: true },
      { name: 'transport.data.gouv.fr', href: 'https://transport.data.gouv.fr', external: true },
      { name: 'Données Publiques', href: 'https://www.data.gouv.fr', external: true },
    ],
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Train className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">Train Tracker</div>
                <div className="text-sm text-gray-500">France</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {currentLang === 'fr' 
                ? 'Service indépendant de suivi des trains SNCF en temps réel. Informations sur les grèves, retards et perturbations.'
                : 'Independent real-time SNCF train tracking service. Information on strikes, delays and disruptions.'
              }
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://github.com/traintracker-france" 
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/traintracker_fr" 
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href={`mailto:contact@traintracker.fr`}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              {currentLang === 'fr' ? 'Service' : 'Service'}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              {currentLang === 'fr' ? 'Légal' : 'Legal'}
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              {currentLang === 'fr' ? 'Ressources' : 'Resources'}
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors flex items-center space-x-1"
                  >
                    <span>{link.name}</span>
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {currentYear} Train Tracker France. {currentLang === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}.
            </div>
            <div className="text-sm text-gray-500">
              {currentLang === 'fr' 
                ? 'Service d\'information sur les transports en France.'
                : 'French transport information service.'
              }
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}