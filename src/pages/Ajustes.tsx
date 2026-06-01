import { useRef, useState } from 'react';
import { Download, Monitor, Moon, Sun, Trash2, Upload } from 'lucide-react';
import { useMatchesCtx } from '../app/MatchesContext';
import { useToast } from '../components/ui/Toast';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { exportJSON, importJSON } from '../lib/storage';
import { useTheme, type ThemeMode } from '../hooks/useTheme';

const MODES: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Claro', icon: Sun },
  { value: 'dark', label: 'Oscuro', icon: Moon },
  { value: 'system', label: 'Sistema', icon: Monitor },
];

export default function Ajustes() {
  const { matches, replaceAll } = useMatchesCtx();
  const toast = useToast();
  const { mode, setMode } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [askWipe, setAskWipe] = useState(false);

  function handleExport() {
    const blob = new Blob([exportJSON(matches)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `lanus-tracker-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.show('Datos exportados');
  }

  function handleImport(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = importJSON(String(reader.result ?? ''));
        replaceAll(parsed);
        toast.show(`Importados ${parsed.length} partidos`);
      } catch (e) {
        toast.show(e instanceof Error ? e.message : 'Error al importar', 'error');
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Ajustes</h2>

      <section>
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-neutral-400">
          Apariencia
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {MODES.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setMode(value)}
              className={`btn ${
                mode === value
                  ? 'bg-granate text-white'
                  : 'border border-gray-300 bg-white text-gray-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200'
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-neutral-400">
          Backup
        </h3>
        <div className="card border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-xs text-amber-800 dark:text-amber-300">
            ⚠️ En iOS, si borrás la app del inicio se pierden todos los datos. Exportá seguido y guardá el archivo en iCloud o Fotos.
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="btn-primary" onClick={handleExport}>
            <Download className="h-4 w-4" /> Exportar
          </button>
          <button className="btn-secondary" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-4 w-4" /> Importar
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImport(file);
            e.target.value = '';
          }}
        />
      </section>

      <section>
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-neutral-400">
          Zona peligrosa
        </h3>
        <button
          className="btn w-full bg-loss text-white hover:opacity-90"
          onClick={() => setAskWipe(true)}
          disabled={matches.length === 0}
        >
          <Trash2 className="h-4 w-4" /> Borrar todos los datos
        </button>
      </section>

      <p className="text-center text-[11px] text-gray-400 dark:text-neutral-600">
        Lanús Tracker · {matches.length} {matches.length === 1 ? 'partido' : 'partidos'}
      </p>

      <ConfirmDialog
        open={askWipe}
        title="¿Borrar todos los datos?"
        description="Vas a perder todos los partidos cargados. Hacé un backup antes si los querés conservar."
        destructive
        confirmLabel="Borrar todo"
        onConfirm={() => {
          replaceAll([]);
          setAskWipe(false);
          toast.show('Datos borrados');
        }}
        onCancel={() => setAskWipe(false)}
      />
    </div>
  );
}
