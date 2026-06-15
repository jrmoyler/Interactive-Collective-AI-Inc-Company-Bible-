import React from "react";
import { Bot, Network, Server, ArrowRight } from "lucide-react";

export default function TaxonomyView() {
  const tiers = [
    { tier: "T1", name: "Executive", count: "1 agent (ZENITH Overseer)", desc: "Strategic reasoning and global orchestration across all 20 departments. Monitors portfolio health, routes context. Never executes directly; coordinates first escalation matrix paths." },
    { tier: "T2", name: "Specialist", count: "20 agents (1 per Division)", desc: "Deep domain expertise. Manages its respective 30-agent cluster. Reports to Overseer. Persistent memory archive of division logs." },
    { tier: "T3", name: "Operator", count: "~30 per division (580 total)", desc: "Analysts, executors, and pipeline supervisors. Operates autonomously within standard limits. Escalates exceptions to Division Directors." },
    { tier: "T4", name: "Task", count: "Spawned on demand", desc: "Single-action workers. Maximum speed execution, destroyed immediately on completion. Over 90% of entire lattice call volumes." }
  ];

  const standards = [
    { role: "Intake", count: 3, desc: "Request routing and triage classification" },
    { role: "Research", count: 3, desc: "Domain context gathering and market logs" },
    { role: "Strategy", count: 3, desc: "Option generation and scenario simulation" },
    { role: "Build", count: 5, desc: "Core pipeline generation and execution" },
    { role: "Review", count: 3, desc: "Aegis safety checking and risk assessment" },
    { role: "Automation", count: 4, desc: "Pipeline scheduled triggers and n8n links" },
    { role: "Content/Comms", count: 3, desc: "Editorial synthesis and layout drafting" },
    { role: "Analytics", count: 3, desc: "Division KPI tracking and metric logs" },
    { role: "Memory", count: 2, desc: "Knowledge Keeper database synchronization syncs" }
  ];

  return (
    <div className="space-y-6 select-none text-left">
      <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="text-[#00D9B5]" size={16} />
          <h2 className="text-base font-bold text-white font-sans uppercase tracking-tight">
            12 ZenFlow Agent Architecture Taxonomy
          </h2>
        </div>
        <p className="text-xs text-[#8B9BAE] font-sans leading-relaxed">
          The 600-agent automated lattice orchestrated entirely by Zenith OS. Every single agent compiles under the Aegis Protocol gates and binds a verified God Prompt configuration. No agent operates in isolation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Four Tiers list */}
        <div className="lg:col-span-1 bg-[#0D1326] border border-[#1A2540] rounded p-5 space-y-4">
          <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2">
            The 4-Tier Agent Hierarchy
          </h3>

          <div className="space-y-4">
            {tiers.map((t, idx) => (
              <div key={idx} className="p-3 bg-[#050A18]/50 rounded-[2px] border border-[#1A2540]/60 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#00D9B5]">
                    {t.tier}
                  </span>
                  <span className="text-xs font-bold text-white uppercase font-sans">
                    {t.name}
                  </span>
                </div>
                <div className="text-[9px] font-mono text-[#D4A843] uppercase font-bold">
                  {t.count}
                </div>
                <p className="text-[10px] text-[#8B9BAE] leading-normal pt-1 font-sans">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 30 Agent Division standard chart and breakdown */}
        <div className="lg:col-span-2 bg-[#0D1326] border border-[#1A2540] rounded p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2 mb-4">
              The 30-Agent Division Standard
            </h3>

            <div className="space-y-3 font-sans text-xs">
              {standards.map((std, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span className="text-white tracking-tight">{std.role}</span>
                    <span className="font-mono text-[#00D9B5]">{std.count} Agents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-[#050A18] rounded-full overflow-hidden border border-[#1A2540]/45">
                      <div
                        className="h-full bg-gradient-to-r from-[#00D9B5] to-[#7C3AED] rounded-full"
                        style={{ width: `${(std.count / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-[#8B9BAE] w-48 truncate leading-none">
                      {std.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#8B9BAE]/60 pt-4 border-t border-[#1A2540]/40 flex justify-between uppercase">
            <span>Standard cluster compliance: 100%</span>
            <span>Total Lattice: 30 × 20 = 600 Agents</span>
          </div>
        </div>
      </div>
    </div>
  );
}
