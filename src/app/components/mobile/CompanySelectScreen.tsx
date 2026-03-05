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
  "Decora Festas", "Audiovisual Pro", "Rent-a-Tent", "Cena Viva Decorações",
  "Taste & Co Catering", "Bebidas Rápidas Delivery", "Floricultura Central",
  "VIP Segurança Eventos", "Geradores de Energia Sul", "Palco & Som Estruturas",
  "Mobiliário & Design", "Equipamentos Áudio RS", "Buffet Real", "Transportes Expresso Eventos",
  "Manutenção Predial Silva", "Limpeza & Conservação", "Ar Condicionado Central",
  "Sinalização & Eventos", "Gráfica Rápida", "Brindes Personalizados",
  "Uniformes Profissionais", "Consultoria de Eventos", "Seguros & Riscos",
  "Locação de Veículos", "Suporte Logístico RS", "Telecom & Conectividade"
];

const ALL_COMPANIES = [...RECENT_COMPANIES, ...OTHER_COMPANIES];

export function CompanySelectScreen({ isNewDriver, onSelect, onBack }: Props) {
  const [value, setValue] = useState('');

  const filtered = useMemo(() => {
    if (!value.trim()) return null;
    const query = value.toLowerCase();
    return ALL_COMPANIES
      .filter((c) => c.toLowerCase().includes(query))
      .sort((a, b) => {
        const aStarts = a.toLowerCase().startsWith(query);
        const bStarts = b.toLowerCase().startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.localeCompare(b);
      });
  }, [value]);

  const handleConfirm = () => { if (value.trim()) onSelect(value.trim()); };

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#ffffff' }}>
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
      <div className="flex-shrink-0 px-4 pt-4 -pb-1 bg-white" style={{ borderBottom: '1px solid #f1f5f9' }}>
        <p className="text-2xl mb-3 py-5 leading-tight " style={{ color: '#1e293b' }}>
          Para qual <span className="font-bold">EMPRESA</span><br /> está prestando serviço?
        </p>
        <div
          className="flex items-center gap-2 rounded-2xl px-4 py-3 border-2 mb-4"
          style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }}
        >
          <Search size={17} color='#94a3b8' />
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

        {/* Inline Recommendations Chips */}
        {(value.trim() || !isNewDriver) && filtered !== null && !ALL_COMPANIES.some(c => c === value) && (
          <div className="flex flex-wrap gap-2 pt-1 pb-2">
            {!isNewDriver && !value.trim() && (
              <button
                key="last-company"
                onClick={() => setValue("Styllus Catering")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all active:scale-95 shadow-md"
                style={{ 
                  backgroundColor: value === "Styllus Catering" ? "#16a34a" : "#eef2ff",
                  borderColor: "#16a34a",
                  color: value === "Styllus Catering" ? "white" : "#16a34a"
                }}
              >
                <Building2 size={12} color={value === "Styllus Catering" ? "white" : "#16a34a"} />
                <span className="text-xs font-bold">Último: Styllus Catering</span>
              </button>
            )}
            {filtered.slice(0, 6).map((company) => (
              <button
                key={company}
                onClick={() => setValue(company)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all active:scale-95 shadow-sm"
                style={{ 
                  backgroundColor: value === company ? "#4f46e5" : "white",
                  borderColor: value === company ? "#4f46e5" : "#e2e8f0",
                  color: value === company ? "white" : "#334155"
                }}
              >
                <Building2 size={20} color={value === company ? "white" : "#94a3b8"} />
                <span className="text-xs font-semibold">{company}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4">
        {!value.trim() && (
          <div className="mt-1">
            <p className="text-[15px] font-bold uppercase tracking-[0.2em] mb-4 opacity-30 text-center" style={{ color: "#1e293b" }}>
              Empresas Recentes
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {RECENT_COMPANIES.map((company) => (
                <button
                  key={company}
                  onClick={() => setValue(company)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-100 bg-slate-50 transition-all active:scale-95"
                  style={{ color: "#475569" }}
                >
                  <Building2 size={20} color="#94a3b8" />
                  <span className="text-xs font-semibold">{company}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {value.trim() && filtered !== null && filtered.length === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center p-8 border border-dashed border-slate-200 rounded-[2.5rem] bg-slate-50/50">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
              <Building2 size={20} color="#94a3b8" />
            </div>
            <p className="text-xl font-bold mb-1" style={{ color: "#1e293b" }}>Nova Empresa</p>
            <p className="text-sm text-center leading-relaxed" style={{ color: "#64748b" }}>
              Esta empresa não está na nossa base, <br /> mas você pode prosseguir.
            </p>
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
