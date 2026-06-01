import { useCallback, useState } from 'react';
import type { Match } from '../types/match';
import { fetchLanusMatches } from '../lib/apiFootball';

interface SyncResult {
  added: number;
  updated: number;
}

export function useSync(matches: Match[], replaceAll: (next: Match[]) => void) {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(() => {
    const stored = localStorage.getItem('lanus-tracker:lastSync');
    return stored ? new Date(stored) : null;
  });

  const sync = useCallback(async (): Promise<SyncResult> => {
    setSyncing(true);
    try {
      const currentYear = new Date().getFullYear();
      // Traer temporada actual y anterior por si el año empezó
      const [current, prev] = await Promise.all([
        fetchLanusMatches(currentYear),
        fetchLanusMatches(currentYear - 1),
      ]);
      const fetched = [...prev, ...current];

      const existingIds = new Set(matches.map((m) => m.id));
      // Partidos que vienen de la API tienen id "api-XXXX"
      const existingApiIds = new Set(
        matches.filter((m) => m.id.startsWith('api-')).map((m) => m.id),
      );

      let added = 0;
      let updated = 0;
      const nextMatches = [...matches];

      for (const fetched_match of fetched) {
        if (existingApiIds.has(fetched_match.id)) {
          // Actualizar resultado si el partido ya existía
          const idx = nextMatches.findIndex((m) => m.id === fetched_match.id);
          const existing = idx !== -1 ? nextMatches[idx] : undefined;
          if (existing && (
            existing.goalsFor !== fetched_match.goalsFor ||
            existing.goalsAgainst !== fetched_match.goalsAgainst
          )) {
            nextMatches[idx] = { ...existing, ...fetched_match };
            updated++;
          }
        } else if (!existingIds.has(fetched_match.id)) {
          nextMatches.push(fetched_match);
          added++;
        }
      }

      // Ordenar por fecha descendente
      nextMatches.sort((a, b) => b.date.localeCompare(a.date));

      replaceAll(nextMatches);
      const now = new Date();
      setLastSync(now);
      localStorage.setItem('lanus-tracker:lastSync', now.toISOString());

      return { added, updated };
    } finally {
      setSyncing(false);
    }
  }, [matches, replaceAll]);

  return { sync, syncing, lastSync };
}
