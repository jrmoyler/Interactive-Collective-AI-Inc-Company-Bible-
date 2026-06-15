import React, { useState, useEffect } from "react";
import { ShieldAlert, AlertOctagon, ShieldCheck, Check, X, RefreshCw, Terminal, Highlighter } from "lucide-react";
import { BANNED_WORDS, BANNED_OPENERS } from "../data/bibleData";
import { AegisEvent } from "../types/bible";

export default function GovernanceView() {
  const [events, setEvents] = useState<AegisEvent[]>([]);
  const [editingText, setEditingText] = useState("");
  const [detectedBannedWords, setDetectedBannedWords] = useState<string[]>([]);
  const [detectedOpeners, setDetectedBannedWordsOpeners] = useState<string[]>([]);
  const [isLoadingQueue, setIsLoadingQueue] = useState(false);
  const [customEventDesc, setCustomEventDesc] = useState("");
  const [customEventDiv, setCustomEventDiv] = useState("D-01");
  const [customEventClearance, setCustomEventClearance] = useState<"Clear" | "Review" | "Hold">("Clear");

  // Fetch compliance queue
  const fetchQueue = async () => {
    setIsLoadingQueue(true);
    try {
      const res = await fetch("/api/compliance/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load compliance events queue", err);
    } finally {
      setIsLoadingQueue(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleAction = async (id: string, action: "approve" | "block" | "escalate") => {
    try {
      const res = await fetch("/api/compliance/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, reviewer: "Dr. Joseph Johnson (CLO)" })
      });
      if (res.ok) {
        // reload
        fetchQueue();
      }
    } catch (err) {
      console.error("Failed to log action on compliance node", err);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEventDesc.trim()) return;

    try {
      const res = await fetch("/api/compliance/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          divisionId: customEventDiv,
          description: customEventDesc,
          requiredClearance: customEventClearance,
          agentName: "Sentinel_Evaluator_v1",
          details: `Manual operator log. Evaluation tier set to ${customEventClearance} trigger.`
        })
      });
      if (res.ok) {
        setCustomEventDesc("");
        fetchQueue();
      }
    } catch (err) {
      console.error("Failed to insert custom compliance trigger", err);
    }
  };

  // Live copy linter
  useEffect(() => {
    const textLower = editingText.toLowerCase();
    
    // Check words
    const foundWords = BANNED_WORDS.filter(word => textLower.includes(word));
    setDetectedBannedWords(foundWords);

    // Check openers
    const foundOpeners = BANNED_OPENERS.filter(opener => textLower.includes(opener.toLowerCase()));
    setDetectedBannedWordsOpeners(foundOpeners);
  }, [editingText]);

  return (
    <div className="space-y-6 select-none text-left">
      {/* Overview Tiers */}
      <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6">
        <h2 className="text-sm font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2 mb-4">
          The Aegis Protocol Clearance Tiers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded border border-[#1A2540]/60 bg-[#050A18]/50 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-[#00D9B5]" size={16} />
              <h4 className="text-xs font-bold text-white uppercase font-sans">Aegis-Clear</h4>
            </div>
            <p className="text-[11px] text-[#8B9BAE] leading-normal font-sans">
              All non-sensitive operations. Auto-approved. Examples include: general content generation, public-facing non-financial copy, routine maintenance scans.
            </p>
          </div>

          <div className="p-4 rounded border border-[#1A2540]/60 bg-[#050A18]/50 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-[#D4A843]" size={16} />
              <h4 className="text-xs font-bold text-white uppercase font-sans">Aegis-Review</h4>
            </div>
            <p className="text-[11px] text-[#8B9BAE] leading-normal font-sans">
              Sensitive operations (PII data, Vital Helix clinical formulas, Quantum Ledger financial logs, legal bounds). Requires human audit signature before delivery.
            </p>
          </div>

          <div className="p-4 rounded border border-[#1A2540]/60 bg-[#050A18]/50 space-y-2">
            <div className="flex items-center gap-2">
              <AlertOctagon className="text-[#EA580C]" size={16} />
              <h4 className="text-xs font-bold text-white uppercase font-sans">Aegis-Hold</h4>
            </div>
            <p className="text-[11px] text-[#8B9BAE] leading-normal font-sans">
              Potential safety bias, structural liabilities, physical robot actuation, and HELIOS GRID deployment. Escaled to JR Moyler / Devon Scott executive level. CLO signature mandatory.
            </p>
          </div>
        </div>
      </div>

      {/* Database Integration Event Log Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Compliance Event logs list */}
        <div className="lg:col-span-2 bg-[#0D1326] border border-[#1A2540] rounded p-6 flex flex-col space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-[#1A2540]">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-[#D4A843]" size={14} />
              <span className="text-xs font-bold text-white font-sans uppercase tracking-wide">
                Aegis Gating Compliance Queue
              </span>
            </div>
            <button
              onClick={fetchQueue}
              className="p-1 border border-[#1A2540] rounded bg-[#050A18] hover:border-[#D4A843] transition-colors focus:outline-none"
              title="Refresh queue"
            >
              <RefreshCw size={12} className={isLoadingQueue ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto">
            {events.length === 0 ? (
              <div className="text-center py-8 font-mono text-[#8B9BAE] text-xs">
                No active compliance actions detected. Ensure server metrics are online.
              </div>
            ) : (
              events.map((ev) => {
                let statusColor = "text-[#8B9BAE] bg-[#111827] border-[#1A2540]";
                if (ev.status === "approved") statusColor = "text-[#00D9B5] bg-[#00D9B5]/10 border-[#00D9B5]/30";
                if (ev.status === "blocked") statusColor = "text-[#EA580C] bg-[#EA580C]/10 border-[#EA580C]/30";
                if (ev.status === "escalated") statusColor = "text-[#D4A843] bg-[#D4A843]/10 border-[#D4A843]/30";

                let clearanceBadge = "text-[#00D9B5] bg-[#00D9B5]/10 border-[#00D9B5]/20";
                if (ev.requiredClearance === "Review") clearanceBadge = "text-[#D4A843] bg-[#D4A843]/10 border-[#D4A843]/20";
                if (ev.requiredClearance === "Hold") clearanceBadge = "text-[#EA580C] bg-[#EA580C]/10 border-[#EA580C]/20";

                return (
                  <div key={ev.id} className="p-4 rounded-[2px] bg-[#050A18]/50 border border-[#1A2540]/60 space-y-3 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#D4A843] font-bold">
                          {ev.id}
                        </span>
                        <span className="text-[9px] font-mono text-[#8B9BAE] uppercase">
                          {new Date(ev.timestamp).toLocaleTimeString()} // {ev.divisionId}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase">
                        <span className={`px-1.5 py-0.5 rounded border ${clearanceBadge}`}>
                          {ev.requiredClearance} Required
                        </span>
                        <span className={`px-1.5 py-0.5 rounded border ${statusColor}`}>
                          {ev.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white font-sans">{ev.description}</h4>
                      <p className="text-[11px] text-[#8B9BAE] font-mono leading-relaxed mt-1">
                        {ev.details}
                      </p>
                      {ev.reviewer && (
                        <div className="text-[9px] font-mono text-[#D4A843] mt-1.5 uppercase">
                          REVIEWER ACTION REGISTERED: {ev.reviewer}
                        </div>
                      )}
                    </div>

                    {/* Operational triggers */}
                    {ev.status === "pending" && (
                      <div className="flex justify-end gap-2 pt-2 border-t border-[#1A2540]/20 font-mono text-[9px]">
                        <button
                          onClick={() => handleAction(ev.id, "escalate")}
                          className="px-2 py-1 border border-[#D4A843]/30 rounded text-[#D4A843] bg-[#D4A843]/5 hover:bg-[#D4A843] hover:text-[#050A18] transition-colors focus:outline-none"
                        >
                          ESCALATE
                        </button>
                        <button
                          onClick={() => handleAction(ev.id, "block")}
                          className="px-2 py-1 border border-[#EA580C]/30 rounded text-[#EA580C] bg-[#EA580C]/5 hover:bg-[#EA580C] hover:text-[#050A18] transition-colors focus:outline-none"
                        >
                          BLOCK NODE
                        </button>
                        <button
                          onClick={() => handleAction(ev.id, "approve")}
                          className="px-2 py-1 border border-[#00D9B5]/30 rounded text-[#00D9B5] bg-[#00D9B5]/5 hover:bg-[#00D9B5] hover:text-[#050A18] transition-colors focus:outline-none flex items-center gap-1"
                        >
                          <Check size={8} />
                          <span>SIGN OFF</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Create Compliance Action Trigger */}
        <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2">
              Inject Gating Telemetry Check
            </h3>
            <p className="text-[11px] text-[#8B9BAE] leading-normal font-sans">
              Inject a mock node event to evaluate how the compliance department handles different clearance tiers (Clear, Review, Hold).
            </p>

            <form onSubmit={handleCreateEvent} className="space-y-3">
              <div className="flex flex-col space-y-1">
                <label htmlFor="comp-div" className="text-[9px] font-mono uppercase text-[#8B9BAE] font-bold">Division Source</label>
                <select
                  id="comp-div"
                  value={customEventDiv}
                  onChange={(e) => setCustomEventDiv(e.target.value)}
                  className="bg-[#111827] border border-[#1A2540] text-xs text-white rounded p-1.5 h-8 pr-4"
                >
                  <option value="D-01">D-01 ZenFlow</option>
                  <option value="D-05">D-05 Terra Axis</option>
                  <option value="D-06">D-06 Vital Helix</option>
                  <option value="D-08">D-08 Quantum Ledger</option>
                  <option value="D-11">D-11 Civic Core</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label htmlFor="comp-tier" className="text-[9px] font-mono uppercase text-[#8B9BAE] font-bold">Required Clearance</label>
                <select
                  id="comp-tier"
                  value={customEventClearance}
                  onChange={(e) => setCustomEventClearance(e.target.value as any)}
                  className="bg-[#111827] border border-[#1A2540] text-xs text-white rounded p-1.5 h-8 pr-4"
                >
                  <option value="Clear">Aegis-Clear (Autopass)</option>
                  <option value="Review">Aegis-Review (Human Review)</option>
                  <option value="Hold">Aegis-Hold (Director Hold)</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label htmlFor="comp-desc" className="text-[9px] font-mono uppercase text-[#8B9BAE] font-bold">Event Summary</label>
                <input
                  id="comp-desc"
                  type="text"
                  placeholder="e.g. Agent exfiltrated patient diagnostics logs"
                  value={customEventDesc}
                  onChange={(e) => setCustomEventDesc(e.target.value)}
                  className="bg-[#111827] border border-[#1A2540] text-xs text-white rounded p-1.5 h-8 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4A843]/10 text-[#D4A843] border border-[#D4A843]/30 h-8 text-xs font-bold rounded hover:bg-[#D4A843] hover:text-[#050A18] transition-all focus:outline-none"
              >
                Trigger Gating Check
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Brand Voice Linter section */}
      <div className="bg-[#0D1326] border border-[#1A2540] border-t-2 border-t-[#00D9B5] rounded p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1A2540]/40 pb-2">
          <Highlighter size={14} className="text-[#00D9B5]" />
          <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide">
            19 Hataalii Voice Standard Copy Auditor
          </h3>
        </div>

        <p className="text-[11px] text-[#8B9BAE] leading-normal font-sans">
          Paste your proposed internal communications or marketing copy here. The automated brand compiler will scan in real-time for banned fillers (e.g. <em>delve</em>, <em>leverage</em>, <em>robust</em>) and prohibited sentence starters.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <textarea
              id="copy-editor"
              rows={4}
              placeholder="Paste or write copy to check brand voice guidelines..."
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className="w-full bg-[#050A18]/50 border border-[#1A2540] rounded p-3 text-xs text-white placeholder-[#8B9BAE]/50 focus:outline-none focus:border-[#D4A843]"
            />
          </div>

          <div className="p-4 bg-[#111827] border border-[#1A2540] rounded space-y-3 font-mono text-[9px] text-[#8B9BAE]">
            <span className="text-[10px] font-sans font-bold text-white uppercase tracking-wider block border-b border-[#1A2540]/55 pb-1">
              Compliance Readout
            </span>

            <div className="space-y-1">
              <span className="block font-bold">BANNED BUZZWORDS DETECTED:</span>
              {detectedBannedWords.length === 0 ? (
                <span className="text-[#00D9B5] block">✓ ZERO BANNED WORDS FOUND</span>
              ) : (
                <div className="flex flex-wrap gap-1 mt-1">
                  {detectedBannedWords.map((word) => (
                    <span key={word} className="px-1.5 py-0.5 rounded bg-[#EA580C]/20 text-[#EA580C] border border-[#EA580C]/40">
                      {word}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1 pt-1.5">
              <span className="block font-bold">BANNED OPENERS DETECTED:</span>
              {detectedOpeners.length === 0 ? (
                <span className="text-[#00D9B5] block">✓ ZERO PROHIBITED PHRASES FOUND</span>
              ) : (
                <div className="flex flex-col gap-0.5 mt-0.5 text-[#EA580C]">
                  {detectedOpeners.map((opener) => (
                    <span key={opener} className="italic">
                      " {opener} "
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#1A2540]/45 pt-2 flex items-center justify-between text-[8px]">
              <span>VOICE INDEX CHECKER</span>
              <span className={detectedBannedWords.length > 0 || detectedOpeners.length > 0 ? "text-[#EA580C]" : "text-[#00D9B5]"}>
                {detectedBannedWords.length > 0 || detectedOpeners.length > 0 ? "AUDIT BREACH" : "COMPLIANT PASS"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
