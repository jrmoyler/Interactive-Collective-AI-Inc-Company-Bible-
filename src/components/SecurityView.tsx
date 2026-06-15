import React, { useState } from "react";
import { ShieldAlert, CheckSquare, Square, Info, Shield, PlusCircle, Server, Terminal } from "lucide-react";

export default function SecurityView() {
  const [checklist, setChecklist] = useState([
    { id: "sec-1", label: "Perform full SOC auditing on active 30-agent standard capability nodes", completed: true },
    { id: "sec-2", label: "Establish active physical air-gap protocol gates within District A Vault", completed: true },
    { id: "sec-3", label: "Execute Red Team penetration tests on ZenFlow central model layers", completed: false },
    { id: "sec-4", label: "Validate zero-trust SSH credential hashes across SYN-01 Sentinel hardware", completed: true },
    { id: "sec-5", label: "Sanitize LLM memory buffer logs against designated Banned lists", completed: false },
    { id: "sec-6", label: "Establish physical telemetry failovers for District B drone verti-ports", completed: false }
  ]);

  const toggleCheck = (id: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = checklist.filter(c => c.completed).length;

  return (
    <div className="space-y-6 select-none text-left">
      <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6">
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert className="text-[#EA580C]" size={16} />
          <h2 className="text-base font-bold text-white font-sans uppercase tracking-tight">
            10 Obsidian Arc Infrastructure and Security Systems
          </h2>
        </div>
        <p className="text-xs text-[#8B9BAE] font-sans leading-relaxed">
          Obsidian Arc serves as the unified security intelligence stack. From District A HQ, it operates 24/7 SIEM auditing, packet filtration, and zero-trust gating. No external model commands bypass our cryptographic validation filters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Level status indicators */}
        <div className="lg:col-span-1 bg-[#0D1326] border border-[#1A2540] rounded p-5 space-y-4">
          <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2">
            Threat Landscape Readout
          </h3>

          <div className="space-y-3 font-mono text-[10px]">
            <div className="p-3 bg-[#050A18]/60 border border-[#1A2540] rounded flex items-center justify-between">
              <div>
                <span className="text-[#8B9BAE] block uppercase font-bold">ARC DEFENSE TIER</span>
                <span className="text-white text-xs block font-bold mt-1">TIER 1 (RESTING STATE)</span>
              </div>
              <Shield className="text-[#00D9B5]" size={18} />
            </div>

            <div className="p-3 bg-[#050A18]/60 border border-[#1A2540] rounded flex items-center justify-between">
              <div>
                <span className="text-[#8B9BAE] block uppercase font-bold">CVE INCIDENCE PIPELINE</span>
                <span className="text-[#00D9B5] text-xs block font-bold mt-1">0 ACTIVE EXPLOITS</span>
              </div>
              <Server className="text-[#00D9B5]" size={18} />
            </div>

            <div className="p-3 bg-[#050A18]/60 border border-l-4 border-l-[#EA580C] border-[#1A2540] rounded">
              <span className="text-[#EA580C] block font-bold uppercase">SEC ADVISORY ALISON-9</span>
              <p className="text-[9px] text-[#8B9BAE] leading-normal font-sans pt-1">
                Attempted context-injection attacks identified from remote edge servers. Sentinel automated gates successfully isolated telemetry queries. Zero leaks registered.
              </p>
            </div>
          </div>
        </div>

        {/* SOC Checklist */}
        <div className="lg:col-span-2 bg-[#0D1326] border border-[#1A2540] rounded p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-[#1A2540] pb-2 mb-4">
              <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide">
                Obsidian Security Operational Audit
              </h3>
              <span className="font-mono text-[9px] text-[#00D9B5] px-1.5 py-0.5 rounded bg-[#00D9B5]/10 border border-[#00D9B5]/25">
                {completedCount} OF {checklist.length} SECURED
              </span>
            </div>

            <div className="space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="flex items-start gap-3 p-2.5 rounded bg-[#050A18]/40 border border-[#1A2540]/60 hover:border-[#D4A843] transition-colors cursor-pointer select-none"
                >
                  <button className="text-[#00D9B5] shrink-0 mt-0.5 focus:outline-none">
                    {item.completed ? (
                      <CheckSquare size={14} className="text-[#00D9B5]" />
                    ) : (
                      <Square size={14} className="text-[#8B9BAE]" />
                    )}
                  </button>
                  <span className={`text-[11px] font-sans leading-normal ${
                    item.completed ? "text-[#8B9BAE] line-through decoration-[#1A2540]" : "text-white"
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1A2540]/40 text-[9px] font-mono text-[#8B9BAE]/60 flex items-center gap-1.5 uppercase leading-none">
            <Info size={10} className="text-[#D4A843]" />
            <span>Updates require SECURE KEY AUTHENTICATION before committing locally.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
