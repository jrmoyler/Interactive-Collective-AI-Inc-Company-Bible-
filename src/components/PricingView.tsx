import React, { useState } from "react";
import { 
  DollarSign, 
  Percent, 
  ShieldCheck, 
  Users, 
  BookOpen, 
  ArrowRight,
  TrendingUp,
  FileText,
  Copy,
  Check,
  Megaphone,
  Youtube,
  Send,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Info
} from "lucide-react";

export default function PricingView() {
  // Calculator States
  const [activeSlots, setActiveSlots] = useState(4);
  const [contractTerm, setContractTerm] = useState<"monthly" | "1yr" | "3yr">("1yr");
  const [sovereignData, setSovereignData] = useState(false);
  const [multiCluster, setMultiCluster] = useState(false);
  const [dedicatedCompute, setDedicatedCompute] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Campaign States
  const [activeTab, setActiveTab] = useState<"BLOG" | "LINKS" | "VIDEO" | "FAQ">("BLOG");
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [customTopic, setCustomTopic] = useState("Explain God Prompts to non-technical executives");
  const [generatedDraft, setGeneratedDraft] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Pricing Parameters
  const BASE_PLATFORM_RATE = 10000; // $10,000/mo
  const SLOT_RATE = 8000; // $8,000/mo per active slot
  
  // Calculate raw cost
  const rawMonthlyCost = BASE_PLATFORM_RATE + (activeSlots * SLOT_RATE);

  // Multipliers
  let multiplierAccumulator = 1.0;
  if (sovereignData) multiplierAccumulator += 0.50; // +50%
  if (multiCluster) multiplierAccumulator += 0.30;  // +30%
  if (dedicatedCompute) multiplierAccumulator += 0.25; // +25%

  const costAfterMultipliers = rawMonthlyCost * multiplierAccumulator;

  // Discounts
  let discountPct = 0;
  if (contractTerm === "1yr") discountPct = 0.10; // 10%
  if (contractTerm === "3yr") discountPct = 0.25; // 25%

  const finalMonthlyCost = costAfterMultipliers * (1 - discountPct);
  const annualizedValue = finalMonthlyCost * 12;
  const cumulativeContractValue = contractTerm === "monthly" ? finalMonthlyCost : contractTerm === "1yr" ? annualizedValue : annualizedValue * 3;

  const handleCopyEstimate = () => {
    const textDesc = `COLLECTIVE AI INC — UNIVERSAL PRICING FRAMEWORK EST.
--------------------------------------------------
Configuration:
- Specialist Agent Slots: ${activeSlots} Active
- Term Commitment: ${contractTerm.toUpperCase()}
- Sovereign Data Compliance: ${sovereignData ? "ENABLED (+0.5x)" : "DISABLED"}
- Multi-Cluster Hub Sync: ${multiCluster ? "ENABLED (+0.3x)" : "DISABLED"}
- Dedicated Compute: ${dedicatedCompute ? "ENABLED (+0.25x)" : "DISABLED"}

Calculated Financials:
- Base Platform Rate: $${BASE_PLATFORM_RATE.toLocaleString()}/mo
- Specialist Slots: ${activeSlots} × $${SLOT_RATE.toLocaleString()}/mo ($$${(activeSlots * SLOT_RATE).toLocaleString()}/mo)
- Combined Base Cost: $${rawMonthlyCost.toLocaleString()}/mo
- Multipliers: ${multiplierAccumulator.toFixed(2)}x
- Term Discount: ${discountPct * 100}%
- FINAL MONTHLY FEE: $${Math.round(finalMonthlyCost).toLocaleString()}/mo
- ANNUAL RUN-RATE: $${Math.round(annualizedValue).toLocaleString()}/yr
- CUMULATIVE CONTRACT VALUE (LTC): $${Math.round(cumulativeContractValue).toLocaleString()}

* All estimates are subject to CLO review and executive sponsor alignment under non-negotiable compliance rules.`;
    
    navigator.clipboard.writeText(textDesc);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleGenerateCopy = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedDraft(`**FROM THE DESK OF THE ORACLE — TARGETED CO-FOUNDER MEMO**
**TOPIC:** ${customTopic}

We are architecting digital-organic interfaces not to replace human strategic will, but to act as a conductive shield. In an environment where 95% of generative text applications deploy in high-latency silos, we establish real-time multi-agent lattices anchored to standard operational bible limits.

Every specialist slot (cost-calibrated at $8,000/month slots) operates under precise God Prompt architectures routing directly through Aegis Protocol compliance verification layers. When we introduce a new client node, we calibrate trust bounds dynamically—meaning the agent knows exactly when to express standard uncertainty to human partners before triggering unrequested state actions.

Our fiduciary commitment, guided by Stanley Constant's absolute veto, guarantees that no external capital overrides this biophilia-centric expansion. The physical build is already underway in Columbus. This is the only architecture engineered to win.`);
      setIsGenerating(false);
    }, 1500);
  };

  const campaignsBlogText = `## 95% of AI Projects Are Failing — Here's the Architecture Built to Win
### By JR Moyler (Founder, Collective AI Inc)

Every technical development team is larping in the sandbox. We are seeing billions of capital incinerated on single-agent frameworks, speculative chatbots, and disconnected dashboards that break the moment context shifts +0.5 standard deviations. 

The industry is repeating the mistakes of early grid computing. They build a chatbot, point it at a database, list a dozen tools, and call it an "enterprise strategy." It is not a strategy. It is single-session ephemeral noise.

At Collective AI Inc, we built **ZenFlow** is the central nervous system that runs a stable, persistent, 600-agent execution lattice behind a unified, zero-trust perimeter membrane. We don't deploy floating scripts. We compile autonomous specialists directly onto a shared infrastructure grid, locked to structural operating rules that even the founders cannot bypass.

#### Why Lattices Beat Chatbots:
1. **Architectural Coherence**: Chatbots operate in conversational isolation. Our Tier 2 Specialists (managed by Tier 1 Division Directors) coordinate multi-step task decompositions synchronously across 20 distinct corporate departments.
2. **Calibrated Trust Gates**: Rather than letting autonomous scripts execute unchecked, every boundary request is audited by the **Aegis Protocol**. Clearances are checked, toxic modifiers are purged, and high-risk actions are held for human sign-off.
3. **Physical-Digital Conductors**: We don't stop at browser tabs. Our smart physical hardware (from Obsidian Sentinel perceiving masts to Eon Longevity test stations) coordinates with live agent streams. If a physical camera flags a perimeter anomaly, digital security gates contain the relative network assets instantly.
4. **Fiduciary Restraint**: We operate with capital discipline. Collective AI's Civic Core accepts zero speculative external investment, funding its programmatic community digital-equity initiatives exclusively through commercial portfolio dividends.

The era of generative playground experimentation is over. Build persistent infrastructure, or prepare to fail.`;

  const campaignVideoSpecs = {
    title: "The Silent Failure of AI (5-Min Master Video Doc)",
    introScene: "Visual: Brutalist, partially submerged Concrete Neural Block data center against a dark, rain-soaked landscape. Soft gold lighting leaks from high slits. Jetson boards humming.",
    narration: "Narrator (Devon Scott voice style): 'We have built a digital playground. We have treated the most potent cognitive force of our century as a novelty chatbot generator. And 95% of the market is paying the price...'",
    cta: "Direct path CTA to schematics walkthrough, pricing framework transparent sliders, and the Columbus innovations hub."
  };

  const campaignsLinkedIn = [
    {
      day: "Day 1: The Incinerator Post",
      text: "LinkedIn is full of developers boasting about 5-line chatbot demos. They aren't telling you that they break on high-latency edges. 95% of enterprise AI projects are failing because they are built as disconnected toys. Real value comes from shared persistent lattices. #CollectiveAI #EnterpriseAI #EngineeringDiscipline"
    },
    {
      day: "Day 3: The Pricing Audit",
      text: "Why do we charge $8,000/month per active agent slot? Because we don't bill by speculative tokens or hidden API markups. Each slot represents a dedicated, state-persisted specialist running on secure bare-metal compute. Predictable, secure, and locked to the Aegis Protocol gates."
    },
    {
      day: "Day 5: The Fiduciary Restraint",
      text: "Can you build a sustainable non-profit programmatic system inside an active tech corporation? Yes, but only with structural boundaries. Collective AI's Civic Core accepts zero external investment—vetoed permanently by Stanley Constant. All community digital equity is funded by commercial revenue. That is ethical structuralism."
    }
  ];

  return (
    <div className="space-y-6 select-none text-left">
      <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="text-[#00D9B5]" size={16} />
          <h2 className="text-base font-bold text-white font-sans uppercase tracking-tight">
            Universal Client Pricing & Campaign Hub (Dossier v2.2)
          </h2>
        </div>
        <p className="text-xs text-[#8B9BAE] font-sans leading-relaxed">
          The unified pricing ledger, commercial contract calculators, and premium consulting structures for Collective AI Inc, paired with master marketing campaign content, FAQs, and Hataalii-voice document builders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Master Pricing Calculators (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* CALCULATOR */}
          <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-[#1A2540] pb-3">
              <div className="flex items-center gap-2">
                <Percent className="text-[#D4A843]" size={15} />
                <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wider">
                  Specialist Subscription Pricing (SSP) Model
                </h3>
              </div>
              <span className="font-mono text-[9px] text-[#00D9B5]">LATTICE CALIBRATION ACTIVE</span>
            </div>

            {/* Slider 1: Active Specialist Slots */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs text-[#8B9BAE]">
                <span className="uppercase font-bold">Active Specialist Slots</span>
                <span className="text-white font-bold">{activeSlots} Slots</span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={20} 
                value={activeSlots}
                onChange={(e) => setActiveSlots(parseInt(e.target.value))}
                className="w-full accent-[#D4A843] bg-[#111827] h-1 rounded-sm appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[8px] font-mono text-[#8B9BAE]/60 uppercase">
                <span>1 Slot (Starter)</span>
                <span>10 Slots (Standard Core)</span>
                <span>20 Slots (Full Division)</span>
              </div>
            </div>

            {/* Selector 2: Contract Term options */}
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase text-[#8B9BAE] font-bold block">Contract Term Commitment</span>
              <div className="grid grid-cols-3 gap-2 p-0.5 rounded bg-[#111827] border border-[#1A2540]">
                <button
                  type="button"
                  onClick={() => setContractTerm("monthly")}
                  className={`py-1.5 text-[10px] font-mono leading-none rounded-sm transition-all font-bold ${
                    contractTerm === "monthly"
                      ? "bg-[#D4A843] text-[#050A18]"
                      : "text-[#8B9BAE] hover:text-white"
                  }`}
                >
                  MONTH-TO-MONTH (0%)
                </button>
                <button
                  type="button"
                  onClick={() => setContractTerm("1yr")}
                  className={`py-1.5 text-[10px] font-mono leading-none rounded-sm transition-all font-bold ${
                    contractTerm === "1yr"
                      ? "bg-[#D4A843] text-[#050A18]"
                      : "text-[#8B9BAE] hover:text-white"
                  }`}
                >
                  1-YEAR COMMIT (10%)
                </button>
                <button
                  type="button"
                  onClick={() => setContractTerm("3yr")}
                  className={`py-1.5 text-[10px] font-mono leading-none rounded-sm transition-all font-bold ${
                    contractTerm === "3yr"
                      ? "bg-[#D4A843] text-[#050A18]"
                      : "text-[#8B9BAE] hover:text-white"
                  }`}
                >
                  3-YEAR SOVEREIGN (25%)
                </button>
              </div>
            </div>

            {/* Checkboxes 3: Multipliers */}
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase text-[#8B9BAE] font-bold block">Regulatory & Hardware Multipliers</span>
              <div className="space-y-2">
                
                <label className="flex items-start gap-2 p-2.5 rounded bg-[#050A18]/50 border border-[#1A2540]/60 hover:border-[#D4A843]/40 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    checked={sovereignData}
                    onChange={(e) => setSovereignData(e.target.checked)}
                    className="mt-0.5 rounded border-[#1A2540] text-[#D4A843] focus:ring-[#D4A843]"
                  />
                  <div>
                    <span className="text-white text-xs font-bold font-sans uppercase block">Sovereign Data Compliance (+0.50x)</span>
                    <span className="text-[9px] text-[#8B9BAE] leading-normal font-sans block">Strict on-site airgap, local models calibration, CLO & Aegis compliance shielding</span>
                  </div>
                </label>

                <label className="flex items-start gap-2 p-2.5 rounded bg-[#050A18]/50 border border-[#1A2540]/60 hover:border-[#D4A843]/40 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    checked={multiCluster}
                    onChange={(e) => setMultiCluster(e.target.checked)}
                    className="mt-0.5 rounded border-[#1A2540] text-[#D4A843] focus:ring-[#D4A843]"
                  />
                  <div>
                    <span className="text-white text-xs font-bold font-sans uppercase block">Multi-Cluster Hub Sync (+0.30x)</span>
                    <span className="text-[9px] text-[#8B9BAE] leading-normal font-sans block">Dynamic context routing linking multiple division nodes with persistent shared memory</span>
                  </div>
                </label>

                <label className="flex items-start gap-2 p-2.5 rounded bg-[#050A18]/50 border border-[#1A2540]/60 hover:border-[#D4A843]/40 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    checked={dedicatedCompute}
                    onChange={(e) => setDedicatedCompute(e.target.checked)}
                    className="mt-0.5 rounded border-[#1A2540] text-[#D4A843] focus:ring-[#D4A843]"
                  />
                  <div>
                    <span className="text-white text-xs font-bold font-sans uppercase block">Dedicated Bare-Metal Compute (+0.25x)</span>
                    <span className="text-[9px] text-[#8B9BAE] leading-normal font-sans block">Isolated physical Jetson/UPS chassis colocated at Neural Block v1</span>
                  </div>
                </label>
              </div>
            </div>

            {/* RESULTS MODULE (Styled as a high-fidelity bill) */}
            <div className="p-4 rounded border border-dashed border-[#D4A843]/30 bg-[#050A18] space-y-3">
              <span className="font-mono text-[9px] text-[#D4A843] uppercase tracking-widest block font-bold">
                ESTIMATED COMMITTED CONTRACT SHEET
              </span>

              <div className="space-y-1.5 font-mono text-[11px] text-[#8B9BAE]">
                <div className="flex justify-between">
                  <span>Base Platform Subscription</span>
                  <span className="text-white font-bold">${BASE_PLATFORM_RATE.toLocaleString()}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Specialist Slots ({activeSlots} Active)</span>
                  <span className="text-white font-bold">${(activeSlots * SLOT_RATE).toLocaleString()}/mo</span>
                </div>
                <div className="border-t border-[#1A2540]/60 my-1 pt-1 flex justify-between text-white font-bold">
                  <span>Raw Combined Multi-Slot Base</span>
                  <span>${rawMonthlyCost.toLocaleString()}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Multipliers (Sovereign/Cluster/Compute)</span>
                  <span className="text-[#D4A843] font-bold">× {multiplierAccumulator.toFixed(2)}x</span>
                </div>
                <div className="flex justify-between text-[#EA580C]">
                  <span>Term Discount ({discountPct * 100}%)</span>
                  <span className="font-bold">-${Math.round(costAfterMultipliers * discountPct).toLocaleString()}/mo</span>
                </div>
                <div className="border-t-2 border-[#1A2540] pt-2 mt-2 flex justify-between text-[#00D9B5] text-xs font-bold">
                  <span>FINAL MONTHLY REVENUE</span>
                  <span>${Math.round(finalMonthlyCost).toLocaleString()}/mo</span>
                </div>
                <div className="flex justify-between text-xs text-[#8B9BAE]">
                  <span>ANNUALIZED CONTRACT RUN-RATE</span>
                  <span>${Math.round(annualizedValue).toLocaleString()}/yr</span>
                </div>
                <div className="flex justify-between text-xs border-t border-[#1F2E54] pt-1.5 mt-1 text-white font-bold bg-[#111827]/40 px-2 py-1 rounded">
                  <span>CUMULATIVE CONTRACT VALUE (LTC)</span>
                  <span className="text-white">${Math.round(cumulativeContractValue).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleCopyEstimate}
                  className={`py-1.5 px-3 rounded text-[10px] font-mono font-bold uppercase transition flex items-center gap-1.5 border focus:outline-none ${
                    isCopied
                      ? "bg-[#00D9B5]/15 border-[#00D9B5]/30 text-[#00D9B5]"
                      : "bg-[#111827] border-[#1A2540] text-white hover:border-[#D4A843]"
                  }`}
                  title="Copy contract blueprint parameters"
                >
                  {isCopied ? <Check size={11} /> : <Copy size={11} />}
                  <span>{isCopied ? "Blueprints Copied" : "Copy Estimate Parameters"}</span>
                </button>
              </div>
            </div>

          </div>

          {/* NON-NEGOTIABLES GRID */}
          <div className="bg-[#0D1326] border border-[#1A2540] rounded p-5 space-y-4">
            <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2">
              Collective AI Consulting Non-Negotiables
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded bg-[#050A18]/40 border border-[#1A2540]/60 space-y-1">
                <span className="text-white font-bold font-sans uppercase block">1. Minimum Retainer</span>
                <p className="text-[10px] text-[#8B9BAE] leading-normal font-sans">
                  The Collective consulting engagements require a minimum annual retainer of <strong>$2.5 Million</strong>. Lower budgets are routed to the automated Atlas Academy.
                </p>
              </div>

              <div className="p-3 rounded bg-[#050A18]/40 border border-[#1A2540]/60 space-y-1">
                <span className="text-white font-bold font-sans uppercase block">2. CLO Compliance Audit</span>
                <p className="text-[10px] text-[#8B9BAE] leading-normal font-sans">
                  No model is deployed into client codebases without a complete securities and copyright clearance sign-off by <strong>Dr. Joseph Johnson (CLO)</strong> under Juris Guard.
                </p>
              </div>

              <div className="p-3 rounded bg-[#050A18]/40 border border-[#1A2540]/60 space-y-1">
                <span className="text-white font-bold font-sans uppercase block">3. Zero Risk-Sharing</span>
                <p className="text-[10px] text-[#8B9BAE] leading-normal font-sans">
                  Collective AI charges standard, transparent, fixed slot metrics. We reject speculative equity cuts, risk-sharing royalties, or variable token-based billing that obscures actual costs.
                </p>
              </div>

              <div className="p-3 rounded bg-[#050A18]/40 border border-[#1A2540]/60 space-y-1">
                <span className="text-white font-bold font-sans uppercase block">4. Stanley Constant Veto</span>
                <p className="text-[10px] text-[#8B9BAE] leading-normal font-sans">
                  If any engagement triggers social, community, or algorithmic equity concerns, <strong>Stanley Constant</strong> holds an absolute veto that bypasses executive founders.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT: Master Campaigns & FAQs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* COMMERCIAL TIERING CARDS */}
          <div className="bg-[#0D1326] border border-[#1A2540] rounded p-5 space-y-3">
            <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2 mb-1">
              Official Client Tier Specs
            </h3>

            <div className="space-y-3.5">
              
              {/* Card 1 */}
              <div className="p-3 rounded border border-[#1A2540] bg-[#111827]/60 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold text-xs uppercase font-sans">1. Corporate Starter</span>
                  <span className="text-[10px] font-mono text-[#D4A843] font-bold">From $46,000/mo</span>
                </div>
                <p className="text-[10px] text-[#8B9BAE] leading-normal font-sans">
                  Includes 4 persistent Specialist slots, standard shared cloud hosting, and bi-weekly consulting audits. Best for medium businesses exploring tactical automation.
                </p>
                <div className="flex justify-between text-[8px] font-mono text-[#8B9BAE]/60 uppercase pt-1 border-t border-[#1A2540]/40">
                  <span>Lattice: T3-T4 limited</span>
                  <span>Aegis Review logs: weekly</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-3 rounded border border-[#00D9B5]/30 bg-[#00D9B5]/5 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold text-xs uppercase font-sans">2. Enterprise Lattice Core</span>
                  <span className="text-[10px] font-mono text-[#00D9B5] font-bold">From $60,000/mo</span>
                </div>
                <p className="text-[10px] text-[#8B9BAE] leading-normal font-sans">
                  Includes 5-10 slots with full Multi-Cluster memory federation, daily Aegis compliance sweeps, and priority access to Glyph Forge hardware prototypes.
                </p>
                <div className="flex justify-between text-[8px] font-mono text-[#00D9B5]/80 uppercase pt-1 border-t border-[#00D9B5]/20">
                  <span>Lattice: T2-T4 full access</span>
                  <span>Aegis Review logs: real-time</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-3 rounded border border-[#A855F7]/30 bg-[#A855F7]/5 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold text-xs uppercase font-sans">3. Sovereign Lattice Spec</span>
                  <span className="text-[10px] font-mono text-[#A855F7] font-bold">From $120,000/mo</span>
                </div>
                <p className="text-[10px] text-[#8B9BAE] leading-normal font-sans">
                  Dedicated bare-metal colocated node at Neural Block, custom-compiled offline LLMs, on-premises airgap, and designated CLO consulting hours.
                </p>
                <div className="flex justify-between text-[8px] font-mono text-[#A855F7]/80 uppercase pt-1 border-t border-[#A855F7]/20">
                  <span>Lattice: Private T1-T4 core</span>
                  <span>Aegis audit: Continuous airgap</span>
                </div>
              </div>

            </div>
          </div>

          {/* DYNAMIC CAMPAIGN PORTAL */}
          <div className="bg-[#0D1326] border border-[#1A2540] rounded p-5 space-y-4">
            <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wide border-b border-[#1A2540] pb-2">
              "95% Failing" Campaign Toolkit
            </h3>

            {/* Campaign Navigation Tabs */}
            <div className="grid grid-cols-4 gap-1 p-0.5 rounded bg-[#111827] border border-[#1A2540]">
              {(["BLOG", "LINKS", "VIDEO", "FAQ"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`py-1 text-[9px] font-mono font-bold leading-none rounded-sm transition-all ${
                    activeTab === tab
                      ? "bg-[#00D9B5] text-[#050A18]"
                      : "text-[#8B9BAE] hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="space-y-3">
              {activeTab === "BLOG" && (
                <div className="space-y-3">
                  <div className="max-h-60 overflow-y-auto p-3.5 bg-[#050A18]/40 border border-[#1A2540] rounded text-left font-sans leading-relaxed text-[11px] text-[#8B9BAE] space-y-3.5 scrollbar-thin scrollbar-thumb-[#1A2540]">
                    <h4 className="text-white font-bold font-sans text-xs uppercase leading-snug">
                      95% of AI Projects Are Failing — Here's the Architecture Built to Win
                    </h4>
                    <p className="italic">By JR Moyler (Founder, Collective AI Inc)</p>
                    <p>
                      Every technical development team is larping in the sandbox. We are seeing billions of capital incinerated on single-agent frameworks, speculative chatbots, and disconnected dashboards that break the moment context shifts +0.5 standard deviations. 
                    </p>
                    <p>
                      The industry is repeating the mistakes of early grid computing. They build a chatbot, point it at a database, list a dozen tools, and call it an "enterprise strategy." It is not a strategy. It is single-session ephemeral noise.
                    </p>
                    <p>
                      At Collective AI Inc, we built **ZenFlow**—the central nervous system that runs a stable, persistent, 600-agent execution lattice behind a unified, zero-trust perimeter membrane. We don't deploy floating scripts. We compile autonomous specialists directly onto a shared infrastructure grid, locked to structural operating rules that even the founders cannot bypass.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(campaignsBlogText);
                        alert("Blog draft copied to clipboard!");
                      }}
                      className="py-1 px-2.5 rounded bg-[#111827] border border-[#1A2540] hover:border-[#00D9B5] text-[#8B9BAE] hover:text-white text-[9px] font-mono font-bold uppercase transition flex items-center gap-1.5 focus:outline-none"
                    >
                      <Copy size={9} />
                      <span>Copy Full Blog Markdown</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "LINKS" && (
                <div className="space-y-3.5">
                  <span className="font-mono text-[9px] text-[#8B9BAE] uppercase block font-bold mb-1">
                    LinkedIn Campaign Sequence (Weekly Run-rate)
                  </span>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {campaignsLinkedIn.map((post, index) => (
                      <div key={index} className="p-3 bg-[#050A18]/50 border border-[#1A2540]/60 rounded text-left space-y-1.5 font-sans">
                        <span className="text-[#00D9B5] font-mono text-[9px] font-bold block uppercase">{post.day}</span>
                        <p className="text-[10.5px] text-[#8B9BAE] leading-relaxed">{post.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "VIDEO" && (
                <div className="p-3.5 bg-[#050A18]/50 border border-[#1A2540] rounded space-y-3 text-[11px] font-sans leading-relaxed text-[#8B9BAE] text-left">
                  <div className="flex items-center gap-1.5 border-b border-[#1A2540]/60 pb-1.5">
                    <Youtube size={14} className="text-[#EA580C]" />
                    <span className="text-white font-bold uppercase text-[10px] tracking-wider font-mono">
                      {campaignVideoSpecs.title}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-white font-bold uppercase block text-[8px] font-mono text-[#D4A843]">Opening Layout:</span>
                      <p className="text-[10px] italic">{campaignVideoSpecs.introScene}</p>
                    </div>
                    <div>
                      <span className="text-white font-bold uppercase block text-[8px] font-mono text-[#D4A843]">Vantage Narration Script:</span>
                      <p className="text-[10px]">{campaignVideoSpecs.narration}</p>
                    </div>
                    <div>
                      <span className="text-white font-bold uppercase block text-[8px] font-mono text-[#D4A843]">Conversion Outro CTA:</span>
                      <p className="text-[10px]">{campaignVideoSpecs.cta}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "FAQ" && (
                <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1A2540] pr-1 text-left">
                  {[
                    { q: "What is the 30-Agent Division Standard?", a: "Each of Collective AI's 20 divisions operates a strict 30-agent cluster. This includes designated intake nodes (3), deep research engines (3), tactical strategy options (3), building coders (5), and Aegis safety auditors." },
                    { q: "Why call it Specialist Subscription Pricing (SSP)?", a: "SaaS companies hide true compute loads under speculative tokens. Collective AI licenses persistent, fully managed specialist agent slots colocated at our secure Neural Block. Dedicated virtual nodes running on physical UPS boards." },
                    { q: "Who enforces the security holds?", a: "Dr. Joseph Johnson (CLO) under the Juris Guard wing governs legal holds. Sentry intruder alarms perceive hardware nodes and block relative software deployment lines synchronously until cleared." },
                    { q: "How is the community Civic Core slot funded?", a: "We commit 10% of portfolio-wide commercial dividends directly to low-income digital equity vouchers and broadband relays. Stanley Constant vetoes any external venture injection, preserving community equity." }
                  ].map((faq, index) => {
                    const isOpen = faqOpen === index;
                    return (
                      <div key={index} className="border border-[#1A2540]/60 rounded overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setFaqOpen(isOpen ? null : index)}
                          className="w-full p-2.5 bg-[#050A18]/50 hover:bg-[#111827] text-left text-[11px] text-white font-bold font-sans uppercase flex justify-between items-center outline-none focus:outline-none"
                        >
                          <span className="flex items-center gap-1.5">
                            <HelpCircle size={12} className="text-[#00D9B5] shrink-0" />
                            <span>{faq.q}</span>
                          </span>
                          <ChevronDown size={11} className={`text-[#8B9BAE] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isOpen && (
                          <div className="p-3 bg-[#111827]/40 border-t border-[#1A2540]/40 text-[10.5px] leading-relaxed text-[#8B9BAE] font-sans">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* PROMPT MAKER */}
            <div className="border-t border-[#1F2E54] pt-4 mt-1 space-y-3">
              <span className="font-mono text-[9px] text-[#D4A843] uppercase block font-bold flex items-center gap-1.5">
                <Sparkles size={11} className="text-[#D4A843] animate-pulse" />
                <span>Compile Hataalii Voice Pitch copy</span>
              </span>

              <div className="flex flex-col space-y-1.5">
                <textarea
                  id="prompt-topic-input"
                  rows={2}
                  maxLength={150}
                  placeholder="What should the pitch address..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  className="w-full bg-[#050A18]/50 border border-[#1A2540] rounded p-2 text-[10.5px] text-white placeholder-[#8B9BAE]/40 focus:outline-none focus:border-[#00D9B5]"
                />
                
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={handleGenerateCopy}
                  className="w-full bg-[#00D9B5]/10 text-[#00D9B5] border border-[#00D9B5]/30 h-8 text-[10px] font-bold uppercase rounded hover:bg-[#00D9B5] hover:text-[#050A18] transition-all cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none disabled:opacity-40"
                >
                  <Send size={11} />
                  <span>{isGenerating ? "Compiling..." : "Generate Compliant Draft"}</span>
                </button>
              </div>

              {generatedDraft && (
                <div className="p-3 bg-[#111827]/80 border border-[#1A2540] rounded text-left font-mono text-[9px] text-white leading-relaxed select-text select-all whitespace-pre-wrap max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1A2540]">
                  {generatedDraft}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
