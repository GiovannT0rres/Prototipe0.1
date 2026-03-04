import { useState } from 'react';
import { ArrowLeft, Camera, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { StepIndicator } from './StepIndicator';

interface Props {
  isNewDriver: boolean;
  onApproved: (plate: string) => void;
  onBack: () => void;
}

type State = 'input' | 'loading' | 'approved' | 'reproved';

export function VehicleScreen({ isNewDriver, onApproved, onBack }: Props) {
  const [plate, setPlate] = useState('');
  const [state, setState] = useState<State>('input');
  const [observation, setObservation] = useState('');

  const handleValidate = () => {
    if (!plate.trim()) return;
    setState('loading');
    setTimeout(() => setState('approved'), 1600);
  };

  const handleReset = () => {
    setState('input');
    setPlate('');
    setObservation('');
  };

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#f1f5f9' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 flex items-center" style={{ backgroundColor: '#0f2744' }}>
        <button onClick={onBack} className="p-2 rounded-xl flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
          <ArrowLeft size={18} color="white" />
        </button>
        <div className="flex-1 flex justify-center">
          <StepIndicator currentPhase={3} />
        </div>
        <div style={{ width: 34 }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5">

        {/* Plate Input */}
        {state === 'input' && (
          <div>
            <p className="font-bold text-base mb-3" style={{ color: '#1e293b' }}>Qual a PLACA do veículo?</p>
            <input
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value.toUpperCase().slice(0, 8))}
              onKeyDown={(e) => e.key === 'Enter' && plate.trim() && handleValidate()}
              placeholder="ABC-1234"
              autoFocus
              className="w-full rounded-2xl border-2 px-4 py-4 text-center font-bold outline-none transition-colors focus:border-blue-500"
              style={{ fontSize: 22, letterSpacing: '0.12em', borderColor: '#e2e8f0', backgroundColor: 'white', color: '#1e293b' }}
            />
          </div>
        )}

        {/* Loading */}
        {state === 'loading' && (
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <Loader2 size={36} color="#2563eb" className="animate-spin" />
            <p className="text-sm font-semibold" style={{ color: '#1e293b' }}>Consultando base de dados...</p>
            <p className="text-xs" style={{ color: '#94a3b8' }}>Verificando restrições e alertas de segurança</p>
          </div>
        )}

        {/* Approved — plain white, no green card */}
        {state === 'approved' && (
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-bold text-lg" style={{ color: '#1e293b' }}>Este é o veículo CORRETO?</p>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              {[
                { label: 'Placa', value: plate },
                { label: 'Tipo', value: 'Carreta 3/4' },
                { label: 'Cor', value: 'Branco' },
              ].map((item, i, arr) => (
                <div key={item.label} className="px-4 py-3 flex items-center justify-between"
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                  <p className="text-sm" style={{ color: '#64748b' }}>{item.label}</p>
                  <p className="text-sm font-bold" style={{ color: '#1e293b', letterSpacing: item.label === 'Placa' ? '0.08em' : 0 }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={() => onApproved(plate)}
                className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80"
                style={{ backgroundColor: '#16a34a' }}>
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} />
                  CONFIRMAR
                </span>
              </button>
              <button onClick={() => setState('reproved')}
                className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80"
                style={{ backgroundColor: '#ef4444' }}>
                <span className="flex items-center justify-center gap-2">
                  <XCircle size={18} />
                  RECUSAR
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Reproved Form */}
        {state === 'reproved' && (
          <div className="flex flex-col gap-5">
            <p className="text-sm" style={{ color: '#64748b' }}>
              Capture uma foto do veículo e adicione uma observação (opcional).
            </p>
            <div>
              <label className="text-sm font-semibold block mb-2" style={{ color: '#475569' }}>Foto do Veículo</label>
              <button className="w-full h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 hover:bg-slate-50"
                style={{ borderColor: '#cbd5e1', color: '#64748b' }}>
                <div className="p-2.5 rounded-full" style={{ backgroundColor: '#f1f5f9' }}>
                  <Camera size={22} color="#64748b" />
                </div>
                <span className="text-sm font-semibold">Tirar Foto</span>
              </button>
            </div>
            <div>
              <label className="text-sm font-semibold block mb-2" style={{ color: '#475569' }}>Observação (Opcional)</label>
              <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Ex: Motorista não apresentou documentação adequada..."
                className="w-full rounded-2xl border-2 px-4 py-3 outline-none resize-none h-28"
                style={{ borderColor: '#e2e8f0', color: '#1e293b', fontSize: 14 }}
              />
            </div>
            <div className="flex gap-3">
              <button onClick={handleReset}
                className="flex-1 py-4 rounded-2xl font-bold text-sm border-2 transition-opacity active:opacity-80"
                style={{ borderColor: '#cbd5e1', color: '#64748b' }}>
                Cancelar
              </button>
              <button onClick={() => onBack()}
                className="flex-1 py-4 rounded-2xl font-bold text-sm text-white transition-opacity active:opacity-80"
                style={{ backgroundColor: '#ef4444' }}>
                Registrar Inconsistência
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer — Avançar only for input state */}
      {state === 'input' && (
        <div className="flex-shrink-0 p-4 bg-white" style={{ borderTop: '1px solid #f1f5f9' }}>
          <button onClick={handleValidate} disabled={!plate.trim()}
            className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80 disabled:opacity-40"
            style={{ backgroundColor: '#16a34a' }}>
            Avançar
          </button>
        </div>
      )}
    </div>
  );
}
