import { useState } from 'react';
import { ArrowLeft, Search, Clock, LogOut, ChevronRight, User } from 'lucide-react';

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
            placeholder="Buscar placa..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: '#1e293b' }}
          />
        </div>
      </div>

      {/* Vehicle list */}
      <div className="flex-1 overflow-y-auto bg-white px-4 py-4 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <p className="text-sm" style={{ color: '#94a3b8' }}>
              Nenhum veículo encontrado
            </p>
          </div>
        ) : (
          filtered.map((vehicle) => {
            const isSelected = selected?.id === vehicle.id;
            return (
              <button
                key={vehicle.id}
                onClick={() => setSelected(isSelected ? null : vehicle)}
                className="w-full px-4 py-4 flex items-center gap-4 text-left rounded-2xl transition-all"
                style={{
                  backgroundColor: isSelected ? '#2563eb' : 'white',
                  border: isSelected ? '3px solid #000000f8' : '3px solid #f1f5f9',
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : '#eff6ff' }}
                >
                  <LogOut size={20} color={isSelected ? 'white' : '#1d4ed8'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-bold"
                    style={{ color: isSelected ? 'white' : '#1e293b', letterSpacing: '0.06em' }}
                  >
                    {vehicle.plate}
                  </p>
                  <p className="text-xs truncate font-medium" style={{ color: isSelected ? 'rgba(255,255,255,0.7)' : '#64748b' }}>
                    {vehicle.type} · {vehicle.driver}
                  </p>
                </div>

              </button>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-4 pb-4 pt-2 bg-white" style={{ borderTop: '1px solid #f1f5f9' }}>
        <button
          onClick={() => selected && onConfirm(selected.plate, selected.entryTime)}
          disabled={!selected}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80 disabled:opacity-40"
          style={{ backgroundColor: '#1d4ed8' }}
        >
          {selected ? `Liberar` : 'Selecione um veículo'}
        </button>
      </div>
    </div>
  );
}
