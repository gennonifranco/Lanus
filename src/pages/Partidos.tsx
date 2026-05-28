import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMatchesCtx } from '../app/MatchesContext';
import { useFilters } from '../hooks/useFilters';
import { MatchCard } from '../components/matches/MatchCard';
import { MatchFilters } from '../components/matches/MatchFilters';
import { MatchDetail } from '../components/matches/MatchDetail';
import { PlusCircle } from 'lucide-react';

export default function Partidos() {
  const { matches, updateMatch, deleteMatch } = useMatchesCtx();
  const { filters, setFilters, filtered, opponents, years, reset, isActive } = useFilters(matches);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = filtered.find((m) => m.id === selectedId) ?? matches.find((m) => m.id === selectedId) ?? null;

  if (matches.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-3 py-10 text-center">
        <p className="text-sm text-gray-500 dark:text-neutral-400">Todavía no cargaste ningún partido.</p>
        <Link to="/cargar" className="btn-primary">
          <PlusCircle className="h-4 w-4" /> Cargar el primero
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Partidos</h2>

      <MatchFilters
        filters={filters}
        setFilters={setFilters}
        opponents={opponents}
        years={years}
        isActive={isActive}
        onReset={reset}
      />

      <p className="text-xs text-gray-500 dark:text-neutral-400">
        {filtered.length} {filtered.length === 1 ? 'partido' : 'partidos'}
      </p>

      {filtered.length === 0 ? (
        <div className="card text-center text-sm text-gray-500 dark:text-neutral-400">
          No hay partidos con esos filtros.
        </div>
      ) : (
        <ul className="space-y-2">
          {filtered.map((m) => (
            <li key={m.id}>
              <MatchCard match={m} onClick={() => setSelectedId(m.id)} />
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <MatchDetail
          match={selected}
          onClose={() => setSelectedId(null)}
          onUpdate={updateMatch}
          onDelete={deleteMatch}
        />
      )}
    </div>
  );
}
