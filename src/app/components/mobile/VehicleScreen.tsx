import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  XCircle,
  ChevronRight,
  Truck,
} from "lucide-react";
import { StepIndicator } from "./StepIndicator";

interface Props {
  isNewDriver: boolean;
  onApproved: (plate: string) => void;
  onBack: () => void;
}

type State = "input" | "loading" | "approved" | "reproved";

export function VehicleScreen({ isNewDriver, onApproved, onBack }: Props) {
  const [plate, setPlate] = useState("");
  const [state, setState] = useState<State>("input");
  const [observation, setObservation] = useState("");
  const [fromChip, setFromChip] = useState(false);

  const handleValidate = () => {
    if (!plate.trim()) return;
    setState("loading");
    setTimeout(() => setState("approved"), 1600);
  };

  const handleReset = () => {
    setState("input");
    setPlate("");
    setObservation("");
  };

  return (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: "#f1f5f9" }}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 py-3 flex items-center"
        style={{ backgroundColor: "#0f2744" }}
      >
        <button
          onClick={() => {
            if (state === "approved" || state === "reproved") {
              if (fromChip) {
                setPlate("");
              }
              setState("input");
            } else {
              onBack();
            }
          }}
          className="p-2 rounded-xl flex-shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        >
          <ArrowLeft size={18} color="white" />
        </button>
        <div className="flex-1 flex justify-center">
          <StepIndicator currentPhase={3} />
        </div>
        <div style={{ width: 34 }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-5">
        {/* Plate Input Area */}
        {state === "input" && (
          <div className="flex flex-col gap-4">
            <div>
              <p
                className="text-2xl mb-3 leading-tight py-5"
                style={{ color: "#1e293b" }}
              >
                Qual a <span className="font-bold">PLACA</span> <br /> do veículo?
              </p>
            </div>

            <div className="bg-white rounded-3xl p-1 shadow-sm border border-slate-100 mb-1">
              <input
                type="text"
                value={plate}
                onChange={(e) => {
                  setPlate(e.target.value.toUpperCase().slice(0, 8));
                  setFromChip(false);
                }}
                onKeyDown={(e) =>
                  e.key === "Enter" && plate.trim() && handleValidate()
                }
                placeholder="ABC-1234"
                autoFocus
                className="w-full rounded-2xl px-4 py-6 text-center font-bold outline-none transition-all focus:bg-slate-50/50"
                style={{
                  fontSize: 28,
                  letterSpacing: "0.15em",
                  color: "#0f172a",
                }}
              />
            </div>

            {/* Standardized Inline Recommendations */}
            {!isNewDriver && !plate.trim() && (
              <div className="mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-[15px] font-bold uppercase tracking-[0.2em] mb-4 opacity-30 text-center" style={{ color: "#1e293b" }}>
                  Veículos Recentes
                </p>
                <div className="flex flex-wrap gap-2 justify-center pt-1 pb-2">
                  {[
                    { plate: "GAI-4509", type: "Baú", color: "Branco" },
                    { plate: "PLM-2J34", type: "Carreta", color: "Prata" },
                  ].map((v) => (
                    <button
                      key={v.plate}
                      onClick={() => {
                        setPlate(v.plate);
                        setFromChip(true);
                        setState("approved");
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-100 bg-slate-50 transition-all active:scale-95"
                      style={{ color: "#475569" }}
                    >
                      <Truck size={20} color="#94a3b8" />
                      <span className="text-xl font-semibold">{v.plate}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {state === "loading" && (
          <div
            className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
          >
            <Loader2 size={36} color="#2563eb" className="animate-spin" />
            <p className="text-sm font-semibold" style={{ color: "#1e293b" }}>
              Consultando base de dados...
            </p>
          </div>
        )}

        {/* Approved — plain white, no green card */}
        {state === "approved" && (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-2xl mb-3 leading-tight py-5" style={{ color: "#1e293b" }}>
                Este é o <span className="font-bold">VEÍCULO</span> correto?
              </p>
            </div>

            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
            >
              {[
                { label: "Placa", value: plate },
                { label: "Tipo", value: "Carreta 3/4" },
                { label: "Cor", value: "Branco" },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  className="px-4 py-3 flex items-center justify-between"
                  style={{
                    borderBottom:
                      i < arr.length - 1 ? "1px solid #f8fafc" : "none",
                  }}
                >
                  <p className="text-sm" style={{ color: "#64748b" }}>
                    {item.label}
                  </p>
                  <p
                    className="text-sm font-bold"
                    style={{
                      color: "#1e293b",
                      letterSpacing: item.label === "Placa" ? "0.08em" : 0,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => onApproved(plate)}
                className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80"
                style={{ backgroundColor: "#16a34a" }}
              >
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} />
                  CONFIRMAR
                </span>
              </button>
              <button
                onClick={() => setState("reproved")}
                className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80"
                style={{ backgroundColor: "#ffffffff", color: "#16a34a", border: "2px solid #16a34a" }}
              >
                <span className="flex items-center justify-center gap-2">
                  <XCircle size={18} />
                  RECUSAR
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Reproved Form */}
        {state === "reproved" && (
          <div className="flex flex-col gap-5">
            <p className="text-sm" style={{ color: "#64748b" }}>
              Capture uma foto do veículo e adicione uma observação (opcional).
            </p>
            <div>
              <label
                className="text-sm font-semibold block mb-2"
                style={{ color: "#475569" }}
              >
                Foto do Veículo
              </label>
              <button
                className="w-full h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 hover:bg-slate-50"
                style={{ borderColor: "#cbd5e1", color: "#64748b" }}
              >
                <div
                  className="p-2.5 rounded-full"
                  style={{ backgroundColor: "#f1f5f9" }}
                >
                  <Truck size={24} className="text-blue-500" />
                </div>
                <span className="text-sm font-semibold">Tirar Foto</span>
              </button>
            </div>
            <div>
              <label
                className="text-sm font-semibold block mb-2"
                style={{ color: "#475569" }}
              >
                Observação (Opcional)
              </label>
              <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Ex: Motorista não apresentou documentação adequada..."
                className="w-full rounded-2xl border-2 px-4 py-3 outline-none resize-none h-28"
                style={{
                  borderColor: "#e2e8f0",
                  color: "#1e293b",
                  fontSize: 14,
                }}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-4 rounded-2xl font-bold text-sm border-2 transition-opacity active:opacity-80"
                style={{ borderColor: "#cbd5e1", color: "#64748b" }}
              >
                Cancelar
              </button>
              <button
                onClick={() => onBack()}
                className="flex-1 py-4 rounded-2xl font-bold text-sm text-white transition-opacity active:opacity-80"
                style={{ backgroundColor: "#ef4444" }}
              >
                Registrar Inconsistência
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer — Avançar only for input state */}
      {state === "input" && (
        <div
          className="flex-shrink-0 p-4 bg-white"
          style={{ borderTop: "1px solid #f1f5f9" }}
        >
          <button
            onClick={handleValidate}
            disabled={!plate.trim()}
            className="w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity active:opacity-80 disabled:opacity-40"
            style={{ backgroundColor: "#16a34a" }}
          >
            Avançar
          </button>
        </div>
      )}
    </div>
  );
}
