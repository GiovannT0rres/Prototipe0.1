import { useState } from "react";
import { ChevronRight, LogIn, LogOut, Clock, CircleUser } from "lucide-react";
import esIcon from "../../../assets/images/logo.png";

interface Props {
  onCheckin: (plate: string) => void;
  onCheckout: () => void;
  onViewOp: (op: any) => void;
}

const recentOps = [
  {
    id: 1,
    plate: "ABC-1D34",
    time: "14:28",
    type: "in" as const,
    ok: true,
    desc: "Carreta 3/4",
  },
  {
    id: 2,
    plate: "XYZ-5E78",
    time: "13:55",
    type: "out" as const,
    ok: true,
    desc: "Van de Carga",
  },
  {
    id: 3,
    plate: "DEF-9F12",
    time: "13:32",
    type: "in" as const,
    ok: true,
    desc: "Caminhão Baú",
  },
  {
    id: 4,
    plate: "GHI-2J56",
    time: "13:10",
    type: "out" as const,
    ok: true,
    desc: "Carro de Passeio",
  },
  {
    id: 5,
    plate: "JKL-7M89",
    time: "12:45",
    type: "in" as const,
    ok: true,
    desc: "Utilitário",
  },
  {
    id: 6,
    plate: "MNO-4P12",
    time: "12:15",
    type: "in" as const,
    ok: true,
    desc: "Caminhão Toco",
  },
  {
    id: 7,
    plate: "PQR-8S45",
    time: "11:50",
    type: "out" as const,
    ok: true,
    desc: "Moto de Entrega",
  },
  {
    id: 8,
    plate: "STU-1V78",
    time: "11:20",
    type: "in" as const,
    ok: true,
    desc: "Van de Passageiros",
  },
];

export function HomeScreen({ onCheckin, onCheckout, onViewOp }: Props) {
  const [plate, setPlate] = useState("");

  const handleCheckin = () => {
    if (plate.trim()) {
      onCheckin(plate.trim().toUpperCase());
    }
  };
  return (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: "#f1f5f9" }}
    >
      {/* Event Header */}
      <div
        className="flex-shrink-0 px-5 pt-4 pb-5"
        style={{ backgroundColor: "#0f2744" }}
      >
        <div className="flex items-end justify-between mb-4">
          {/* Lado Esquerdo: Evento e Logo (Alinhados à esquerda) */}
          <div className="flex flex-col items-start gap-0">
            <p
              className="text-base text-white leading-none"
              style={{ fontFamily: "'Sol Pro', sans-serif" }}
            >
              South Summit 2026
            </p>
            <img
              src={esIcon}
              alt="Logo Entrada Segura"
              className="h-11 w-auto object-contain -mt-1"
            />
          </div>

          {/* Lado Direito: Portão e Operador */}
          <div className="text-right">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
              Portão Norte
            </p>
            <p className="text-xs font-semibold text-white">Op: Carlos M.</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "No pátio", value: "42", highlight: true },
            { label: "Saídas", value: "73", highlight: false },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl px-3 py-2 text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            >
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                {stat.label}
              </p>
              <p
                className="font-bold"
                style={{
                  fontSize: 20,
                  color: stat.highlight ? "#ffffffff" : "white",
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
        {/* Check-in Input Area */}
        <div
          className="w-full rounded-2xl flex items-center gap-3 p-4 transition-opacity"
          style={{ backgroundColor: "#16a34a" }}
        >
          <div className="flex-1">
            <p
              className="font-semi-bold text-xl text-white mb-1"
              style={{ lineHeight: 1.2, letterSpacing: "0.05em" }}
            >
              ENTRADA VEÍCULO
            </p>
            <input
              type="text"
              value={plate}
              onChange={(e) => setPlate(e.target.value.slice(0, 14))}
              placeholder="Digite o CPF do motorista"
              className="w-full bg-white text-black rounded-lg px-3 py-2 outline-none font-bold placeholder-black/45 mt-1"
              style={{ fontSize: 15, letterSpacing: "0.05em" }}
              onKeyDown={(e) => e.key === "Enter" && handleCheckin()}
            />
          </div>
          <button
            onClick={handleCheckin}
            disabled={!plate.trim()}
            className="w-12 h-12 flex items-center justify-center rounded-xl transition-all disabled:opacity-50"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <LogIn size={24} color="white" />
          </button>
        </div>

        {/* Check-out CTA */}
        <button
          onClick={onCheckout}
          className="w-full rounded-2xl flex items-center gap-4 p-5 text-left transition-opacity active:opacity-80"
          style={{ backgroundColor: "#1d4ed8" }}
        >
          <div className="flex-1">
            <p
              className="font-semi-bold text-xl text-white"
              style={{ lineHeight: 1.3, letterSpacing: "0.05em" }}
            >
            SAÍDA VEÍCULO
            </p>
          </div>
          <div
            className="rounded-xl p-3 flex-shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.2)"}}
          >
            <LogOut size={26} color="white" />
          </div>
        </button>

        {/* Recent operations */}
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
        >
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ borderBottom: "1px solid #f1f5f9" }}
          >
            <p className="font-semibold text-sm" style={{ color: "#1e293b" }}>
              Últimas Operações
            </p>
            <span className="text-xs" style={{ color: "#94a3b8" }}>
              Hoje
            </span>
          </div>
          {recentOps.map((op) => (
            <button
              key={op.id}
              onClick={() => onViewOp(op)}
              className="w-full px-4 py-3 flex items-center gap-3 text-left active:bg-slate-50 transition-colors"
              style={{ borderBottom: "1px solid #f8fafc" }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-slate-200">
                <CircleUser size={40} color="#94a3b8" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#1e293b", letterSpacing: "0.04em" }}
                >
                  {op.plate}
                </p>
                <p className="text-xs truncate" style={{ color: "#64748b" }}>
                  {op.ok
                    ? op.type === "in"
                      ? "Entrada"
                      : "Saída"
                    : "Bloqueado"}{" "}
                  · {op.desc}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className="flex items-center gap-1"
                  style={{ color: "#94a3b8" }}
                >
                  <Clock size={12} />
                  <span className="text-xs">{op.time}</span>
                </div>
                <ChevronRight size={14} color="#cbd5e1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
