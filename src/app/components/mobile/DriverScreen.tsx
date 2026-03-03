import { useState } from 'react';
import { ArrowLeft, CheckCircle2, UserCheck, Loader2 } from 'lucide-react';

interface Props {
  plate: string;
  onConfirm: (driverName: string, score: number) => void;
  onBack: () => void;
}

type State = 'idle' | 'loading' | 'approved' | 'low-score';

const APPROVED_DRIVER = {
  name: 'João Carlos Silva',
  cnh: '12345 678901',
  category: 'E',
  score: 92,
  infractions: 0,
};

const LOW_SCORE_DRIVER = {
  name: 'Pedro Oliveira Nunes',
  cnh: '98765 432100',
  category: 'B',
  score: 28,
  infractions: 3,
};

export function DriverScreen({ plate, onConfirm, onBack }: Props) {
  const [doc, setDoc] = useState('');
  const [state, setState] = useState<State>('idle');

  const handleValidate = () => {
    if (!doc.trim()) return;
    setState('loading');
    setTimeout(() => {
      setState(doc.replace(/\D/g, '').startsWith('000') ? 'low-score' : 'approved');
    }, 1800);
  };

  const driver = state === 'low-score' ? LOW_SCORE_DRIVER : APPROVED_DRIVER;

  const scoreColor =
    driver.score >= 70 ? '#16a34a' : driver.score >= 40 ? '#f59e0b' : '#dc2626';
  const scoreBg =
    driver.score >= 70 ? '#f0fdf4' : driver.score >= 40 ? '#fffbeb' : '#fff1f2';
  const scoreBorder =
    driver.score >= 70 ? '#16a34a' : driver.score >= 40 ? '#f59e0b' : '#dc2626';
  const scoreLabel =
    driver.score >= 70 ? 'Alto' : driver.score >= 40 ? 'Médio' : 'Baixo';

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#f1f5f9' }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 py-4 flex items-center gap-3"
        style={{ backgroundColor: '#0f2744' }}
      >
        <button
          onClick={onBack}
          className="p-2 rounded-xl flex-shrink-0"
          style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
        >
          <ArrowLeft size={19} color="white" />
        </button>
        <div className="flex-1">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Check-in · Etapa 2 de 3
          </p>
          <p className="font-semibold text-white text-sm">Dados do Motorista</p>
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: '#22c55e', color: 'white' }}
          >
            ✓
          </div>
          <div className="w-5 h-0.5 rounded" style={{ backgroundColor: '#22c55e' }} />
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: '#2563eb' }}
          >
            2
          </div>
          <div className="w-5 h-0.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }} />
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            3
          </div>
        </div>
      </div>

      {/* Vehicle banner */}
      <div
        className="flex-shrink-0 px-4 py-3 flex items-center gap-3"
        style={{ backgroundColor: '#1e3a5f' }}
      >
        <CheckCircle2 size={16} color="#4ade80" />
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Veículo regular:
        </p>
        <span
          className="text-xs font-bold text-white px-2 py-1 rounded-lg"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em' }}
        >
          {plate}
        </span>
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
          · Carreta 3/4
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5">
        <div>
          <p className="font-semibold text-base" style={{ color: '#1e293b', lineHeight: 1.4 }}>
            Identificação do Condutor
          </p>
          <p className="text-sm mt-1" style={{ color: '#64748b' }}>
            Informe o CPF ou número da CNH do condutor.
          </p>
        </div>

        {/* Doc input */}
        <div>
          <label className="text-sm font-semibold block mb-2" style={{ color: '#475569' }}>
            CPF / Número da CNH
          </label>
          <input
            type="text"
            value={doc}
            onChange={(e) => setDoc(e.target.value.slice(0, 14))}
            placeholder="000.000.000-00"
            disabled={state !== 'idle'}
            className="w-full rounded-2xl border-2 px-4 py-4 text-center font-bold outline-none transition-colors"
            style={{
              fontSize: 18,
              letterSpacing: '0.1em',
              borderColor:
                state === 'approved'
                  ? '#16a34a'
                  : state === 'low-score'
                  ? '#f59e0b'
                  : state === 'loading'
                  ? '#2563eb'
                  : '#e2e8f0',
              backgroundColor: 'white',
              color: '#1e293b',
            }}
          />
        </div>

        {/* Loading */}
        {state === 'loading' && (
          <div
            className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
          >
            <Loader2 size={36} color="#2563eb" className="animate-spin" />
            <p className="text-sm font-semibold" style={{ color: '#1e293b' }}>
              Consultando histórico do motorista...
            </p>
            <p className="text-xs" style={{ color: '#94a3b8' }}>
              Verificando score e infrações
            </p>
          </div>
        )}

        {/* Result card */}
        {(state === 'approved' || state === 'low-score') && (
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: scoreBg, border: `2px solid ${scoreBorder}` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
              >
                {state === 'approved' ? (
                  <UserCheck size={22} color="#16a34a" />
                ) : (
                  <span style={{ fontSize: 20 }}>⚠️</span>
                )}
              </div>
              <div>
                <p
                  className="font-bold text-base"
                  style={{ color: scoreColor, lineHeight: 1.3 }}
                >
                  {state === 'approved'
                    ? '✅ Usuário OK'
                    : '⚠️ Score Baixo — Atenção'}
                </p>
                <p className="text-sm" style={{ color: '#475569' }}>
                  {driver.name}
                </p>
              </div>
            </div>

            {/* Score bar */}
            <div
              className="bg-white rounded-xl p-3 mb-3"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs" style={{ color: '#64748b' }}>
                  Score de Segurança
                </span>
                <span className="text-sm font-bold" style={{ color: scoreColor }}>
                  {driver.score}/100 · {scoreLabel}
                </span>
              </div>
              <div
                className="h-3 rounded-full"
                style={{ backgroundColor: '#e2e8f0' }}
              >
                <div
                  className="h-3 rounded-full transition-all"
                  style={{
                    width: `${driver.score}%`,
                    backgroundColor: scoreColor,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'CNH', value: driver.cnh },
                { label: 'Categoria', value: driver.category },
                { label: 'Infrações', value: `${driver.infractions} ocorrência(s)` },
                { label: 'Validade CNH', value: '12/2028' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl px-3 py-2">
                  <p className="text-xs" style={{ color: '#64748b' }}>
                    {item.label}
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color:
                        item.label === 'Infrações' && driver.infractions > 0
                          ? '#dc2626'
                          : '#1e293b',
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hint */}
        {state === 'idle' && (
          <div
            className="rounded-xl px-4 py-3"
            style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}
          >
            <p className="text-xs" style={{ color: '#1d4ed8' }}>
              💡 <span style={{ fontWeight: 600 }}>Dica:</span> Use{' '}
              <span style={{ fontWeight: 700 }}>"000.000.000-00"</span> para simular um
              motorista com score baixo.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 bg-white" style={{ borderTop: '1px solid #f1f5f9' }}>
        {state === 'idle' && (
          <button
            onClick={handleValidate}
            disabled={!doc.trim()}
            className="w-full py-4 rounded-2xl font-bold text-base text-white"
            style={{
              backgroundColor: doc.trim() ? '#2563eb' : '#cbd5e1',
              cursor: doc.trim() ? 'pointer' : 'default',
            }}
          >
            Consultar Motorista
          </button>
        )}
        {state === 'loading' && (
          <button
            disabled
            className="w-full py-4 rounded-2xl font-bold text-base text-white"
            style={{ backgroundColor: '#94a3b8' }}
          >
            Consultando...
          </button>
        )}
        {state === 'approved' && (
          <button
            onClick={() => onConfirm(APPROVED_DRIVER.name, APPROVED_DRIVER.score)}
            className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80"
            style={{ backgroundColor: '#16a34a' }}
          >
            ✓ Confirmar Entrada
          </button>
        )}
        {state === 'low-score' && (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onConfirm(LOW_SCORE_DRIVER.name, LOW_SCORE_DRIVER.score)}
              className="w-full py-3.5 rounded-2xl font-bold text-sm border-2 transition-opacity active:opacity-80"
              style={{ borderColor: '#f59e0b', color: '#b45309', backgroundColor: '#fffbeb' }}
            >
              Autorizar com Ressalva
            </button>
            <button
              onClick={onBack}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-opacity active:opacity-80"
              style={{ backgroundColor: '#dc2626' }}
            >
              Negar Acesso
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
