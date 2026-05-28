import { Link } from 'react-router-dom';
import { useMatchesCtx } from '../app/MatchesContext';
import { useStats } from '../hooks/useStats';
import { StatCard } from '../components/stats/StatCard';
import { MatchCard } from '../components/matches/MatchCard';
import { Flame, CalendarCheck, TrendingUp, TrendingDown } from 'lucide-react';

export default function Resumen() {
  const { matches } = useMatchesCtx();
  const stats = useStats(matches);

  if (matches.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-3 py-10 text-center">
        <h2 className="text-lg font-semibold">¡Bienvenido, hincha!</h2>
        <p className="text-sm text-gray-500 dark:text-neutral-400">
          Empezá cargando los partidos a los que fuiste.
        </p>
        <Link to="/fixtures" className="btn-primary">
          <CalendarCheck className="h-4 w-4" /> Ir a Fixtures
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Resumen</h2>

      <div className="card flex items-center gap-3 bg-granate text-white">
        {stats.currentStreak.type === 'L' ? (
          <TrendingDown className="h-7 w-7 shrink-0" />
        ) : (
          <TrendingUp className="h-7 w-7 shrink-0" />
        )}
        <div>
          <p className="text-[11px] uppercase tracking-wide text-white/75">Racha actual</p>
          <p className="text-xl font-bold">{stats.currentStreak.label}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <StatCard label="Partidos" value={stats.total} accent="granate" />
        <StatCard label="% Victoria" value={`${stats.winPct}%`} accent="win" />
        <StatCard label="Goles a favor" value={stats.goalsFor} accent="win" />
        <StatCard label="Goles en contra" value={stats.goalsAgainst} accent="loss" />
      </div>

      <div className="card">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-neutral-400">
          Record W / D / L
        </p>
        <RecordBar wins={stats.wins} draws={stats.draws} losses={stats.losses} />
        <div className="mt-2 flex justify-between text-sm tabular-nums">
          <span className="text-win">{stats.wins} G</span>
          <span className="text-draw">{stats.draws} E</span>
          <span className="text-loss">{stats.losses} P</span>
        </div>
      </div>

      <section className="space-y-2">
        <h3 className="text-sm font-semibold">Destacados</h3>

        <div className="grid grid-cols-2 gap-2">
          <StatCard
            label="Clásicos"
            value={`${stats.clasicosWon}/${stats.clasicosPlayed}`}
            hint="ganados / jugados"
            accent="granate"
          />
          <StatCard
            label="Goles/partido"
            value={stats.avgGoalsPerMatch}
            hint="promedio total"
          />
        </div>

        {stats.bestMatch && (
          <div>
            <p className="mb-1 flex items-center gap-1 text-xs font-medium text-win">
              <Flame className="h-3.5 w-3.5" /> Mejor partido
            </p>
            <MatchCard match={stats.bestMatch} />
          </div>
        )}

        {stats.worstMatch && stats.worstMatch.id !== stats.bestMatch?.id && (
          <div>
            <p className="mb-1 flex items-center gap-1 text-xs font-medium text-loss">
              <Flame className="h-3.5 w-3.5" /> Peor partido
            </p>
            <MatchCard match={stats.worstMatch} />
          </div>
        )}
      </section>
    </div>
  );
}

function RecordBar({ wins, draws, losses }: { wins: number; draws: number; losses: number }) {
  const total = wins + draws + losses || 1;
  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-neutral-800">
      <div className="bg-win" style={{ width: `${(wins / total) * 100}%` }} />
      <div className="bg-draw" style={{ width: `${(draws / total) * 100}%` }} />
      <div className="bg-loss" style={{ width: `${(losses / total) * 100}%` }} />
    </div>
  );
}
