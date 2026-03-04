import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Lightbulb } from 'lucide-react';
import { StepIndicator } from './StepIndicator';

interface Props {
  driverName: string;
  onSuccess: () => void;
  onFail: () => void;
  onBack: () => void;
}

const FAKE_NAMES = [
  'Carlos Eduardo Melo',
  'Antônio Ricardo Faria',
  'Lucas Felipe Borges',
  'Marcos Vinicius Rocha',
  'Rafael Augusto Lima',
  'Sérgio Paulo Neves',
  'Diego Henrique Lopes',
  'Fernando José Costa',
];

const NONE_OPTION = 'Nenhuma das opções';

function buildOptions(correct: string): string[] {
  const fakes = FAKE_NAMES.filter((n) => n !== correct)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  return [...[...fakes, correct].sort(() => Math.random() - 0.5), NONE_OPTION];
}

export function IdentityPickScreen({ driverName, onSuccess, onFail, onBack }: Props) {
  const [options] = useState<string[]>(() => buildOptions(driverName));
  const [selected, setSelected] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleAdvance = () => {
    if (!selected || isError) return;
    
    if (selected === NONE_OPTION || selected !== driverName) {
      setIsError(true);
      setTimeout(() => {
        onFail();
      }, 2000);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#f1f5f9' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 flex items-center" style={{ backgroundColor: '#0f2744' }}>
        <button onClick={onBack} className="p-2 rounded-xl flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
          <ArrowLeft size={18} color="white" />
        </button>
        <div className="flex-1 flex justify-center">
          <StepIndicator currentPhase={1} />
        </div>
        <div style={{ width: 34 }} />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 flex flex-col gap-3 overflow-hidden">
        {/* Question */}
        <div>
          <p className="font-bold text-base" style={{ color: '#1e293b' }}>
            Qual é o NOME COMPLETO
          </p>
          <p className="font-bold text-base" style={{ color: '#1e293b' }}>
            do motorista?
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2 flex-1">
          {options.map((name, idx) => {
            const isSelected = selected === name;
            const isNone = name === NONE_OPTION;
            return (
              <button
                key={name}
                onClick={() => setSelected(name)}
                className="w-full rounded-2xl px-4 py-4 flex items-center gap-3 text-left transition-all"
                style={{
                  backgroundColor: isSelected ? '#16a34a' : 'white',
                  border: isSelected
                    ? '3px solid #000000f8'
                    : '3px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >

                <p className="flex-1 font-semibold text-sm" style={{ color: isSelected ? '#ffffff' : '#1e293b' }}>
                  {name}
                </p>
              </button>
            );
          })}
        </div>

        {/* Hint */}
        <div className="rounded-xl px-3 py-2.5 flex items-start gap-2" style={{ backgroundColor: '#fefce8', border: '1px solid #fde68a' }}>
          <Lightbulb size={13} color="#d97706" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: '#92400e' }}>
            <span style={{ fontWeight: 700 }}>Dica:</span> Resposta correta:{' '}
            <span style={{ fontWeight: 700, color: '#d97706' }}>"{driverName}"</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-4 pb-4 pt-2 bg-white" style={{ borderTop: '1px solid #f1f5f9' }}>
        <button
          onClick={handleAdvance}
          disabled={!selected || isError}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all active:opacity-80 disabled:opacity-40"
          style={{ backgroundColor: isError ? '#ef4444' : '#16a34a' }}
        >
          {isError ? 'Incorreto' : 'Avançar'}
        </button>
      </div>
    </div>
  );
}
