import { Search } from 'lucide-react';
import type { Filters, ResultFilter } from '../../hooks/useFilters';

interface Props {
  filters: Filters;
  setFilters: (f: Filters) => void;
}

const RESULTS: { value: ResultFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'W', label: 'Ganados' },
  { value: 'D', label: 'Empatados' },
  { value: 'L', label: 'Perdidos' },
];

export function MatchFilters({ filters, setFilters }: Props) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          className="input pl-9"
          placeholder="Buscar..."
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
    </div>
  );
}
