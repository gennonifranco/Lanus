import { useMemo } from 'react';
import type { Match } from '../types/match';

export function useAttendance(matches: Match[]) {
  return useMemo(() => {
    const set = new Set<string>();
    for (const m of matches) {
      if (m.fixtureId) set.add(m.fixtureId);
    }
    return set;
  }, [matches]);
}
