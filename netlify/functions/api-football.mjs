// Proxy para API-Football (rapidapi.com)
// La API key vive acá en el servidor, nunca expuesta al browser.
// Team ID de Lanús en API-Football: 435

const TEAM_ID = 435;
const API_HOST = 'v3.football.api-sports.io';

export default async function handler(req) {
  const apiKey = process.env.API_FOOTBALL_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key no configurada' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(req.url);
  const season = url.searchParams.get('season') ?? new Date().getFullYear().toString();

  const apiUrl = `https://${API_HOST}/fixtures?team=${TEAM_ID}&season=${season}&timezone=America%2FArgentina%2FBuenos_Aires`;

  const response = await fetch(apiUrl, {
    headers: {
      'x-apisports-key': apiKey,
    },
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: `API error: ${response.status}` }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
