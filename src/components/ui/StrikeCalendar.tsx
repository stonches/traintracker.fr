'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, AlertTriangle } from 'lucide-react';
import { getTranslation } from '@/lib/i18n/utils';
import { Language } from '@/lib/i18n/translations';

interface StrikeCalendarProps {
  lang: Language;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  hasStrike: boolean;
  strikeLevel: 'high' | 'medium' | 'low' | null;
}

const STRIKE_DATES = {
  '2024-12-12': 'medium',
  '2024-12-15': 'high',
  '2024-12-16': 'high',
  '2024-12-17': 'high',
  '2024-12-20': 'low',
};

export function StrikeCalendar({ lang }: StrikeCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const t = (key: string) => getTranslation(lang, key);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get first day of the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // Get first day of the calendar (might be from previous month)
  const firstDayOfCalendar = new Date(firstDayOfMonth);
  firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() - firstDayOfMonth.getDay());

  // Generate calendar days
  const calendarDays: CalendarDay[] = [];
  const currentCalendarDate = new Date(firstDayOfCalendar);

  for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
    const dateKey = currentCalendarDate.toISOString().split('T')[0];
    const strikeLevel = STRIKE_DATES[dateKey as keyof typeof STRIKE_DATES] as 'high' | 'medium' | 'low' | undefined;

    calendarDays.push({
      date: new Date(currentCalendarDate),
      isCurrentMonth: currentCalendarDate.getMonth() === currentDate.getMonth(),
      hasStrike: !!strikeLevel,
      strikeLevel: strikeLevel || null,
    });

    currentCalendarDate.setDate(currentCalendarDate.getDate() + 1);
  }

  const monthNames = lang === 'fr' 
    ? ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = lang === 'fr'
    ? ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getStrikeLevelColor = (level: string | null) => {
    switch (level) {
      case 'high': return 'bg-danger-500';
      case 'medium': return 'bg-warning-500';
      case 'low': return 'bg-success-500';
      default: return '';
    }
  };

  const getStrikeLevelText = (level: string | null) => {
    switch (level) {
      case 'high': return 'Grève importante';
      case 'medium': return 'Grève modérée';
      case 'low': return 'Grève locale';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary-600" />
            <span>Calendrier des grèves</span>
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousMonth}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h4 className="text-lg font-medium text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h4>
          
          <button
            onClick={goToNextMonth}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const isToday = day.date.getTime() === today.getTime();
            
            return (
              <div
                key={index}
                className={`
                  relative p-2 text-center text-sm transition-colors cursor-pointer rounded-lg
                  ${day.isCurrentMonth 
                    ? 'text-gray-900 hover:bg-gray-50' 
                    : 'text-gray-400'
                  }
                  ${isToday 
                    ? 'bg-primary-50 text-primary-600 font-semibold' 
                    : ''
                  }
                  ${day.hasStrike 
                    ? 'font-medium' 
                    : ''
                  }
                `}
                title={day.hasStrike ? getStrikeLevelText(day.strikeLevel) : ''}
              >
                <span className="relative z-10">
                  {day.date.getDate()}
                </span>
                
                {day.hasStrike && (
                  <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full ${getStrikeLevelColor(day.strikeLevel)}`} />
                )}
                
                {isToday && (
                  <div className="absolute inset-0 border-2 border-primary-600 rounded-lg pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs font-medium text-gray-700 mb-2">Légende:</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-danger-500 rounded-full"></div>
              <span className="text-gray-600">Grève importante</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
              <span className="text-gray-600">Grève modérée</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-gray-600">Grève locale</span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-lg font-bold text-danger-600">2</div>
              <div className="text-xs text-gray-600">Grèves ce mois</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-lg font-bold text-warning-600">5</div>
              <div className="text-xs text-gray-600">Jours affectés</div>
            </div>
          </div>
        </div>

        {/* Alert for upcoming strikes */}
        <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-warning-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-warning-800">
              <span className="font-medium">Prochaine grève:</span> 15-17 décembre 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}