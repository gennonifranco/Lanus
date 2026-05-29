import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, History, Search } from 'lucide-react';
import type { Fixture } from '../types/fixture';
import { isPlayed } from '../types/fixture';
import { useMatchesCtx } from '../app/MatchesContext';
import { useAttendance } from '../hooks/useAttendance';
import { useFixtures } from '../hooks/useFixtures';
import { useToast } from '../components/ui/Toast';
import { FixtureRow } from '../components/matches/FixtureRow';
import { FixtureEditModal } from '../components/matches/FixtureEditModal';
import { TOURNAMENTS } from '../lib/constants';

type Filter = 'todos' | 'jugados' | 'porjugar' | 'asisti';

const FILTERS: { v: Filter; l: string }[] = [
  { v: 'todos', l: 'Todos' },
  { v: 'jugados', l: 'Jugados' },
  { v: 'porjugar', l: 'Por jugar' },
  { v: 'asisti', l: 'Asistí' },
];

export default function Fixtures() {
  const { matches, addMatch, updateMatch, deleteMatch } = useMatchesCtx();
  const { fixtures, overrides, updateFixture, resetFixture } = useFixtures();
  const attended = useAttendance(matches);
  const toast = useToast();
  const [filter, setFilter] = useState<Filter>('todos');
  const [tournament, setTournament] = useState<string>('todos');
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return fixtures
      .filter((f) => {
        if (filter === 'jugados' && !isPlayed(f)) return false;
        if (filter === 'porjugar' && isPlayed(f)) return false;
        if (filter === 'asisti' && !attended.has(f.id)) return false;
        if (tournament !== 'todos' && f.tournament !== tournament) return false;
        if (q) {
          const blob = `${f.opponent} ${f.stadium} ${f.tournament} ${f.notes ?? ''}`.toLowerCase();
          if (!blob.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [fixtures, filter, tournament, query, attended]);

  const editingFixture = editingId ? fixtures.find((f) => f.id === editingId) ?? null : null;
  const totalPlayed = fixtures.filter(isPlayed).length;

  function handleToggle(f: Fixture) {
    if (attended.has(f.id)) {
      const existing = matches.find((m) => m.fixtureId === f.id);
      if (existing) {
        deleteMatch(existing.id);
        toast.show('Asistencia eliminada');
      }
      return;
    }
    if (!isPlayed(f) || f.goalsFor === null || f.goalsAgainst === null) {
      toast.show('Marcalo cuando se juegue el partido', 'error');
      return;
    }
    addMatch({
      date: f.date,
      opponent: f.opponent,
      condition: f.condition,
      goalsFor: f.goalsFor,
      goalsAgainst: f.goalsAgainst,
      tournament: f.tournament,
      stadium: f.stadium,
      notes: f.notes,
      fixtureId: f.id,
    });
    toast.show('¡Asistencia registrada!');
  }

  function handleSaveEdit(edited: Fixture) {
    updateFixture(edited.id, edited);
    const existing = matches.find((m) => m.fixtureId === edited.id);
    if (existing && edited.goalsFor !== null && edited.goalsAgainst !== null) {
      updateMatch(existing.id, {
        opponent: edited.opponent,
        condition: edited.condition,
        goalsFor: edited.goalsFor,
        goalsAgainst: edited.goalsAgainst,
        tournament: edited.tournament,
        stadium: edited.stadium,
        notes: edited.notes,
      });
    }
    setEditingId(null);
    toast.show('Fixture actualizado');
  }

  function handleResetEdit(id: string) {
    resetFixture(id);
    setEditingId(null);
    toast.show('Fixture restaurado');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">Fixtures</h2>
        <p className="text-xs tabular-nums text-gray-500 dark:text-neutral-400">
          {attended.size} de {totalPlayed}
        </p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            className="input pl-9"
            placeholder="Buscar rival o cancha..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="-mx-4 overflow-x-auto px-4">
          <div className="flex gap-1.5">
            {FILTERS.map(({ v, l }) => (
              <button
                key={v}
                onClick={() => setFilter(v)}
                className={`chip border whitespace-nowrap ${
                  filter === v
                    ? 'border-granate bg-granate text-white'
                    : 'border-gray-300 bg-white text-gray-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <select
          className="input"
          value={tournament}
          onChange={(e) => setTournament(e.target.value)}
        >
          <option value="todos">Torneo: todos</option>
          {TOURNAMENTS.filter((t) => t !== 'Amistoso' && t !== 'Otro').map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center gap-2 py-8 text-center text-sm text-gray-500 dark:text-neutral-400">
          <Calendar className="h-7 w-7 text-gray-300 dark:text-neutral-600" />
          No hay fixtures con esos filtros
        </div>
      ) : (
        <ul className="space-y-2">
          {filtered.map((f) => (
            <li key={f.id}>
              <FixtureRow
                fixture={f}
                attended={attended.has(f.id)}
                edited={Boolean(overrides[f.id])}
                onToggle={() => handleToggle(f)}
                onEdit={() => setEditingId(f.id)}
              />
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/cargar"
        className="flex items-center justify-center gap-2 py-3 text-xs text-gray-500 hover:text-granate dark:text-neutral-500 dark:hover:text-granate-300"
      >
        <History className="h-3.5 w-3.5" />
        Cargar partido a mano
      </Link>

      {editingFixture && (
        <FixtureEditModal
          fixture={editingFixture}
          isOverridden={Boolean(overrides[editingFixture.id])}
          onSave={handleSaveEdit}
          onReset={() => handleResetEdit(editingFixture.id)}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  );
}
