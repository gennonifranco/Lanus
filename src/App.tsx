import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { MatchesProvider, useMatchesCtx } from './app/MatchesContext';
import { ToastProvider } from './components/ui/Toast';
import { useTheme } from './hooks/useTheme';
import Resumen from './pages/Resumen';
import Partidos from './pages/Partidos';
import Cargar from './pages/Cargar';
import Fixtures from './pages/Fixtures';
import Estadisticas from './pages/Estadisticas';
import Ajustes from './pages/Ajustes';

const SIX_HOURS = 6 * 60 * 60 * 1000;

function Shell() {
  const { matches, replaceAll } = useMatchesCtx();

  useEffect(() => {
    const lastSync = localStorage.getItem('lanus-tracker:lastSync');
    const tooSoon = lastSync && Date.now() - new Date(lastSync).getTime() < SIX_HOURS;
    if (tooSoon) return;

    import('./hooks/useSync').then(({ useSync: _unused }) => {
      // No podemos llamar hooks acá — usamos la función directamente
    });

    import('./lib/apiFootball').then(({ fetchLanusMatches }) => {
      const year = new Date().getFullYear();
      Promise.all([fetchLanusMatches(year - 1), fetchLanusMatches(year)])
        .then(([prev, current]) => {
          const fetched = [...prev, ...current];
          const existingIds = new Set(matches.map((m) => m.id));
          const newMatches = fetched.filter((m) => !existingIds.has(m.id));
          if (newMatches.length === 0) return;
          const next = [...matches, ...newMatches].sort((a, b) => b.date.localeCompare(a.date));
          replaceAll(next);
          const now = new Date().toISOString();
          localStorage.setItem('lanus-tracker:lastSync', now);
        })
        .catch(() => {
          // Silencioso — sync en background, no molesta al usuario
        });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppShell attendedCount={matches.length}>
      <Routes>
        <Route path="/" element={<Resumen />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/fixtures" element={<Fixtures />} />
        <Route path="/cargar" element={<Cargar />} />
        <Route path="/stats" element={<Estadisticas />} />
        <Route path="/ajustes" element={<Ajustes />} />
      </Routes>
    </AppShell>
  );
}

export default function App() {
  // Inicializa el tema apenas arranca la app.
  useTheme();

  useEffect(() => {
    // nada extra
  }, []);

  return (
    <ToastProvider>
      <MatchesProvider>
        <Shell />
      </MatchesProvider>
    </ToastProvider>
  );
}
