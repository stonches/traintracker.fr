export interface Station {
  id: string;
  nom: string;
  slug: string;
  coordonnees: {
    latitude: number;
    longitude: number;
  };
  region?: string;
  code_uic?: string;
  code_insee?: string;
}

export interface Train {
  id: string;
  numero: string;
  nom: string;
  type: 'TGV' | 'TER' | 'Intercités' | 'Eurostar' | 'Thalys' | 'Transilien';
  direction: string;
  destination: string;
  heureDepart: string;
  retard: number;
  voie?: string;
  statut: 'a_heure' | 'retard' | 'supprime' | 'retard_indetermine';
  arrets?: string[];
}

export interface DepartureBoard {
  gare: Station;
  prochainsDepartures: Train[];
  derniereMiseAJour: string;
}

export interface JourneySegment {
  type: 'transport' | 'transfer' | 'waiting';
  from: Station;
  to: Station;
  departure_time: string;
  arrival_time: string;
  duration: number;
  train?: Train;
  instructions?: string;
}

export interface Journey {
  sections: JourneySegment[];
  duration: number;
  total_duration: number;
  departure_time: string;
  arrival_time: string;
  nb_transfers: number;
  co2_emission?: number;
}

class SNCFAPIClient {
  private apiKey: string;
  private baseURL: string;

  constructor() {
    this.apiKey = process.env.SNCF_API_KEY || process.env.NEXT_PUBLIC_SNCF_API_KEY || '90a4c9a1-87e5-4b16-bbe4-45abed49b951';
    this.baseURL = process.env.SNCF_API_BASE_URL || process.env.NEXT_PUBLIC_SNCF_API_BASE_URL || 'https://api.sncf.com/v1/coverage/sncf';
  }

  private async makeRequest(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${this.apiKey}:`).toString('base64')}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur API SNCF: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async obtenirToutesLesGares(): Promise<Station[]> {
    try {
      const response = await this.makeRequest('/places', {
        'type[]': 'stop_area',
        'count': '10000',
        'disable_geojson': 'true',
        'disable_disruption': 'true',
      });

      return response.places?.map((place: any) => ({
        id: place.id,
        nom: place.name,
        slug: this.genererSlug(place.name),
        coordonnees: {
          latitude: parseFloat(place.coord.lat),
          longitude: parseFloat(place.coord.lon),
        },
        region: place.administrative_regions?.[0]?.name,
        code_uic: place.codes?.find((c: any) => c.type === 'uic')?.value,
        code_insee: place.codes?.find((c: any) => c.type === 'insee')?.value,
      })) || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des gares:', error);
      return [];
    }
  }

  async obtenirDepartsEnTempsReel(stationId: string): Promise<DepartureBoard | null> {
    try {
      const response = await this.makeRequest(`/stop_areas/${stationId}/departures`, {
        'count': '20',
        'disable_geojson': 'true',
        'data_freshness': 'realtime',
      });

      const station = response.stop_areas?.[0];
      if (!station) return null;

      const departures = response.departures?.map((departure: any) => ({
        id: departure.route.id,
        numero: departure.route.name,
        nom: departure.route.name,
        type: this.determinerTypeDeService(departure.route.name),
        direction: departure.route.direction,
        destination: departure.stop_point.name,
        heureDepart: departure.departure_time,
        retard: departure.delay || 0,
        voie: departure.stop_point.platform,
        statut: this.determinerStatut(departure),
        arrets: departure.route.stop_points?.map((sp: any) => sp.name) || [],
      })) || [];

      return {
        gare: {
          id: station.id,
          nom: station.name,
          slug: this.genererSlug(station.name),
          coordonnees: {
            latitude: parseFloat(station.coord.lat),
            longitude: parseFloat(station.coord.lon),
          },
          region: station.administrative_regions?.[0]?.name,
        },
        prochainsDepartures: departures,
        derniereMiseAJour: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des départs:', error);
      return null;
    }
  }

  async obtenirProchainTrain(stationId: string): Promise<Train | null> {
    const departures = await this.obtenirDepartsEnTempsReel(stationId);
    return departures?.prochainsDepartures[0] || null;
  }

  async planifierItineraire(
    origin: string,
    destination: string,
    dateTime?: string
  ): Promise<Journey[]> {
    try {
      const params: Record<string, string> = {
        from: origin,
        to: destination,
        count: '5',
        'data_freshness': 'realtime',
      };

      if (dateTime) {
        params.datetime = dateTime;
      }

      const response = await this.makeRequest('/journeys', params);

      return response.journeys?.map((journey: any) => ({
        sections: journey.sections.map((section: any) => ({
          type: section.type,
          from: this.transformerLieu(section.from),
          to: this.transformerLieu(section.to),
          departure_time: section.departure_time,
          arrival_time: section.arrival_time,
          duration: section.duration,
          train: section.display_informations ? {
            id: section.display_informations.network + '_' + section.display_informations.code,
            numero: section.display_informations.code,
            nom: section.display_informations.name,
            type: this.determinerTypeDeService(section.display_informations.name),
            direction: section.display_informations.direction,
            destination: section.display_informations.direction,
            heureDepart: section.departure_time,
            retard: 0,
            statut: 'a_heure' as const,
          } : undefined,
          instructions: section.instructions,
        })),
        duration: journey.duration,
        total_duration: journey.total_duration,
        departure_time: journey.departure_time,
        arrival_time: journey.arrival_time,
        nb_transfers: journey.nb_transfers,
        co2_emission: journey.co2_emission?.value,
      })) || [];
    } catch (error) {
      console.error('Erreur lors de la planification d\'itinéraire:', error);
      return [];
    }
  }

  private genererSlug(nom: string): string {
    return nom
      .toLowerCase()
      .replace(/[àáâäã]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôöõ]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[ñ]/g, 'n')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private determinerTypeDeService(nom: string): Train['type'] {
    const nomUpper = nom.toUpperCase();
    
    if (nomUpper.includes('TGV')) return 'TGV';
    if (nomUpper.includes('EUROSTAR')) return 'Eurostar';
    if (nomUpper.includes('THALYS')) return 'Thalys';
    if (nomUpper.includes('INTERCITÉS') || nomUpper.includes('INTERCITES')) return 'Intercités';
    if (nomUpper.includes('TRANSILIEN')) return 'Transilien';
    
    return 'TER';
  }

  private determinerStatut(departure: any): Train['statut'] {
    if (departure.disruptions?.length > 0) {
      const disruption = departure.disruptions[0];
      if (disruption.cause === 'strike') return 'supprime';
      if (disruption.severity.effect === 'NO_SERVICE') return 'supprime';
      if (disruption.severity.effect === 'SIGNIFICANT_DELAYS') return 'retard_indetermine';
    }
    
    if (departure.delay > 0) return 'retard';
    
    return 'a_heure';
  }

  private transformerLieu(lieu: any): Station {
    return {
      id: lieu.id,
      nom: lieu.name,
      slug: this.genererSlug(lieu.name),
      coordonnees: {
        latitude: parseFloat(lieu.coord.lat),
        longitude: parseFloat(lieu.coord.lon),
      },
      region: lieu.administrative_regions?.[0]?.name,
    };
  }
}

export const sncfAPI = new SNCFAPIClient();