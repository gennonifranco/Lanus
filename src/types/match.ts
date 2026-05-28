export type Condition = 'local' | 'visitante' | 'neutral';

export type Tournament =
  | 'Liga'
  | 'Copa Argentina'
  | 'Sudamericana'
  | 'Libertadores'
  | 'Amistoso'
  | 'Otro';

export type MatchResult = 'W' | 'D' | 'L';

export interface Match {
  id: string;
  date: string; // ISO yyyy-mm-dd
  opponent: string;
  condition: Condition;
  goalsFor: number;
  goalsAgainst: number;
  tournament: Tournament;
  stadium: string;
  notes?: string;
  createdAt: string;
}

export type NewMatch = Omit<Match, 'id' | 'createdAt'>;
