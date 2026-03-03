import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, CheckCircle2, Loader2 } from 'lucide-react';

interface Props {
  initialPlate?: string;
  onApproved: (plate: string) => void;
  onBack: () => void;
}

type State = 'loading' | 'approved' | 'reproved';

export function VehicleScreen({ initialPlate = '', onApproved, onBack }: Props) {
  const [plate, setPlate] = useState(initialPlate);
  const [state, setState] = useState<State>('loading');
  const [observation, setObservation] = useState('');

  // Auto-validate if plate is initially provided from Home Screen
  useEffect(() => {
    if (state === 'loading') {
      const timer = setTimeout(() => {
        setState('approved');
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [state, plate]);

  const handleReset = () => {
    onBack();
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
            
            <div className="grid grid-cols-1 gap-2">
              {[
                { label: 'Placa', value: plate },
                { label: 'Tipo', value: 'Carreta 3/4' },
                { label: 'Cor', value: 'Branco' },
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
              Registrar Inconsistência
            </button>
          </div>
        )}


      </div>
    </div>
  );
}
