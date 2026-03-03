import { useState } from 'react';
import { MobileApp } from './components/MobileApp';
import { AdminDashboard } from './components/AdminDashboard';
import { Smartphone, Monitor } from 'lucide-react';

type View = 'mobile' | 'admin';

export default function App() {
  const [view, setView] = useState<View>('mobile');

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0c1424' }}>
      
      {/* Top nav */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1d4ed8' }}>
            <span className="text-white font-bold text-sm">EF</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">EventFlow</p>
          </div>
        </div>

        {/* Botoes de trocar tela */}
        <div className="flex items-center gap-1 rounded-xl p-1" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
          <button onClick={() => setView('mobile')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={view === 'mobile' ? { backgroundColor: 'white', color: '#0c1424' } : { color: '#64748b' }}>
            <Smartphone size={15} /> App Operador
          </button>
          <button onClick={() => setView('admin')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={view === 'admin' ? { backgroundColor: 'white', color: '#0c1424' } : { color: '#64748b' }}>
            <Monitor size={15} /> Painel Gestor
          </button>
        </div>
      </header>

      {/* Main content - SEM O PHONE FRAME */}
      <main className="flex-1 overflow-hidden flex justify-center items-center p-6">
        {view === 'mobile' ? (
          <div className="w-full h-[850px] max-w-[400px] bg-slate-100 rounded-[40px] shadow-2xl overflow-hidden border-8 border-slate-800 relative">
            <MobileApp />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center gap-5 overflow-y-auto">
            <AdminDashboard />
          </div>
        )}
      </main>

    </div>
  );
}