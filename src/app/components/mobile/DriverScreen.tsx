import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

interface Props {
  plate: string;
  onConfirm: (driverName: string, driverCpf: string, score: number) => void;
  onBack: () => void;
}

const OK_DRIVER = {
  name: 'João Carlos Silva',
  score: 1500, // Score abaixo de 2000 = OK
};

const HIGH_RISK_DRIVER = {
  name: 'Pedro Oliveira Nunes',
  score: 9999, // Score acima de 2000 = Mandato/Roubo
};

export function DriverScreen({ plate, onConfirm, onBack }: Props) {
  const [doc, setDoc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleValidate = () => {
    if (!doc.trim()) return;
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      // Simula a busca: CPF começando com 999 retorna score alto
      const driver = doc.replace(/\D/g, '').startsWith('999') ? HIGH_RISK_DRIVER : OK_DRIVER;
      onConfirm(driver.name, doc, driver.score);
    }, 1800);
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
          <p className="text-sm mt-1" style={{ color: '#64748b' }}>Informe o CPF do condutor.</p>
        </div>

        <div>
          <label className="text-sm font-semibold block mb-2" style={{ color: '#475569' }}>CPF do Motorista</label>
          <input
            type="text"
            value={doc}
            onChange={(e) => setDoc(e.target.value)}
            placeholder="000.000.000-00"
            disabled={isLoading}
            className="w-full rounded-2xl border-2 px-4 py-4 text-center font-bold outline-none transition-colors focus:border-blue-500"
            style={{ fontSize: 18, letterSpacing: '0.1em', borderColor: '#e2e8f0', backgroundColor: 'white', color: '#1e293b' }}
          />
        </div>

        {isLoading && (
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <Loader2 size={36} color="#2563eb" className="animate-spin" />
            <p className="text-sm font-semibold" style={{ color: '#1e293b' }}>Buscando dados no sistema...</p>
          </div>
        )}

        {!isLoading && (
          <div className="rounded-xl px-4 py-3" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <p className="text-xs" style={{ color: '#1d4ed8' }}>
              💡 <span style={{ fontWeight: 600 }}>Dica:</span> Inicie com <span style={{ fontWeight: 700 }}>"999"</span> para simular bloqueio por Score. Outros CPFs vão para a validação.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 bg-white" style={{ borderTop: '1px solid #f1f5f9' }}>
        <button
          onClick={handleValidate}
          disabled={!doc.trim() || isLoading}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80 disabled:opacity-50"
          style={{ backgroundColor: doc.trim() && !isLoading ? '#2563eb' : '#cbd5e1' }}
        >
          {isLoading ? 'Aguarde...' : 'Continuar'}
        </button>
      </div>
    </div>
  );
}