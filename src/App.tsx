import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { MatchesProvider, useMatchesCtx } from './app/MatchesContext';
import { ToastProvider } from './components/ui/Toast';
import { useTheme } from './hooks/useTheme';
import { useStats } from './hooks/useStats';
import Resumen from './pages/Resumen';
import Partidos from './pages/Partidos';
import Cargar from './pages/Cargar';
import Estadisticas from './pages/Estadisticas';
import Ajustes from './pages/Ajustes';

function Shell() {
  const { matches } = useMatchesCtx();
  const stats = useStats(matches);
  return (
    <AppShell firstMatchDate={stats.firstMatchDate}>
      <Routes>
        <Route path="/" element={<Resumen />} />
        <Route path="/partidos" element={<Partidos />} />
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
