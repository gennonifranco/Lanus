import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { Match, NewMatch } from '../../types/match';
import { LA_FORTALEZA, TOURNAMENTS } from '../../lib/constants';
import { isClasico } from '../../lib/matchUtils';
import { compressImage } from '../../lib/imageUtils';
import { Camera, Flame, X } from 'lucide-react';

interface Props {
  initial?: Match;
  allowFuture?: boolean;
  onSubmit: (data: NewMatch) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function MatchForm({
  initial,
  allowFuture = false,
  onSubmit,
  onCancel,
  submitLabel = 'Guardar partido',
}: Props) {
  const [date, setDate] = useState(initial?.date ?? todayISO());
  const [opponent, setOpponent] = useState(initial?.opponent ?? '');
  const [condition, setCondition] = useState<NewMatch['condition']>(initial?.condition ?? 'local');
  const [goalsFor, setGoalsFor] = useState<string>(String(initial?.goalsFor ?? 0));
  const [goalsAgainst, setGoalsAgainst] = useState<string>(String(initial?.goalsAgainst ?? 0));
  const [tournament, setTournament] = useState<NewMatch['tournament']>(initial?.tournament ?? 'Liga');
  const [stadium, setStadium] = useState(initial?.stadium ?? (initial ? '' : LA_FORTALEZA));
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [photo, setPhoto] = useState<string | undefined>(initial?.photo);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!initial && condition === 'local' && !stadium) setStadium(LA_FORTALEZA);
  }, [condition, stadium, initial]);

  const clasico = isClasico(opponent);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!opponent.trim()) return setError('Falta el rival');
    if (!date) return setError('Falta la fecha');
    if (!allowFuture && date > todayISO()) return setError('No se pueden cargar partidos futuros');
    const gf = Number(goalsFor);
    const ga = Number(goalsAgainst);
    if (!Number.isInteger(gf) || gf < 0) return setError('Goles a favor inválidos');
    if (!Number.isInteger(ga) || ga < 0) return setError('Goles en contra inválidos');
    if (!stadium.trim()) return setError('Falta la cancha');

    onSubmit({
      date,
      opponent: opponent.trim(),
      condition,
      goalsFor: gf,
      goalsAgainst: ga,
      tournament,
      stadium: stadium.trim(),
      notes: notes.trim() || undefined,
      photo,
    });
  }

  async function handlePhotoChange(file: File | null | undefined) {
    if (!file) return;
    setError(null);
    setPhotoLoading(true);
    try {
      const dataUrl = await compressImage(file);
      setPhoto(dataUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo procesar la foto');
    } finally {
      setPhotoLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="card space-y-4">
        <div>
          <label className="label">Fecha</label>
          <input
            type="date"
            className="input"
            value={date}
            max={allowFuture ? undefined : todayISO()}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Rival</label>
          <input
            className="input"
            placeholder="Banfield"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
          />
          {clasico && (
            <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-granate dark:text-granate-300">
              <Flame className="h-3.5 w-3.5" />
              Clásico detectado
            </p>
          )}
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
              value={goalsAgainst}
              onChange={(e) => setGoalsAgainst(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label">Torneo</label>
          <select
            className="input"
            value={tournament}
            onChange={(e) => setTournament(e.target.value as NewMatch['tournament'])}
          >
            {TOURNAMENTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Cancha</label>
          <input
            className="input"
            placeholder="La Fortaleza"
            value={stadium}
            onChange={(e) => setStadium(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Notas (opcional)</label>
          <textarea
            className="input min-h-20"
            placeholder="Qué tal estuvo el partido..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Foto (opcional)</label>
          {photo ? (
            <div className="relative">
              <img src={photo} alt="" className="w-full rounded-xl border border-gray-200 object-cover dark:border-neutral-800" />
              <button
                type="button"
                onClick={() => setPhoto(undefined)}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                aria-label="Quitar foto"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary mt-2 w-full"
                disabled={photoLoading}
              >
                <Camera className="h-4 w-4" /> Cambiar foto
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary w-full"
              disabled={photoLoading}
            >
              <Camera className="h-4 w-4" />
              {photoLoading ? 'Procesando...' : 'Agregar foto'}
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              handlePhotoChange(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </div>

        {error && <p className="text-sm text-loss">{error}</p>}
      </div>

      <div className="flex gap-2">
        {onCancel && (
          <button type="button" className="btn-secondary flex-1" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn-primary flex-1">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
