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

function Shell() {
  const { matches } = useMatchesCtx();

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
  useTheme();

  return (
    <ToastProvider>
      <MatchesProvider>
        <Shell />
      </MatchesProvider>
    </ToastProvider>
  );
}
