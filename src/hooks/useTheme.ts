import { useEffect, useState } from 'react';
import { THEME_KEY } from '../lib/constants';

export type ThemeMode = 'light' | 'dark' | 'system';

function applyTheme(mode: ThemeMode) {
  const dark =
    mode === 'dark' ||
    (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = dark ? '#0a0a0a' : '#6B1219';
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
    applyTheme(mode);
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode]);

  return { mode, setMode };
}
