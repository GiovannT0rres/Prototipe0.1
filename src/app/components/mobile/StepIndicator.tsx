import { Check } from 'lucide-react';

const PHASES = [
  { label: 'Pessoa' },
  { label: 'Autorização' },
  { label: 'Veículo' },
];

interface Props {
  currentPhase: 1 | 2 | 3; // 1=Pessoa, 2=Autorização, 3=Veículo
}

export function StepIndicator({ currentPhase }: Props) {
  return (
    <div className="flex items-start gap-1">
      {PHASES.map((phase, i) => {
        const idx = i + 1;
        const done = idx < currentPhase;
        const active = idx === currentPhase;
        return (
          <div key={i} className="flex items-start gap-1">
            <div className="flex flex-col items-center gap-0.5">
              {/* Circle */}
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width: 26,
                  height: 26,
                  backgroundColor: done ? '#4ade80' : active ? 'white' : 'rgba(255,255,255,0.15)',
                  border: active ? '2px solid white' : 'none',
                }}
              >
                {done ? (
                  <Check size={12} strokeWidth={3} color="#0f2744" />
                ) : (
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: active ? '#0f2744' : 'rgba(255,255,255,0.4)',
                  }}>
                    {idx}
                  </span>
                )}
              </div>
              {/* Label */}
              <span style={{
                fontSize: 8,
                fontWeight: 600,
                color: done ? '#4ade80' : active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                letterSpacing: '0.02em',
              }}>
                {phase.label}
              </span>
            </div>
            {/* Connector line */}
            {i < PHASES.length - 1 && (
              <div style={{
                width: 16,
                height: 2,
                marginTop: 12,
                borderRadius: 1,
                backgroundColor: done ? '#4ade80' : 'rgba(255,255,255,0.15)',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
