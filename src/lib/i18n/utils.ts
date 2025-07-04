import { translations, Language } from './translations';

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

export function isValidLanguage(lang: string): lang is Language {
  return lang === 'fr' || lang === 'en';
}

export function getLanguageFromPath(pathname: string): Language {
  if (pathname.startsWith('/en')) {
    return 'en';
  }
  return 'fr';
}

// Route mappings between French and English
const routeMappings = {
  fr: {
    '/': '/en',
    '/gares': '/en/stations',
    '/greves': '/en/strikes', 
    '/itineraire': '/en/journey',
    '/transports-regionaux': '/en/regional',
    '/a-propos': '/en/about',
    '/contact': '/en/contact',
    '/confidentialite': '/en/privacy',
    '/conditions': '/en/terms',
    '/cookies': '/en/cookies',
  },
  en: {
    '/en': '/',
    '/en/stations': '/gares',
    '/en/strikes': '/greves',
    '/en/journey': '/itineraire', 
    '/en/regional': '/transports-regionaux',
    '/en/about': '/a-propos',
    '/en/contact': '/contact',
    '/en/privacy': '/confidentialite',
    '/en/terms': '/conditions',
    '/en/cookies': '/cookies',
  }
};

export function getLocalizedPath(pathname: string, targetLang: Language): string {
  const currentLang = getLanguageFromPath(pathname);
  
  if (currentLang === targetLang) {
    return pathname;
  }
  
  // Check for exact route mapping
  const mappings = routeMappings[currentLang];
  if (mappings && mappings[pathname]) {
    return mappings[pathname];
  }
  
  // Handle dynamic routes like /gare/[slug] - these are shared between languages
  if (pathname.startsWith('/gare/')) {
    return pathname; // Station pages are the same in both languages  
  }
  
  // Fallback to simple prefix handling
  if (targetLang === 'fr') {
    // Remove /en prefix for French
    return pathname.replace(/^\/en/, '') || '/';
  } else {
    // Add /en prefix for English
    if (pathname === '/') {
      return '/en';
    }
    return `/en${pathname}`;
  }
}

export function removeLanguagePrefix(pathname: string): string {
  return pathname.replace(/^\/en/, '') || '/';
}

export const languageNames = {
  fr: 'Français',
  en: 'English'
} as const;