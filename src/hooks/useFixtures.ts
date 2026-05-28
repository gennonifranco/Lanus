import { useCallback, useEffect, useState } from 'react';
import type { Fixture } from '../types/fixture';
import { FIXTURES } from '../lib/fixtures';
import {
  applyOverrides,
  diffsForOverride,
  loadOverrides,
  saveOverrides,
  type FixtureOverrides,
} from '../lib/fixtureOverrides';

export function useFixtures() {
  const [overrides, setOverrides] = useState<FixtureOverrides>(() => loadOverrides());

  useEffect(() => {
    saveOverrides(overrides);
  }, [overrides]);

  const fixtures = applyOverrides(overrides);

  const updateFixture = useCallback((id: string, edited: Fixture) => {
    const original = FIXTURES.find((f) => f.id === id);
    if (!original) return;
    const diff = diffsForOverride(original, edited);
    setOverrides((prev) => {
      const next = { ...prev };
      if (diff) next[id] = diff;
      else delete next[id];
      return next;
    });
  }, []);

  const resetFixture = useCallback((id: string) => {
    setOverrides((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  return { fixtures, overrides, updateFixture, resetFixture };
}
