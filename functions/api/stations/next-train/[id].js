import { sncfAPI } from '../../../../src/lib/api/sncf';

export async function onRequest(context) {
  const { request, env, params } = context;
  
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

  const stationId = params.id;
  
  if (!stationId) {
    return new Response(JSON.stringify({
      success: false,
      error: 'ID de gare manquant'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }

  try {
    const nextTrain = await sncfAPI.obtenirProchainTrain(stationId);
    
    if (!nextTrain) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Aucun prochain train trouvé'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Calculate time to next train
    const now = new Date();
    const departureTime = new Date(nextTrain.heureDepart);
    const timeToTrain = Math.max(0, departureTime.getTime() - now.getTime());
    const minutesToTrain = Math.floor(timeToTrain / 60000);

    // Cache the response for 30 seconds (real-time data)
    const response = new Response(JSON.stringify({
      success: true,
      data: {
        ...nextTrain,
        tempsRestant: {
          millisecondes: timeToTrain,
          minutes: minutesToTrain,
          formatte: minutesToTrain > 0 ? `${minutesToTrain} min` : 'À quai'
        }
      },
      timestamp: new Date().toISOString()
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30',
        ...corsHeaders
      }
    });

    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération du prochain train:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Erreur lors de la récupération du prochain train',
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