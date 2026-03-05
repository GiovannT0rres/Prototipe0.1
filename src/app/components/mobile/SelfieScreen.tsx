import { ArrowLeft, CircleUser } from "lucide-react";
import { StepIndicator } from "./StepIndicator";

interface Props {
  driverName: string;
  isNewDriver: boolean;
  onConfirm: () => void;
  onBack: () => void;
}

export function SelfieScreen({
  driverName,
  isNewDriver,
  onConfirm,
  onBack,
}: Props) {
  // Pega apenas o primeiro nome (ex: "Carlos Eduardo Melo" vira "Carlos")
  const firstName = driverName.split(" ")[0];

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
          onClick={onBack}
          className="p-2 rounded-xl flex-shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        >
          <ArrowLeft size={18} color="white" />
        </button>
        <div className="flex-1 flex justify-center">
          <StepIndicator currentPhase={1} />
        </div>
        <div style={{ width: 34 }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-6 items-center">
        {/* Title Section */}
        <div className="text-left w-full py-5">
          {isNewDriver ? (
            <>
              <p
                className="text-2xl leading-tight"
                style={{ color: "#1e293b" }}
              >
                Capture a <span className="font-bold">FOTO SELFIE</span> <br />{" "}
                do motorista {firstName}!
              </p>
            </>
          ) : (
            <>
              <p
                className="text-2xl leading-tight"
                style={{ color: "#1e293b" }}
              >
                Essa é a <span className="font-bold">FOTO SELFIE</span>
              </p>
              <p
                className="text-2xl leading-tight"
                style={{ color: "#1e293b" }}
              >
                do motorista {firstName}?
              </p>
            </>
          )}
        </div>

        {/* Action Button (Selfie Box) */}
        <button
          onClick={onConfirm}
          className="w-full max-w-[240px] aspect-[3/4] bg-slate-100 rounded-3xl overflow-hidden flex flex-col items-center justify-center border-2 border-slate-200 shadow-sm transition-colors hover:bg-slate-200 active:bg-slate-200"
        >
          <CircleUser size={140} color="#94a3b8" />
          <p
            className="text-xs font-semibold mt-2"
            style={{ color: "#94a3b8" }}
          >
            {isNewDriver ? "Toque para capturar" : "Toque para confirmar"}
          </p>
        </button>
      </div>
    </div>
  );
}
