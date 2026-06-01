import type { Match } from '../types/match';
import type { Tournament } from '../types/match';
import { LA_FORTALEZA } from './constants';

const TEAM_ID = 435; // Lanús en API-Football

// Mapeo de nombres de ligas a los torneos de la app
function mapTournament(leagueName: string): Tournament {
  const name = leagueName.toLowerCase();
  if (name.includes('copa de la liga') || name.includes('liga profesional') || name.includes('torneo')) return 'Liga';
  if (name.includes('copa argentina')) return 'Copa Argentina';
  if (name.includes('sudamericana')) return 'Sudamericana';
  if (name.includes('libertadores')) return 'Libertadores';
  if (name.includes('recopa')) return 'Recopa';
  if (name.includes('amistoso') || name.includes('friendly')) return 'Amistoso';
  return 'Otro';
}

// Convierte el nombre de equipo de la API al nombre que usamos en la app
function mapOpponent(teamName: string): string {
  const map: Record<string, string> = {
    'Lanus': 'Lanús',
    'Boca Juniors': 'Boca Juniors',
    'River Plate': 'River Plate',
    'Racing Club': 'Racing Club',
    'Independiente': 'Independiente',
    'San Lorenzo': 'San Lorenzo',
    "Newell's Old Boys": "Newell's Old Boys",
    'Estudiantes LP': 'Estudiantes',
    'Estudiantes': 'Estudiantes',
    'Velez Sarsfield': 'Vélez Sarsfield',
    'Huracan': 'Huracán',
    'Argentinos Juniors': 'Argentinos Juniors',
    'Atletico Tucuman': 'Atlético Tucumán',
    'Talleres': 'Talleres',
    'Belgrano': 'Belgrano',
    'Colon': 'Colón',
    'Union': 'Unión',
    'Tigre': 'Tigre',
    'Platense': 'Platense',
    'Sarmiento': 'Sarmiento',
    'Godoy Cruz': 'Godoy Cruz',
    'Central Cordoba': 'Central Córdoba (SdE)',
    'Instituto': 'Instituto',
    'Defensa Y Justicia': 'Defensa y Justicia',
    'Gimnasia LP': 'Gimnasia (LP)',
    'Rosario Central': 'Rosario Central',
    'Aldosivi': 'Aldosivi',
    'Arsenal Sarandi': 'Arsenal',
    'Quilmes': 'Quilmes',
    'Banfield': 'Banfield',
  };
  return map[teamName] ?? teamName;
}

interface ApiFixture {
  fixture: {
    id: number;
    date: string;
    status: { short: string };
    venue: { name: string | null; city: string | null };
  };
  league: { name: string };
  teams: {
    home: { id: number; name: string };
    away: { id: number; name: string };
  };
  goals: { home: number | null; away: number | null };
}

export function mapApiFixtureToMatch(f: ApiFixture): Match | null {
  const status = f.fixture.status.short;
  // Solo partidos finalizados
  if (!['FT', 'AET', 'PEN'].includes(status)) return null;

  const isHome = f.teams.home.id === TEAM_ID;
  const opponentTeam = isHome ? f.teams.away : f.teams.home;
  const goalsFor = isHome ? f.goals.home : f.goals.away;
  const goalsAgainst = isHome ? f.goals.away : f.goals.home;

  if (goalsFor === null || goalsAgainst === null) return null;

  const dateStr = f.fixture.date.slice(0, 10); // yyyy-mm-dd

  const opponent = mapOpponent(opponentTeam.name);
  const condition = isHome ? 'local' : 'visitante';
  const tournament = mapTournament(f.league.name);
  const stadium =
    isHome
      ? LA_FORTALEZA
      : (f.fixture.venue.name ?? 'Desconocido');

  return {
    id: `api-${f.fixture.id}`,
    date: dateStr,
    opponent,
    condition,
    goalsFor,
    goalsAgainst,
    tournament,
    stadium,
    createdAt: new Date().toISOString(),
  };
}

export async function fetchLanusMatches(season: number): Promise<Match[]> {
  const res = await fetch(`/.netlify/functions/api-football?season=${season}`);
  if (!res.ok) throw new Error(`Error al consultar la API: ${res.status}`);
  const data = await res.json();
  if (!data.response) throw new Error('Respuesta inesperada de la API');

  const matches: Match[] = [];
  for (const fixture of data.response as ApiFixture[]) {
    const match = mapApiFixtureToMatch(fixture);
    if (match) matches.push(match);
  }
  return matches;
}
