import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from 'remotion';
import { AtmosphereLayer } from '../components/AtmosphereLayer';
import { CameraRig } from '../components/CameraRig';
import { MoENodeGraph } from '../components/MoENodeGraph';

export const Scene2Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sub-Beat Timings (Total: 1950 frames / 65 seconds @ 30fps)
  // Beat 1: 0 - 650 (0s - 21.6s) - MoE Dynamic Token Routing Simulation
  // Beat 2: 650 - 1300 (21.6s - 43.3s) - Hybrid Attention (CSA + HCA) 1M Context
  // Beat 3: 1300 - 1950 (43.3s - 65s) - Engram Memory Structure
  const isBeat1 = frame < 650;
  const isBeat2 = frame >= 650 && frame < 1300;
  const isBeat3 = frame >= 1300;

  // Beat 2 frames
  const beat2Frame = Math.max(0, frame - 650);
  const contextProgress = interpolate(beat2Frame, [20, 100], [128, 1000], { extrapolateRight: 'clamp' });
  const memoryBarWidth = interpolate(beat2Frame, [30, 90], [10, 88], { extrapolateRight: 'clamp' });

  // Beat 3 frames
  const beat3Frame = Math.max(0, frame - 1300);
  const engramEntrance = spring({
    frame: beat3Frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#07090e', overflow: 'hidden' }}>
      {/* Layer 0: Ambient Atmosphere with Emerald / Cyan Glow */}
      <AtmosphereLayer
        glowColor1="rgba(16, 185, 129, 0.16)"
        glowColor2="rgba(56, 189, 248, 0.14)"
        gridOpacity={0.35}
      />

      {/* Camera Rig with continuous subtle drift */}
      <CameraRig durationInFrames={1950} zoomFrom={1.0} zoomTo={1.10} swayIntensity={4.5}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>

          {/* ========================================================= */}
          {/* BEAT 1 (0 - 21.6s): Mixture of Experts Simulation         */}
          {/* ========================================================= */}
          {isBeat1 && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <MoENodeGraph startFrame={0} />
            </div>
          )}

          {/* ========================================================= */}
          {/* BEAT 2 (21.6 - 43.3s): Hybrid Attention & 1M Context      */}
          {/* ========================================================= */}
          {isBeat2 && (
            <div style={{ width: '100%', maxWidth: 1300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <span style={{ color: '#10b981', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  BREAKTHROUGH #2: MEMORY SCALING
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, margin: '8px 0 0 0' }}>
                  Hybrid Attention: 1-Million Token Context
                </h2>
              </div>

              {/* Context Window Progress Meter */}
              <div
                style={{
                  width: '90%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: 24,
                  padding: 40,
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                  marginBottom: 32,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                  <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 700 }}>Active Context Window Capacity</span>
                  <span style={{ color: '#10b981', fontSize: 44, fontWeight: 900, fontFamily: 'monospace' }}>
                    {Math.round(contextProgress)}K TOKENS
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div style={{ width: '100%', height: 36, background: '#1e293b', borderRadius: 12, overflow: 'hidden', padding: 4 }}>
                  <div
                    style={{
                      width: `${memoryBarWidth}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #38bdf8, #10b981)',
                      borderRadius: 8,
                      boxShadow: '0 0 25px rgba(16, 185, 129, 0.6)',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 600 }}>
                  <span>128K Standard</span>
                  <span>512K Extended</span>
                  <span style={{ color: '#10b981' }}>1,000,000 (1M) Massive Window</span>
                </div>
              </div>

              {/* CSA vs HCA Dual Tech Cards */}
              <div style={{ display: 'flex', gap: 32, width: '90%' }}>
                <div style={{ flex: 1, background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '24px 32px' }}>
                  <span style={{ color: '#38bdf8', fontSize: 18, fontWeight: 800 }}>CSA (Compressed Sparse Attention)</span>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, margin: '8px 0 0 0' }}>
                    Compresses redundant token sequences, preserving vital needle-in-haystack context without memory explosion.
                  </p>
                </div>

                <div style={{ flex: 1, background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 20, padding: '24px 32px' }}>
                  <span style={{ color: '#10b981', fontSize: 18, fontWeight: 800 }}>HCA (Heavily Compressed Attention)</span>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, margin: '8px 0 0 0' }}>
                    Slashes KV-cache footprint by up to 85%, making multi-million token inference commercially viable on consumer clusters.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* BEAT 3 (43.3 - 65s): Engram Memory Technology             */}
          {/* ========================================================= */}
          {isBeat3 && (
            <div
              style={{
                width: '100%',
                maxWidth: 1280,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${engramEntrance})`,
                opacity: engramEntrance,
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <span style={{ color: '#a855f7', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  BREAKTHROUGH #3: ZERO-HALLUCINATION MEMORY
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, margin: '8px 0 0 0' }}>
                  Engram Memory: Separation of Concerns
                </h2>
              </div>

              {/* Dual Core Split Visualization */}
              <div style={{ display: 'flex', gap: 40, width: '92%', justifyContent: 'center' }}>
                {/* Branch 1: Static Facts Lookup */}
                <div
                  style={{
                    flex: 1,
                    background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
                    border: '1px solid rgba(168, 85, 247, 0.4)',
                    borderRadius: 24,
                    padding: 40,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(168, 85, 247, 0.15)',
                  }}
                >
                  <div style={{ display: 'inline-block', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', padding: '6px 16px', borderRadius: 8, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>
                    STATIC KNOWLEDGE
                  </div>
                  <h3 style={{ color: '#ffffff', fontSize: 28, fontWeight: 800, margin: 0 }}>Engram Fast-Lookup Table</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.5, marginTop: 14 }}>
                    Factual data is retrieved instantaneously via hash-indexed lookups without wasting compute cycles inside deep attention layers.
                  </p>
                  <div style={{ marginTop: 24, color: '#c084fc', fontSize: 22, fontWeight: 800 }}>
                    ⚡ Instantaneous O(1) Recall
                  </div>
                </div>

                {/* Branch 2: Dynamic Reasoning */}
                <div
                  style={{
                    flex: 1,
                    background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95))',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    borderRadius: 24,
                    padding: 40,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(56, 189, 248, 0.15)',
                  }}
                >
                  <div style={{ display: 'inline-block', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '6px 16px', borderRadius: 8, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>
                    DYNAMIC REASONING
                  </div>
                  <h3 style={{ color: '#ffffff', fontSize: 28, fontWeight: 800, margin: 0 }}>Pure Logic & Synthesis</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.5, marginTop: 14 }}>
                    Transformer attention heads are freed from memorization, focusing 100% of GPU compute on multi-step reasoning and algorithmic problem solving.
                  </p>
                  <div style={{ marginTop: 24, color: '#38bdf8', fontSize: 22, fontWeight: 800 }}>
                    🧠 Zero Attention Clutter
                  </div>
                </div>
              </div>
            </div>
          )}

        </AbsoluteFill>
      </CameraRig>
    </AbsoluteFill>
  );
};
