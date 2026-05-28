export type Condition = 'local' | 'visitante' | 'neutral';

export type Tournament =
  | 'Liga'
  | 'Copa Argentina'
  | 'Sudamericana'
  | 'Libertadores'
  | 'Recopa'
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
  // Foto adjunta como data URL (JPEG comprimido)
  photo?: string;
  createdAt: string;
  // ID del fixture pre-cargado del que viene este partido (si fue marcado desde Fixtures)
  fixtureId?: string;
}

export type NewMatch = Omit<Match, 'id' | 'createdAt'>;
