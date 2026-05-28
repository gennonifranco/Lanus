import type { ReactNode } from 'react';
import { Header } from './Header';
import { BottomTabs } from './BottomTabs';

interface Props {
  children: ReactNode;
  firstMatchDate: string | null;
}

export function AppShell({ children, firstMatchDate }: Props) {
  return (
    <div className="min-h-screen pb-24">
      <Header firstMatchDate={firstMatchDate} />
      <main className="mx-auto max-w-xl px-4 py-4">{children}</main>
      <BottomTabs />
    </div>
  );
}
