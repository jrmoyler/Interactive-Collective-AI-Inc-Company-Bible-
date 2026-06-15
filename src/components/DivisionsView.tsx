import React, { useState } from "react";
import { Search, MapPin, Layers, Briefcase, Zap, Terminal, Plus, ShieldCheck } from "lucide-react";
import { DIVISIONS } from "../data/bibleData";
import { Division } from "../types/bible";

interface DivisionsViewProps {
  searchQuery: string;
  onAddAgentInstance: (agentName: string, roleCluster: string, divisionName: string) => void;
}

export default function DivisionsView({ searchQuery, onAddAgentInstance }: DivisionsViewProps) {
  const [selectedDivId, setSelectedDivId] = useState<string>("D-01");
  const [agentNameInput, setAgentNameInput] = useState("");
  const [roleClusterInput, setRoleClusterInput] = useState("Build");
  const [provisionSuccessMsg, setProvisionSuccessMsg] = useState("");

  const filteredDivisions = DIVISIONS.filter((div) => {
    const q = searchQuery.toLowerCase();
    return (
      div.id.toLowerCase().includes(q) ||
      div.name.toLowerCase().includes(q) ||
      div.subtitle.toLowerCase().includes(q) ||
      div.technologyStack.some(t => t.toLowerCase().includes(q))
    );
  });

  const selectedDiv = DIVISIONS.find((div) => div.id === selectedDivId) || DIVISIONS[0];

  const handleProvisionAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentNameInput.trim()) return;

    // Trigger parent callback
    onAddAgentInstance(agentNameInput, roleClusterInput, selectedDiv.name);
    
    setProvisionSuccessMsg(`SUCCESS: Initialized ${agentNameInput} in ZenFlow lattice [${selectedDiv.id} // ${roleClusterInput} Cluster]`);
    setAgentNameInput("");
    
    setTimeout(() => {
      setProvisionSuccessMsg("");
    }, 4000);
  };

  const roleClusters = ["Intake", "Research", "Strategy", "Build", "Review", "Automation", "Content/Comms", "Analytics", "Memory"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
      {/* Left List Pane: Search filtered departments */}
      <div className="lg:col-span-1 bg-[#0D1326] border border-[#1A2540] rounded flex flex-col p-4 space-y-4 max-h-[640px] overflow-y-auto">
        <div className="flex justify-between items-center pb-2 border-b border-[#1A2540]">
          <span className="text-xs font-bold text-white font-sans uppercase tracking-wide">
            20 Portfolio Divisions
          </span>
          <span className="font-mono text-[9px] text-[#00D9B5] px-1.5 py-0.5 rounded bg-[#00D9B5]/10 border border-[#00D9B5]/20">
            {filteredDivisions.length} FOUND
          </span>
        </div>

        <div className="space-y-1">
          {filteredDivisions.map((div) => (
            <button
              key={div.id}
              onClick={() => setSelectedDivId(div.id)}
              className={`w-full flex items-center justify-between p-2.5 rounded transition-all text-left group ${
                selectedDivId === div.id
                  ? "bg-[#050A18] border border-[#1A2540] border-l-4"
                  : "hover:bg-[#050A18]/50 border border-transparent text-[#8B9BAE]"
              }`}
              style={{ borderLeftColor: div.accentHex }}
            >
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase font-bold" style={{ color: div.accentHex }}>
                    {div.id}
                  </span>
                  <span className="text-xs font-sans font-bold text-white group-hover:text-white transition-colors">
                    {div.name}
                  </span>
                </div>
                <div className="text-[10px] text-[#8B9BAE] truncate max-w-[180px] mt-1 font-sans">
                  {div.subtitle}
                </div>
              </div>

              <span className="font-mono text-[8px] text-[#8B9BAE] uppercase shrink-0">
                {div.launchYear.split(" ")[0] || "Y1"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Details and Provision Actions */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Selected department profile card */}
        <div className="bg-[#0D1326] border border-[#1A2540] border-t-2 rounded p-6 space-y-6"
             style={{ borderTopColor: selectedDiv.accentHex }}
        >
          {/* Header row */}
          <div className="flex items-start justify-between border-b border-[#1A2540]/60 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold text-white bg-[#111827] px-2 py-0.5 border border-[#1A2540]/80 rounded-[2px]"
                      style={{ borderLeftColor: selectedDiv.accentHex, borderLeftWidth: "3px" }}
                >
                  {selectedDiv.id}
                </span>
                <h2 className="text-lg font-bold text-white font-sans tracking-tight">
                  {selectedDiv.name}
                </h2>
              </div>
              <p className="text-xs text-[#8B9BAE] font-sans font-medium mt-1">
                {selectedDiv.subtitle}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-[#D4A843] uppercase tracking-wider block">
                Launch Year
              </span>
              <span className="text-xs font-bold text-white font-sans uppercase">
                {selectedDiv.launchYear}
              </span>
            </div>
          </div>

          {/* Slogan */}
          {selectedDiv.tagline && (
            <div className="p-3 bg-[#050A18]/50 rounded-[2px] border border-[#1A2540]/40 text-xs italic text-[#8B9BAE] font-sans leading-relaxed">
              "{selectedDiv.tagline}"
            </div>
          )}

          {/* Double Column content: Products & platforms vs services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Products Column */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono font-bold text-[#8B9BAE] uppercase tracking-widest flex items-center gap-1.5 border-b border-[#1A2540]/40 pb-1.5">
                <Layers size={10} className="text-[#00D9B5]" />
                <span>Products & Platforms</span>
              </h4>
              <ul className="text-[11px] text-[#8B9BAE] space-y-2 list-none pl-0">
                {selectedDiv.products.map((prod, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-[#D4A843] mt-0.5 leading-none font-sans font-bold">✦</span>
                    <span className="font-sans leading-normal">{prod}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono font-bold text-[#8B9BAE] uppercase tracking-widest flex items-center gap-1.5 border-b border-[#1A2540]/40 pb-1.5">
                <Briefcase size={10} className="text-[#00D9B5]" />
                <span>Services Provided</span>
              </h4>
              <ul className="text-[11px] text-[#8B9BAE] space-y-2 list-none pl-0">
                {selectedDiv.services.map((serv, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-[#00D9B5] mt-0.5 leading-none font-sans font-bold">✦</span>
                    <span className="font-sans leading-normal">{serv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Revenue and Node cascades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#1A2540]/40 pt-4 text-left leading-tight text-[11px]">
            <div className="p-3 bg-[#050A18]/50 border border-[#1A2540]/50 rounded-[2px]">
              <span className="text-[9px] font-mono text-[#8B9BAE] uppercase tracking-wider block">REVENUE STREAM</span>
              <span className="text-white mt-1 block font-sans font-semibold leading-normal">
                {selectedDiv.revenueModel}
              </span>
            </div>
            <div className="p-3 bg-[#050A18]/50 border border-[#1A2540]/50 rounded-[2px]">
              <span className="text-[9px] font-mono text-[#8B9BAE] uppercase tracking-wider block">SYNERGY NODE ALLOCATION</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {selectedDiv.synergyNodes.map((node, idx) => (
                  <span key={idx} className="text-[10px] font-sans font-semibold text-white">
                    {node}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Vector tags */}
          <div className="space-y-2 border-t border-[#1A2540]/40 pt-4 text-left">
            <span className="text-[9px] font-mono text-[#8B9BAE] uppercase tracking-wider block">Technology Stack Vector</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedDiv.technologyStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[9px] font-mono font-medium rounded-sm bg-[#111827] text-[#8B9BAE] border border-[#1A2540] hover:border-[#D4A843] hover:text-white transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Action: Provision an Agent into this division's lattice */}
        <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6 space-y-4 text-left">
          <div className="flex items-center gap-2 border-b border-[#1A2540]/40 pb-2">
            <Zap size={14} className="text-[#00D9B5]" />
            <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide">
              Lattice Provision Gating Engine — {selectedDiv.name}
            </h3>
          </div>
          
          <p className="text-[11px] text-[#8B9BAE] leading-normal font-sans">
            Under the ZenFlow 30-agent standard roadmap, you can deploy operator instances to active capability clusters. Submitting verifies model safety constraints via the Aegis Protocol automatically.
          </p>

          <form onSubmit={handleProvisionAgent} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex flex-col space-y-1">
              <label htmlFor="agent-role" className="text-[9px] font-mono uppercase text-[#8B9BAE] font-bold">Role Cluster</label>
              <select
                id="agent-role"
                value={roleClusterInput}
                onChange={(e) => setRoleClusterInput(e.target.value)}
                className="bg-[#111827] border border-[#1A2540] text-xs text-white rounded p-1.5 h-8 pr-4"
              >
                {roleClusters.map((cluster) => (
                  <option key={cluster} value={cluster}>
                    {cluster}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="agent-name" className="text-[9px] font-mono uppercase text-[#8B9BAE] font-bold">Agent Name (Identifier)</label>
              <input
                id="agent-name"
                type="text"
                placeholder="e.g., Query_Optimizer_v7"
                value={agentNameInput}
                onChange={(e) => setAgentNameInput(e.target.value)}
                className="bg-[#111827] border border-[#1A2540] text-xs text-white rounded p-1.5 h-8 placeholder-[#8B9BAE]/60 focus:outline-none focus:border-[#D4A843]"
              />
            </div>

            <div className="flex flex-col justify-end">
              <button
                type="submit"
                className="bg-[#00D9B5]/10 text-[#00D9B5] border border-[#00D9B5]/30 text-xs font-bold h-8 rounded hover:bg-[#00D9B5] hover:text-[#050A18] transition-all flex items-center justify-center gap-1.5 focus:outline-none"
              >
                <Plus size={12} />
                <span>Initialize Agent</span>
              </button>
            </div>
          </form>

          {/* Success Banner */}
          {provisionSuccessMsg && (
            <div className="p-3 bg-[#00D9B5]/10 border border-[#00D9B5]/30 rounded text-[11px] font-mono text-[#00D9B5] flex items-center gap-2 mt-2 leading-relaxed animate-pulse">
              <ShieldCheck size={14} className="shrink-0" />
              <span>{provisionSuccessMsg}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
