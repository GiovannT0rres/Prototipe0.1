import { ArrowLeft, Camera, User } from 'lucide-react';

interface Props {
  driverName: string;
  isNewDriver: boolean;
  onConfirm: () => void;
  onBack: () => void;
}

export function SelfieScreen({ driverName, isNewDriver, onConfirm, onBack }: Props) {
  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#f1f5f9' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-4 flex items-center gap-3" style={{ backgroundColor: '#0f2744' }}>
        <button onClick={onBack} className="p-2 rounded-xl flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
          <ArrowLeft size={19} color="white" />
        </button>
        <div className="flex-1">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Check-in · Foto</p>
          <p className="font-semibold text-white text-sm">
            {isNewDriver ? 'Cadastro Facial' : 'Confirmação Facial'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6 items-center justify-center">
        <div className="text-center">
          <p className="font-bold text-xl text-slate-800" style={{ lineHeight: 1.3 }}>
            {isNewDriver 
              ? 'Por favor, capture uma foto para o registro deste motorista.' 
              : 'ESSE É O MOTORISTA QUE VOCÊ ESTÁ DANDO ENTRADA?'}
          </p>
          <p className="text-sm font-medium text-slate-500 mt-2">
            {driverName}
          </p>
        </div>

        {isNewDriver ? (
          <button onClick={onConfirm} className="w-full max-w-[240px] aspect-[3/4] bg-slate-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center border-4 border-white shadow-sm mt-2 transition-colors hover:bg-slate-300 active:bg-slate-300">
            <Camera size={54} color="#94a3b8" />
            <p className="text-sm font-bold text-slate-500 mt-4">Tirar Foto Frontal</p>
          </button>
        ) : (
          <button onClick={onConfirm} className="w-full max-w-[240px] aspect-[3/4] bg-slate-200 rounded-3xl overflow-hidden flex flex-col items-center justify-center border-4 border-white shadow-sm mt-2 transition-colors hover:bg-slate-300 active:bg-slate-300">
            <User size={84} color="#94a3b8" />
          </button>
        )}
      </div>
    </div>
  );
}
