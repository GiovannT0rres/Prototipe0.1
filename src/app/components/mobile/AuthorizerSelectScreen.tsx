import { useState, useMemo } from 'react';
import { ArrowLeft, UserCheck, Search, ChevronRight } from 'lucide-react';
import { StepIndicator } from './StepIndicator';

interface Props {
  isNewDriver: boolean;
  onSelect: (authorizer: string) => void;
  onBack: () => void;
}

const RECENT_AUTHORIZERS = [
  { name: 'Carlos Mendes', role: 'Gerente de Operações' },
  { name: 'Ana Beatriz Souza', role: 'Segurança' },
  { name: 'Roberto Lima', role: 'Portaria' },
];

const OTHER_AUTHORIZERS = [
  { name: 'Alexandre Torres', role: 'TI' },
  { name: 'Amanda Ferreira', role: 'RH' },
  { name: 'Bruno Carvalho', role: 'Manutenção' },
  { name: 'Camila Rocha', role: 'Logística' },
  { name: 'Diego Martins', role: 'Compras' },
  { name: 'Eduardo Pinto', role: 'Financeiro' },
  { name: 'Fabiana Costa', role: 'Jurídico' },
  { name: 'Gabriel Nunes', role: 'Engenharia' },
  { name: 'Helena Vieira', role: 'Qualidade' },
  { name: 'Igor Santana', role: 'Produção' },
  { name: 'Juliana Campos', role: 'Comercial' },
  { name: 'Leandro Moura', role: 'HSE' },
  { name: 'Marcelo Dias', role: 'Facilities' },
  { name: 'Natália Ramos', role: 'Projetos' },
  { name: 'Otávio Silva', role: 'Diretoria' },
];

const ALL_AUTHORIZERS = [...RECENT_AUTHORIZERS, ...OTHER_AUTHORIZERS];

export function AuthorizerSelectScreen({ isNewDriver, onSelect, onBack }: Props) {
  const [value, setValue] = useState('');

  const filtered = useMemo(() => {
    if (!value.trim()) return null;
    return ALL_AUTHORIZERS.filter((a) =>
      a.name.toLowerCase().includes(value.toLowerCase()) ||
      a.role.toLowerCase().includes(value.toLowerCase())
    );
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
          Quem autorizou a entrada?
        </p>
        <div
          className="flex items-center gap-2 rounded-2xl px-4 py-3 border-2 transition-colors"
          style={{ borderColor: value ? '#16a34a' : '#e2e8f0', backgroundColor: '#f8fafc' }}
        >
          <Search size={17} color={value ? '#16a34a' : '#94a3b8'} />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Nome do autorizador..."
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
                <UserCheck size={28} color="#cbd5e1" />
                <p className="text-sm" style={{ color: '#94a3b8' }}>Nenhum autorizador encontrado</p>
              </div>
            ) : (
              filtered.map((auth, i) => (
                <button key={auth.name} onClick={() => setValue(auth.name)}
                  className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50"
                  style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f0fdf4' }}>
                    <UserCheck size={15} color="#16a34a" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: '#1e293b' }}>{auth.name}</p>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>{auth.role}</p>
                  </div>
                  <ChevronRight size={13} color="#cbd5e1" />
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="px-4 py-3 flex flex-col gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#94a3b8' }}>Mais Frequentes</p>
              <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                {RECENT_AUTHORIZERS.map((auth, i) => (
                  <button key={auth.name} onClick={() => setValue(auth.name)}
                    className="w-full px-4 py-3.5 flex items-center gap-3 text-left hover:bg-slate-50"
                    style={{ borderBottom: i < RECENT_AUTHORIZERS.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f0fdf4' }}>
                      <UserCheck size={16} color="#16a34a" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm" style={{ color: '#1e293b' }}>{auth.name}</p>
                      <p className="text-xs" style={{ color: '#94a3b8' }}>{auth.role}</p>
                    </div>
                    <ChevronRight size={13} color="#cbd5e1" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#94a3b8' }}>Outros Autorizadores</p>
              <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                {OTHER_AUTHORIZERS.map((auth, i) => (
                  <button key={auth.name} onClick={() => setValue(auth.name)}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50"
                    style={{ borderBottom: i < OTHER_AUTHORIZERS.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f1f5f9' }}>
                      <UserCheck size={13} color="#94a3b8" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm" style={{ color: '#334155' }}>{auth.name}</p>
                      <p className="text-xs" style={{ color: '#94a3b8' }}>{auth.role}</p>
                    </div>
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
