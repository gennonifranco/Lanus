// Vercel Serverless Function — proxy para API-Football (RapidAPI)
const TEAM_ID = 435; // Lanús
const API_HOST = 'v3.football.api-sports.io';

export default async function handler(req, res) {
  const apiKey = process.env.API_FOOTBALL_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key no configurada' });
  }

  const season = req.query.season ?? new Date().getFullYear().toString();
  const apiUrl = `https://${API_HOST}/fixtures?team=${TEAM_ID}&season=${season}&timezone=America%2FArgentina%2FBuenos_Aires`;

  const response = await fetch(apiUrl, {
    headers: {
      'x-apisports-key': apiKey,
    },
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: `API error: ${response.status}` });
  }

  const text = await response.text();
  console.log('API status:', response.status, 'body:', text.slice(0, 300));
  const data = JSON.parse(text);
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json(data);
}
