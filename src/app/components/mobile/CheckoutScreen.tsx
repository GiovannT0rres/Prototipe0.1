import { useState } from 'react';
import { ArrowLeft, Search, Clock, LogOut, ChevronRight, User, CircleUser } from 'lucide-react';

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
  { id: 8, plate: 'STU-4E56', type: 'Utilitário', driver: 'Juliana Castro Ramos', entryTime: '14:20', duration: '0h 42m' },
  { id: 9, plate: 'VWX-8F90', type: 'Carreta 3/4', driver: 'Pedro Henrique Souza', entryTime: '06:10', duration: '8h 52m' },
  { id: 10, plate: 'YZA-1G23', type: 'Caminhão Baú', driver: 'Lucas Almeida Dias', entryTime: '07:30', duration: '7h 32m' },
  { id: 11, plate: 'BCD-5H67', type: 'Van de Carga', driver: 'Camila Barros Silva', entryTime: '08:05', duration: '6h 57m' },
  { id: 12, plate: 'EFG-9I01', type: 'Utilitário', driver: 'Thiago Martins Moura', entryTime: '08:45', duration: '6h 17m' },
  { id: 13, plate: 'HIJ-2J34', type: 'Carreta 3/4', driver: 'Rafael Gomes Pinto', entryTime: '09:20', duration: '5h 42m' },
  { id: 14, plate: 'KLM-6K78', type: 'Caminhão Baú', driver: 'Amanda Ribeiro', entryTime: '10:15', duration: '4h 47m' },
  { id: 15, plate: 'NOP-0L12', type: 'Van de Carga', driver: 'Diego Azevedo', entryTime: '10:40', duration: '4h 22m' },
  { id: 16, plate: 'QRS-3M45', type: 'Utilitário', driver: 'Bruno Cardoso Leite', entryTime: '11:10', duration: '3h 52m' },
  { id: 17, plate: 'TUV-7N89', type: 'Carreta 3/4', driver: 'Marcelo Faria Rosa', entryTime: '11:35', duration: '3h 27m' },
  { id: 18, plate: 'WXY-1O23', type: 'Caminhão Baú', driver: 'Patrícia Nunes', entryTime: '12:00', duration: '3h 02m' },
  { id: 19, plate: 'ZAB-4P56', type: 'Van de Carga', driver: 'Felipe Rocha Nogueira', entryTime: '12:25', duration: '2h 37m' },
  { id: 20, plate: 'CDE-8Q90', type: 'Utilitário', driver: 'Letícia Vieira', entryTime: '12:50', duration: '2h 12m' },
  { id: 21, plate: 'FGH-2R34', type: 'Carreta 3/4', driver: 'Rodrigo Monteiro', entryTime: '13:10', duration: '1h 52m' },
  { id: 22, plate: 'IJK-5S67', type: 'Caminhão Baú', driver: 'Sérgio Batista', entryTime: '13:30', duration: '1h 32m' },
  { id: 23, plate: 'LMN-9T01', type: 'Van de Carga', driver: 'Tatiana Pires Silva', entryTime: '13:55', duration: '1h 07m' },
  { id: 24, plate: 'OPQ-3U45', type: 'Utilitário', driver: 'Alexandre Carvalho', entryTime: '14:05', duration: '0h 57m' },
  { id: 25, plate: 'RST-6V78', type: 'Carreta 3/4', driver: 'Eduardo Correia', entryTime: '14:25', duration: '0h 37m' },
  { id: 26, plate: 'UVW-0W12', type: 'Caminhão Baú', driver: 'Gabriela Mendes', entryTime: '14:35', duration: '0h 27m' },
  { id: 27, plate: 'XYZ-4X56', type: 'Van de Carga', driver: 'Ricardo Moraes', entryTime: '14:45', duration: '0h 17m' },
  { id: 28, plate: 'ABC-7Y89', type: 'Utilitário', driver: 'Vanessa Cavalcanti', entryTime: '14:55', duration: '0h 07m' },
  { id: 29, plate: 'DEF-1Z23', type: 'Carreta 3/4', driver: 'André Luiz Teixeira', entryTime: '06:30', duration: '8h 32m' },
  { id: 30, plate: 'GHI-5A67', type: 'Caminhão Baú', driver: 'Cláudia Peixoto', entryTime: '07:15', duration: '7h 47m' },
  { id: 31, plate: 'JKL-9B01', type: 'Van de Carga', driver: 'Victor Hugo Sales', entryTime: '08:25', duration: '6h 37m' },
  { id: 32, plate: 'MNO-3C45', type: 'Utilitário', driver: 'Aline Freitas Lopes', entryTime: '09:05', duration: '5h 57m' },
  { id: 33, plate: 'PQR-6D89', type: 'Carreta 3/4', driver: 'Leandro Marques', entryTime: '09:40', duration: '5h 22m' },
  { id: 34, plate: 'STU-0E12', type: 'Caminhão Baú', driver: 'Márcia Ferreira', entryTime: '10:05', duration: '4h 57m' },
  { id: 35, plate: 'VWX-4F56', type: 'Van de Carga', driver: 'Fábio Assis', entryTime: '10:55', duration: '4h 07m' },
  { id: 36, plate: 'YZA-8G90', type: 'Utilitário', driver: 'Luciana Borges', entryTime: '11:25', duration: '3h 37m' },
  { id: 37, plate: 'BCD-2H34', type: 'Carreta 3/4', driver: 'Gustavo Campos', entryTime: '11:50', duration: '3h 12m' },
  { id: 38, plate: 'EFG-5I67', type: 'Caminhão Baú', driver: 'Renata Gusmão', entryTime: '12:10', duration: '2h 52m' },
  { id: 39, plate: 'HIJ-9J01', type: 'Van de Carga', driver: 'Daniel Barbosa', entryTime: '12:40', duration: '2h 22m' },
  { id: 40, plate: 'KLM-3K45', type: 'Utilitário', driver: 'Beatriz Rezende', entryTime: '13:15', duration: '1h 47m' },
  { id: 41, plate: 'NOP-7L89', type: 'Carreta 3/4', driver: 'Henrique Viana', entryTime: '14:00', duration: '1h 02m' },
  { id: 42, plate: 'QRS-1M23', type: 'Caminhão Baú', driver: 'Simone Dantas', entryTime: '14:40', duration: '0h 22m' },
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
        style={{ backgroundColor: '#0f2744' }}
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
                  backgroundColor: isSelected ? '#16a34a' : 'white',
                  border: isSelected ? '2px solid #000000f8' : '2px solid #f1f5f9',
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{ backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : '#f1f5f9' }}
                >
                  <CircleUser size={44} color={isSelected ? 'white' : '#94a3b8'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xl font-bold"
                    style={{ color: isSelected ? 'white' : '#1e293b', letterSpacing: '0.06em' }}
                  >
                    {vehicle.plate}
                  </p>
                  <p className="text-sm truncate font-medium mb-1.5" style={{ color: isSelected ? 'rgba(255,255,255,0.7)' : '#64748b' }}>
                    {vehicle.type} · {vehicle.driver}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-md px-1.5 py-0.5" style={{ backgroundColor: isSelected ? 'rgba(255,255,255,0.12)' : '#f8fafc', border: isSelected ? 'none' : '1px solid #e2e8f0' }}>
                      <Clock size={10} color={isSelected ? 'white' : '#64748b'} />
                      <span className="text-[10px] font-bold" style={{ color: isSelected ? 'white' : '#64748b' }}>Entrada: {vehicle.entryTime}</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-md px-1.5 py-0.5" style={{ backgroundColor: isSelected ? 'rgba(255,255,255,0.12)' : '#f8fafc', border: isSelected ? 'none' : '1px solid #e2e8f0' }}>
                      <span className="text-[10px] font-bold" style={{ color: isSelected ? 'white' : '#64748b' }}>Tempo: {vehicle.duration}</span>
                    </div>
                  </div>
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
          style={{ backgroundColor: '#16a34a' }}
        >
          {selected ? `Liberar` : 'Selecione um veículo'}
        </button>
      </div>
    </div>
  );
}
