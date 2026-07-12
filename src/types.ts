export interface FarmerProfile {
  name: string;
  location: string; // State
  lga?: string; // Local Government Area (optional)
  farmType: "crop" | "livestock" | "aquaculture" | "mixed";
  crops: string; // Main Crop/Livestock
  farmSize: string; // Small (<2 hectares) | Medium (2-10 hectares) | Large (>10 hectares)
  challenge: string; // Pest/Disease | Low Yield | etc.
  experience: "beginner" | "intermediate" | "experienced";
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp?: string;
  agents?: string[];
  categories?: string[];
  isStreaming?: boolean;
}

export interface MarketPriceItem {
  commodity: string;
  location: string;
  pricePerUnit: string;
  previousPrice?: string;
  trend: "up" | "down" | "stable";
  lastUpdated: string;
  unit: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  status: "completed" | "pending" | "in-progress";
  category: "health" | "market" | "finance";
  dueDate: string;
}

export interface FarmBudgetItem {
  item: string;
  cost: number;
  category: "input" | "labor" | "logistics" | "other";
  notes?: string;
}

export interface FarmFinanceAnalysis {
  estimatedCosts: FarmBudgetItem[];
  totalCost: number;
  projectedRevenue: number;
  netProfit: number;
  roi: number; // percentage
  breakEvenYield: string;
  creditReadinessScore: number; // 1-100
  creditReadinessFeedback: string[];
}
