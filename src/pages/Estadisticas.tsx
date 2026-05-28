import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Link } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';
import { useMatchesCtx } from '../app/MatchesContext';
import { useStats } from '../hooks/useStats';

const WIN = '#1f7a3a';
const DRAW = '#6b7280';
const LOSS = '#8a2a2a';

export default function Estadisticas() {
  const { matches } = useMatchesCtx();
  const stats = useStats(matches);

  if (matches.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-3 py-10 text-center">
        <p className="text-sm text-gray-500 dark:text-neutral-400">
          Cargá partidos para ver tus estadísticas.
        </p>
        <Link to="/fixtures" className="btn-primary">
          <CalendarCheck className="h-4 w-4" /> Ir a Fixtures
        </Link>
      </div>
    );
  }

  const maxOpponent = stats.topOpponents[0]?.count ?? 1;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Estadísticas</h2>

      {/* Partidos por año */}
      <section>
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-neutral-400">
          Por año
        </h3>
        <div className="card">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.byYear} barCategoryGap="30%" margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
                <XAxis
                  dataKey="year"
                  fontSize={11}
                  stroke="currentColor"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(107, 18, 25, 0.06)' }}
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 12,
                    border: '1px solid rgba(0,0,0,0.08)',
                    padding: '8px 12px',
                  }}
                />
                <Bar dataKey="W" stackId="a" fill={WIN} name="Ganados" />
                <Bar dataKey="D" stackId="a" fill={DRAW} name="Empatados" />
                <Bar dataKey="L" stackId="a" fill={LOSS} name="Perdidos" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Top rivales */}
      <section>
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-neutral-400">
          Rivales que más viste
        </h3>
        <div className="card divide-y divide-gray-100 dark:divide-neutral-800">
          {stats.topOpponents.map((o) => (
            <div key={o.opponent} className="py-3 first:pt-0 last:pb-0">
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-sm font-medium">{o.opponent}</span>
                <span className="text-sm tabular-nums text-gray-500 dark:text-neutral-400">
                  {o.count}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-neutral-800">
                <div
                  className="h-full rounded-full bg-granate"
                  style={{ width: `${(o.count / maxOpponent) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top canchas */}
      {stats.topStadiums.length > 0 && (
        <section>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-neutral-400">
            Canchas
          </h3>
          <div className="card">
            <ul className="divide-y divide-gray-100 dark:divide-neutral-800">
              {stats.topStadiums.slice(0, 5).map((s) => (
                <li
                  key={s.stadium}
                  className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0 text-sm"
                >
                  <span className="truncate">{s.stadium}</span>
                  <span className="shrink-0 tabular-nums text-gray-500 dark:text-neutral-400">
                    {s.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
