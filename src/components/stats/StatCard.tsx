import type { ReactNode } from 'react';

interface Props {
  label: string;
  value: ReactNode;
  hint?: string;
  accent?: 'win' | 'loss' | 'granate';
}

export function StatCard({ label, value, hint, accent }: Props) {
  const accentClass =
    accent === 'win' ? 'text-win' : accent === 'loss' ? 'text-loss' : accent === 'granate' ? 'text-granate dark:text-granate-300' : '';
  return (
    <div className="card">
      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-neutral-400">{label}</p>
      <p className={`mt-1 text-2xl font-bold tabular-nums ${accentClass}`}>{value}</p>
      {hint && <p className="mt-0.5 text-xs text-gray-500 dark:text-neutral-400">{hint}</p>}
    </div>
  );
}
