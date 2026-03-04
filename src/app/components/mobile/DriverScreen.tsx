import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2, ChevronRight } from 'lucide-react';

interface Props {
  plate: string;
  onConfirm: (driverName: string, driverCpf: string, isNewDriver: boolean) => void;
  onBack: () => void;
}

const EXISTING_DRIVER = {
  name: 'João Carlos Silva',
  isNew: false, 
};

const NEW_DRIVER = {
  name: 'Pedro Henrique Santos',
  isNew: true,
};

export function DriverScreen({ plate, onConfirm, onBack }: Props) {
  const [doc, setDoc] = useState('');
  const [step, setStep] = useState<'input' | 'loading'>('input');

  const handleValidate = () => {
    if (!doc.trim()) return;
    setStep('loading');
    
    setTimeout(() => {
      const numericDoc = doc.replace(/\D/g, '');
      const driver = numericDoc === '1234' ? EXISTING_DRIVER : NEW_DRIVER;
      onConfirm(driver.name, doc, driver.isNew);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#f1f5f9' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-4 flex items-center gap-3" style={{ backgroundColor: '#0f2744' }}>
        <button onClick={onBack} className="p-2 rounded-xl flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
          <ArrowLeft size={19} color="white" />
        </button>
        <div className="flex-1">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Check-in · Etapa 2 de 3</p>
          <p className="font-semibold text-white text-sm">Dados do Motorista</p>
        </div>
      </div>

      {/* Vehicle banner */}
      <div className="flex-shrink-0 px-4 py-3 flex items-center gap-3" style={{ backgroundColor: '#1e3a5f' }}>
        <CheckCircle2 size={16} color="#4ade80" />
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>Placa do Veículo:</p>
        <span className="text-xs font-bold text-white px-2 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em' }}>
          {plate}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5">
        <div>
          <label className="text-sm font-semibold block mb-2" style={{ color: '#475569' }}>Qual o CPF do Motorista?</label>
          <div className="relative">
            <input
              type="text"
              value={doc}
              onChange={(e) => setDoc(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && doc.trim() && handleValidate()}
              placeholder="000.000.000-00"
              disabled={step !== 'input'}
              className="w-full rounded-2xl border-2 px-4 py-4 text-center font-bold outline-none transition-colors focus:border-blue-500"
              style={{ fontSize: 18, letterSpacing: '0.1em', borderColor: '#e2e8f0', backgroundColor: 'white', color: '#1e293b' }}
            />
            {step === 'input' && (
              <button
                onClick={handleValidate}
                disabled={!doc.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-xl shadow-sm transition-opacity active:opacity-80 disabled:opacity-100"
                style={{ backgroundColor: doc.trim() ? '#2563eb' : '#e2e8f0', color: doc.trim() ? 'white' : '#94a3b8' }}
                title="Continuar"
              >
                <ChevronRight size={24} strokeWidth={3} />
              </button>
            )}
          </div>
        </div>

        {step === 'loading' && (
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <Loader2 size={36} color="#2563eb" className="animate-spin" />
            <p className="text-sm font-semibold" style={{ color: '#1e293b' }}>Analisando dados no sistema...</p>
          </div>
        )}



        {step === 'input' && (
          <div className="rounded-xl px-4 py-3" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <p className="text-xs" style={{ color: '#1d4ed8' }}>
              💡 <span style={{ fontWeight: 600 }}>Dica do Protótipo:</span> Digite o CPF <span style={{ fontWeight: 700 }}>"1234"</span> para simular um motorista <span style={{ fontWeight: 700 }}>CADASTRADO</span>. Qualquer outro CPF será considerado <span style={{ fontWeight: 700 }}>NÃO CADASTRADO</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}