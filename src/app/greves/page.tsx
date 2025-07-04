import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { getTranslation } from '@/lib/i18n/utils';
import { StrikesPanel } from '@/components/sections/StrikesPanel';
import { StrikeCalendar } from '@/components/ui/StrikeCalendar';

export const metadata = getMetadata(
  pageMetadata.fr.strikes.title,
  pageMetadata.fr.strikes.description,
  '/greves',
  'fr'
);

export default function StrikesPage() {
  const lang = 'fr';
  const t = (key: string) => getTranslation(lang, key);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>Train Tracker</span>
            <span>/</span>
            <span className="text-gray-900">{t('strikes.title')}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('strikes.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Suivez les grèves SNCF en cours et à venir, leur impact sur le réseau ferroviaire français et les alternatives disponibles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StrikesPanel lang={lang} />
          </div>
          <div className="lg:col-span-1">
            <StrikeCalendar lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}