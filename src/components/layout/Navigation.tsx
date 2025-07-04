'use client';

import { useState } from 'react';
import { Train, Menu, X, Search, Route, Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  const toggleLanguage = () => {
    const currentLang = pathname.startsWith('/en') ? 'en' : 'fr';
    const newPath = currentLang === 'fr' 
      ? `/en${pathname}`
      : pathname.replace('/en', '') || '/';
    
    window.location.href = newPath;
  };

  const currentLang = pathname.startsWith('/en') ? 'en' : 'fr';

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 rounded-lg p-2">
              <Train className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-gray-900">Train Tracker</div>
              <div className="text-xs text-blue-600 -mt-1">France</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') && pathname === '/'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Accueil
            </Link>
            <Link
              href="/recherche"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive('/recherche')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Recherche</span>
            </Link>
            <Link
              href="/itineraire"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive('/itineraire')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Route className="h-4 w-4" />
              <span>Itinéraire</span>
            </Link>
            <Link
              href="/gares"
              className={`text-sm font-medium transition-colors ${
                isActive('/gares')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Toutes les gares
            </Link>
            <Link
              href="/a-propos"
              className={`text-sm font-medium transition-colors ${
                isActive('/a-propos')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              À propos
            </Link>
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              aria-label={currentLang === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">
                {currentLang === 'fr' ? 'EN' : 'FR'}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Menu principal"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive('/') && pathname === '/'
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                Accueil
              </Link>
              <Link
                href="/recherche"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                  isActive('/recherche')
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <Search className="h-4 w-4" />
                <span>Recherche</span>
              </Link>
              <Link
                href="/itineraire"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                  isActive('/itineraire')
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <Route className="h-4 w-4" />
                <span>Itinéraire</span>
              </Link>
              <Link
                href="/gares"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive('/gares')
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                Toutes les gares
              </Link>
              <Link
                href="/a-propos"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive('/a-propos')
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                À propos
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive('/contact')
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}