import { Check, Flame, MapPin, Plus } from 'lucide-react';
import type { Fixture } from '../../types/fixture';
import { isPlayed } from '../../types/fixture';
import { conditionLabel, formatDateAR, getInitials, isClasico } from '../../lib/matchUtils';

interface Props {
  fixture: Fixture;
  attended: boolean;
  onToggle: () => void;
}

export function FixtureRow({ fixture, attended, onToggle }: Props) {
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
    <div
      className={`card flex items-center gap-3 transition ${
        attended ? 'border-granate/50 bg-granate/5 dark:border-granate-400/40 dark:bg-granate/10' : ''
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-granate text-xs font-bold text-white">
        {getInitials(fixture.opponent) || '?'}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
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

      <div className="flex shrink-0 flex-col items-end gap-1.5">
        {played ? (
          <span className={`font-mono text-sm font-bold tabular-nums ${scoreColor}`}>
            {fixture.goalsFor}-{fixture.goalsAgainst}
          </span>
        ) : (
          <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-neutral-500">
            Por jugar
          </span>
        )}
        <button
          onClick={onToggle}
          className={`flex h-8 items-center justify-center gap-1 rounded-lg px-2.5 text-xs font-medium transition ${
            attended
              ? 'bg-granate text-white hover:bg-granate-600'
              : 'border border-gray-300 bg-white text-gray-700 hover:border-granate hover:text-granate dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-granate-300'
          }`}
          aria-label={attended ? 'Quitar asistencia' : 'Marcar como asistido'}
        >
          {attended ? (
            <>
              <Check className="h-3.5 w-3.5" /> Asistí
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" /> Asistí
            </>
          )}
        </button>
      </div>
    </div>
  );
}
