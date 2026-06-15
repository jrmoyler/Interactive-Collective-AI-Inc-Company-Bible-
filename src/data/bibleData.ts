import {
  Division,
  Leader,
  SynergyNode,
  PhysicalNode,
  Wearable,
  CampusFacility,
  OperatingRule,
  TechTool,
  MerchandiseLine
} from "../types/bible";

export const COMPANY_METADATA = {
  name: "Collective AI Inc",
  slogan: "Architecting a Humane Future",
  hq: "Columbus, Ohio",
  entity: "C-Corporation",
  engine: "ZenFlow-Powered",
  structure: "600-Agent Lattice",
  version: "Bible v1.0 (June 2026)",
  confidentiality: "CONFIDENTIAL | INTERNAL DISTRIBUTION ONLY | NOT FOR EXTERNAL REPRODUCTION"
};

export const LEADERS: Leader[] = [
  {
    name: "JR Moyler — Hataalii",
    title: "Co-Founder · CEO · Architect",
    domain: "Corporate Vision & Portfolio Architecture",
    notes: "Chief executive and chief architect. Owns the vision, portfolio structure, brand system, and operating philosophy. Public face or voice across Skool and internal/external comms. 7 years stock option trading experience. Wharton certified in digital assets and Dow Jones theory.",
    isFounder: true
  },
  {
    name: "Devon Scott",
    title: "Co-Founder · Kinetic Edge Lead",
    domain: "Kinetic Edge & Sports Science Execution",
    notes: "Co-founder and operational lead of Kinetic Edge (D-09). Devon's co-founder status applies at the parent-company level. Anchors the Kinetic Edge launch as primary sports science executor.",
    isFounder: true
  },
  {
    name: "Ahmad Mohammed",
    title: "CFO — Capital Architect",
    domain: "Portfolio Treasury & Investor Relations",
    notes: "Manages capital structure, investor interactions, capital events (from Seed to Series C+), and portfolio compliance.",
    isFounder: false
  },
  {
    name: "Justin Howell",
    title: "Chief Evangelist / Web3 Dev Lead / Quantum Ledger Lead",
    domain: "Growth, Web3, & Community Management",
    notes: "Runs FocusFlow Skool community. Leads Quantum Ledger (D-08). Not a founder.",
    isFounder: false
  },
  {
    name: "Kenza Dawkins",
    title: "Onboarding & Operations",
    domain: "Client Pipeline & Participant Operations",
    notes: "Primary entry point for corporate clients, participants, and cohort operations.",
    isFounder: false
  },
  {
    name: "Denzel McDougald",
    title: "AI Product Manager",
    domain: "Cross-Division Product Development",
    notes: "Coordinates the 30-agent cluster roadmap across divisions and ensures vertical integration paths from D-01.",
    isFounder: false
  },
  {
    name: "Dr. Joseph Johnson",
    title: "CLO · ZenFlow Division Lead",
    domain: "Legal, AI Governance & SEC Compliance",
    notes: "Chief legal officer. Runs ZenFlow (D-01). Issues all SEC clearances. Core authority for the Aegis Protocol gating. Under no circumstances is Helios Grid (D-05) deployed without his written clearance.",
    isFounder: false
  },
  {
    name: "Arthur Fayne",
    title: "Senior Strategic Advisor",
    domain: "External Strategy Advisory Layer",
    notes: "Advises founders and team on cross-border operations, commercial partnerships, and governmental relations.",
    isFounder: false
  },
  {
    name: "Stanley Constant",
    title: "Civic Core Fiduciary & Partner",
    domain: "Non-Profit Mission Integrity",
    notes: "Holds independent veto authority over all Civic Core and participant data decisions. Structural and permanent, cannot be overridden by executive leadership. Ever.",
    isFounder: false
  }
];

export const CORPO_SECTIONS = [
  {
    title: "Legal Entity",
    desc: "C-Corporation registered in Ohio. All 20 divisions operate as units of the parent entity unless otherwise noted."
  },
  {
    title: "Headquarters",
    desc: "Columbus, Ohio"
  },
  {
    title: "Architecture",
    desc: "20 Departments + 20 Digital Synergy Nodes + 20 Physical Synergy Nodes + 600-Agent ZenFlow Lattice"
  },
  {
    title: "Special Entity",
    desc: "Civic Core (Division 11) is a 501(c)(3) Non-Profit, funded solely by portfolio profits. Stanley Constant holds independent veto over Civic Core decisions."
  },
  {
    title: "Active Stack (Jun 2026)",
    desc: "Lovable / Next.js / React / Supabase / Vercel"
  },
  {
    title: "Active Hold Constraint",
    desc: "HELIOS GRID (Terra Axis D-05): SEC legal dependency active. Zero deployment. Zero client communication."
  }
];

export const DIVISIONS: Division[] = [
  {
    id: "D-01",
    name: "ZenFlow",
    subtitle: "AI R&D; & Central Nervous System — The Intelligence Behind Everything",
    accentName: "Neural Violet + Electric Blue",
    accentHex: "#7C3AED",
    launchYear: "Year 1 — Active",
    tagline: "The intelligence layer powering all 20 divisions.",
    products: [
      "Zenith OS (Agent Operating System)",
      "Aegis Protocol (Safety & Governance Framework)",
      "ZenFlow Agent Foundry (Builder Platform)",
      "ZenFlow Marketplace (Solo Blueprint $1,250-$3,500, Growth $12K-$45K, Enterprise $150K-$500K+)",
      "Knowledge Keeper (Shared Cross-Portfolio Memory)",
      "ZenFlow API (Developer REST API)",
      "30-Agent Division Lattice Standard"
    ],
    services: [
      "ZenFlow Enterprise Licensing",
      "Custom Agent Architecture Consulting",
      "Aegis Protocol Certification",
      "Agent Training & Fine-Tuning",
      "ZenFlow Implementation Consulting (via The Collective)"
    ],
    technologyStack: [
      "Anthropic Claude API (claude-sonnet-4-20250514)",
      "FastAPI",
      "LangGraph / LangChain",
      "n8n (150+ workflows)",
      "PostgreSQL + pgvector",
      "Redis",
      "Docker",
      "JWT + API Key Auth",
      "OpenAPI/Swagger",
      "Microsoft AutoGen"
    ],
    revenueModel: "SaaS licensing (Marketplace tiers) + API usage fees + enterprise licensing + consulting",
    synergyNodes: [
      "All 20 Synergy Nodes — ZenFlow is the intelligence backbone of the entire lattice"
    ]
  },
  {
    id: "D-02",
    name: "The Collective",
    subtitle: "Expert AI Consulting — Strategy. Implementation. Transformation.",
    accentName: "Matte Gold",
    accentHex: "#D4A843",
    launchYear: "Year 1 — Active",
    tagline: "The revenue engine. Validates ZenFlow models in real-world enterprise environments.",
    products: [
      "AI Readiness Audit (1-3 day intensive)",
      "AI Strategy Session Package",
      "AI Workforce Transformation Program (enterprise L&D;)",
      "Ethical AI Framework Development",
      "Data Science Acceleration Services",
      "Change Management Intelligence Program (with Cognara Mind)"
    ],
    services: [
      "AI Strategy Consulting — executive-level advisory",
      "AI Implementation Support — hands-on deployment",
      "AI Governance Consulting — policy, ethics, compliance",
      "Data Science Consulting — fractional team",
      "Workforce AI Training — enterprise-wide literacy",
      "AI Vendor Assessment — independent evaluation",
      "ZenFlow Enterprise Onboarding — managed client migration"
    ],
    technologyStack: [
      "Anthropic Claude API",
      "Notion (deliverables + knowledge base)",
      "Google Workspace / Microsoft 365",
      "Zoom/Teams",
      "HubSpot CRM",
      "Stripe",
      "Loom",
      "Miro",
      "Calendly",
      "Docusign"
    ],
    revenueModel: "Project-based consulting fees + retainer contracts + ZenFlow implementation packages",
    synergyNodes: [
      "Founder Ark (SN-06)",
      "Oracle Relay (SN-04)",
      "Signal Court (SN-07)",
      "Cognara Consulting Kit (SYN-09)"
    ]
  },
  {
    id: "D-03",
    name: "Hybrid Living",
    subtitle: "EdTech & AI Education — Learn to build alongside AI.",
    accentName: "Learning Amber",
    accentHex: "#F59E0B",
    launchYear: "Year 1 — Active",
    tagline: "The flagship education division. Trains humans to work alongside AI.",
    products: [
      "Atlas Platform (AI-personalized LMS — Next.js/React/Supabase/Vercel; LMS features via custom build + Teachable/Thinkific API fallback; community via Skool)",
      "P.E.T.E.E.R. Framework (Practice, Experimentation, Theory, Engagement, Evaluation, Reflection — pedagogical backbone)",
      "AI Fundamentals Course (entry-level prompt engineering, tool adoption, workflow automation, AI ethics)",
      "Creator Track Certification (AI image gen, video production, audio, social content automation, creator business)",
      "Collective Intelligence Skool Community / Focus Flow (managed by Justin Howell)",
      "AI Certification Program (stackable: AI Fundamentals, AI Implementation Specialist, AI Architect — blockchain credential via Quantum Ledger)",
      "Corporate AI Training Track (enterprise L&D; white-label; SCORM export; custom admin dashboard)"
    ],
    services: [
      "AI curriculum design for individuals and enterprises",
      "Corporate AI training licensing",
      "Civic Core scholarship coordination for underserved learners",
      "P.E.T.E.E.R. framework licensing to educational institutions",
      "Community management and content programming for Focus Flow Skool",
      "Creator Track mentorship and cohort facilitation"
    ],
    technologyStack: [
      "Skool",
      "Teachable/Thinkific",
      "Vimeo",
      "Notion",
      "Circle.so",
      "CapCut/DaVinci Resolve",
      "Nano Banana 2",
      "Kling",
      "Lyria 3",
      "Stripe",
      "ConvertKit/Klaviyo",
      "Zapier/n8n",
      "ZenFlow (pedagogical simulation layer)"
    ],
    revenueModel: "Course sales + subscription membership + corporate licensing + certification fees",
    synergyNodes: [
      "Ascension Campus (SN-02)",
      "Kinetic Scholar (SN-05)",
      "Herald Campus Kiosk (SYN-04)",
      "Signal Cohort Badge (SYN-15)"
    ]
  },
  {
    id: "D-04",
    name: "Nexus Labs",
    subtitle: "Media, Entertainment & Creative — The Storyteller of the Collective AI Ecosystem",
    accentName: "Creative Crimson",
    accentHex: "#DC2626",
    launchYear: "Year 1 — Active",
    tagline: "Top-of-funnel for every other division. Produces content, manages community.",
    products: [
      "Creator Nexus Platform (creator commerce — Next.js/React; Stripe Connect; Cloudinary; ZenFlow content intelligence)",
      "The Collective Times (flagship media brand — Beehiiv/Substack newsletter; Claude API for content drafts)",
      "Nexus Studios (full-service AI-augmented media production — podcasts, documentaries, short video)",
      "The Vibe Code Show (JR flagship content series — StreamYard/Riverside.fm)",
      "AI Content Engine (ZenFlow content production system — Claude API + n8n automation)"
    ],
    services: [
      "Content production for all 20 divisions",
      "Brand storytelling and media strategy for division launches",
      "Creator Nexus platform access for independent AI creators",
      "Collective Times editorial coverage and sponsored content",
      "Social media management and content distribution",
      "Podcast production and distribution services"
    ],
    technologyStack: [
      "DaVinci Resolve/CapCut",
      "Descript",
      "Riverside.fm / StreamYard",
      "Kling",
      "Nano Banana 2",
      "Lyria 3",
      "GPT Image 2",
      "Opus Clip",
      "Buffer/Later",
      "Beehiiv/Substack",
      "Canva/Figma",
      "Claude API",
      "n8n",
      "YouTube Studio",
      "Cloudinary"
    ],
    revenueModel: "Creator Nexus subscriptions + brand partnerships + sponsored content + production services + Collective Times advertising",
    synergyNodes: [
      "Resonance Media (SN-01)",
      "Ascension Campus (SN-02)",
      "Nexus Signal Broadcast Node (SYN-11)",
      "Resonance Compliance Rig (SYN-05)"
    ]
  },
  {
    id: "D-05",
    name: "Terra Axis",
    subtitle: "Intelligent Real Estate & Physical Infrastructure — The Physical Foundation of the Collective AI Ecosystem",
    accentName: "Infrastructure Blue",
    accentHex: "#2563EB",
    launchYear: "Year 2 — Building",
    tagline: "The physical layer. Smart buildings, PropTech, and hardware. HELIOS GRID IS BLOCKED — SEC legal hold.",
    products: [
      "Terra Vision (AI-powered property intelligence — Next.js/React; Supabase; Zillow/CoStar; Claude API; Mapbox)",
      "HomeHub (smart property management — React Native + Next.js; Supabase; Plaid; Twilio; Home Assistant API IoT)",
      "Axis Market (AI-curated real estate marketplace — MLS Bridge API; Next.js; Supabase; Stripe)",
      "Helios Grid (energy infrastructure platform — STATUS: BLOCKED — pending SEC legal opinion; IoT energy sensors + blockchain settlement)",
      "Smart Habitat System (IoT property integration — smart locks, climate, cameras, deployed in JR Columbus portfolio)"
    ],
    services: [
      "PropTech consulting",
      "Smart building integration",
      "Property portfolio AI analysis",
      "Real estate market intelligence",
      "Smart home system deployment for Terra Axis properties"
    ],
    technologyStack: [
      "Next.js / React",
      "Supabase",
      "Zillow/CoStar API",
      "Claude API",
      "Mapbox",
      "Plaid",
      "Twilio",
      "Home Assistant API",
      "MLS Bridge API",
      "IoT energy sensors",
      "Blockchain (Quantum Genesis)"
    ],
    revenueModel: "SaaS subscriptions (Terra Vision, HomeHub) + transaction fees (Axis Market) + consulting",
    synergyNodes: [
      "TerraMind (SN-14)",
      "Sovereign Assets (SN-15)",
      "Terra Habitat Sentinel (SYN-14)",
      "Terra Gaia Survey Drone (SYN-03)"
    ]
  },
  {
    id: "D-06",
    name: "Vital Helix",
    subtitle: "Health, Synthetic Biology & Neuro-Wellness — Precision health intelligence. Clinically credible.",
    accentName: "Teal + Vital Orange",
    accentHex: "#14B8A6",
    launchYear: "Year 4 — Series C",
    tagline: "Health intelligence division. Bio-Digital Twin, Neuro-Pulse, and Custom Script personalized medications. BSL-2 clean rooms on campus.",
    products: [
      "Bio-Digital Twin (health intelligence platform — Next.js; HIPAA FastAPI; ZenFlow/Claude API simulation; wearables APIs)",
      "Neuro-Pulse (brain health platform — React Native; EEG via Muse/OpenBCI; sleep via Oura/Whoop; Supabase cognitive tests)",
      "Custom Script (personalized medication/supplement compounding — HIPAA FastAPI; Claude review; REQUIRES physician co-signature; Juris Guard FDA layer)",
      "Vital Helix Patient App (consumer health app)",
      "Telehealth Platform (clinical service — video + async connecting users with co-signing physicians)"
    ],
    services: [
      "Bio-Digital Twin profiling",
      "Neuro-Pulse wellness programs",
      "Span Clinic patient services (campus)",
      "Genomics intelligence reports",
      "Personalized health coaching",
      "Longevity consultation (with Eon Core)"
    ],
    technologyStack: [
      "Next.js / React + FastAPI (HIPAA-compliant)",
      "ZenFlow/Claude API (Aegis-Review mandatory)",
      "Apple Health / Google Fit",
      "LabCorp / Quest API",
      "23andMe API",
      "Oura / Whoop APIs",
      "React Native",
      "Supabase HIPAA backend",
      "OpenBCI / Muse APIs"
    ],
    revenueModel: "Health platform subscriptions + Span Clinic clinical service fees + medication compounding fees",
    synergyNodes: [
      "BioSovereign (SN-13)",
      "Apex Recovery Station (SYN-02)",
      "Vital Neuro Wristband (SYN-19)",
      "Aurum Biosignal Band (SYN-07)"
    ]
  },
  {
    id: "D-07",
    name: "Binary Loom",
    subtitle: "Digital Infrastructure & Developer Tools — The Digital Fabric Everything Runs On",
    accentName: "Electric Teal",
    accentHex: "#00D9B5",
    launchYear: "Year 3 — Series B",
    tagline: "The infrastructure layer: Cloud, APIs, and Natural Script. Owns Binary Loom Manufacturing Foundry / Glyph Forge Works.",
    products: [
      "Binary Loom Cloud Platform (Kubernetes/Docker; AWS/GCP; Terraform IaC; Prometheus + Grafana)",
      "Natural Script (proprietary human-AI programming language — Python compiler/interpreter; VS Code extension; GitBook docs)",
      "Binary Loom API Gateway (Kong/AWS API Gateway; FastAPI service layer; Redis rate limiting; JWT auth; OpenAPI)",
      "Developer Tools Suite (CLI tools, SDKs, Natural Script SDK, ZenFlow integration libraries)",
      "Platform Observability Stack (OpenTelemetry; Prometheus + Grafana; ELK; Loki; Sentry; Docker)"
    ],
    services: [
      "Cloud infrastructure services for all 20 divisions",
      "API management and gateway services",
      "Developer tooling and SDK licensing",
      "DevOps consulting",
      "Manufacturing (Glyph Forge Works — apparel, hardware enclosures, 3D printing, electronics assembly, signage, packaging, robotics parts)"
    ],
    technologyStack: [
      "Kubernetes",
      "Docker",
      "AWS/GCP",
      "Terraform",
      "Prometheus + Grafana",
      "ELK/Loki",
      "Sentry",
      "Kong",
      "Redis",
      "JWT",
      "Python/Typer",
      "GitHub",
      "GitBook",
      "Bambu A1 (manufacturing)"
    ],
    revenueModel: "Cloud infrastructure fees + API gateway licensing + developer tool subscriptions + manufacturing revenue (Glyph Forge Works)",
    synergyNodes: [
      "Binary Forge Station (SYN-13)"
    ]
  },
  {
    id: "D-08",
    name: "Quantum Ledger",
    subtitle: "FinTech & Web3 — Financial Intelligence. On-Chain and Off.",
    accentName: "Quantum Purple",
    accentHex: "#8B5CF6",
    launchYear: "Year 2 — Active",
    tagline: "Financial intelligence and portfolio treasury infrastructure. Led by Justin Howell.",
    products: [
      "Quantum Wealth (consumer investment platform — React Native + Next.js web; Alpaca/Tradier; Coinbase/Binance; Claude API)",
      "Quantum Business (SMB financial intelligence — Next.js/React; Plaid; QuickBooks/Xero; Claude; Stripe billing)",
      "Quantum Alpha (trading intelligence — CIT v7.0 foundation, single HTML ~8,200 lines deployed on Vercel; 31 live API sources; Kelly Criterion position sizing)",
      "Quantum Genesis (Web3/blockchain — Solidity smart contracts; Hardhat; Ethers.js/Viem; IPFS; Alchemy/Infura; Vercel)",
      "Collective Intelligence Terminal CIT v7.0 (JR flagship financial intelligence terminal)"
    ],
    services: [
      "Retail investment platform access",
      "SMB financial management SaaS",
      "Institutional trading intelligence licensing",
      "Web3 infrastructure and smart contract deployment",
      "DeFi protocol intelligence",
      "Treasury management consulting"
    ],
    technologyStack: [
      "React Native",
      "Next.js / React",
      "Alpaca/Tradier",
      "Coinbase/Binance API",
      "Plaid",
      "QuickBooks/Xero API",
      "Claude API",
      "PostgreSQL",
      "Solidity",
      "Hardhat",
      "Ethers.js / Viem",
      "IPFS",
      "Alchemy/Infura",
      "Polymarket CLOB API",
      "MetaMask",
      "Phantom"
    ],
    revenueModel: "Platform subscriptions + trading intelligence licensing + Web3 infrastructure fees + consulting",
    synergyNodes: [
      "Quantum Commerce Grid (SN-03)",
      "Blackbox Citadel (SN-10)",
      "Quantum Signal Terminal (SYN-18)",
      "Aurum Biosignal Band (SYN-07)"
    ]
  },
  {
    id: "D-09",
    name: "Kinetic Edge",
    subtitle: "Sports Technology & Human Performance — Athletic data turned competitive advantage.",
    accentName: "Performance Green",
    accentHex: "#16A34A",
    launchYear: "Year 2 — Active",
    tagline: "Sports technology and human performance division. Co-founded with Devon Scott.",
    products: [
      "Apex System (elite athlete performance — React Native + Next.js; ZenFlow/Claude AI coaching; MediaPipe CV; wearables integration)",
      "TeamOS (team management intelligence — Next.js; Supabase; Claude API tactical analysis; video pipelines; Statsperform/Opta)",
      "Kinetic IQ (consumer performance app — React Native; ZenFlow coaching; MediaPipe camera movement analysis)",
      "MiroFish Analytics (JR proprietary sports analytics methodology — Python engine integrated into CIT v7.0; ESPN/The Odds/Statsperform APIs)",
      "Performance Science Research Platform (PubMed integration; Claude API research synthesis; findings in Notion)"
    ],
    services: [
      "Athlete performance consulting",
      "Team analytics and management SaaS",
      "Performance science research",
      "Sports technology system integration",
      "MiroFish sports intelligence data product"
    ],
    technologyStack: [
      "React Native / Next.js",
      "ZenFlow / Claude API",
      "MediaPipe",
      "Catapult / STATSports / Polar APIs",
      "Statsperform / Opta API",
      "ESPN / The Odds API",
      "Supabase",
      "Tableau / custom charts",
      "Python analytics"
    ],
    revenueModel: "SaaS platform subscriptions + consulting + data licensing + coaching programs",
    synergyNodes: [
      "Kinetic Scholar (SN-05)",
      "Eon Performance Lab (SYN-17)",
      "Apex Recovery Station (SYN-02)",
      "Apex Performance Band (D09-W01)"
    ]
  },
  {
    id: "D-10",
    name: "Obsidian Arc",
    subtitle: "Unified Cyber & Physical Security — The sentinel protecting the entire portfolio.",
    accentName: "Threat Orange",
    accentHex: "#EA580C",
    launchYear: "Year 3 — Series B",
    tagline: "Unified cyber and physical security. SOC operations, physical security systems, and red team. No division deploys without sign-off.",
    products: [
      "Obsidian SOC Platform (24/7 AI-powered SOC — Splunk/Elastic SIEM; Palo Alto XSOAR; CrowdStrike/VirusTotal; ZenFlow AI threat analysis)",
      "Cyber Threat Intelligence Platform (dark web monitoring, CVE, Shodan, MISP sharing, Python intelligence pipelines, Claude)",
      "Physical Security Intelligence System (OpenCV video analytics; ONVIF; Verkada/Milestone VMS; HID/Genetec access; ZenFlow anomaly)",
      "Red Team Operations Platform (Metasploit, Cobalt Strike, Burp Suite, GoPhish, detailed remediation reports)",
      "Security Awareness Training Platform (GoPhish phishing simulation; LMS SCORM)"
    ],
    services: [
      "Enterprise cybersecurity audit",
      "Physical security assessment",
      "SOC-as-a-Service",
      "Threat intelligence feed subscriptions",
      "Incident response retainer",
      "Red team penetration testing exercises",
      "Security awareness training programs"
    ],
    technologyStack: [
      "Splunk/Elastic SIEM",
      "Palo Alto XSOAR",
      "CrowdStrike",
      "VirusTotal",
      "AlienVault OTX",
      "Shodan/Censys",
      "MISP",
      "OpenCV",
      "ONVIF cameras",
      "Verkada / Milestone VMS",
      "ZenFlow/Claude API",
      "Metasploit / Burp Suite",
      "GoPhish"
    ],
    revenueModel: "Managed security services + SOC subscriptions + consulting + red team engagements + training programs",
    synergyNodes: [
      "Ghost Protocol (SN-08)",
      "Aegis Forge (SN-09)",
      "Signal Court (SN-07)",
      "Sentinel Guardian (SYN-01)",
      "Terra Habitat Sentinel (SYN-14)"
    ]
  },
  {
    id: "D-11",
    name: "Civic Core",
    subtitle: "Non-Profit 501(c)(3) — Digital Equity — Architecting equity alongside innovation.",
    accentName: "Hope Sky Blue",
    accentHex: "#7DD3FC",
    launchYear: "Year 3 — Portfolio-Funded",
    tagline: "The soul. Digital Equity, Community Creators, Non-Profit AI Incubator. Zero commercial revenue. Stanley Constant independent veto.",
    products: [
      "Digital Equity Initiative (flagship digital literacy workshops, device access, broadband support; Hybrid Living LMS; Airtable tracking)",
      "Community Creators Program (AI tools and training — Nexus Labs Creator Nexus platform access, Mailchimp, Airtable)",
      "Non-Profit AI Incubator (ZenFlow/The Collective implementation consulting at zero cost, workflow automation)",
      "Scholarship Program (full Hybrid Living scholarships, application in Airtable, outcomes tracked)",
      "Civic Core Annual Impact Report (annual public accountability document under Stanley Constant, reportlab PDF)"
    ],
    services: [
      "Digital literacy workshops",
      "Device access programs",
      "AI implementation for non-profits (zero cost)",
      "Grant writing support",
      "Community partnership management",
      "Impact reporting"
    ],
    technologyStack: [
      "Hybrid Living Atlas LMS",
      "Airtable",
      "Notion",
      "ZenFlow",
      "n8n",
      "Mailchimp",
      "Canva",
      "reportlab PDF",
      "Google Sheets / Apps Script"
    ],
    revenueModel: "ZERO commercial revenue — funded exclusively by parent portfolio profits. No external investment accepted.",
    synergyNodes: [
      "Civic Nervous System (SN-17)",
      "Herald Campus Kiosk (SYN-04)",
      "Civic Babel Kiosk (SYN-16)"
    ]
  },
  {
    id: "D-12",
    name: "Aether Link",
    subtitle: "Connectivity & Communications — Universal connectivity. Zero communication barriers.",
    accentName: "Signal Mint",
    accentHex: "#34D399",
    launchYear: "Year 3 — Series B",
    tagline: "Connectivity and communications: Mesh network, Babel AI translation, Truth Lens verification, Sky Net aerial, BCI R&D.",
    products: [
      "The Mesh Network (distributed mesh for rural/underserved communities — OpenWRT firmware; BATMAN-adv; Prometheus monitoring)",
      "Babel AI Translation Engine (real-time multilingual translation 100+ languages — Whisper API; Hugging Face NMT; Redis; WebSockets)",
      "Truth Lens (misinformation detection — Claude API claim analysis; custom ML classifier; Snopes/PolitiFact integration)",
      "Sky Net Infrastructure (satellite/aerial connectivity — Starlink API; UAV relay node firmware; ground control telemetry; Mapbox)",
      "Neuro-Bridge BCI (brain-computer interface R&D; — OpenBCI; MNE-Python; tracked via Juris Guard; 5-10 year horizon)"
    ],
    services: [
      "Mesh network deployment and management",
      "AI translation API licensing",
      "Content verification platform SaaS",
      "Satellite connectivity solutions",
      "BCI research partnerships with universities (MIT, Stanford, CMU)"
    ],
    technologyStack: [
      "OpenWRT / BATMAN-adv",
      "Whisper API",
      "Hugging Face NMT",
      "Claude API",
      "Snopes / PolitiFact API",
      "FastAPI / Redis",
      "WebSocket",
      "Starlink API",
      "Mapbox",
      "OpenBCI / MNE-Python"
    ],
    revenueModel: "Mesh network subscriptions + translation API licensing + content verification SaaS + satellite connectivity fees",
    synergyNodes: [
      "Civic Nervous System (SN-17)",
      "MythOS (SN-11)",
      "Aether Relay Drone (SYN-06)",
      "Civic Babel Kiosk (SYN-16)"
    ]
  },
  {
    id: "D-13",
    name: "Gaia Synthesis",
    subtitle: "AgriTech, Environmental Engineering & Synthetic Biology — Feeding the world. Healing the planet.",
    accentName: "Synthesis Green + Circuit Blue",
    accentHex: "#22C55E",
    launchYear: "Year 4 — Series C",
    tagline: "AgriTech and environmental division. Vertical farming, field robotics, food system intelligence. Eden Spire aeroponic tower on campus.",
    products: [
      "Gaia Urban Farming Platform (AI-powered vertical farming — IoT sensors via MQTT; React dashboard; Python FastAPI; AWS IoT Core)",
      "Field Intelligence Platform (precision agriculture — Planet/Sentinel-2 API; soil sensor IoT; drone fleets via ArduPilot; PostGIS)",
      "Environmental Intelligence Platform (ecosystem tracking, air/waste monitoring; InfluxDB; Grafana dashboards; QGIS/Mapbox)",
      "Carbon Intelligence Platform (carbon calculation — Verra/Gold Standard registry API; blockchain via Quantum Genesis; carbon tracking)",
      "Farm-to-Consumer Platform (direct crop marketplace — recommendation engine in Python; Mapbox; Stripe; connecting with CSA)"
    ],
    services: [
      "Urban farming consultation and system deployment",
      "Field robotics deployment and management",
      "Environmental monitoring network management",
      "Carbon accounting and credit documentation",
      "AgriTech implementation consulting",
      "Farm-to-consumer marketplace management"
    ],
    technologyStack: [
      "IoT sensors (MQTT)",
      "Python analytics + FastAPI",
      "AWS IoT Core",
      "Claude API",
      "Planet / Sentinel-2 API",
      "ArduPilot / DJI SDK",
      "PostgreSQL + PostGIS",
      "InfluxDB",
      "Grafana",
      "QGIS / Mapbox",
      "Verra / Gold Standard API"
    ],
    revenueModel: "Platform subscriptions + carbon credit documentation fees + marketplace transaction fees + consulting",
    synergyNodes: [
      "TerraMind (SN-14)",
      "Mecha Orchard (SN-19)",
      "Terra Gaia Survey Drone (SYN-03)",
      "Gaia Field Rover (SYN-10)"
    ]
  },
  {
    id: "D-14",
    name: "Vector Shift",
    subtitle: "Autonomous Logistics & Aerial Mobility — Moving things. Moving people. Intelligently.",
    accentName: "Velocity Silver",
    accentHex: "#CBD5E1",
    launchYear: "Year 3 — Series B",
    tagline: "Autonomous logistics and aerial mobility. Ground Vector, Sky Vector, last-mile route optimization. 20 verti-ports on campus.",
    products: [
      "Ground Vector Fleet (autonomous ground delivery — ROS2; PyTorch CV; SLAM via Cartographer; fleet management; React dashboard)",
      "Sky Vector Aerial Delivery (FAA-compliant drone delivery — ArduPilot/PX4; FAA DroneZone API; DJI SDK; OpenWeatherMap)",
      "Route Intelligence Platform (optimization — Google Maps/HERE API routing; Python OR-Tools; real-time traffic via TomTom; FastAPI)",
      "Logistics Integration Platform (supply chain — ERP connectors; ShipBob/Shipstation; webhooks; PostgreSQL)",
      "Fleet Management Dashboard (real-time operations — React; Mapbox vehicle tracking; WebSockets; TimescaleDB telemetry)"
    ],
    services: [
      "Last-mile delivery infrastructure",
      "Fleet management SaaS",
      "Route optimization consulting",
      "Enterprise supply chain integration",
      "Drone delivery services (medical + commercial)"
    ],
    technologyStack: [
      "ROS2",
      "PyTorch",
      "SLAM (Cartographer/RTAB-Map)",
      "ArduPilot/PX4",
      "FAA DroneZone API",
      "DJI SDK",
      "Google/HERE Maps API",
      "Python OR-Tools",
      "TomTom API",
      "FastAPI",
      "React + Mapbox",
      "TimescaleDB"
    ],
    revenueModel: "Logistics contracts + SaaS fleet management + route intelligence licensing",
    synergyNodes: [
      "TerraMind (SN-14)",
      "Eden Logistics (SN-18)",
      "Mecha Orchard (SN-19)",
      "Momentum Voyages (SN-20)",
      "Aether Relay Drone (SYN-06)",
      "Gaia Field Rover (SYN-10)",
      "Prime Shepherd Rover (SYN-08)"
    ]
  },
  {
    id: "D-15",
    name: "Animus Prime",
    subtitle: "Robotics — Industrial & Humanoid — Building the machines that build the future.",
    accentName: "Arc Cyan",
    accentHex: "#22D3EE",
    launchYear: "Year 5 — Series C+",
    tagline: "Industrial (Titan) & Humanoid (Prime). Titan Works on campus: 200K sq ft, 40 ft ceilings, proving ground. NEVER near-term.",
    products: [
      "Titan Directorate (Industrial Robot Line — actuators, C++/Python ROS2, NVIDIA Isaac Sim, FastAPI backend, React dashboard)",
      "Prime Directorate (Humanoid Robot R&D; — bipedal, hands, natural language programming via Natural Script, PyTorch ML, Isaac Sim)",
      "Robot Learning Platform (ML training pipeline, data via FastAPI, staged rollout manager, Isaac Sim validation)",
      "Agricultural Robotics (with Gaia Synthesis — ROS2, PyTorch/YOLOv8 crop detection, RTK-GPS + visual odometry)",
      "Robot Fleet Management Platform (React dashboard, FastAPI, WebSockets, PostgreSQL, secure OTA firmware)"
    ],
    services: [
      "Industrial robot deployment",
      "Robot fleet management SaaS",
      "Agricultural robotics consulting (with Gaia Synthesis)",
      "Humanoid R&D; consulting (long-horizon)",
      "Manufacturing automation"
    ],
    technologyStack: [
      "ROS2",
      "PyTorch",
      "NVIDIA Isaac Sim",
      "C++ / Python",
      "Natural Script (Binary Loom)",
      "PyTorch / YOLOv8",
      "FastAPI",
      "React dashboard",
      "WebSocket",
      "PostgreSQL"
    ],
    revenueModel: "Industrial robot sales + fleet management SaaS + R&D; partnerships + manufacturing automation contracts",
    synergyNodes: [
      "Mecha Orchard (SN-19)",
      "Binary Forge Station (SYN-13)",
      "Prime Shepherd Rover (SYN-08)"
    ]
  },
  {
    id: "D-16",
    name: "Juris Guard",
    subtitle: "LegalTech, AI Governance & Regulatory Intelligence — The legal intelligence layer protecting 20 divisions.",
    accentName: "Regulation Indigo",
    accentHex: "#6366F1",
    launchYear: "Year 2 — Active",
    tagline: "LegalTech and AI governance for all 20 divisions. Coordinated by Dr. Joseph Johnson (CLO). Issues all legal clearances.",
    products: [
      "AI Governance Framework Suite (enterprise AI governance, risk classification, log audit based on Aegis Protocol, doc via reportlab)",
      "Contract Intelligence Platform (AI contract analysis, Claude API, DocuSign workflow, PostgreSQL repository, Python+Jinja2 templates)",
      "Regulatory Intelligence Platform (real-time monitoring across AI, fintech, healthcare; RSS/web scraping; LexisNexis/Westlaw API, Claude, n8n)",
      "Contract Lifecycle Management (full lifecycle tracking for all divisions, custom Next.js frontend, PostgreSQL, S3 storage, 90-day alert)",
      "Document Automation Platform (standard legal document generation: NDAs, SLAs, offer letters; template library; DocuSign)"
    ],
    services: [
      "AI governance consulting for enterprises",
      "Contract analysis and automation",
      "Regulatory compliance monitoring (alerts within 24 hours of material changes)",
      "Legal document automation",
      "AI liability management",
      "Juris Guard compliance certification",
      "SEC clearance issuance (all Collective AI product launches)"
    ],
    technologyStack: [
      "Claude API",
      "DocuSign API",
      "LexisNexis / Westlaw API",
      "n8n",
      "PostgreSQL",
      "Next.js",
      "Python + Jinja2",
      "Notion PDF export",
      "reportlab"
    ],
    revenueModel: "Legal SaaS subscriptions + consulting retainers + compliance certification fees",
    synergyNodes: [
      "Signal Court (SN-07)",
      "Aegis Forge (SN-09)",
      "Oracle Relay (SN-04)",
      "Resonance Compliance Rig (SYN-05)"
    ]
  },
  {
    id: "D-17",
    name: "Signal Velocity",
    subtitle: "Growth Intelligence & Performance Marketing — Every conversion starts with the right signal.",
    accentName: "Conversion Coral",
    accentHex: "#F43F5E",
    launchYear: "Year 2 — Active",
    tagline: "Growth intelligence and performance marketing for all 20 divisions and enterprise clients.",
    products: [
      "Growth Intelligence Platform (analytics — CAC, LTV, ROAS, touch attribution; custom warehouse on BigQuery; Tableau; cohort analytics)",
      "Paid Media Management Suite (managed paid media — Meta/Google/LinkedIn/TikTok APIs; Trade Desk DSP; campaign management; A/B testing)",
      "CRO Platform (systematic A/B and multivariate tests — VWO/Optimizely, heatmaps via Hotjar, 95%+ stat significance, test registry)",
      "SEO Intelligence Platform (technical + content SEO — Ahrefs; Search Console; Screaming Frog; Surfer SEO; rank tracking dashboard)",
      "Email Marketing Platform (Klaviyo; personalized nurture; behavioral triggers; revenue attribution)"
    ],
    services: [
      "Growth strategy coaching",
      "Paid media management",
      "Conversion rate optimization",
      "SEO management for all 20 division websites",
      "Email marketing automation",
      "Attribution modeling",
      "Revenue acceleration programs"
    ],
    technologyStack: [
      "Northbeam / Triple Whale",
      "BigQuery / Snowflake",
      "Tableau / Looker",
      "dbt",
      "Meta / Google / LinkedIn / TikTok Ads APIs",
      "The Trade Desk",
      "VWO / Optimizely",
      "Hotjar",
      "Ahrefs API",
      "Screaming Frog",
      "Surfer SEO",
      "Klaviyo"
    ],
    revenueModel: "Performance media management fees + SaaS subscriptions + consulting retainers",
    synergyNodes: [
      "Resonance Media (SN-01)",
      "Oracle Relay (SN-04)",
      "Quantum Commerce Grid (SN-03)",
      "Nexus Signal Broadcast Node (SYN-11)",
      "Signal Cohort Badge (SYN-15)",
      "Quantum Signal Terminal (SYN-18)"
    ]
  },
  {
    id: "D-18",
    name: "Nomad Nexus",
    subtitle: "Global Mobility & Digital Nomad Infrastructure — Live anywhere. Work everywhere. Build globally.",
    accentName: "Nomad Sand",
    accentHex: "#FBBF24",
    launchYear: "Year 3 — Series B",
    tagline: "Global mobility and digital nomad infrastructure. Visa intelligence (130+ countries), co-living network, and relocation tools.",
    products: [
      "Nomad Nexus Platform (all-in-one digital nomad super-app — Next.js/React Native; Supabase; PostgreSQL visa; housing matching)",
      "Visa Intelligence Database (programs for 130+ countries — automated via n8n scrapers, Claude API content synthesis)",
      "Global Housing Matching Engine (AI co-living matching — Selina, Outpost partner APIs, listing DB in PostgreSQL, Mapbox, Stripe)",
      "Nomad Intelligence Reports (destination metrics on internet speed, coworking, cost of living, safety, healthcare — Numbeo; Claude)",
      "Nomad Community Platform (global location chapters, destination meetups, peer intelligence sharing, mentorship, alumni)"
    ],
    services: [
      "Relocation consulting",
      "Visa intelligence subscriptions",
      "Housing matching platform access",
      "Destination intelligence reports",
      "Co-living network booking",
      "Remote-first culture consulting for enterprises"
    ],
    technologyStack: [
      "Next.js / React Native",
      "Supabase",
      "PostgreSQL",
      "Mapbox",
      "Stripe",
      "n8n",
      "Selina / Outpost partner APIs",
      "Numbeo API",
      "Speed test APIs",
      "Claude API"
    ],
    revenueModel: "Platform subscriptions + housing booking transaction fees + intelligence report sales + community memberships",
    synergyNodes: [
      "Nomad Market (SN-12)",
      "Momentum Voyages (SN-20)",
      "Nomad Intelligence Kit (SYN-12)"
    ]
  },
  {
    id: "D-19",
    name: "Eon Core",
    subtitle: "Longevity Science & Human Optimization — Extending the time you have to build what matters.",
    accentName: "Longevity Aqua",
    accentHex: "#06B6D4",
    launchYear: "Year 4 — Series C",
    tagline: "Biological age tracking, life extension protocols, epigenetic monitoring, and longevity practitioner community. All clinical.",
    products: [
      "Eon Biological Age Platform (methylation clocks GrimAge/PhenoAge via Horvath APIs, telomeres, inflammatory markers, HIPAA FastAPI, Oura)",
      "Longevity Protocol Builder (evidence-graded protocols, Claude API generation at Aegis-Review tier, physician reviewer portal)",
      "Longevity Diagnostics Network (curated lab partners Function Health, LabCorp, Quest; log via Airtable, HL7 FHIR integration)",
      "Eon Core Community & Intelligence Platform (Circle.so or Skool community, briefings from bioRxiv, PubMed feeds, Zoom, Beehiiv)",
      "Longevity Research Intelligence Platform (continuous synthesis of Nature Aging, Cell, Geroscience; weekly intelligence)"
    ],
    services: [
      "Biological age profiling",
      "Longevity protocol consultation (physician-supervised)",
      "Lab network coordination",
      "Longevity research intelligence subscriptions",
      "Biohacking infrastructure consulting",
      "Human optimization programs"
    ],
    technologyStack: [
      "HIPAA FastAPI backend",
      "Horvath lab APIs",
      "TruMe / MyDNAge",
      "LabCorp / Quest / Ulta Lab Tests",
      "HL7 FHIR standard",
      "Claude API (Aegis-Review)",
      "Supabase",
      "Circle.so / Skool",
      "Beehiiv",
      "PubMed / bioRxiv API",
      "Shippo"
    ],
    revenueModel: "Platform subscriptions + lab coordination fees + protocol consulting + community memberships",
    synergyNodes: [
      "BioSovereign (SN-13)",
      "Eon Performance Lab (SYN-17)"
    ]
  },
  {
    id: "D-20",
    name: "Cognara Mind",
    subtitle: "Behavioral Science & Human-AI Psychology — Understanding the mind that shapes the future.",
    accentName: "Cognara Rose",
    accentHex: "#E0267E",
    launchYear: "Year 2 — Active",
    tagline: "Behavioral science and human-AI psychology: trust calibration, behavior nudge system, and internal behavioral engines for all divisions.",
    products: [
      "Behavioral Intelligence Platform (Mixpanel/Amplitude; custom Python cohort analytics, Claude insight synthesis, automated reporting)",
      "Nudge Design System (evidence nudges based on Thaler & Sunstein, social proof, commitment, shared Figma library, VWO A/B tests)",
      "AI Trust & Calibration Framework (framework defines when AI expresses uncertainty, error comms; Aegis Protocol compliance checklist)",
      "Change Management Intelligence Suite (toolkit for Collective consulting: resistance assessment via Typeform, Claude resistance analysis)",
      "Behavioral Ethics Audit (systematic dark pattern detection, persuasion guidelines enforcement, results reported to CEO & CLO)"
    ],
    services: [
      "Behavioral design consulting",
      "Nudge architecture for product teams",
      "AI trust calibration framework licensing",
      "Change management intelligence (with The Collective)",
      "Behavioral ethics audits",
      "Product behavioral analysis subscriptions"
    ],
    technologyStack: [
      "Mixpanel / Amplitude",
      "Custom Python analytics",
      "VWO / Optimizely",
      "Figma placeholder dynamic components",
      "Claude API",
      "Notion",
      "Typeform / Airtable",
      "OneTrust (privacy/consent)"
    ],
    revenueModel: "Consulting fees + behavioral platform subscriptions + ethics audit fees",
    synergyNodes: [
      "Kinetic Scholar (SN-05)",
      "Cognara Consulting Kit (SYN-09)",
      "Vital Neuro Wristband (SYN-19)",
      "Cognara Insight Band (D20-W01)"
    ]
  }
];

export const SYNERGY_NODES: SynergyNode[] = [
  // Phase 1
  {
    id: "SN-01",
    name: "Resonance Media",
    divisions: "Nexus Labs + Signal Velocity + ZenFlow",
    mandate: "AI-powered content production and growth distribution. Top-of-funnel for the entire ecosystem. JR Hataalii editorial voice. The Collective Times + Creator Nexus = compounding loop.",
    phase: "Phase 1 — Revenue & Proof (Active Priority)"
  },
  {
    id: "SN-02",
    name: "Ascension Campus",
    divisions: "Hybrid Living + ZenFlow + Nexus Labs",
    mandate: "Education platform with AI curriculum delivery and content propagation. Atlas LMS powered by ZenFlow. Talent pipeline of AI operators.",
    phase: "Phase 1 — Revenue & Proof (Active Priority)"
  },
  {
    id: "SN-03",
    name: "Quantum Commerce Grid",
    divisions: "Quantum Ledger + Signal Velocity + ZenFlow",
    mandate: "Financial tools, growth analytics, routing infrastructure combined. Revenue rails of the ecosystem. Quantum Wealth + Signal Velocity.",
    phase: "Phase 1 — Revenue & Proof (Active Priority)"
  },
  {
    id: "SN-04",
    name: "Oracle Relay",
    divisions: "ZenFlow + Signal Velocity + Juris Guard",
    mandate: "Intelligence routing, growth signposts, and regulatory check. Knows what to build, when to build, security bounds. Year 1 backplane.",
    phase: "Phase 1 — Revenue & Proof (Active Priority)"
  },
  {
    id: "SN-05",
    name: "Kinetic Scholar",
    divisions: "Kinetic Edge + Hybrid Living + ZenFlow",
    mandate: "Performance science, AI tutoring, and metabolic/athletic tracking. Apex System biometric capture + Atlas LMS curriculum delivery.",
    phase: "Phase 1 — Revenue & Proof (Active Priority)"
  },
  // Phase 2
  {
    id: "SN-06",
    name: "Founder Ark",
    divisions: "The Collective + Quantum Ledger + ZenFlow",
    mandate: "Premium high-ticket, white-glove founder consulting services. Financial infrastructure, ZenFlow custom orchestration, enterprise treasury.",
    phase: "Phase 2 — Protection & Premium"
  },
  {
    id: "SN-07",
    name: "Signal Court",
    divisions: "Juris Guard + Obsidian Arc + ZenFlow",
    mandate: "Legal intelligence and cyber operations combined. Compliance-as-a-service. Integrated SOC alerts + Juris Guard framework routing.",
    phase: "Phase 2 — Protection & Premium"
  },
  {
    id: "SN-08",
    name: "Ghost Protocol",
    divisions: "Obsidian Arc + ZenFlow + Binary Loom",
    mandate: "Offensive/defensive cybersecurity and cloud hardening. Deployment of ZenFlow security agents with Binary Loom infrastructure.",
    phase: "Phase 2 — Protection & Premium"
  },
  {
    id: "SN-09",
    name: "Aegis Forge",
    divisions: "Obsidian Arc + Juris Guard + ZenFlow",
    mandate: "Sentry/cyber integration with physical cameras, smart badges, and automated risk scoring queues. Real-time corporate safety gate.",
    phase: "Phase 2 — Protection & Premium"
  },
  {
    id: "SN-10",
    name: "Blackbox Citadel",
    divisions: "Quantum Ledger + Obsidian Arc + Binary Loom",
    mandate: "Financial cold storage and encrypted client deals vault. Physical security at Blackbox Vault with Quantum Genesis ledger security.",
    phase: "Phase 2 — Protection & Premium"
  },
  // Phase 3
  {
    id: "SN-11",
    name: "MythOS",
    divisions: "Nexus Labs + ZenFlow + Aether Link",
    mandate: "AI-generated narrative engineering and decentralized broadcasting. Global outreach using Babel AI translation + Starlink mesh node layers.",
    phase: "Phase 3 — Scale & Expansion"
  },
  {
    id: "SN-12",
    name: "Nomad Market",
    divisions: "Nomad Nexus + Quantum Ledger + Signal Velocity",
    mandate: "Global co-living and housing marketplace with embedded blockchain routing, tax optimization, and growth rails for location-independent builders.",
    phase: "Phase 3 — Scale & Expansion"
  },
  {
    id: "SN-13",
    name: "BioSovereign",
    divisions: "Vital Helix + Eon Core + ZenFlow",
    mandate: "Combined patient twin mapping, genomic sequencing, and longevity therapy compounding. Clinically authenticated self-directed health stack.",
    phase: "Phase 3 — Scale & Expansion"
  },
  {
    id: "SN-14",
    name: "TerraMind",
    divisions: "Terra Axis + Gaia Synthesis + Vector Shift",
    mandate: "Smart land development, vertical agricultural domes, autonomous delivery rovers. Living physical infrastructure grid.",
    phase: "Phase 3 — Scale & Expansion"
  },
  {
    id: "SN-15",
    name: "Sovereign Assets",
    divisions: "Terra Axis + Quantum Ledger + Juris Guard",
    mandate: "Real estate tokenization, multi-party smart contracts, automated property transfers with escrow verification.",
    phase: "Phase 3 — Scale & Expansion"
  },
  // Phase 4
  {
    id: "SN-16",
    name: "Civilization Twin",
    divisions: "ZenFlow + Binary Loom + Aether Link + All 20 Divisions",
    mandate: "Comprehensive biological, social, and energy simulation of city scales. High-computation system prediction grids. Long-horizon.",
    phase: "Phase 4 — Civilization Infrastructure (Long-Horizon)"
  },
  {
    id: "SN-17",
    name: "Civic Nervous System",
    divisions: "Civic Core + Aether Link + ZenFlow",
    mandate: "Public digital equity. Mesh endpoints, free AI digital literacy distribution, translation, non-profit community routing.",
    phase: "Phase 4 — Civilization Infrastructure (Long-Horizon)"
  },
  {
    id: "SN-18",
    name: "Eden Logistics",
    divisions: "Gaia Synthesis + Vector Shift + Terra Axis",
    mandate: "Autonomous organic crop growth, drone transport, temperature-sensitive cold chain distribution at regional scale.",
    phase: "Phase 4 — Civilization Infrastructure (Long-Horizon)"
  },
  {
    id: "SN-19",
    name: "Mecha Orchard",
    divisions: "Animus Prime + Gaia Synthesis + Vector Shift",
    mandate: "Heavy physical automation in food production, robotic fruit picking, soil preparation drones, long-life solar recharging depots.",
    phase: "Phase 4 — Civilization Infrastructure (Long-Horizon)"
  },
  {
    id: "SN-20",
    name: "Momentum Voyages",
    divisions: "Vector Shift + Nomad Nexus + Aether Link",
    mandate: "Global logistics networks and mobile workspace nodes for high-value mobile professionals. Aerotropolis logistics, aircraft cargo loops.",
    phase: "Phase 4 — Civilization Infrastructure (Long-Horizon)"
  }
];

export const PHYSICAL_NODES: PhysicalNode[] = [
  {
    id: "SYN-01",
    name: "SENTINEL GUARDIAN",
    divisions: "Obsidian Arc + ZenFlow",
    phase: "Phase 2",
    budgetRange: "$750 - $1,000",
    whyFuses: "Obsidian Arc generates physical threat alerts. ZenFlow governs agent security. Fusing them routes physical intruder alarms and rogue software agent outputs through a single Aegis human review queue.",
    productDescription: "Mounted perception mast feeding Obsidian Arc and ZenFlow simultaneously. LiDAR + depth camera classify events and inject into ZenFlow /v1/aegis queue alongside software flags. E-stop relay halts robots on intrusion.",
    hardwareComponents: [
      "NVIDIA Jetson Orin Nano Super",
      "RPLIDAR A1M8 (360° 2D LiDAR)",
      "Luxonis OAK-D Lite (neural depth inference)",
      "Raspberry Pi AI Camera / Sony IMX500",
      "RealSense D435i SLAM",
      "Raspberry Pi 5 (incident dashboard)",
      "Whisplay HAT",
      "Emergency Stop Relay board",
      "Pi M.2 HAT + 2TB NVMe SSD",
      "Prusa 3D-Printed CORE One+ PETG enclosure",
      "PoE Injector"
    ]
  },
  {
    id: "SYN-02",
    name: "APEX RECOVERY STATION",
    divisions: "Kinetic Edge + Vital Helix",
    phase: "Phase 2",
    budgetRange: "$650 - $850",
    whyFuses: "Kinetic Edge tracks dynamic performance metrics; Vital Helix monitors clinical biomarkers. This station overlaps on recovery, analyzing both to issue standard morning readiness reports for supreme human optimization.",
    productDescription: "BLE aggregation hub connecting athlete wearables to Vital Helix Bio-Twin models. Features active recovery algorithms. Every morning at 6 AM, coaches receive the unified voice assessment brief via a desktop speaker bonnet.",
    hardwareComponents: [
      "NVIDIA Jetson Orin Nano Super",
      "Adafruit Feather nRF52840 Sense",
      "Arduino Nano 33 BLE Sense Rev2",
      "IMU ICM-20948",
      "Raspberry Pi 5 + Whisplay HAT",
      "ReSpeaker 2-Mics Pi HAT (voice queries)",
      "Adafruit I2S Speaker Bonnet (audio report)",
      "Pi M.2 HAT+ 2TB NVMe SSD",
      "Geekworm X1202 UPS HAT battery backup",
      "Bambu A1 3D-Printed clinical desk case (PETG)"
    ]
  },
  {
    id: "SYN-03",
    name: "TERRA GAIA SURVEY DRONE",
    divisions: "Terra Axis + Gaia Synthesis",
    phase: "Phase 4",
    budgetRange: "TBD",
    whyFuses: "Terra Axis requires soil mapping for foundation engineering; Gaia Synthesis monitors soil composition and plant health. One flight delivers real estate + ecological surveys simultaneously.",
    productDescription: "Hexrotor surveyor drone capturing spectral terrain models, tracking land valuation parameters, and evaluating carbon/nitrogen composition via AI sensors.",
    hardwareComponents: [
      "ArduPilot / PX4 custom multirotor flight controller",
      "FAA DroneZone telemetry integration",
      "DJI SDK drone fleet pairing module",
      "Multi-spectral crop and soil health spectrometers",
      "Mapbox coverage engine integration",
      "Weather API satellite sync suite"
    ]
  },
  {
    id: "SYN-04",
    name: "HERALD CAMPUS KIOSK",
    divisions: "Hybrid Living + Civic Core",
    phase: "Phase 3",
    budgetRange: "$400 - $600",
    whyFuses: "Hybrid Living requires cohort enrollment portals; Civic Core provides public access to digital equity programs. Placing one node at campus entrances serves student registration and community needs at once.",
    productDescription: "Public touchscreen gateway allowing visitors and community members to sign up for courses, check broadband vouchers, and log into the Atlas LMS.",
    hardwareComponents: [
      "Raspberry Pi 5 8GB RAM",
      "15\" high-brightness custom touchscreen",
      "NFC Reader / Badge tap-in deck",
      "Whisplay HAT standard driver",
      "3D-Printed accessible PETG enclosure",
      "UniFi PoE client connection",
      "Atlas LMS API / Civic Core register endpoints"
    ]
  },
  {
    id: "SYN-05",
    name: "RESONANCE COMPLIANCE RIG",
    divisions: "Nexus Labs + Juris Guard",
    phase: "Phase 2",
    budgetRange: "$350 - $500",
    whyFuses: "Nexus Labs publishes high-volume assets; Juris Guard certifies trademark, media rights, and AI regulations. Fusing them intercepts media draft buffers for automated legal clearance checks.",
    productDescription: "Content screening desk device that runs local transcription, OCR overlays, and checks media outputs with Claude API brand guidelines and copyright logs prior to publishing.",
    hardwareComponents: [
      "Raspberry Pi 5 8GB",
      "Whisplay HAT display control and incident flags",
      "ReSpeaker 4-Mic Array (ambient sound profiling)",
      "Pi M.2 HAT+ 1TB NVMe SSD",
      "ZenFlow Juris Guard API client",
      "Claude API (real-time compliance scanner)"
    ]
  },
  {
    id: "SYN-07",
    name: "AURUM BIOSIGNAL BAND",
    divisions: "Quantum Ledger + Vital Helix",
    phase: "Phase 2",
    budgetRange: "$200 - $350",
    whyFuses: "Quantum Ledger tracks active stock trading parameters; Vital Helix handles autonomic stress. Fusing them bridges stress indicators with trading performance logs to flag high-risk cognitive trading biases.",
    productDescription: "Premium gold-accented biometric band capturing physiological responses to financial markets. Alerts traders of high heart-rate variability, skin conductance spikes, and prompts focus calm down sessions.",
    hardwareComponents: [
      "Adafruit Feather nRF52840 Sense",
      "Biometric sensor array (HRV, Galvanic Skin Response, Temp)",
      "Edge ML inference microcontroller chip",
      "3D-Printed gold TPU wearable strap",
      "PiSugar battery manager",
      "Quantum Alpha & Vital Helix APIs"
    ]
  },
  {
    id: "SYN-08",
    name: "PRIME SHEPHERD ROVER",
    divisions: "Animus Prime + Vector Shift",
    phase: "Phase 3",
    budgetRange: "$1,200 - $1,800",
    whyFuses: "Animus Prime needs autonomous ground vectors to test humanoid walking and navigation models; Vector Shift develops last-mile courier software. One chassis evaluates both navigation standards.",
    productDescription: "Robust bipedal suspension ground rover serving as cargo delivery scout and humanoid sensor development rig. Operates on Aegis-Hold and manual joystick overrides.",
    hardwareComponents: [
      "ROS2 custom bipedal platform",
      "PyTorch CV perception processing unit",
      "LiDAR Cartographer RTAB-Map SLAM",
      "Raspberry Pi 5 compute node",
      "Vector Shift route optimizer interface",
      "Animus Learning platform integration link"
    ]
  },
  {
    id: "SYN-09",
    name: "COGNARA CONSULTING KIT",
    divisions: "Cognara Mind + The Collective",
    phase: "Phase 2",
    budgetRange: "$300 - $450",
    whyFuses: "The Collective advises clients on change operations; Cognara Mind researches human-AI stress. The kit collects meeting, tone, and visual cues during workshops to identify organizational resistance indices.",
    productDescription: "Compact consultant hub containing ambient vocal tone, micro-expression, and haptic feedback triggers to automate meeting summary notes and change resistance logs.",
    hardwareComponents: [
      "Seeed XIAO ESP32S3 Sense module",
      "Seeed XIAO nRF52840 tracker",
      "Adafruit DRV2605L haptic driver feedback",
      "Figma asset template sync component",
      "Notion MCP for automatic deliverables drafts",
      "Cognara Mind API sync tool"
    ]
  },
  {
    id: "SYN-11",
    name: "NEXUS SIGNAL BROADCAST NODE",
    divisions: "Nexus Labs + Signal Velocity",
    phase: "Phase 2",
    budgetRange: "$250 - $380",
    whyFuses: "Nexus Labs outputs standard video streams; Signal Velocity monitors real-time audience metrics. Fusing them in one physical box displays live metrics directly next to camera monitors during active broadcasts.",
    productDescription: "Broadcast diagnostic utility with integrated screen showing live audience viewer trends, chat retention, and SEO parameters during YouTube and StreamYard podcasts.",
    hardwareComponents: [
      "Raspberry Pi 5 8GB",
      "Whisplay touchscreen (live telemetry display)",
      "ReSpeaker 4-Mic",
      "Pi M.2 HAT+ 1TB NVMe",
      "Signal Velocity growth tracker",
      "Nexus Labs Creator API bridge"
    ]
  },
  {
    id: "SYN-12",
    name: "NOMAD INTELLIGENCE KIT",
    divisions: "Nomad Nexus + ZenFlow",
    phase: "Phase 2",
    budgetRange: "$180 - $280",
    whyFuses: "Nomad Nexus supports remote housing; ZenFlow delivers agent access from anywhere. The traveler kit aggregates a secure Wi-Fi bridge, battery, and local ZenFlow agent endpoints for remote operations.",
    productDescription: "Travel-size router and secure battery pack giving field operators absolute proxy access to ZenFlow servers and digital nomad visa alerts globally. 48-hour continuous battery.",
    hardwareComponents: [
      "Raspberry Pi Zero 2 W",
      "Adafruit nRF52840 BLE tracker",
      "PiSugar 3 Plus Battery",
      "PETG 3D-Printed rugged travel shell",
      "Nomad Nexus API sync"
    ]
  },
  {
    id: "SYN-13",
    name: "BINARY FORGE STATION",
    divisions: "Binary Loom + Animus Prime",
    phase: "Phase 1",
    budgetRange: "$2,000 - $3,500",
    whyFuses: "Binary Loom owns the manufacturing foundry; Animus Prime researches active hardware printing. A unified workstation handles custom physical prints and CAD control protocols for all 20 divisions.",
    productDescription: "Enterprise fabrication terminal with local touch dashboard, connected directly to Glyph Forge inventory registers, controlling precision extruders.",
    hardwareComponents: [
      "Bambu A1 modified 3D printer hub",
      "Raspberry Pi 5 8GB controller block",
      "Pi M.2 HAT+ 2TB SSD with local CAD library",
      "Glyph Forge inventory management API link",
      "Animus Prime assembly quality model link"
    ]
  }
];

export const WEARABLES: Wearable[] = [
  {
    id: "CAI-W01",
    name: "ZENITH COMMAND BAND",
    parent: "Collective AI Parent Asset",
    description: "Custom smartband for the Founder/CEO (Hataalii) delivering real-time ZenFlow agent status, Aegis Protocol alerts, and division KPI pulses via haptic codes. Vibration patterns mapped to states: green pulse (aegis_clear), amber double-tap (aegis_review), red triple (aegis_hold).",
    hardware: [
      "Adafruit Feather nRF52840 Sense",
      "Adafruit DRV2605L Haptic Controller",
      "IMU ICM-20948",
      "PowerBoost 1000 + LiPo battery",
      "3D-Printed Bambu A1 PETG/TPU wristband"
    ],
    agents: [
      "ZENITH Overseer (Tier 1)",
      "Aegis Protocol Guardian",
      "Knowledge Keeper",
      "Agent Health Monitor"
    ],
    apis: [
      "ZenFlow Agent API /v1/aegis/queue",
      "ZenFlow /v1/agents/health",
      "Anthropic claude-sonnet-4-6",
      "Slack alert webhook"
    ],
    workflows: [
      "ZenFlow Agent Health Monitor (n8n)",
      "Aegis Incident Reporter (n8n)",
      "Daily Agent Performance Digest (n8n)"
    ],
    mcps: [
      "ZenFlow Internal API MCP",
      "Slack MCP",
      "n8n MCP"
    ],
    priceRange: "$130 - $190"
  },
  {
    id: "CAI-W02",
    name: "HERALD BADGE NODE",
    parent: "Collective AI Parent Asset",
    description: "Smart clip badge worn by all Foundry team members. Captures ambient session audio in 30-second snippets, sends BLE summaries to nearest Pi gateway, and logs action items to Knowledge Keeper via ZenFlow API.",
    hardware: [
      "Seeed XIAO ESP32S3 Sense",
      "Adafruit DRV2605L Haptic Controller",
      "Circuit Playground Bluefruit",
      "PowerBoost 1000 + LiPo",
      "3D-printed Bambu A1 TPU badge shell"
    ],
    agents: [
      "Knowledge Keeper",
      "Task Agent (transcription)",
      "Blueprint Architect (badge config)"
    ],
    apis: [
      "ZenFlow /v1/knowledge/write",
      "Anthropic claude-haiku-4-5 (transcription)",
      "BLE Gateway API"
    ],
    workflows: [
      "Cross-Division Weekly Standup Digest (n8n)",
      "Aegis Protocol Compliance Logger (n8n)"
    ],
    mcps: [
      "ZenFlow Internal API MCP",
      "Notion MCP"
    ],
    priceRange: "$120 - $170"
  },
  {
    id: "CAI-W03",
    name: "AEGIS COMMAND STATION",
    parent: "Collective AI Parent Asset",
    description: "Parent company's primary physical command terminal. Displays live division health on a Whisplay interface. Monitor all n8n workflows and the 600-agent lattice.",
    hardware: [
      "Mac mini M4 Pro 64GB (parent command node)",
      "Synology DS1825+ 8-bay NAS",
      "UniFi Dream Machine Pro Max",
      "Raspberry Pi 5 + Whisplay HAT (ZenFlow shell)",
      "ReSpeaker 4-Mic Array v2.0",
      "CyberPower Rackmount UPS 1500VA",
      "Sonnet RackMac mini mount"
    ],
    agents: [
      "ZENITH Overseer",
      "AXIS Director (ZenFlow)",
      "Aegis Protocol Guardian",
      "Knowledge Keeper",
      "Director_Operations"
    ],
    apis: [
      "ZenFlow Agent API (all endpoints)",
      "Anthropic claude-sonnet-4-6 / claude-opus-4-6",
      "n8n REST API",
      "Slack API",
      "Notion API",
      "GitHub API"
    ],
    workflows: [
      "ZenFlow Agent Health Monitor",
      "Portfolio Revenue Dashboard Sync",
      "Cross-Division Weekly Standup Digest",
      "Aegis Safety Review Queue",
      "JWT Token Rotation Monitor",
      "Cost Tracker"
    ],
    mcps: [
      "ZenFlow Internal API MCP",
      "Slack MCP",
      "Notion MCP",
      "GitHub MCP",
      "n8n MCP",
      "Google Drive MCP"
    ],
    priceRange: "$3,500 - $5,000"
  }
];

export const CAMPUS_FACILITIES: CampusFacility[] = [
  // District A
  { id: "A", name: "The Collective HQ / The Prism", size: "80,000 sq ft / 12 stories", function: "Corporate strategy, executive offices, consulting suites, Oculus deck, cantilevered meeting rooms, secure basement, 750kW dedicated microgrid core", district: "District A — The Core / HQ & Brain" },
  { id: "B", name: "ZenFlow & Binary Loom / The Neural Block", size: "60,000 sq ft", function: "AI model training, data storage, R&D; labs, partially submerged brutalist architecture, direct liquid cooling, mission control ops room", district: "District A — The Core / HQ & Brain" },
  { id: "C", name: "Quantum Ledger & Obsidian Arc / The Vault", size: "40,000 sq ft subterranean", function: "Financial treasury, cold storage, physical security command, blast-proof shell, underground vault, biometric airlocks, faraday shielding", district: "District A — The Core / HQ & Brain" },
  // District B
  { id: "F", name: "Animus Prime / Titan Works", size: "200,000 sq ft", function: "Robotics assembly, heavy manufacturing, 40 ft ceilings, gantry cranes, indoor/outdoor robot proving ground, industrial power containers", district: "District B — The Foundry / Industrial & Logistics" },
  { id: "G", name: "Vector Shift / Vector Hub", size: "150,000 sq ft logistics terminal", function: "Autonomous trucking depot, drone port, 20 rooftop verti-ports, cross-dock bays, air traffic control tower, inductive charging + battery swapping", district: "District B — The Foundry / Industrial & Logistics" },
  { id: "P", name: "Binary Loom Manufacturing Foundry / Glyph Forge Works", size: "80,000 sq ft industrial", function: "On-site manufacturing for all 20 divisions: 3D printing, CNC, electronics assembly, apparel, packaging, robotics parts, signage, field kit assembly", district: "District B — The Foundry / Industrial & Logistics" },
  // District C
  { id: "H", name: "Gaia Synthesis / Eden Spire", size: "50,000 sq ft", function: "Aeroponic agriculture, food production, glass grow towers, pinkhouse LED systems, algae bio-panels, cogeneration heat link, bioreactors", district: "District C — The Biosphere / Life Sciences & Agriculture" },
  { id: "I", name: "Vital Helix / Vitality Center", size: "40,000 sq ft medical lab grade", function: "Bio-printing, longevity research, patient care, BSL-2 clean rooms, organ printing labs, Span Clinic patient pods, hospital-grade HVAC", district: "District C — The Biosphere / Life Sciences & Agriculture" },
  // District D
  { id: "D", name: "Hybrid Living / The Royal Library & Academy", size: "100,000 sq ft", function: "Education, digital archive, library, holographic classrooms, mezzanine study levels, 1MW microgrid yard, outdoor learning terraces", district: "District D — Public Interface / Community & Media" },
  { id: "E", name: "Nexus Labs / The Production Complex", size: "60,000 sq ft soundproof", function: "Media production, soundstages, editing suites, 40x60 ft virtual production LED volume, creator lounge, podcast studios", district: "District D — Public Interface / Community & Media" },
  { id: "J", name: "Civic Core / The Public Hub", size: "30,000 sq ft open pavilion", function: "Digital equity, maker space, public computer labs, 3D printing stations, auditorium, solar glass canopies, public EV charging", district: "District D — Public Interface / Community & Media" },
  { id: "K", name: "Kinetic Edge / Performance Center", size: "60,000 sq ft athletic", function: "Sports science, performance training, indoor sprint track, biometric analysis labs, cryotherapy zones, outdoor turf field, Apex Recovery Stations", district: "District D — Public Interface / Community & Media" },
  { id: "L", name: "Aether Link / The Aether Spire", size: "300 ft tower", function: "Campus-wide mesh hub, satellite connectivity ground station, communications relay, signal monitoring, BCI research lab access point", district: "District D — Public Interface / Community & Media" },
  { id: "M", name: "Signal Velocity / The Launch Pad", size: "20,000 sq ft", function: "Growth operations, paid media management center, A/B testing environment, CRO lab, analytics dashboards, campaign war room", district: "District D — Public Interface / Community & Media" },
  { id: "N", name: "Juris Guard / The Chambers", size: "15,000 sq ft", function: "Legal intelligence ops, regulatory monitoring, compliance review rooms, secure document management, CLO executive suite", district: "District D — Public Interface / Community & Media" },
  { id: "O", name: "Nomad Nexus / The Departure Terminal", size: "20,000 sq ft", function: "Global mobility hub, co-living prototype units, destination intelligence center, visa processing support, remote work demonstration", district: "District D — Public Interface / Community & Media" }
];

export const OPERATING_PRINCIPLES: OperatingRule[] = [
  { num: "01", name: "The Ecosystem Is One Machine", text: "Departments are not separate companies. They are organs. No organ claims to function independently. ZenFlow is the nervous system. Binary Loom is the circulatory system. When you work in one division, you work for all of them. Division-first thinking is a failure mode." },
  { num: "02", name: "Phase Sequencing Is Not Negotiable", text: "Phase 1 Synergy Nodes fund Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. An employee who talks about Phase 4 deliverables as current-phase priorities is working against the architecture. Know where your division sits on the roadmap and operate from that position only." },
  { num: "03", name: "Build Platform Compliance", text: "Every product has a specified build platform in the Master Product Catalog. Deviations require architectural approval before development begins — not after. The build platform choice is an architectural decision, not a personal preference." },
  { num: "04", name: "Aegis Is a Gate, Not a Guideline", text: "The Aegis Protocol is not a suggestion. Aegis-Review outputs do not ship without human approval. Aegis-Hold escalations go to executive level. No deadline, no investor expectation, and no client request overrides an Aegis gate. When in doubt about clearance level, escalate up. Never ship down." },
  { num: "05", name: "Vertical Integration Is the Moat", text: "We build what we use. We use what we build. Every internal capability we develop and validate becomes a product or service we can sell. There is no artificial separation between what we build for ourselves and what we offer the market." },
  { num: "06", name: "ZenFlow Is the Intelligence Source", text: "No division claims to build AI independently. ZenFlow is the intelligence source. A division uses ZenFlow agents to deliver AI capabilities — it does not build parallel AI infrastructure. Every team member should know which ZenFlow agents power their division and what clearance tier those agents operate under." },
  { num: "07", name: "Titles Are Earned and Precise", text: "Founder and Co-Founder belong to JR Moyler and Devon Scott only. No other person holds these titles regardless of tenure, contribution, or importance to the organization. Every other title maps to a real function. The goal is clarity, not hierarchy." },
  { num: "08", name: "Civic Core Is the Accountability Layer", text: "Civic Core exists because technology without accountability becomes extraction. It is funded by profits, not grant cycles, so it cannot be bought. Stanley Constant independence is structural and permanent. The portfolio makes money. Some of that money repairs what technology tends to break. That is the deal — and it does not change when the numbers get big." }
];

export const BRAND_PRINCIPLES = [
  { num: "01", name: "DARK IS NON-NEGOTIABLE", text: "Every division, every parent asset, every surface operates on a dark background (#050A18 / #0A0F1E). Light-mode exists only for print or specific clinical/government environments, with explicit authorization." },
  { num: "02", name: "GOLD IS AUTHORITY, NOT DECORATION", text: "Amber Gold (#D4A843) is earned across the portfolio. It appears on the single most important element in any composition (CTAs, headlines, key numbers)." },
  { num: "03", name: "EACH DIVISION HAS ONE ACCENT", text: "19 active divisions have 19 unique accent colors. No hue collisions. Mixing division accents on a single division asset is a brand violation." },
  { num: "04", name: "SPACE GROTESK IS THE SYSTEM FONT", text: "Display and body use Space Grotesk. JetBrains Mono is secondary, reserved strictly for terminal, data, code and hex indices." },
  { num: "05", name: "THE DIAMOND STAR IS PARENTAGE", text: "The quiet 4-point diamond star (✦) icon appears on the bottom-right of every logo or divider. This represents the parent authority of Collective AI Inc." },
  { num: "06", name: "PERSONA DRIVES COMPONENT STYLE", text: "A Civic Core button is a warm full-radius pill. An Obsidian Arc button is razor-sharp with cold wireframe borders. The visual form aligns directly with division persona." },
  { num: "07", name: "RESTRAINT IS THE HIGHEST SKILL", text: "Knowing what to leave out, cinematic restraint, clean grids with huge negative space represent the ultimate professional design." }
];

export const BANNED_WORDS = [
  "delve", "tapestry", "underscore", "pivotal", "meticulous", "harness", "bolster",
  "testament vibrant", "beacon", "illuminate", "robust transformative", "leverage",
  "seamlessly foster", "garner", "spearhead", "synergy"
];

export const BANNED_OPENERS = [
  "In today's ever-evolving world...",
  "In an era defined by...",
  "It goes without saying that...",
  "Certainly!",
  "Absolutely!",
  "In conclusion...",
  "In summary...",
  "Moving forward...",
  "Embrace the future..."
];

export const MERCHANDISE_CATALOG: MerchandiseLine[] = [
  { division: "ZenFlow", accentHex: "#7C3AED", heroApparel: "Ultraviolet heavyweight hoodie — circuit board pattern", footwear: "Prototype TBD", keyAccessories: "Enamel pin | Zenith wristband | Neural data bag" },
  { division: "The Collective", accentHex: "#D4A843", heroApparel: "Matte gold consultant jacket", footwear: "Oxford leather shoe", keyAccessories: "Leather portfolio case | Gold lapel pin | Woven tie" },
  { division: "Hybrid Living", accentHex: "#F59E0B", heroApparel: "Amber knowledge worker hoodie", footwear: "Campus low-top sneaker", keyAccessories: "Atlas tote | Learning badge | Campus lanyard" },
  { division: "Nexus Labs", accentHex: "#DC2626", heroApparel: "Crimson creator bomber jacket", footwear: "Studio slip-on", keyAccessories: "Creator kit bag | Studio badge | Speaker pin" },
  { division: "Terra Axis", accentHex: "#2563EB", heroApparel: "Blueprint infrastructure jacket", footwear: "Work boot (smart sensor optional)", keyAccessories: "Architect roll bag | Blueprint tee | SmartHome badge" },
  { division: "Vital Helix", accentHex: "#14B8A6", heroApparel: "Dual-helix wellness tee", footwear: "Double-helix sandal (3D prototype — Glyph Forge)", keyAccessories: "Health tracker sleeve | Vitality pin | Wellness mat bag" },
  { division: "Binary Loom", accentHex: "#00D9B5", heroApparel: "Electric teal dev hoodie — data flow print", footwear: "Circuit runner low-top", keyAccessories: "Dev badge | API key card holder | Code sticker pack" },
  { division: "Quantum Ledger", accentHex: "#8B5CF6", heroApparel: "Quantum purple trading jacket", footwear: "Oxford leather (trader edition)", keyAccessories: "Trading terminal keychain | Quantum pin | Portfolio card" },
  { division: "Kinetic Edge", accentHex: "#16A34A", heroApparel: "Performance green athletic set", footwear: "Athletic performance trainer", keyAccessories: "Apex band sleeve | Training bag | Performance tee" },
  { division: "Obsidian Arc", accentHex: "#EA580C", heroApparel: "Black matte tactical hoodie — threat orange accents", footwear: "Black tactical boot", keyAccessories: "Sentinel patch | Threat detection badge | Tactical carry bag" },
  { division: "Civic Core", accentHex: "#7DD3FC", heroApparel: "Sky blue community tee — open source design", footwear: "Community canvas low-top", keyAccessories: "Civic enamel pin | Resource tote | Scholarship certificate holder" },
  { division: "Aether Link", accentHex: "#34D399", heroApparel: "Signal mint mesh performance tee", footwear: "Signal runner shoe", keyAccessories: "Mesh bag | Translation badge | Signal wristband" },
  { division: "Gaia Synthesis", accentHex: "#22C55E", heroApparel: "Farm-to-table green work shirt", footwear: "Field boot (sustainable materials)", keyAccessories: "Seed kit bag | Eden patch | Soil sensor case" },
  { division: "Vector Shift", accentHex: "#CBD5E1", heroApparel: "Silver velocity jacket — reflective print", footwear: "Aerodynamic runner", keyAccessories: "Drone keychain | Vector patch | Navigation bag" },
  { division: "Animus Prime", accentHex: "#22D3EE", heroApparel: "Cyan robot engineering jacket", footwear: "Split boot — 3D prototype (Glyph Forge Works)", keyAccessories: "Titan patch | Prime badge | Robot keychain" }
];
