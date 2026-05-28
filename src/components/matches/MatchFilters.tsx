import type { Filters, ResultFilter } from '../../hooks/useFilters';
import type { Condition, Tournament } from '../../types/match';
import { TOURNAMENTS } from '../../lib/constants';
import { Search, X } from 'lucide-react';

interface Props {
  filters: Filters;
  setFilters: (f: Filters) => void;
  opponents: string[];
  years: string[];
  isActive: boolean;
  onReset: () => void;
}

const RESULTS: { value: ResultFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'W', label: 'Ganados' },
  { value: 'D', label: 'Empatados' },
  { value: 'L', label: 'Perdidos' },
];

export function MatchFilters({ filters, setFilters, opponents, years, isActive, onReset }: Props) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          className="input pl-9"
          placeholder="Buscar rival, cancha, nota..."
          value={filters.query}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
        />
      </div>

      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex gap-1.5">
          {RESULTS.map((r) => (
            <button
              key={r.value}
              onClick={() => setFilters({ ...filters, result: r.value })}
              className={`chip border whitespace-nowrap ${
                filters.result === r.value
                  ? 'border-granate bg-granate text-white'
                  : 'border-gray-300 bg-white text-gray-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <select
          className="input"
          value={filters.opponent}
          onChange={(e) => setFilters({ ...filters, opponent: e.target.value })}
        >
          <option value="all">Rival: todos</option>
          {opponents.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <select
          className="input"
          value={filters.condition}
          onChange={(e) => setFilters({ ...filters, condition: e.target.value as Condition | 'all' })}
        >
          <option value="all">Condición: todas</option>
          <option value="local">Local</option>
          <option value="visitante">Visitante</option>
          <option value="neutral">Neutral</option>
        </select>
        <select
          className="input"
          value={filters.tournament}
          onChange={(e) => setFilters({ ...filters, tournament: e.target.value as Tournament | 'all' })}
        >
          <option value="all">Torneo: todos</option>
          {TOURNAMENTS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          className="input"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
        >
          <option value="all">Año: todos</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {isActive && (
        <button className="btn-ghost w-full text-xs" onClick={onReset}>
          <X className="h-3.5 w-3.5" /> Limpiar filtros
        </button>
      )}
    </div>
  );
}
