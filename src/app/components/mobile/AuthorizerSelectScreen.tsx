import { useState, useMemo } from "react";
import { ArrowLeft, UserCheck, Search, ChevronRight } from "lucide-react";
import { StepIndicator } from "./StepIndicator";

interface Props {
  isNewDriver: boolean;
  onSelect: (authorizer: string) => void;
  onBack: () => void;
}

const RECENT_AUTHORIZERS = [
  { name: "Carlos Mendes", role: "Gerente de Operações" },
  { name: "Ana Beatriz Souza", role: "Segurança" },
  { name: "Roberto Lima", role: "Portaria" },
];

const OTHER_AUTHORIZERS = [
  { name: "Alexandre Torres", role: "TI" },
  { name: "Amanda Ferreira", role: "RH" },
  { name: "Bruno Carvalho", role: "Manutenção" },
  { name: "Camila Rocha", role: "Logística" },
  { name: "Diego Martins", role: "Compras" },
  { name: "Eduardo Pinto", role: "Financeiro" },
  { name: "Fabiana Costa", role: "Jurídico" },
  { name: "Gabriel Nunes", role: "Engenharia" },
  { name: "Helena Vieira", role: "Qualidade" },
  { name: "Igor Santana", role: "Produção" },
  { name: "Juliana Campos", role: "Comercial" },
  { name: "Leandro Moura", role: "HSE" },
  { name: "Marcelo Dias", role: "Facilities" },
  { name: "Natália Ramos", role: "Projetos" },
  { name: "Otávio Silva", role: "Diretoria" },
  { name: "Patrícia Lima", role: "Marketing" },
  { name: "Ricardo Oliveira", role: "Almoxarifado" },
  { name: "Sandra Gomes", role: "Vendas" },
  { name: "Thiago Santos", role: "Expedição" },
  { name: "Vinícius Rocha", role: "TI" },
  { name: "Zélia Maria", role: "Copa" },
  { name: "Mariana Silva", role: "Recepção" },
  { name: "Marcos Paulo", role: "Elétrica" },
  { name: "Maurício Leite", role: "Civil" },
  { name: "Daniella Soares", role: "Arquitetura" },
  { name: "Fernando Henrique", role: "Frota" },
];

const ALL_AUTHORIZERS = [...RECENT_AUTHORIZERS, ...OTHER_AUTHORIZERS];

export function AuthorizerSelectScreen({
  isNewDriver,
  onSelect,
  onBack,
}: Props) {
  const [value, setValue] = useState("");

  const filtered = useMemo(() => {
    if (!value.trim()) return null;
    const query = value.toLowerCase();
    return ALL_AUTHORIZERS
      .filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.role.toLowerCase().includes(query),
      )
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(query);
        const bStarts = b.name.toLowerCase().startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [value]);

  const handleConfirm = () => {
    if (value.trim()) onSelect(value.trim());
  };

  return (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 py-3 flex items-center"
        style={{ backgroundColor: "#0f2744" }}
      >
        <button
          onClick={onBack}
          className="p-2 rounded-xl flex-shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        >
          <ArrowLeft size={18} color="white" />
        </button>
        <div className="flex-1 flex justify-center">
          <StepIndicator currentPhase={2} />
        </div>
        <div style={{ width: 34 }} />
      </div>

      {/* Input area */}
      <div
        className="flex-shrink-0 px-4 pt-4 pb-1 bg-white"
        style={{ borderBottom: "1px solid #f1f5f9" }}
      >
        <p
          className="text-2xl mb-3 py-5 leading-tight"
          style={{ color: "#1e293b" }}
        >
          <span className="font-bold">QUEM</span> autorizou <br /> a entrada?
        </p>
        <div
          className="flex items-center gap-2 rounded-2xl px-4 py-3 border-2 mb-4"
          style={{
            borderColor: "#e2e8f0",
            backgroundColor: "#f8fafc",
          }}
        >
          <Search size={17} color="#94a3b8" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Nome do autorizador..."
            className="flex-1 bg-transparent outline-none font-semibold"
            style={{ fontSize: 14, color: "#1e293b" }}
            onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
          />
          {value && (
            <button
              onClick={() => setValue("")}
              className="text-slate-400 text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>

        {/* Inline Recommendations Chips */}
        {(value.trim() || !isNewDriver) && filtered !== null && !ALL_AUTHORIZERS.some(a => a.name === value) && (
          <div className="flex flex-wrap gap-2 pt-1 pb-2">
            {!isNewDriver && !value.trim() && (
              <button
                onClick={() => setValue("Carlos Mendes")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all active:scale-95 shadow-md"
                style={{ 
                  backgroundColor: value === "Carlos Mendes" ? "#4f46e5" : "#eef2ff",
                  borderColor: "#4f46e5",
                  color: value === "Carlos Mendes" ? "white" : "#4f46e5"
                }}
              >
                <UserCheck size={12} color={value === "Carlos Mendes" ? "white" : "#4f46e5"} />
                <span className="text-xs font-bold">Último: Carlos Mendes</span>
              </button>
            )}
            {filtered.slice(0, 6).map((auth) => (
              <button
                key={auth.name}
                onClick={() => setValue(auth.name)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all active:scale-95 shadow-sm"
                style={{ 
                  backgroundColor: value === auth.name ? "#4f46e5" : "white",
                  borderColor: value === auth.name ? "#4f46e5" : "#e2e8f0",
                  color: value === auth.name ? "white" : "#334155"
                }}
              >
                <UserCheck size={20} color={value === auth.name ? "white" : "#94a3b8"} />
                <span className="text-xs font-semibold">{auth.name}</span>
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
              Autorizadores Recentes
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {RECENT_AUTHORIZERS.map((auth) => (
                <button
                  key={auth.name}
                  onClick={() => setValue(auth.name)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-100 bg-slate-50 transition-all active:scale-95"
                  style={{ color: "#475569" }}
                >
                  <UserCheck size={20} color="#94a3b8" />
                  <span className="text-xs font-semibold">{auth.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {value.trim() && filtered !== null && filtered.length === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center p-8 border border-dashed border-slate-200 rounded-[2.5rem] bg-slate-50/50">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
              <UserCheck size={20} color="#94a3b8" />
            </div>
            <p className="text-sm font-bold mb-1" style={{ color: "#1e293b" }}>Novo Autorizador</p>
            <p className="text-xs text-center leading-relaxed" style={{ color: "#64748b" }}>
              Este nome não está na lista padrão, <br /> mas você pode continuar.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="flex-shrink-0 p-4 bg-white"
        style={{ borderTop: "1px solid #f1f5f9" }}
      >
        <button
          onClick={handleConfirm}
          disabled={!value.trim()}
          className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80 disabled:opacity-40"
          style={{ backgroundColor: "#16a34a" }}
        >
          Avançar
        </button>
      </div>
    </div>
  );
}
