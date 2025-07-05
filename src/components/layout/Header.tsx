'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Train, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { detectLanguage, getTranslation } from '@/lib/i18n/translations';
import { trackLanguageSwitch } from '@/lib/analytics';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const currentLang = detectLanguage(pathname);

  const t = (key: string) => getTranslation(currentLang, key);

  const navLinks = [
    {
      href: currentLang === 'fr' ? '/' : '/en',
      label: t('nav.home'),
      active: pathname === '/' || pathname === '/en'
    },
    {
      href: currentLang === 'fr' ? '/itineraire/' : '/en/journey/',
      label: t('nav.journey'),
      active: pathname.includes('/itineraire') || pathname.includes('/journey')
    },
    {
      href: currentLang === 'fr' ? '/info-trafic/' : '/en/traffic-info/',
      label: t('nav.traffic'),
      active: pathname.includes('/info-trafic') || pathname.includes('/traffic-info')
    },
    {
      href: currentLang === 'fr' ? '/a-propos/' : '/en/about/',
      label: t('nav.about'),
      active: pathname.includes('/a-propos') || pathname.includes('/about')
    },
    {
      href: currentLang === 'fr' ? '/contact/' : '/en/contact/',
      label: t('nav.contact'),
      active: pathname.includes('/contact')
    }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href={currentLang === 'fr' ? '/' : '/en'}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Train className="h-8 w-8" />
              <span className="text-xl font-bold">
                Train Tracker France
              </span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.active
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language switcher et menu mobile */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {/* Menu mobile button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    link.active
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}