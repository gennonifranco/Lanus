import { Link } from 'react-router-dom';
import { CalendarCheck, TrendingDown, TrendingUp } from 'lucide-react';
import { useMatchesCtx } from '../app/MatchesContext';
import { useStats } from '../hooks/useStats';
import { MatchCard } from '../components/matches/MatchCard';

export default function Resumen() {
  const { matches } = useMatchesCtx();
  const stats = useStats(matches);

  if (matches.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-3 py-10 text-center">
        <h2 className="text-lg font-semibold">¡Bienvenido, hincha!</h2>
        <p className="text-sm text-gray-500 dark:text-neutral-400">
          Marcá los partidos a los que fuiste en la pestaña Fixtures.
        </p>
        <Link to="/fixtures" className="btn-primary">
          <CalendarCheck className="h-4 w-4" /> Ir a Fixtures
        </Link>
      </div>
    );
  }

  const TrendIcon = stats.currentStreak.type === 'L' ? TrendingDown : TrendingUp;

  return (
    <div className="space-y-4">
      {/* Hero: racha + total */}
      <div className="card bg-granate text-white">
        <div className="flex items-center gap-3">
          <TrendIcon className="h-8 w-8 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-wide text-white/70">Racha actual</p>
            <p className="text-xl font-bold leading-tight">{stats.currentStreak.label}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wide text-white/70">Partidos</p>
            <p className="text-2xl font-bold tabular-nums">{stats.total}</p>
          </div>
        </div>
      </div>

      {/* Stat principal: % victoria con barra */}
      <div className="card">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-medium text-gray-600 dark:text-neutral-400">
            Victorias estando vos
          </p>
          <p className="text-2xl font-bold tabular-nums text-win">{stats.winPct}%</p>
        </div>
        <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-neutral-800">
          <div className="bg-win" style={{ width: `${pct(stats.wins, stats.total)}%` }} />
          <div className="bg-draw" style={{ width: `${pct(stats.draws, stats.total)}%` }} />
          <div className="bg-loss" style={{ width: `${pct(stats.losses, stats.total)}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs tabular-nums">
          <span className="text-win">{stats.wins} G</span>
          <span className="text-draw">{stats.draws} E</span>
          <span className="text-loss">{stats.losses} P</span>
        </div>
      </div>

      {/* Mejor partido */}
      {stats.bestMatch && (
        <div>
          <h3 className="mb-2 text-sm font-semibold">Tu mejor partido</h3>
          <MatchCard match={stats.bestMatch} />
        </div>
      )}

      {/* Peor partido */}
      {stats.worstMatch && (
        <div>
          <h3 className="mb-2 text-sm font-semibold">Tu peor partido</h3>
          <MatchCard match={stats.worstMatch} />
        </div>
      )}
    </div>
  );
}

function pct(n: number, total: number): number {
  return total === 0 ? 0 : (n / total) * 100;
}
