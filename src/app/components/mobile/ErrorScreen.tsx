
import { XCircle, ShieldAlert } from 'lucide-react';

interface Props {
  message: string;
  onHome: () => void;
}

export function ErrorScreen({ message, onHome }: Props) {
  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#dc2626' }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 text-white">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        >
          <XCircle size={54} color="white" />
        </div>

        <h1
          className="text-white text-center mb-2"
          style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}
        >
          Acesso Negado
        </h1>
        <p
          className="text-center text-sm mb-6"
          style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}
        >
          Ocorreu um bloqueio de segurança. A entrada não foi autorizada.
        </p>

        <div
          className="w-full bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
        >
          <div
            className="px-5 py-4 flex items-center gap-3"
            style={{ backgroundColor: '#fef2f2', borderBottom: '2px solid rgba(220, 38, 38, 0.1)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'white' }}
            >
              <ShieldAlert size={20} color="#dc2626" />
            </div>
            <div>
              <p className="text-xs" style={{ color: '#64748b' }}>
                Motivo do Bloqueio
              </p>
              <p className="text-sm font-bold" style={{ color: '#1e293b' }}>
                Restrição Identificada
              </p>
            </div>
          </div>

          <div className="px-5 py-6">
            <p className="text-sm font-semibold text-center" style={{ color: '#1e293b' }}>
              {message}
            </p>
            
            <div 
              className="mt-5 p-3 rounded-xl"
              style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
            >
              <p className="text-xs text-center" style={{ color: '#64748b' }}>
                A instrução de segurança exige que o veículo seja retido ou redirecionado. <strong>Não libere a cancela.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex-shrink-0 px-5 pb-6 flex flex-col gap-3">
        <button
          onClick={onHome}
          className="w-full py-4 rounded-2xl font-bold text-base bg-white transition-opacity active:opacity-80"
          style={{ color: '#dc2626' }}
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}