import { useEffect } from 'react';

interface Props {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  destructive,
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={onCancel}>
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold">{title}</h3>
        {description && <p className="mt-1.5 text-sm text-gray-600 dark:text-neutral-400">{description}</p>}
        <div className="mt-4 flex gap-2">
          <button className="btn-secondary flex-1" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            className={destructive ? 'btn flex-1 bg-loss text-white hover:opacity-90' : 'btn-primary flex-1'}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
