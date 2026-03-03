import { CheckCircle2, LogIn, LogOut } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  type: 'checkin' | 'checkout';
  plate: string;
  driverName?: string;
  entryTime?: string;
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
  onNewOperation,
  onHome,
}: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onHome();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onHome]);

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
    <div className="h-full flex flex-col" style={{ backgroundColor: primaryColor }}>
      {/* Top hero area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 text-white">
        {/* Icon */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        >
          <CheckCircle2 size={54} color="white" />
        </div>

        <h1
          className="text-white text-center mb-2"
          style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}
        >
          {isCheckin ? 'Check-in Concluído!' : 'Check-out Realizado!'}
        </h1>
        <p
          className="text-center text-sm mb-6"
          style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}
        >
          {isCheckin
            ? 'Veículo e motorista liberados com sucesso'
            : 'Saída registrada com sucesso no sistema'}
        </p>

        {/* Summary card */}
        <div
          className="w-full bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
        >
          <div
            className="px-5 py-3 flex items-center gap-3"
            style={{ backgroundColor: lightColor, borderBottom: `2px solid ${iconColor}20` }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'white' }}
            >
              {isCheckin ? (
                <LogIn size={18} color={iconColor} />
              ) : (
                <LogOut size={18} color={iconColor} />
              )}
            </div>
            <div>
              <p className="text-xs" style={{ color: '#64748b' }}>
                Comprovante de Operação
              </p>
              <p className="text-sm font-bold" style={{ color: '#1e293b' }}>
                {plate}
              </p>
            </div>
          </div>

          <div className="px-5 py-4 flex flex-col gap-2.5">
            {summaryItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm" style={{ color: '#64748b' }}>
                  {item.label}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{
                    color:
                      item.label === 'Protocolo' ? iconColor : '#1e293b',
                    letterSpacing: item.label === 'Placa' ? '0.06em' : undefined,
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
