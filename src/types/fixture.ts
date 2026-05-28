import type { Condition, Tournament } from './match';

export interface Fixture {
  id: string;
  date: string;
  opponent: string;
  condition: Condition;
  tournament: Tournament;
  stadium: string;
  // null si todavía no se jugó
  goalsFor: number | null;
  goalsAgainst: number | null;
  notes?: string;
}

export function isPlayed(f: Fixture): boolean {
  return f.goalsFor !== null && f.goalsAgainst !== null;
}
