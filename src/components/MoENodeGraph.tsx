import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface MoENodeGraphProps {
  startFrame?: number;
}

export const MoENodeGraph: React.FC<MoENodeGraphProps> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - startFrame);

  // Entrance spring
  const entrance = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Continuous smooth dash offset without modulus snap
  const dashOffset = relFrame * 2.5;

  // Active compute counter
  const activeParams = Math.round(interpolate(relFrame, [20, 65], [0, 49], { extrapolateRight: 'clamp' }));

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 1540,
        height: 620,
        backgroundColor: '#0f172a',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        borderRadius: 28,
        padding: '36px 48px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 30px 80px rgba(0,0,0,0.8), inset 0 0 40px rgba(56, 189, 248, 0.08)',
        transform: `scale(${entrance.toFixed(4)})`,
        opacity: entrance,
      }}
    >
      {/* Header with Metrics */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <span style={{ color: '#38bdf8', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
            ARCHITECTURE SIMULATION
          </span>
          <h3 style={{ color: '#ffffff', fontSize: 34, fontWeight: 900, margin: '6px 0 0 0' }}>
            Mixture of Experts Dynamic Token Routing
          </h3>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ background: '#1e293b', padding: '12px 28px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>Total MoE Weights</span>
            <div style={{ color: '#38bdf8', fontSize: 28, fontWeight: 900, fontFamily: 'monospace' }}>1.6 TRILLION</div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '12px 28px', borderRadius: 16, border: '1px solid rgba(16, 185, 129, 0.5)' }}>
            <span style={{ color: '#10b981', fontSize: 15, fontWeight: 700 }}>Active Per Token</span>
            <div style={{ color: '#10b981', fontSize: 28, fontWeight: 900, fontFamily: 'monospace' }}>{activeParams}B ONLY</div>
          </div>
        </div>
      </div>

      {/* SVG Kinetic Routing Network */}
      <div style={{ flex: 1, position: 'relative' }}>
        <svg width="100%" height="100%" viewBox="0 0 1440 420" fill="none">
          {/* Incoming Token Stream Wire */}
          <path
            d="M 60 210 L 360 210"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeDasharray="10 10"
            strokeDashoffset={-dashOffset}
          />

          {/* Router Node (Center Left) */}
          <g transform="translate(360, 210)">
            <circle r="52" fill="#0b1120" stroke="#38bdf8" strokeWidth="3.5" />
            <circle
              r="62"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              opacity="0.45"
              strokeDasharray="8 6"
              style={{
                transformOrigin: 'center',
                transformBox: 'fill-box',
                transform: `rotate(${relFrame * 1.2}deg)`,
              }}
            />
            <text fill="#ffffff" fontSize="16" fontWeight="800" textAnchor="middle" dy="-5">TOKEN</text>
            <text fill="#38bdf8" fontSize="14" fontWeight="700" textAnchor="middle" dy="16">ROUTER</text>
          </g>

          {/* Connection Lines from Router to Experts */}
          {[
            { y: 60, active: true },
            { y: 160, active: false },
            { y: 260, active: true },
            { y: 360, active: false },
          ].map((node, i) => {
            const pathD = `M 412 210 C 560 210, 620 ${node.y}, 800 ${node.y}`;
            return (
              <g key={i}>
                <path
                  d={pathD}
                  stroke={node.active ? '#10b981' : 'rgba(100, 116, 139, 0.25)'}
                  strokeWidth={node.active ? '4' : '1.8'}
                  fill="none"
                  strokeDasharray={node.active ? '12 8' : 'none'}
                  strokeDashoffset={node.active ? -dashOffset * 1.4 : 0}
                />
              </g>
            );
          })}

          {/* Expert Nodes (Right Side) */}
          {[
            { label: 'Expert #1 (Code Logic)', y: 60, active: true, tag: 'ACTIVE' },
            { label: 'Expert #2 (Creative Synthesis)', y: 160, active: false, tag: 'IDLE' },
            { label: 'Expert #3 (Math & Proofs)', y: 260, active: true, tag: 'ACTIVE' },
            { label: 'Expert #4 (Language Nuance)', y: 360, active: false, tag: 'IDLE' },
          ].map((exp, i) => (
            <g key={i} transform={`translate(800, ${exp.y - 34})`}>
              <rect
                width="540"
                height="68"
                rx="18"
                fill={exp.active ? 'rgba(16, 185, 129, 0.18)' : 'rgba(30, 41, 59, 0.4)'}
                stroke={exp.active ? '#10b981' : 'rgba(255,255,255,0.08)'}
                strokeWidth={exp.active ? '2.5' : '1'}
              />
              <circle
                cx="38"
                cy="34"
                r="12"
                fill={exp.active ? '#10b981' : '#475569'}
                filter={exp.active ? 'drop-shadow(0 0 10px #10b981)' : 'none'}
              />
              <text x="68" y="41" fill="#ffffff" fontSize="19" fontWeight="700">
                {exp.label}
              </text>
              <rect
                x="410"
                y="20"
                width="100"
                height="28"
                rx="8"
                fill={exp.active ? '#10b981' : 'rgba(255,255,255,0.06)'}
              />
              <text
                x="460"
                y="39"
                fill={exp.active ? '#022c22' : 'rgba(255,255,255,0.4)'}
                fontSize="13"
                fontWeight="900"
                textAnchor="middle"
              >
                {exp.tag}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
