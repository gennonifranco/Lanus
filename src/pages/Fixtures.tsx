import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, History, Search } from 'lucide-react';
import { FIXTURES } from '../lib/fixtures';
import type { Fixture } from '../types/fixture';
import { isPlayed } from '../types/fixture';
import { useMatchesCtx } from '../app/MatchesContext';
import { useAttendance } from '../hooks/useAttendance';
import { useToast } from '../components/ui/Toast';
import { FixtureRow } from '../components/matches/FixtureRow';
import { TOURNAMENTS } from '../lib/constants';

type Filter = 'todos' | 'jugados' | 'porjugar' | 'asisti';

export default function Fixtures() {
  const { matches, addMatch, deleteMatch } = useMatchesCtx();
  const attended = useAttendance(matches);
  const toast = useToast();
  const [filter, setFilter] = useState<Filter>('todos');
  const [tournament, setTournament] = useState<string>('todos');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FIXTURES.filter((f) => {
      if (filter === 'jugados' && !isPlayed(f)) return false;
      if (filter === 'porjugar' && isPlayed(f)) return false;
      if (filter === 'asisti' && !attended.has(f.id)) return false;
      if (tournament !== 'todos' && f.tournament !== tournament) return false;
      if (q) {
        const blob = `${f.opponent} ${f.stadium} ${f.tournament} ${f.notes ?? ''}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, [filter, tournament, query, attended]);

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

  const attendedCount = attended.size;

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">Fixtures</h2>
        <p className="text-xs text-gray-500 dark:text-neutral-400">
          Fuiste a {attendedCount} de {FIXTURES.filter(isPlayed).length} jugados
        </p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          className="input pl-9"
          placeholder="Buscar rival, cancha, torneo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex gap-1.5">
          {([
            { v: 'todos', l: 'Todos' },
            { v: 'jugados', l: 'Jugados' },
            { v: 'porjugar', l: 'Por jugar' },
            { v: 'asisti', l: 'Asistí' },
          ] as { v: Filter; l: string }[]).map(({ v, l }) => (
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

      <Link
        to="/cargar"
        className="card flex items-center gap-3 text-sm text-gray-600 hover:border-granate dark:text-neutral-300 dark:hover:border-granate-300"
      >
        <History className="h-4 w-4 text-granate" />
        <span>
          ¿Fuiste a un partido <strong>anterior a 2025</strong> o un amistoso? Cargalo a mano
        </span>
      </Link>

      {filtered.length === 0 ? (
        <div className="card flex flex-col items-center gap-2 py-8 text-center text-sm text-gray-500 dark:text-neutral-400">
          <Calendar className="h-8 w-8 text-gray-300 dark:text-neutral-600" />
          No hay fixtures con esos filtros
        </div>
      ) : (
        <ul className="space-y-2">
          {filtered.map((f) => (
            <li key={f.id}>
              <FixtureRow fixture={f} attended={attended.has(f.id)} onToggle={() => handleToggle(f)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
