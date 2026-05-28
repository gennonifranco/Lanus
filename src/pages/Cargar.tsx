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
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{historical ? 'Partido histórico' : 'Cargar partido'}</h2>
        <button
          className="btn-ghost text-xs"
          onClick={() => setHistorical((v) => !v)}
        >
          {historical ? 'Volver a partido reciente' : 'Cargar partido histórico'}
        </button>
      </div>

      <MatchForm
        allowFuture={false}
        onSubmit={(data) => {
          addMatch(data);
          toast.show('Partido guardado');
          nav('/partidos');
        }}
      />
    </div>
  );
}
