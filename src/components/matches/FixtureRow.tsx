import { Check, Flame, MapPin, Pencil } from 'lucide-react';
import type { Fixture } from '../../types/fixture';
import { isPlayed } from '../../types/fixture';
import { conditionLabel, formatDateAR, getInitials, isClasico } from '../../lib/matchUtils';

interface Props {
  fixture: Fixture;
  attended: boolean;
  edited?: boolean;
  onToggle: () => void;
  onEdit: () => void;
}

export function FixtureRow({ fixture, attended, edited, onToggle, onEdit }: Props) {
  const played = isPlayed(fixture);
  const clasico = isClasico(fixture.opponent);
  const result =
    played && fixture.goalsFor !== null && fixture.goalsAgainst !== null
      ? fixture.goalsFor > fixture.goalsAgainst
        ? 'W'
        : fixture.goalsFor < fixture.goalsAgainst
        ? 'L'
        : 'D'
      : null;

  const scoreColor =
    result === 'W'
      ? 'text-win'
      : result === 'L'
      ? 'text-loss'
      : result === 'D'
      ? 'text-draw'
      : 'text-gray-400 dark:text-neutral-500';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`card flex w-full items-center gap-3 text-left transition active:scale-[0.99] ${
          attended
            ? 'border-granate/60 bg-granate/5 dark:border-granate-400/50 dark:bg-granate/10'
            : 'hover:border-gray-300 dark:hover:border-neutral-700'
        }`}
      >
        <div
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white ${
            attended ? 'bg-granate' : 'bg-granate/80'
          }`}
        >
          {getInitials(fixture.opponent) || '?'}
          {attended && (
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-win ring-2 ring-white dark:ring-neutral-900">
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 pr-7">
            <span className="truncate text-sm font-semibold">{fixture.opponent}</span>
            {clasico && <Flame className="h-3.5 w-3.5 shrink-0 text-granate" />}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11px] text-gray-500 dark:text-neutral-400">
            <span>{formatDateAR(fixture.date)}</span>
            <span>·</span>
            <span>{conditionLabel(fixture.condition)}</span>
            {fixture.notes && (
              <>
                <span>·</span>
                <span className="truncate">{fixture.notes}</span>
              </>
            )}
          </div>
          {fixture.stadium && fixture.stadium !== 'Desconocida' && (
            <div className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-gray-400 dark:text-neutral-500">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{fixture.stadium}</span>
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center">
          {played ? (
            <span className={`font-mono text-sm font-bold tabular-nums ${scoreColor}`}>
              {fixture.goalsFor}-{fixture.goalsAgainst}
            </span>
          ) : (
            <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-neutral-500">
              Por jugar
            </span>
          )}
        </div>
      </button>

      <button
        type="button"
        onClick={onEdit}
        className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-granate dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-granate-300 ${
          edited ? 'text-granate dark:text-granate-300' : ''
        }`}
        aria-label="Editar fixture"
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
