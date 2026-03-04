import { CheckCircle2, LogIn, LogOut, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  type: 'checkin' | 'checkout';
  plate: string;
  driverName?: string;
  entryTime?: string;
  isReceipt?: boolean;
  onNewOperation: () => void;
  onHome: () => void;
}

function generateProtocol() {
  return `#2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

const PROTOCOL = generateProtocol();

export function SuccessScreen({
  type,
  plate,
  driverName,
  entryTime,
  isReceipt = false,
  onNewOperation,
  onHome,
}: Props) {
  useEffect(() => {
    if (isReceipt) return;
    const timer = setTimeout(() => {
      onHome();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onHome, isReceipt]);

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const isCheckin = type === 'checkin';
  const primaryColor = isCheckin ? '#15803d' : '#1d4ed8';
  const lightColor = isCheckin ? '#dcfce7' : '#dbeafe';
  const iconColor = isCheckin ? '#16a34a' : '#2563eb';

  const summaryItems = [
    { label: 'Operação', value: isCheckin ? 'ENTRADA' : 'SAÍDA' },
    { label: 'Placa', value: plate },
    ...(driverName
      ? [{ label: 'Motorista', value: driverName.split(' ').slice(0, 2).join(' ') }]
      : []),
    ...(entryTime ? [{ label: 'Entrada em', value: entryTime }] : []),
    { label: 'Horário', value: timeStr },
    { label: 'Portão', value: 'Norte' },
    { label: 'Protocolo', value: PROTOCOL },
  ];

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: isReceipt ? '#0f2744' : primaryColor }}>
      {/* Header for Receipt Mode */}
      {isReceipt && (
        <div className="flex-shrink-0 px-4 py-3 flex items-center justify-between" style={{ backgroundColor: '#0f2744' }}>
          <button onClick={onHome} className="p-2 rounded-xl flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
            <ArrowLeft size={18} color="white" />
          </button>
          <p className="font-semibold text-white text-sm">Detalhes da Operação</p>
          <div style={{ width: 34 }} />
        </div>
      )}

      {/* Main Container */}
      <div 
        className="flex-1 flex flex-col items-center px-4 pt-1 pb-6 overflow-y-auto"
        style={{ 
          backgroundColor: isReceipt ? '#f1f5f9' : 'transparent',
          justifyContent: isReceipt ? 'flex-start' : 'center'
        }}
      >
        {!isReceipt && (
          <>
            {/* Top hero area (only for real-time success) */}
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-5 mt-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <CheckCircle2 size={54} color="white" />
            </div>

            <h1 className="text-white text-center mb-2" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}>
              {isCheckin ? 'Check-in Concluído!' : 'Check-out Realizado!'}
            </h1>
            <p className="text-center text-sm mb-6" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
              {isCheckin ? 'Veículo e motorista liberados com sucesso' : 'Saída registrada com sucesso no sistema'}
            </p>
          </>
        )}

        {/* Summary card */}
        <div className={`w-full bg-white rounded-2xl overflow-hidden ${isReceipt ? 'mt-4' : ''}`} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <div className="px-5 py-3 flex items-center gap-3" style={{ backgroundColor: lightColor, borderBottom: `2px solid ${iconColor}20` }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'white' }}>
              {isCheckin ? <LogIn size={18} color={iconColor} /> : <LogOut size={18} color={iconColor} />}
            </div>
            <div>
              <p className="text-xs" style={{ color: '#64748b' }}>Comprovante de Operação</p>
              <p className="text-sm font-bold" style={{ color: '#1e293b' }}>{plate}</p>
            </div>
          </div>

          <div className="px-5 py-4 flex flex-col gap-2.5">
            {summaryItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm" style={{ color: '#64748b' }}>{item.label}</span>
                <span className="text-sm font-semibold" style={{ color: item.label === 'Protocolo' ? iconColor : '#1e293b', letterSpacing: item.label === 'Placa' ? '0.06em' : undefined }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {isReceipt && (
          <button
            onClick={onHome}
            className="w-full mt-6 py-4 rounded-2xl font-bold text-base transition-all active:bg-slate-200"
            style={{ backgroundColor: 'white', color: '#1e293b', border: '2px solid #e2e8f0' }}
          >
            Voltar
          </button>
        )}
      </div>
    </div>
  );
}
