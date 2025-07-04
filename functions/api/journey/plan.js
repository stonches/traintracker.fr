import { sncfAPI } from '../../../src/lib/api/sncf';

export async function onRequest(context) {
  const { request, env } = context;
  
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'GET') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  const url = new URL(request.url);
  const origin = url.searchParams.get('from');
  const destination = url.searchParams.get('to');
  const dateTime = url.searchParams.get('datetime');
  
  if (!origin || !destination) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Paramètres manquants: from et to sont requis'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }

  try {
    const journeys = await sncfAPI.planifierItineraire(origin, destination, dateTime);
    
    // Cache the response for 2 minutes (journey planning data)
    const response = new Response(JSON.stringify({
      success: true,
      data: {
        journeys,
        origin,
        destination,
        dateTime: dateTime || 'now'
      },
      timestamp: new Date().toISOString()
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=120',
        ...corsHeaders
      }
    });

    return response;
  } catch (error) {
    console.error('Erreur lors de la planification d\'itinéraire:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Erreur lors de la planification d\'itinéraire',
      message: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}