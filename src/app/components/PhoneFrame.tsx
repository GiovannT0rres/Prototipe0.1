import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function PhoneFrame({ children }: Props) {
  return (
    <div className="relative flex-shrink-0" style={{ width: '375px' }}>
      {/* Physical buttons - left */}
      <div className="absolute bg-zinc-700 rounded-l-sm" style={{ left: -3, top: 92, width: 3, height: 24 }} />
      <div className="absolute bg-zinc-700 rounded-l-sm" style={{ left: -3, top: 128, width: 3, height: 48 }} />
      <div className="absolute bg-zinc-700 rounded-l-sm" style={{ left: -3, top: 188, width: 3, height: 48 }} />
      {/* Power button - right */}
      <div className="absolute bg-zinc-700 rounded-r-sm" style={{ right: -3, top: 148, width: 3, height: 68 }} />

      {/* Outer frame */}
      <div
        className="bg-zinc-950 overflow-hidden"
        style={{
          borderRadius: 44,
          padding: 12,
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.07), 0 0 0 3px #09090b, 0 30px 90px rgba(0,0,0,0.85)',
        }}
      >
        {/* Screen */}
        <div
          className="overflow-hidden flex flex-col bg-black"
          style={{ borderRadius: 36, height: 780 }}
        >
          {/* Status bar */}
          <div
            className="flex-shrink-0 flex items-end justify-between bg-black relative"
            style={{ height: 52, paddingLeft: 28, paddingRight: 26, paddingBottom: 8 }}
          >
            <span className="text-white font-semibold" style={{ fontSize: 15, zIndex: 1 }}>
              10:30
            </span>
            {/* Dynamic Island */}
            <div
              className="absolute bg-black"
              style={{
                top: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 126,
                height: 34,
                borderRadius: 20,
                boxShadow: '0 0 0 2px #18181b',
                zIndex: 0,
              }}
            />
            {/* Right icons */}
            <div className="flex items-center gap-[6px]" style={{ zIndex: 1 }}>
              {/* Signal */}
              <div className="flex items-end gap-[2px]">
                {[4, 6, 8, 10].map((h, i) => (
                  <div key={i} className="bg-white rounded-sm" style={{ width: 3, height: h }} />
                ))}
              </div>
              {/* WiFi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M8 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="white" />
                <path
                  d="M8 6C6.3 6 4.8 6.7 3.7 7.8L4.8 8.9C5.6 8.1 6.7 7.5 8 7.5s2.4.6 3.2 1.4l1.1-1.1C11.2 6.7 9.7 6 8 6z"
                  fill="white"
                  opacity="0.7"
                />
                <path
                  d="M8 3C5.2 3 2.7 4.1.9 6l1.1 1.1C3.5 5.5 5.6 4.5 8 4.5s4.5 1 6 2.6L15.1 6C13.3 4.1 10.8 3 8 3z"
                  fill="white"
                  opacity="0.4"
                />
              </svg>
              {/* Battery */}
              <div className="flex items-center gap-[1px]">
                <div
                  className="border border-white flex items-center px-[2px]"
                  style={{ width: 24, height: 12, borderRadius: 3 }}
                >
                  <div className="bg-white" style={{ width: 14, height: 7, borderRadius: 1.5 }} />
                </div>
                <div className="bg-white rounded-sm" style={{ width: 2, height: 5 }} />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="flex-1 bg-white overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
