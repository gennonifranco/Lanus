import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ToastMsg {
  id: number;
  text: string;
  kind: 'success' | 'error';
}

interface ToastCtx {
  show: (text: string, kind?: 'success' | 'error') => void;
}

const Ctx = createContext<ToastCtx | null>(null);

export function useToast(): ToastCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useToast fuera de provider');
  return c;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastMsg[]>([]);

  const show = useCallback((text: string, kind: 'success' | 'error' = 'success') => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, text, kind }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 2500);
  }, []);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4">
        {items.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
          >
            {t.kind === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-win" />
            ) : (
              <XCircle className="h-4 w-4 text-loss" />
            )}
            <span>{t.text}</span>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
