import { createContext, useContext, type ReactNode } from 'react';
import { useMatches } from '../hooks/useMatches';

type Ctx = ReturnType<typeof useMatches>;

const MatchesCtx = createContext<Ctx | null>(null);

export function MatchesProvider({ children }: { children: ReactNode }) {
  const value = useMatches();
  return <MatchesCtx.Provider value={value}>{children}</MatchesCtx.Provider>;
}

export function useMatchesCtx(): Ctx {
  const c = useContext(MatchesCtx);
  if (!c) throw new Error('useMatchesCtx fuera de provider');
  return c;
}
