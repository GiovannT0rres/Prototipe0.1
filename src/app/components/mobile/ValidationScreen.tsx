import { useState } from 'react';
import { ArrowLeft, ShieldQuestion, AlertCircle } from 'lucide-react';

interface Props {
  driverName: string;
  driverCpf: string;
  onSuccess: () => void;
  onFail: (reason: string) => void;
  onBack: () => void;
}

const MOTHER_OPTIONS = ['Maria Silva', 'Ana Costa', 'Joana Santos', 'Beatriz Lima'];
const MONTH_OPTIONS = ['Janeiro', 'Abril', 'Agosto', 'Novembro'];

export function ValidationScreen({ driverName, driverCpf, onSuccess, onFail, onBack }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMother, setSelectedMother] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [errorCount, setErrorCount] = useState(0);

  const handleVerify = () => {
    // Respostas corretas
    const isMotherCorrect = selectedMother === 'Maria Silva';
    const isMonthCorrect = selectedMonth === 'Abril';

    if (isMotherCorrect && isMonthCorrect) {
      onSuccess();
    } else {
      const newErrorCount = errorCount + 1;
      setErrorCount(newErrorCount);
      
      if (newErrorCount >= 2) {
        onFail("Acesso negado: Limite de tentativas de segurança excedido.");
      } else {
        // Errou na primeira tentativa: reseta tudo e volta para a pergunta 1
        setStep(1);
        setSelectedMother(null);
        setSelectedMonth(null);
      }
    }
  };

  const handleBackClick = () => {
    if (step === 2) {
      setStep(1); // Se está na pergunta 2, volta para a pergunta 1
    } else {
      onBack(); // Se está na pergunta 1, volta para a tela do motorista
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#f1f5f9' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-4 flex items-center gap-3" style={{ backgroundColor: '#0f2744' }}>
        <button onClick={handleBackClick} className="p-2 rounded-xl flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
          <ArrowLeft size={19} color="white" />
        </button>
        <div className="flex-1">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Check-in · Validação ({step}/2)
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
          <p className="text-xs font-semibold text-blue-600 mb-0.5">Motorista Identificado</p>
          <p className="text-sm text-slate-700 font-medium">{driverName}</p>
          <p className="text-xs text-slate-500">CPF: {driverCpf}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">
        
        {errorCount > 0 && step === 1 && (
          <div className="bg-red-50 p-4 rounded-xl border border-red-200 flex items-start gap-3 mb-2">
            <AlertCircle color="#dc2626" size={20} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-700">Respostas incorretas</p>
              <p className="text-xs text-red-600 mt-1">Atenção: Você tem apenas mais {2 - errorCount} tentativa(s).</p>
            </div>
          </div>
        )}

        {/* ETAPA 1: Nome da Mãe */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-sm font-semibold mb-4 text-slate-700">Qual o nome da sua mãe?</p>
            <div className="flex flex-col gap-3">
              {MOTHER_OPTIONS.map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedMother(name)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-colors ${
                    selectedMother === name 
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold shadow-sm' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
            
            <div className="rounded-xl px-4 py-3 mt-6" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <p className="text-xs text-blue-700">
                💡 <span className="font-semibold">Dica:</span> A resposta correta é "Maria Silva".
              </p>
            </div>
          </div>
        )}

        {/* ETAPA 2: Mês de Nascimento */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-sm font-semibold mb-4 text-slate-700">Qual o seu mês de nascimento?</p>
            <div className="grid grid-cols-2 gap-3">
              {MONTH_OPTIONS.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`w-full text-center px-4 py-6 rounded-xl border-2 transition-colors ${
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
                💡 <span className="font-semibold">Dica:</span> A resposta correta é "Abril".
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 bg-white" style={{ borderTop: '1px solid #f1f5f9' }}>
        {step === 1 ? (
          <button
            onClick={() => setStep(2)}
            disabled={!selectedMother}
            className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: selectedMother ? '#2563eb' : '#cbd5e1' }}
          >
            Próxima Pergunta →
          </button>
        ) : (
          <button
            onClick={handleVerify}
            disabled={!selectedMonth}
            className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: selectedMonth ? '#16a34a' : '#cbd5e1' }}
          >
            Validar Identidade
          </button>
        )}
      </div>
    </div>
  );
}