import React, { useState, useEffect, useRef } from "react";
import { SYNERGY_NODES } from "../data/bibleData";
import { SynergyNode } from "../types/bible";
import { Play, Pause, RefreshCw, Sliders, Info, Zap } from "lucide-react";

interface InteractiveSynergyGraphProps {
  onSelectNode: (nodeId: string) => void;
  selectedNodeId: string;
}

interface PhysicsNode {
  id: string; // "SN-01" or division name
  name: string;
  type: "synergy" | "division";
  phase?: string;
  mandate?: string;
  divisions?: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

interface PhysicsLink {
  source: string;
  target: string;
}

export default function InteractiveSynergyGraph({
  onSelectNode,
  selectedNodeId,
}: InteractiveSynergyGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulation state controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [repulsionStrength, setRepulsionStrength] = useState(130);
  const [linkForce, setLinkForce] = useState(0.06);
  const [showConfig, setShowConfig] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const [frame, setFrame] = useState(0);

  // Refs for tracking positions in anim frame to avoid state lag
  const nodesRef = useRef<PhysicsNode[]>([]);
  const linksRef = useRef<PhysicsLink[]>([]);
  const draggingIdRef = useRef<string | null>(null);
  const pointerPosRef = useRef<{ x: number; y: number }>({ x: 400, y: 275 });

  // Constants
  const width = 800;
  const height = 550;

  // Initialize nodes and links
  useEffect(() => {
    // 1. Gather all synergy nodes
    const synNodes: PhysicsNode[] = SYNERGY_NODES.map((node, index) => {
      const angle = (index / SYNERGY_NODES.length) * Math.PI * 2;
      const radius = 180 + Math.random() * 40;
      
      let color = "#00D9B5"; // Phase 1 (Mint)
      if (node.phase.includes("Phase 2")) color = "#3B82F6"; // Phase 2 (Blue)
      if (node.phase.includes("Phase 3")) color = "#A855F7"; // Phase 3 (Purple)
      if (node.phase.includes("Phase 4")) color = "#EA580C"; // Phase 4 (Orange)

      return {
        id: node.id,
        name: node.name,
        type: "synergy",
        phase: node.phase,
        mandate: node.mandate,
        divisions: node.divisions,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        color,
        size: 7,
      };
    });

    // 2. Extract unique division nodes
    const divisionsSet = new Set<string>();
    SYNERGY_NODES.forEach((node) => {
      const parts = node.divisions.split("+");
      parts.forEach((p) => {
        const dName = p.trim();
        if (dName && dName !== "All 20 Divisions") {
          divisionsSet.add(dName);
        }
      });
    });

    const divisionList = Array.from(divisionsSet);
    const divNodes: PhysicsNode[] = divisionList.map((div, index) => {
      const angle = (index / divisionList.length) * Math.PI * 2;
      const radius = 80 + Math.random() * 20;

      return {
        id: div,
        name: div,
        type: "division",
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        color: "#D4A843", // Gold for Division Hubs
        size: 15,
      };
    });

    const allNodesList = [...divNodes, ...synNodes];
    nodesRef.current = allNodesList;

    // 3. Generate links
    const generatedLinks: PhysicsLink[] = [];
    SYNERGY_NODES.forEach((node) => {
      const parts = node.divisions.split("+");
      parts.forEach((p) => {
        const dName = p.trim();
        if (dName && dName !== "All 20 Divisions") {
          const hasDiv = allNodesList.some((n) => n.id === dName);
          if (hasDiv) {
            generatedLinks.push({
              source: node.id,
              target: dName,
            });
          }
        }
      });
    });

    linksRef.current = generatedLinks;
    setFrame((f) => f + 1);
  }, []);

  // Recenter / Randomize positions helper
  const handleRecenter = () => {
    nodesRef.current = nodesRef.current.map((node) => {
      const isDiv = node.type === "division";
      const angle = Math.random() * Math.PI * 2;
      const radius = isDiv ? 70 + Math.random() * 50 : 190 + Math.random() * 80;
      return {
        ...node,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
      };
    });
    setFrame((f) => f + 1);
  };

  // Shake / Induce kinetic energy
  const handleShake = () => {
    nodesRef.current = nodesRef.current.map((node) => ({
      ...node,
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 0.5) * 15,
    }));
  };

  // Run physics frame updates
  useEffect(() => {
    let animId: number;

    const runPhysicsTick = () => {
      if (!isPlaying) {
        animId = requestAnimationFrame(runPhysicsTick);
        return;
      }

      const nodes = nodesRef.current;
      const links = linksRef.current;
      const draggingId = draggingIdRef.current;

      const friction = 0.88;
      const gravity = 0.055;
      const linkDistance = 75;

      for (const node of nodes) {
        const dx = width / 2 - node.x;
        const dy = height / 2 - node.y;
        node.vx += dx * gravity * 0.09;
        node.vy += dy * gravity * 0.09;
      }

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSqrt = dx * dx + dy * dy;
          const dist = Math.sqrt(distSqrt) || 1;

          if (dist < 260) {
            let nodeStrength = repulsionStrength;
            if (n1.type === "division" && n2.type === "division") {
              nodeStrength = repulsionStrength * 2.5;
            }

            const force = -nodeStrength / (dist * 0.08 + 1);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            n1.vx += fx * 0.12;
            n1.vy += fy * 0.12;
            n2.vx -= fx * 0.12;
            n2.vy -= fy * 0.12;
          }
        }
      }

      for (const link of links) {
        const sourceNode = nodes.find((n) => n.id === link.source);
        const targetNode = nodes.find((n) => n.id === link.target);

        if (sourceNode && targetNode) {
          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          const force = (dist - linkDistance) * linkForce;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          sourceNode.vx += fx;
          sourceNode.vy += fy;
          targetNode.vx -= fx;
          targetNode.vy -= fy;
        }
      }

      for (const node of nodes) {
        if (node.id === draggingId) {
          node.x = pointerPosRef.current.x;
          node.y = pointerPosRef.current.y;
          node.vx = 0;
          node.vy = 0;
        } else {
          node.x += node.vx;
          node.y += node.vy;
          node.vx *= friction;
          node.vy *= friction;

          const pad = 24;
          if (node.x < pad) { node.x = pad; node.vx = 0; }
          if (node.x > width - pad) { node.x = width - pad; node.vx = 0; }
          if (node.y < pad) { node.y = pad; node.vy = 0; }
          if (node.y > height - pad) { node.y = height - pad; node.vy = 0; }
        }
      }

      setFrame((f) => f + 1);
      animId = requestAnimationFrame(runPhysicsTick);
    };

    animId = requestAnimationFrame(runPhysicsTick);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, repulsionStrength, linkForce]);

  // Pointer interactions relative to Canvas Coordinates
  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pointer = event.touches && event.touches.length > 0 ? event.touches[0] : event;
    const x = ((pointer.clientX - rect.left) / rect.width) * width;
    const y = ((pointer.clientY - rect.top) / rect.height) * height;

    let clickedNode: PhysicsNode | null = null;
    let minDist = 25;
    nodesRef.current.forEach((node) => {
      const dx = node.x - x;
      const dy = node.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        clickedNode = node;
      }
    });

    if (clickedNode) {
      draggingIdRef.current = clickedNode.id;
      if (clickedNode.type === "synergy") {
        onSelectNode(clickedNode.id);
      }
      pointerPosRef.current = { x, y };
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pointer = event.touches && event.touches.length > 0 ? event.touches[0] : event;
    const x = Math.max(10, Math.min(width - 10, ((pointer.clientX - rect.left) / rect.width) * width));
    const y = Math.max(10, Math.min(height - 10, ((pointer.clientY - rect.top) / rect.height) * height));

    if (draggingIdRef.current) {
      pointerPosRef.current = { x, y };
    } else {
      let hoveredNode: PhysicsNode | null = null;
      let minDist = 18;
      nodesRef.current.forEach((node) => {
        const dx = node.x - x;
        const dy = node.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          hoveredNode = node;
        }
      });
      setHoveredNodeId(hoveredNode ? (hoveredNode as PhysicsNode).id : null);
    }
  };

  const handlePointerUp = () => {
    draggingIdRef.current = null;
  };

  // Identify connected nodes to highlight relationships
  const getHighlightConfig = () => {
    const activeId = hoveredNodeId || selectedNodeId;
    if (!activeId) return { connectedNodeIds: new Set<string>(), activeLinks: [] };

    const connectedNodeIds = new Set<string>();
    connectedNodeIds.add(activeId);

    const activeLinks = linksRef.current.filter((link) => {
      if (link.source === activeId) {
        connectedNodeIds.add(link.target);
        return true;
      }
      if (link.target === activeId) {
        connectedNodeIds.add(link.source);
        return true;
      }
      return false;
    });

    return { connectedNodeIds, activeLinks };
  };

  const { connectedNodeIds } = getHighlightConfig();

  // Canvas Drawing Execution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear background
    ctx.clearRect(0, 0, width, height);

    // Draw Grid (Zero SVG!)
    ctx.fillStyle = "rgba(139, 155, 174, 0.03)";
    ctx.strokeStyle = "rgba(139, 155, 174, 0.03)";
    ctx.lineWidth = 1;
    const gridSpacing = 20;
    for (let x = 0; x < width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const nodes = nodesRef.current;
    const links = linksRef.current;

    // 1. Draw connections
    links.forEach((link) => {
      const sourceNode = nodes.find((n) => n.id === link.source);
      const targetNode = nodes.find((n) => n.id === link.target);
      if (!sourceNode || !targetNode) return;

      const isSourceActive = link.source === selectedNodeId || link.source === hoveredNodeId;
      const isTargetActive = link.target === selectedNodeId || link.target === hoveredNodeId;
      const isHighlight = isSourceActive || isTargetActive;

      ctx.beginPath();
      ctx.moveTo(sourceNode.x, sourceNode.y);
      ctx.lineTo(targetNode.x, targetNode.y);

      if (isHighlight) {
        ctx.strokeStyle = "#00D9B5";
        ctx.lineWidth = 1.8;
        ctx.setLineDash([4, 4]);
      } else {
        ctx.strokeStyle = "rgba(25, 36, 62, 0.55)";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([]);
      }
      ctx.stroke();
    });
    ctx.setLineDash([]); // Reset line dash

    // 2. Draw node points
    nodes.forEach((node) => {
      const isSelected = selectedNodeId === node.id;
      const isHovered = hoveredNodeId === node.id;
      const isHighlighted = isSelected || isHovered;
      const inActiveSubnetwork = connectedNodeIds.size === 0 || connectedNodeIds.has(node.id);

      // Neon halo glow
      if (isHighlighted) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + (node.type === "division" ? 8 : 5), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 217, 181, 0.12)";
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      ctx.save();
      ctx.globalAlpha = inActiveSubnetwork ? 1.0 : 0.25;

      // Drop shadow representation in Canvas context
      ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 2;

      // Solid sphere particle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();
      ctx.restore();

      // Department borders and center accent
      if (node.type === "division") {
        ctx.save();
        ctx.globalAlpha = inActiveSubnetwork ? 1.0 : 0.25;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.strokeStyle = "#050711";
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.restore();
      }

      // Small high-contrast text badge labels
      if (node.type === "division" || isHighlighted) {
        const labelText = node.name;
        ctx.save();
        ctx.font = "bold 8px monospace";
        const widthText = ctx.measureText(labelText).width;
        const boxW = widthText + 8;
        const boxH = 14;
        const boxX = node.x - boxW / 2;
        const boxY = node.y + node.size + 5;

        // Label box backdrop overlay
        ctx.fillStyle = "#0A0F1E";
        ctx.strokeStyle = "#1A2540";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(boxX, boxY, boxW, boxH);
        ctx.fill();
        ctx.stroke();

        // Label font drawing
        ctx.fillStyle = isHighlighted ? "#FFFFFF" : "#8B9BAE";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(labelText, node.x, boxY + boxH / 2 + 0.5);
        ctx.restore();
      }
    });

  }, [frame, selectedNodeId, hoveredNodeId]);

  return (
    <div className="flex flex-col bg-[#0D1326] border border-[#1A2540] rounded overflow-hidden select-none" ref={containerRef}>
      
      {/* Top Controls Ribbon */}
      <div className="bg-[#050A18] border-b border-[#1A2540] p-3 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={13} className="text-[#D4A843]" />
          <span className="text-[10px] font-mono text-white font-semibold uppercase tracking-wider">
            SYNAPSE NETWORK LABORATORY
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Simulation Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-1.5 rounded-sm border text-[10px] uppercase font-mono font-bold flex items-center gap-1 transition-colors ${
              isPlaying
                ? "bg-[#EA580C]/10 border-[#EA580C]/30 text-[#EA580C] hover:bg-[#EA580C]/20"
                : "bg-[#00D9B5]/10 border-[#00D9B5]/30 text-[#00D9B5] hover:bg-[#00D9B5]/20"
            }`}
            title={isPlaying ? "Pause physics engine" : "Resume physics engine"}
          >
            {isPlaying ? <Pause size={10} /> : <Play size={10} fill="currentColor" />}
            <span>{isPlaying ? "FREEZE" : "SIMULATE"}</span>
          </button>

          {/* Shake Trigger */}
          <button
            onClick={handleShake}
            className="p-1.5 rounded-sm bg-[#111827] border border-[#1A2540] text-white hover:border-[#D4A843] text-[10px] font-mono font-bold uppercase transition-colors"
            title="Inject kinetic energy force into nodes"
          >
            SHAKE
          </button>

          {/* Reset Recenter */}
          <button
            onClick={handleRecenter}
            className="p-1.5 rounded-sm bg-[#111827] border border-[#1A2540] text-white hover:border-[#D4A843] text-[10px] font-mono font-bold flex items-center gap-1 transition-colors"
            title="Recenter and spread nodes"
          >
            <RefreshCw size={10} />
            <span>RESET</span>
          </button>

          {/* Sliders Configuration Dropdown Toggle */}
          <button
            onClick={() => setShowConfig(!showConfig)}
            className={`p-1.5 rounded-sm border text-white text-[10px] font-mono font-bold flex items-center gap-1 transition-colors ${
              showConfig ? "bg-[#D4A843] text-[#050A18]" : "bg-[#111827] border-[#1A2540] hover:border-[#D4A843]"
            }`}
          >
            <Sliders size={10} />
            <span>TUNING</span>
          </button>
        </div>
      </div>

      {/* Physics Tuning Bar */}
      {showConfig && (
        <div className="bg-[#050A18]/90 border-b border-[#1A2540] p-3 grid grid-cols-2 gap-4 text-left transition-all duration-200">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-[#8B9BAE] uppercase font-semibold">Repulsion Node Charge</span>
              <span className="text-white font-bold">{repulsionStrength}</span>
            </div>
            <input
              type="range"
              min={60}
              max={240}
              value={repulsionStrength}
              onChange={(e) => setRepulsionStrength(Number(e.target.value))}
              className="w-full accent-[#D4A843] h-1"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-[#8B9BAE] uppercase font-semibold">Attraction Spring Link</span>
              <span className="text-white font-bold">{(linkForce * 1000).toFixed(0)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={150}
              value={linkForce * 1000}
              onChange={(e) => setLinkForce(Number(e.target.value) / 1000)}
              className="w-full accent-[#00D9B5] h-1"
            />
          </div>
        </div>
      )}

      {/* Main Interactive Canvas Stage Container */}
      <div className="relative flex-1 min-h-[380px] sm:min-h-[460px] bg-[#050711] overflow-hidden">
        
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#8B9BAE 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        />

        {/* Floating Quick Info Tip */}
        <div className="absolute top-3 left-3 bg-[#0D1326]/80 backdrop-blur-sm border border-[#1A2540] p-2 rounded max-w-[200px] pointer-events-none text-[9px] font-sans text-[#8B9BAE] leading-normal z-10">
          <div className="flex items-center gap-1 text-white font-bold font-mono tracking-wide uppercase mb-0.5">
            <Info size={10} className="text-[#00D9B5]" />
            <span>Interactive Instructions</span>
          </div>
          Drag hubs or nodes to reposition. Click a colored synapse dot to view its full mandate specifications.
        </div>

        {/* Phase Color Codes key */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-x-2.5 gap-y-1 bg-[#0D1326]/60 backdrop-blur-xs p-1.5 px-2.5 rounded border border-[#1A2540]/40 pointer-events-none text-[8px] font-mono z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9B5]" />
            <span className="text-white uppercase font-bold">Phase 1</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
            <span className="text-white uppercase font-bold">Phase 2</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
            <span className="text-white uppercase font-bold">Phase 3</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
            <span className="text-white uppercase font-bold">Phase 4</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
            <span className="text-white uppercase font-bold">Hub Dept</span>
          </div>
        </div>

        {/* Real-time statistics badge */}
        <div className="absolute top-3 right-3 bg-[#0D1326]/80 backdrop-blur-sm border border-[#1A2540] p-1.5 px-2.5 rounded pointer-events-none text-[8px] font-mono text-right z-10">
          <div className="text-[#EA580C] font-semibold uppercase">Engine Matrix Ready</div>
          <div className="text-white">COORDS: {nodesRef.current.length} ACTIVE LOBES</div>
        </div>

        {/* HTML5 Canvas Stage Viewport (Absolutley zero SVG elements!) */}
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full h-full cursor-grab active:cursor-grabbing focus:outline-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>
    </div>
  );
}
