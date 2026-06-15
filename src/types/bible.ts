export interface Division {
  id: string; // D-01
  name: string; // ZenFlow
  subtitle: string;
  accentName: string;
  accentHex: string;
  launchYear: string;
  tagline?: string;
  products: string[];
  services: string[];
  technologyStack: string[];
  revenueModel: string;
  synergyNodes: string[];
}

export interface Leader {
  name: string;
  title: string;
  domain: string;
  notes: string;
  isFounder?: boolean;
}

export interface SynergyNode {
  id: string; // SN-01
  name: string;
  divisions: string;
  mandate: string;
  phase: string;
}

export interface PhysicalNode {
  id: string; // SYN-01
  name: string;
  divisions: string;
  phase: string;
  budgetRange: string;
  whyFuses: string;
  productDescription: string;
  hardwareComponents: string[];
}

export interface Wearable {
  id: string; // CAI-W01
  name: string;
  parent: string;
  description: string;
  hardware: string[];
  agents: string[];
  apis: string[];
  workflows: string[];
  mcps: string[];
  priceRange: string;
}

export interface CampusFacility {
  id: string; // A
  name: string;
  size: string;
  function: string;
  district: string;
}

export interface OperatingRule {
  num: string;
  name: string;
  text: string;
}

export interface TechTool {
  name: string;
  versionTier: string;
  function: string;
  category: "ai" | "dev" | "ops" | "design";
}

export interface MerchandiseLine {
  division: string;
  accentHex: string;
  heroApparel: string;
  footwear: string;
  keyAccessories: string;
}

export interface AegisEvent {
  id: string;
  timestamp: string;
  divisionId: string;
  description: string;
  requiredClearance: "Clear" | "Review" | "Hold";
  agentName: string;
  status: "pending" | "approved" | "blocked" | "escalated";
  details: string;
  reviewer?: string;
}
