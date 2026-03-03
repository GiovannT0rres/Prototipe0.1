import { useState } from 'react';
import { ArrowLeft, ShieldQuestion } from 'lucide-react';

interface Props {
  driverName: string;
  driverCpf: string;
  onSuccess: () => void;
  onBack: () => void;
}

const MONTH_OPTIONS = ['1', '4', '8', 'Nenhuma das opções'];

export function ValidationScreen({ driverName, driverCpf, onSuccess, onBack }: Props) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const handleVerify = () => {
    // Usuário sempre passa
    onSuccess();
  };

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#f1f5f9' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-4 flex items-center gap-3" style={{ backgroundColor: '#0f2744' }}>
        <button onClick={onBack} className="p-2 rounded-xl flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
          <ArrowLeft size={19} color="white" />
        </button>
        <div className="flex-1">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Check-in · Validação
          </p>
          <p className="font-semibold text-white text-sm">Confirmação de Identidade</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex-shrink-0 px-4 py-4 flex items-center gap-4 bg-white" style={{ borderBottom: '1px solid #e2e8f0' }}>
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <ShieldQuestion size={24} color="#2563eb" />
        </div>
        <div>
          <p className="text-xs font-semibold text-blue-600 mb-0.5">{driverName === 'Motorista Não Cadastrado' ? 'Criação de Cadastro' : 'Motorista Identificado'}</p>
          <p className="text-sm text-slate-700 font-medium">{driverName === 'Motorista Não Cadastrado' ? 'Não cadastrado' : driverName}</p>
          <p className="text-xs text-slate-500">CPF: {driverCpf}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">

        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <p className="text-sm font-semibold mb-4 text-slate-700">Qual o seu mês de nascimento?</p>
          <div className="flex flex-col gap-3">
            {MONTH_OPTIONS.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-colors ${
                  selectedMonth === month 
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold shadow-sm' 
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
          
          <div className="rounded-xl px-4 py-3 mt-6" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <p className="text-xs text-blue-700">
              💡 <span className="font-semibold">Dica:</span> Qualquer resposta será aceita no protótipo.
            </p>
          </div>
        </div>
        
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 bg-white" style={{ borderTop: '1px solid #f1f5f9' }}>
        <button
          onClick={handleVerify}
          disabled={!selectedMonth}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80 disabled:opacity-50"
          style={{ backgroundColor: selectedMonth ? '#16a34a' : '#cbd5e1' }}
        >
          Validar Identidade
        </button>
      </div>
    </div>
  );
}