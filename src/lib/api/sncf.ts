const SNCF_API_KEY = process.env.SNCF_API_KEY || '90a4c9a1-87e5-4b16-bbe4-45abed49b951';
const SNCF_BASE_URL = 'https://api.sncf.com/v1/coverage/sncf';

export interface SNCFDeparture {
  display_informations: {
    code: string;
    color: string;
    commercial_mode: string;
    direction: string;
    headsign: string;
    label: string;
    name: string;
    network: string;
    physical_mode: string;
  };
  stop_date_time: {
    arrival_date_time: string;
    departure_date_time: string;
    base_arrival_date_time: string;
    base_departure_date_time: string;
  };
  stop_point: {
    id: string;
    name: string;
    coord: {
      lat: string;
      lon: string;
    };
  };
  route: {
    id: string;
    name: string;
    direction: {
      id: string;
      name: string;
    };
  };
  journey_pattern: {
    id: string;
    name: string;
  };
}

export interface SNCFStation {
  id: string;
  name: string;
  coord: {
    lat: string;
    lon: string;
  };
  label: string;
  timezone: string;
  codes: Array<{
    type: string;
    value: string;
  }>;
  links: Array<{
    id: string;
    rel: string;
    href: string;
    type: string;
  }>;
}

export interface SNCFDisruption {
  id: string;
  status: string;
  severity: {
    name: string;
    color: string;
    priority: number;
    effect: string;
  };
  application_periods: Array<{
    begin: string;
    end: string;
  }>;
  messages: Array<{
    text: string;
    channel: {
      id: string;
      name: string;
      content_type: string;
      types: string[];
    };
  }>;
  impacted_objects: Array<{
    pt_object: {
      id: string;
      name: string;
      quality: number;
      embedded_type: string;
      stop_area?: SNCFStation;
      line?: {
        id: string;
        name: string;
        code: string;
        color: string;
        commercial_mode: {
          id: string;
          name: string;
        };
      };
    };
  }>;
  tags: string[];
  category: string;
  cause: string;
  updated_at: string;
  uri: string;
}

export interface SNCFJourney {
  duration: number;
  nb_transfers: number;
  departure_date_time: string;
  arrival_date_time: string;
  requested_date_time: string;
  type: string;
  status: string;
  co2_emission: {
    value: number;
    unit: string;
  };
  fare: {
    total: {
      value: string;
      currency: string;
    };
    found: boolean;
    links: Array<{
      type: string;
      value: string;
    }>;
  };
  sections: Array<{
    type: string;
    id: string;
    mode: string;
    duration: number;
    from: SNCFStation;
    to: SNCFStation;
    departure_date_time: string;
    arrival_date_time: string;
    display_informations?: {
      direction: string;
      code: string;
      name: string;
      color: string;
      commercial_mode: string;
      physical_mode: string;
      headsign: string;
      label: string;
    };
    stop_date_times?: Array<{
      stop_point: SNCFStation;
      departure_date_time: string;
      arrival_date_time: string;
    }>;
  }>;
  tags: string[];
  links: Array<{
    href: string;
    rel: string;
    type: string;
  }>;
}

class SNCFAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'SNCFAPIError';
  }
}

async function sncfRequest<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${SNCF_BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${SNCF_API_KEY}:`).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new SNCFAPIError(
      `SNCF API Error: ${response.status} ${response.statusText}`,
      response.status,
      errorData
    );
  }

  return response.json();
}

export async function getStationDepartures(stationId: string, limit = 20): Promise<SNCFDeparture[]> {
  try {
    const response = await sncfRequest<{ departures: SNCFDeparture[] }>(
      `/stop_areas/${stationId}/departures`,
      {
        count: limit.toString(),
        datetime: 'now',
      }
    );
    return response.departures || [];
  } catch (error) {
    console.error('Error fetching station departures:', error);
    return [];
  }
}

export async function getStationArrivals(stationId: string, limit = 20): Promise<SNCFDeparture[]> {
  try {
    const response = await sncfRequest<{ arrivals: SNCFDeparture[] }>(
      `/stop_areas/${stationId}/arrivals`,
      {
        count: limit.toString(),
        datetime: 'now',
      }
    );
    return response.arrivals || [];
  } catch (error) {
    console.error('Error fetching station arrivals:', error);
    return [];
  }
}

export async function searchStations(query: string, limit = 10): Promise<SNCFStation[]> {
  try {
    const response = await sncfRequest<{ places: SNCFStation[] }>(
      '/places',
      {
        q: query,
        count: limit.toString(),
        type: 'stop_area',
      }
    );
    return response.places || [];
  } catch (error) {
    console.error('Error searching stations:', error);
    return [];
  }
}

export async function getStationDetails(stationId: string): Promise<SNCFStation | null> {
  try {
    const response = await sncfRequest<{ stop_areas: SNCFStation[] }>(
      `/stop_areas/${stationId}`
    );
    return response.stop_areas?.[0] || null;
  } catch (error) {
    console.error('Error fetching station details:', error);
    return null;
  }
}

export async function getDisruptions(limit = 50): Promise<SNCFDisruption[]> {
  try {
    const response = await sncfRequest<{ disruptions: SNCFDisruption[] }>(
      '/disruptions',
      {
        count: limit.toString(),
        since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      }
    );
    return response.disruptions || [];
  } catch (error) {
    console.error('Error fetching disruptions:', error);
    return [];
  }
}

export async function getJourneys(
  from: string,
  to: string,
  datetime?: string,
  dateTimeRepresents: 'departure' | 'arrival' = 'departure'
): Promise<SNCFJourney[]> {
  try {
    const response = await sncfRequest<{ journeys: SNCFJourney[] }>(
      '/journeys',
      {
        from,
        to,
        datetime: datetime || 'now',
        datetime_represents: dateTimeRepresents,
        count: '5',
      }
    );
    return response.journeys || [];
  } catch (error) {
    console.error('Error fetching journeys:', error);
    return [];
  }
}

export async function getLineDisruptions(lineId: string): Promise<SNCFDisruption[]> {
  try {
    const response = await sncfRequest<{ disruptions: SNCFDisruption[] }>(
      `/lines/${lineId}/disruptions`
    );
    return response.disruptions || [];
  } catch (error) {
    console.error('Error fetching line disruptions:', error);
    return [];
  }
}

export function isDelayed(departure: SNCFDeparture): boolean {
  const scheduledTime = new Date(departure.stop_date_time.base_departure_date_time);
  const actualTime = new Date(departure.stop_date_time.departure_date_time);
  return actualTime.getTime() > scheduledTime.getTime();
}

export function getDelayMinutes(departure: SNCFDeparture): number {
  const scheduledTime = new Date(departure.stop_date_time.base_departure_date_time);
  const actualTime = new Date(departure.stop_date_time.departure_date_time);
  return Math.floor((actualTime.getTime() - scheduledTime.getTime()) / (1000 * 60));
}

export function formatDepartureTime(departure: SNCFDeparture): string {
  const time = new Date(departure.stop_date_time.departure_date_time);
  return time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'blocking':
    case 'significative':
      return 'danger';
    case 'normal':
      return 'warning';
    case 'information':
      return 'info';
    default:
      return 'gray';
  }
}

export { SNCFAPIError };