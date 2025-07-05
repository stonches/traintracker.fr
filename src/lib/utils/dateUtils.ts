/**
 * Utilitaires pour la gestion des dates et heures
 */
import { format, parseISO, isValid, differenceInMinutes, addMinutes } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface FormattedTime {
  iso: string;
  time: string;
  date: string;
  datetime: string;
  timestamp: number;
}

/**
 * Formate une date en français
 */
export function formatFrenchDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) {
    return 'Date invalide';
  }
  
  return format(dateObj, 'dd/MM/yyyy', { locale: fr });
}

/**
 * Formate une heure en français
 */
export function formatFrenchTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) {
    return 'Heure invalide';
  }
  
  return format(dateObj, 'HH:mm', { locale: fr });
}

/**
 * Formate une date et heure complète en français
 */
export function formatFrenchDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) {
    return 'Date et heure invalide';
  }
  
  return format(dateObj, 'dd/MM/yyyy à HH:mm', { locale: fr });
}

/**
 * Calcule le temps restant avant un train
 */
export function getTimeUntilTrain(departureTime: Date | string): {
  minutes: number;
  text: string;
  status: 'immediate' | 'soon' | 'normal' | 'distant';
} {
  const now = new Date();
  const departure = typeof departureTime === 'string' ? parseISO(departureTime) : departureTime;
  
  if (!isValid(departure)) {
    return {
      minutes: 0,
      text: 'Heure inconnue',
      status: 'normal'
    };
  }
  
  const minutes = differenceInMinutes(departure, now);
  
  if (minutes <= 0) {
    return {
      minutes: 0,
      text: 'Immédiat',
      status: 'immediate'
    };
  }
  
  if (minutes === 1) {
    return {
      minutes: 1,
      text: 'Dans 1 minute',
      status: 'immediate'
    };
  }
  
  if (minutes < 5) {
    return {
      minutes,
      text: `Dans ${minutes} min`,
      status: 'soon'
    };
  }
  
  if (minutes < 60) {
    return {
      minutes,
      text: `Dans ${minutes} min`,
      status: minutes < 15 ? 'soon' : 'normal'
    };
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 1) {
    return {
      minutes,
      text: remainingMinutes === 0 ? 'Dans 1h' : `Dans 1h${remainingMinutes}`,
      status: 'distant'
    };
  }
  
  return {
    minutes,
    text: remainingMinutes === 0 ? `Dans ${hours}h` : `Dans ${hours}h${remainingMinutes}`,
    status: 'distant'
  };
}

/**
 * Obtient le statut d'un retard
 */
export function getDelayStatus(delayMinutes: number): {
  status: 'on-time' | 'slight-delay' | 'delay' | 'major-delay';
  text: string;
  color: string;
} {
  if (delayMinutes <= 0) {
    return {
      status: 'on-time',
      text: 'À l\'heure',
      color: 'text-green-600'
    };
  }
  
  if (delayMinutes <= 5) {
    return {
      status: 'slight-delay',
      text: `${delayMinutes} min de retard`,
      color: 'text-yellow-600'
    };
  }
  
  if (delayMinutes <= 15) {
    return {
      status: 'delay',
      text: `${delayMinutes} min de retard`,
      color: 'text-orange-600'
    };
  }
  
  return {
    status: 'major-delay',
    text: `${delayMinutes} min de retard`,
    color: 'text-red-600'
  };
}

/**
 * Convertit une date en format SNCF
 */
export function toSNCFDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) {
    return format(new Date(), 'yyyyMMdd\'T\'HHmmss');
  }
  
  return format(dateObj, 'yyyyMMdd\'T\'HHmmss');
}

/**
 * Convertit un format SNCF en date
 */
export function fromSNCFDateTime(sncfDateTime: string): Date | null {
  try {
    // Format SNCF: 20240105T143000
    const match = sncfDateTime.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/);
    
    if (!match) {
      return null;
    }
    
    const [, year, month, day, hour, minute, second] = match;
    const date = new Date(
      parseInt(year),
      parseInt(month) - 1, // Les mois sont 0-indexés
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second)
    );
    
    return isValid(date) ? date : null;
  } catch (error) {
    return null;
  }
}

/**
 * Génère les heures de départ pour le sélecteur
 */
export function generateDepartureTimeOptions(): Array<{ value: string; label: string }> {
  const options: Array<{ value: string; label: string }> = [];
  const now = new Date();
  
  // Maintenant
  options.push({
    value: now.toISOString(),
    label: 'Maintenant'
  });
  
  // Dans 30 minutes
  options.push({
    value: addMinutes(now, 30).toISOString(),
    label: 'Dans 30 min'
  });
  
  // Dans 1 heure
  options.push({
    value: addMinutes(now, 60).toISOString(),
    label: 'Dans 1 heure'
  });
  
  // Dans 2 heures
  options.push({
    value: addMinutes(now, 120).toISOString(),
    label: 'Dans 2 heures'
  });
  
  return options;
}

/**
 * Vérifie si une date est aujourd'hui
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Obtient l'heure actuelle française
 */
export function getCurrentFrenchTime(): Date {
  return new Date();
}