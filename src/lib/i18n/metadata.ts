import { Metadata } from 'next';

export const siteConfig = {
  name: 'Train Tracker France',
  description: {
    fr: 'Train Tracker France : Suivez en temps réel les grèves SNCF, retards de trains et perturbations en France. Informations officielles TGV, TER, Intercités sur TrainTracker.fr.',
    en: 'Train Tracker France: Track SNCF strikes, train delays and disruptions in real-time across France. Official French train information for TGV, TER, Intercités on TrainTracker.fr.'
  },
  url: 'https://traintracker.fr',
  ogImage: 'https://traintracker.fr/og-image.jpg',
  keywords: {
    fr: ['trains France', 'SNCF', 'grèves', 'retards', 'TGV', 'TER', 'Intercités', 'horaires trains', 'perturbations SNCF'],
    en: ['trains France', 'SNCF', 'strikes', 'delays', 'TGV', 'TER', 'Intercités', 'train schedules', 'SNCF disruptions']
  }
};

export function getMetadata(
  title: string,
  description: string,
  path: string,
  lang: 'fr' | 'en' = 'fr'
): Metadata {
  const url = `${siteConfig.url}${path}`;
  const alternateUrl = lang === 'fr' ? `${siteConfig.url}/en${path}` : `${siteConfig.url}${path === '/en' ? '/' : path.replace('/en', '')}`;
  
  return {
    title,
    description,
    keywords: siteConfig.keywords[lang],
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name
        }
      ],
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage]
    },
    alternates: {
      canonical: url,
      languages: {
        'x-default': lang === 'fr' ? url : alternateUrl,
        'fr': lang === 'fr' ? url : alternateUrl,
        'en': lang === 'en' ? url : alternateUrl
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}

export const pageMetadata = {
  fr: {
    home: {
      title: 'Train Tracker France - Grèves et Retards SNCF en Temps Réel',
      description: 'Train Tracker France : Suivez en temps réel les grèves SNCF, retards de trains et perturbations en France. Informations officielles TGV, TER, Intercités sur TrainTracker.fr.'
    },
    strikes: {
      title: 'Grèves SNCF France Actuelles - Calendrier et Impact | Train Tracker',
      description: 'Grèves SNCF France en cours et à venir : calendrier, impact sur les trains TGV, TER, Intercités. Prévisions et alternatives sur Train Tracker France.'
    },
    journey: {
      title: 'Planificateur d\'Itinéraire SNCF - Calcul en Temps Réel | Train Tracker',
      description: 'Planifiez vos trajets SNCF avec calcul en temps réel des retards et grèves. Alternatives et itinéraires optimisés pour TGV, TER, Intercités.'
    },
    regional: {
      title: 'Transports Régionaux France - TER, Transilien | Train Tracker',
      description: 'Transports régionaux France : TER, Transilien, bus régionaux. Horaires, perturbations et grèves des transports publics régionaux.'
    },
    about: {
      title: 'À Propos - Train Tracker France',
      description: 'Train Tracker France : service indépendant de suivi des trains SNCF. Informations transparentes sur les sources de données et notre mission.'
    },
    contact: {
      title: 'Contact - Train Tracker France',
      description: 'Contactez Train Tracker France pour vos questions, suggestions ou support technique. Formulaire de contact et informations de support.'
    },
    privacy: {
      title: 'Politique de Confidentialité - Train Tracker France',
      description: 'Politique de confidentialité conforme RGPD de Train Tracker France. Gestion des données, cookies et droits des utilisateurs.'
    },
    terms: {
      title: 'Conditions d\'Utilisation - Train Tracker France',
      description: 'Conditions d\'utilisation du service Train Tracker France. Mentions légales, responsabilités et conditions d\'accès.'
    }
  },
  en: {
    home: {
      title: 'Train Tracker France - Live SNCF Strikes & Delays',
      description: 'Train Tracker France: Track SNCF strikes, train delays and disruptions in real-time across France. Official French train information for TGV, TER, Intercités on TrainTracker.fr.'
    },
    strikes: {
      title: 'Current SNCF Strikes France - Calendar & Impact | Train Tracker',
      description: 'Current and upcoming SNCF strikes in France: calendar, impact on TGV, TER, Intercités trains. Forecasts and alternatives on Train Tracker France.'
    },
    journey: {
      title: 'SNCF Journey Planner - Real-time Calculation | Train Tracker',
      description: 'Plan your SNCF journeys with real-time delay and strike calculations. Optimized alternatives and routes for TGV, TER, Intercités.'
    },
    regional: {
      title: 'Regional Transport France - TER, Transilien | Train Tracker',
      description: 'Regional transport France: TER, Transilien, regional buses. Schedules, disruptions and strikes for regional public transport.'
    },
    about: {
      title: 'About - Train Tracker France',
      description: 'Train Tracker France: independent SNCF train tracking service. Transparent information about data sources and our mission.'
    },
    contact: {
      title: 'Contact - Train Tracker France',
      description: 'Contact Train Tracker France for questions, suggestions or technical support. Contact form and support information.'
    },
    privacy: {
      title: 'Privacy Policy - Train Tracker France',
      description: 'GDPR-compliant privacy policy of Train Tracker France. Data management, cookies and user rights.'
    },
    terms: {
      title: 'Terms of Use - Train Tracker France',
      description: 'Terms of use for Train Tracker France service. Legal notices, responsibilities and access conditions.'
    }
  }
};