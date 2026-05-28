import { useCallback, useEffect, useState } from 'react';
import type { Match, NewMatch } from '../types/match';
import { loadMatches, saveMatches } from '../lib/storage';

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>(() => loadMatches());

  useEffect(() => {
    saveMatches(matches);
  }, [matches]);

  const addMatch = useCallback((data: NewMatch): Match => {
    const match: Match = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setMatches((prev) => [match, ...prev]);
    return match;
  }, []);

  const updateMatch = useCallback((id: string, data: Partial<NewMatch>) => {
    setMatches((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
  }, []);

  const deleteMatch = useCallback((id: string) => {
    setMatches((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const replaceAll = useCallback((next: Match[]) => {
    setMatches(next);
  }, []);

  return { matches, addMatch, updateMatch, deleteMatch, replaceAll };
}
