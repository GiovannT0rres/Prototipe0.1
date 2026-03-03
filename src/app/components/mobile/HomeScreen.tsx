import { ChevronRight, LogIn, LogOut, Clock, AlertTriangle, Car } from 'lucide-react';

interface Props {
  onCheckin: () => void;
  onCheckout: () => void;
}

const recentOps = [
  { id: 1, plate: 'ABC-1D34', time: '14:28', type: 'in' as const, ok: true, desc: 'Carreta 3/4' },
  { id: 2, plate: 'XYZ-5E78', time: '13:55', type: 'out' as const, ok: true, desc: 'Van de Carga' },
  { id: 3, plate: 'DEF-9F12', time: '13:32', type: 'in' as const, ok: true, desc: 'Caminhão Baú' },
  { id: 4, plate: 'ROB-3G45', time: '13:15', type: 'in' as const, ok: false, desc: 'Alerta: Roubo/Furto' },
];

export function HomeScreen({ onCheckin, onCheckout }: Props) {
  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#f1f5f9' }}>
      {/* Event Header */}
      <div
        className="flex-shrink-0 px-5 pt-4 pb-5"
        style={{ backgroundColor: '#0f2744' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <Car size={20} color="white" />
            </div>
            <div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Controle de Acesso
              </p>
              <p className="text-sm font-semibold text-white">South Summit 2026</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Portão Norte
            </p>
            <p className="text-xs font-semibold text-white">Op: Carlos M.</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'No pátio', value: '45', highlight: true },
            { label: 'Entradas', value: '120', highlight: false },
            { label: 'Saídas', value: '85', highlight: false },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl px-3 py-2 text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
            >
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {stat.label}
              </p>
              <p
                className="font-bold"
                style={{
                  fontSize: 20,
                  color: stat.highlight ? '#4ade80' : 'white',
                  lineHeight: 1.3,
                }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {/* Check-in CTA */}
        <button
          onClick={onCheckin}
          className="w-full rounded-2xl flex items-center gap-4 p-5 text-left transition-opacity active:opacity-80"
          style={{ backgroundColor: '#16a34a' }}
        >
          <div
            className="rounded-xl p-3 flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <LogIn size={26} color="white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-base text-white" style={{ lineHeight: 1.3 }}>
              REALIZAR CHECK-IN
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.3 }}>
              Registrar entrada de veículo
            </p>
          </div>
          <ChevronRight size={20} color="rgba(255,255,255,0.6)" />
        </button>

        {/* Check-out CTA */}
        <button
          onClick={onCheckout}
          className="w-full rounded-2xl flex items-center gap-4 p-5 text-left transition-opacity active:opacity-80"
          style={{ backgroundColor: '#1d4ed8' }}
        >
          <div
            className="rounded-xl p-3 flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <LogOut size={26} color="white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-base text-white" style={{ lineHeight: 1.3 }}>
              REALIZAR CHECK-OUT
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.3 }}>
              Registrar saída de veículo
            </p>
          </div>
          <ChevronRight size={20} color="rgba(255,255,255,0.6)" />
        </button>

        {/* Recent operations */}
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        >
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ borderBottom: '1px solid #f1f5f9' }}
          >
            <p className="font-semibold text-sm" style={{ color: '#1e293b' }}>
              Últimas Operações
            </p>
            <span className="text-xs" style={{ color: '#94a3b8' }}>
              Hoje
            </span>
          </div>
          {recentOps.map((op) => (
            <div
              key={op.id}
              className="px-4 py-3 flex items-center gap-3"
              style={{ borderBottom: '1px solid #f8fafc' }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: op.ok
                    ? op.type === 'in'
                      ? '#dcfce7'
                      : '#dbeafe'
                    : '#fee2e2',
                }}
              >
                {op.ok ? (
                  op.type === 'in' ? (
                    <LogIn size={15} color="#16a34a" />
                  ) : (
                    <LogOut size={15} color="#1d4ed8" />
                  )
                ) : (
                  <AlertTriangle size={15} color="#dc2626" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold"
                  style={{ color: '#1e293b', letterSpacing: '0.04em' }}
                >
                  {op.plate}
                </p>
                <p className="text-xs truncate" style={{ color: '#64748b' }}>
                  {op.ok ? (op.type === 'in' ? 'Entrada' : 'Saída') : 'Bloqueado'} ·{' '}
                  {op.desc}
                </p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0" style={{ color: '#94a3b8' }}>
                <Clock size={12} />
                <span className="text-xs">{op.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
