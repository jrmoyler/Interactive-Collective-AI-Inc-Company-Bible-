import React, { useState, useEffect } from "react";
import { Layers, HardDrive, Cpu, Terminal, Play, Square, Activity, AlertTriangle, Network, List } from "lucide-react";
import { SYNERGY_NODES, PHYSICAL_NODES } from "../data/bibleData";
import { PhysicalNode, SynergyNode } from "../types/bible";
import InteractiveSynergyGraph from "./InteractiveSynergyGraph";

interface SynergyNodesViewProps {
  searchQuery: string;
}

export default function SynergyNodesView({ searchQuery }: SynergyNodesViewProps) {
  const [activeTab, setActiveTab] = useState<"digital" | "physical">("digital");
  const [selectedNodeId, setSelectedNodeId] = useState<string>("SN-01");
  const [selectedPhysId, setSelectedPhysId] = useState<string>("SYN-01");
  const [displayMode, setDisplayMode] = useState<"graph" | "matrix">("graph");
  const [isConsoleActive, setIsConsoleActive] = useState(false);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);
  const [progressVal, setProgressVal] = useState(0);

  // Search filters
  const filteredDigital = SYNERGY_NODES.filter((node) => {
    const q = searchQuery.toLowerCase();
    return (
      node.id.toLowerCase().includes(q) ||
      node.name.toLowerCase().includes(q) ||
      node.divisions.toLowerCase().includes(q) ||
      node.mandate.toLowerCase().includes(q)
    );
  });

  const filteredPhysical = PHYSICAL_NODES.filter((node) => {
    const q = searchQuery.toLowerCase();
    return (
      node.id.toLowerCase().includes(q) ||
      node.name.toLowerCase().includes(q) ||
      node.divisions.toLowerCase().includes(q) ||
      node.whyFuses.toLowerCase().includes(q) ||
      node.hardwareComponents.some(h => h.toLowerCase().includes(q))
    );
  });

  const activeDigital = SYNERGY_NODES.find(n => n.id === selectedNodeId) || SYNERGY_NODES[0];
  const activePhysical = PHYSICAL_NODES.find(n => n.id === selectedPhysId) || PHYSICAL_NODES[0];

  // console loops simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConsoleActive) {
      interval = setInterval(() => {
        const randDistance = (Math.random() * 4 + 1).toFixed(2);
        const rpm = Math.floor(Math.random() * 50 + 580);
        const cpu = Math.floor(Math.random() * 20 + 35);
        const temp = (Math.random() * 5 + 41).toFixed(1);
        const battery = Math.max(0, 100 - Math.floor(Date.now() / 60000) % 20);

        let log = "";
        if (activePhysical.id === "SYN-01") {
          log = `[${new Date().toLocaleTimeString()}] SENTINEL: LiDAR sweep: distance=${randDistance}m @ ${rpm}RPM | Jetson CPU=${cpu}% Temp=${temp}°C | Status: AEGIS_CLEAR`;
        } else if (activePhysical.id === "SYN-02") {
          log = `[${new Date().toLocaleTimeString()}] RECOVERY: BLE broadcast query from nRF52840 | HRV baseline = 74ms | Sleep indicator: OPTIMAL | Readiness: 86`;
        } else if (activePhysical.id === "SYN-05") {
          log = `[${new Date().toLocaleTimeString()}] COMPLIANCE: Scanned Nexus media buffer | OCR signature lookup ok | Brand checklist validation: OK`;
        } else if (activePhysical.id === "SYN-07") {
          log = `[${new Date().toLocaleTimeString()}] AURUM: Biometric stress vector: HRV=62ms | GSR skin conductance=1.8uS | Context: Stable market trend`;
        } else {
          log = `[${new Date().toLocaleTimeString()}] TELEMETRY: System ${activePhysical.id} broadcast | Active standard ping | Compute block status: OPERATIONAL`;
        }

        setTelemetryLogs((prev) => {
          const next = [...prev, log];
          if (next.length > 8) next.shift(); // Keep last 8 lines
          return next;
        });
        setProgressVal((prev) => (prev < 100 ? prev + 5 : 0));
      }, 1200);
    } else {
      setTelemetryLogs([`[INTERFACE SYSTEM] Terminal offline. Boot hardware node to intercept telemetry sensors.`]);
      setProgressVal(0);
    }
    return () => clearInterval(interval);
  }, [isConsoleActive, selectedPhysId]);

  const handleToggleConsole = () => {
    if (!isConsoleActive) {
      setTelemetryLogs([
        `[INTERFACE SYSTEM] Boot sequence initialized for ${activePhysical.name}...`,
        `[HARDWARE GATE] Verifying device: ${activePhysical.id} | Budget ${activePhysical.budgetRange}`,
        `[AEGIS SECURITY] Clearance checks for hardware actuators: APPROVED`,
        `[TELEMETRY] Stabilizing telemetry pipes...`
      ]);
    }
    setIsConsoleActive(!isConsoleActive);
  };

  return (
    <div className="space-y-6 select-none text-left">
      {/* Tab Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1A2540] gap-4 pb-2 sm:pb-0">
        <div className="flex">
          <button
            onClick={() => {
              setActiveTab("digital");
              setIsConsoleActive(false);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "digital"
                ? "border-[#D4A843] text-white bg-[#0D1326]/50"
                : "border-transparent text-[#8B9BAE] hover:text-white"
            }`}
          >
            <Layers size={12} />
            <span>Digital Synergy Nodes</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("physical");
              setIsConsoleActive(false);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "physical"
                ? "border-[#D4A843] text-white bg-[#0D1326]/50"
                : "border-transparent text-[#8B9BAE] hover:text-white"
            }`}
          >
            <HardDrive size={12} />
            <span>Cross-Division Physical Nodes</span>
          </button>
        </div>

        {/* Display Mode Switcher - only show when in 'digital' tab */}
        {activeTab === "digital" && (
          <div className="flex items-center gap-1.5 px-4 pb-2 sm:pb-0">
            <span className="text-[10px] font-mono font-semibold uppercase text-[#8B9BAE] mr-1">LAYOUT MODE:</span>
            <div className="flex items-center p-0.5 rounded bg-[#111827] border border-[#1A2540]">
              <button
                onClick={() => setDisplayMode("graph")}
                className={`py-1 px-3 text-[10px] font-mono leading-none rounded-sm transition-all flex items-center gap-1.5 ${
                  displayMode === "graph"
                    ? "bg-[#D4A843] text-[#050A18] font-bold"
                    : "text-[#8B9BAE] hover:text-white"
                }`}
                title="Interactive Force Network"
              >
                <Network size={11} />
                <span>GRAPH</span>
              </button>
              <button
                onClick={() => setDisplayMode("matrix")}
                className={`py-1 px-3 text-[10px] font-mono leading-none rounded-sm transition-all flex items-center gap-1.5 ${
                  displayMode === "matrix"
                    ? "bg-[#D4A843] text-[#050A18] font-bold"
                    : "text-[#8B9BAE] hover:text-white"
                }`}
                title="Structure Grid Matrix"
              >
                <List size={11} />
                <span>MATRIX</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {activeTab === "digital" ? (
        /* DIGITAL NODES VIEW */
        displayMode === "graph" ? (
          /* DIGITAL GRAPH FLOW LAB */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* The Graph Canvas (2/3 width) */}
            <div className="lg:col-span-2">
              <InteractiveSynergyGraph
                onSelectNode={setSelectedNodeId}
                selectedNodeId={selectedNodeId}
              />
            </div>

            {/* Selected Node details panel (1/3 width) */}
            <div className="lg:col-span-1 space-y-6 text-left">
              <div className="bg-[#0D1326] border border-[#1A2540] border-t-2 border-t-[#D4A843] rounded p-6 space-y-5">
                <div className="flex items-start justify-between border-b border-[#1A2540]/60 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] bg-[#111827] text-[#D4A843] px-1.5 py-0.5 border border-[#1A2540] rounded-sm">
                        {activeDigital.id}
                      </span>
                      <h2 className="text-base font-bold text-white font-sans">
                        {activeDigital.name}
                      </h2>
                    </div>
                    <span className="text-[10px] font-mono text-[#8B9BAE] uppercase block mt-1.5">
                      {activeDigital.phase}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-mono text-[#8B9BAE] uppercase tracking-wider font-bold mb-1">
                      CONSTITUENT DIVISIONS
                    </h4>
                    <p className="text-xs text-white leading-normal font-sans font-medium">
                      {activeDigital.divisions}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono text-[#8B9BAE] uppercase tracking-wider font-bold mb-1">
                      THE SYNERGY MANDATE
                    </h4>
                    <p className="text-xs text-[#8B9BAE] leading-relaxed font-sans">
                      {activeDigital.mandate}
                    </p>
                  </div>
                </div>
              </div>

              {/* General warning details */}
              <div className="p-4 bg-[#EA580C]/5 border border-[#EA580C]/35 rounded-[2px] text-xs text-[#EA580C] font-sans flex items-start gap-2.5">
                <AlertTriangle className="shrink-0 mt-0.5" size={14} />
                <div className="space-y-1">
                  <span className="font-bold block uppercase tracking-wide text-white text-[10px]">
                    Phase Alignment Order
                  </span>
                  <p className="leading-relaxed">
                    Under corporate bylaws, Treatment of Phase 4 deliverables as current-phase priority constitutes an architectural breach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* DIGITAL MATRIX SELECTOR VIEW (THE ORIGINAL GRID LIST VIEW) */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left panel selector list */}
            <div className="lg:col-span-1 bg-[#0D1326] border border-[#1A2540] rounded p-4 space-y-4 max-h-[580px] overflow-y-auto">
              <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2">
                Digital Synergy Matrix
              </h3>
              
              <div className="space-y-1">
                {filteredDigital.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full text-left p-2.5 rounded transition-all text-xs border border-transparent ${
                      selectedNodeId === node.id
                        ? "bg-[#050A18] border-[#1A2540] text-white font-semibold"
                        : "hover:bg-[#050A18]/50 text-[#8B9BAE]"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 justify-between">
                      <span className="font-mono text-[10px] text-[#00D9B5]">{node.id}</span>
                      <span className="font-sans font-bold block truncate max-w-[120px]">{node.name}</span>
                    </div>
                    <div className="text-[9px] font-mono text-[#8B9BAE] mt-1 block truncate">
                      {node.divisions}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right panel node descriptors */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#0D1326] border border-[#1A2540] border-t-2 border-t-[#D4A843] rounded p-6 space-y-5">
                <div className="flex items-start justify-between border-b border-[#1A2540]/60 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] bg-[#111827] text-[#D4A843] px-1.5 py-0.5 border border-[#1A2540] rounded-sm">
                        {activeDigital.id}
                      </span>
                      <h2 className="text-base font-bold text-white font-sans">
                        {activeDigital.name}
                      </h2>
                    </div>
                    <span className="text-[10px] font-mono text-[#8B9BAE] uppercase block mt-1.5">
                      {activeDigital.phase}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-mono text-[#8B9BAE] uppercase tracking-wider font-bold mb-1">
                      CONSTITUENT DIVISIONS
                    </h4>
                    <p className="text-xs text-white leading-normal font-sans font-medium">
                      {activeDigital.divisions}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono text-[#8B9BAE] uppercase tracking-wider font-bold mb-1">
                      THE SYNERGY MANDATE
                    </h4>
                    <p className="text-xs text-[#8B9BAE] leading-relaxed font-sans">
                      {activeDigital.mandate}
                    </p>
                  </div>
                </div>
              </div>

              {/* General statement warning banner */}
              <div className="p-4 bg-[#EA580C]/5 border border-[#EA580C]/35 rounded-[2px] text-xs text-[#EA580C] font-sans flex items-start gap-2.5">
                <AlertTriangle className="shrink-0 mt-0.5" size={14} />
                <div className="space-y-1">
                  <span className="font-bold block uppercase tracking-wide text-white text-[10px]">
                    Phase Alignment Enforcement Order
                  </span>
                  <p className="leading-relaxed">
                    Every synergy node operates under explicit portfolio sequencing boundaries. Interdependence builds compounding returns. Under the operating bylaws, Treatment of Phase 4 deliverables as current-phase priority constitutes an architectural breach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        /* PHYSICAL HARDWARE SPECS VIEW & PANEL CHASSIS SIMULATOR */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left panel selector list */}
          <div className="lg:col-span-1 bg-[#0D1326] border border-[#1A2540] rounded p-4 space-y-4 max-h-[580px] overflow-y-auto">
            <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2">
              Physical Foundry Nodes
            </h3>
            
            <div className="space-y-1">
              {filteredPhysical.map((node) => (
                <button
                  key={node.id}
                  onClick={() => {
                    setSelectedPhysId(node.id);
                    setIsConsoleActive(false);
                  }}
                  className={`w-full text-left p-2.5 rounded transition-all text-xs border border-transparent ${
                    selectedPhysId === node.id
                      ? "bg-[#050A18] border-[#1A2540] text-white font-semibold"
                      : "hover:bg-[#050A18]/50 text-[#8B9BAE]"
                  }`}
                >
                  <div className="flex items-center gap-1.5 justify-between">
                    <span className="font-mono text-[10px] text-[#00D9B5]">{node.id}</span>
                    <span className="font-sans font-bold block truncate max-w-[120px]">{node.name}</span>
                  </div>
                  <div className="text-[9px] font-mono text-[#D4A843] mt-1 block">
                    {node.budgetRange}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel specs detail + active console terminal simulation */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0D1326] border border-[#1A2540] border-t-2 border-t-[#00D9B5] rounded p-6 space-y-6">
              
              <div className="flex items-start justify-between border-b border-[#1A2540]/60 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] bg-[#111827] text-[#00D9B5] px-1.5 py-0.5 border border-[#1A2540] rounded-sm">
                      {activePhysical.id}
                    </span>
                    <h2 className="text-base font-bold text-white font-sans uppercase">
                      {activePhysical.name}
                    </h2>
                  </div>
                  <span className="text-[9px] font-mono text-[#8B9BAE] uppercase block mt-1.5">
                    Constituent: {activePhysical.divisions} | {activePhysical.phase}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-mono text-[#D4A843] uppercase block">
                    Estimated Cost build
                  </span>
                  <span className="text-xs font-bold text-white font-sans uppercase">
                    {activePhysical.budgetRange}
                  </span>
                </div>
              </div>

              {/* Hardware items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono text-[#8B9BAE] uppercase tracking-wider font-bold border-b border-[#1A2540]/60 pb-1">
                    FUSION RATIONALE
                  </h4>
                  <p className="text-[11px] text-[#8B9BAE] leading-relaxed font-sans">
                    {activePhysical.whyFuses}
                  </p>

                  <h4 className="text-[10px] font-mono text-[#8B9BAE] uppercase tracking-wider font-bold border-b border-[#1A2540]/60 pb-1 pt-2">
                    PRODUCT DESCRIPTION
                  </h4>
                  <p className="text-[11px] text-[#8B9BAE] leading-relaxed font-sans">
                    {activePhysical.productDescription}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono text-[#8B9BAE] uppercase tracking-wider font-bold border-b border-[#1A2540]/60 pb-1">
                    Glyph Forge Bill of Components
                  </h4>
                  <div className="grid grid-cols-1 gap-1 text-[10px] font-mono text-[#8B9BAE] max-h-[220px] overflow-y-auto scrollbar-thin">
                    {activePhysical.hardwareComponents.map((component, idx) => (
                      <div key={idx} className="flex gap-2 p-1 border-b border-[#1A2540]/30 last:border-0 hover:bg-[#050A18]/40">
                        <span className="text-[#00D9B5]">✧</span>
                        <span>{component}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Telemetry Terminal Simulator Console */}
            <div className="bg-[#0A0F1E] border border-[#1A2540] rounded overflow-hidden">
              {/* Terminal Frame Top */}
              <div className="bg-[#050A18] h-8 border-b border-[#1A2540] px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={12} className="text-[#00D9B5]" />
                  <span className="text-[9px] font-mono text-[#8B9BAE] uppercase font-semibold">
                    Telemetry Stream Console v1.0 — Node {activePhysical.id}
                  </span>
                </div>

                {isConsoleActive && (
                  <div className="flex items-center gap-1.5 animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00D9B5]" />
                    <span className="text-[8px] font-mono text-[#00D9B5] uppercase">STREAM ACTIVE</span>
                  </div>
                )}
              </div>

              {/* Console Logs */}
              <div className="p-4 font-mono text-[10px] text-[#8B9BAE] min-h-[160px] bg-black/40 space-y-2">
                {telemetryLogs.map((log, idx) => (
                  <div key={idx} className={`${idx === telemetryLogs.length - 1 ? "text-white" : ""}`}>
                    {log}
                  </div>
                ))}
              </div>

              {/* Controls Footer */}
              <div className="p-3 border-t border-[#1A2540] bg-[#050A18] flex items-center justify-between">
                <button
                  onClick={handleToggleConsole}
                  className={`px-3 py-1.5 text-[10px] font-mono font-bold rounded-sm flex items-center gap-2 border transition-all ${
                    isConsoleActive
                      ? "bg-[#EA580C]/10 border-[#EA580C]/30 text-[#EA580C] hover:bg-[#EA580C]/25"
                      : "bg-[#00D9B5]/10 border-[#00D9B5]/30 text-[#00D9B5] hover:bg-[#00D9B5]/25"
                  }`}
                >
                  {isConsoleActive ? (
                    <>
                      <Square size={10} />
                      <span>HALT TELEMETRY GATE</span>
                    </>
                  ) : (
                    <>
                      <Play size={10} fill="currentColor" />
                      <span>BOOT FOUNDRY TELEMETRY</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 font-mono text-[9px] text-[#8B9BAE]">
                  <span>FREQUENCY:</span>
                  <span className="text-white">1200ms</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
