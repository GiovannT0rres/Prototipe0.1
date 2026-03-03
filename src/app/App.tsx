import { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { PhoneFrame } from './components/PhoneFrame';
import { MobileApp } from './components/MobileApp';
import { AdminDashboard } from './components/AdminDashboard';

type View = 'mobile' | 'admin';

export default function App() {
  const [view, setView] = useState<View>('mobile');

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0c1424' }}>
      {/* Top nav */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#1d4ed8' }}
          >
            <span className="text-white font-bold text-sm" style={{ letterSpacing: '0.05em' }}>
              EF
            </span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">EventFlow</p>
            <p className="text-xs" style={{ color: '#475569' }}>
              Controle Logístico de Eventos
            </p>
          </div>
          <span
            className="ml-2 text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
          >
            Protótipo v1.0
          </span>
        </div>

        {/* View toggle */}
        <div
          className="flex items-center gap-1 rounded-xl p-1"
          style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
        >
          <button
            onClick={() => setView('mobile')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={
              view === 'mobile'
                ? { backgroundColor: 'white', color: '#0c1424' }
                : { color: '#64748b' }
            }
          >
            <Smartphone size={15} />
            App Operador
          </button>
          <button
            onClick={() => setView('admin')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={
              view === 'admin'
                ? { backgroundColor: 'white', color: '#0c1424' }
                : { color: '#64748b' }
            }
          >
            <Monitor size={15} />
            Painel Gestor
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {view === 'mobile' ? (
          <div className="flex flex-col items-center gap-6 min-h-full justify-center">
            {/* Title */}
            <div className="text-center">
              <p className="text-white font-semibold text-base">App do Operador de Portão</p>
              <p className="text-xs mt-1" style={{ color: '#475569' }}>
                Toque nos botões para navegar entre as telas do protótipo interativo
              </p>
            </div>

            {/* Phone */}
            <PhoneFrame>
              <MobileApp />
            </PhoneFrame>

            {/* Flow hint */}
            <div
              className="rounded-xl px-5 py-3 flex items-center gap-3 text-xs"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#64748b',
                maxWidth: '420px',
              }}
            >
              <span style={{ color: '#1d4ed8', fontSize: 18 }}>→</span>
              <span>
                Fluxo: <span style={{ color: '#94a3b8' }}>Início</span> →{' '}
                <span style={{ color: '#94a3b8' }}>Dados do Veículo</span> →{' '}
                <span style={{ color: '#94a3b8' }}>Validação</span> →{' '}
                <span style={{ color: '#94a3b8' }}>Dados do Motorista</span> →{' '}
                <span style={{ color: '#94a3b8' }}>Check-in Concluído</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 min-h-full">
            <div className="text-center">
              <p className="text-white font-semibold text-base">Painel Administrativo do Gestor</p>
              <p className="text-xs mt-1" style={{ color: '#475569' }}>
                Indicadores em tempo real, fluxo de veículos e alertas de segurança
              </p>
            </div>
            <AdminDashboard />
          </div>
        )}
      </main>
    </div>
  );
}
