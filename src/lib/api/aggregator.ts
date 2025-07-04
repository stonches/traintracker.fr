import { 
  getStationDepartures, 
  getDisruptions, 
  searchStations, 
  SNCFDeparture, 
  SNCFDisruption,
  SNCFStation,
  isDelayed,
  getDelayMinutes,
  getSeverityColor 
} from './sncf';
import { 
  getRegionalDatasets, 
  getRegionalFeeds, 
  TransportDataset, 
  RegionalFeed,
  getDatasetQualityScore,
  isDatasetActive 
} from './transport-gouv';

export interface AggregatedStation {
  id: string;
  name: string;
  slug: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  region: string;
  departement: string;
  codes: {
    sncf?: string;
    uic?: string;
    gtfs?: string;
  };
  sources: string[];
  hasRealtime: boolean;
  lastUpdated: string;
}

export interface AggregatedDeparture {
  id: string;
  line: {
    id: string;
    name: string;
    code: string;
    color: string;
    mode: string;
    commercialMode: string;
  };
  direction: string;
  destination: string;
  platform: string;
  scheduledTime: string;
  actualTime: string;
  delay: number;
  status: 'on_time' | 'delayed' | 'cancelled' | 'unknown';
  source: 'sncf' | 'regional' | 'gtfs';
  disruptions: string[];
  accessibility: {
    wheelchairAccessible: boolean;
    audioAnnouncements: boolean;
    visualAnnouncements: boolean;
  };
}

export interface AggregatedDisruption {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low' | 'info';
  status: 'active' | 'ended' | 'planned';
  startDate: string;
  endDate: string;
  affectedLines: string[];
  affectedStations: string[];
  category: string;
  cause: string;
  impact: {
    level: number;
    description: string;
  };
  alternatives: string[];
  source: 'sncf' | 'regional' | 'manual';
  lastUpdated: string;
}

export interface StrikeInfo {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  affectedServices: string[];
  severity: 'high' | 'medium' | 'low';
  expectedImpact: {
    nationalLines: number; // percentage
    regionalLines: number; // percentage
    localServices: number; // percentage
  };
  organizer: string;
  reason: string;
  negotiations: {
    status: 'ongoing' | 'suspended' | 'resolved';
    nextMeeting?: string;
  };
  alternatives: string[];
  source: string;
  lastUpdated: string;
}

export interface LiveDashboardData {
  strikes: StrikeInfo[];
  disruptions: AggregatedDisruption[];
  majorDelays: {
    stationName: string;
    averageDelay: number;
    affectedDepartures: number;
  }[];
  networkStatus: {
    overall: 'good' | 'disrupted' | 'severely_disrupted';
    regions: {
      name: string;
      status: 'good' | 'disrupted' | 'severely_disrupted';
      activeDisruptions: number;
    }[];
  };
  lastUpdated: string;
}

const CACHE_DURATION = {
  STATIONS: 24 * 60 * 60 * 1000, // 24 hours
  DEPARTURES: 30 * 1000, // 30 seconds
  DISRUPTIONS: 5 * 60 * 1000, // 5 minutes
  STRIKES: 15 * 60 * 1000, // 15 minutes
  REGIONAL_FEEDS: 60 * 60 * 1000, // 1 hour
};

const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

function getCacheKey(type: string, ...params: string[]): string {
  return `${type}:${params.join(':')}`;
}

function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp > cached.ttl) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
}

function setCachedData<T>(key: string, data: T, ttl: number): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
}

export async function getAggregatedStations(query?: string, limit = 20): Promise<AggregatedStation[]> {
  const cacheKey = getCacheKey('stations', query || 'all', limit.toString());
  const cached = getCachedData<AggregatedStation[]>(cacheKey);
  
  if (cached) return cached;

  try {
    const [sncfStations, regionalDatasets] = await Promise.all([
      query ? searchStations(query, limit) : [],
      getRegionalDatasets(),
    ]);

    const aggregatedStations: AggregatedStation[] = [];

    // Process SNCF stations
    for (const station of sncfStations) {
      const aggregated: AggregatedStation = {
        id: station.id,
        name: station.name,
        slug: station.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        coordinates: {
          lat: parseFloat(station.coord.lat),
          lon: parseFloat(station.coord.lon),
        },
        region: '', // Will be enriched from regional data
        departement: '',
        codes: {
          sncf: station.id,
          uic: station.codes?.find(c => c.type === 'uic')?.value,
        },
        sources: ['sncf'],
        hasRealtime: true,
        lastUpdated: new Date().toISOString(),
      };

      aggregatedStations.push(aggregated);
    }

    // Enrich with regional data
    const activeRegionalDatasets = regionalDatasets.filter(isDatasetActive);
    
    for (const station of aggregatedStations) {
      const relevantDatasets = activeRegionalDatasets.filter(dataset => 
        dataset.region && dataset.departement
      );

      if (relevantDatasets.length > 0) {
        const bestDataset = relevantDatasets.sort((a, b) => 
          getDatasetQualityScore(b) - getDatasetQualityScore(a)
        )[0];

        station.region = bestDataset.region.nom;
        station.departement = bestDataset.departement.nom;
        station.sources.push('regional');
      }
    }

    setCachedData(cacheKey, aggregatedStations, CACHE_DURATION.STATIONS);
    return aggregatedStations;
  } catch (error) {
    console.error('Error aggregating stations:', error);
    return [];
  }
}

export async function getAggregatedDepartures(stationId: string, limit = 20): Promise<AggregatedDeparture[]> {
  const cacheKey = getCacheKey('departures', stationId, limit.toString());
  const cached = getCachedData<AggregatedDeparture[]>(cacheKey);
  
  if (cached) return cached;

  try {
    const [sncfDepartures, regionalFeeds] = await Promise.all([
      getStationDepartures(stationId, limit),
      getRegionalFeeds(),
    ]);

    const aggregatedDepartures: AggregatedDeparture[] = [];

    // Process SNCF departures
    for (const departure of sncfDepartures) {
      const delay = getDelayMinutes(departure);
      const status = delay > 0 ? 'delayed' : 'on_time';

      const aggregated: AggregatedDeparture = {
        id: `sncf-${departure.route.id}-${departure.stop_date_time.departure_date_time}`,
        line: {
          id: departure.route.id,
          name: departure.display_informations.name,
          code: departure.display_informations.code,
          color: departure.display_informations.color,
          mode: departure.display_informations.physical_mode,
          commercialMode: departure.display_informations.commercial_mode,
        },
        direction: departure.display_informations.direction,
        destination: departure.display_informations.headsign,
        platform: '', // Not always available in SNCF API
        scheduledTime: departure.stop_date_time.base_departure_date_time,
        actualTime: departure.stop_date_time.departure_date_time,
        delay,
        status,
        source: 'sncf',
        disruptions: [],
        accessibility: {
          wheelchairAccessible: false, // Would need additional API call
          audioAnnouncements: false,
          visualAnnouncements: false,
        },
      };

      aggregatedDepartures.push(aggregated);
    }

    // Sort by departure time
    aggregatedDepartures.sort((a, b) => 
      new Date(a.actualTime).getTime() - new Date(b.actualTime).getTime()
    );

    setCachedData(cacheKey, aggregatedDepartures, CACHE_DURATION.DEPARTURES);
    return aggregatedDepartures;
  } catch (error) {
    console.error('Error aggregating departures:', error);
    return [];
  }
}

export async function getAggregatedDisruptions(limit = 50): Promise<AggregatedDisruption[]> {
  const cacheKey = getCacheKey('disruptions', limit.toString());
  const cached = getCachedData<AggregatedDisruption[]>(cacheKey);
  
  if (cached) return cached;

  try {
    const sncfDisruptions = await getDisruptions(limit);
    const aggregatedDisruptions: AggregatedDisruption[] = [];

    for (const disruption of sncfDisruptions) {
      const severity = getSeverityColor(disruption.severity.name);
      const isActive = disruption.application_periods.some(period => {
        const now = new Date();
        const start = new Date(period.begin);
        const end = new Date(period.end);
        return now >= start && now <= end;
      });

      const aggregated: AggregatedDisruption = {
        id: disruption.id,
        title: disruption.messages[0]?.text || 'Perturbation',
        description: disruption.messages.map(m => m.text).join(' '),
        severity: severity as any,
        status: isActive ? 'active' : 'ended',
        startDate: disruption.application_periods[0]?.begin || '',
        endDate: disruption.application_periods[0]?.end || '',
        affectedLines: disruption.impacted_objects
          .filter(obj => obj.pt_object.embedded_type === 'line')
          .map(obj => obj.pt_object.name),
        affectedStations: disruption.impacted_objects
          .filter(obj => obj.pt_object.embedded_type === 'stop_area')
          .map(obj => obj.pt_object.name),
        category: disruption.category,
        cause: disruption.cause,
        impact: {
          level: disruption.severity.priority,
          description: disruption.severity.effect,
        },
        alternatives: [],
        source: 'sncf',
        lastUpdated: disruption.updated_at,
      };

      aggregatedDisruptions.push(aggregated);
    }

    setCachedData(cacheKey, aggregatedDisruptions, CACHE_DURATION.DISRUPTIONS);
    return aggregatedDisruptions;
  } catch (error) {
    console.error('Error aggregating disruptions:', error);
    return [];
  }
}

export async function getCurrentStrikes(): Promise<StrikeInfo[]> {
  const cacheKey = getCacheKey('strikes');
  const cached = getCachedData<StrikeInfo[]>(cacheKey);
  
  if (cached) return cached;

  try {
    // In a real implementation, this would fetch from multiple sources
    // For now, we'll return mock strike data based on disruptions
    const disruptions = await getAggregatedDisruptions(10);
    const strikes: StrikeInfo[] = [];

    // Convert severe disruptions to potential strikes
    const severeDisruptions = disruptions.filter(d => 
      d.severity === 'high' && 
      d.status === 'active' &&
      (d.cause.includes('grève') || d.cause.includes('strike') || d.description.includes('grève'))
    );

    for (const disruption of severeDisruptions) {
      const strike: StrikeInfo = {
        id: `strike-${disruption.id}`,
        title: disruption.title,
        description: disruption.description,
        startDate: disruption.startDate,
        endDate: disruption.endDate,
        affectedServices: [...disruption.affectedLines, ...disruption.affectedStations],
        severity: 'high',
        expectedImpact: {
          nationalLines: 60,
          regionalLines: 40,
          localServices: 20,
        },
        organizer: 'SNCF',
        reason: disruption.cause,
        negotiations: {
          status: 'ongoing',
        },
        alternatives: ['Bus de substitution', 'Covoiturage', 'Transport alternatif'],
        source: 'sncf',
        lastUpdated: disruption.lastUpdated,
      };

      strikes.push(strike);
    }

    setCachedData(cacheKey, strikes, CACHE_DURATION.STRIKES);
    return strikes;
  } catch (error) {
    console.error('Error fetching strikes:', error);
    return [];
  }
}

export async function getLiveDashboardData(): Promise<LiveDashboardData> {
  const cacheKey = getCacheKey('dashboard');
  const cached = getCachedData<LiveDashboardData>(cacheKey);
  
  if (cached) return cached;

  try {
    const [strikes, disruptions] = await Promise.all([
      getCurrentStrikes(),
      getAggregatedDisruptions(20),
    ]);

    // Calculate major delays (mock data for now)
    const majorDelays = [
      { stationName: 'Gare du Nord', averageDelay: 15, affectedDepartures: 12 },
      { stationName: 'Gare de Lyon', averageDelay: 8, affectedDepartures: 6 },
      { stationName: 'Montparnasse', averageDelay: 5, affectedDepartures: 3 },
    ];

    // Calculate network status
    const activeDisruptions = disruptions.filter(d => d.status === 'active');
    const highSeverityDisruptions = activeDisruptions.filter(d => d.severity === 'high');
    
    let overallStatus: 'good' | 'disrupted' | 'severely_disrupted' = 'good';
    if (highSeverityDisruptions.length > 5) {
      overallStatus = 'severely_disrupted';
    } else if (activeDisruptions.length > 10) {
      overallStatus = 'disrupted';
    }

    const dashboardData: LiveDashboardData = {
      strikes,
      disruptions: activeDisruptions.slice(0, 10),
      majorDelays,
      networkStatus: {
        overall: overallStatus,
        regions: [
          { name: 'Île-de-France', status: 'disrupted', activeDisruptions: 5 },
          { name: 'Auvergne-Rhône-Alpes', status: 'good', activeDisruptions: 1 },
          { name: 'Hauts-de-France', status: 'good', activeDisruptions: 2 },
          { name: 'Nouvelle-Aquitaine', status: 'good', activeDisruptions: 0 },
        ],
      },
      lastUpdated: new Date().toISOString(),
    };

    setCachedData(cacheKey, dashboardData, CACHE_DURATION.DEPARTURES);
    return dashboardData;
  } catch (error) {
    console.error('Error generating dashboard data:', error);
    return {
      strikes: [],
      disruptions: [],
      majorDelays: [],
      networkStatus: {
        overall: 'good',
        regions: [],
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}

export function clearCache(pattern?: string): void {
  if (pattern) {
    const keys = Array.from(cache.keys()).filter(key => key.includes(pattern));
    keys.forEach(key => cache.delete(key));
  } else {
    cache.clear();
  }
}

export function getCacheStats(): { size: number; keys: string[] } {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}