import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DIVISIONS, LEADERS, COMPANY_METADATA } from "../data/bibleData";

interface BibleLandingPageProps {
  onEnterApp: () => void;
}

export default function BibleLandingPage({ onEnterApp }: BibleLandingPageProps) {
  const [typedQuery, setTypedQuery] = useState("");
  const [activeWalkthroughTab, setActiveWalkthroughTab] = useState<"nav" | "agents" | "governance" | "sandbox">("nav");

  // Inline simulation search results from real company data
  const searchResults = (() => {
    if (!typedQuery.trim()) return [];
    
    const query = typedQuery.toLowerCase();
    const matches: { title: string; category: string; description: string }[] = [];

    // Search leaders
    LEADERS.forEach(l => {
      if (l.name.toLowerCase().includes(query) || l.title.toLowerCase().includes(query) || l.notes.toLowerCase().includes(query)) {
        matches.push({
          title: l.name,
          category: `Leadership Core // ${l.title}`,
          description: l.notes
        });
      }
    });

    // Search divisions
    DIVISIONS.forEach(d => {
      if (d.name.toLowerCase().includes(query) || d.id.toLowerCase().includes(query) || d.subtitle.toLowerCase().includes(query)) {
        matches.push({
          title: `${d.id} — ${d.name}`,
          category: `AI Division Profile`,
          description: d.subtitle
        });
      }
    });

    return matches.slice(0, 3);
  })();

  const guideTabs = [
    {
      id: "nav",
      label: "1. Navigation Core",
      title: "Exploration Rail and Layouts",
      desc: "Use the Command Rail on the left margin to transition between the Corporate Command dashboard, facility maps, security protocols, and operational workflows.",
      features: [
        "12 high-fidelity analytical tabs mapped sequentially",
        "Command-Center global search and quick action rail",
        "Responsive sidebars and persistent state synchronization"
      ],
      iconSymbol: "▰",
      accentColor: "#00D9B5"
    },
    {
      id: "agents",
      label: "2. The AI Ecosystem",
      title: "600-Agent ZenFlow Lattice",
      desc: "Deconstruct the active agents, n8n webhook routes, and Model Context Protocols (MCP) that drive the company's autonomous R&D pipelines.",
      features: [
        "Interactive Ecosystem Mixer sandbox simulator",
        "Division-by-division tech stack audit logs",
        "Live taxonomy search for all active AI personas"
      ],
      iconSymbol: "⚙",
      accentColor: "#7C3AED"
    },
    {
      id: "governance",
      label: "3. Aegis Protocol",
      title: "Compliance & Anomaly Tracking",
      desc: "Monitor critical governance metrics, audit simulated legal records, and adjust the global Strictness Threshold parameters to watch neural deviation triggers.",
      features: [
        "Interactive 2.5 SD Anomaly threshold chart triggers",
        "Review state compliance and security level escalations",
        "Aegis threat event sandbox queue validation flow"
      ],
      iconSymbol: "🛡",
      accentColor: "#EF4444"
    },
    {
      id: "sandbox",
      label: "4. Sandbox Utilities",
      title: "Pricing & Infrastructure Calculators",
      desc: "Access the custom billing calculator and simulation nodes to compute licensing models or forecast operational growth trends dynamically.",
      features: [
        "Interactive custom service quote generators",
        "Physical campus facility building map blueprints",
        "Comprehensive brand identity and visual styling guide"
      ],
      iconSymbol: "$",
      accentColor: "#D4A843"
    }
  ];

  const activeTabDetails = guideTabs.find(t => t.id === activeWalkthroughTab) || guideTabs[0];

  return (
    <div id="bible-landing-page" className="min-h-screen w-full bg-[#050A18] text-[#8B9BAE] font-sans flex flex-col justify-between overflow-x-hidden relative select-none">
      
      {/* Background visual graphics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111C3A] via-[#050A18] to-[#01040A] opacity-85 pointer-events-none z-0" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D9B5]/40 to-transparent pointer-events-none" />
      
      {/* HUD Layout Header (Absolute 0% SVG / Lucide icons replaced with text glyphs) */}
      <header className="border-b border-[#1A2540]/60 bg-[#070D20]/85 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row justify-between items-center z-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#0D1326] border border-[#1A2540] flex items-center justify-center relative shadow-[0_0_12px_rgba(0,217,181,0.25)] font-mono text-[#00D9B5] text-base font-bold">
            ▤
            <div className="absolute -top-1 -right-1 text-[7.5px] text-yellow-400">✦</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-[0.25em] text-white uppercase font-sans">
                {COMPANY_METADATA.name}
              </h2>
              <span className="text-[9px] font-mono bg-[#1A2540] text-[#00D9B5] px-1.5 py-0.5 rounded uppercase">
                {COMPANY_METADATA.version}
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#8B9BAE] tracking-wider uppercase mt-0.5">
              Interactive Corporate Briefing Dossier & Intelligence Ledger
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-block text-[9px] font-mono tracking-widest text-[#EF4444]/80 uppercase bg-[#EF4444]/10 border border-[#EF4444]/25 px-2 py-1 rounded">
            {COMPANY_METADATA.confidentiality}
          </span>
          <div className="text-[10px] font-mono text-[#8B9BAE] flex items-center gap-1.5 bg-[#0D1326] border border-[#1A2540] px-2.5 py-1.5 rounded">
            <span className="text-[#00D9B5] font-bold text-xs">⏱</span>
            <span>EST: COLUMBUS, OH</span>
          </div>
        </div>
      </header>

      {/* Main interactive content workspace */}
      <main className="flex-1 flex flex-col xl:flex-row items-stretch justify-center max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6 z-10">
        
        {/* Left column: Quick briefing dossier and interactive registry sandbox */}
        <div className="flex-1 flex flex-col gap-6 justify-between lg:max-w-2xl">
          
          {/* Dashboard Briefing Module */}
          <div className="bg-[#070D20] border border-[#1A2540] rounded-lg p-5 sm:p-6 relative overflow-hidden flex-1 shadow-2xl flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D9B5]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-2 mb-3 font-mono">
                <span className="text-yellow-400 text-xs">✦</span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-yellow-400 font-bold">EXECUTIVE PREFACE</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug mb-3">
                Welcome to the Operational Matrix of {COMPANY_METADATA.name}
              </h3>
              <p className="text-xs text-[#A2B4CB] leading-relaxed mb-4 font-sans">
                This interactive application serves as the single source of truth—the **Company Bible**—for managers, investors, and AI cluster supervisors. Built upon our patented 3-core architecture, this app merges dynamic corporate planning, architectural sandboxes, and safety monitoring interfaces.
              </p>
              
              {/* Architecture metrics grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-4">
                <div className="bg-[#0D1326] border border-[#1A2540]/60 rounded p-3 text-center">
                  <div className="text-lg font-bold text-white font-mono tracking-tight">20</div>
                  <div className="text-[9px] font-mono text-[#8B9BAE] uppercase tracking-wider mt-1">Departments</div>
                </div>
                <div className="bg-[#0D1326] border border-[#1A2540]/60 rounded p-3 text-center">
                  <div className="text-lg font-bold text-[#00D9B5] font-mono tracking-tight">600+</div>
                  <div className="text-[9px] font-mono text-[#8B9BAE] uppercase tracking-wider mt-1">ZenFlow Agents</div>
                </div>
                <div className="bg-[#0D1326] border border-[#1A2540]/60 rounded p-3 text-center col-span-2 md:col-span-1">
                  <div className="text-lg font-bold text-[#D4A843] font-mono tracking-tight">20 Nodes</div>
                  <div className="text-[9px] font-mono text-[#8B9BAE] uppercase tracking-wider mt-1">Synergy Links</div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#1A2540]/50 pt-4 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#EA580C] text-xs font-bold">⚠</span>
                <span className="text-[9px] font-mono text-[#EA580C] uppercase tracking-widest font-bold">Staging Parameter Restrictions</span>
              </div>
              <p className="text-[10px] text-[#8B9BAE] leading-relaxed font-sans">
                Division <span className="text-white font-semibold">D-05 (Helios Grid)</span> remains under strict SEC hold lock guidelines. Direct live deployment simulations are restricted without certified legal keys from Chief Legal Officer Dr. Joseph Johnson.
              </p>
            </div>
          </div>

          {/* Interactive Search Registry Sandbox */}
          <div className="bg-[#070D20] border border-[#1A2540] rounded-lg p-5 sm:p-6 shadow-2xl relative flex flex-col gap-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#00D9B5] text-xs font-bold">🔍</span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#00D9B5] font-bold">LATTICE DIRECTORY SANDBOX</span>
                </div>
                <span className="text-[8px] font-mono text-gray-500 uppercase">Live Hook Connected</span>
              </div>
              <p className="text-[11px] text-[#A2B4CB]">
                Test-drive the company search index before fully entering. Try querying <span className="text-[#00D9B5] cursor-pointer hover:underline" onClick={() => setTypedQuery("ZenFlow")}>"ZenFlow"</span>, <span className="text-[#00D9B5] cursor-pointer hover:underline" onClick={() => setTypedQuery("CEO")}>"CEO"</span>, or <span className="text-[#00D9B5] cursor-pointer hover:underline" onClick={() => setTypedQuery("D-01")}>"D-01"</span>.
              </p>
            </div>

            {/* Input wrap */}
            <div className="relative">
              <input
                id="landing-sandbox-search"
                type="text"
                value={typedQuery}
                onChange={(e) => setTypedQuery(e.target.value)}
                placeholder="Search staff, divisions, rules..."
                className="w-full bg-[#0D1326] border border-[#1A2540] rounded px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00D9B5] transition-all"
              />
              {typedQuery && (
                <button 
                  onClick={() => setTypedQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#8B9BAE] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results output */}
            <div className="min-h-[105px] bg-[#03060E] border border-[#1A2540]/40 rounded p-3 flex flex-col justify-center">
              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map((result, idx) => (
                    <div key={idx} className="text-left text-xs border-b border-[#1A2540]/30 pb-2 last:border-0 last:pb-0">
                      <span className="text-[8px] font-mono text-[#D4A843] uppercase tracking-wider block">
                        {result.category}
                      </span>
                      <span className="font-semibold text-white mt-0.5 block">{result.title}</span>
                      <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{result.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-[10px] text-gray-600 italic py-4">
                  {typedQuery.trim() ? "No matching records found in company database." : "Type above to query the live corporate bible..."}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right column: Interactive guide chapters & entry path */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Guide walkthrough component */}
          <div className="bg-[#070D20] border border-[#1A2540] rounded-lg p-5 sm:p-6 shadow-2xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-[#1A2540]/50 pb-3">
                <span className="text-[11px] font-mono text-white uppercase tracking-wider font-bold">
                  INTERACTIVE BIBLE WALKTHROUGH
                </span>
                <span className="text-[10px] font-mono text-[#00D9B5]">4 Core Milestones</span>
              </div>

              {/* Tabs buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {guideTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveWalkthroughTab(tab.id as any)}
                    className={`px-2 py-2 text-[10px] font-mono rounded border text-center transition-all ${
                      activeWalkthroughTab === tab.id 
                        ? "bg-[#0D1326] text-white border-[#00D9B5] shadow-md" 
                        : "bg-[#050A18]/40 text-[#8B9BAE] border-[#1A2540] hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Active description card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWalkthroughTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#0D1326] border border-[#1A2540]/60 rounded-lg p-4 relative"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-10 h-10 rounded border flex items-center justify-center shrink-0 font-mono text-base font-bold"
                      style={{ 
                        borderColor: `${activeTabDetails.accentColor}30`,
                        backgroundColor: `${activeTabDetails.accentColor}10`,
                        color: activeTabDetails.accentColor
                      }}
                    >
                      {activeTabDetails.iconSymbol}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {activeTabDetails.title}
                      </h4>
                      <p className="text-xs text-[#8B9BAE] leading-relaxed mt-1.5">
                        {activeTabDetails.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-[#1A2540]/40 pt-3">
                    <span className="text-[8px] font-mono text-[#00D9B5] uppercase tracking-[0.2em] font-bold block mb-2">
                      Interactive Actions Included:
                    </span>
                    <ul className="space-y-1.5">
                      {activeTabDetails.features.map((feat, fidx) => (
                        <li key={fidx} className="text-[10px] text-gray-300 flex items-center gap-2 font-mono">
                          <span className="text-[#00D9B5] text-[8px]">■</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Ingress Gateway CTA block */}
            <div className="mt-6 border-t border-[#1A2540]/50 pt-6 flex flex-col space-y-4">
              <div className="flex items-center justify-between text-[11px] font-mono bg-[#050A18] border border-[#1A2540]/60 p-3 rounded">
                <span className="text-gray-400">ACCESS LEVEL STATUS:</span>
                <span className="text-[#00D9B5] font-bold flex items-center gap-1.5 lowercase">
                  <span className="text-xs text-[#00D9B5]">✓</span>
                  ADMIN CLEARANCE SPEC V1
                </span>
              </div>

              {/* Magnificent glowing Call-To-Action Button with absolutely NO SVG */}
              <button
                id="enter-company-bible-btn"
                onClick={onEnterApp}
                className="w-full bg-[#D4A843] hover:bg-[#E9B949] text-black font-semibold text-xs tracking-[0.2em] uppercase py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_25px_rgba(212,168,67,0.3)] hover:shadow-[0_4px_35px_rgba(212,168,67,0.55)] cursor-pointer translate-y-0 active:translate-y-0.5 group"
              >
                Enter the Interactive Company Bible
                <motion.span 
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="inline-block font-bold text-sm"
                >
                  &#8594;
                </motion.span>
              </button>
              
              <div className="text-center">
                <span className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-[#8B9BAE]/60">
                  © 2026 {COMPANY_METADATA.name} • Internal Operations Portal
                </span>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Brief Footer line */}
      <footer className="border-t border-[#1A2540]/40 bg-[#040815] py-3 px-6 text-center z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[9px] font-mono text-gray-500 gap-2">
          <span>HOST INGRESS: <span className="text-gray-400">0.0.0.0:3000 // DEPLOY_SSL</span></span>
          <span className="uppercase tracking-widest text-[#00D9B5]">Zenflow intelligence lattice active</span>
          <span>STAGING SYSTEM MEMORY: <span className="text-gray-400">100% HEALTHY</span></span>
        </div>
      </footer>

    </div>
  );
}
