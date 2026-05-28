import { useMemo, useState } from 'react';
import type { Condition, Match, Tournament } from '../types/match';
import { getResult, sortByDateDesc } from '../lib/matchUtils';

export type ResultFilter = 'all' | 'W' | 'D' | 'L';

export interface Filters {
  result: ResultFilter;
  opponent: string;
  condition: Condition | 'all';
  tournament: Tournament | 'all';
  year: string;
  query: string;
}

const initial: Filters = {
  result: 'all',
  opponent: 'all',
  condition: 'all',
  tournament: 'all',
  year: 'all',
  query: '',
};

export function useFilters(matches: Match[]) {
  const [filters, setFilters] = useState<Filters>(initial);

  const opponents = useMemo(
    () => Array.from(new Set(matches.map((m) => m.opponent))).sort((a, b) => a.localeCompare(b)),
    [matches],
  );

  const years = useMemo(
    () =>
      Array.from(new Set(matches.map((m) => m.date.slice(0, 4))))
        .sort()
        .reverse(),
    [matches],
  );

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const list = matches.filter((m) => {
      if (filters.result !== 'all' && getResult(m) !== filters.result) return false;
      if (filters.opponent !== 'all' && m.opponent !== filters.opponent) return false;
      if (filters.condition !== 'all' && m.condition !== filters.condition) return false;
      if (filters.tournament !== 'all' && m.tournament !== filters.tournament) return false;
      if (filters.year !== 'all' && m.date.slice(0, 4) !== filters.year) return false;
      if (q) {
        const blob = `${m.opponent} ${m.stadium} ${m.tournament} ${m.notes ?? ''}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
    return sortByDateDesc(list);
  }, [matches, filters]);

  const reset = () => setFilters(initial);
  const isActive =
    filters.result !== 'all' ||
    filters.opponent !== 'all' ||
    filters.condition !== 'all' ||
    filters.tournament !== 'all' ||
    filters.year !== 'all' ||
    filters.query !== '';

  return { filters, setFilters, filtered, opponents, years, reset, isActive };
}
