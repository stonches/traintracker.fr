const TRANSPORT_GOUV_BASE_URL = 'https://transport.data.gouv.fr/api';

export interface TransportDataset {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  format: string;
  url: string;
  license: string;
  organization: {
    id: string;
    name: string;
    slug: string;
    logo: string;
  };
  aom: {
    id: string;
    name: string;
    siren: string;
    insee_commune_principale: string;
    departement: string;
    region: string;
    forme_juridique: string;
  };
  region: {
    id: string;
    nom: string;
  };
  departement: {
    id: string;
    nom: string;
    region: string;
  };
  commune: {
    id: string;
    nom: string;
    code_insee: string;
    departement: string;
    region: string;
  };
  validity_period: {
    start_date: string;
    end_date: string;
  };
  metadata: {
    start_date: string;
    end_date: string;
    networks: Array<{
      network_id: string;
      network_name: string;
      network_timezone: string;
    }>;
    modes: string[];
    feed_publisher_name: string;
    feed_publisher_url: string;
    feed_version: string;
  };
  resources: Array<{
    id: string;
    title: string;
    description: string;
    format: string;
    url: string;
    filesize: number;
    mime_type: string;
    last_modified: string;
    schema_name: string;
    schema_version: string;
  }>;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
  datagouv_id: string;
  datagouv_title: string;
  datagouv_organization_id: string;
  featured: boolean;
  quality: {
    score: number;
    max_score: number;
    issues: Array<{
      severity: string;
      issue_type: string;
      object_id: string;
      object_name: string;
      related_objects: string[];
    }>;
  };
  has_realtime: boolean;
  has_gtfs_rt: boolean;
  gtfs_rt_feeds: Array<{
    url: string;
    headers: Record<string, string>;
    type: string;
  }>;
}

export interface TransportOrganization {
  id: string;
  name: string;
  slug: string;
  short_name: string;
  logo: string;
  contact_email: string;
  contact_url: string;
  type: string;
  siren: string;
  legal_owners_siren: string[];
  legal_owners_raison_sociale: string[];
  aoms: Array<{
    id: string;
    name: string;
    siren: string;
    insee_commune_principale: string;
    departement: string;
    region: string;
  }>;
  datasets: Array<{
    id: string;
    title: string;
    slug: string;
    type: string;
    format: string;
    featured: boolean;
    has_realtime: boolean;
  }>;
  gtfs_rt_feeds: Array<{
    url: string;
    headers: Record<string, string>;
    type: string;
  }>;
}

export interface RegionalFeed {
  id: string;
  url: string;
  title: string;
  description: string;
  type: 'gtfs' | 'gtfs-rt' | 'netex' | 'siri';
  format: string;
  headers: Record<string, string>;
  region: string;
  departement: string;
  organization: string;
  license: string;
  updated_at: string;
  metadata: {
    networks: string[];
    modes: string[];
    validity_period: {
      start_date: string;
      end_date: string;
    };
  };
}

export interface AOMInfo {
  id: string;
  name: string;
  siren: string;
  insee_commune_principale: string;
  departement: string;
  region: string;
  forme_juridique: string;
  nom_departement: string;
  nom_region: string;
  population_muni_2014: number;
  population_totale_2014: number;
  surface: number;
  commentaire: string;
  contact_email: string;
  contact_url: string;
  datasets: Array<{
    id: string;
    title: string;
    type: string;
    format: string;
    has_realtime: boolean;
  }>;
}

class TransportGouvAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'TransportGouvAPIError';
  }
}

async function transportGouvRequest<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${TRANSPORT_GOUV_BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new TransportGouvAPIError(
      `Transport.data.gouv.fr API Error: ${response.status} ${response.statusText}`,
      response.status,
      errorData
    );
  }

  return response.json();
}

export async function getRegionalDatasets(region?: string, departement?: string): Promise<TransportDataset[]> {
  try {
    const params: Record<string, string> = {
      limit: '100',
      type: 'public-transit',
    };

    if (region) {
      params.region = region;
    }
    if (departement) {
      params.departement = departement;
    }

    const response = await transportGouvRequest<TransportDataset[]>('/datasets', params);
    return response || [];
  } catch (error) {
    console.error('Error fetching regional datasets:', error);
    return [];
  }
}

export async function getDatasetDetails(datasetId: string): Promise<TransportDataset | null> {
  try {
    const response = await transportGouvRequest<TransportDataset>(`/datasets/${datasetId}`);
    return response;
  } catch (error) {
    console.error('Error fetching dataset details:', error);
    return null;
  }
}

export async function getTransportOrganizations(): Promise<TransportOrganization[]> {
  try {
    const response = await transportGouvRequest<TransportOrganization[]>('/organizations', {
      limit: '100',
    });
    return response || [];
  } catch (error) {
    console.error('Error fetching transport organizations:', error);
    return [];
  }
}

export async function getOrganizationDetails(organizationId: string): Promise<TransportOrganization | null> {
  try {
    const response = await transportGouvRequest<TransportOrganization>(`/organizations/${organizationId}`);
    return response;
  } catch (error) {
    console.error('Error fetching organization details:', error);
    return null;
  }
}

export async function getAOMInfo(aomId?: string): Promise<AOMInfo[]> {
  try {
    const params: Record<string, string> = {
      limit: '100',
    };

    if (aomId) {
      params.id = aomId;
    }

    const response = await transportGouvRequest<AOMInfo[]>('/aoms', params);
    return response || [];
  } catch (error) {
    console.error('Error fetching AOM info:', error);
    return [];
  }
}

export async function getRegionalFeeds(region?: string): Promise<RegionalFeed[]> {
  try {
    const datasets = await getRegionalDatasets(region);
    const feeds: RegionalFeed[] = [];

    for (const dataset of datasets.filter(d => d.has_realtime || d.has_gtfs_rt)) {
      // Convert dataset to regional feed format
      const feed: RegionalFeed = {
        id: dataset.id,
        url: dataset.url,
        title: dataset.title,
        description: dataset.description,
        type: dataset.has_gtfs_rt ? 'gtfs-rt' : 'gtfs',
        format: dataset.format,
        headers: {},
        region: dataset.region?.nom || '',
        departement: dataset.departement?.nom || '',
        organization: dataset.organization?.name || '',
        license: dataset.license,
        updated_at: dataset.updated_at,
        metadata: {
          networks: dataset.metadata?.networks?.map(n => n.network_name) || [],
          modes: dataset.metadata?.modes || [],
          validity_period: {
            start_date: dataset.metadata?.start_date || '',
            end_date: dataset.metadata?.end_date || '',
          },
        },
      };

      if (dataset.gtfs_rt_feeds) {
        dataset.gtfs_rt_feeds.forEach(gtfsRt => {
          feeds.push({
            ...feed,
            id: `${dataset.id}-${gtfsRt.type}`,
            url: gtfsRt.url,
            type: 'gtfs-rt',
            headers: gtfsRt.headers,
          });
        });
      } else {
        feeds.push(feed);
      }
    }

    return feeds;
  } catch (error) {
    console.error('Error fetching regional feeds:', error);
    return [];
  }
}

export async function searchDatasets(query: string, limit = 20): Promise<TransportDataset[]> {
  try {
    const response = await transportGouvRequest<TransportDataset[]>('/datasets', {
      q: query,
      limit: limit.toString(),
      type: 'public-transit',
    });
    return response || [];
  } catch (error) {
    console.error('Error searching datasets:', error);
    return [];
  }
}

export function getDatasetQualityScore(dataset: TransportDataset): number {
  return dataset.quality?.score || 0;
}

export function getDatasetQualityLevel(dataset: TransportDataset): 'excellent' | 'good' | 'fair' | 'poor' {
  const score = getDatasetQualityScore(dataset);
  const maxScore = dataset.quality?.max_score || 100;
  const percentage = (score / maxScore) * 100;

  if (percentage >= 90) return 'excellent';
  if (percentage >= 70) return 'good';
  if (percentage >= 50) return 'fair';
  return 'poor';
}

export function isDatasetActive(dataset: TransportDataset): boolean {
  if (dataset.archived_at) return false;
  
  const now = new Date();
  const endDate = new Date(dataset.validity_period?.end_date);
  
  return endDate > now;
}

export function getRegionName(regionId: string): string {
  const regions: Record<string, string> = {
    'auvergne-rhone-alpes': 'Auvergne-Rhône-Alpes',
    'bourgogne-franche-comte': 'Bourgogne-Franche-Comté',
    'bretagne': 'Bretagne',
    'centre-val-de-loire': 'Centre-Val de Loire',
    'corse': 'Corse',
    'grand-est': 'Grand Est',
    'guadeloupe': 'Guadeloupe',
    'guyane': 'Guyane',
    'hauts-de-france': 'Hauts-de-France',
    'ile-de-france': 'Île-de-France',
    'la-reunion': 'La Réunion',
    'martinique': 'Martinique',
    'mayotte': 'Mayotte',
    'normandie': 'Normandie',
    'nouvelle-aquitaine': 'Nouvelle-Aquitaine',
    'occitanie': 'Occitanie',
    'pays-de-la-loire': 'Pays de la Loire',
    'provence-alpes-cote-dazur': 'Provence-Alpes-Côte d\'Azur',
  };

  return regions[regionId] || regionId;
}

export { TransportGouvAPIError };