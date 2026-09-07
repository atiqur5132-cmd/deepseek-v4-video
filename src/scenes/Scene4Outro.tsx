import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from 'remotion';
import { AtmosphereLayer } from '../components/AtmosphereLayer';
import { CameraRig } from '../components/CameraRig';
import { KineticText } from '../components/KineticText';

export const Scene4Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sub-Beats (Total: 1432 frames / ~47.7 seconds @ 30fps)
  // Beat 1: 0 - 700 (0s - 23.3s) - Open Weights Moat Evaporation & MIT License
  // Beat 2: 700 - 1432 (23.3s - 47.7s) - Community Call to Action
  const isBeat1 = frame < 700;
  const isBeat2 = frame >= 700;

  // Beat 1 animations
  const beat1Frame = frame;
  const shieldScale = spring({ frame: beat1Frame - 15, fps, config: { damping: 14, stiffness: 120 } });

  // Beat 2 animations
  const beat2Frame = Math.max(0, frame - 700);
  const ctaSpring = spring({ frame: beat2Frame, fps, config: { damping: 14, stiffness: 110 } });
  const bellPulse = Math.sin(beat2Frame / 15) * 0.08 + 1;

  return (
    <AbsoluteFill style={{ backgroundColor: '#07090e', overflow: 'hidden' }}>
      {/* Layer 0: Ambient Atmosphere with Royal Blue / Violet Glow */}
      <AtmosphereLayer
        glowColor1="rgba(37, 99, 235, 0.18)"
        glowColor2="rgba(168, 85, 247, 0.15)"
        gridOpacity={0.3}
      />

      <CameraRig durationInFrames={1432} zoomFrom={1.0} zoomTo={1.09} swayIntensity={4}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>

          {/* ========================================================= */}
          {/* BEAT 1 (0 - 23.3s): MIT License & Moat Evaporation        */}
          {/* ========================================================= */}
          {isBeat1 && (
            <div style={{ width: '100%', maxWidth: 1300, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              {/* MIT License Badge */}
              <div
                style={{
                  transform: `scale(${shieldScale})`,
                  backgroundColor: 'rgba(37, 99, 235, 0.2)',
                  border: '1px solid rgba(59, 130, 246, 0.6)',
                  color: '#60a5fa',
                  padding: '12px 32px',
                  borderRadius: 100,
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: 32,
                  boxShadow: '0 0 40px rgba(37, 99, 235, 0.35)',
                }}
              >
                🛡️ MIT OPEN-WEIGHTS COMMERCIAL LICENSE
              </div>

              {/* Kinetic Headline */}
              <KineticText
                text="The Moat Around Proprietary Frontier AI is Officially Evaporating"
                startFrame={10}
                staggerFrames={3}
                highlightWords={['Moat', 'Proprietary', 'Evaporating']}
                highlightColor="#38bdf8"
                fontSize={68}
              />

              {/* Dual Enterprise Benefit Cards */}
              <div
                style={{
                  marginTop: 48,
                  display: 'flex',
                  gap: 32,
                  width: '85%',
                  opacity: interpolate(beat1Frame, [45, 75], [0, 1], { extrapolateRight: 'clamp' }),
                }}
              >
                <div style={{ flex: 1, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '24px 32px', textAlign: 'left' }}>
                  <div style={{ color: '#10b981', fontSize: 22, fontWeight: 800 }}>🔐 100% Data Sovereignty</div>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, margin: '8px 0 0 0' }}>
                    Run frontier-class reasoning inside your private clusters without API rate limits or privacy leaks.
                  </p>
                </div>

                <div style={{ flex: 1, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '24px 32px', textAlign: 'left' }}>
                  <div style={{ color: '#38bdf8', fontSize: 22, fontWeight: 800 }}>⚡ Architectural Efficiency</div>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, margin: '8px 0 0 0' }}>
                    Proves smart algorithmic engineering can outcompete billions in brute-force compute clusters.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* BEAT 2 (23.3 - 47.7s): Community Outro & Subscribe        */}
          {/* ========================================================= */}
          {isBeat2 && (
            <div
              style={{
                width: '100%',
                maxWidth: 1200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${ctaSpring})`,
                opacity: ctaSpring,
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <span style={{ color: '#38bdf8', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  WHAT IS YOUR TAKE?
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 60, fontWeight: 900, margin: '8px 0 0 0' }}>
                  Will You Switch to Open-Weights?
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 24, marginTop: 14 }}>
                  Drop your thoughts and benchmarks in the comments below.
                </p>
              </div>

              {/* Subscribe Box */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(16, 185, 129, 0.2))',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 24,
                  padding: '36px 64px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 40,
                  boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                }}
              >
                <div style={{ color: '#ffffff', fontSize: 28, fontWeight: 800 }}>
                  🔔 Subscribe For Next AI Frontier Breakdown
                </div>
                <div
                  style={{
                    background: '#ef4444',
                    color: '#ffffff',
                    padding: '16px 36px',
                    borderRadius: 16,
                    fontSize: 22,
                    fontWeight: 900,
                    boxShadow: '0 0 30px rgba(239, 68, 68, 0.6)',
                    transform: `scale(${bellPulse})`,
                  }}
                >
                  SUBSCRIBE
                </div>
              </div>
            </div>
          )}

        </AbsoluteFill>
      </CameraRig>
    </AbsoluteFill>
  );
};
