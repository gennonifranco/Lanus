import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MatchForm } from '../components/form/MatchForm';
import { useMatchesCtx } from '../app/MatchesContext';
import { useToast } from '../components/ui/Toast';

export default function Cargar() {
  const { addMatch } = useMatchesCtx();
  const toast = useToast();
  const nav = useNavigate();
  const [historical, setHistorical] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Cargar partido a mano</h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-neutral-400">
          Para partidos previos a 2025, amistosos o cualquier partido que no esté en Fixtures.
        </p>
      </div>

      <MatchForm
        allowFuture={historical}
        submitLabel={historical ? 'Guardar histórico' : 'Guardar partido'}
        onSubmit={(data) => {
          addMatch(data);
          toast.show('Partido guardado');
          nav('/partidos');
        }}
      />

      <button
        type="button"
        className="btn-ghost w-full text-xs"
        onClick={() => setHistorical((v) => !v)}
      >
        {historical ? 'Restringir a fechas pasadas' : 'Permitir cargar partido con fecha futura'}
      </button>
    </div>
  );
}
