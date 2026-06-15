import React, { useState } from "react";
import { 
  Landmark, 
  Compass, 
  Shield, 
  Layers, 
  DollarSign, 
  Zap, 
  Calendar, 
  Activity, 
  Cpu, 
  ArrowUpRight, 
  AlertTriangle,
  Flame,
  Droplet,
  Truck,
  Users,
  Grid
} from "lucide-react";

// Full 23-facility manifest compiled from the master planning dossier
export const ALL_FACILITIES = [
  { id: "01", name: "The Prism – HQ", size: "80,000 sq ft", rate: 380, hard: 30.4, soft: 6.7, total: 37.1, district: "District A — The Core / HQ & Brain", function: "Corporate strategy, executive offices, consulting suites, Oculus deck, cantilevered meeting rooms, secure basement, 750kW dedicated microgrid core" },
  { id: "02", name: "Neural Block – Data Center", size: "60,000 sq ft", rate: 550, hard: 33.0, soft: 7.3, total: 40.3, district: "District A — The Core / HQ & Brain", function: "AI model training, data storage, R&D labs, partially submerged brutalist architecture, direct liquid cooling, mission control ops room" },
  { id: "03", name: "The Vault – Treasury/Security", size: "40,000 sq ft", rate: 480, hard: 19.2, soft: 4.2, total: 23.4, district: "District A — The Core / HQ & Brain", function: "Financial treasury, cold storage, physical security command, blast-proof shell, underground vault, biometric airlocks, faraday shielding" },
  { id: "04", name: "Royal Library and Academy", size: "100,000 sq ft", rate: 290, hard: 29.0, soft: 6.4, total: 35.4, district: "District D — Public Interface / Community & Media", function: "Education, digital archive, library, holographic classrooms, mezzanine study levels, 1MW microgrid yard, outdoor learning terraces" },
  { id: "05", name: "Nexus Labs Production Complex", size: "60,000 sq ft", rate: 420, hard: 25.2, soft: 5.5, total: 30.7, district: "District D — Public Interface / Community & Media", function: "Media production, soundstages, editing suites, 40x60 ft virtual production LED volume, creator lounge, podcast studios" },
  { id: "06", name: "Signal Velocity War Room", size: "14,000 sq ft", rate: 310, hard: 4.3, soft: 0.9, total: 5.2, district: "District A — The Core / HQ & Brain", function: "Growth operations, paid media management center, A/B testing environment, CRO lab, analytics dashboards, campaign war room" },
  { id: "07", name: "Glyph Forge Works – Manufacturing", size: "60,000 sq ft", rate: 340, hard: 20.4, soft: 4.5, total: 24.9, district: "District B — The Foundry / Industrial & Logistics", function: "On-site manufacturing for all 20 divisions: 3D printing, CNC, electronics assembly, apparel, packaging, robotics parts, signage, field kit assembly" },
  { id: "08", name: "Titan Works – Robotics", size: "200,000 sq ft", rate: 280, hard: 56.0, soft: 12.3, total: 68.3, district: "District B — The Foundry / Industrial & Logistics", function: "Robotics assembly, heavy manufacturing, 40 ft ceilings, gantry cranes, indoor/outdoor robot proving ground, industrial power containers" },
  { id: "09", name: "Vector Hub – Logistics Terminal", size: "150,000 sq ft", rate: 260, hard: 39.0, soft: 8.6, total: 47.6, district: "District B — The Foundry / Industrial & Logistics", function: "Autonomous trucking depot, drone port, 20 rooftop verti-ports, cross-dock bays, air traffic control tower, inductive charging + battery swapping" },
  { id: "10", name: "Materials + Inventory Warehouse", size: "45,000 sq ft", rate: 200, hard: 9.0, soft: 2.0, total: 11.0, district: "District B — The Foundry / Industrial & Logistics", function: "High-bay storage, raw materials, inventories, components, automated retrieval system, direct rail link access" },
  { id: "11", name: "Eden Spire – Vertical Farm", size: "50,000 sq ft", rate: 490, hard: 24.5, soft: 5.4, total: 29.9, district: "District C — The Biosphere / Life Sciences & Agriculture", function: "Aeroponic agriculture, food production, glass grow towers, pinkhouse LED systems, algae bio-panels, cogeneration heat link, bioreactors" },
  { id: "12", name: "Vitality Center – Health/Clinical", size: "40,000 sq ft", rate: 580, hard: 23.2, soft: 5.1, total: 28.3, district: "District C — The Biosphere / Life Sciences & Agriculture", function: "Bio-printing, longevity research, Patient care, BSL-2 clean rooms, organ printing labs, Span Clinic patient pods, hospital-grade HVAC" },
  { id: "13", name: "Eon Core Longevity Pavilion", size: "18,000 sq ft", rate: 520, hard: 9.4, soft: 2.1, total: 11.5, district: "District C — The Biosphere / Life Sciences & Agriculture", function: "Experimental clinical spaces, cellular age therapeutics, hyperbaric pods, advanced diagnostics, longevity database nodes" },
  { id: "14", name: "Cognara Mind Behavioral Institute", size: "15,000 sq ft", rate: 410, hard: 6.2, soft: 1.4, total: 7.6, district: "District C — The Biosphere / Life Sciences & Agriculture", function: "Cognitive psychology lab, neural feedback chambers, clinical trial rooms, behavior capture arena, secure patient files" },
  { id: "15", name: "Kinetic Edge Performance Center", size: "60,000 sq ft", rate: 340, hard: 20.4, soft: 4.5, total: 24.9, district: "District D — Public Interface / Community & Media", function: "Sports science, performance training, indoor sprint track, biometric analysis labs, cryotherapy zones, outdoor turf field, Apex Recovery Stations" },
  { id: "16", name: "Civic Core Public Hub", size: "30,000 sq ft", rate: 300, hard: 9.0, soft: 2.0, total: 11.0, district: "District D — Public Interface / Community & Media", function: "Digital equity, maker space, public computer labs, 3D printing stations, auditorium, solar glass canopies, public EV charging" },
  { id: "17", name: "Terra Axis Living Systems Yard", size: "75,000 sq ft", rate: 270, hard: 20.3, soft: 4.5, total: 24.8, district: "District C — The Biosphere / Life Sciences & Agriculture", function: "Ecological system testing, greywater bioswales nursery, soil remediation test plots, microgrid load buffer banks" },
  { id: "18", name: "Nomad Nexus Mobility Hub", size: "12,000 sq ft", rate: 310, hard: 3.7, soft: 0.8, total: 4.5, district: "District D — Public Interface / Community & Media", function: "Global mobility hub, co-living prototype units, destination intelligence center, visa processing support, remote work demonstration" },
  { id: "19", name: "Juris Guard Regulatory Wing", size: "12,000 sq ft", rate: 360, hard: 4.3, soft: 0.9, total: 5.2, district: "District A — The Core / HQ & Brain", function: "Legal intelligence ops, regulatory monitoring, compliance review rooms, secure document management, CLO executive suite" },
  { id: "20", name: "Aether Link Mesh Spire", size: "25,000 sq ft", rate: 390, hard: 9.8, soft: 2.2, total: 12.0, district: "District A — The Core / HQ & Brain", function: "Campus-wide mesh hub, satellite connectivity ground station, communications relay, signal monitoring, BCI research lab access point" },
  { id: "21", name: "EnerGenius Central Utility Plant", size: "50,000 sq ft", rate: 520, hard: 26.0, soft: 5.7, total: 31.7, district: "District B — The Foundry / Industrial & Logistics", function: "Cogeneration turbines, microgrid controllers, chillers, solar connection bays, central water capture system" },
  { id: "22", name: "Visitor and Campus Ops Center", size: "25,000 sq ft", rate: 320, hard: 8.0, soft: 1.8, total: 9.8, district: "District D — Public Interface / Community & Media", function: "Reception, visitor briefing, operations logging, logistics dispatch control room, external media relations office" },
  { id: "23", name: "Employee Commons and Wellness", size: "90,000 sq ft", rate: 310, hard: 27.9, soft: 6.1, total: 34.0, district: "District D — Public Interface / Community & Media", function: "Employee dining halls, gyms, meditation pods, workspace suites, healthcare clinics, biophilic gardens" }
];

export default function CampusView() {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>("01");
  const [activeTab, setActiveTab] = useState<"MANIFEST" | "CAPITAL" | "POWER" | "SITE" | "SECURITY" | "PRODUCTION">("MANIFEST");
  const [costScenario, setCostScenario] = useState<"low" | "base" | "high">("base");

  const districts = [
    { name: "District A — The Core / HQ & Brain", desc: "Corporate strategy, executive offices, AI compute blocks, treasury vaults, and zero-trust grid cores.", bgClass: "bg-[#7C3AED]/5 border-[#7C3AED]/20 hover:border-[#7C3AED]" },
    { name: "District B — The Foundry / Industrial & Logistics", desc: "Heavy robotics assembly, logistical verti-ports, Glyph Forge manufacturing, and testing proving grounds.", bgClass: "bg-[#22D3EE]/5 border-[#22D3EE]/20 hover:border-[#22D3EE]" },
    { name: "District C — The Biosphere / Life Sciences & Agriculture", desc: "Eden Spire aeroponics, BSL-2 clean rooms, organ printing, and clinical patient wellness clinics.", bgClass: "bg-[#22C55E]/5 border-[#22C55E]/20 hover:border-[#22C55E]" },
    { name: "District D — Public Interface / Community & Media", desc: "Holographic classrooms, media soundstages, public computer labs, sports training tracks, and compliance chambers.", bgClass: "bg-[#F59E0B]/5 border-[#F59E0B]/20 hover:border-[#F59E0B]" }
  ];

  const filteredFacilities = ALL_FACILITIES.filter(
    (fac) => !selectedDistrict || fac.district === selectedDistrict
  );

  const activeFacility = ALL_FACILITIES.find(f => f.id === selectedFacilityId) || ALL_FACILITIES[0];

  // Capital Stack Data from Dossier 2.1
  const capitalStack = [
    { tranche: "Founder / Sponsor Equity", source: "JR Moyler / Collective AI", low: 25, base: 37.5, high: 50, pct: "3-5%", notes: "Founder commitment signals alignment; required by institutional co-investors" },
    { tranche: "Series A Venture Equity", source: "Institutional VC / Family Office", low: 100, base: 125, high: 150, pct: "10-15%", notes: "Phase 1 revenue-generating hubs: Prism, Neural Block, Nexus, Academy" },
    { tranche: "Opportunity Zone Equity", source: "QOZ Fund Investors", low: 80, base: 100, high: 120, pct: "8-12%", notes: "Columbus OZ designations in Franklinton / outer belt; 10-yr capital gains deferral" },
    { tranche: "EB-5 Regional Center", source: "Foreign Investor Program", low: 30, base: 45, high: 60, pct: "3-6%", notes: "Job creation requirement: ~10 direct/indirect jobs per $1M invested" },
    { tranche: "New Markets Tax Credits", source: "NMTC Allocation", low: 20, base: 27.5, high: 35, pct: "2-4%", notes: "Civic Core and Hybrid Academy likely qualify as low-income community investments" },
    { tranche: "Senior Construction Loan", source: "Commercial Bank / CMBS", low: 350, base: 400, high: 450, pct: "35-45%", notes: "Drawn by phase; 65-70% LTC; interest reserve required; data center/industrial collateral" },
    { tranche: "USDA / SBA 504", source: "Federal Lending", low: 20, base: 30, high: 40, pct: "2-4%", notes: "Vertical farming (Eden Spire), rural-adjacent innovation, job creation in Gaia/Glyph Forge" },
    { tranche: "Ohio State Incentives", source: "ODSA, JobsOhio, CRA/TIF", low: 40, base: 60, high: 80, pct: "4-8%", notes: "TIF on incremental property value; CRA abatements; JobsOhio Innovation grants" },
    { tranche: "IRA Clean Energy Credits", source: "Federal 48C / 45 / 179D", low: 35, base: 47.5, high: 60, pct: "3-6%", notes: "Solar (Helios Grid), microgrid, BESS, energy efficiency — transferable tax credits" },
    { tranche: "Mezzanine / Bridge Equity", source: "Credit Funds", low: 50, base: 75, high: 100, pct: "5-10%", notes: "Fill gap between senior debt and equity; Phase 2-3 deployment capital" }
  ];

  // Stabilized Revenue Model from Dossier 2.2
  const revenueStreams = [
    { stream: "The Collective Consulting", driver: "8 senior engagements/yr at $2.5M avg", rev: 20.0, margin: "55%", noi: 11.0 },
    { stream: "ZenFlow / Neural Block Coloc.", driver: "External data center tenants, 20% capacity", rev: 12.0, margin: "60%", noi: 7.2 },
    { stream: "Hybrid Living Academy", driver: "3,500 enrollees at $4,800/yr average", rev: 16.8, margin: "45%", noi: 7.6 },
    { stream: "Nexus Labs Media / Licensing", driver: "Content licensing, creator platform", rev: 8.5, margin: "40%", noi: 3.4 },
    { stream: "Signal Velocity Agency", driver: "Retained growth clients, 12 at $300K", rev: 3.6, margin: "50%", noi: 1.8 },
    { stream: "Glyph Forge Works – External", driver: "Division services + third-party orders", rev: 4.2, margin: "35%", noi: 1.5 },
    { stream: "Eden Spire – Food Sales", driver: "B2B food contracts + campus kitchen", rev: 3.8, margin: "30%", noi: 1.1 },
    { stream: "Kinetic Edge – Memberships", driver: "Athlete programs, corporate wellness", rev: 2.4, margin: "50%", noi: 1.2 },
    { stream: "Civic Core – Grants", driver: "Federal + state grants (501c3)", rev: 2.0, margin: "85%", noi: 1.7 },
    { stream: "Terra Axis – Leases/Data", driver: "PropTech licensing + housing demos", rev: 1.8, margin: "60%", noi: 1.1 },
    { stream: "Campus Facility Events", driver: "Venue rental, conferences, tours", rev: 1.5, margin: "55%", noi: 0.8 }
  ];

  // Project Total Budget breakdown (scenario-based)
  const budgetBreakdown = [
    { category: "Building Hard Costs", low: 456.4, base: 507.1, high: 558.3 },
    { category: "Building Soft Costs (22%)", low: 100.4, base: 111.6, high: 122.8 },
    { category: "Site Development & Land", low: 97.3, base: 131.4, high: 173.2 },
    { category: "Specialty / Tech Infrastructure", low: 69.3, base: 81.4, high: 93.5 },
    { category: "Owner Contingency (8%)", low: 57.9, base: 66.5, high: 75.0 },
    { category: "Pre-Development / A+E", low: 28.0, base: 34.5, high: 42.0 },
    { category: "Financing / Carry Costs", low: 38.0, base: 52.0, high: 68.0 },
    { category: "FF+E and Move-In", low: 18.0, base: 24.0, high: 30.0 }
  ];

  // Real-time calculated sums
  const scenarioTotal = budgetBreakdown.reduce((sum, item) => sum + item[costScenario], 0);

  // Core Energy Loads from 5.1
  const energyLoads = [
    { cat: "IT / Data Center", driver: "Neural Block (Tier 3)", peak: "2.5-4.0 MW", annual: "18.0M-28.5M", notes: "PUE target 1.35; direct liquid cooling; 750 kW UPS baseline" },
    { cat: "Edge Compute Nodes", driver: "Distributed campus compute", peak: "0.4-0.8 MW", annual: "3.0M-5.5M", notes: "Knowledge Keeper, agent lattice, ZenFlow routing, local inference" },
    { cat: "Industrial / Mfg", driver: "Titan Works, Glyph Forge, Vector Hub", peak: "1.5-3.0 MW", annual: "10.5M-22.0M", notes: "Gantry cranes, robotics, print farm, EV charging, inductive flooring" },
    { cat: "HVAC / Process Cooling", driver: "All buildings, clinical, lab, studio", peak: "2.0-4.5 MW", annual: "13.0M-31.0M", notes: "BSL-2 clean rooms, CHP absorption chilling, data center cooling towers" },
    { cat: "Lighting / Plug Load", driver: "All buildings standard", peak: "0.8-1.5 MW", annual: "5.5M-10.0M", notes: "LED-first standard; campus security lighting; perimeter sensors" },
    { cat: "Vertical Farm", driver: "Eden Spire LEDs + pumps", peak: "0.6-1.2 MW", annual: "4.0M-8.0M", notes: "LED grow lights are primary load; supplemented by waste heat loops" },
    { cat: "EV / Autonomous Transit", driver: "Shuttle loops, Vector Hub charging", peak: "0.4-0.8 MW", annual: "2.5M-5.0M", notes: "Inductive charging in Vector Hub; Level 3 bays in decks" }
  ];

  // EnerGenius microgrid structures 5.2
  const microgridStructures = [
    { system: "CHP Natural Gas Turbines", spec: "2x 3.5 MW (7 MW total)", role: "Primary baseload generation; waste heat feeds HVAC absorption chiller + gas greenhouses", cost: "$12M-$18M" },
    { system: "Helios Grid Solar", spec: "3.2-5.0 MW peak AC", role: "Daytime offset; peak demand reduction; solar REC generation for federal tax credits", cost: "$6.5M-$10.0M" },
    { system: "BESS — Battery Storage", spec: "8-12 MWh lithium iron phosphate", role: "Peak shaving, overnight solar bridging, UPS backup for data centers", cost: "$8.0M-$14.0M" },
    { system: "Microgrid SCADA Controller", spec: "Campus energy management", role: "Real-time load optimization, demand response, island-mode switching", cost: "$1.2M-$2.0M" },
    { system: "Emergency Generators", spec: "10x 750 kW diesel (7.5 MW)", role: "Last-resort backup for data center, clinical, and security ops command", cost: "$4.5M-$7.0M" },
    { system: "Absorption Chilling", spec: "2x 1,200-ton chillers", role: "Uses CHP waste heat for system-wide cooling, reducing electrical cooling loads", cost: "$3.5M-$5.5M" },
    { system: "Water Reuse Plant", spec: "300,000 gal/day capacity", role: "Captures cooling tower blowdown, greywater, and mfg rinse water for reuse", cost: "$2.8M-$4.5M" }
  ];

  // Site infrastructure costs 1.3
  const siteCosts = [
    { cat: "Land Acquisition", scope: "180 acres, outer belt Columbus, OH", low: 18.0, base: 27.0, high: 36.0 },
    { cat: "Civil / Earthwork", scope: "Grading, drainage, retaining structures", low: 8.5, base: 11.2, high: 14.8 },
    { cat: "Roads and Paving", scope: "Autonomous loops, service & emergency roads", low: 7.2, base: 9.4, high: 12.0 },
    { cat: "Utilities to Site", scope: "Electric, gas, water, fiber, sewer laterals", low: 6.4, base: 8.8, high: 12.2 },
    { cat: "Helios Grid Solar", scope: "Rooftop + canopy solar across all districts", low: 22.0, base: 28.0, high: 36.0 },
    { cat: "BESS / Microgrid", scope: "Battery storage + microgrid switchgear", low: 14.0, base: 18.5, high: 24.0 },
    { cat: "Stormwater / Bioswales", scope: "Retention pools, greywater wetland buffer system", low: 4.2, base: 5.8, high: 7.8 },
    { cat: "Landscaping / Plazas", scope: "Biophilic campus, public plazas, outdoor zones", low: 5.5, base: 7.2, high: 9.4 },
    { cat: "Aether Link Spire", scope: "300 ft mesh/comm spire + concrete foundation", low: 3.8, base: 5.0, high: 6.8 },
    { cat: "Drone / Robot Grounds", scope: "Proving lanes, verti-ports, concrete test pads", low: 4.5, base: 6.0, high: 8.2 },
    { cat: "Autonomous Transit", scope: "Shuttle loop infrastructure, induction charging stations", low: 3.2, base: 4.5, high: 6.0 }
  ];

  // Construction timeline phases 1.6
  const timelinePhases = [
    { phase: "Phase 0", name: "Site + Utilities", duration: "12-18 mo", calendar: "Q3 2026 - Q4 2027", deliverables: "Land acquisition, zoning, civil engineering, utilities to site, perimeter fence, temporary ops baseline", capital: "$55M-$80M" },
    { phase: "Phase 1", name: "Revenue Core", duration: "24-30 mo", calendar: "Q1 2027 - Q2 2030", deliverables: "The Prism HQ, Neural Block v1, Nexus Labs, Hybrid Academy, Signal Velocity, Juris Guard, Visitor/Ops Center", capital: "$220M-$270M" },
    { phase: "Phase 2", name: "Mfg Spine", duration: "18-24 mo", calendar: "Q3 2029 - Q2 2031", deliverables: "Glyph Forge Works, Materials Warehouse, Terra Axis Yard, Aether Link Spire, Central Utility Plant expansion", capital: "$160M-$200M" },
    { phase: "Phase 3", name: "Physical AI", duration: "24-30 mo", calendar: "Q1 2031 - Q4 2033", deliverables: "Titan Works, Vector Hub, Kinetic Edge, expanded drone/robot proving grounds, The Vault hardening", capital: "$210M-$260M" },
    { phase: "Phase 4", name: "Biosphere", duration: "18-24 mo", calendar: "Q3 2033 - Q4 2035", deliverables: "Eden Spire, Vitality Center, Eon Core, Cognara Mind, Employee Commons and Wellness Village", capital: "$185M-$230M" },
    { phase: "Phase 5", name: "Expansion", duration: "Ongoing", calendar: "2036+", deliverables: "Additional data halls, clinic wings, housing demo neighborhoods, public museum, investor showcase", capital: "TBD" }
  ];

  // Security zone architecture 6.2
  const securityZones = [
    { level: "Zone 0", type: "Public Access", locations: "Civic Core, Terra Axis Yard demo, Visitor Center approach", access: "Open to public during posted hours", method: "Vehicle barrier, reception desk, camera sweeps", protocol: "Aegis-Clear; public law applies" },
    { level: "Zone 1", type: "Campus Area", locations: "Employee Commons, Kinetic Edge, Academy, Nexus public areas", access: "Employees + credentialed visitors with escort", method: "Badge checks, visitor NDA, optical analytics", protocol: "Aegis-Clear; incident logging mandatory" },
    { level: "Zone 2", type: "Restricted Ops", locations: "The Prism executive floors, Signal Velocity, Juris Guard, Neural Block lobby", access: "Employees with specified role clearance + escorted clients", method: "PIN code + digital badge + visitor NDA; no personal devices", protocol: "Aegis-Review; entry logs audited daily" },
    { level: "Zone 3", type: "Secure Core", locations: "The Vault, Neural Block data hall, Vitality clinical BSL-2 lab, Eon Core testing lab", access: "Cleared engineering/scientific personnel only; visitors forbidden", method: "Biometric optical scan + badge + 2FA; cellular inhibitors active", protocol: "Aegis-Hold; triggers instant containment response" },
    { level: "Zone 4", type: "Industrial Edge", locations: "Titan Works, Glyph Forge, Vector Hub, Materials Warehouse", access: "Authorized manufacturing personnel + safety-certified contractors", method: "Industrial badge + safety orientation; steel toes & PPE required", protocol: "Safety-incident protocol; automated machinery proximity shutdowns" }
  ];

  // Glyph Forge Zones 7.1
  const mfgZones = [
    { zone: "Print Farm Bay", equipment: "Bambu X1C farm 12-24 units, material dryers, post-processing arrays", output: "Hardware enclosures, sensor pods, structural mounts, brackets, wearable shells", throughput: "200-400 prints/day at 6hr avg cycle; 60,000-100,000 parts/year" },
    { zone: "Soft Goods Studio", equipment: "Commercial embroidery machines, DTF/DTG printers, heat presses, automated cutters", output: "Apparel, lab coats, uniforms, branded developer accessories, soft gear cases", throughput: "100-200 garment units/day; 30,000-60,000 items/year" },
    { zone: "Electronics Bench", equipment: "Lead-free soldering stations, hot-air rework nodes, BLE/haptic test rigs, oscilloscopes, pick-and-place", output: "Prototype electronics, wearable PCB internals, custom cables, sensor arrays", throughput: "20-60 board assemblies/day; custom PCB runs up to 500 units" },
    { zone: "Packaging + Label Cell", equipment: "Direct thermal printers, QR/NFC encoders, box sealing lines, product inserts machines", output: "Retail box kits, investor presentation kits, device labels, RFID badges", throughput: "500-2,000 units/day; NFC encoding at 1,200 tags/hour" },
    { zone: "Machine & Tool Room", equipment: "Drill presses, precise rotary toolsets, CNC mills, laser cutters, calipers, deburrers", output: "Gaskets, metallic fixtures, custom deburred jigs, one-off mechanical parts", throughput: "Low volume; primarily dedicated to quick-turn tooling & prototyping" },
    { zone: "QC Assessment Bench", equipment: "Microscopic calipers, BLE transmitter testers, power bench loads, camera analysis, 3ft drop testers", output: "Quality pass/fail log archives, Aegis safety reports, build level version control checks", throughput: "100% inspection for wearables, powered devices, & flight components" }
  ];

  return (
    <div className="space-y-6 select-none text-left">
      {/* Top Banner Blueprint Descriptor */}
      <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#D4A843]/5 to-transparent pointer-events-none" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3 border-b border-[#1A2540]/60 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="text-[#D4A843]" size={18} />
            <h2 className="text-sm sm:text-base font-bold text-white font-sans uppercase tracking-tight">
              COLLECTIVE AI INC — MASTER DEVELOPMENT BLUEPRINT v2.0
            </h2>
          </div>
          <span className="font-mono text-[9px] text-[#D4A843] bg-[#D4A843]/10 border border-[#D4A843]/20 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
            CONFIDENTIAL PLANNING DOCUMENT — JUNE 2026
          </span>
        </div>
        <p className="text-xs text-[#8B9BAE] font-sans leading-relaxed">
          Operational, physical, and financial digital twin mapping of the <strong>180-Acre, 20-Division AI Mega Campus</strong> situated in the <strong>Smart City Corridor of Columbus, Ohio</strong>. Engineered under a biophilic solarpunk aesthetic, powered by decentralized EnerGenius microgrids, and secured under centralized Obsidian protocols.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-1.5 border-t border-[#1A2540]/30 text-center font-mono">
          <div className="p-2.5 rounded bg-[#050A18]/60 border border-[#1A2540]/40">
            <span className="text-[8px] text-[#8B9BAE] block uppercase tracking-wider">Total Land Scale</span>
            <span className="text-lg font-bold text-white block mt-0.5">180 Acres</span>
          </div>
          <div className="p-2.5 rounded bg-[#050A18]/60 border border-[#1A2540]/40">
            <span className="text-[8px] text-[#8B9BAE] block uppercase tracking-wider">Aggregated Footprint</span>
            <span className="text-lg font-bold text-white block mt-0.5">1.12M SQ FT</span>
          </div>
          <div className="p-2.5 rounded bg-[#050A18]/60 border border-[#1A2540]/40">
            <span className="text-[8px] text-[#8B9BAE] block uppercase tracking-wider">Integrated Divisions</span>
            <span className="text-lg font-bold text-[#00D9B5] block mt-0.5">20 Business Units</span>
          </div>
          <div className="p-2.5 rounded bg-[#050A18]/60 border border-[#1A2540]/40">
            <span className="text-[8px] text-[#8B9BAE] block uppercase tracking-wider">Primary Facilities</span>
            <span className="text-lg font-bold text-[#D4A843] block mt-0.5">23 Buildings</span>
          </div>
        </div>
      </div>

      {/* District Selection Chips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {districts.map((d, index) => {
          const isActive = selectedDistrict === d.name;
          return (
            <div
              key={index}
              onClick={() => setSelectedDistrict(isActive ? null : d.name)}
              className={`p-4 rounded border cursor-pointer transition-all duration-150 relative overflow-hidden ${d.bgClass} ${
                isActive ? "border-white bg-[#0D1326]" : ""
              }`}
            >
              {isActive && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#00D9B5] animate-ping" />
              )}
              <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider mb-2">
                {d.name.split(" — ")[0]}
              </h4>
              <p className="text-xs text-white leading-normal font-sans font-medium mb-2">
                {d.name.split(" — ")[1]}
              </p>
              <p className="text-[10px] text-[#8B9BAE] leading-relaxed font-sans">
                {d.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Dossier Hub Custom Console Navigation Tabs */}
      <div className="flex flex-wrap border-b border-[#1A2540] gap-1 z-10">
        <button
          onClick={() => setActiveTab("MANIFEST")}
          className={`px-4 py-2 text-[10px] sm:text-xs font-mono font-semibold uppercase border-t border-x rounded-t transition-all ${activeTab === "MANIFEST" ? "bg-[#0D1326] border-[#1A2540] border-t-2 border-t-[#D4A843] text-white" : "border-transparent text-[#8B9BAE] hover:text-white"}`}
        >
          📂 Facilities & Costs
        </button>
        <button
          onClick={() => setActiveTab("CAPITAL")}
          className={`px-4 py-2 text-[10px] sm:text-xs font-mono font-semibold uppercase border-t border-x rounded-t transition-all ${activeTab === "CAPITAL" ? "bg-[#0D1326] border-[#1A2540] border-t-2 border-t-[#00D9B5] text-white" : "border-transparent text-[#8B9BAE] hover:text-white"}`}
        >
          🪙 Capital & Returns
        </button>
        <button
          onClick={() => setActiveTab("POWER")}
          className={`px-4 py-2 text-[10px] sm:text-xs font-mono font-semibold uppercase border-t border-x rounded-t transition-all ${activeTab === "POWER" ? "bg-[#0D1326] border-[#1A2540] border-t-2 border-t-amber-400 text-white" : "border-transparent text-[#8B9BAE] hover:text-white"}`}
        >
          ⚡ Microgrid Power
        </button>
        <button
          onClick={() => setActiveTab("SITE")}
          className={`px-4 py-2 text-[10px] sm:text-xs font-mono font-semibold uppercase border-t border-x rounded-t transition-all ${activeTab === "SITE" ? "bg-[#0D1326] border-[#1A2540] border-t-2 border-t-rose-500 text-white" : "border-transparent text-[#8B9BAE] hover:text-white"}`}
        >
          🛣️ Site & Permits
        </button>
        <button
          onClick={() => setActiveTab("SECURITY")}
          className={`px-4 py-2 text-[10px] sm:text-xs font-mono font-semibold uppercase border-t border-x rounded-t transition-all ${activeTab === "SECURITY" ? "bg-[#0D1326] border-[#1A2540] border-t-2 border-t-violet-500 text-white" : "border-transparent text-[#8B9BAE] hover:text-white"}`}
        >
          🛡️ Zones & Operations
        </button>
        <button
          onClick={() => setActiveTab("PRODUCTION")}
          className={`px-4 py-2 text-[10px] sm:text-xs font-mono font-semibold uppercase border-t border-x rounded-t transition-all ${activeTab === "PRODUCTION" ? "bg-[#0D1326] border-[#1A2540] border-t-2 border-t-emerald-400 text-white" : "border-transparent text-[#8B9BAE] hover:text-white"}`}
        >
          ⚙️ Glyph Forge MFG
        </button>
      </div>

      {/* Main Tab Render Space */}
      <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6">
        
        {/* TAB 1: FACILITIES MANIFEST & PRICING SHEET */}
        {activeTab === "MANIFEST" && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-[#1A2540]/60 pb-3.5">
              <div>
                <h3 className="text-sm font-bold text-white font-sans uppercase">
                  Interactive Facility Schematic & Cost Spreadsheet
                </h3>
                <span className="text-[10px] text-[#8B9BAE] font-sans block mt-1">
                  Click any building to display dynamic blueprints and pre-engineering specification parameters.
                </span>
              </div>
              <button
                onClick={() => setSelectedDistrict(null)}
                className="text-[10px] font-mono uppercase text-[#D4A843] hover:underline"
              >
                Reset District Filters (Showing {filteredFacilities.length} of 23 Facilities)
              </button>
            </div>

            {/* Grid Map Schematic Layout */}
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2 bg-[#050A18] border border-[#1A2540]/60 p-3 rounded text-center select-none font-mono">
              {filteredFacilities.map((fac) => {
                const isSelected = selectedFacilityId === fac.id;
                let colorClass = "border-[#1A2540] text-[#8B9BAE] bg-[#0D1326]/50";
                if (isSelected) {
                  colorClass = "border-[#D4A843] text-white bg-[#D4A843]/10 font-bold scale-105 shadow-md shadow-[#D4A843]/5";
                } else {
                  if (fac.district.includes("District A")) colorClass = "border-[#7C3AED]/40 hover:border-[#7C3AED] text-[#7C3AED]";
                  if (fac.district.includes("District B")) colorClass = "border-[#22D3EE]/40 hover:border-[#22D3EE] text-[#22D3EE]";
                  if (fac.district.includes("District C")) colorClass = "border-[#22C55E]/40 hover:border-[#22C55E] text-[#22C55E]";
                  if (fac.district.includes("District D")) colorClass = "border-[#F59E0B]/40 hover:border-[#F59E0B] text-[#F59E0B]";
                }

                return (
                  <button
                    key={fac.id}
                    onClick={() => setSelectedFacilityId(fac.id)}
                    className={`h-12 rounded border flex flex-col items-center justify-center transition-all ${colorClass}`}
                    title={`${fac.name} (${fac.size})`}
                  >
                    <span className="text-[10px] font-bold">{fac.id}</span>
                    <span className="text-[7.5px] opacity-70 tracking-tight block truncate w-full px-1">
                      {fac.name.split(" – ").pop()?.split(" Works")[0]?.split(" Spire")[0]?.split(" Center")[0]?.substring(0, 7).toUpperCase()}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Split Panel: Asset Sheet Description & Manifest Spreadsheet Table */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Left Column: Spreadsheet Table */}
              <div className="xl:col-span-2 overflow-x-auto border border-[#1A2540]/50 rounded">
                <table className="w-full text-left font-mono text-[10px] border-collapse bg-[#050A18]/40">
                  <thead>
                    <tr className="bg-[#0D1326] border-b border-[#1A2540] text-[#8B9BAE] uppercase text-[9px] tracking-wider">
                      <th className="p-3">ID</th>
                      <th className="p-3">Facility Name</th>
                      <th className="p-3">Built Scale</th>
                      <th className="p-3">$/SF Hard</th>
                      <th className="p-3">Hard Cost</th>
                      <th className="p-3">Soft (22%)</th>
                      <th className="p-3 text-right">Total Est</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFacilities.map((fac) => {
                      const isSelected = selectedFacilityId === fac.id;
                      return (
                        <tr 
                          key={fac.id}
                          onClick={() => setSelectedFacilityId(fac.id)}
                          className={`border-b border-[#1A2540]/30 hover:bg-[#D4A843]/5 cursor-pointer transition ${isSelected ? "bg-[#D4A843]/10 font-semibold text-white border-l-2 border-l-[#D4A843]" : "text-[#8B9BAE]"}`}
                        >
                          <td className="p-3 font-bold">{fac.id}</td>
                          <td className="p-3 font-sans font-medium text-white max-w-[160px] truncate">{fac.name}</td>
                          <td className="p-3">{fac.size}</td>
                          <td className="p-3">${fac.rate}</td>
                          <td className="p-3 font-sans">${fac.hard.toFixed(1)}M</td>
                          <td className="p-3 font-sans">${fac.soft.toFixed(1)}M</td>
                          <td className="p-3 text-right font-sans text-white">${fac.total.toFixed(1)}M</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Right Column: Dynamic Deep-Dive Engineering Specs Card */}
              <div className="bg-[#050A18] border border-[#1A2540]/80 border-t-2 border-t-[#D4A843] rounded p-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b border-[#1A2540]/50 pb-3">
                    <div>
                      <span className="text-[8px] font-mono text-[#8B9BAE] uppercase block mb-0.5">Asset Blueprint Dossier</span>
                      <h4 className="text-sm font-bold text-white font-sans uppercase">
                        {activeFacility.name}
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#D4A843] bg-[#D4A843]/10 h-8 w-8 rounded border border-[#D4A843]/30 flex items-center justify-center shrink-0">
                      {activeFacility.id}
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <span className="text-[8px] font-mono text-[#8B9BAE] uppercase block mb-1">District Block Zoning</span>
                      <span className="text-[11px] text-white font-sans font-medium uppercase leading-relaxed block">
                        {activeFacility.district}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-y border-[#1A2540]/40 py-3">
                      <div>
                        <span className="text-[8px] font-mono text-[#8B9BAE] uppercase block mb-0.5">Spatial Area scale</span>
                        <span className="text-xs text-[#00D9B5] font-mono font-bold">{activeFacility.size}</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-[#8B9BAE] uppercase block mb-0.5 font-bold">Hard cost rate</span>
                        <span className="text-xs text-[#D4A843] font-mono font-bold">${activeFacility.rate}/SF</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[8px] font-mono text-[#8B9BAE] uppercase block mb-0.5 select-none">Hard capital</span>
                        <span className="text-xs text-white font-mono font-medium">${activeFacility.hard.toFixed(1)}M</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-[#8B9BAE] uppercase block mb-0.5 select-none">Soft capital (22%)</span>
                        <span className="text-xs text-white font-mono font-medium">${activeFacility.soft.toFixed(1)}M</span>
                      </div>
                    </div>

                    <div className="bg-[#111827] border border-[#1A2540]/60 rounded p-2.5">
                      <span className="text-[8px] font-mono text-[#8B9BAE] uppercase block mb-1 font-bold">Total estimated capital</span>
                      <span className="text-[14px] text-[#00D9B5] font-mono font-bold">${activeFacility.total.toFixed(2)}M</span>
                    </div>

                    <div>
                      <span className="text-[8px] font-mono text-amber-400 uppercase block mb-1 font-bold">Functional Utility & Clinical Scope</span>
                      <p className="text-[11px] text-[#8B9BAE] font-sans leading-relaxed">
                        {activeFacility.function}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1A2540]/40 text-[8.5px] font-mono text-[#8B9BAE]/40 mt-6 select-all">
                  CORE BLUEPRINT TARGET ID: CAI-FAC-{activeFacility.id}-COLUMBUS
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: CAPITAL, STABILIZED REVENUE & RETURNS */}
        {activeTab === "CAPITAL" && (
          <div className="space-y-6">
            <div className="border-b border-[#1A2540]/60 pb-3">
              <h3 className="text-sm font-bold text-white font-sans uppercase flex items-center gap-2">
                <DollarSign size={16} className="text-[#00D9B5]" />
                Financing Strategy, Capital Stack & Stabilized Returns
              </h3>
              <span className="text-[10px] text-[#8B9BAE] font-sans block mt-1">
                Scenario planning and Year 5 operational NOI estimates for the ground-up Columbus project.
              </span>
            </div>

            {/* Scenario selector */}
            <div className="p-4 bg-[#050A18] rounded border border-[#1A2540] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-[#D4A843] animate-pulse" />
                <span className="text-xs text-white font-sans font-medium">Select Master Development Scenario:</span>
              </div>
              <div className="flex bg-[#111827] border border-[#1A2540] p-1 rounded font-mono text-[10px] gap-1">
                <button
                  onClick={() => setCostScenario("low")}
                  className={`px-3 py-1 rounded transition ${costScenario === "low" ? "bg-rose-600 text-white font-bold" : "text-[#8B9BAE] hover:text-white"}`}
                >
                  LOW RANGE ($865.3M)
                </button>
                <button
                  onClick={() => setCostScenario("base")}
                  className={`px-3 py-1 rounded transition ${costScenario === "base" ? "bg-[#D4A843] text-[#050A18] font-bold" : "text-[#8B9BAE] hover:text-white"}`}
                >
                  BASE CASE ($1.008B)
                </button>
                <button
                  onClick={() => setCostScenario("high")}
                  className={`px-3 py-1 rounded transition ${costScenario === "high" ? "bg-[#00D9B5] text-[#050A18] font-bold" : "text-[#8B9BAE] hover:text-white"}`}
                >
                  HIGH RANGE ($1.162B)
                </button>
              </div>
            </div>

            {/* Sub-grid: Stack Tranches and Project Cost breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Budget cost breakdown */}
              <div className="bg-[#050A18]/40 border border-[#1A2540]/60 rounded p-4 space-y-4">
                <h4 className="text-[11px] font-mono uppercase text-white tracking-wider border-b border-[#1A2540]/40 pb-2 flex justify-between">
                  <span>Project Capital Budget Allocation</span>
                  <span className="text-[#00D9B5]">${scenarioTotal.toFixed(1)}M Total</span>
                </h4>
                
                <div className="space-y-3 font-mono text-[10px]">
                  {budgetBreakdown.map((b, idx) => {
                    const value = b[costScenario];
                    const percentage = (value / scenarioTotal) * 100;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-sans">{b.category}</span>
                          <span className="text-[#8B9BAE]">${value.toFixed(1)}M ({percentage.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full h-1 bg-[#111827] rounded overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#D4A843] to-[#00D9B5]"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Capital tranches */}
              <div className="bg-[#050A18]/40 border border-[#1A2540]/60 rounded p-4 space-y-3">
                <h4 className="text-[11px] font-mono uppercase text-white tracking-wider border-b border-[#1A2540]/40 pb-2">
                  Multi-Tier Capital Stack Stack Tranches ({costScenario.toUpperCase()})
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-[10px] border-collapse">
                    <thead>
                      <tr className="text-[#8B9BAE] border-b border-[#1A2540] text-[8.5px]">
                        <th className="py-2">Tranche (Source)</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">% LTV</th>
                        <th className="py-2">Levered Scope</th>
                      </tr>
                    </thead>
                    <tbody>
                      {capitalStack.map((item, idx) => {
                        const amount = costScenario === "low" ? item.low : costScenario === "high" ? item.high : item.base;
                        return (
                          <tr key={idx} className="border-b border-[#1A2540]/20 hover:bg-[#111827]">
                            <td className="py-2 pr-2 text-white">
                              <div className="font-bold">{item.tranche}</div>
                              <div className="text-[8px] text-[#8B9BAE]">{item.source}</div>
                            </td>
                            <td className="py-2 text-[#00D9B5] font-bold">${amount.toFixed(1)}M</td>
                            <td className="py-2 text-white">{item.pct}</td>
                            <td className="py-2 font-sans truncate max-w-[140px] text-[#8B9BAE]" title={item.notes}>{item.notes}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Stabilized Revenue Year 5 Table */}
            <div className="bg-[#050A18]/40 border border-[#1A2540]/60 rounded p-4 space-y-4">
              <div className="border-b border-[#1A2540]/40 pb-2 flex justify-between items-center">
                <h4 className="text-[11px] font-mono uppercase text-white tracking-wider">
                  Stabilized Operational Revenue Streams &amp; Net Operating Income (Year 5)
                </h4>
                <span className="text-xs text-amber-400 font-mono font-bold">Blended Rev: $76.6M | Cap NOI: $38.4M</span>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Revenue listing table */}
                <div className="xl:col-span-2 overflow-x-auto">
                  <table className="w-full text-left font-mono text-[10px] border-collapse">
                    <thead>
                      <tr className="text-[#8B9BAE] border-b border-[#1A2540]/40 text-[9px] uppercase">
                        <th className="p-2">Revenue Category</th>
                        <th className="p-2">Underlying Performance Driver</th>
                        <th className="p-2">Annual Rev</th>
                        <th className="p-2">Margin</th>
                        <th className="p-2 text-right">Net NOI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueStreams.map((item, idx) => (
                        <tr key={idx} className="border-b border-[#1A2540]/20 hover:bg-[#111827]">
                          <td className="p-2 text-white font-sans font-medium">{item.stream}</td>
                          <td className="p-2 text-[#8B9BAE]">{item.driver}</td>
                          <td className="p-2 text-white font-sans">${item.rev.toFixed(1)}M</td>
                          <td className="p-2 text-[#8B9BAE]">{item.margin}</td>
                          <td className="p-2 text-right text-[#00D9B5] font-sans font-bold">${item.noi.toFixed(1)}M</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Return metrics & DSCR ratios */}
                <div className="space-y-4 font-mono text-[10px] bg-[#050A18]/80 p-4 border border-[#1A2540]/50 rounded">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider block border-b border-[#1A2540]/40 pb-1">
                    Financial Returns &amp; DSCR Coverage
                  </span>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#8B9BAE]">NOI Yield on Cost:</span>
                      <span className="text-white">3.8% (Base Case)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B9BAE]">Blended Exit Cap Rate:</span>
                      <span className="text-white">4.0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B9BAE]">Stabilized Exit Value:</span>
                      <span className="text-[#00D9B5] font-bold">$960M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B9BAE]">Project Equity Multiple (10yr):</span>
                      <span className="text-white">1.2x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8B9BAE]">Levered Internal IRR (Est):</span>
                      <span className="text-amber-400 font-bold">14.2%</span>
                    </div>
                  </div>

                  <div className="border-t border-[#1A2540]/40 pt-3 space-y-2">
                    <span className="text-[8.5px] font-bold text-white uppercase block">
                      Debt Service Coverage Ratios (DSCR)
                    </span>
                    <div className="space-y-1 text-[9px]">
                      <div className="flex justify-between text-white border-b border-[#1A2540]/10 py-1">
                        <span>Year 1 (Noi: $4.2M)</span>
                        <span className="text-rose-500 font-bold">0.19x (IO Period)</span>
                      </div>
                      <div className="flex justify-between text-[#8B9BAE] border-b border-[#1A2540]/10 py-1">
                        <span>Year 2 (Noi: $12.8M)</span>
                        <span>0.57x</span>
                      </div>
                      <div className="flex justify-between text-[#8B9BAE] border-b border-[#1A2540]/10 py-1">
                        <span>Year 3 (Noi: $22.4M)</span>
                        <span>0.80x</span>
                      </div>
                      <div className="flex justify-between text-[#8B9BAE] border-b border-[#1A2540]/10 py-1">
                        <span>Year 4 (Noi: $31.0M)</span>
                        <span>1.11x (Nearly met)</span>
                      </div>
                      <div className="flex justify-between text-emerald-400 border-b border-[#1A2540]/10 py-1">
                        <span>Year 5 (Noi: $38.4M)</span>
                        <span className="font-bold">1.20x (Covenant met)</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* TAB 3: MICROGRID & CAMPUS ENERGY LOADS */}
        {activeTab === "POWER" && (
          <div className="space-y-6">
            <div className="border-b border-[#1A2540]/60 pb-3">
              <h3 className="text-sm font-bold text-white font-sans uppercase flex items-center gap-2">
                <Zap size={16} className="text-amber-400" />
                Decentralized EnerGenius Microgrid & Energy Demand Architecture
              </h3>
              <span className="text-[10px] text-[#8B9BAE] font-sans block mt-1">
                Engineering model targeting 65-80% energy self-sufficiency via cogeneration turbines, solar arrays, and high-density battery storage.
              </span>
            </div>

            {/* Quick Summary Panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded border border-amber-400/20 bg-amber-400/5 font-mono text-xs text-left">
                <span className="text-[#8B9BAE] text-[8.5px] uppercase block mb-1">Decentralized Generation Target</span>
                <span className="text-lg font-bold text-amber-400">7 MW Baseload + 3.5-5.0 MW Solar</span>
                <p className="text-[10px] text-[#8B9BAE] mt-1 font-sans leading-relaxed">CHP natural gas turbines recycle thermal exhaust into absorption chillers for campus climate cooling.</p>
              </div>
              <div className="p-4 rounded border border-[#00D9B5]/20 bg-[#00D9B5]/5 font-mono text-xs text-left">
                <span className="text-[#8B9BAE] text-[8.5px] uppercase block mb-1">Lithium Battery Buffer</span>
                <span className="text-lg font-bold text-[#00D9B5]">8-12 MWh LFP Storage</span>
                <p className="text-[10px] text-[#8B9BAE] mt-1 font-sans leading-relaxed">Dedicated microgrid storage buffers data center peak-shaving workloads and handles overnight solar bridging.</p>
              </div>
              <div className="p-4 rounded border border-blue-500/20 bg-blue-500/5 font-mono text-xs text-left">
                <span className="text-[#8B9BAE] text-[8.5px] uppercase block mb-1">Island Isolation Resilience</span>
                <span className="text-lg font-bold text-blue-400">72+ Hour Standalone Ops</span>
                <p className="text-[10px] text-[#8B9BAE] mt-1 font-sans leading-relaxed">Critical systems (subterranean Vault treasury, Neural Block data halls, BSL-2 labs) bypass macro failures.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* IT, Mfg, and Lighting Load Category breakdown */}
              <div className="bg-[#050A18]/40 border border-[#1A2540]/60 rounded p-4 font-mono text-[10px], space-y-4">
                <h4 className="text-[11px] font-mono uppercase text-white tracking-wider border-b border-[#1A2540]/40 pb-2">
                  Campus Peak Energy Load Category Breakdown (8.2 - 15.8 MW Range)
                </h4>
                <div className="space-y-4 text-[10px] font-mono">
                  {energyLoads.map((l, idx) => (
                    <div key={idx} className="border-b border-[#1A2540]/20 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-1 text-white">
                        <div>
                          <span className="font-sans font-bold block text-[11px]">{l.cat}</span>
                          <span className="text-[9px] text-[#8B9BAE]">{l.driver}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[#00D9B5] font-bold block">{l.peak} Peak</span>
                          <span className="text-[8.5px] text-zinc-400">{l.annual} kWh/yr</span>
                        </div>
                      </div>
                      <p className="text-[9.5px] text-[#8B9BAE] font-sans leading-relaxed">{l.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Energenius Plant Elements */}
              <div className="bg-[#050A18]/40 border border-[#1A2540]/60 rounded p-4 space-y-4">
                <h4 className="text-[11px] font-mono uppercase text-white tracking-wider border-b border-[#1A2540]/40 pb-2">
                  EnerGenius Power Plant Components &amp; Cost Estimates
                </h4>
                <div className="space-y-3.5 text-[9.5px] font-mono">
                  {microgridStructures.map((m, idx) => (
                    <div key={idx} className="flex gap-3 justify-between items-start border-b border-[#1A2540]/10 pb-3 last:border-0 last:pb-0">
                      <div className="space-y-0.5">
                        <span className="font-bold text-white block text-[10.5px]">{m.system}</span>
                        <span className="text-amber-400 block font-semibold text-[10px]">{m.spec}</span>
                        <span className="text-[#8B9BAE] block font-sans text-[10px] leading-relaxed">{m.role}</span>
                      </div>
                      <span className="text-[#00D9B5] font-bold text-[10.5px] shrink-0">{m.cost}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: SITE INFRASTRUCTURE & CONSTRUCTION PERMIT RISKS */}
        {activeTab === "SITE" && (
          <div className="space-y-6">
            <div className="border-b border-[#1A2540]/60 pb-3">
              <h3 className="text-sm font-bold text-white font-sans uppercase flex items-center gap-2">
                <Grid size={16} className="text-violet-500" />
                Civil Infrastructure Budgets, Land Entitlements &amp; Timeline Phases
              </h3>
              <span className="text-[10px] text-[#8B9BAE] font-sans block mt-1 font-bold">
                Civil works, environmental permits, structural phases and master Go/No-Go milestones.
              </span>
            </div>

            {/* Sub-grid: Site cost estimates vs Regulatory approvals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Site Costs details */}
              <div className="bg-[#050A18]/40 border border-[#1A2540]/60 rounded p-4 space-y-4">
                <h4 className="text-[11px] font-mono uppercase text-white tracking-wider border-b border-[#1A2540]/40 pb-2">
                  Columbus Civil, Grading, Utilities &amp; Infrastructure Budgets
                </h4>
                <div className="overflow-x-auto text-[9.5px] font-mono">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#1A2540] text-[#8B9BAE]">
                        <th className="py-2">Category</th>
                        <th className="py-2">Construction Scope</th>
                        <th className="py-2">Low</th>
                        <th className="py-2">Base Case</th>
                        <th className="py-2 text-right">High</th>
                      </tr>
                    </thead>
                    <tbody>
                      {siteCosts.map((s, idx) => (
                        <tr key={idx} className="border-b border-[#1A2540]/10 hover:bg-[#111827]">
                          <td className="py-2 text-white font-bold">{s.cat}</td>
                          <td className="py-2 text-[#8B9BAE] font-sans">{s.scope}</td>
                          <td className="py-2 text-[#8B9BAE]">${s.low.toFixed(1)}M</td>
                          <td className="py-2 text-[#D4A843] font-bold">${s.base.toFixed(1)}M</td>
                          <td className="py-2 text-right text-[#00D9B5]">${s.high.toFixed(1)}M</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Permits Regulatory framework 4.1 */}
              <div className="bg-[#050A18]/40 border border-[#1A2540]/60 rounded p-4 space-y-4">
                <h4 className="text-[11px] font-mono uppercase text-[#EF4444] tracking-wider border-b border-[#1A2540]/40 pb-2 flex items-center gap-1.5 font-bold">
                  <AlertTriangle size={12} />
                  Regulatory Permit Hurdles &amp; Entitlements Framework
                </h4>
                <div className="space-y-4">
                  <div className="p-3 bg-[#EF4444]/5 border border-[#EF4444]/25 rounded text-[10.5px] leading-relaxed text-[#FF5A5A] font-sans">
                    <strong>PUD REZONING IMPEDIMENT:</strong> The 180-acre Columbus campus integrates medical centers, industrial fabrication, large-scale data halls, drone launchports, and public squares. This triggers a municipal <strong>Planned Unit Development (PUD)</strong> review. Allow 12-18 months buffer starting in Phase 0.
                  </div>

                  <div className="overflow-x-auto text-[9.5px] font-mono">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-[#1A2540] text-[#8B9BAE]">
                          <th className="py-1 pb-2">Agency Authority</th>
                          <th className="py-1 pb-2">Requirement Description</th>
                          <th className="py-1 pb-2">Timeline Buffer</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#1A2540]/10">
                          <td className="py-2 text-white font-bold">U.S. Army Corps</td>
                          <td className="py-2 text-[#8B9BAE] font-sans">Section 404 Wetland drainage disturbance permit</td>
                          <td className="py-2 text-amber-400 font-bold">6-18 Months</td>
                        </tr>
                        <tr className="border-b border-[#1A2540]/10">
                          <td className="py-2 text-white font-bold">Ohio EPA</td>
                          <td className="py-2 text-[#8B9BAE] font-sans">Water pollutant mitigation permit (NPDES)</td>
                          <td className="py-2 text-amber-400">45-60 Days</td>
                        </tr>
                        <tr className="border-b border-[#1A2540]/10">
                          <td className="py-2 text-white font-bold">Ohio EPA Dept</td>
                          <td className="py-2 text-[#8B9BAE] font-sans">Air Permit to Install (PTI) emergency generator exhaust</td>
                          <td className="py-2 text-amber-400">3-9 Months</td>
                        </tr>
                        <tr className="border-b border-[#1A2540]/10">
                          <td className="py-2 text-white font-bold">Ohio Dept of Health</td>
                          <td className="py-2 text-[#8B9BAE] font-sans">BSL-2 Lab certifications for biotech diagnostics</td>
                          <td className="py-2 text-amber-400">90-180 Days</td>
                        </tr>
                        <tr className="border-b border-[#1A2540]/10">
                          <td className="py-2 text-white font-bold">FAA (Part 107 / LAANC)</td>
                          <td className="py-2 text-[#8B9BAE] font-sans">Rooftop drone flight &amp; commercial route waiver</td>
                          <td className="py-2 text-emerald-400">Instant / 90 Days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>

            {/* Phased implementation timeline phases */}
            <div className="bg-[#050A18]/40 border border-[#1A2540]/60 rounded p-4 space-y-4">
              <h4 className="text-[11px] font-mono uppercase text-white tracking-wider border-b border-[#1A2540]/40 pb-2 flex items-center justify-between">
                <span>Master Deployment 10-Year Phased Timeline</span>
                <span className="text-[#8B9BAE] text-[10px]">Zero operations jump-start sequence</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {timelinePhases.slice(0, 5).map((t, idx) => (
                  <div key={idx} className="p-3 rounded border border-[#1A2540] bg-[#050A18] flex flex-col justify-between text-[10px] font-mono space-y-2">
                    <div>
                      <div className="flex justify-between items-center border-b border-[#1A2540]/30 pb-1.5 mb-2">
                        <span className="text-[#00D9B5] font-bold">{t.phase}</span>
                        <span className="text-[#8B9BAE] text-[9.5px]">{t.calendar}</span>
                      </div>
                      <span className="text-white font-bold font-sans block mb-1 text-[11px]">{t.name}</span>
                      <p className="text-[9.5px] text-[#8B9BAE] font-sans leading-normal line-clamp-4" title={t.deliverables}>
                        {t.deliverables}
                      </p>
                    </div>
                    <div className="border-t border-[#1A2540]/20 pt-1.5 text-right">
                      <span className="text-[#D4A843] font-bold">{t.capital} Cap</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: OPERATIONS & SECURITY ZONE PROTOCOLS */}
        {activeTab === "SECURITY" && (
          <div className="space-y-6">
            <div className="border-b border-[#1A2540]/60 pb-3">
              <h3 className="text-sm font-bold text-white font-sans uppercase flex items-center gap-2">
                <Shield size={16} className="text-violet-500" />
                Physical Operations &amp; Security Zone Classification Architecture
              </h3>
              <span className="text-[10px] text-[#8B9BAE] font-sans block mt-1 font-bold">
                Governance, staff FTE allocations and secure zone biometric perimeter levels.
              </span>
            </div>

            {/* Split panel details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Security Level zone tables 6.2 */}
              <div className="bg-[#050A18]/40 border border-[#1A2540]/60 rounded p-4 space-y-4">
                <h4 className="text-[11px] font-mono uppercase text-white tracking-wider border-b border-[#1A2540]/40 pb-2">
                  Campus Perimeter Security Zone Architecture (Aegis Protocols)
                </h4>
                <div className="space-y-4">
                  {securityZones.map((sz, idx) => (
                    <div key={idx} className="border-b border-[#1A2540]/20 pb-3.5 last:border-0 last:pb-0 font-mono text-[9.5px]">
                      <div className="flex justify-between items-center text-white mb-1">
                        <span className="font-bold text-[10.5px] flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${sz.level === "Zone 3" ? "bg-rose-500 animate-ping" : sz.level === "Zone 0" ? "bg-emerald-400" : "bg-[#D4A843]"}`} />
                          {sz.level} — {sz.type}
                        </span>
                        <span className="text-[9px] text-[#8B9BAE] border border-[#1A2540] px-1.5 py-0.5 rounded uppercase font-bold">{sz.protocol}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 my-1.5 font-sans text-[10px] text-white">
                        <div><strong className="text-[#8B9BAE] font-mono text-[8.5px] uppercase block">Assigned structures</strong> {sz.locations}</div>
                        <div><strong className="text-[#8B9BAE] font-mono text-[8.5px] uppercase block">Control access mechanism</strong> {sz.method}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operations Personnel & budget summaries 6.1 & 6.3 */}
              <div className="bg-[#050A18]/40 border border-[#1A2540]/60 rounded p-4 space-y-5">
                <h4 className="text-[11px] font-mono uppercase text-white tracking-wider border-b border-[#1A2540]/40 pb-2">
                  Stabilized Personnel &amp; Campus Operating Budgets
                </h4>
                
                {/* Operations personnel counts */}
                <div className="space-y-2.5 font-mono text-[9.5px]">
                  <span className="text-[8.5px] font-bold text-[#00D9B5] uppercase block tracking-wider">Operational Roles &amp; Staffing Estimates</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[#8B9BAE] block uppercase text-[8px]">Campus Operations (Parent)</span>
                      <span className="text-white text-xs font-bold font-sans">3 Directors · Core</span>
                    </div>
                    <div>
                      <span className="text-[#8B9BAE] block uppercase text-[8px]">Facilities Maintenance Services</span>
                      <span className="text-white text-xs font-bold font-sans">22 - 35 FTE Core</span>
                    </div>
                    <div>
                      <span className="text-[#EF4444] block uppercase text-[8px] font-bold">Obsidian Arc Tactical Security</span>
                      <span className="text-[#EF4444] text-xs font-bold font-sans">30 - 50 Officers</span>
                    </div>
                    <div>
                      <span className="text-[#8B9BAE] block uppercase text-[8px]">IT / Network Ops Engineers</span>
                      <span className="text-white text-xs font-bold font-sans">8 - 14 Network Specialists</span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-[#111827] rounded border border-[#1A2540]/40 text-center">
                    <span className="text-white">Aggregated Direct Personnel: <strong className="text-[#00D9B5]">97 - 160 Operating FTEs</strong></span>
                  </div>
                </div>

                {/* Operating Opex table */}
                <div className="space-y-2 font-mono text-[9.5px]">
                  <span className="text-[8.5px] font-bold text-amber-400 uppercase block tracking-wider">Annual Campus Operating Budget Opex (Year 5)</span>
                  <div className="p-4 bg-[#050A18] rounded border border-[#1A2540] space-y-2.5 text-[9px]">
                    <div className="flex justify-between border-b border-[#1A2540]/20 pb-1">
                      <span className="text-[#8B9BAE]">Facilities Maintenance:</span>
                      <span className="text-white">$4.2M - $6.0M</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A2540]/20 pb-1">
                      <span className="text-[#8B9BAE]">Obsidian Arc Armed Security:</span>
                      <span className="text-white font-semibold text-[#FF5A5A]">$4.8M - $7.2M</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A2540]/20 pb-1">
                      <span className="text-[#8B9BAE]">Net Energy Utilities:</span>
                      <span className="text-white">$6.5M - $10.0M</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A2540]/20 pb-1">
                      <span className="text-[#8B9BAE]">Security / IT Network Ops:</span>
                      <span className="text-white">$2.4M - $3.6M</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A2540]/20 pb-1">
                      <span className="text-[#8B9BAE]">Administrative &amp; Insurance Corp:</span>
                      <span className="text-white">$4.5M - $7.5M</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A2540]/20 pb-1">
                      <span className="text-[#8B9BAE]">Reserve Replacement Fund:</span>
                      <span className="text-white">$1.5M - $2.5M</span>
                    </div>
                    <div className="flex justify-between pt-1 font-bold text-[#00D9B5] text-[10px]">
                      <span>AGGR ESTIMATED OPEX:</span>
                      <span>$28.3M - $44.0M / YEAR</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 6: GLYPH FORGE PRODUCTION ZOONES & SUPPLY CHAIN */}
        {activeTab === "PRODUCTION" && (
          <div className="space-y-6">
            <div className="border-b border-[#1A2540]/60 pb-3">
              <h3 className="text-sm font-bold text-white font-sans uppercase flex items-center gap-2">
                <Cpu size={16} className="text-emerald-400" />
                Binary Loom owned Glyph Forge Works Production Zones
              </h3>
              <span className="text-[10px] text-[#8B9BAE] font-sans block mt-1 font-bold">
                Small-batch fabrication bays delivering physical integrations for all 20 company divisions.
              </span>
            </div>

            {/* Subgrid of bays 7.1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mfgZones.map((mz, idx) => (
                <div key={idx} className="p-4 bg-[#050A18] border border-[#1A2540] rounded flex flex-col justify-between text-[10px] font-mono space-y-3">
                  <div>
                    <span className="text-[#00D9B5] font-bold uppercase block border-b border-[#1A2540]/40 pb-1 mb-2 tracking-wider">
                      {mz.zone}
                    </span>
                    <div className="space-y-2 text-white">
                      <div>
                        <strong className="text-[#8B9BAE] text-[8px] uppercase block mb-0.5">Primary Machinery</strong>
                        <span className="font-sans leading-relaxed block text-[10px]">{mz.equipment}</span>
                      </div>
                      <div>
                        <strong className="text-[#8B9BAE] text-[8px] uppercase block mb-0.5">Physical Output Category</strong>
                        <span className="font-sans leading-relaxed block text-zinc-300 text-[10px]">{mz.output}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-[#1A2540]/20 pt-2 bg-[#0A0F1E]/50 rounded p-1.5 text-center mt-2">
                    <span className="text-[#D4A843] font-bold text-[9px]">Throughput Limit: {mz.throughput}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Division requirements matrix and supply chain inputs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              
              {/* Raw supplies and vendor details 7.3 */}
              <div className="bg-[#050A18]/40 border border-[#1A2540]/60 rounded p-4 space-y-3 font-mono text-[9.5px]">
                <h4 className="text-[11px] font-mono uppercase text-white tracking-wider border-b border-[#1A2540]/40 pb-2">
                  Glyph Forge Raw Materials &amp; Supply Chain Pipeline
                </h4>
                <div className="space-y-3.5">
                  <div className="border-b border-[#1A2540]/10 pb-2 flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white block text-[10px]">3D Modeling Filaments</span>
                      <span className="text-[8px] text-[#8B9BAE] uppercase font-bold">PLA, PETG, TPU, ASA, Carbon Fiber PLA</span>
                      <span className="text-zinc-400 block font-sans text-[10px] mt-0.5">Domestic filament distributors &amp; direct manufacturer relations.</span>
                    </div>
                    <span className="text-emerald-400 font-bold block shrink-0">90-Day Buffer</span>
                  </div>

                  <div className="border-b border-[#1A2540]/10 pb-2 flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white block text-[10px]">Textiles &amp; Blanks</span>
                      <span className="text-[8px] text-[#8B9BAE] uppercase font-bold">Lab coats, hoodies, cotton tees, tactical vests</span>
                      <span className="text-zinc-400 block font-sans text-[10px] mt-0.5">Wholesale apparel blanks (Columbus area regional suppliers).</span>
                    </div>
                    <span className="text-emerald-400 font-bold block shrink-0">Low Hazard</span>
                  </div>

                  <div className="border-b border-[#1A2540]/10 pb-2 flex justify-between items-start">
                    <div>
                      <span className="font-bold text-[#EF4444] block text-[10px]">High-Tier Electronic Integrated Circuits</span>
                      <span className="text-[8px] text-[#8B9BAE] uppercase font-bold">MCU boards, BLE transmitters, smart haptic sensors, print PCBs</span>
                      <span className="text-zinc-400 block font-sans text-[10px] mt-0.5">Digikey, Mouser Electronics, JLCPCB customized PCBs.</span>
                    </div>
                    <span className="text-[#EF4444] font-bold block shrink-0">60-Day Buffer</span>
                  </div>
                </div>
              </div>

              {/* Division matrix requirements 7.2 */}
              <div className="bg-[#050A18]/40 border border-[#1A2540]/60 rounded p-4 space-y-3 font-mono text-[9.5px]">
                <h4 className="text-[11px] font-mono uppercase text-white tracking-wider border-b border-[#1A2540]/40 pb-2">
                  Division Physical Fabrications Requirements Matrix
                </h4>
                <div className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#1A2540] pr-1 text-[9.5px]">
                  <div className="flex justify-between border-b border-[#1A2540]/10 py-1.5">
                    <span className="text-white font-bold font-sans">D-01 ZenFlow</span>
                    <span className="text-[#8B9BAE] text-[10px]">Edge compute enclosures, labels, tags</span>
                    <span className="text-[#00D9B5] font-bold">Standard</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1A2540]/10 py-1.5">
                    <span className="text-white font-bold font-sans">D-03 The Collective</span>
                    <span className="text-[#8B9BAE] text-[10px]">Participant presentation kits, merchandise</span>
                    <span className="text-[#00D9B5] font-bold">Standard</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1A2540]/10 py-1.5">
                    <span className="text-white font-bold font-sans">D-04 Hybrid Living</span>
                    <span className="text-[#8B9BAE] text-[10px]">Student onboarding gear, learning badges</span>
                    <span className="text-[#00D9B5] font-bold">Standard</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1A2540]/10 py-1.5">
                    <span className="text-white font-bold font-sans">D-05 Terra Axis</span>
                    <span className="text-[#8B9BAE] text-[10px]">Drone cases, micro-housing fixtures</span>
                    <span className="text-[#00D9B5] font-bold">Standard</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1A2540]/10 py-1.5">
                    <span className="text-white font-bold font-sans">D-06 Vital Helix</span>
                    <span className="text-[#EC4899] font-bold text-[10px]">Biosensor shells, BSL lab coats</span>
                    <span className="text-[#EC4899] font-bold">Aegis Review</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1A2540]/10 py-1.5">
                    <span className="text-white font-bold font-sans">D-09 Kinetic Edge</span>
                    <span className="text-[#8B9BAE] text-[10px]">Athlete smart rings, bio-monitoring straps</span>
                    <span className="text-[#00D9B5] font-bold">Standard</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1A2540]/10 py-1.5">
                    <span className="text-[#EF4444] font-bold font-sans">D-10 Obsidian Arc</span>
                    <span className="text-[#8B9BAE] text-[10px]">Biometric locks, guard badge pods</span>
                    <span className="text-[#00D9B5] font-bold">Standard</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1A2540]/10 py-1.5">
                    <span className="text-[#8B5CF6] font-bold font-sans">D-13 Eon Core</span>
                    <span className="text-[#8B9BAE] text-[10px]">Longevity capsule bays, diagnostic dock shells</span>
                    <span className="text-[#EC4899] font-bold text-[10px]">Aegis Review</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
