import { NavLink } from 'react-router-dom';
import { Home, List, PlusCircle, BarChart3, Settings } from 'lucide-react';

const tabs = [
  { to: '/', label: 'Resumen', icon: Home, end: true },
  { to: '/partidos', label: 'Partidos', icon: List },
  { to: '/cargar', label: 'Cargar', icon: PlusCircle },
  { to: '/stats', label: 'Stats', icon: BarChart3 },
  { to: '/ajustes', label: 'Ajustes', icon: Settings },
];

export function BottomTabs() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <ul className="safe-bottom mx-auto flex max-w-xl items-stretch justify-around">
        {tabs.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-2 text-[11px] font-medium transition ${
                  isActive
                    ? 'text-granate dark:text-granate-300'
                    : 'text-gray-500 dark:text-neutral-500'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
