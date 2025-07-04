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

export function getLocalizedPath(pathname: string, targetLang: Language): string {
  const currentLang = getLanguageFromPath(pathname);
  
  if (currentLang === targetLang) {
    return pathname;
  }
  
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