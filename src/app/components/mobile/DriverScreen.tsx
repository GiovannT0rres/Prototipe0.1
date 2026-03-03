import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

interface Props {
  plate: string;
  onConfirm: (driverName: string, driverCpf: string, score: number) => void;
  onReject: () => void;
  onBack: () => void;
}

const OK_DRIVER = {
  name: 'João Carlos Silva',
  score: 1500, 
};

const HIGH_RISK_DRIVER = {
  name: 'Pedro Oliveira Nunes',
  score: 9999,
};

export function DriverScreen({ plate, onConfirm, onReject, onBack }: Props) {
  const [doc, setDoc] = useState('');
  const [step, setStep] = useState<'input' | 'loading' | 'warning'>('input');
  const [currentDriver, setCurrentDriver] = useState<typeof OK_DRIVER | null>(null);

  const handleValidate = () => {
    if (!doc.trim()) return;
    setStep('loading');
    
    setTimeout(() => {
      const numericDoc = doc.replace(/\D/g, '');
      const driver = numericDoc.startsWith('999') ? HIGH_RISK_DRIVER : OK_DRIVER;
      
      if (driver.score > 2000) {
        setCurrentDriver(driver);
        setStep('warning');
      } else {
        onConfirm(driver.name, doc, driver.score);
      }
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
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Check-in · Etapa 2 de 4</p>
          <p className="font-semibold text-white text-sm">Dados do Motorista</p>
        </div>
      </div>

      {/* Vehicle banner */}
      <div className="flex-shrink-0 px-4 py-3 flex items-center gap-3" style={{ backgroundColor: '#1e3a5f' }}>
        <CheckCircle2 size={16} color="#4ade80" />
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>Veículo regular:</p>
        <span className="text-xs font-bold text-white px-2 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em' }}>
          {plate}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5">
        <div>
          <p className="font-semibold text-base" style={{ color: '#1e293b', lineHeight: 1.4 }}>Identificação do Condutor</p>
          <p className="text-sm mt-1" style={{ color: '#64748b' }}>Informe o CPF do condutor para verificação de segurança sistêmica.</p>
        </div>

        <div>
          <label className="text-sm font-semibold block mb-2" style={{ color: '#475569' }}>Qual o CPF do Motorista?</label>
          <input
            type="text"
            value={doc}
            onChange={(e) => setDoc(e.target.value)}
            placeholder="000.000.000-00"
            disabled={step !== 'input'}
            className="w-full rounded-2xl border-2 px-4 py-4 text-center font-bold outline-none transition-colors focus:border-blue-500"
            style={{ fontSize: 18, letterSpacing: '0.1em', borderColor: '#e2e8f0', backgroundColor: 'white', color: '#1e293b' }}
          />
        </div>

        {step === 'loading' && (
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <Loader2 size={36} color="#2563eb" className="animate-spin" />
            <p className="text-sm font-semibold" style={{ color: '#1e293b' }}>Analisando dados no sistema...</p>
          </div>
        )}

        {step === 'warning' && currentDriver && (
          <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ backgroundColor: '#fff1f2', border: '2px solid #dc2626' }}>
            <div>
              <p className="font-bold text-base" style={{ color: '#b91c1c' }}>Aviso do Sistema</p>
              <p className="text-sm mt-1" style={{ color: '#dc2626' }}>
                Foram encontradas <span className="font-bold">restrições de segurança ou alertas</span> para o CPF informado.
              </p>
            </div>
            
            <div className="bg-white rounded-xl px-3 py-2 border" style={{ borderColor: '#fecaca' }}>
              <p className="text-xs font-medium" style={{ color: '#b91c1c' }}>Nome Registrado</p>
              <p className="text-sm font-bold" style={{ color: '#991b1b' }}>{currentDriver.name}</p>
            </div>

            <p className="text-sm font-semibold" style={{ color: '#b91c1c' }}>
              A entrada está bloqueada por padrão. Como deseja prosseguir?
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => onConfirm(currentDriver.name, doc, currentDriver.score)}
                className="w-full py-4 rounded-2xl font-bold text-base bg-white transition-opacity active:opacity-80"
                style={{ border: '2px solid #16a34a', color: '#16a34a' }}
              >
                Liberar Acesso (Exceção)
              </button>
              <button
                onClick={onReject}
                className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80"
                style={{ backgroundColor: '#dc2626' }}
              >
                Manter Bloqueio e Recusar
              </button>
            </div>
          </div>
        )}

        {step === 'input' && (
          <div className="rounded-xl px-4 py-3" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <p className="text-xs" style={{ color: '#1d4ed8' }}>
              💡 <span style={{ fontWeight: 600 }}>Dica do Protótipo:</span> Inicie o CPF com <span style={{ fontWeight: 700 }}>"999"</span> para o sistema reprovar o motorista secretamente. Qualquer outro número avançará para a tela de perguntas.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {step === 'input' && (
        <div className="flex-shrink-0 p-4 bg-white" style={{ borderTop: '1px solid #f1f5f9' }}>
          <button
            onClick={handleValidate}
            disabled={!doc.trim()}
            className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: doc.trim() ? '#2563eb' : '#cbd5e1' }}
          >
            Continuar
          </button>
        </div>
      )}
      {step === 'loading' && (
        <div className="flex-shrink-0 p-4 bg-white" style={{ borderTop: '1px solid #f1f5f9' }}>
          <button
            disabled
            className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: '#cbd5e1' }}
          >
            Aguarde...
          </button>
        </div>
      )}
    </div>
  );
}