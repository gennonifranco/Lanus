import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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
      <div className="card py-10 text-center text-sm text-gray-500 dark:text-neutral-400">
        Cargá partidos para ver tus estadísticas.
      </div>
    );
  }

  const pieData = [
    { name: 'Ganados', value: stats.wins, fill: WIN },
    { name: 'Empatados', value: stats.draws, fill: DRAW },
    { name: 'Perdidos', value: stats.losses, fill: LOSS },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Estadísticas</h2>

      <section className="card">
        <h3 className="mb-3 text-sm font-semibold">Partidos por año</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.byYear}>
              <XAxis dataKey="year" fontSize={12} stroke="currentColor" />
              <YAxis allowDecimals={false} fontSize={12} stroke="currentColor" />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="W" stackId="a" fill={WIN} name="Ganados" />
              <Bar dataKey="D" stackId="a" fill={DRAW} name="Empatados" />
              <Bar dataKey="L" stackId="a" fill={LOSS} name="Perdidos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card">
        <h3 className="mb-3 text-sm font-semibold">Distribución de resultados</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card">
        <h3 className="mb-3 text-sm font-semibold">Top rivales</h3>
        <ul className="divide-y divide-gray-100 dark:divide-neutral-800">
          {stats.topOpponents.map((o) => (
            <li key={o.opponent} className="flex items-center justify-between py-2 text-sm">
              <span>{o.opponent}</span>
              <span className="font-mono tabular-nums text-gray-500 dark:text-neutral-400">{o.count}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h3 className="mb-3 text-sm font-semibold">Canchas más visitadas</h3>
        <ul className="divide-y divide-gray-100 dark:divide-neutral-800">
          {stats.topStadiums.map((s) => (
            <li key={s.stadium} className="flex items-center justify-between gap-3 py-2 text-sm">
              <span className="truncate">{s.stadium}</span>
              <span className="font-mono tabular-nums text-gray-500 dark:text-neutral-400">{s.count}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="card">
        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-neutral-400">
          Promedio de goles por partido
        </p>
        <p className="mt-1 text-2xl font-bold tabular-nums">{stats.avgGoalsPerMatch}</p>
      </div>
    </div>
  );
}
