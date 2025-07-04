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

  try {
    const stations = await sncfAPI.obtenirToutesLesGares();
    
    // Cache the response for 1 hour
    const response = new Response(JSON.stringify({
      success: true,
      data: stations,
      total: stations.length,
      timestamp: new Date().toISOString()
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        ...corsHeaders
      }
    });

    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des gares:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Erreur lors de la récupération des gares',
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