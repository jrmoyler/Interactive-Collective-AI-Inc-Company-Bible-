import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CinematicLoaderProps {
  onComplete: () => void;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [phase, setPhase] = useState<"particles" | "network" | "human" | "brain" | "logo" | "transition">("particles");
  const [timeline, setTimeline] = useState<number>(0); // in seconds
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Skip state
  const [hasSkipped, setHasSkipped] = useState(false);

  useEffect(() => {
    // Timeline progression simulation (up to 8.5 seconds)
    const interval = setInterval(() => {
      setTimeline((prev) => {
        const next = parseFloat((prev + 0.1).toFixed(1));
        if (next >= 8.5) {
          clearInterval(interval);
          return 8.5;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Safe callback outside the render/updater cycle
  useEffect(() => {
    if (timeline >= 8.5 && !hasSkipped) {
      onComplete();
    }
  }, [timeline, hasSkipped, onComplete]);

  // Determine current active phase based on timeline
  useEffect(() => {
    if (timeline < 1.8) {
      setPhase("particles");
    } else if (timeline < 3.8) {
      setPhase("network");
    } else if (timeline < 5.5) {
      setPhase("human");
    } else if (timeline < 7.2) {
      setPhase("brain");
    } else {
      setPhase("logo");
    }
  }, [timeline]);

  // Canvas-based simulation for all transitions (no SVGs!)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particles system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }

    const particleCount = 100;
    const particles: Particle[] = [];

    // Create background floating cyan/teal particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    // Grid points for network constellation
    const networkPoints: { x: number; y: number }[] = [];
    const rows = 5;
    const cols = 7;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        networkPoints.push({
          x: (width / (cols + 1)) * (c + 1) + (Math.random() - 0.5) * 45,
          y: (height / (rows + 1)) * (r + 1) + (Math.random() - 0.5) * 45,
        });
      }
    }

    const draw = () => {
      ctx.fillStyle = "rgba(5, 7, 15, 0.25)"; // Trails
      ctx.fillRect(0, 0, width, height);

      // Deep interstellar blue-black atmosphere glow
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.05,
        width / 2,
        height / 2,
        width * 0.75
      );
      gradient.addColorStop(0, "rgba(10, 22, 43, 0.4)");
      gradient.addColorStop(1, "rgba(4, 6, 12, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const timeSecs = timeline;

      // Update and draw particles based on physical timeline
      particles.forEach((p, idx) => {
        if (timeSecs < 1.8) {
          // Phase 1: Drifting space dust
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        } else if (timeSecs < 3.8) {
          // Phase 2: Drawing towards the grid nodes
          const target = networkPoints[idx % networkPoints.length];
          const progress = Math.min((timeSecs - 1.8) / 1.6, 1.0);
          p.x = p.x * (1 - progress * 0.08) + target.x * (progress * 0.08);
          p.y = p.y * (1 - progress * 0.08) + target.y * (progress * 0.08);
        } else if (timeSecs < 7.2) {
          // Phase 3 & 4: Slow vortex circling around central stage
          const angle = (idx * 0.06) + (timeSecs * 0.4);
          const r = 160 + Math.sin(timeSecs * 1.8 + idx) * 25;
          const centerX = width / 2;
          const centerY = height / 2;
          p.x = p.x * 0.94 + (centerX + Math.cos(angle) * r) * 0.06;
          p.y = p.y * 0.94 + (centerY + Math.sin(angle) * r) * 0.06;
        } else {
          // Phase 5: Fadeout particles
          p.x += p.vx * 0.2;
          p.y += p.vy * 0.2;
          p.alpha = Math.max(0, p.alpha - 0.025);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 181, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(0, 217, 181, 0.7)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Phase 2 Constellation lines (interconnecting neural net)
      if (timeSecs >= 1.6 && timeSecs < 3.8) {
        ctx.lineWidth = 0.8;
        for (let i = 0; i < networkPoints.length; i++) {
          for (let j = i + 1; j < networkPoints.length; j++) {
            const dx = networkPoints[i].x - networkPoints[j].x;
            const dy = networkPoints[i].y - networkPoints[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < width * 0.15) {
              const alpha = Math.max(0, 1 - dist / (width * 0.15)) * Math.min((timeSecs - 1.6) / 1.4, 1.0);
              ctx.strokeStyle = `rgba(0, 217, 181, ${alpha * 0.18})`;
              ctx.beginPath();
              ctx.moveTo(networkPoints[i].x, networkPoints[i].y);
              ctx.lineTo(networkPoints[j].x, networkPoints[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Phase 3: Neon Wireframe Human Anatomy Outline (100% Canvas, No SVGs)
      if (timeSecs >= 3.8 && timeSecs < 5.5) {
        const centerX = width / 2;
        const centerY = height / 2;
        const scale = Math.min(width, height) * 0.0038;

        ctx.strokeStyle = "rgba(0, 217, 181, 0.45)";
        ctx.lineWidth = 1.6;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(0, 217, 181, 0.5)";

        // Head node
        ctx.beginPath();
        ctx.arc(centerX, centerY - 65 * scale, 13 * scale, 0, Math.PI * 2);
        ctx.stroke();

        // Spine axis
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 52 * scale);
        ctx.lineTo(centerX, centerY + 22 * scale);
        ctx.stroke();

        // Shoulders & Chest
        ctx.beginPath();
        ctx.moveTo(centerX - 35 * scale, centerY - 44 * scale);
        ctx.lineTo(centerX + 35 * scale, centerY - 44 * scale);
        ctx.stroke();

        // Left arm
        ctx.beginPath();
        ctx.moveTo(centerX - 35 * scale, centerY - 44 * scale);
        ctx.lineTo(centerX - 42 * scale, centerY + 5 * scale);
        ctx.lineTo(centerX - 48 * scale, centerY + 45 * scale);
        ctx.stroke();

        // Right arm
        ctx.beginPath();
        ctx.moveTo(centerX + 35 * scale, centerY - 44 * scale);
        ctx.lineTo(centerX + 42 * scale, centerY + 5 * scale);
        ctx.lineTo(centerX + 48 * scale, centerY + 45 * scale);
        ctx.stroke();

        // Neural spine rib synapses branching
        for (let idxOffset = -28; idxOffset <= 5; idxOffset += 14) {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY + idxOffset * scale);
          ctx.lineTo(centerX - 24 * scale, centerY + (idxOffset + 4) * scale);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(centerX, centerY + idxOffset * scale);
          ctx.lineTo(centerX + 24 * scale, centerY + (idxOffset + 4) * scale);
          ctx.stroke();
        }

        // Hips pelvic ring
        ctx.beginPath();
        ctx.moveTo(centerX - 18 * scale, centerY + 22 * scale);
        ctx.lineTo(centerX + 18 * scale, centerY + 22 * scale);
        ctx.stroke();

        // Left Leg
        ctx.beginPath();
        ctx.moveTo(centerX - 18 * scale, centerY + 22 * scale);
        ctx.lineTo(centerX - 24 * scale, centerY + 65 * scale);
        ctx.lineTo(centerX - 26 * scale, centerY + 105 * scale);
        ctx.stroke();

        // Right Leg
        ctx.beginPath();
        ctx.moveTo(centerX + 18 * scale, centerY + 22 * scale);
        ctx.lineTo(centerX + 24 * scale, centerY + 65 * scale);
        ctx.lineTo(centerX + 26 * scale, centerY + 105 * scale);
        ctx.stroke();

        ctx.shadowBlur = 0;
      }

      // Phase 4: Quantum Neural Cortex & Sparkling Gold Star (100% Canvas, No SVGs)
      if (timeSecs >= 5.5 && timeSecs < 7.2) {
        const centerX = width / 2;
        const centerY = height / 2;
        const scale = Math.min(width, height) * 0.0036;

        // Golden Star Sparkle floating above cerebral hemisphere
        ctx.fillStyle = "rgba(212, 168, 67, 0.95)";
        ctx.shadowBlur = 18;
        ctx.shadowColor = "rgba(212, 168, 67, 0.85)";
        ctx.beginPath();
        const starY = centerY - 58 * scale;
        ctx.moveTo(centerX, starY - 15 * scale);
        ctx.quadraticCurveTo(centerX, starY, centerX + 15 * scale, starY);
        ctx.quadraticCurveTo(centerX, starY, centerX, starY + 15 * scale);
        ctx.quadraticCurveTo(centerX, starY, centerX - 15 * scale, starY);
        ctx.quadraticCurveTo(centerX, starY, centerX, starY - 15 * scale);
        ctx.fill();

        // Neon teal brain lobes
        ctx.strokeStyle = "rgba(0, 217, 181, 0.4)";
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(0, 217, 181, 0.55)";

        // Left cerebral lobe outline
        ctx.beginPath();
        ctx.arc(centerX - 14 * scale, centerY, 36 * scale, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(centerX - 14 * scale, centerY - 20 * scale, 16 * scale, Math.PI * 1.5, 0);
        ctx.arc(centerX - 10 * scale, centerY + 20 * scale, 20 * scale, 0, Math.PI * 0.5);
        ctx.stroke();

        // Right cerebral lobe outline
        ctx.beginPath();
        ctx.arc(centerX + 14 * scale, centerY, 36 * scale, Math.PI * 1.5, Math.PI * 0.5);
        ctx.arc(centerX + 10 * scale, centerY + 20 * scale, 20 * scale, Math.PI * 0.5, Math.PI);
        ctx.arc(centerX + 14 * scale, centerY - 20 * scale, 16 * scale, Math.PI, Math.PI * 1.5);
        ctx.stroke();

        // Neuro folds inner curves
        ctx.strokeStyle = "rgba(0, 217, 181, 0.2)";
        ctx.lineWidth = 1.0;
        
        ctx.beginPath();
        ctx.arc(centerX - 20 * scale, centerY - 6 * scale, 12 * scale, 0, Math.PI * 1.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX - 16 * scale, centerY + 14 * scale, 10 * scale, Math.PI * 0.5, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX + 20 * scale, centerY - 6 * scale, 12 * scale, Math.PI, Math.PI * 0.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX + 16 * scale, centerY + 14 * scale, 10 * scale, Math.PI, Math.PI * 1.5);
        ctx.stroke();

        // Midline brain stem / main neural axis
        ctx.strokeStyle = "rgba(0, 217, 181, 0.65)";
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 32 * scale);
        ctx.lineTo(centerX, centerY + 32 * scale);
        ctx.stroke();

        // Pulsing synaptic nodes
        ctx.fillStyle = "#00FFE0";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#00FFE0";
        ctx.beginPath();
        ctx.arc(centerX, centerY - 18 * scale, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, centerY + 2 * scale, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, centerY + 22 * scale, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      }

      // Phase 5: Brand Emblem & Orbit Rings (100% Canvas, No SVGs)
      if (timeSecs >= 7.2) {
        const centerX = width / 2;
        const centerY = height / 2 - 32;
        const scale = Math.min(width, height) * 0.0036;

        // Revolving outer ring 1 (Clockwise)
        const rot1 = (timeSecs - 7.2) * 0.5;
        ctx.strokeStyle = "rgba(0, 217, 181, 0.16)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 58 * scale, 0, Math.PI * 2);
        ctx.stroke();

        // Revolving outer dashed ring 2 (Counter-Clockwise)
        const rot2 = -(timeSecs - 7.2) * 0.9;
        ctx.strokeStyle = "rgba(212, 168, 67, 0.14)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 12]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, 46 * scale, rot2, rot2 + Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]); // clear dash

        // Central medallion fill
        ctx.fillStyle = "rgba(4, 6, 12, 0.9)";
        ctx.strokeStyle = "rgba(0, 217, 181, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 14;
        ctx.shadowColor = "rgba(0, 217, 181, 0.25)";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 35 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Medallion Golden Spark Star
        ctx.fillStyle = "rgba(212, 168, 67, 0.95)";
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(212, 168, 67, 0.7)";
        ctx.beginPath();
        const topSparkY = centerY - 35 * scale;
        ctx.moveTo(centerX, topSparkY - 6);
        ctx.quadraticCurveTo(centerX, topSparkY, centerX + 6, topSparkY);
        ctx.quadraticCurveTo(centerX, topSparkY, centerX, topSparkY + 6);
        ctx.quadraticCurveTo(centerX, topSparkY, centerX - 6, topSparkY);
        ctx.quadraticCurveTo(centerX, topSparkY, centerX, topSparkY - 6);
        ctx.fill();

        // Brain loops inside medallion
        ctx.strokeStyle = "rgba(0, 217, 181, 0.6)";
        ctx.lineWidth = 1.4;
        ctx.shadowBlur = 3;
        ctx.shadowColor = "rgba(0, 217, 181, 0.45)";
        
        ctx.beginPath();
        ctx.arc(centerX - 4 * scale, centerY, 11 * scale, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(centerX - 4 * scale, centerY - 6 * scale, 5 * scale, Math.PI * 1.5, 0);
        ctx.arc(centerX - 2 * scale, centerY + 6 * scale, 5 * scale, 0, Math.PI * 0.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX + 4 * scale, centerY, 11 * scale, Math.PI * 1.5, Math.PI * 0.5);
        ctx.arc(centerX + 2 * scale, centerY + 6 * scale, 5 * scale, Math.PI * 0.5, Math.PI);
        ctx.arc(centerX + 4 * scale, centerY - 6 * scale, 5 * scale, Math.PI, Math.PI * 1.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 9 * scale);
        ctx.lineTo(centerX, centerY + 13 * scale);
        ctx.stroke();

        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [timeline]);

  const handleSkip = () => {
    setHasSkipped(true);
    onComplete();
  };

  return (
    <div id="cinematic-loader-container" className="fixed inset-0 z-50 overflow-hidden bg-[#05070F] flex flex-col justify-center items-center select-none font-sans">
      {/* Background canvas carrying real-time neural particles and visuals */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block object-cover pointer-events-none" />

      {/* Cinematic HUD elements */}
      <div className="absolute top-8 left-8 flex items-center gap-3 text-[10px] tracking-[0.25em] text-[#00D9B5] font-mono opacity-80">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00D9B5] inline-block animate-pulse" />
        SYSTEM INGRESS V1.04 // SYNAPSE ESTABLISHED
      </div>

      <div className="absolute top-8 right-8 text-[10px] tracking-[0.2em] text-[#8B9BAE] font-mono">
        LAUNCH SEQUENCE: <span className="text-white">{(timeline).toFixed(1)}s / 8.5s</span>
      </div>

      {/* Skip button with NO SVG elements whatsoever */}
      <button
        id="skip-intro-btn"
        onClick={handleSkip}
        className="absolute bottom-8 right-8 font-mono text-[9px] uppercase tracking-[0.25em] text-[#8B9BAE] hover:text-white border border-[#1A2540] bg-black/40 hover:bg-[#1A2540]/30 transition-all duration-300 px-4 py-2 rounded cursor-pointer z-50 flex items-center gap-2 group shadow-lg"
      >
        Skip Cinematic Intro
        <span className="group-hover:translate-x-1.5 transition-transform duration-300 font-bold">&#8594;</span>
      </button>

      {/* Foreground brandings with NO SVG elements whatsoever */}
      <div className="relative z-10 w-full max-w-xl flex flex-col justify-center items-center px-6">
        
        <AnimatePresence mode="wait">
          {/* Phase 1: Particle loading screen */}
          {phase === "particles" && (
            <motion.div
              key="particles-text"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-white text-base tracking-[0.3em] font-mono uppercase opacity-90 mb-2">
                Assembling Quantum Lattice
              </h2>
              <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#00D9B5] to-transparent mx-auto mt-4 overflow-hidden relative">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute h-full w-24 bg-gradient-to-r from-transparent via-[#00FFCC] to-transparent"
                />
              </div>
            </motion.div>
          )}

          {/* Phase 2: Cyber-Network Grid Animation (Drawn on Canvas! NO SVG!) */}
          {phase === "network" && (
            <motion.div
              key="network-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-4 relative w-20 h-20 mx-auto flex items-center justify-center animate-spin" style={{ animationDuration: "10s" }}>
                <div className="absolute inset-0 rounded-full border border-dashed border-[#00D9B5]/75" />
                <div className="absolute inset-2 rounded-full border border-dotted border-[#00D9B5]/45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-mono text-[#00D9B5] tracking-widest animate-pulse font-bold">NET_MOD</span>
                </div>
              </div>
              <h2 className="text-white text-base tracking-[0.25em] font-mono uppercase">
                Initializing Machine Cortex
              </h2>
              <p className="text-[10px] font-mono text-[#8B9BAE] uppercase tracking-widest mt-2">
                Resolving neural routing topologies...
              </p>
            </motion.div>
          )}

          {/* Phase 3: Cellular human contour structure (Drawn on Canvas! NO SVG!) */}
          {phase === "human" && (
            <motion.div
              key="human"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative w-72 h-80 flex items-center justify-center">
                {/* Floating CSS-based data tags */}
                <div className="absolute top-[20%] left-0 text-[8px] font-mono text-[#00D9B5] border border-[#00D9B5]/40 px-1 py-0.5 bg-black/60 tracking-wider">
                  SENS_INGRESS: PASS
                </div>
                <div className="absolute bottom-[30%] right-0 text-[8px] font-mono text-[#00D9B5] border border-[#00D9B5]/40 px-1 py-0.5 bg-black/60 tracking-wider">
                  BIOMETRIC_LOCK: TRUE
                </div>
              </div>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[#00D9B5] text-[13px] tracking-[0.4em] font-mono uppercase mt-4 text-center"
              >
                Cognitive Ingress System
              </motion.h2>
            </motion.div>
          )}

          {/* Phase 4: Brain Wrap Neural + Glowing Golden Star (Drawn on Canvas! NO SVG!) */}
          {phase === "brain" && (
            <motion.div
              key="brain"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="relative w-80 h-80 flex flex-col items-center justify-center">
                {/* Status loading line */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#0D1326]/70 border border-[#1A2540] rounded px-3 py-1">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#EFD07B]">
                    Synergy Node Activated
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase 5: Brand Reveal (NO SVGs AT ALL!) */}
          {phase === "logo" && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center mt-[-30px]"
            >
              {/* Graphic offset spacer for canvas-drawn emblem */}
              <div className="mb-24 relative flex items-center justify-center" />

              {/* brand typo */}
              <motion.h2
                initial={{ letterSpacing: "0.1em", opacity: 0 }}
                animate={{ letterSpacing: "0.45em", opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="font-sans font-bold text-2xl text-white tracking-[0.45em] ml-[0.45em] text-center drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
              >
                COLLECTIVE AI INC
              </motion.h2>

              {/* Sub-label */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.85, y: 0 }}
                transition={{ delay: 0.6, duration: 1.2 }}
                className="font-mono text-[9px] text-[#A2B4CB] uppercase tracking-[0.380em] ml-[0.380em] mt-4 max-w-sm leading-relaxed"
              >
                ARCHITECTING A HUMANE FUTURE
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.9 }}
                className="mt-8 flex items-center justify-center gap-1.5"
              >
                <span className="text-[8px] font-mono tracking-widest text-[#8B9BAE] uppercase">
                  Entering Interactive Workspace...
                </span>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
