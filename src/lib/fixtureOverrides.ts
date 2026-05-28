import type { Fixture } from '../types/fixture';
import { FIXTURES } from './fixtures';

const KEY = 'lanus-tracker:fixture-overrides:v1';

// Solo se guardan los campos editables (no el id ni el date).
export type FixtureOverride = Partial<
  Pick<Fixture, 'opponent' | 'condition' | 'goalsFor' | 'goalsAgainst' | 'tournament' | 'stadium' | 'notes'>
>;

export type FixtureOverrides = Record<string, FixtureOverride>;

export function loadOverrides(): FixtureOverrides {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as FixtureOverrides) : {};
  } catch {
    return {};
  }
}

export function saveOverrides(overrides: FixtureOverrides): void {
  localStorage.setItem(KEY, JSON.stringify(overrides));
}

export function applyOverrides(overrides: FixtureOverrides): Fixture[] {
  return FIXTURES.map((f) => {
    const o = overrides[f.id];
    return o ? { ...f, ...o } : f;
  });
}

export function diffsForOverride(original: Fixture, edited: Fixture): FixtureOverride | null {
  const o: FixtureOverride = {};
  let changed = false;
  if (edited.opponent !== original.opponent) { o.opponent = edited.opponent; changed = true; }
  if (edited.condition !== original.condition) { o.condition = edited.condition; changed = true; }
  if (edited.goalsFor !== original.goalsFor) { o.goalsFor = edited.goalsFor; changed = true; }
  if (edited.goalsAgainst !== original.goalsAgainst) { o.goalsAgainst = edited.goalsAgainst; changed = true; }
  if (edited.tournament !== original.tournament) { o.tournament = edited.tournament; changed = true; }
  if (edited.stadium !== original.stadium) { o.stadium = edited.stadium; changed = true; }
  if (edited.notes !== original.notes) { o.notes = edited.notes; changed = true; }
  return changed ? o : null;
}
