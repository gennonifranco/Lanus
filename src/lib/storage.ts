import type { Match } from '../types/match';
import { STORAGE_KEY } from './constants';

export function loadMatches(): Match[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Match[];
  } catch {
    return [];
  }
}

export function saveMatches(matches: Match[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
}

export function exportJSON(matches: Match[]): string {
  return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), matches }, null, 2);
}

export function importJSON(text: string): Match[] {
  const data = JSON.parse(text);
  const list: unknown = Array.isArray(data) ? data : data?.matches;
  if (!Array.isArray(list)) throw new Error('Formato inválido');
  return list.map((m) => {
    const item = m as Partial<Match>;
    if (!item.id || !item.date || !item.opponent) {
      throw new Error('Partido inválido en el archivo');
    }
    return item as Match;
  });
}
