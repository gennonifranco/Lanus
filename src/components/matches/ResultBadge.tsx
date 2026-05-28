import type { MatchResult } from '../../types/match';
import { resultColorClass } from '../../lib/matchUtils';

interface Props {
  result: MatchResult;
  className?: string;
}

export function ResultBadge({ result, className = '' }: Props) {
  return (
    <span className={`chip border ${resultColorClass(result)} ${className}`}>
      {result === 'W' ? 'G' : result === 'D' ? 'E' : 'P'}
    </span>
  );
}
