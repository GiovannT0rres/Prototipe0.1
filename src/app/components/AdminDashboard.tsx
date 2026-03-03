import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { LogIn, LogOut, Car, Clock, AlertTriangle, Shield, Activity } from 'lucide-react';

const hourlyData = [
  { hour: '06h', entradas: 5, saidas: 0 },
  { hour: '07h', entradas: 14, saidas: 3 },
  { hour: '08h', entradas: 22, saidas: 8 },
  { hour: '09h', entradas: 20, saidas: 14 },
  { hour: '10h', entradas: 18, saidas: 15 },
  { hour: '11h', entradas: 16, saidas: 18 },
  { hour: '12h', entradas: 12, saidas: 14 },
  { hour: '13h', entradas: 8, saidas: 10 },
  { hour: '14h', entradas: 5, saidas: 3 },
];

const vehicleTypes = [
  { name: 'Carreta 3/4', value: 45, color: '#2563eb' },
  { name: 'Van de Carga', value: 28, color: '#16a34a' },
  { name: 'Caminhão Baú', value: 18, color: '#7c3aed' },
  { name: 'Utilitário', value: 14, color: '#f59e0b' },
  { name: 'Outros', value: 10, color: '#64748b' },
];

const recentOps = [
  { id: 1, plate: 'ABC-1D34', driver: 'João Carlos Silva', type: 'in', time: '14:28', status: 'ok', vehicleType: 'Carreta 3/4' },
  { id: 2, plate: 'XYZ-5E78', driver: 'Maria Santos Lima', type: 'out', time: '14:15', status: 'ok', vehicleType: 'Van de Carga' },
  { id: 3, plate: 'DEF-9F12', driver: 'Carlos Roberto Lima', type: 'in', time: '14:02', status: 'ok', vehicleType: 'Caminhão Baú' },
  { id: 4, plate: 'ROB-3G45', driver: 'N/A', type: 'blocked', time: '13:50', status: 'blocked', vehicleType: 'Utilitário' },
  { id: 5, plate: 'GHI-7H12', driver: 'Ana Costa Pereira', type: 'in', time: '13:45', status: 'ok', vehicleType: 'Carreta 3/4' },
  { id: 6, plate: 'JKL-2I56', driver: 'Pedro Alves Nunes', type: 'out', time: '13:32', status: 'ok', vehicleType: 'Van de Carga' },
  { id: 7, plate: 'MNO-8J90', driver: 'Marcos Dias Costa', type: 'in', time: '13:15', status: 'low-score', vehicleType: 'Caminhão Baú' },
];

const alerts = [
  {
    id: 1,
    plate: 'ROB-3G45',
    type: 'Roubo / Furto',
    time: '13:50',
    action: 'Entrada bloqueada',
    severity: 'critical',
  },
  {
    id: 2,
    plate: 'MNO-8J90',
    type: 'Score Baixo (28/100)',
    time: '13:15',
    action: 'Autorizado com ressalva',
    severity: 'warning',
  },
];

const kpiCards = [
  { label: 'Entradas Hoje', value: '120', sub: '+12% vs. ontem', Icon: LogIn, color: '#16a34a', bg: '#f0fdf4' },
  { label: 'Saídas Hoje', value: '85', sub: '+5% vs. ontem', Icon: LogOut, color: '#1d4ed8', bg: '#eff6ff' },
  { label: 'No Pátio Agora', value: '35', sub: 'veículos ativos', Icon: Car, color: '#7c3aed', bg: '#faf5ff' },
  { label: 'Tempo Médio', value: '2h 15m', sub: 'permanência média', Icon: Clock, color: '#d97706', bg: '#fffbeb' },
];

function getStatusStyle(status: string) {
  if (status === 'ok') return { bg: '#f0fdf4', color: '#16a34a', label: 'Regular' };
  if (status === 'blocked') return { bg: '#fee2e2', color: '#b91c1c', label: 'Bloqueado' };
  return { bg: '#fef3c7', color: '#b45309', label: 'Ressalva' };
}

export function AdminDashboard() {
  return (
    <div className="w-full" style={{ maxWidth: '1100px' }}>
      {/* Header */}
      <div
        className="bg-white rounded-2xl px-6 py-4 mb-5 flex items-center justify-between"
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#0f2744' }}
          >
            <Activity size={20} color="white" />
          </div>
          <div>
            <p className="font-bold text-base" style={{ color: '#0f2744' }}>
              Painel de Gestão · ROCK IN RIO 2026
            </p>
            <p className="text-sm" style={{ color: '#64748b' }}>
              Portão Norte · Atualizado às 15:02 · Segunda-feira, 03/03/2026
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-semibold flex items-center gap-1.5"
            style={{ color: '#16a34a' }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: '#16a34a', display: 'inline-block' }}
            />
            Ao Vivo
          </span>
          <span
            className="text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ backgroundColor: '#f1f5f9', color: '#475569' }}
          >
            Op: Carlos M.
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {kpiCards.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-2xl p-5"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: kpi.bg }}
              >
                <kpi.Icon size={20} color={kpi.color} />
              </div>
            </div>
            <p
              className="font-bold"
              style={{ fontSize: 26, color: '#1e293b', lineHeight: 1.2 }}
            >
              {kpi.value}
            </p>
            <p className="text-sm mt-1" style={{ color: '#475569' }}>
              {kpi.label}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>
              {kpi.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {/* Bar chart */}
        <div
          className="md:col-span-2 bg-white rounded-2xl p-5"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        >
          <p className="font-semibold text-sm" style={{ color: '#1e293b' }}>
            Fluxo de Veículos por Hora
          </p>
          <p className="text-xs mt-0.5 mb-4" style={{ color: '#94a3b8' }}>
            Entradas e saídas ao longo do dia
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hourlyData} barGap={3} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="hour"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  fontSize: 12,
                }}
                labelStyle={{ color: '#1e293b', fontWeight: 600 }}
              />
              <Bar dataKey="entradas" fill="#16a34a" name="Entradas" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saidas" fill="#1d4ed8" name="Saídas" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#16a34a' }} />
              <span className="text-xs" style={{ color: '#64748b' }}>
                Entradas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#1d4ed8' }} />
              <span className="text-xs" style={{ color: '#64748b' }}>
                Saídas
              </span>
            </div>
          </div>
        </div>

        {/* Pie chart */}
        <div
          className="bg-white rounded-2xl p-5"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        >
          <p className="font-semibold text-sm" style={{ color: '#1e293b' }}>
            Tipos de Veículo
          </p>
          <p className="text-xs mt-0.5 mb-2" style={{ color: '#94a3b8' }}>
            Distribuição no pátio
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={vehicleTypes}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {vehicleTypes.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-1">
            {vehicleTypes.map((vt) => (
              <div key={vt.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: vt.color }}
                  />
                  <span className="text-xs" style={{ color: '#475569' }}>
                    {vt.name}
                  </span>
                </div>
                <span className="text-xs font-semibold" style={{ color: '#1e293b' }}>
                  {vt.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts + Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Alerts */}
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        >
          <div
            className="px-5 py-4 flex items-center gap-2"
            style={{ borderBottom: '1px solid #f1f5f9' }}
          >
            <Shield size={16} color="#dc2626" />
            <p className="font-semibold text-sm" style={{ color: '#1e293b' }}>
              Alertas de Segurança
            </p>
            <span
              className="ml-auto text-xs font-bold rounded-full px-2 py-0.5"
              style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}
            >
              {alerts.length}
            </span>
          </div>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="px-5 py-4"
              style={{ borderBottom: '1px solid #f8fafc' }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="font-bold text-sm"
                  style={{ color: '#1e293b', letterSpacing: '0.06em' }}
                >
                  {alert.plate}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    backgroundColor:
                      alert.severity === 'critical' ? '#fee2e2' : '#fef3c7',
                    color: alert.severity === 'critical' ? '#b91c1c' : '#b45309',
                  }}
                >
                  {alert.severity === 'critical' ? 'CRÍTICO' : 'ATENÇÃO'}
                </span>
              </div>
              <p className="text-xs mb-1" style={{ color: '#475569' }}>
                {alert.type}
              </p>
              <p className="text-xs" style={{ color: '#94a3b8' }}>
                {alert.action} · {alert.time}
              </p>
            </div>
          ))}
          <div className="px-5 py-3">
            <p className="text-xs text-center" style={{ color: '#94a3b8' }}>
              2 bloqueios registrados hoje
            </p>
          </div>
        </div>

        {/* Operations table */}
        <div
          className="md:col-span-2 bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        >
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid #f1f5f9' }}
          >
            <p className="font-semibold text-sm" style={{ color: '#1e293b' }}>
              Operações Recentes
            </p>
            <p className="text-xs" style={{ color: '#94a3b8' }}>
              Últimas 7 operações
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  {['Placa', 'Motorista', 'Tipo Veíc.', 'Operação', 'Horário', 'Status'].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold whitespace-nowrap"
                        style={{ color: '#64748b' }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {recentOps.map((op) => {
                  const statusStyle = getStatusStyle(op.status);
                  return (
                    <tr key={op.id} style={{ borderTop: '1px solid #f8fafc' }}>
                      <td className="px-4 py-3">
                        <span
                          className="text-sm font-bold"
                          style={{ color: '#1e293b', letterSpacing: '0.05em' }}
                        >
                          {op.plate}
                        </span>
                      </td>
                      <td
                        className="px-4 py-3 text-sm whitespace-nowrap"
                        style={{ color: '#475569' }}
                      >
                        {op.driver}
                      </td>
                      <td
                        className="px-4 py-3 text-xs whitespace-nowrap"
                        style={{ color: '#64748b' }}
                      >
                        {op.vehicleType}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {op.type === 'in' ? (
                            <LogIn size={12} color="#16a34a" />
                          ) : op.type === 'out' ? (
                            <LogOut size={12} color="#1d4ed8" />
                          ) : (
                            <AlertTriangle size={12} color="#dc2626" />
                          )}
                          <span
                            className="text-xs font-semibold"
                            style={{
                              color:
                                op.type === 'in'
                                  ? '#16a34a'
                                  : op.type === 'out'
                                  ? '#1d4ed8'
                                  : '#dc2626',
                            }}
                          >
                            {op.type === 'in'
                              ? 'Entrada'
                              : op.type === 'out'
                              ? 'Saída'
                              : 'Bloqueado'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#64748b' }}>
                        {op.time}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-semibold"
                          style={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                          }}
                        >
                          {statusStyle.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
