import { useState, useMemo } from 'react';
import { ArrowLeft, Building2, Search, ChevronRight } from 'lucide-react';
import { StepIndicator } from './StepIndicator';

interface Props {
  isNewDriver: boolean;
  onSelect: (company: string) => void;
  onBack: () => void;
}

const RECENT_COMPANIES = ['Styllus Catering', 'Som & Luz Eventos', 'Logística Global Eventos'];

const OTHER_COMPANIES = [
  'Decora Festas', 'Audiovisual Pro', 'Rent-a-Tent', 'Cena Viva Decorações',
  'Taste & Co Catering', 'Bebidas Rápidas Delivery', 'Floricultura Central',
  'VIP Segurança Eventos', 'Geradores de Energia Sul', 'Palco & Som Estruturas',
  'Mobiliário & Design', 'Equipamentos Áudio RS', 'Buffet Real', 'Transportes Expresso Eventos'
];

const ALL_COMPANIES = [...RECENT_COMPANIES, ...OTHER_COMPANIES];

export function CompanySelectScreen({ isNewDriver, onSelect, onBack }: Props) {
  const [value, setValue] = useState('');

  const filtered = useMemo(() => {
    if (!value.trim()) return null;
    return ALL_COMPANIES.filter((c) => c.toLowerCase().includes(value.toLowerCase()));
  }, [value]);

  const handleConfirm = () => { if (value.trim()) onSelect(value.trim()); };

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#f1f5f9' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 flex items-center" style={{ backgroundColor: '#0f2744' }}>
        <button onClick={onBack} className="p-2 rounded-xl flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
          <ArrowLeft size={18} color="white" />
        </button>
        <div className="flex-1 flex justify-center">
          <StepIndicator currentPhase={2} />
        </div>
        <div style={{ width: 34 }} />
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 bg-white" style={{ borderBottom: '1px solid #f1f5f9' }}>
        <p className="font-bold text-base mb-3" style={{ color: '#1e293b' }}>
          Para qual empresa está prestando serviço?
        </p>
        <div
          className="flex items-center gap-2 rounded-2xl px-4 py-3 border-2 transition-colors"
          style={{ borderColor: value ? '#2563eb' : '#e2e8f0', backgroundColor: '#f8fafc' }}
        >
          <Search size={17} color={value ? '#2563eb' : '#94a3b8'} />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Digite o nome da empresa..."
            className="flex-1 bg-transparent outline-none font-semibold"
            style={{ fontSize: 14, color: '#1e293b' }}
            onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
          />
          {value && (
            <button onClick={() => setValue('')} className="text-slate-400 text-lg leading-none">×</button>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex-1 overflow-y-auto">
        {filtered !== null ? (
          <div className="bg-white">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Building2 size={28} color="#cbd5e1" />
                <p className="text-sm" style={{ color: '#94a3b8' }}>Nenhuma empresa encontrada</p>
              </div>
            ) : (
              filtered.map((company, i) => (
                <button key={company} onClick={() => setValue(company)}
                  className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50 active:bg-slate-100"
                  style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#eff6ff' }}>
                    <Building2 size={13} color="#2563eb" />
                  </div>
                  <p className="flex-1 text-sm font-medium" style={{ color: '#1e293b' }}>{company}</p>
                  <ChevronRight size={13} color="#cbd5e1" />
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="px-4 py-3 flex flex-col gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#94a3b8' }}>Usados Recentemente</p>
              <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                {RECENT_COMPANIES.map((c, i) => (
                  <button key={c} onClick={() => setValue(c)}
                    className="w-full px-4 py-3.5 flex items-center gap-3 text-left hover:bg-slate-50"
                    style={{ borderBottom: i < RECENT_COMPANIES.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#eff6ff' }}>
                      <Building2 size={13} color="#2563eb" />
                    </div>
                    <p className="flex-1 font-semibold text-sm" style={{ color: '#1e293b' }}>{c}</p>
                    <ChevronRight size={13} color="#cbd5e1" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#94a3b8' }}>Outras Empresas</p>
              <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                {OTHER_COMPANIES.map((c, i) => (
                  <button key={c} onClick={() => setValue(c)}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50"
                    style={{ borderBottom: i < OTHER_COMPANIES.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f1f5f9' }}>
                      <Building2 size={11} color="#94a3b8" />
                    </div>
                    <p className="flex-1 text-sm" style={{ color: '#334155' }}>{c}</p>
                    <ChevronRight size={12} color="#cbd5e1" />
                  </button>
                ))}
              </div>
            </div>
            <div className="h-2" />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 bg-white" style={{ borderTop: '1px solid #f1f5f9' }}>
        <button onClick={handleConfirm} disabled={!value.trim()}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80 disabled:opacity-40"
          style={{ backgroundColor: '#16a34a' }}>
          Avançar
        </button>
      </div>
    </div>
  );
}
