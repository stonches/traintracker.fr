'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Train, Globe } from 'lucide-react';
import { getTranslation, getLanguageFromPath, getLocalizedPath, languageNames } from '@/lib/i18n/utils';
import { Language } from '@/lib/i18n/translations';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentLang = getLanguageFromPath(pathname);
  const t = (key: string) => getTranslation(currentLang, key);

  const navigation = [
    { name: t('nav.home'), href: currentLang === 'fr' ? '/' : '/en' },
    { name: t('nav.stations'), href: currentLang === 'fr' ? '/gares' : '/en/stations' },
    { name: t('nav.strikes'), href: currentLang === 'fr' ? '/greves' : '/en/strikes' },
    { name: t('nav.journey'), href: currentLang === 'fr' ? '/itineraire' : '/en/journey' },
    { name: t('nav.regional'), href: currentLang === 'fr' ? '/transports-regionaux' : '/en/regional' },
  ];

  const toggleLanguage = () => {
    const newLang: Language = currentLang === 'fr' ? 'en' : 'fr';
    const newPath = getLocalizedPath(pathname, newLang);
    window.location.href = newPath;
  };

  const isActivePath = (href: string) => {
    if (href === '/' || href === '/en') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-soft border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href={currentLang === 'fr' ? '/' : '/en'}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Train className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-gray-900">Train Tracker</div>
              <div className="text-xs text-gray-500 -mt-1">France</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActivePath(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{languageNames[currentLang]}</span>
                <span className="sm:hidden">{currentLang.toUpperCase()}</span>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-strong border border-gray-200 py-2 z-50">
                  <button
                    onClick={toggleLanguage}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {languageNames[currentLang === 'fr' ? 'en' : 'fr']}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActivePath(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Click outside to close language menu */}
      {isLanguageMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsLanguageMenuOpen(false)}
        />
      )}
    </header>
  );
}