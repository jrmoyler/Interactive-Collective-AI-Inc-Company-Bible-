import React, { useState, useEffect } from "react";
import { 
  GitFork, 
  Terminal, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Database, 
  Cpu, 
  Layers, 
  RefreshCw,
  Search,
  Eye,
  Settings,
  X,
  Plus
} from "lucide-react";

// Master MCP Server Matrix Data
const ALL_MCPs = [
  {
    id: "mcp-01",
    name: "ZenFlow Core API MCP",
    status: "active",
    toolsCount: 12,
    latency: "14ms",
    description: "Central nervous system routing model instructions to active specialist clusters. Governs standard telemetry collection and live routing tables.",
    division: "D-01 ZenFlow",
    tools: [
      { name: "read_agent_logs", args: { limit: "number", divisionId: "string" }, description: "Fetches live console strings for active model nodes." },
      { name: "audit_compliance_copy", args: { text: "string" }, description: "Sends copies to automated Brand standard checker." },
      { name: "deploy_agent_slot", args: { slotId: "string", promptHash: "string" }, description: "Commissions persistent specialist state inside secure Docker sandbox." },
      { name: "sync_routing_tables", args: { divisionId: "string" }, description: "Reprograms the inter-agent communications flow diagram." }
    ]
  },
  {
    id: "mcp-02",
    name: "Aegis Guard Ledger MCP",
    status: "active",
    toolsCount: 5,
    latency: "28ms",
    description: "Connects securely with the database endpoints to write and verify block transactions. Anchors compliance events on-chain with cryptographic keys.",
    division: "D-02 Titan Security",
    tools: [
      { name: "record_block_transaction", args: { payload: "object", keySignature: "string" }, description: "Appends immutable entry to decentralized audit chain." },
      { name: "query_ledg_merkle", args: { rootHash: "string" }, description: "Authenticates that state directories have not been tampered with." },
      { name: "escalate_viol_alert", args: { alertId: "string", divisionId: "string" }, description: "Triggers instant Aegis-Hold block warning to emergency Slack channels." }
    ]
  },
  {
    id: "mcp-03",
    name: "Notion Knowledge Hub MCP",
    status: "active",
    toolsCount: 4,
    latency: "45ms",
    description: "Synchronizes unstructured meeting transcripts and research documents directly into standard corporate databases.",
    division: "D-04 Academy Hub",
    tools: [
      { name: "write_meeting_sop", args: { folderUuid: "string", title: "string", mdContent: "string" }, description: "Writes formatted markdown deliverables to SOP folders." },
      { name: "link_academic_curriculum", args: { tierId: "string", SOPId: "string" }, description: "Attaches relative standards guidelines to direct student login modules." }
    ]
  },
  {
    id: "mcp-04",
    name: "GitHub Developer Flow MCP",
    status: "active",
    toolsCount: 8,
    latency: "22ms",
    description: "Automates the synchronization of model system instructions, prompt variations, and code schema revisions.",
    division: "D-03 Code Matrix",
    tools: [
      { name: "pull_agent_instruction", args: { agentId: "string" }, description: "Pulls updated system prompts directly from main branch." },
      { name: "commit_compliance_schema", args: { schemaText: "string", authorSig: "string" }, description: "Pours modified table schemas to database branch with tests auto-triggered." }
    ]
  },
  {
    id: "mcp-05",
    name: "Slack Operator Dispatcher MCP",
    status: "active",
    toolsCount: 6,
    latency: "32ms",
    description: "Bridges digital agent warnings with active human on-call personnel. Governs warning channels and status logs.",
    division: "D-01 ZenFlow",
    tools: [
      { name: "post_severe_alert", args: { targetChannel: "string", payload: "object" }, description: "Instantly posts warning vectors with bi-modal action fields (Approve/Deny)." },
      { name: "ping_division_director", args: { directorId: "string", context: "string" }, description: "Triggers priority high-importance ping to director client." }
    ]
  },
  {
    id: "mcp-06",
    name: "Google Workspace Hub MCP",
    status: "pending",
    toolsCount: 10,
    latency: "---",
    description: "Extracts calendars, shared drive directories, and email backlogs for data-scraping algorithms, subject to airgap compliance restrictions.",
    division: "D-09 Vector Logistics",
    tools: [
      { name: "scrape_drive_directory", args: { parentId: "string" }, description: "Pulls clean text chunks from Google docs/sheets under strict CLO gating." }
    ]
  },
  {
    id: "mcp-07",
    name: "HubSpot Commercial CRM MCP",
    status: "active",
    toolsCount: 4,
    latency: "58ms",
    description: "Organizes corporate lead flows, consulting retainer contracts, and automatically updates deal stages.",
    division: "D-08 Quantum Ledger",
    tools: [
      { name: "update_deal_retainer", args: { dealId: "string", retainerAmt: "number" }, description: "Sets retainer metrics ensuring minimum compliance checks ($2.5M+)." },
      { name: "register_call_summary", args: { dealId: "string", summary: "string" }, description: "Logs automated discovery chat summary to deal timeline." }
    ]
  }
];

// n8n Workflow Blueprint Library Data
const ALL_WORKFLOWS = [
  {
    id: "wf-01",
    name: "Retainer Discovery Triage",
    trigger: "Schedule Cron — Weekly",
    desc: "Checks HubSpot pipeline deals, audits compliance retainers, filters scores >= 7.5, and coordinates cross-division developer briefings.",
    status: "idle",
    nodes: [
      { name: "HubSpot CRM", type: "trigger", icon: "Database" },
      { name: "Retainer Validator", type: "code", icon: "Terminal" },
      { name: "Aegis Audit Gating", type: "compliance", icon: "Activity" },
      { name: "Slack Dispatcher", type: "action", icon: "GitFork" }
    ],
    logs: [
      "CRON TRIPPED: Initiating Retainer Discovery Triage...",
      "FETCH: Pulling active HubSpot deal items...",
      "FILTER: 3 active deal items returned.",
      "VALIDATE: Deal AUD-992 exceeds $2.5M threshold. Passed ✓",
      "COMPLIANCE: Checking legal clearance logs for corporate entities... Passed ✓",
      "DISPATCH: Transmitting structured alert message to #directors channel.",
      "WORKFLOW EXECUTION: Complete. Status: SUCCESS"
    ]
  },
  {
    id: "wf-02",
    name: "Aegis Incident Handshake",
    trigger: "Continuous Event — Webhook",
    desc: "Triggers instantly on Aegis-Hold or Aegis-Review events, freezing relative script deployment lines and warning Slack operations.",
    status: "idle",
    nodes: [
      { name: "Aegis Alert API", type: "trigger", icon: "Activity" },
      { name: "Ledger Guard", type: "code", icon: "Terminal" },
      { name: "Secure Script Gate", type: "compliance", icon: "Layers" },
      { name: "PagerDuty + Slack Dispatch", type: "action", icon: "GitFork" }
    ],
    logs: [
      "WEBHOOK DETECTED: Aegis-Hold security breach reported in D-06 Vital Helix.",
      "LOCKOUT: Transmitting freeze codes to active Docker container sandbox.",
      "RECORD: Committing incident log to Audit Chain index... Block #947264.",
      "NOTIFY: Escalating to Devon Scott emergency call. Paging deployed.",
      "WORKFLOW EXECUTION: Complete. Status: PENDING_MEMBER_SIGN_OFF"
    ]
  },
  {
    id: "wf-03",
    name: "Autonomous Bio-Twin Sync",
    trigger: "Daily — 6:00 AM EST",
    desc: "Pulls raw biomonitoring signals from physical Bluetooth gateway boards, parses heart rate variability anomalies, and updates clinical patient logs.",
    status: "idle",
    nodes: [
      { name: "BLE Sensors Hub", type: "trigger", icon: "Database" },
      { name: "Bio-Logic Filter", type: "code", icon: "Cpu" },
      { name: "Audit Integrity check", type: "compliance", icon: "Activity" },
      { name: "Vital Helix DB Update", type: "action", icon: "Database" }
    ],
    logs: [
      "CLOCK SYNC: Triggering daily 6:00 AM biomonitoring sweep...",
      "FETCH: Scanned 12 BLE telemetry sensors across District C. 100% telemetry online.",
      "PARSER: Translating HRV trends from nRF52840 hardware boards...",
      "INTEGRITY: Authenticating signature checks for bio-twin updates... Verified ✓",
      "WRITE: Appended 12 structured biometric files to secure hospital-grade DB.",
      "WORKFLOW EXECUTION: Complete. Status: SUCCESS"
    ]
  },
  {
    id: "wf-04",
    name: "Trend Surfer Auto-Deploy",
    trigger: "On Trend_Surfer Signal",
    desc: "Reacts to global trending topics, drafts compliant brand voice copy within 4 hours, and requests director approval before deployment.",
    status: "idle",
    nodes: [
      { name: "Scraper API Node", type: "trigger", icon: "Activity" },
      { name: "Hataalii Copy Draft", type: "code", icon: "Cpu" },
      { name: "Brand Voice Linter", type: "compliance", icon: "Terminal" },
      { name: "Approval Desk Web", type: "action", icon: "Layers" }
    ],
    logs: [
      "SIGNAL INSTANT: Scraping global trends for industry shifts...",
      "DETECTION: 'Model pricing transparency' listed as trending factor.",
      "DRAFTING: Initializing Hataalii-voice copy generator using standard limits...",
      "LINT: Scanning draft copy for banned filler words (e.g. legacy/delve)... Clean ✓",
      "UPLOAD: Uploaded copy proposal to interactive Approval Desk dashboard.",
      "WORKFLOW EXECUTION: Complete. Status: SUCCESS"
    ]
  },
  {
    id: "wf-05",
    name: "Autonomous Transit Weather Gate",
    trigger: "On Severe Weather Signal",
    desc: "Listens to storm indicators via NOAA feed, isolates vulnerable drone take-off pads, and re-routes active logistics trucks.",
    status: "idle",
    nodes: [
      { name: "Weather Sensors API", type: "trigger", icon: "Activity" },
      { name: "Vector Logistics Gate", type: "code", icon: "Terminal" },
      { name: "Sentry Radar audit", type: "compliance", icon: "Layers" },
      { name: "Autonomous Fleet re-route", type: "action", icon: "GitFork" }
    ],
    logs: [
      "POLL EVENT: Severe lightning alert registered within 15-mile zone.",
      "EVALUATE: Drone Pad D-2 listed in risk path.",
      "ISOLATION: Locking down Aether Link telemetry mesh sector, closing hangar bay gates.",
      "RE-ROUTE: Dispatched updated vector path coords to active truck #TRK-08.",
      "WORKFLOW EXECUTION: Complete. Status: SUCCESS"
    ]
  }
];

export default function IntegrationsView() {
  const [selectedMcp, setSelectedMcp] = useState<string>("mcp-01");
  const [selectedWf, setSelectedWf] = useState<string>("wf-01");
  const [workflowStatus, setWorkflowStatus] = useState<Record<string, "idle" | "running" | "done">>({});
  const [wfLogs, setWfLogs] = useState<Record<string, string[]>>({});
  const [mcpSearch, setMcpSearch] = useState("");

  const activeMcp = ALL_MCPs.find(m => m.id === selectedMcp) || ALL_MCPs[0];
  const activeWf = ALL_WORKFLOWS.find(w => w.id === selectedWf) || ALL_WORKFLOWS[0];

  const filteredMcps = ALL_MCPs.filter(m => 
    m.name.toLowerCase().includes(mcpSearch.toLowerCase()) ||
    m.division.toLowerCase().includes(mcpSearch.toLowerCase()) ||
    m.description.toLowerCase().includes(mcpSearch.toLowerCase())
  );

  const startWorkflowTest = (wfId: string) => {
    setWorkflowStatus(prev => ({ ...prev, [wfId]: "running" }));
    setWfLogs(prev => ({ ...prev, [wfId]: [] }));

    const targetWf = ALL_WORKFLOWS.find(w => w.id === wfId);
    if (!targetWf) return;

    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < targetWf.logs.length) {
        setWfLogs(prev => {
          const currentLogs = prev[wfId] || [];
          return {
            ...prev,
            [wfId]: [...currentLogs, `[${new Date().toLocaleTimeString()}] ${targetWf.logs[logIdx]}`]
          };
        });
        logIdx++;
      } else {
        clearInterval(interval);
        setWorkflowStatus(prev => ({ ...prev, [wfId]: "done" }));
      }
    }, 450);
  };

  return (
    <div className="space-y-6 select-none text-left">
      {/* Top Ledger Overview */}
      <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6">
        <div className="flex items-center gap-2 mb-2">
          <GitFork className="text-[#00D9B5]" size={16} />
          <h2 className="text-base font-bold text-white font-sans uppercase tracking-tight">
            Lattice Integrations Matrix & n8n Blueprint Explorer — (v2.0)
          </h2>
        </div>
        <p className="text-xs text-[#8B9BAE] font-sans leading-relaxed">
          Operational matrix connecting the Model Context Protocol (MCP) server endpoints with live autonomous n8n workflows. Configured dynamically to secure database access schemas, stream telemetry warnings, and deploy automated business processes.
        </p>
      </div>

      {/* Main Grid: Left MCP (5 columns) Right n8n (7 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: MCP EXPLORER (5 columns) */}
        <div className="lg:col-span-5 bg-[#0D1326] border border-[#1A2540] rounded p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            
            <div className="flex justify-between items-center border-b border-[#1A2540]/60 pb-3">
              <div className="flex items-center gap-2">
                <Database className="text-[#D4A843]" size={15} />
                <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wider">
                  MCP Server Registries
                </h3>
              </div>
              <span className="font-mono text-[9px] bg-[#00D9B5]/10 border border-[#00D9B5]/20 text-[#00D9B5] px-1.5 py-0.5 rounded uppercase font-bold">
                6/7 ACTIVE
              </span>
            </div>

            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 text-[#8B9BAE]/60" size={13} />
              <input
                id="mcp-search-input"
                type="text"
                placeholder="Filter registries by name, division..."
                value={mcpSearch}
                onChange={(e) => setMcpSearch(e.target.value)}
                className="w-full bg-[#111827] border border-[#1A2540] rounded pl-8 pr-3 py-2 text-[10.5px] text-white placeholder-[#8B9BAE]/40 focus:outline-none focus:border-[#D4A843] h-8"
              />
            </div>

            {/* MCP SERVER LIST */}
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#1A2540]">
              {filteredMcps.map((mcp) => {
                const isActive = mcp.id === selectedMcp;
                const isPending = mcp.status === "pending";
                
                return (
                  <button
                    key={mcp.id}
                    type="button"
                    onClick={() => setSelectedMcp(mcp.id)}
                    className={`w-full p-3 rounded text-left border transition-all flex justify-between items-start outline-none focus:outline-none ${
                      isActive 
                        ? "bg-[#D4A843]/10 border-[#D4A843]/60" 
                        : "bg-[#050A18]/50 border-[#1A2540]/60 hover:bg-[#111827]/70"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white font-sans uppercase">{mcp.name}</span>
                        {isPending && <span className="text-[7.5px] font-mono px-1 py-0.1 border border-dashed border-[#EA580C]/40 text-[#EA580C] uppercase leading-none rounded">Pending</span>}
                      </div>
                      <p className="text-[10px] text-[#8B9BAE] truncate max-w-xs">{mcp.description}</p>
                      <span className="text-[8px] font-mono text-[#D4A843] uppercase block">{mcp.division}</span>
                    </div>

                    <div className="text-right space-y-1 font-mono text-[9px] shrink-0">
                      <span className="text-white block font-bold">{mcp.toolsCount} TOOLS</span>
                      <span className={`text-[8px] uppercase block font-bold ${isPending ? "text-[#8B9BAE]" : "text-[#00D9B5]"}`}>{mcp.latency}</span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* LOWER CODE BLOCK PREVIEWER */}
          <div className="p-4 bg-[#111827] border border-[#1A2540] rounded space-y-3 font-mono text-[9px]">
            <div className="flex justify-between items-center border-b border-[#1C2C54]/60 pb-1.5">
              <span className="text-white font-bold font-sans uppercase text-[10px] tracking-wide">
                Tool Declarations Matrix
              </span>
              <span className="text-[#8B9BAE]/60 text-[8px]">JSON</span>
            </div>

            <div className="max-h-52 overflow-y-auto text-[#00D9B5] whitespace-pre p-2 bg-[#050A18]/70 border border-[#1a2540]/60 rounded scrollbar-thin scrollbar-thumb-[#1C2C54]">
              {JSON.stringify(activeMcp.tools, null, 2)}
            </div>
            
            <div className="text-[8px] text-[#8B9BAE] flex items-center gap-1 leading-normal font-sans pt-1">
              <Activity size={10} className="text-[#D4A843]" />
              <span>Register edits directly via Code Matrix to deploy matching schema models.</span>
            </div>
          </div>

        </div>

        {/* RIGHT: n8n BLUEPRINTS & SIMULATOR (7 columns) */}
        <div className="lg:col-span-7 bg-[#0D1326] border border-[#1A2540] rounded p-5 flex flex-col justify-between space-y-5">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-[#1A2540]/60 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="text-[#00D9B5]" size={15} />
                <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wider">
                  n8n Workflow Blueprints (Central Hub)
                </h3>
              </div>
              <span className="font-mono text-[9px] text-[#8B9BAE]">5 SCHEMES INSTALLED</span>
            </div>

            {/* n8n Select Tab panel */}
            <div className="flex flex-wrap gap-1.5">
              {ALL_WORKFLOWS.map((wf) => {
                const isActive = wf.id === selectedWf;
                return (
                  <button
                    key={wf.id}
                    type="button"
                    onClick={() => setSelectedWf(wf.id)}
                    className={`px-3 py-1.5 rounded border text-[10px] font-mono font-bold uppercase transition outline-none focus:outline-none ${
                      isActive
                        ? "bg-[#00D9B5] text-[#050A18] border-[#00D9B5]"
                        : "bg-[#111827] text-[#8B9BAE] border-[#1A2540] hover:border-[#8B9BAE]/40"
                    }`}
                  >
                    {wf.name}
                  </button>
                );
              })}
            </div>

            {/* Active Workflow details block */}
            <div className="p-4 bg-[#050A18]/80 border border-[#1A2540] rounded-sm space-y-3.5">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white uppercase font-sans">{activeWf.name}</h4>
                  <span className="text-[9px] font-mono text-[#D4A843] bg-[#D4A843]/10 border border-[#D4A843]/20 px-2 py-0.5 rounded inline-block uppercase font-bold uppercase">
                    Trigger: {activeWf.trigger}
                  </span>
                </div>
                
                <button
                  type="button"
                  disabled={workflowStatus[activeWf.id] === "running"}
                  onClick={() => startWorkflowTest(activeWf.id)}
                  className="bg-[#00D9B5]/10 text-[#00D9B5] border border-[#00D9B5]/30 hover:bg-[#00D9B5] hover:text-[#050A18] font-mono text-[10px] font-bold px-3 py-1.5 rounded transition flex items-center gap-1.5 select-none focus:outline-none disabled:opacity-40"
                >
                  <Play size={11} className={workflowStatus[activeWf.id] === "running" ? "animate-ping" : ""} />
                  <span>{workflowStatus[activeWf.id] === "running" ? "EXECUTING..." : "RUN BLUEPRINT"}</span>
                </button>
              </div>

              <p className="text-[10.5px] text-[#8B9BAE] leading-normal font-sans">
                {activeWf.desc}
              </p>

              {/* FLOW SCHEMATIC DIAGRAM DRAW (Pure CSS node paths, zero SVG layout) */}
              <div className="py-2.5 rounded bg-[#111827]/40 border border-[#1A2540]/40 flex flex-col md:flex-row items-center justify-center gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#1A2540_1px,transparent_1px)] [background-size:12px_12px] opacity-30" />
                
                {activeWf.nodes.map((node, i) => (
                  <React.Fragment key={node.name}>
                    {/* Node Element */}
                    <div className="flex flex-col items-center p-2.5 rounded bg-[#0D1326] border border-[#1A2540] hover:border-[#00D9B5] transition-colors relative z-10 w-32 font-mono text-[9px] text-center space-y-1">
                      <span className="text-[8px] text-[#D4A843] uppercase block font-bold">{node.type}</span>
                      <span className="text-white font-bold block">{node.name}</span>
                    </div>

                    {/* Connection Line */}
                    {i < activeWf.nodes.length - 1 && (
                      <div className="flex flex-col md:flex-row items-center gap-1 shrink-0 z-10">
                        <div className="w-0.5 h-3 md:w-5 md:h-0.5 bg-gradient-to-r from-[#1A2540] to-[#00D9B5] relative" />
                        <span className="text-[6.5px] font-mono text-[#00D9B5] uppercase hidden md:inline">➔</span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>

          {/* CONSOLE LOGGER STRINGS */}
          <div className="bg-[#111827] border border-[#1A2540] rounded p-4 flex flex-col space-y-2.5 justify-between">
            <div className="flex justify-between items-center border-b border-[#1A2540]/80 pb-1.5">
              <span className="text-white font-bold font-sans text-[10px] tracking-wide uppercase flex items-center gap-1.5">
                <Terminal size={12} className="text-[#00D9B5]" />
                <span>Simulation Sandbox Live Stream Out</span>
              </span>
              <span className="text-mono text-[7px] text-[#00D9B5]">STANDBY</span>
            </div>

            <div className="bg-[#050A18]/90 max-h-48 overflow-y-auto p-3 text-left font-mono text-[9px] min-h-[140px] space-y-1.5 border border-[#1a2540]/60 rounded scrollbar-thin scrollbar-thumb-[#1C2C54]">
              {(!wfLogs[activeWf.id] || wfLogs[activeWf.id].length === 0) ? (
                <div className="text-[#8B9BAE]/50 text-center py-10 italic">
                  [SYSTEM] Click 'RUN BLUEPRINT' above to stream execution codes through the simulated n8n workspace nodes.
                </div>
              ) : (
                wfLogs[activeWf.id].map((logLine, idx) => {
                  let alertColor = "text-[#00D9B5]";
                  if (logLine.includes("Aegis-Hold") || logLine.includes("PagerDuty")) alertColor = "text-[#EA580C]";
                  if (logLine.includes("AUD-992") || logLine.includes("Verified")) alertColor = "text-[#D4A843]";

                  return (
                    <div key={idx} className={`${alertColor} border-l border-[#1A2540] pl-2 leading-relaxed`}>
                      {logLine}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer quick action buttons */}
            <div className="flex justify-between items-center text-[8px] text-[#8B9BAE] pt-1">
              <span className="uppercase">n8n Execution Sandbox Engine — v3.0</span>
              {wfLogs[activeWf.id] && wfLogs[activeWf.id].length > 0 && (
                <button
                  type="button"
                  onClick={() => setWfLogs(prev => ({ ...prev, [activeWf.id]: [] }))}
                  className="px-2 py-0.5 border border-[#1A2540] rounded hover:border-[#EA580C] text-[8px] font-mono leading-none transition-colors hover:text-white uppercase outline-none focus:outline-none"
                >
                  Clear stream
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
