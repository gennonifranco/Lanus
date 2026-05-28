import type { Match, MatchResult } from '../types/match';
import { CLASICOS } from './constants';

export function getResult(m: Match): MatchResult {
  if (m.goalsFor > m.goalsAgainst) return 'W';
  if (m.goalsFor < m.goalsAgainst) return 'L';
  return 'D';
}

export function isClasico(opponent: string): boolean {
  const o = opponent.trim().toLowerCase();
  return CLASICOS.some((c) => o.includes(c.toLowerCase()));
}

export function goalDiff(m: Match): number {
  return m.goalsFor - m.goalsAgainst;
}

export function sortByDateDesc(matches: Match[]): Match[] {
  return [...matches].sort((a, b) => b.date.localeCompare(a.date));
}

export function sortByDateAsc(matches: Match[]): Match[] {
  return [...matches].sort((a, b) => a.date.localeCompare(b.date));
}

export function formatDateAR(iso: string): string {
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

export function resultLabel(r: MatchResult): string {
  return r === 'W' ? 'Ganado' : r === 'L' ? 'Perdido' : 'Empatado';
}

export function resultColorClass(r: MatchResult): string {
  return r === 'W'
    ? 'bg-win/10 text-win border-win/30'
    : r === 'L'
    ? 'bg-loss/10 text-loss border-loss/30'
    : 'bg-draw/10 text-draw border-draw/30';
}

export function conditionLabel(c: Match['condition']): string {
  return c === 'local' ? 'Local' : c === 'visitante' ? 'Visitante' : 'Neutral';
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}
