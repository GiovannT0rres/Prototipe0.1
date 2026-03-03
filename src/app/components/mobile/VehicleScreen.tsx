import { useState } from 'react';
import { ArrowLeft, Camera, CheckCircle2, AlertOctagon, Loader2 } from 'lucide-react';

interface Props {
  onApproved: (plate: string) => void;
  onBack: () => void;
}

type State = 'idle' | 'loading' | 'approved' | 'blocked' | 'reproved';

export function VehicleScreen({ onApproved, onBack }: Props) {
  const [plate, setPlate] = useState('');
  const [state, setState] = useState<State>('idle');
  const [observation, setObservation] = useState('');

  const handleValidate = () => {
    if (!plate.trim()) return;
    setState('loading');
    setTimeout(() => {
      setState(plate.toUpperCase().includes('ROB') ? 'blocked' : 'approved');
    }, 1600);
  };

  const handleReset = () => {
    setPlate('');
    setState('idle');
    setObservation('');
  };

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
            Check-in · Etapa 1 de 3
          </p>
          <p className="font-semibold text-white text-sm">Dados do Veículo</p>
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: '#2563eb' }}
          >
            1
          </div>
          <div className="w-5 h-0.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }} />
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.45)',
            }}
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5">
        {/* Title and Input */}
        {(state === 'idle' || state === 'loading') && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-semibold text-base" style={{ color: '#1e293b', lineHeight: 1.4 }}>
                Identificação do Veículo
              </p>
              <p className="text-sm mt-1" style={{ color: '#64748b' }}>
                Digite a placa do veículo ou tire uma foto da placa.
              </p>
            </div>

            {/* Plate input */}
            <div>
              <label
                className="text-sm font-semibold block mb-2"
                style={{ color: '#475569' }}
              >
                Placa do Veículo
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value.toUpperCase().slice(0, 8))}
                  placeholder="ABC-1234"
                  disabled={state !== 'idle'}
                  className="w-full rounded-2xl border-2 px-4 py-4 text-center font-bold outline-none transition-colors"
                  style={{
                    fontSize: 24,
                    letterSpacing: '0.2em',
                    borderColor:
                      state === 'loading'
                        ? '#2563eb'
                        : '#e2e8f0',
                    backgroundColor: 'white',
                    color: '#1e293b',
                  }}
                />
                
                {/* Camera button inside input */}
                {state === 'idle' && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
                    style={{ color: '#64748b' }}
                    title="Tirar Foto da Placa"
                  >
                    <Camera size={22} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {state === 'loading' && (
          <div
            className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
          >
            <Loader2 size={36} color="#2563eb" className="animate-spin" />
            <p className="text-sm font-semibold" style={{ color: '#1e293b' }}>
              Consultando base de dados...
            </p>
            <p className="text-xs" style={{ color: '#94a3b8' }}>
              Verificando restrições e alertas de segurança
            </p>
          </div>
        )}

        {/* Approved result */}
        {state === 'approved' && (
          <div
            className="rounded-2xl p-5 flex flex-col gap-5"
            style={{ backgroundColor: '#f0fdf4', border: '2px solid #16a34a' }}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <CheckCircle2 size={48} color="#16a34a" />
              <p className="font-bold text-xl" style={{ color: '#15803d' }}>
                Você confirma a entrada deste veículo?
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Placa', value: plate },
                { label: 'Tipo', value: 'Carreta 3/4' },
                { label: 'Cor', value: 'Branco' },
                { label: 'Ano/Mod.', value: '2022' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl px-3 py-3 border" style={{ borderColor: '#bbf7d0' }}>
                  <p className="text-xs font-medium mb-1" style={{ color: '#16a34a' }}>
                    {item.label}
                  </p>
                  <p className="text-base font-bold" style={{ color: '#15803d' }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => onApproved(plate)}
                className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80"
                style={{ backgroundColor: '#16a34a' }}
              >
                Sim
              </button>
              <button
                onClick={() => setState('reproved')}
                className="w-full py-4 rounded-2xl font-bold text-base bg-white transition-opacity active:opacity-80"
                style={{ border: '2px solid #ef4444', color: '#ef4444' }}
              >
                Não
              </button>
            </div>
          </div>
        )}

        {/* Reproved Form */}
        {state === 'reproved' && (
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-bold text-xl" style={{ color: '#1e293b' }}>
                Registrar Recusa
              </p>
              <p className="text-sm mt-1" style={{ color: '#64748b' }}>
                Capture uma foto do veículo e adicione uma observação (opcional).
              </p>
            </div>

            {/* Photo Capture */}
            <div>
              <label className="text-sm font-semibold block mb-2" style={{ color: '#475569' }}>
                Foto do Veículo
              </label>
              <button 
                className="w-full h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors hover:bg-slate-50"
                style={{ borderColor: '#cbd5e1', color: '#64748b' }}
              >
                <div className="p-3 rounded-full" style={{ backgroundColor: '#f1f5f9' }}>
                  <Camera size={24} color="#64748b" />
                </div>
                <span className="text-sm font-semibold">Tirar Foto</span>
              </button>
            </div>

            {/* Observation */}
            <div>
              <label className="text-sm font-semibold block mb-2" style={{ color: '#475569' }}>
                Observação (Opcional)
              </label>
              <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Ex: Motorista não apresentou documentação adequada..."
                className="w-full rounded-2xl border-2 px-4 py-3 outline-none transition-colors resize-none h-32"
                style={{ borderColor: '#e2e8f0', color: '#1e293b', fontSize: 14 }}
              />
            </div>
          </div>
        )}

        {/* Blocked result */}
        {state === 'blocked' && (
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: '#fff1f2', border: '2px solid #dc2626' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertOctagon size={30} color="#dc2626" />
              <div>
                <p className="font-bold text-base" style={{ color: '#b91c1c' }}>
                  🚨 RESTRIÇÃO ENCONTRADA
                </p>
                <p className="text-sm" style={{ color: '#dc2626' }}>
                  Veículo com alerta ativo
                </p>
              </div>
            </div>
            <div
              className="bg-white rounded-xl px-4 py-3 mb-3"
              style={{ border: '1px solid #fecaca' }}
            >
              <p className="text-xs mb-1" style={{ color: '#94a3b8' }}>
                Tipo de Restrição
              </p>
              <p className="font-bold text-sm" style={{ color: '#b91c1c' }}>
                Roubo / Furto
              </p>
              <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>
                Registrado em: 15/01/2026
              </p>
            </div>
            <p className="text-xs" style={{ color: '#b91c1c' }}>
              ⚠️ Atenção: Não libere o acesso. Acione o procedimento de segurança imediatamente.
            </p>
          </div>
        )}

        {/* Hint */}
        {state === 'idle' && (
          <div
            className="rounded-xl px-4 py-3"
            style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}
          >
            <p className="text-xs" style={{ color: '#1d4ed8' }}>
              💡 <span style={{ fontWeight: 600 }}>Dica do protótipo:</span> Use{' '}
              <span style={{ fontWeight: 700 }}>"ROB-1234"</span> para simular um alerta de
              restrição (roubo/furto).
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="flex-shrink-0 p-4 bg-white"
        style={{ borderTop: '1px solid #f1f5f9' }}
      >
        {state === 'idle' && (
          <button
            onClick={handleValidate}
            disabled={!plate.trim()}
            className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity"
            style={{
              backgroundColor: plate.trim() ? '#2563eb' : '#cbd5e1',
              cursor: plate.trim() ? 'pointer' : 'default',
            }}
          >
            Validar Veículo
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

        {state === 'reproved' && (
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-4 rounded-2xl font-bold text-sm border-2 transition-opacity active:opacity-80"
              style={{ borderColor: '#cbd5e1', color: '#64748b' }}
            >
              Cancelar
            </button>
            <button
              onClick={() => onBack()}
              className="flex-1 py-4 rounded-2xl font-bold text-sm text-white transition-opacity active:opacity-80"
              style={{ backgroundColor: '#ef4444' }}
            >
              Confirmar Recusa
            </button>
          </div>
        )}


        {state === 'blocked' && (
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-4 rounded-2xl font-bold text-sm text-white transition-opacity active:opacity-80"
              style={{ backgroundColor: '#dc2626' }}
            >
              Bloquear Entrada
            </button>
            <button
              onClick={handleReset}
              className="flex-1 py-4 rounded-2xl font-bold text-sm border-2 transition-opacity active:opacity-80"
              style={{ borderColor: '#cbd5e1', color: '#64748b' }}
            >
              Falso Positivo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
