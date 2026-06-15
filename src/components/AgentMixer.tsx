import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as d3 from "d3";
import { 
  Bot, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  ShieldAlert, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Sparkles, 
  Radio, 
  Gauge, 
  Workflow, 
  Terminal,
  Activity,
  UserCheck,
  CheckCircle,
  HelpCircle,
  Clock,
  Printer,
  Download,
  FileText,
  X,
  AlertTriangle
} from "lucide-react";
import { 
  DIRECTORS, 
  SPECIALIST_AGENTS, 
  ECOSYSTEM_TEMPLATES, 
  BILE_COGNITIVE_LAYERS, 
  BILE_CRITICAL_HOLDS, 
  BILE_SYNERGY_FLOWS,
  RosterAgent,
  DivisionDirector
} from "../data/agentRoster";

interface D3ForceGraphProps {
  selectedAgents: RosterAgent[];
  customRefStrengths: Record<string, number>;
  onAddCustomLink: (sourceId: string, targetId: string, strength: number) => void;
  graphMode: "MOVE" | "LINK";
}

function D3ForceGraph({ selectedAgents, customRefStrengths, onAddCustomLink, graphMode }: D3ForceGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [frame, setFrame] = useState(0);

  const nodesRef = useRef<any[]>([]);
  const linksRef = useRef<any[]>([]);
  
  const [linkingStartNode, setLinkingStartNode] = useState<string | null>(null);
  const linkingStartNodeRef = useRef<string | null>(null);
  const currentPointerPosRef = useRef<{ x: number, y: number } | null>(null);
  const draggingNodeRef = useRef<any | null>(null);

  const width = 450;
  const height = 240;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (selectedAgents.length === 0) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#4b5563";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("AWAITING ACTIVE NODES", width / 2, height / 2);
      }
      return;
    }

    const HUB_ID = "ZEN-CORE";
    
    // Nodes
    const nodes = selectedAgents.map((a, j) => ({
      id: a.id,
      name: a.name,
      divisionId: a.divisionId,
      divisionName: a.divisionName,
      tier: a.tier,
      aegisTier: a.aegisTier,
      isCentralHub: false,
      x: width / 2 + Math.cos(j) * 80 + (Math.random() - 0.5) * 20,
      y: height / 2 + Math.sin(j) * 80 + (Math.random() - 0.5) * 20,
      fx: null,
      fy: null
    }));

    // Add Central Hub Node
    nodes.push({
      id: HUB_ID,
      name: "ZenFlow Core Kernel",
      divisionId: "D-01",
      divisionName: "Executive Kernel",
      tier: "T1",
      aegisTier: "Aegis-Clear",
      isCentralHub: true,
      x: width / 2,
      y: height / 2,
      fx: null,
      fy: null
    });

    // Links
    const links: any[] = [];

    // Connect everything to the hub
    nodes.forEach(n => {
      if (n.id !== HUB_ID) {
        links.push({
          source: n.id,
          target: HUB_ID,
          strength: 0.5,
          isHubLink: true
        });
      }
    });

    // Cross-agent relationships & custom strengths integration
    for (let i = 0; i < selectedAgents.length; i++) {
      for (let j = i + 1; j < selectedAgents.length; j++) {
        const a = selectedAgents[i];
        const b = selectedAgents[j];
        
        let strength = 0.15;
        const sortedPair = [a.id, b.id].sort();
        const key = `${sortedPair[0]}-${sortedPair[1]}`;
        if (customRefStrengths[key] !== undefined) {
          strength = customRefStrengths[key];
        } else {
          if (a.divisionName === b.divisionName) strength += 0.45;
          const isConnected = BILE_SYNERGY_FLOWS.some(
            flow => (flow.from === a.divisionName && flow.to === b.divisionName) ||
                    (flow.from === b.divisionName && flow.to === a.divisionName)
          );
          if (isConnected) strength += 0.35;
          const sharedTools = a.tools.filter(t => b.tools.includes(t));
          if (sharedTools.length > 0) strength += 0.1 * sharedTools.length;
        }

        strength = Math.min(1.0, strength);

        links.push({
          source: a.id,
          target: b.id,
          strength: strength,
          isHubLink: false
        });
      }
    }

    const simulation = d3.forceSimulation<any>(nodes)
      .force("link", d3.forceLink<any, any>(links).id(d => d.id).distance(d => d.isHubLink ? 55 : 85))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(22));

    simulation.on("tick", () => {
      nodesRef.current = nodes;
      linksRef.current = links;
      setFrame(f => f + 1);
    });

    return () => {
      simulation.stop();
    };
  }, [selectedAgents, customRefStrengths]);

  // Physics Drag logic for Canvas Nodes
  const dragstarted = (d: any) => {
    d.fx = d.x;
    d.fy = d.y;
  };

  const dragged = (x: number, y: number) => {
    const d = draggingNodeRef.current;
    if (d) {
      d.fx = x;
      d.fy = y;
    }
  };

  const dragended = () => {
    const d = draggingNodeRef.current;
    if (d) {
      d.fx = null;
      d.fy = null;
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pointer = event.touches && event.touches.length > 0 ? event.touches[0] : event;
    const x = ((pointer.clientX - rect.left) / rect.width) * width;
    const y = ((pointer.clientY - rect.top) / rect.height) * height;

    let targetNode = null;
    let minDist = 22;
    nodesRef.current.forEach(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < minDist) {
        minDist = d;
        targetNode = node;
      }
    });

    if (targetNode) {
      if (graphMode === "LINK") {
        if (!targetNode.isCentralHub) {
          linkingStartNodeRef.current = targetNode.id;
          setLinkingStartNode(targetNode.id);
          currentPointerPosRef.current = { x, y };
        }
      } else {
        dragstarted(targetNode);
        draggingNodeRef.current = targetNode;
      }
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pointer = event.touches && event.touches.length > 0 ? event.touches[0] : event;
    const x = ((pointer.clientX - rect.left) / rect.width) * width;
    const y = ((pointer.clientY - rect.top) / rect.height) * height;

    if (graphMode === "LINK" && linkingStartNodeRef.current) {
      currentPointerPosRef.current = { x, y };
      setFrame(f => f + 1);
    } else if (draggingNodeRef.current) {
      dragged(x, y);
      setFrame(f => f + 1);
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (graphMode === "LINK" && linkingStartNodeRef.current) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const pointer = event.touches && event.touches.length > 0 ? event.touches[0] : event;
        const x = ((pointer.clientX - rect.left) / rect.width) * width;
        const y = ((pointer.clientY - rect.top) / rect.height) * height;

        let targetNode = null;
        let minDist = 25;
        nodesRef.current.forEach(node => {
          if (node.id !== linkingStartNodeRef.current) {
            const dx = node.x - x;
            const dy = node.y - y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < minDist) {
              minDist = d;
              targetNode = node;
            }
          }
        });

        if (targetNode && !targetNode.isCentralHub) {
          onAddCustomLink(linkingStartNodeRef.current, targetNode.id, 0.84);
        }
      }
    } else if (draggingNodeRef.current) {
      dragended();
    }

    linkingStartNodeRef.current = null;
    setLinkingStartNode(null);
    currentPointerPosRef.current = null;
    draggingNodeRef.current = null;
    setFrame(f => f + 1);
  };

  // Redraw Canvas Frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (nodesRef.current.length === 0) return;

    ctx.clearRect(0, 0, width, height);

    // Draw Links
    linksRef.current.forEach(link => {
      const sourceNode = nodesRef.current.find(n => n.id === (link.source.id || link.source));
      const targetNode = nodesRef.current.find(n => n.id === (link.target.id || link.target));
      if (!sourceNode || !targetNode) return;

      ctx.beginPath();
      ctx.moveTo(sourceNode.x, sourceNode.y);
      ctx.lineTo(targetNode.x, targetNode.y);
      
      if (link.isHubLink) {
        ctx.strokeStyle = "rgba(212, 168, 67, 0.4)";
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 3]);
      } else {
        ctx.strokeStyle = link.strength > 0.6 ? "#00D9B5" : "rgba(26, 37, 64, 0.7)";
        ctx.lineWidth = Math.max(1.2, link.strength * 4);
        ctx.setLineDash([]);
      }
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // Draw nodes
    nodesRef.current.forEach(node => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.isCentralHub ? 19 : 15, 0, Math.PI * 2);
      ctx.fillStyle = node.isCentralHub 
        ? "rgba(212, 168, 67, 0.08)" 
        : node.aegisTier === "Aegis-Hold" ? "rgba(239, 68, 68, 0.08)" : "rgba(0, 217, 181, 0.08)";
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.isCentralHub ? 14 : 11, 0, Math.PI * 2);
      ctx.fillStyle = "#050A18";
      ctx.strokeStyle = node.isCentralHub 
        ? "#D4A843" 
        : node.aegisTier === "Aegis-Hold" ? "#EF4444" : node.aegisTier === "Aegis-Review" ? "#A855F7" : "#00D9B5";
      ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 1;
      ctx.lineWidth = 1.6;
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Short central text
      ctx.font = "bold 7px monospace";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const txt = node.isCentralHub ? "CORE" : node.name.substring(0, 4).toUpperCase();
      ctx.fillText(txt, node.x, node.y + 0.5);

      // Node labels
      ctx.font = "500 7.5px sans-serif";
      ctx.fillStyle = "#94A3B8";
      const btmTxt = node.isCentralHub ? "Kernel core" : node.name.split(" ")[0];
      ctx.fillText(btmTxt, node.x, node.y + (node.isCentralHub ? 23 : 19));
    });

    // Draw current dragging connector wire (If linking modality is active!)
    if (graphMode === "LINK" && linkingStartNodeRef.current && currentPointerPosRef.current) {
      const srcNode = nodesRef.current.find(n => n.id === linkingStartNodeRef.current);
      if (srcNode) {
        ctx.beginPath();
        ctx.moveTo(srcNode.x, srcNode.y);
        ctx.lineTo(currentPointerPosRef.current.x, currentPointerPosRef.current.y);
        ctx.strokeStyle = "#D4A843";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(currentPointerPosRef.current.x, currentPointerPosRef.current.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#D4A843";
        ctx.fill();
      }
    }
  }, [frame, graphMode]);

  return (
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
  );
}

export default function AgentMixer() {
  const [selectedAgents, setSelectedAgents] = useState<RosterAgent[]>([]);
  const [activeDivisionFilter, setActiveDivisionFilter] = useState<string>("ALL");
  const [activeAegisFilter, setActiveAegisFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisTick, setSynthesisTick] = useState(0);
  const [runLogs, setRunLogs] = useState<string[]>([]);
  const [infoPopup, setInfoPopup] = useState<string | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const [customRefStrengths, setCustomRefStrengths] = useState<Record<string, number>>({});
  const [graphMode, setGraphMode] = useState<"MOVE" | "LINK">("MOVE");

  const handleAddCustomLink = (sourceId: string, targetId: string, strength: number) => {
    const sortedPair = [sourceId, targetId].sort();
    const key = `${sortedPair[0]}-${sortedPair[1]}`;
    setCustomRefStrengths(prev => ({
      ...prev,
      [key]: strength
    }));

    const sourceAgent = SPECIALIST_AGENTS.find(a => a.id === sourceId);
    const targetAgent = SPECIALIST_AGENTS.find(a => a.id === targetId);
    if (sourceAgent && targetAgent) {
      addTerminalLog(`LINKER: Defined custom manual cohesion from [${sourceAgent.name.split(" ")[0]}] to [${targetAgent.name.split(" ")[0]}] = ${(strength * 100).toFixed(0)}%.`);
    }
  };
  const [activeWarningToast, setActiveWarningToast] = useState<{
    id: string;
    title: string;
    message: string;
    type: "warning" | "info";
  } | null>(null);

  // Logic check to identify potential conflicts when too many 'high-load' agent types are selected
  useEffect(() => {
    const heavyDivisions = ["Quantum Ledger", "Animus Prime", "Vital Helix", "Binary Loom", "Obsidian Arc"];
    const heavyList = selectedAgents.filter(agent => {
      return (
        agent.tier === "T1" || 
        agent.tier === "T2" || 
        heavyDivisions.includes(agent.divisionName) ||
        agent.name.toLowerCase().includes("architect") ||
        agent.name.toLowerCase().includes("simulation") ||
        agent.name.toLowerCase().includes("compiler")
      );
    });

    if (heavyList.length >= 3) {
      setActiveWarningToast({
        id: "high-compute-conflict",
        title: "HIGH-COMPUTE THREAD CONFLICT WARNING",
        message: `Your current mini-ecosystem has ${heavyList.length} high-intensity nodes active (${heavyList.map(h => h.name).join(", ")}). Running multiple intensive workloads side-by-side violates standard ZenFlow neural-arbitration boundaries, risking compute exhaustion or transaction rate bottlenecks.`,
        type: "warning"
      });
    } else {
      setActiveWarningToast(null);
    }
  }, [selectedAgents]);

  // Initialize with some default selected agents for a rich landing state
  useEffect(() => {
    // Pick Blueprint Architect and Bio-Digital Twin Builder as starters
    const default1 = SPECIALIST_AGENTS.find(a => a.id === "AG-D01-01");
    const default2 = SPECIALIST_AGENTS.find(a => a.id === "AG-D06-01");
    if (default1 && default2) {
      setSelectedAgents([default1, default2]);
    }
  }, []);

  // Filter divisions lists for dropdown/buttons
  const divisionsList = useMemo(() => {
    const list = Array.from(new Set(SPECIALIST_AGENTS.map((a) => a.divisionName)));
    return list;
  }, []);

  // Filtered available agents to pick from
  const availableAgents = useMemo(() => {
    return SPECIALIST_AGENTS.filter(agent => {
      // Exclude already selected
      if (selectedAgents.some(selected => selected.id === agent.id)) return false;

      // Division search filter
      if (activeDivisionFilter !== "ALL" && agent.divisionName !== activeDivisionFilter) return false;

      // Aegis search filter
      if (activeAegisFilter !== "ALL" && agent.aegisTier !== activeAegisFilter) return false;

      // Search query matched against role/role title
      const q = searchQuery.toLowerCase();
      if (q) {
        return (
          agent.name.toLowerCase().includes(q) ||
          agent.role.toLowerCase().includes(q) ||
          agent.divisionName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeDivisionFilter, activeAegisFilter, searchQuery, selectedAgents]);

  const handleSelectAgent = (agent: RosterAgent) => {
    if (selectedAgents.length >= 8) {
      alert("Maximum pool is 8 active agents to prevent excessive co-processing loads.");
      return;
    }
    setSelectedAgents([...selectedAgents, agent]);
    addTerminalLog(`AG-GATEWAY: Configured interface binding for ${agent.name} [${agent.divisionId}].`);
  };

  const handleRemoveAgent = (agentId: string) => {
    setSelectedAgents(selectedAgents.filter(a => a.id !== agentId));
    addTerminalLog(`AG-GATEWAY: Unbound interface for agent configuration ${agentId}.`);
  };

  const addTerminalLog = (msg: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setRunLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 50));
  };

  const handleClearAll = () => {
    setSelectedAgents([]);
    addTerminalLog("AG-GATEWAY: Purged active work memory. Standby.");
  };

  const handleApplyTemplate = (template: typeof ECOSYSTEM_TEMPLATES[0]) => {
    // Find specialist agents to match
    const matching: RosterAgent[] = [];
    template.agentsNeeded.forEach(agentNeededName => {
      // First try to match direct name or director
      const foundAgent = SPECIALIST_AGENTS.find(
        a => a.name.toLowerCase().includes(agentNeededName.toLowerCase()) ||
             a.divisionName.toLowerCase().includes(agentNeededName.toLowerCase())
      );
      if (foundAgent) {
        matching.push(foundAgent);
      }
    });

    if (matching.length > 0) {
      setSelectedAgents(matching);
      addTerminalLog(`TEMPLATE LOADED: '${template.name}' core structure engaged.`);
    }
  };

  // Run a periodic cycle log simulation when agents are active
  useEffect(() => {
    if (selectedAgents.length === 0) return;
    const interval = setInterval(() => {
      if (selectedAgents.length > 0) {
        const randomAgent = selectedAgents[Math.floor(Math.random() * selectedAgents.length)];
        const performatives = ["INFORM", "REQUEST", "PROPOSE", "CONFIRM"];
        const intent = performatives[Math.floor(Math.random() * performatives.length)];
        
        let logText = "";
        if (intent === "REQUEST") {
          logText = `${randomAgent.name.toUpperCase()} -> FIPA [REQUEST]: Syncing digital twin metrics [coordination_load: ${(Math.random() * 2 + 1).toFixed(2)}].`;
        } else if (intent === "INFORM") {
          logText = `${randomAgent.name.toUpperCase()} -> ZENITH [INFORM]: Outbound vector pipeline validated clean under ${randomAgent.aegisTier}.`;
        } else if (intent === "PROPOSE") {
          logText = `${randomAgent.name.toUpperCase()} -> AG-MESH [PROPOSE]: Adaptive geometric learning L4 parameter update proposed.`;
        } else {
          logText = `${randomAgent.name.toUpperCase()} -> AUDIT [CONFIRM]: Autopoietic synchronization heartbeat cleared.`;
        }
        addTerminalLog(logText);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [selectedAgents]);

  const handleTriggerSynthesis = () => {
    setIsSynthesizing(true);
    setSynthesisTick(0);
    addTerminalLog("SYNTHESIZER: Initializing multi-agent co-design sequence...");
  };

  const handlePrintReport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    
    // Format HTML content
    const reportHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${ecosystemName || "ZenFlow"} Capabilities Summary Report</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body {
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              background-color: #f8fafc;
              color: #0f172a;
              padding: 40px;
            }
            @media print {
              .no-print { display: none !important; }
              body { background-color: white; padding: 0; margin: 0; }
              .printable-card { box-shadow: none !important; border: none !important; }
            }
            .printable-card {
              background-color: white;
              padding: 40px;
              border-radius: 4px;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
              border: 1px solid #e2e8f0;
            }
          </style>
        </head>
        <body>
          <div class="max-w-4xl mx-auto printable-card">
            <!-- CONFIDENTIAL BANNER -->
            <div class="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6">
              <div>
                <h1 class="text-2xl font-extrabold uppercase tracking-tight text-slate-900">ZENFLOW COGNITIVE DESIGNS</h1>
                <p class="text-xs text-slate-500 font-mono mt-0.5 tracking-wider">G-COSA MULTI-AGENT INFERENCE DISPATCH REPORT</p>
              </div>
              <div class="text-right">
                <span class="px-2.5 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold font-mono tracking-widest rounded-sm border border-red-200">CONFIDENTIAL // EYES ONLY</span>
                <p class="text-[9px] text-slate-400 font-mono mt-1">DATE: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
              </div>
            </div>
            
            <!-- OVERVIEW -->
            <div class="mb-6 bg-slate-50 p-5 border border-slate-200 rounded grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-[9px] font-mono text-slate-400 block uppercase">SYSTEM CONFIGURATION</span>
                <h2 class="text-lg font-bold text-slate-800 uppercase mt-0.5">${ecosystemName}</h2>
                <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                  Active G-COSA mini-ecosystem mapping, modeling autonomous workflow, resource arbitration, and safety protocol bounds.
                </p>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <div class="border-l-2 border-teal-500 pl-2">
                  <p class="text-slate-400 uppercase text-[9px]">Synergy Score</p>
                  <p class="text-sm font-bold text-slate-800">${synthesisAnalytics.synergyScore}%</p>
                </div>
                <div class="border-l-2 border-yellow-500 pl-2">
                  <p class="text-slate-400 uppercase text-[9px]">Coordination Load</p>
                  <p class="text-sm font-bold text-slate-800">${synthesisAnalytics.coordinationLoad} / 10</p>
                </div>
                <div class="border-l-2 border-blue-500 pl-2">
                  <p class="text-slate-400 uppercase text-[9px]">Trust Radius</p>
                  <p class="text-sm font-bold text-slate-800">${synthesisAnalytics.trustRadius}k rads</p>
                </div>
                <div class="border-l-2 border-purple-500 pl-2">
                  <p class="text-slate-400 uppercase text-[9px]">Aegis Level</p>
                  <p class="text-sm font-bold text-slate-800">${synthesisAnalytics.aegisSummary}</p>
                </div>
              </div>
            </div>
            
            <!-- SECTION I -->
            <div class="mb-6">
              <h3 class="text-xs font-bold bg-slate-100 px-2 py-1 uppercase text-slate-800 tracking-wider mb-2 font-mono">SECTION I: ACTIVE COMPILER ROSTER</h3>
              <table class="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr class="bg-slate-50">
                    <th class="border border-slate-200 p-2 font-bold font-mono">ID</th>
                    <th class="border border-slate-200 p-2 font-bold">NAME / ROLE</th>
                    <th class="border border-slate-200 p-2 font-bold">DIVISION</th>
                    <th class="border border-slate-200 p-2 font-bold">SAFETY TIER</th>
                  </tr>
                </thead>
                <tbody>
                  ${selectedAgents.map(a => `
                    <tr>
                      <td class="border border-slate-200 p-2 font-mono text-slate-500 font-bold">${a.id}</td>
                      <td class="border border-slate-200 p-2">
                        <div class="font-bold text-slate-800">${a.name}</div>
                        <div class="text-[10px] text-slate-500 mt-0.5">${a.role}</div>
                      </td>
                      <td class="border border-slate-200 p-2 font-mono text-[10px] text-slate-500">${a.divisionName} (${a.tier})</td>
                      <td class="border border-slate-200 p-2">
                        <span class="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono uppercase bg-slate-50 border border-slate-200">${a.aegisTier}</span>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
            
            <!-- SECTION II -->
            <div class="mb-6">
              <h3 class="text-xs font-bold bg-slate-100 px-2 py-1 uppercase text-slate-800 tracking-wider mb-2 font-mono">SECTION II: SYNTHESIZED COMPOUND ABILITIES</h3>
              <div class="space-y-2">
                ${mixedCapabilities.map(cap => `
                  <div class="p-3 border border-slate-200 rounded-sm bg-white">
                    <div class="flex justify-between items-center mb-0.5">
                      <span class="text-xs font-bold uppercase font-mono text-slate-900">${cap.title}</span>
                      <span class="text-[10px] font-bold text-teal-600">${cap.score}% Efficacy</span>
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">${cap.desc}</p>
                    <p class="text-[9px] text-yellow-600 font-mono mt-1">SOURCE INTEGRATIONS: ${cap.source}</p>
                  </div>
                `).join("")}
              </div>
            </div>
            
            <!-- SECTION III -->
            <div class="page-break">
              <h3 class="text-xs font-bold bg-slate-100 px-2 py-1 uppercase text-slate-800 tracking-wider mb-2 font-mono">SECTION III: SYSTEM PARAMETERS & GOD PROMPTS</h3>
              <div class="space-y-3">
                ${selectedAgents.map(a => `
                  <div class="p-3 bg-slate-50 border border-slate-200 rounded-sm">
                    <div class="flex justify-between items-center border-b border-slate-200 pb-1 mb-1.5 font-mono text-[9px] text-slate-500">
                      <span class="font-bold text-slate-700">${a.name.toUpperCase()} TECHNICAL PROFILE</span>
                      <span>SEC_TIER: ${a.aegisTier}</span>
                    </div>
                    <p class="text-[9.5px] font-mono whitespace-pre-wrap text-slate-600 leading-relaxed">${a.systemPrompt}</p>
                  </div>
                `).join("")}
              </div>
            </div>
            
            <!-- FOOTER -->
            <div class="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] text-slate-400 font-mono mt-8">
              <span>ZenFlow Framework v2.0 // Collective AI Operations Division</span>
              <span>Signature auth hash: G-COSA-AUTH-${selectedAgents.length}NODES-HASH</span>
            </div>
          </div>
          
          <!-- PRINT CONTROL BUTTONS -->
          <div class="text-center mt-6 no-print space-x-2">
            <button onclick="window.print()" class="px-5 py-2.5 bg-slate-900 text-white rounded font-mono text-xs font-bold hover:bg-slate-800 shadow transition-all">
              Trigger Print / PDF Save
            </button>
            <button onclick="window.close()" class="px-5 py-2.5 bg-gray-200 text-slate-700 rounded font-mono text-xs font-bold hover:bg-gray-300 transition-all">
              Dismiss Window
            </button>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(reportHTML);
    printWindow.document.close();
  };

  useEffect(() => {
    if (!isSynthesizing) return;
    if (synthesisTick < 100) {
      const timer = setTimeout(() => {
        setSynthesisTick(prev => prev + 10);
        if (synthesisTick === 20) {
          addTerminalLog("G-COSA PROTOCOL: Mapping relative curvature matrices...");
        } else if (synthesisTick === 50) {
          // Check for critical holds
          const holdsViolated = selectedAgents.filter(sa => 
            BILE_CRITICAL_HOLDS.some(h => h.item.toLowerCase().includes(sa.name.toLowerCase()) || h.item.toLowerCase().includes(sa.divisionName.toLowerCase()))
          );
          if (holdsViolated.length > 0) {
            addTerminalLog(`AEGIS PROTECTION: Warning, restricted nodes identified: ${holdsViolated.map(h => h.name).join(", ")}`);
          } else {
            addTerminalLog("AEGIS SYSTEM: Zero hard locks asserted. Safety checks verified.");
          }
        } else if (synthesisTick === 80) {
          addTerminalLog("ZENFLOW LATTICE: Synchronizing cross-division synergy node values...");
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setIsSynthesizing(false);
      addTerminalLog("SYNTHESIS SUCCESSFUL: Multi-Agent configuration compiled.");
    }
  }, [isSynthesizing, synthesisTick]);

  // Derived Analytics stats based on selected agents
  const synthesisAnalytics = useMemo(() => {
    if (selectedAgents.length === 0) {
      return { riskScore: 0, coordinationLoad: 0, synergyScore: 0, trustRadius: 0, aegisSummary: "Aegis-Clear", holdsTriggered: [] };
    }

    let rawRisk = 1.2;
    let baseLoad = selectedAgents.length * 1.5;
    let baseSynergy = selectedAgents.length * 12;

    const holdsTriggered: string[] = [];

    // Accumulate weights on each agent
    selectedAgents.forEach(agent => {
      // Risk weights
      if (agent.aegisTier === "Aegis-Hold") {
        rawRisk += 2.8;
        baseLoad += 3.5;
      } else if (agent.aegisTier === "Aegis-Review") {
        rawRisk += 1.4;
        baseLoad += 1.8;
      } else {
        baseLoad += 0.8;
      }

      // Check if we hit direct Hold items
      BILE_CRITICAL_HOLDS.forEach(hold => {
        if (hold.item.toLowerCase().includes(agent.name.toLowerCase()) || 
            hold.item.toLowerCase().includes(agent.divisionName.toLowerCase())) {
          holdsTriggered.push(hold.item);
          rawRisk += 3.5;
        }
      });
    });

    // Bonuses or compound synergy penalties
    if (selectedAgents.length >= 4) {
      baseSynergy *= 1.35; // Synergy compounds beautifully
      baseLoad *= 1.15; // Coordination load scales nonlinearly
    }

    // Determine Aegis hierarchy rating
    let finalAegis: "Aegis-Clear" | "Aegis-Review" | "Aegis-Hold" = "Aegis-Clear";
    if (selectedAgents.some(a => a.aegisTier === "Aegis-Hold") || holdsTriggered.length > 0) {
      finalAegis = "Aegis-Hold";
    } else if (selectedAgents.some(a => a.aegisTier === "Aegis-Review")) {
      finalAegis = "Aegis-Review";
    }

    return {
      riskScore: Math.min(10, parseFloat((rawRisk + selectedAgents.length * 0.4).toFixed(2))),
      coordinationLoad: Math.min(10, parseFloat(baseLoad.toFixed(2))),
      synergyScore: Math.min(100, Math.round(baseSynergy)),
      trustRadius: Math.max(1.5, parseFloat((8.5 - rawRisk * 0.8).toFixed(1))),
      aegisSummary: finalAegis,
      holdsTriggered
    };
  }, [selectedAgents]);

  // Mixed Capabilities synthesis mapping (Combos generated on selected agents)
  const mixedCapabilities = useMemo(() => {
    if (selectedAgents.length === 0) return [];

    const capabilities: { title: string; desc: string; source: string; score: number }[] = [];

    // Check helper to see if agent/division name is in active pool
    const hasAgent = (name: string) => selectedAgents.some(a => a.name.toLowerCase().includes(name.toLowerCase()));
    const hasDiv = (divName: string) => selectedAgents.some(a => a.divisionName.toLowerCase().includes(divName.toLowerCase()));

    // 1. Bio-Digital + Supplement combo
    if (hasAgent("Bio-Digital Twin Builder") && hasAgent("Supplement")) {
      capabilities.push({
        title: "EPIGENETIC SUPPLEMENT REFINEMENT LOOP",
        desc: "Provides bio-digital clone simulation of supplement compounds against the individual's telomeric aging profile before physical intake.",
        source: "Vital Helix + Eon Core Integration",
        score: 96
      });
    }

    // 2. Animus + Safety/Obsidian combo
    if (hasDiv("Animus Prime") && hasDiv("Obsidian Arc")) {
      capabilities.push({
        title: "ROBOTIC DEFENSIVE SHIELD MEMBRANE",
        desc: "Automates physical security patrol triggers based on camera feed threat intelligence, instantly deploying safety E-stop corridors.",
        source: "Animus Prime + Obsidian Arc Partnership",
        score: 94
      });
    }

    // 3. Curriculum + AI Tutor + any other division
    if (hasDiv("Hybrid Living") && selectedAgents.length >= 3) {
      const otherDiv = selectedAgents.find(a => !a.divisionName.includes("Hybrid Living"));
      capabilities.push({
        title: `PERSONALIZED ${otherDiv ? otherDiv.divisionName.toUpperCase() : "COGNITIVE"} CURRICULUM`,
        desc: `Generates on-demand educational pipelines inside the Atlas LMS teaching users the active operational layers of standard domain architectures.`,
        source: "Hybrid Living Pedagogical Stack",
        score: 90
      });
    }

    // 4. Options/Alpha Trading + Zero Trust Setup
    if (hasDiv("Quantum Ledger") && hasDiv("Obsidian Arc")) {
      capabilities.push({
        title: "MULTI-SIGNATURE QUANTUM CAPITAL ESCROW",
        desc: "Guards large capital block deployment with automatic threat detection logic, freezing cold wallets upon SIEM abnormal signature ticks.",
        source: "Quantum Ledger + Obsidian Arc",
        score: 98
      });
    }

    // 5. Route optimization + Smart Building Config
    if (hasAgent("Route Optimization") && hasAgent("Smart Building")) {
      capabilities.push({
        title: "INTELLIGENT LAST-MILE HABITAT DISPATCH",
        desc: "Synchronizes autonomous package drops with active resident vacancy states, minimizing cooling waste and delivery latency.",
        source: "Vector Shift + Terra Axis",
        score: 89
      });
    }

    // 6. Natural Language OS + Brand Voice
    if (hasAgent("Prompt") || hasAgent("Brand Narrative")) {
      capabilities.push({
        title: "CO-RESIDENT SYNTHETIC BRAND EVOLUTION",
        desc: "Empowers the generation of rapid newsletter releases carrying JR's exact voice parameters, free of typical robotic formatting.",
        source: "ZenFlow + Nexus Labs Voice Standard",
        score: 92
      });
    }

    // Add generic base combinations to satisfy any custom selection
    if (capabilities.length === 0 && selectedAgents.length >= 2) {
      capabilities.push({
        title: "COOPERATIVE AGENTIC CROSS-ROUTING",
        desc: "Enables standard ZenFlow context bridging, allowing these separate specialist nodes to exchange telemetry data with sub-100ms lag.",
        source: "M9 ZenFlow Routing Registry",
        score: 82
      });
    }

    return capabilities;
  }, [selectedAgents]);

  // Mini ecosystem generation flag
  const isMiniEcosystemActive = selectedAgents.length >= 3;

  // Custom dynamically resolved name for the mini-ecosystem
  const ecosystemName = useMemo(() => {
    if (selectedAgents.length < 3) return "LATTICE BLUEPRINT STANDBY";
    const prefixes = ["Autopoietic", "Synergistic", "Neural", "Aegis", "Quantum", "Bio-Digital", "Nomadic", "Infinite"];
    const midwords = ["Loom", "Ledger", "Helix", "Somatic", "Citadel", "Vanguard", "Genesis", "Lattice"];
    const suffixes = ["Loop v2.0", "Core Grid", "Sovereign Mesh", "Symbiotic Ring", "Ecosystem"];

    const seed1 = selectedAgents[0].name.charCodeAt(0) % prefixes.length;
    const seed2 = selectedAgents[1].name.charCodeAt(0) % midwords.length;
    const seed3 = selectedAgents[2].name.charCodeAt(0) % suffixes.length;

    return `${prefixes[seed1]} ${midwords[seed2]} ${suffixes[seed3]}`;
  }, [selectedAgents]);

  return (
    <div className="space-y-6 select-none text-left">
      {/* Title Header */}
      <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#D4A843]/5 to-transparent pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#D4A843]/10 border border-[#D4A843]/30 text-[#D4A843] rounded">
              <Workflow size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-tight font-sans">
                ZenFlow Agent Mixer & Ecosystem co-design
              </h2>
              <p className="text-xs text-[#8B9BAE] mt-0.5 font-sans leading-relaxed">
                Connect specialist agents across the 20 divisions. Map their G-COSA cognitive load, assert Aegis boundaries, and generate self-assembling loops.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={handleClearAll}
              disabled={selectedAgents.length === 0}
              className="px-2.5 py-1.5 rounded-sm border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] font-mono hover:bg-red-500/10 transition-all font-bold disabled:opacity-30 flex items-center gap-1.5"
            >
              <Trash2 size={12} />
              <span>CLEAR WORKSPACE</span>
            </button>
            
            <button
              onClick={handleTriggerSynthesis}
              disabled={selectedAgents.length < 2 || isSynthesizing}
              className="px-3 py-1.5 rounded-sm bg-[#00D9B5] text-[#0A0F1E] font-mono text-[10px] hover:bg-[#00D9B5]/80 transition-all font-extrabold flex items-center gap-1.5 shadow-lg disabled:opacity-30"
            >
              <Sparkles size={12} className={isSynthesizing ? "animate-spin" : ""} />
              <span>{isSynthesizing ? `PROCESSING ${synthesisTick}%` : "SYNTHESIZE SYNERGY"}</span>
            </button>

            <button
              onClick={() => setIsReportOpen(true)}
              disabled={selectedAgents.length === 0}
              className="px-2.5 py-1.5 rounded-sm border border-[#A855F7]/30 bg-[#A855F7]/10 text-purple-300 text-[10px] font-mono hover:bg-[#A855F7]/20 transition-all font-bold disabled:opacity-30 flex items-center gap-1.5"
            >
              <FileText size={12} className="text-[#A855F7]" />
              <span>EXPORT REPORT</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Hand selection pane - Columns 1 to 5 */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          <div className="bg-[#0D1326] border border-[#1A2540] rounded p-5 flex flex-col justify-between min-h-[580px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#1A2540] pb-2 mb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                  Browse Agent Directory
                </span>
                <span className="text-[9px] font-mono text-[#8B9BAE]">
                  ({availableAgents.length} Agents Available)
                </span>
              </div>

              {/* Filters row */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[8px] font-mono text-[#8B9BAE] uppercase block mb-1">Division Filter</label>
                  <select
                    value={activeDivisionFilter}
                    onChange={(e) => setActiveDivisionFilter(e.target.value)}
                    className="w-full bg-[#111827] border border-[#1A2540] text-white p-1 rounded-sm font-mono text-[10px]"
                  >
                    <option value="ALL">ALL DIVISIONS</option>
                    {divisionsList.map((div, i) => (
                      <option key={i} value={div}>{div}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[8px] font-mono text-[#8B9BAE] uppercase block mb-1">Aegis Filter</label>
                  <select
                    value={activeAegisFilter}
                    onChange={(e) => setActiveAegisFilter(e.target.value)}
                    className="w-full bg-[#111827] border border-[#1A2540] text-white p-1 rounded-sm font-mono text-[10px]"
                  >
                    <option value="ALL">ALL SAFETY LEVELS</option>
                    <option value="Aegis-Clear">Aegis-Clear</option>
                    <option value="Aegis-Review">Aegis-Review</option>
                    <option value="Aegis-Hold">Aegis-Hold</option>
                  </select>
                </div>
              </div>

              {/* Search text input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Query agent roles, system parameters, tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#111827] border border-[#1A2540] text-white p-1.5 pl-3 rounded-sm font-mono text-[10px] placeholder:text-[#8B9BAE]/40"
                />
              </div>

              {/* Templates presets section */}
              <div>
                <span className="text-[8px] font-mono text-[#8B9BAE] uppercase tracking-wider block mb-1.5">Blueprint Quick Templates</span>
                <div className="flex flex-wrap gap-1.5">
                  {ECOSYSTEM_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleApplyTemplate(tmpl)}
                      className="px-2 py-1 text-[9px] font-mono rounded-sm border border-[#1A2540] bg-[#111827] text-white hover:border-[#D4A843]/60 transition-all text-left truncate max-w-[170px]"
                      title={tmpl.desc}
                    >
                      🧪 {tmpl.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrolling Card List of Agents */}
              <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
                {availableAgents.length > 0 ? (
                  availableAgents.map((agent) => {
                    let badgeColor = "bg-green-500/15 border-green-500/30 text-green-400";
                    if (agent.aegisTier === "Aegis-Hold") badgeColor = "bg-red-500/15 border-red-500/30 text-red-400";
                    if (agent.aegisTier === "Aegis-Review") badgeColor = "bg-purple-500/15 border-purple-500/30 text-purple-400";

                    return (
                      <div 
                        key={agent.id}
                        className="bg-[#050A18]/50 border border-[#1A2540]/60 p-3 rounded-[2px] hover:border-[#00D9B5]/40 transition-all flex flex-col justify-between gap-2"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-sans font-bold text-white text-xs">{agent.name}</span>
                              <span className="text-[8px] font-mono text-[#8B9BAE] uppercase leading-none bg-[#111827] px-1 rounded-sm border border-[#1A2540]">
                                {agent.divisionId}
                              </span>
                            </div>
                            <span className="text-[8px] font-mono text-[#D4A843] block mt-0.5">ROLE: {agent.divisionName} Specialist Agent ({agent.tier})</span>
                          </div>
                          
                          <div className={`px-1 rounded-sm text-[8px] uppercase font-bold border ${badgeColor}`}>
                            {agent.aegisTier}
                          </div>
                        </div>

                        <p className="text-[10px] text-[#8B9BAE] font-sans leading-relaxed">{agent.role}</p>

                        <div className="flex items-center justify-between border-t border-[#1A2540]/30 pt-1.5 mt-1">
                          <span className="text-[8.5px] font-mono text-[#8B9BAE]/60 truncate max-w-[150px]">PLATFORM: {agent.creationPlatform}</span>
                          <button
                            onClick={() => handleSelectAgent(agent)}
                            className="bg-[#00D9B5]/10 hover:bg-[#00D9B5]/20 border border-[#00D9B5]/30 text-[#00D9B5] px-1.5 py-0.5 rounded-sm font-mono text-[8.5px] font-bold uppercase transition flex items-center gap-1 leading-none"
                          >
                            <Plus size={9} />
                            <span>SELECT NODE</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-[#8B9BAE] border border-dashed border-[#1A2540] rounded p-4">
                    <p className="text-xs font-mono">NO AGENTS MATCHED FILTERS</p>
                    <p className="text-[9px] text-[#8B9BAE]/80 mt-1">Clear query or reset standard filters above.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-[#1A2540]/60 pt-3 mt-4 text-[8px] font-mono text-[#8B9BAE]/40 uppercase flex justify-between">
              <span>Sync Standard: G-COSA v2</span>
              <span>Total Catalog: 600 Specialist Agents Loaded</span>
            </div>
          </div>
        </div>

        {/* Right Hand simulation pane - Columns 6 to 12 */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          {/* Selected nodes deck */}
          <div className="bg-[#0D1326] border border-[#1A2540] rounded p-5 space-y-4">
            <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers size={13} className="text-[#D4A843]" />
                Active Co-Processing Registry ({selectedAgents.length} / 8 Nodes)
              </span>
              {selectedAgents.length === 0 && (
                <span className="text-[9px] text-[#EF4444] font-mono lowercase">0 nodes active (standby mode)</span>
              )}
            </h3>

            {/* Deck of active agents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              <AnimatePresence>
                {selectedAgents.map((agent) => (
                  <motion.div
                    layout
                    key={agent.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-2.5 bg-[#050A18] border border-[#1A2540] rounded flex flex-col justify-between gap-1 shadow-inner relative group"
                  >
                    <button
                      onClick={() => handleRemoveAgent(agent.id)}
                      className="absolute top-2 right-2 text-[#8B9BAE] hover:text-red-400 transition"
                      title="Decommission item"
                    >
                      <Trash2 size={11} />
                    </button>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans font-bold text-white text-xs">{agent.name}</span>
                        <span className="text-[7.5px] font-mono text-[#00D9B5] uppercase bg-[#111827] px-1 rounded border border-[#1A2540]">
                          {agent.divisionId}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono text-[#8B9BAE]/60 block">{agent.divisionName} Roster</span>
                    </div>

                    <p className="text-[9.5px] text-[#8B9BAE] line-clamp-2 mt-1 pr-4">{agent.role}</p>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#1A2540]/30 text-[8px] font-mono text-[#8B9BAE]/40 uppercase">
                      <span>{agent.aegisTier}</span>
                      <button
                        onClick={() => setInfoPopup(agent.systemPrompt)}
                        className="text-[#D4A843] hover:underline"
                      >
                        VIEW GOD PROMPT
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {selectedAgents.length === 0 && (
              <div className="py-12 border border-dashed border-[#1A2540] text-center rounded text-[#8B9BAE]/80">
                <Bot size={24} className="mx-auto text-[#1A2540] mb-2 animate-bounce" />
                <p className="text-xs font-mono">CO-CONCURRENT WORKSPACE INACTIVE</p>
                <p className="text-[10px] mt-1 max-w-sm mx-auto">Select agents from the directory on the left or load a Template Preset to populate active simulation metrics.</p>
              </div>
            )}
          </div>

          {/* Synthesis Telemetry and Ecosystem Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* G-COSA Telemetry column - span 5 */}
            <div className="md:col-span-5 bg-[#0D1326] border border-[#1A2540] rounded p-5 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2 flex items-center gap-1.5">
                  <Gauge size={13} className="text-[#00D9B5]" />
                  Telemetry Analytics
                </h3>

                <div className="space-y-3 font-sans text-xs">
                  {/* Synergy rating */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#8B9BAE]">Synergy Index</span>
                      <span className="font-mono text-[#00D9B5] font-bold">{synthesisAnalytics.synergyScore}%</span>
                    </div>
                    <div className="w-full h-1 bg-[#111827] rounded-full overflow-hidden border border-[#1A2540]/50">
                      <div className="h-full bg-[#00D9B5]" style={{ width: `${synthesisAnalytics.synergyScore}%` }} />
                    </div>
                  </div>

                  {/* Coordination load */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#8B9BAE]">Coordination Load</span>
                      <span className="font-mono text-[#D4A843] font-bold">{synthesisAnalytics.coordinationLoad} / 10</span>
                    </div>
                    <div className="w-full h-1 bg-[#111827] rounded-full overflow-hidden border border-[#1A2540]/50">
                      <div className="h-full bg-[#D4A843]" style={{ width: `${synthesisAnalytics.coordinationLoad * 10}%` }} />
                    </div>
                  </div>

                  {/* Trust Radius */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#8B9BAE]">Aegis Trust Radius</span>
                      <span className="font-mono text-[#38BDF8] font-bold">{synthesisAnalytics.trustRadius}k rads</span>
                    </div>
                    <div className="w-full h-1 bg-[#111827] rounded-full overflow-hidden border border-[#1A2540]/50">
                      <div className="h-full bg-[#38BDF8]" style={{ width: `${synthesisAnalytics.trustRadius * 11}%` }} />
                    </div>
                  </div>

                  {/* General safety assertion badge */}
                  <div className="pt-2 border-t border-[#1A2540]/30 space-y-2">
                    <span className="text-[8px] font-mono text-[#8B9BAE] uppercase">Safety Assertion Gaskets</span>
                    
                    <div className="p-2.5 rounded bg-[#111827] border border-[#1A2540] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {synthesisAnalytics.aegisSummary === "Aegis-Clear" ? (
                          <ShieldCheck size={14} className="text-[#00D9B5]" />
                        ) : (
                          <ShieldAlert size={14} className={synthesisAnalytics.aegisSummary === "Aegis-Hold" ? "text-red-400" : "text-[#D4A843]"} />
                        )}
                        <span className="text-[10px] font-mono font-bold text-white uppercase">{synthesisAnalytics.aegisSummary}</span>
                      </div>
                      <span className="text-[8px] font-mono text-[#8B9BAE]">MATRIX LVL</span>
                    </div>
                  </div>
                </div>
              </div>

              {synthesisAnalytics.holdsTriggered.length > 0 && (
                <div className="mt-4 p-2 bg-red-500/10 border border-red-500/20 rounded-[2px] text-[8.5px] font-mono text-red-400 space-y-1">
                  <div className="font-bold">⚠️ CRITICAL HOLDS ASSERTED:</div>
                  <ul className="list-disc pl-3">
                    {synthesisAnalytics.holdsTriggered.map((h, i) => (
                      <li key={i}>{h} (Escalating requests to CLO Office)</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Generated System Capabilities Panel - span 7 */}
            <div className="md:col-span-7 bg-[#0D1326] border border-[#1A2540] rounded p-5 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#D4A843]" />
                  Compound System Capacities
                </h3>

                <div className="space-y-3 max-h-[220px] overflow-y-auto scrollbar-none pr-1">
                  {selectedAgents.length >= 2 ? (
                    mixedCapabilities.map((cap, i) => (
                      <div key={i} className="p-3 rounded-[2.5px] bg-[#111827]/60 border border-[#1A2540] space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">{cap.title}</span>
                          <span className="text-[8px] font-mono text-[#00D9B5]">{cap.score}% Efficacy</span>
                        </div>
                        <p className="text-[10.5px] text-[#8B9BAE] font-sans leading-relaxed">{cap.desc}</p>
                        <div className="text-[7.5px] font-mono text-[#D4A843]/70 uppercase pt-1 border-t border-[#1A2540]/30">SOURCE: {cap.source}</div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-[#8B9BAE]/60 font-mono text-[10px] border border-dashed border-[#1A2540]/60 p-4">
                      STANDBY FOR MULTI-NODE INFERENCE
                      <span className="block text-[8.5px] text-[#8B9BAE]/40 mt-1 font-sans">Select 2 or more active agents to synthesize output potentials.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-[#1A2540]/30 text-[8.5px] font-mono text-[#8B9BAE]/60 flex items-center justify-between">
                <span>ESTIMATED COMPUTE PER HOUR:</span>
                <span className="text-white font-bold">${(selectedAgents.length * 0.08).toFixed(2)}/hr</span>
              </div>
            </div>
          </div>

          {/* Mini-Ecosystem Assembling Box - Triggered after 3+ elements are selected! */}
          <div className="bg-[#0D1326] border border-[#1A2540] rounded p-5 relative overflow-hidden">
            <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Workflow size={13} className="text-[#A855F7]" />
                Self-sustaining Autopoietic Mini Ecosystem
              </span>
              <span className={`text-[8px] font-mono border px-1.5 py-0.5 rounded uppercase font-bold ${
                isMiniEcosystemActive 
                  ? "bg-purple-500/15 border-purple-500/30 text-purple-400 animate-pulse" 
                  : "bg-[#111827] border-[#1A2540] text-[#8B9BAE]/50"
              }`}>
                {isMiniEcosystemActive ? "ONLINE LOOP ENGAGED" : "AWAITING QUANTITY (3+ NODES)"}
              </span>
            </h3>

            {isMiniEcosystemActive ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Column: Flow schema and loops */}
                  <div className="space-y-3 text-left">
                    <div className="bg-[#050A18]/50 border border-[#1A2540] rounded p-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[#A855F7] font-mono text-[9px] font-bold">
                        <Radio size={12} className="animate-ping" />
                        <span>ECOSYSTEM CONFIG: {ecosystemName.toUpperCase()}</span>
                      </div>
                      <p className="text-[10px] text-[#8B9BAE] font-sans leading-relaxed">
                        A fully vertically-integrated mini lattice capable of autopoietic self-correction. All active nodes feedback operational states in a recursive circle.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[8px] font-mono text-[#8B9BAE] uppercase tracking-wider block">Identified Cyclical Synergy Flows</span>
                      
                      <div className="space-y-1.5 text-[9.5px] font-mono">
                        {/* Recursive loops */}
                        <div className="p-2 rounded bg-[#111827] border-l-2 border-l-[#00D9B5] text-[#8B9BAE] flex flex-col gap-0.5">
                          <span className="text-white text-[10px] font-bold uppercase">Loop 1: Outbound Vector</span>
                          <span>{selectedAgents[0].name} feeds contextual parameters to {selectedAgents[1].name}</span>
                        </div>
                        <div className="p-2 rounded bg-[#111827] border-l-2 border-l-[#D4A843] text-[#8B9BAE] flex flex-col gap-0.5">
                          <span className="text-white text-[10px] font-bold uppercase">Loop 2: Secondary Evaluation</span>
                          <span>{selectedAgents[1].name} triggers audits over the workflow of {selectedAgents[2].name}</span>
                        </div>
                        <div className="p-2 rounded bg-[#111827] border-l-2 border-l-[#A855F7] text-[#8B9BAE] flex flex-col gap-0.5">
                          <span className="text-white text-[10px] font-bold uppercase">Loop 3: Autopoietic Return</span>
                          <span>{selectedAgents[2].name} synchronizes safety gates back to {selectedAgents[0].name}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visualizer Canvas */}
                  <div className="bg-[#050A18] border border-[#1A2540] rounded p-3 flex flex-col justify-between items-center text-center select-none relative min-h-[480px] overflow-hidden">
                    <span className="absolute top-2 left-3 text-[7.5px] font-mono text-[#8B9BAE]/30 uppercase tracking-widest z-10">
                      LATTICE RELATIONAL NETWORK (D3 CANVAS ACTIVE PHYSICS)
                    </span>

                    {/* Mode selector */}
                    <div className="absolute top-2 right-3 z-20 flex bg-[#111827] border border-[#1A2540] p-0.5 rounded text-[8.5px] font-mono">
                      <button
                        onClick={() => setGraphMode("MOVE")}
                        className={`px-2 py-0.5 rounded transition ${graphMode === "MOVE" ? "bg-[#D4A843] text-[#050A18] font-bold" : "text-[#8B9BAE] hover:text-white"}`}
                      >
                        MOVE SENSORS
                      </button>
                      <button
                        onClick={() => setGraphMode("LINK")}
                        className={`px-2 py-0.5 rounded transition ${graphMode === "LINK" ? "bg-[#00D9B5] text-[#050A18] font-bold" : "text-[#8B9BAE] hover:text-white"}`}
                      >
                        DRAW CABLES
                      </button>
                    </div>

                    {/* D3 Relational force directed graph */}
                    <div className="w-full flex-grow flex items-center justify-center mt-6">
                      <D3ForceGraph 
                        selectedAgents={selectedAgents} 
                        customRefStrengths={customRefStrengths}
                        onAddCustomLink={handleAddCustomLink}
                        graphMode={graphMode}
                      />
                    </div>

                    <div className="w-full text-center border-t border-[#1A2540]/30 pt-1.5 z-10 bg-[#050A18]/90">
                      {graphMode === "LINK" ? (
                        <span className="text-[8px] font-mono text-[#D4A843] block mb-2 px-2 py-0.5 bg-[#D4A843]/10 border border-[#D4A843]/20 rounded">
                          ★ ACTIVE CABLE MODE: Click & hold an Agent Node, drag & release on another to link!
                        </span>
                      ) : (
                        <span className="text-[8.5px] font-mono text-white/50 block mb-2">
                          💡 Switch to DRAW CABLES to link agents and adjust telemetry paths
                        </span>
                      )}

                      {/* Display of customizable manually-defined strengths */}
                      {Object.keys(customRefStrengths).length > 0 && (
                        <div className="w-full max-h-[140px] overflow-y-auto space-y-1 mt-1.5 border-t border-[#1A2540]/30 pt-1.5 mb-1.5 scrollbar-thin">
                          <span className="text-[8px] text-[#8B9BAE] font-mono uppercase block text-left mb-1">
                            Adjust Relationship Cohesion Strengths:
                          </span>
                          {Object.entries(customRefStrengths).map(([key, strength]) => {
                            const [srcId, tgtId] = key.split("-");
                            const srcAgent = SPECIALIST_AGENTS.find(a => a.id === srcId);
                            const tgtAgent = SPECIALIST_AGENTS.find(a => a.id === tgtId);
                            if (!srcAgent || !tgtAgent) return null;
                            const numericStrength = strength as number;
                            return (
                              <div key={key} className="flex items-center justify-between gap-1.5 p-1 rounded bg-[#0A0F1E] border border-[#1A2540]/40 text-left text-[9px] font-mono">
                                <span className="text-white truncate w-1/3 text-[8px]">{srcAgent.name.split(" ")[0]} ↔ {tgtAgent.name.split(" ")[0]}</span>
                                <div className="flex items-center gap-1.5 w-1/2">
                                  <input 
                                    type="range"
                                    min="0.1"
                                    max="1.0"
                                    step="0.05"
                                    value={numericStrength}
                                    onChange={(e) => {
                                      setCustomRefStrengths(prev => ({
                                        ...prev,
                                        [key]: parseFloat(e.target.value)
                                      }));
                                    }}
                                    className="w-full accent-[#00D9B5] h-1"
                                  />
                                  <span className="text-[#00D9B5] text-[8.5px] w-6 shrink-0 text-right">{(numericStrength * 100).toFixed(0)}%</span>
                                </div>
                                <button 
                                  onClick={() => {
                                    const copy = {...customRefStrengths};
                                    delete copy[key];
                                    setCustomRefStrengths(copy);
                                    addTerminalLog(`LINKER: Purged manual connection between ${srcAgent.name.split(" ")[0]} and ${tgtAgent.name.split(" ")[0]}`);
                                  }}
                                  className="text-xs text-[#EF4444] hover:text-[#EF4444]/80 px-1 font-mono hover:bg-[#EF4444]/10 rounded"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <span className="text-[8px] font-mono text-[#00D9B5] flex items-center justify-center gap-1 border-t border-[#1A2540]/20 pt-1.5">
                        <Activity size={10} className="animate-pulse" />
                        G-COSA CANVAS PHYSICS ENGINE (ZERO SVGS ACTIVE)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Micro Term logs */}
                <div className="bg-[#111827] border border-[#1A2540] rounded p-3">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#1A2540] mb-2 font-mono text-[8px] text-[#8B9BAE]/60 uppercase">
                    <span className="flex items-center gap-1">
                      <Terminal size={10} />
                      Ecosystem Runtime Logs
                    </span>
                    <span>LIVE BUFFER Ticks</span>
                  </div>

                  <div className="space-y-1 max-h-[100px] overflow-y-auto font-mono text-[9px] text-[#8B9BAE] scrollbar-none">
                    {runLogs.length > 0 ? (
                      runLogs.map((log, i) => (
                        <div key={i} className="hover:text-white transition-colors odd:bg-white/0 even:bg-white/[0.01] py-0.5 px-1 truncate">
                          {log}
                        </div>
                      ))
                    ) : (
                      <span className="text-[8.5px] italic text-[#8B9BAE]/50 block py-2">Ecosystem booting. Logging buffer compiling...</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 border border-dashed border-[#1A2540] text-center rounded text-[#8B9BAE]/60 font-mono text-[10px]">
                AWAITING ORGANISM CRITICAL QUANTITY (3+ SIGNED NODES)
                <p className="text-[8.5px] text-[#8B9BAE]/40 font-sans mt-1">Select at least 3 custom specialist agents in your workspace deck to compile a self-sustaining loops system.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* God Prompt Fullscreen View Overlay */}
      <AnimatePresence>
        {infoPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setInfoPopup(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0D1326] border border-[#1A2540] max-w-2xl w-full rounded p-6 shadow-2xl z-10 text-left space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-[#1A2540] pb-3">
                <div className="flex items-center gap-2">
                  <UserCheck className="text-[#00D9B5]" size={16} />
                  <span className="text-xs font-bold text-white font-sans uppercase tracking-wider">God Prompt System Parameters</span>
                </div>
                <button
                  onClick={() => setInfoPopup(null)}
                  className="p-1 rounded bg-[#111827] border border-[#1A2540] text-[#8B9BAE] hover:text-white"
                >
                  Close [ESC]
                </button>
              </div>

              <div className="bg-[#050A18] border border-[#1A2540] p-4 rounded text-xs leading-relaxed font-mono text-[#8B9BAE] whitespace-pre-wrap select-text">
                {infoPopup}
              </div>

              <div className="text-[9px] font-mono text-[#8B9BAE]/50 uppercase flex justify-between pt-2 border-t border-[#1A2540]/30 select-none">
                <span>Compliance Gate: Aegis-V2 Certified</span>
                <span>Platform: God Prompt Library Ingestion</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* printable-report capabilities summary modal */}
        {isReportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsReportOpen(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0F172A] border border-[#1E293B] max-w-4xl w-full rounded-md shadow-2xl z-10 text-left space-y-4 max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Header inside modal */}
              <div className="flex justify-between items-center bg-[#1E293B] px-6 py-4 border-b border-[#334155] shrink-0">
                <div className="flex items-center gap-2">
                  <FileText className="text-[#00D9B5]" size={16} />
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    Ecosystem Capability Dispatch Report
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintReport}
                    className="px-3 py-1 bg-[#00D9B5] text-[#0A0F1E] font-mono text-[10px] hover:bg-[#00D9B5]/80 transition-all font-bold flex items-center gap-1.5 rounded-sm"
                  >
                    <Printer size={11} />
                    <span>PRINT / PDF EXPORT</span>
                  </button>
                  <button
                    onClick={() => setIsReportOpen(false)}
                    className="p-1.5 rounded bg-[#111827] border border-[#1A2540] text-[#8B9BAE] hover:text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

              {/* The "Paper A4" preview page container */}
              <div className="p-6 overflow-y-auto bg-slate-900 flex-1 flex justify-center">
                <div id="printable-report" className="bg-white text-slate-950 w-full max-w-[210mm] min-h-[297mm] p-10 font-sans shadow-xl border border-gray-200 flex flex-col justify-between text-left relative selection:bg-teal-100 selection:text-teal-900 rounded-sm">
                  <div>
                    {/* CONFIDENTIAL BANNER */}
                    <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6">
                      <div>
                        <h1 className="text-xl font-extrabold uppercase tracking-tight text-slate-900">
                          ZENFLOW COGNITIVE DESIGNS
                        </h1>
                        <p className="text-[9px] text-gray-400 font-mono mt-0.5 tracking-wider">
                          G-COSA MULTI-AGENT INFERENCE DISPATCH SUMMARY
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[9px] font-bold font-mono tracking-widest rounded-sm border border-red-200">
                          CONFIDENTIAL // EYES ONLY
                        </span>
                        <p className="text-[8px] text-gray-400 font-mono mt-1">
                          COMPILED: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {/* REPORT SCHEMA SUMMARY */}
                    <div className="mb-6 bg-slate-50 p-4 border border-slate-200 rounded grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[8px] font-mono text-gray-400 block uppercase">SYSTEM METRIC CONFIGURATION</span>
                        <h2 className="text-base font-bold text-slate-800 uppercase mt-0.5">{ecosystemName}</h2>
                        <p className="text-[10px] text-gray-500 mt-1 font-sans leading-relaxed">
                          A fully compiled multi-compartment agent sequence running synchronous or asynchronous rate filters governed under Aegis protocols.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="border-l-2 border-[#00D9B5] pl-2">
                          <p className="text-gray-400 uppercase text-[8px]">Synergy Index</p>
                          <p className="text-sm font-bold text-slate-800">{synthesisAnalytics.synergyScore}%</p>
                        </div>
                        <div className="border-l-2 border-[#D4A843] pl-2">
                          <p className="text-gray-400 uppercase text-[8px]">Coordination Load</p>
                          <p className="text-sm font-bold text-slate-800">{synthesisAnalytics.coordinationLoad} / 10</p>
                        </div>
                        <div className="border-l-2 border-sky-400 pl-2">
                          <p className="text-gray-400 uppercase text-[8px]">Trust Radius</p>
                          <p className="text-sm font-bold text-slate-800">{synthesisAnalytics.trustRadius}k rads</p>
                        </div>
                        <div className="border-l-2 border-fuchsia-500 pl-2">
                          <p className="text-gray-400 uppercase text-[8px]">Aegis Tier</p>
                          <p className="text-sm font-bold text-slate-800">{synthesisAnalytics.aegisSummary}</p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 1: ACTIVE COMPILER ROSTER */}
                    <div className="mb-6">
                      <h3 className="text-[10px] font-bold bg-slate-100 px-2 py-1 uppercase text-slate-800 tracking-wider mb-2 font-mono">
                        SECTION I: ACTIVE COMPILER ROSTER
                      </h3>
                      <table className="w-full text-[10px] text-left border-collapse border border-gray-200">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-200 p-2 font-bold font-mono">ID</th>
                            <th className="border border-gray-200 p-2 font-bold">NAME / ROLE</th>
                            <th className="border border-gray-200 p-2 font-bold">DIVISION</th>
                            <th className="border border-gray-200 p-2 font-bold">SAFETY</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedAgents.map(a => (
                            <tr key={a.id}>
                              <td className="border border-gray-200 p-2 font-mono text-gray-500 font-bold">{a.id}</td>
                              <td className="border border-gray-200 p-2">
                                <div className="font-bold text-slate-800">{a.name}</div>
                                <div className="text-[9px] text-gray-500 mt-0.5">{a.role}</div>
                              </td>
                              <td className="border border-gray-200 p-2 font-mono text-gray-500">{a.divisionName} ({a.tier})</td>
                              <td className="border border-gray-200 p-2">
                                <span className="px-1 py-0.5 rounded text-[8px] font-bold font-mono uppercase bg-slate-50 border border-gray-200">
                                  {a.aegisTier}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* SECTION 2: SYNTHESIZED COMPOUND ABILITIES */}
                    <div className="mb-6">
                      <h3 className="text-[10px] font-bold bg-slate-100 px-2 py-1 uppercase text-slate-800 tracking-wider mb-2 font-mono">
                        SECTION II: SYNTHESIZED COMPOUND ABILITIES
                      </h3>
                      <div className="space-y-2">
                        {mixedCapabilities.map((cap, idx) => (
                          <div key={idx} className="p-2.5 border border-slate-200 rounded-sm">
                            <div className="flex justify-between items-center mb-0.5">
                              <span className="text-[10px] font-bold uppercase font-mono text-slate-900">
                                {cap.title}
                              </span>
                              <span className="text-[9px] font-bold text-teal-600">
                                {cap.score}% Efficacy
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-600 leading-relaxed">{cap.desc}</p>
                            <p className="text-[8px] text-yellow-600 font-mono mt-0.5">
                              SOURCE INTEGRATIONS: {cap.source}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SECTION 3: SYSTEM IMPLEMENTATION INSTRUCTIONS */}
                    <div>
                      <h3 className="text-[10px] font-bold bg-slate-100 px-2 py-1 uppercase text-slate-800 tracking-wider mb-2 font-mono">
                        SECTION III: SYSTEM IMPLEMENTATION ARCHITECTURE
                      </h3>
                      <div className="space-y-2 max-h-[180px] overflow-y-auto">
                        {selectedAgents.map(a => (
                          <div key={a.id} className="p-2.5 bg-gray-50 border border-gray-200 rounded-sm text-left">
                            <div className="flex justify-between items-center border-b border-gray-200 pb-1 mb-1.5 font-mono text-[8px] text-gray-500">
                              <span className="font-bold text-slate-700">{a.name.toUpperCase()} SYSTEM PARAMS</span>
                              <span>SEC_TIER: {a.aegisTier}</span>
                            </div>
                            <p className="text-[8.5px] font-mono whitespace-pre-wrap text-gray-600 leading-relaxed">
                              {a.systemPrompt}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* REPORT FOOTER */}
                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center text-[8px] text-gray-400 font-mono mt-8">
                    <span>ZenFlow Framework v2.0 // Collective AI Autonomous Operations</span>
                    <span>Security Signature: G-COSA-AUTH-{selectedAgents.length}N</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* HIGH-COMPUTE CONFLICT WARNING TOAST */}
        {activeWarningToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#1e1412] border border-red-500/30 rounded-md shadow-2xl p-4 text-left font-sans"
          >
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded shrink-0">
                <AlertTriangle size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-wider font-mono">
                  {activeWarningToast.title}
                </h4>
                <p className="text-[10px] text-red-100/80 leading-relaxed mt-1 font-sans">
                  {activeWarningToast.message}
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={() => setActiveWarningToast(null)}
                    className="px-2 py-1 bg-red-500 hover:bg-red-400 text-[#0F172A] text-[9px] font-mono font-bold tracking-tight uppercase rounded-sm transition-all"
                  >
                    RESOLVE LATTICE
                  </button>
                  <button
                    onClick={() => {
                      addTerminalLog("AEGIS SYSTEM: Bypassed thermal arbitration rate alerts.");
                      setActiveWarningToast(null);
                    }}
                    className="text-[9px] font-mono text-red-400/80 hover:text-red-300 underline"
                  >
                    Bypass warning
                  </button>
                </div>
              </div>
              <button
                onClick={() => setActiveWarningToast(null)}
                className="text-red-500/60 hover:text-red-400 shrink-0"
              >
                <X size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
