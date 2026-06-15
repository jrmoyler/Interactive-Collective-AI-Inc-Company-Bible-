import React from "react";
import { Cpu, Activity, Server, Shield } from "lucide-react";

interface StatTilesProps {
  onTileClick?: (metricId: string) => void;
}

export default function StatTiles({ onTileClick }: StatTilesProps) {
  const stats = [
    {
      id: "active-agents",
      label: "Active AI Agents",
      value: "128",
      change: "+12.4% vs last 7d",
      isPositive: true,
      icon: Cpu,
      accent: "#00D9B5",
      desc: "30-agent standard clusters running across active departments."
    },
    {
      id: "inference-requests",
      label: "Inference Requests",
      value: "2.47M",
      change: "+18.7% vs last 7d",
      isPositive: true,
      icon: Activity,
      accent: "#D4A843",
      desc: "Weekly total parentage routing evaluations processed by ZenFlow."
    },
    {
      id: "system-reliability",
      label: "System Reliability",
      value: "99.98%",
      change: "+0.02% vs last 7d",
      isPositive: true,
      icon: Server,
      accent: "#14B8A6",
      desc: "Lattice compute resilience tracked by Binary Loom cloud orchestrators."
    },
    {
      id: "security-score",
      label: "Security Score",
      value: "93",
      change: "+5 pts vs last 7d",
      isPositive: true,
      icon: Shield,
      accent: "#EA580C",
      desc: "Aggregated threat quotient validated by Obsidian Arc SIEM audits.",
      showGauge: true,
      gaugePercent: 72 // Matching the 72% gauge in the spec
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            onClick={() => onTileClick?.(stat.id)}
            className="bg-[#0D1326] border border-[#1A2540] border-t-2 rounded-sm p-4 relative overflow-hidden group hover:border-[#D4A843] cursor-pointer transition-all duration-150"
            style={{ borderTopColor: stat.accent }}
          >
            {/* Background design accents/grid lines */}
            <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:opacity-10 transition-all bg-[radial-gradient(#1A2540_1px,transparent_1px)] [background-size:8px_8px]" />

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#8B9BAE] uppercase tracking-wider">
                {stat.label}
              </span>
              <Icon size={14} style={{ color: stat.accent }} />
            </div>

            <div className="mt-2 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-bold font-sans tracking-tight text-white">
                  {stat.value}
                </span>

                <div className="mt-1 flex items-center gap-1">
                  <span
                    className={`text-[10px] font-mono font-medium ${
                      stat.isPositive ? "text-[#00D9B5]" : "text-[#EA580C]"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>

              {/* Security score gauge diagram */}
              {stat.showGauge && (
                <div className="relative flex items-center justify-center h-12 w-12 shrink-0">
                  <div className="absolute inset-0 rounded-full border-2 border-[#1A2540]" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-[#EA580C] border-r-[#EA580C] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-[#EA580C] z-10">
                    72%
                  </span>
                </div>
              )}
            </div>

            <div className="mt-2.5 pt-2 border-t border-[#1A2540]/30 text-[9px] font-mono text-[#8B9BAE] leading-tight">
              {stat.desc}
            </div>
          </div>
        );
      })}
    </div>
  );
}
