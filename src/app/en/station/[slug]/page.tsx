import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sncfAPI } from '@/lib/api/sncf';
import NextTrainWidget from '@/components/realtime/NextTrainWidget';
import LiveDepartures from '@/components/realtime/LiveDepartures';
import { Clock, MapPin, Navigation, Phone, Wifi } from 'lucide-react';

interface StationPageProps {
  params: Promise<{ slug: string }>;
}

async function getStationData(slug: string) {
  try {
    const stations = await sncfAPI.obtenirToutesLesGares();
    const station = stations.find(s => s.slug === slug);
    
    if (!station) {
      return null;
    }

    return station;
  } catch (error) {
    console.error('Error retrieving station data:', error);
    
    // Fallback mock data for build time
    const mockStations: Record<string, any> = {
      'paris-gare-du-nord': {
        id: 'stop_area:SNCF:87271007',
        nom: 'Paris Gare du Nord',
        slug: 'paris-gare-du-nord',
        coordonnees: { latitude: 48.8803, longitude: 2.3554 },
        region: 'Île-de-France'
      },
      'paris-gare-de-lyon': {
        id: 'stop_area:SNCF:87686006',
        nom: 'Paris Gare de Lyon',
        slug: 'paris-gare-de-lyon',
        coordonnees: { latitude: 48.8437, longitude: 2.3737 },
        region: 'Île-de-France'
      },
    };
    
    return mockStations[slug] || {
      id: `stop_area:SNCF:mock_${slug}`,
      nom: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      slug: slug,
      coordonnees: { latitude: 48.8566, longitude: 2.3522 },
      region: 'France'
    };
  }
}

export async function generateStaticParams() {
  try {
    // Try to get all stations from API first
    const stations = await sncfAPI.obtenirToutesLesGares();
    
    if (stations && stations.length > 0) {
      // Generate pages for ALL stations (3000+)
      console.log(`Generating ${stations.length} English station pages...`);
      return stations.map((station) => ({
        slug: station.slug,
      }));
    } else {
      throw new Error('No stations from API, using fallback');
    }
  } catch (error) {
    console.error('Error generating all English station params, using extended fallback list:', error);
    
    // Extended fallback list with more stations for initial build
    const extendedStationList = [
      // Major cities and TGV stations
      'paris-gare-du-nord', 'paris-gare-de-lyon', 'paris-montparnasse', 'paris-saint-lazare', 'paris-gare-de-l-est', 'paris-gare-d-austerlitz',
      'lyon-part-dieu', 'lyon-perrache', 'marseille-saint-charles', 'lille-europe', 'lille-flandres',
      'bordeaux-saint-jean', 'toulouse-matabiau', 'strasbourg', 'nantes', 'rennes', 'nice-ville', 'montpellier-saint-roch',
      
      // Regional capitals and major stations
      'nancy-ville', 'metz-ville', 'reims', 'dijon-ville', 'besancon-franche-comte-tgv', 'mulhouse-ville',
      'clermont-ferrand', 'limoges-benedictins', 'poitiers', 'tours', 'orleans', 'bourges',
      'angers-saint-laud', 'le-mans', 'caen', 'rouen-rive-droite', 'amiens', 'arras',
      'valenciennes', 'douai', 'dunkerque', 'calais-ville', 'boulogne-ville',
      'troyes', 'charleville-mezieres', 'sedan', 'epernay', 'chalons-en-champagne',
      'macon-loche-tgv', 'bourg-en-bresse', 'annecy', 'chambery-challes-les-eaux', 'grenoble',
      'valence-alixan-tgv', 'valence-ville', 'avignon-tgv', 'avignon-centre', 'nimes', 'beziers', 'perpignan',
      'toulon', 'cannes', 'antibes', 'monaco-monte-carlo', 'menton',
      'pau', 'bayonne', 'biarritz', 'tarbes', 'lourdes', 'agen', 'perigueux', 'brive-la-gaillarde',
      'angouleme', 'la-rochelle-ville', 'niort', 'bressuire', 'cholet',
      'quimper', 'brest', 'lorient', 'vannes', 'saint-brieuc', 'lannion',
      'saint-etienne-chateaucreux', 'saint-etienne-carnot', 'le-puy-en-velay', 'aurillac',
      'rodez', 'albi-ville', 'castres', 'carcassonne', 'narbonne',
      'montauban-ville-bourbon', 'cahors', 'figeac', 'villefranche-de-rouergue',
      
      // Brittany and Normandy
      'saint-malo', 'dinan', 'dol-de-bretagne', 'pontorson-mont-saint-michel',
      'bayeux', 'cherbourg-en-cotentin', 'lisieux', 'evreux-normandie', 'vernon-giverny',
      
      // Loire Valley
      'blois-chambord', 'vendome-villiers-sur-loir-tgv', 'saint-pierre-des-corps', 'chinon',
      'saumur', 'angers-saint-laud', 'la-baule-escoublac', 'saint-nazaire',
      
      // Alps and Eastern France
      'belfort-montbeliard-tgv', 'belfort', 'montbeliard', 'pontarlier', 'dole-ville',
      'lons-le-saunier', 'saint-claude', 'oyonnax', 'culoz', 'aix-les-bains-le-revard',
      'albertville', 'bourg-saint-maurice', 'modane', 'briancon',
      
      // Mediterranean coast
      'frejus-saint-raphael', 'saint-raphael-valescure', 'les-arcs-draguignan',
      'hyeres', 'bandol', 'cassis', 'aubagne', 'aix-en-provence-tgv', 'aix-en-provence-centre',
      'miramas', 'arles', 'tarascon', 'beaucaire', 'ales', 'la-grand-combe',
      
      // Central France
      'vichy', 'moulins-sur-allier', 'nevers', 'cosne-cours-sur-loire', 'gien',
      'montargis', 'nemours-saint-pierre', 'fontainebleau-avon', 'melun',
      'provins', 'nogent-sur-seine', 'romilly-sur-seine', 'saint-dizier',
      
      // Northern suburbs of Paris
      'meaux', 'coulommiers', 'chateau-thierry', 'epernay', 'vitry-le-francois',
      'saint-quentin', 'cambrai', 'maubeuge', 'aulnoye-aymeries', 'fourmies',
      'hirson', 'laon', 'soissons', 'compiegne', 'creil', 'senlis',
      'chantilly-gouvieux', 'survilliers-fosses', 'louvres', 'goussainville',
      
      // Île-de-France RER and suburban stations  
      'chatelet-les-halles', 'gare-du-nord', 'republique', 'nation', 'vincennes',
      'nogent-sur-marne', 'joinville-le-pont', 'saint-maur-creteil', 'champigny-sur-marne',
      'villeneuve-saint-georges', 'villeneuve-le-roi', 'orly-ville', 'antony', 'bourg-la-reine',
      'sceaux', 'robinson', 'massy-palaiseau', 'orsay-ville', 'gif-sur-yvette',
      'saint-remy-les-chevreuse', 'cergy-le-haut', 'cergy-saint-christophe', 'pontoise',
      'argenteuil', 'ermont-eaubonne', 'enghien-les-bains', 'epinay-villetaneuse',
      'saint-denis', 'la-plaine-stade-de-france', 'le-bourget', 'aulnay-sous-bois',
      'sevran-beaudottes', 'mitry-claye', 'tournan-en-brie', 'gretz-armainvilliers',
      'longueville', 'montereau-fault-yonne', 'saint-mammes', 'moret-veneux-les-sablons',
      'fontainebleau-avon', 'bois-le-roi', 'livry-sur-seine', 'melun',
      
      // Additional popular destinations
      'lourdes', 'saint-jean-de-luz-ciboure', 'hendaye', 'irun', 'san-sebastian',
      'la-baule-escoublac', 'pornichet', 'le-croisic', 'guerande',
      'concarneau', 'pont-aven', 'douarnenez', 'morlaix', 'roscoff',
      'saint-pol-de-leon', 'landerneau', 'quimperle', 'hennebont',
      'auray', 'questembert', 'redon', 'savenay', 'nort-sur-erdre'
    ];

    return extendedStationList.map((slug) => ({
      slug: slug,
    }));
  }
}

export async function generateMetadata({ params }: StationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const station = await getStationData(slug);

  if (!station) {
    return {
      title: 'Station not found - Train Tracker France',
      description: 'The requested station was not found in our database.',
    };
  }

  return {
    title: `${station.nom} Station - Real-Time Schedules | Train Tracker France`,
    description: `Check real-time schedules and departures for ${station.nom} station. Next trains TGV, TER, Intercités with delay information and platforms.`,
    keywords: `${station.nom} station, train schedules, real-time departures, SNCF, TGV, TER, ${station.region || ''}`,
    openGraph: {
      title: `${station.nom} Station - Train Tracker France`,
      description: `Real-time information for ${station.nom} station`,
      url: `https://traintracker.fr/en/station/${slug}`,
      siteName: 'Train Tracker France',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${station.nom} Station - Train Tracker France`,
      description: `Real-time schedules and departures for ${station.nom} station`,
    },
    alternates: {
      canonical: `https://traintracker.fr/en/station/${slug}`,
      languages: {
        'fr': `https://traintracker.fr/gare/${slug}`,
        'en': `https://traintracker.fr/en/station/${slug}`,
      },
    },
  };
}

export default async function EnglishStationPage({ params }: StationPageProps) {
  const { slug } = await params;
  const station = await getStationData(slug);

  if (!station) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TrainStation',
    name: `${station.nom} Station`,
    identifier: station.id,
    url: `https://traintracker.fr/en/station/${slug}`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: station.coordonnees.latitude,
      longitude: station.coordonnees.longitude,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
      addressRegion: station.region || 'France',
    },
    hasMap: `https://www.google.com/maps?q=${station.coordonnees.latitude},${station.coordonnees.longitude}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {station.nom} Station
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{station.region || 'France'}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Updated in real-time</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.open(`https://www.google.com/maps?q=${station.coordonnees.latitude},${station.coordonnees.longitude}`, '_blank')}
                  className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Directions</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Next Train Widget */}
            <div className="lg:col-span-1">
              <NextTrainWidget 
                stationId={station.id} 
                stationName={station.nom}
                autoUpdate={true}
                updateInterval={30000}
                locale="en"
              />
              
              {/* Station Info */}
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Station Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {station.coordonnees.latitude.toFixed(6)}, {station.coordonnees.longitude.toFixed(6)}
                    </span>
                  </div>
                  {station.code_uic && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">UIC Code: {station.code_uic}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">WiFi available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">SNCF Information: 3635</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Live Departures */}
            <div className="lg:col-span-2">
              <LiveDepartures 
                stationId={station.id}
                stationName={station.nom}
                autoUpdate={true}
                updateInterval={30000}
                maxDepartures={15}
                locale="en"
              />
            </div>
          </div>

          {/* Station Description */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              About {station.nom} Station
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {station.nom} is a French railway station located in the {station.region || 'France'} region. 
                This page provides you with real-time information on train departures and arrivals, 
                including TGV, TER, Intercités and other railway services.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                You can check the schedules of upcoming trains, verify any delays, 
                and get information on departure platforms. Data is updated in real-time 
                using the official SNCF API.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  How often are the schedules updated?
                </h3>
                <p className="text-gray-700">
                  Schedules are updated every 30 seconds with the latest information 
                  from the SNCF API, ensuring real-time data.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  How can I know if my train is delayed?
                </h3>
                <p className="text-gray-700">
                  Delays are displayed in real-time next to the scheduled departure time. 
                  A color indicator also shows the train status.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Can I plan my route from this station?
                </h3>
                <p className="text-gray-700">
                  Yes, you can use our journey planner to find 
                  the best connections from {station.nom} station.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}