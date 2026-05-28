import { useEffect, useState, type FormEvent } from 'react';
import { RotateCcw, X } from 'lucide-react';
import type { Fixture } from '../../types/fixture';
import type { Condition, Tournament } from '../../types/match';
import { TOURNAMENTS } from '../../lib/constants';
import { formatDateAR } from '../../lib/matchUtils';

interface Props {
  fixture: Fixture;
  isOverridden: boolean;
  onSave: (edited: Fixture) => void;
  onReset: () => void;
  onClose: () => void;
}

export function FixtureEditModal({ fixture, isOverridden, onSave, onReset, onClose }: Props) {
  const [opponent, setOpponent] = useState(fixture.opponent);
  const [condition, setCondition] = useState<Condition>(fixture.condition);
  const [tournament, setTournament] = useState<Tournament>(fixture.tournament);
  const [stadium, setStadium] = useState(fixture.stadium);
  const [goalsFor, setGoalsFor] = useState<string>(fixture.goalsFor === null ? '' : String(fixture.goalsFor));
  const [goalsAgainst, setGoalsAgainst] = useState<string>(fixture.goalsAgainst === null ? '' : String(fixture.goalsAgainst));
  const [notes, setNotes] = useState(fixture.notes ?? '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!opponent.trim()) return setError('Falta el rival');
    if (!stadium.trim()) return setError('Falta la cancha');
    const gf = goalsFor === '' ? null : Number(goalsFor);
    const ga = goalsAgainst === '' ? null : Number(goalsAgainst);
    if ((gf === null) !== (ga === null)) return setError('Marcador incompleto');
    if (gf !== null && (!Number.isInteger(gf) || gf < 0)) return setError('Goles a favor inválidos');
    if (ga !== null && (!Number.isInteger(ga) || ga < 0)) return setError('Goles en contra inválidos');

    onSave({
      ...fixture,
      opponent: opponent.trim(),
      condition,
      tournament,
      stadium: stadium.trim(),
      goalsFor: gf,
      goalsAgainst: ga,
      notes: notes.trim() || undefined,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white p-4 dark:bg-neutral-950 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Editar fixture</h2>
            <p className="text-xs text-gray-500 dark:text-neutral-400">{formatDateAR(fixture.date)}</p>
          </div>
          <button className="btn-ghost px-2 py-2" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="card space-y-4">
            <div>
              <label className="label">Rival</label>
              <input className="input" value={opponent} onChange={(e) => setOpponent(e.target.value)} />
            </div>

            <div>
              <label className="label">Condición</label>
              <div className="grid grid-cols-3 gap-2">
                {(['local', 'visitante', 'neutral'] as const).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setCondition(c)}
                    className={`btn ${
                      condition === c
                        ? 'bg-granate text-white'
                        : 'border border-gray-300 bg-white text-gray-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200'
                    }`}
                  >
                    {c === 'local' ? 'Local' : c === 'visitante' ? 'Visitante' : 'Neutral'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Goles Lanús</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  className="input"
                  placeholder="—"
                  value={goalsFor}
                  onChange={(e) => setGoalsFor(e.target.value)}
                />
              </div>
              <div>
                <label className="label">Goles rival</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  className="input"
                  placeholder="—"
                  value={goalsAgainst}
                  onChange={(e) => setGoalsAgainst(e.target.value)}
                />
              </div>
            </div>
            <p className="-mt-2 text-[11px] text-gray-500 dark:text-neutral-400">
              Dejá vacío si el partido no se jugó todavía
            </p>

            <div>
              <label className="label">Torneo</label>
              <select
                className="input"
                value={tournament}
                onChange={(e) => setTournament(e.target.value as Tournament)}
              >
                {TOURNAMENTS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Cancha</label>
              <input className="input" value={stadium} onChange={(e) => setStadium(e.target.value)} />
            </div>

            <div>
              <label className="label">Notas</label>
              <input className="input" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

            {error && <p className="text-sm text-loss">{error}</p>}
          </div>

          <div className="flex gap-2">
            {isOverridden && (
              <button type="button" className="btn-secondary" onClick={onReset} title="Volver a los datos originales">
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            <button type="button" className="btn-secondary flex-1" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary flex-1">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
