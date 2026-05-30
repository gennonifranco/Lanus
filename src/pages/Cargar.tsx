import { useNavigate } from 'react-router-dom';
import { MatchForm } from '../components/form/MatchForm';
import { useMatchesCtx } from '../app/MatchesContext';
import { useToast } from '../components/ui/Toast';

export default function Cargar() {
  const { addMatch } = useMatchesCtx();
  const toast = useToast();
  const nav = useNavigate();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Cargar partido</h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-neutral-400">
          Para amistosos o partidos que no estén en Fixtures.
        </p>
      </div>

      <MatchForm
        allowFuture
        onSubmit={(data) => {
          addMatch(data);
          toast.show('Partido guardado');
          nav('/partidos');
        }}
      />
    </div>
  );
}
