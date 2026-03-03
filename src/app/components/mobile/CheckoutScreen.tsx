import { useState } from 'react';
import { ArrowLeft, Search, Clock, LogOut, ChevronRight } from 'lucide-react';

interface Vehicle {
  id: number;
  plate: string;
  type: string;
  driver: string;
  entryTime: string;
  duration: string;
}

const VEHICLES: Vehicle[] = [
  { id: 1, plate: 'ABC-1D34', type: 'Carreta 3/4', driver: 'João Carlos Silva', entryTime: '09:15', duration: '5h 47m' },
  { id: 2, plate: 'XYZ-5E78', type: 'Van de Carga', driver: 'Maria Santos Lima', entryTime: '10:30', duration: '4h 32m' },
  { id: 3, plate: 'DEF-9F12', type: 'Caminhão Baú', driver: 'Carlos Roberto Lima', entryTime: '11:00', duration: '4h 02m' },
  { id: 4, plate: 'GHI-3A56', type: 'Utilitário', driver: 'Ana Costa Pereira', entryTime: '12:15', duration: '2h 47m' },
  { id: 5, plate: 'JKL-7B89', type: 'Carreta 3/4', driver: 'Roberto Neto Alves', entryTime: '13:00', duration: '2h 02m' },
  { id: 6, plate: 'MNO-2C34', type: 'Van de Carga', driver: 'Fernanda Luz Silva', entryTime: '13:45', duration: '1h 17m' },
  { id: 7, plate: 'PQR-6D78', type: 'Caminhão Baú', driver: 'Marcos Dias Costa', entryTime: '14:10', duration: '0h 52m' },
];

interface Props {
  onConfirm: (plate: string, entryTime: string) => void;
  onBack: () => void;
}

export function CheckoutScreen({ onConfirm, onBack }: Props) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Vehicle | null>(null);

  const filtered = VEHICLES.filter(
    (v) =>
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.driver.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) {
    return (
      <div className="h-full flex flex-col" style={{ backgroundColor: '#f1f5f9' }}>
        {/* Header */}
        <div
          className="flex-shrink-0 px-4 py-4 flex items-center gap-3"
          style={{ backgroundColor: '#1d4ed8' }}
        >
          <button
            onClick={() => setSelected(null)}
            className="p-2 rounded-xl flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
          >
            <ArrowLeft size={19} color="white" />
          </button>
          <div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Check-out
            </p>
            <p className="font-semibold text-white text-sm">Confirmar Saída</p>
          </div>
        </div>

        {/* Confirm content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5">
          {/* Vehicle card */}
          <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
          >
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ backgroundColor: '#eff6ff', borderBottom: '2px solid #bfdbfe' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#dbeafe' }}
              >
                <LogOut size={22} color="#1d4ed8" />
              </div>
              <div>
                <p className="text-xs" style={{ color: '#64748b' }}>
                  Registrando saída do veículo
                </p>
                <p
                  className="font-bold"
                  style={{ color: '#1e293b', fontSize: 22, letterSpacing: '0.1em' }}
                >
                  {selected.plate}
                </p>
              </div>
            </div>

            <div className="px-5 py-4 flex flex-col gap-0">
              {[
                { label: 'Tipo de Veículo', value: selected.type },
                { label: 'Condutor', value: selected.driver },
                { label: 'Placa', value: selected.plate },
                { label: 'Horário de Entrada', value: selected.entryTime },
                { label: 'Tempo no Pátio', value: selected.duration },
                { label: 'Portão de Saída', value: 'Norte' },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3"
                  style={{
                    borderBottom: i < arr.length - 1 ? '1px solid #f8fafc' : 'none',
                  }}
                >
                  <p className="text-sm" style={{ color: '#64748b' }}>
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: '#1e293b' }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl px-4 py-3"
            style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}
          >
            <p className="text-xs" style={{ color: '#1d4ed8' }}>
              ℹ️ Ao confirmar, o veículo será desregistrado do pátio e a saída será gravada no
              sistema de controle.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 bg-white" style={{ borderTop: '1px solid #f1f5f9' }}>
          <button
            onClick={() => onConfirm(selected.plate, selected.entryTime)}
            className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80"
            style={{ backgroundColor: '#1d4ed8' }}
          >
            ✓ Confirmar Check-out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#f1f5f9' }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 py-4 flex items-center gap-3"
        style={{ backgroundColor: '#1d4ed8' }}
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
            Check-out
          </p>
          <p className="font-semibold text-white text-sm">Veículos no Pátio</p>
        </div>
        <span
          className="text-xs font-bold text-white px-3 py-1 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        >
          {VEHICLES.length}
        </span>
      </div>

      {/* Search */}
      <div className="flex-shrink-0 px-4 py-3 bg-white" style={{ borderBottom: '1px solid #f1f5f9' }}>
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5"
          style={{ backgroundColor: '#f1f5f9' }}
        >
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar placa ou motorista..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: '#1e293b' }}
          />
        </div>
      </div>

      {/* Vehicle list */}
      <div className="flex-1 overflow-y-auto bg-white">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <p className="text-sm" style={{ color: '#94a3b8' }}>
              Nenhum veículo encontrado
            </p>
          </div>
        ) : (
          filtered.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => setSelected(vehicle)}
              className="w-full px-4 py-3.5 flex items-center gap-3 text-left transition-colors hover:bg-slate-50 active:bg-slate-100"
              style={{ borderBottom: '1px solid #f8fafc' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#dbeafe' }}
              >
                <LogOut size={17} color="#1d4ed8" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-bold"
                  style={{ color: '#1e293b', letterSpacing: '0.06em' }}
                >
                  {vehicle.plate}
                </p>
                <p className="text-xs truncate" style={{ color: '#64748b' }}>
                  {vehicle.type} · {vehicle.driver}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div
                  className="flex items-center gap-1"
                  style={{ color: '#94a3b8' }}
                >
                  <Clock size={11} />
                  <span className="text-xs font-semibold">{vehicle.duration}</span>
                </div>
                <p className="text-xs" style={{ color: '#cbd5e1' }}>
                  desde {vehicle.entryTime}
                </p>
              </div>
              <ChevronRight size={16} color="#cbd5e1" className="ml-1" />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
