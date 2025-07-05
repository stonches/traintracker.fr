'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Train, Github, Mail, ExternalLink } from 'lucide-react';
import { detectLanguage, getTranslation } from '@/lib/i18n/translations';

export default function Footer() {
  const pathname = usePathname();
  const currentLang = detectLanguage(pathname);

  const t = (key: string) => getTranslation(currentLang, key);

  const footerLinks = [
    {
      href: currentLang === 'fr' ? '/a-propos/' : '/en/about/',
      label: t('footer.about')
    },
    {
      href: currentLang === 'fr' ? '/contact/' : '/en/contact/',
      label: t('footer.contact')
    },
    {
      href: currentLang === 'fr' ? '/confidentialite/' : '/en/privacy/',
      label: t('footer.privacy')
    },
    {
      href: currentLang === 'fr' ? '/conditions/' : '/en/terms/',
      label: t('footer.terms')
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 text-blue-600 mb-4">
              <Train className="h-8 w-8" />
              <span className="text-xl font-bold">Train Tracker France</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              {t('home.description')}
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-md">
              <p className="text-sm text-yellow-800 font-medium">
                ⚠️ {t('footer.disclaimer')}
              </p>
            </div>
          </div>

          {/* Liens */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              {currentLang === 'fr' ? 'Liens' : 'Links'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact et sources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              {currentLang === 'fr' ? 'Sources de données' : 'Data sources'}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.sncf-connect.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1"
                >
                  <span>SNCF Connect</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://transport.data.gouv.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1"
                >
                  <span>transport.data.gouv.fr</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:contact@traintracker.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1"
                >
                  <Mail className="h-4 w-4" />
                  <span>contact@traintracker.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Train Tracker France. 
              {currentLang === 'fr' ? ' Tous droits réservés.' : ' All rights reserved.'}
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-500">
                {currentLang === 'fr' ? 'Données mises à jour toutes les 30 secondes' : 'Data updated every 30 seconds'}
              </span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">
                  {currentLang === 'fr' ? 'En direct' : 'Live'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}