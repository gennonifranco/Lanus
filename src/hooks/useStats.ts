import { useMemo } from 'react';
import type { Match } from '../types/match';
import { getResult, goalDiff, isClasico, sortByDateAsc, sortByDateDesc } from '../lib/matchUtils';

export interface Stats {
  total: number;
  wins: number;
  draws: number;
  losses: number;
  winPct: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  avgGoalsPerMatch: number;
  currentStreak: { type: 'W' | 'D' | 'L' | 'unbeaten' | null; count: number; label: string };
  bestMatch: Match | null;
  worstMatch: Match | null;
  clasicosPlayed: number;
  clasicosWon: number;
  topOpponents: Array<{ opponent: string; count: number }>;
  topStadiums: Array<{ stadium: string; count: number }>;
  byYear: Array<{ year: string; W: number; D: number; L: number; total: number }>;
  firstMatchDate: string | null;
}

export function useStats(matches: Match[]): Stats {
  return useMemo(() => computeStats(matches), [matches]);
}

function computeStats(matches: Match[]): Stats {
  const total = matches.length;
  let wins = 0;
  let draws = 0;
  let losses = 0;
  let goalsFor = 0;
  let goalsAgainst = 0;
  let clasicosPlayed = 0;
  let clasicosWon = 0;

  const opponentCount = new Map<string, number>();
  const stadiumCount = new Map<string, number>();
  const yearMap = new Map<string, { W: number; D: number; L: number; total: number }>();

  for (const m of matches) {
    const r = getResult(m);
    if (r === 'W') wins++;
    else if (r === 'D') draws++;
    else losses++;
    goalsFor += m.goalsFor;
    goalsAgainst += m.goalsAgainst;
    if (isClasico(m.opponent)) {
      clasicosPlayed++;
      if (r === 'W') clasicosWon++;
    }
    opponentCount.set(m.opponent, (opponentCount.get(m.opponent) ?? 0) + 1);
    stadiumCount.set(m.stadium, (stadiumCount.get(m.stadium) ?? 0) + 1);
    const year = m.date.slice(0, 4);
    const y = yearMap.get(year) ?? { W: 0, D: 0, L: 0, total: 0 };
    y[r]++;
    y.total++;
    yearMap.set(year, y);
  }

  const sortedDesc = sortByDateDesc(matches);
  const sortedAsc = sortByDateAsc(matches);

  const currentStreak = computeStreak(sortedDesc);

  let bestMatch: Match | null = null;
  let worstMatch: Match | null = null;
  for (const m of matches) {
    const d = goalDiff(m);
    if (!bestMatch || d > goalDiff(bestMatch)) bestMatch = m;
    if (!worstMatch || d < goalDiff(worstMatch)) worstMatch = m;
  }

  const topOpponents = Array.from(opponentCount.entries())
    .map(([opponent, count]) => ({ opponent, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topStadiums = Array.from(stadiumCount.entries())
    .map(([stadium, count]) => ({ stadium, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const byYear = Array.from(yearMap.entries())
    .map(([year, v]) => ({ year, ...v }))
    .sort((a, b) => a.year.localeCompare(b.year));

  return {
    total,
    wins,
    draws,
    losses,
    winPct: total ? Math.round((wins / total) * 1000) / 10 : 0,
    goalsFor,
    goalsAgainst,
    goalDiff: goalsFor - goalsAgainst,
    avgGoalsPerMatch: total ? Math.round(((goalsFor + goalsAgainst) / total) * 10) / 10 : 0,
    currentStreak,
    bestMatch,
    worstMatch,
    clasicosPlayed,
    clasicosWon,
    topOpponents,
    topStadiums,
    byYear,
    firstMatchDate: sortedAsc[0]?.date ?? null,
  };
}

function computeStreak(sortedDesc: Match[]): Stats['currentStreak'] {
  if (sortedDesc.length === 0) return { type: null, count: 0, label: 'Sin partidos' };
  const first = sortedDesc[0]!;
  const firstR = getResult(first);

  // Mismo resultado consecutivo
  let sameCount = 0;
  for (const m of sortedDesc) {
    if (getResult(m) === firstR) sameCount++;
    else break;
  }

  // Si el último no fue derrota, calcular invicto
  if (firstR !== 'L') {
    let unbeaten = 0;
    for (const m of sortedDesc) {
      if (getResult(m) !== 'L') unbeaten++;
      else break;
    }
    if (sameCount >= 2 && firstR === 'W') {
      return { type: 'W', count: sameCount, label: `${sameCount} victorias seguidas` };
    }
    if (unbeaten >= 2) {
      return { type: 'unbeaten', count: unbeaten, label: `${unbeaten} sin perder` };
    }
    if (firstR === 'W') return { type: 'W', count: 1, label: '1 victoria' };
    return { type: 'D', count: 1, label: 'Último: empate' };
  }

  return { type: 'L', count: sameCount, label: sameCount === 1 ? 'Última: derrota' : `${sameCount} derrotas seguidas` };
}
