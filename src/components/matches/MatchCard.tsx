import type { Match } from '../../types/match';
import { conditionLabel, formatDateAR, getInitials, getResult, isClasico } from '../../lib/matchUtils';
import { ResultBadge } from './ResultBadge';
import { Flame, MapPin } from 'lucide-react';

interface Props {
  match: Match;
  onClick?: () => void;
}

export function MatchCard({ match, onClick }: Props) {
  const r = getResult(match);
  const clasico = isClasico(match.opponent);
  return (
    <button
      onClick={onClick}
      className="card flex w-full items-center gap-3 text-left transition active:scale-[0.99] hover:border-gray-300 dark:hover:border-neutral-700"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-granate text-sm font-bold text-white">
        {getInitials(match.opponent) || '?'}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-semibold">{match.opponent}</span>
          {clasico && <Flame className="h-3.5 w-3.5 shrink-0 text-granate" />}
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-neutral-400">
          <span>{formatDateAR(match.date)}</span>
          <span>·</span>
          <span>{conditionLabel(match.condition)}</span>
          <span>·</span>
          <span className="truncate">{match.tournament}</span>
        </div>
        {match.stadium && (
          <div className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-gray-400 dark:text-neutral-500">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{match.stadium}</span>
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="font-mono text-sm font-semibold tabular-nums">
          {match.goalsFor}-{match.goalsAgainst}
        </span>
        <ResultBadge result={r} />
      </div>
    </button>
  );
}
