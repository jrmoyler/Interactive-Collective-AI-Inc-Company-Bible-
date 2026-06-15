import React from "react";
import {
  LayoutDashboard,
  Cpu,
  ShoppingBag,
  Bot,
  ShieldCheck,
  ShieldAlert,
  BarChart3,
  Users2,
  Settings2,
  ChevronRight,
  TrendingUp,
  Workflow,
  GitFork,
  DollarSign
} from "lucide-react";

interface CommandRailProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isEnabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
}

export default function CommandRail({
  activeView,
  onViewChange,
  isEnabled,
  onEnabledChange
}: CommandRailProps) {
  const menuItems = [
    { id: "command-center", label: "Command Center", icon: LayoutDashboard },
    { id: "divisions", label: "AI Orchestrator", icon: Cpu },
    { id: "mixer", label: "Ecosystem Mixer", icon: Workflow },
    { id: "integrations", label: "MCP & n8n Ecosystem", icon: GitFork },
    { id: "pricing", label: "Universal Pricing", icon: DollarSign },
    { id: "merchandise", label: "Data Intelligence", icon: ShoppingBag },
    { id: "taxonomy", label: "Models & Agents", icon: Bot },
    { id: "governance", label: "Governance & Aegis", icon: ShieldCheck },
    { id: "security", label: "Security & Shield", icon: ShieldAlert },
    { id: "synergy", label: "Observability Nodes", icon: BarChart3 },
    { id: "people", label: "People & Access", icon: Users2 },
    { id: "brand", label: "Brand System", icon: Settings2 }
  ];

  return (
    <aside className="w-64 border-r border-[#1A2540] bg-[#0A0F1E] flex flex-col justify-between shrink-0 select-none">
      {/* Menu scroll area */}
      <div className="flex-1 py-4 overflow-y-auto space-y-4 px-3">
        <div className="text-[10px] font-mono text-[#8B9BAE] uppercase tracking-wider px-3 mb-1">
          Command Rail v1.0
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-item-${item.id}`}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-all duration-150 text-left group ${
                  isActive
                    ? "bg-[#0D1326] border border-[#1A2540] border-l-2 border-l-[#D4A843] text-white"
                    : "text-[#8B9BAE] hover:bg-[#0D1326]/50 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    size={16}
                    className={`transition-colors duration-150 ${
                      isActive ? "text-[#00D9B5]" : "text-[#8B9BAE] group-hover:text-[#00D9B5]"
                    }`}
                  />
                  <span className="text-xs font-medium tracking-tight font-sans">
                    {item.label}
                  </span>
                </div>
                {isActive && <ChevronRight size={12} className="text-[#D4A843]" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Embedded controls footer */}
      <div className="p-4 border-t border-[#1A2540] bg-[#050A18] space-y-4">
        {/* Toggle Option */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] text-[#8B9BAE] uppercase tracking-wider">
            Lattice Core
          </span>
          <button
            onClick={() => onEnabledChange(!isEnabled)}
            className="flex items-center gap-1.5 focus:outline-none"
          >
            <span className={`text-[10px] font-mono ${isEnabled ? "text-[#00D9B5]" : "text-[#EA580C]"}`}>
              {isEnabled ? "ENABLED" : "DISABLED"}
            </span>
            <div
              className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${
                isEnabled ? "bg-[#00D9B5]" : "bg-[#1A2540]"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full bg-black absolute top-0.5 transition-all duration-200 ${
                  isEnabled ? "left-[16px]" : "left-0.5"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Sync Progress Gauges */}
        <div className="space-y-3 font-mono text-[10px]">
          {/* Linear Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-[#8B9BAE]">
              <span>LINEAR PROG</span>
              <span className="text-[#00D9B5]">72%</span>
            </div>
            <div className="w-full h-1 bg-[#1A2540] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00D9B5] to-[#7C3AED] w-[72%]" />
            </div>
          </div>

          {/* Circular Progress */}
          <div className="flex items-center justify-between text-[#8B9BAE] pt-1">
            <span>CIRCULAR SYNC</span>
            <div className="relative flex items-center justify-center">
              <span className="w-5 h-5 rounded-full border-2 border-[#1A2540] border-t-[#00D9B5] animate-spin inline-block mr-1.5" />
              <span className="text-[9px] font-bold text-[#00D9B5]">72%</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
