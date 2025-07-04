import { getMetadata, pageMetadata } from '@/lib/i18n/metadata';
import { getTranslation } from '@/lib/i18n/utils';
import { LiveDashboard } from '@/components/sections/LiveDashboard';
import { StationSearch } from '@/components/ui/StationSearch';
import { StrikeAlert } from '@/components/ui/StrikeAlert';

export const metadata = getMetadata(
  pageMetadata.fr.home.title,
  pageMetadata.fr.home.description,
  '/',
  'fr'
);

export default function HomePage() {
  const lang = 'fr';
  const t = (key: string) => getTranslation(lang, key);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('home.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('home.tagline')}
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <StationSearch lang={lang} />
          </div>
        </div>

        <StrikeAlert lang={lang} />
        
        <LiveDashboard lang={lang} />
      </div>
    </div>
  );
}
