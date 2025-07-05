'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { detectLanguage, getAlternateURL } from '@/lib/i18n/translations';
import { trackLanguageSwitch } from '@/lib/analytics';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLang = detectLanguage(pathname);
  const alternateURL = getAlternateURL(pathname, currentLang);

  const handleLanguageSwitch = () => {
    const targetLang = currentLang === 'fr' ? 'en' : 'fr';
    trackLanguageSwitch(currentLang, targetLang);
  };

  return (
    <Link
      href={alternateURL}
      onClick={handleLanguageSwitch}
      className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
      title={currentLang === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">
        {currentLang === 'fr' ? 'EN' : 'FR'}
      </span>
    </Link>
  );
}