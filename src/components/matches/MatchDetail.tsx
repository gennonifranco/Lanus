import { useState } from 'react';
import type { Match, NewMatch } from '../../types/match';
import { MatchForm } from '../form/MatchForm';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { formatDateAR, getResult, isClasico, conditionLabel, resultLabel } from '../../lib/matchUtils';
import { ResultBadge } from './ResultBadge';
import { Pencil, Trash2, X, Flame, MapPin } from 'lucide-react';

interface Props {
  match: Match;
  onClose: () => void;
  onUpdate: (id: string, data: Partial<NewMatch>) => void;
  onDelete: (id: string) => void;
}

export function MatchDetail({ match, onClose, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [askDelete, setAskDelete] = useState(false);
  const r = getResult(match);
  const clasico = isClasico(match.opponent);

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 sm:items-center" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white p-4 dark:bg-neutral-950 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">Detalle del partido</h2>
          <button className="btn-ghost px-2 py-2" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>

        {editing ? (
          <MatchForm
            initial={match}
            allowFuture
            submitLabel="Guardar cambios"
            onSubmit={(data) => {
              onUpdate(match.id, data);
              setEditing(false);
            }}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <>
            <div className="card space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-semibold">{match.opponent}</span>
                    {clasico && <Flame className="h-4 w-4 text-granate" />}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-neutral-400">
                    {formatDateAR(match.date)} · {conditionLabel(match.condition)} · {match.tournament}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-2xl font-bold tabular-nums">
                    {match.goalsFor}-{match.goalsAgainst}
                  </span>
                  <ResultBadge result={r} />
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-neutral-400">
                <MapPin className="h-4 w-4" /> {match.stadium}
              </div>

              <div className="text-sm">
                <span className="text-gray-500 dark:text-neutral-400">Resultado: </span>
                <span className="font-medium">{resultLabel(r)}</span>
              </div>

              {match.notes && (
                <div className="border-t border-gray-200 pt-3 text-sm dark:border-neutral-800">
                  <p className="mb-1 text-xs font-medium text-gray-500 dark:text-neutral-400">Notas</p>
                  <p className="whitespace-pre-wrap">{match.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              <button className="btn-secondary flex-1" onClick={() => setEditing(true)}>
                <Pencil className="h-4 w-4" /> Editar
              </button>
              <button
                className="btn flex-1 bg-loss text-white hover:opacity-90"
                onClick={() => setAskDelete(true)}
              >
                <Trash2 className="h-4 w-4" /> Borrar
              </button>
            </div>
          </>
        )}

        <ConfirmDialog
          open={askDelete}
          title="¿Borrar este partido?"
          description="Esta acción no se puede deshacer."
          destructive
          confirmLabel="Borrar"
          onConfirm={() => {
            onDelete(match.id);
            setAskDelete(false);
            onClose();
          }}
          onCancel={() => setAskDelete(false)}
        />
      </div>
    </div>
  );
}
