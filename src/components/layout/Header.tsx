import { LanusShield } from './LanusShield';
import { formatDateAR } from '../../lib/matchUtils';

interface Props {
  firstMatchDate: string | null;
}

export function Header({ firstMatchDate }: Props) {
  return (
    <header className="safe-top sticky top-0 z-30 border-b border-gray-200 bg-granate text-white dark:border-neutral-800">
      <div className="mx-auto flex max-w-xl items-center gap-3 px-4 py-3">
        <LanusShield className="h-9 w-9 shrink-0" />
        <div className="min-w-0">
          <h1 className="text-base font-semibold leading-tight">Lanús Tracker</h1>
          <p className="truncate text-[11px] text-white/75">
            {firstMatchDate
              ? `Hincha presente desde ${formatDateAR(firstMatchDate)}`
              : 'Cargá tu primer partido para empezar'}
          </p>
        </div>
      </div>
    </header>
  );
}
