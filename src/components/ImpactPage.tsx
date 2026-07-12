import React, { useState } from "react";
import { 
  Award, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  Sprout, 
  Leaf, 
  Target, 
  MapPin, 
  ChevronRight, 
  Sparkles,
  Percent,
  Calendar,
  Layers,
  Heart
} from "lucide-react";
import { motion } from "motion/react";
import { FarmerProfile } from "../types";

interface ImpactPageProps {
  profile: FarmerProfile;
}

export default function ImpactPage({ profile }: ImpactPageProps) {
  const [selectedMetric, setSelectedMetric] = useState<string>("overall");
  const [activeTab, setActiveTab] = useState<"kpis" | "charts" | "projections">("kpis");

  // KPI Metrics Data
  const kpis = [
    {
      id: "farmers",
      label: "Farmers Supported",
      value: "52,430",
      subtext: "Active registered smallholders",
      change: "+14% this season",
      color: "from-emerald-500 to-teal-600",
      icon: Users,
    },
    {
      id: "yield",
      label: "Increase in Yield",
      value: "+28.4%",
      subtext: "Average increase per hectare",
      change: "Surpasses FAO targets",
      color: "from-green-500 to-emerald-600",
      icon: Sprout,
    },
    {
      id: "losses",
      label: "Post-Harvest Losses",
      value: "-18.5%",
      subtext: "Loss reduction via PICS storage",
      change: "Saving ₦140M in value",
      color: "from-amber-500 to-orange-600",
      icon: Target,
    },
    {
      id: "income",
      label: "Income Improvement",
      value: "+35.2%",
      subtext: "Average revenue uplift per farmer",
      change: "₦185k extra avg. profit",
      color: "from-blue-500 to-teal-600",
      icon: TrendingUp,
    },
    {
      id: "carbon",
      label: "Carbon Reduction",
      value: "14,820 t",
      subtext: "TCO₂e mitigated via bio-mulch",
      change: "Certified SDG-13 compliant",
      color: "from-teal-600 to-emerald-700",
      icon: Leaf,
    },
    {
      id: "inclusion",
      label: "Women & Youth Reached",
      value: "42% / 38%",
      subtext: "Demographic inclusion rates",
      change: "Empowered co-ops",
      color: "from-purple-500 to-indigo-600",
      icon: Heart,
    }
  ];

  // Map of Nigerian States covered and their co-ops count
  const statesCovered = [
    { state: "Oyo", farmers: "12,400", zones: "Humid Rainforest", coops: 42, progress: 95 },
    { state: "Ondo", farmers: "9,850", zones: "Rainforest / Forest", coops: 36, progress: 88 },
    { state: "Kano", farmers: "8,200", zones: "Sudan Savannah", coops: 28, progress: 82 },
    { state: "Kaduna", farmers: "7,400", zones: "Guinea Savannah", coops: 24, progress: 79 },
    { state: "Osun", farmers: "6,120", zones: "Humid Rainforest", coops: 20, progress: 91 },
    { state: "Benue", farmers: "4,350", zones: "Southern Guinea Savannah", coops: 15, progress: 74 },
    { state: "Plateau", farmers: "4,110", zones: "Jos Plateau Savannah", coops: 14, progress: 80 },
  ];

  // Seasonal Growth Array for Custom SVGs
  const seasonalUpliftData = [
    { year: "2023", base: 1.2, optimized: 1.2, loss: 32 },
    { year: "2024", base: 1.3, optimized: 1.5, loss: 24 },
    { year: "2025", base: 1.3, optimized: 1.8, loss: 16 },
    { year: "2026 (Est.)", base: 1.4, optimized: 2.1, loss: 12 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#1a3325] to-slate-900 text-white p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-md">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-widest bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700/50 inline-block">
            🏆 TessyFarm SDG Impact Dashboard
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight font-sans">
            Measurable Sustainable Impact Tracker
          </h2>
          <p className="text-xs md:text-sm text-teal-100 font-medium max-w-2xl leading-relaxed">
            Evaluating TessyFarm's actual contributions towards smallholder yield growth, financial inclusion, climate resilience, and food security goals across Nigeria.
          </p>
        </div>
      </div>

      {/* Sub-navigation tabs */}
      <div className="flex border-b border-slate-200">
        {[
          { id: "kpis", label: "Sustainable Impact Key KPIs", icon: Layers },
          { id: "charts", label: "Yield & Loss Trajectories", icon: TrendingUp },
          { id: "projections", label: "State & Regional Coverage", icon: MapPin },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-bold transition-all relative ${
                isSelected 
                  ? "text-brand-green border-b-2 border-brand-green" 
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {isSelected && (
                <motion.div 
                  layoutId="activeTabUnderline" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" 
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === "kpis" && (
        <div className="space-y-6">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpis.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  key={kpi.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedMetric(kpi.id)}
                  className={`bg-white border p-5 rounded-3xl shadow-sm hover:shadow-md transition cursor-pointer relative overflow-hidden group ${
                    selectedMetric === kpi.id ? "ring-2 ring-brand-green border-transparent" : "border-slate-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wide">
                      {kpi.label}
                    </span>
                    <div className="p-2.5 bg-slate-50 rounded-2xl group-hover:bg-green-50 transition border border-slate-100">
                      <Icon className="h-5 w-5 text-brand-green" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                      {kpi.value}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold">
                      {kpi.subtext}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-4 text-[10px] font-mono font-bold text-brand-green bg-emerald-50/50 border border-emerald-100 px-2 py-1 rounded-xl w-fit">
                    <Sparkles className="h-3.5 w-3.5" />
                    {kpi.change}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Deep dive metrics section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-brand-gold" /> Personalized SDG Assessment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 font-semibold leading-relaxed">
              <div className="space-y-3 p-4.5 bg-slate-50 border border-slate-100 rounded-2xl">
                <p className="text-[11px] text-slate-500 font-mono font-bold uppercase tracking-wider">
                  Impact For Your Farm Category
                </p>
                <h4 className="text-sm font-extrabold text-slate-800">
                  How {profile.name}'s Farm Type Leads the Cohort:
                </h4>
                <p>
                  As a registered smallholder cultivating <strong className="text-brand-green">{profile.crops}</strong> on <strong className="text-slate-800">{profile.farmSize}</strong> in <strong className="text-slate-800">{profile.location}</strong>, your farm directly contributes to the <strong>+28.4% regional average yield growth</strong>. 
                </p>
                <p>
                  By using our targeted bio-pesticides and split fertilizer calculations, farmers with your exact bio profile save an average of <strong>₦42,000 in input costs per hectare</strong> while mitigating <strong>0.36 tonnes of soil nitrogen runoff annually</strong>.
                </p>
              </div>

              <div className="space-y-3.5">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono">
                  United Nations SDG Contribution
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 bg-rose-50 border border-rose-100 p-2.5 rounded-xl text-rose-800">
                    <span className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center font-black text-sm">2</span>
                    <div>
                      <h5 className="font-bold text-[11px] leading-tight">SDG 2: Zero Hunger</h5>
                      <p className="text-[10px] text-rose-700/80">Enhancing food security through sustainable yield maximization guides.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl text-emerald-800">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black text-sm">12</span>
                    <div>
                      <h5 className="font-bold text-[11px] leading-tight">SDG 12: Responsible Consumption</h5>
                      <p className="text-[10px] text-emerald-700/80">Eliminating post-harvest crop destruction with hermetic sealing bags.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-teal-50 border border-teal-100 p-2.5 rounded-xl text-teal-800">
                    <span className="w-8 h-8 rounded-lg bg-teal-500 text-white flex items-center justify-center font-black text-sm">13</span>
                    <div>
                      <h5 className="font-bold text-[11px] leading-tight">SDG 13: Climate Action</h5>
                      <p className="text-[10px] text-teal-700/80">Grass mulching & split nitrogen applications reducing carbon runoff.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "charts" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Crop Yield Growth */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                CROP YIELD PROGRESSION
              </span>
              <h3 className="text-sm font-black text-slate-800">
                Traditional vs. TessyFarm Optimized Yields (Tons/Ha)
              </h3>
            </div>

            {/* Custom Responsive SVG Chart */}
            <div className="h-56 w-full relative pt-4 flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 180">
                {/* Grid Lines */}
                <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="140" x2="380" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                
                {/* Optimized Yield Bars (Green) */}
                <rect x="75" y="140" width="22" height="15" rx="3" fill="#10b981" opacity="0.85" />
                <rect x="155" y="110" width="22" height="45" rx="3" fill="#10b981" opacity="0.85" />
                <rect x="235" y="80" width="22" height="75" rx="3" fill="#10b981" opacity="0.85" />
                <rect x="315" y="55" width="22" height="100" rx="3" fill="#10b981" opacity="0.85" />

                {/* Base Traditional Yield Bars (Gray) */}
                <rect x="100" y="140" width="22" height="15" rx="3" fill="#94a3b8" opacity="0.6" />
                <rect x="180" y="130" width="22" height="25" rx="3" fill="#94a3b8" opacity="0.6" />
                <rect x="260" y="130" width="22" height="25" rx="3" fill="#94a3b8" opacity="0.6" />
                <rect x="340" y="120" width="22" height="35" rx="3" fill="#94a3b8" opacity="0.6" />

                {/* Left Y Axis Labels */}
                <text x="10" y="24" fill="#94a3b8" fontSize="9" fontWeight="bold">2.5 t</text>
                <text x="10" y="64" fill="#94a3b8" fontSize="9" fontWeight="bold">1.8 t</text>
                <text x="10" y="104" fill="#94a3b8" fontSize="9" fontWeight="bold">1.0 t</text>
                <text x="10" y="144" fill="#94a3b8" fontSize="9" fontWeight="bold">0.2 t</text>

                {/* Bottom X Axis Labels */}
                <text x="90" y="170" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">2023</text>
                <text x="170" y="170" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">2024</text>
                <text x="250" y="170" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">2025</text>
                <text x="330" y="170" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">2026 (Proj)</text>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex gap-4 justify-center text-[10px] font-bold font-mono">
              <div className="flex items-center gap-1.5 text-brand-green">
                <span className="w-3 h-3 bg-brand-green rounded" />
                TessyFarm Optimized (t/ha)
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-3 bg-slate-400 rounded" />
                Traditional Baseline (t/ha)
              </div>
            </div>
          </div>

          {/* Chart 2: Post-Harvest Loss Reduction */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                GRAIN LOSS MITIGATION
              </span>
              <h3 className="text-sm font-black text-slate-800">
                PICS Hermetic Storage Post-Harvest Losses (%)
              </h3>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="h-56 w-full relative pt-4 flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 180">
                {/* Grid Lines */}
                <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="140" x2="380" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                
                {/* Chart Line Path */}
                <path 
                  d="M 90 40 L 170 80 L 250 120 L 330 140" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />

                {/* Line Points */}
                <circle cx="90" cy="40" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="170" cy="80" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="250" cy="120" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="330" cy="140" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />

                {/* Left Y Axis Labels */}
                <text x="10" y="24" fill="#94a3b8" fontSize="9" fontWeight="bold">35%</text>
                <text x="10" y="64" fill="#94a3b8" fontSize="9" fontWeight="bold">25%</text>
                <text x="10" y="104" fill="#94a3b8" fontSize="9" fontWeight="bold">15%</text>
                <text x="10" y="144" fill="#94a3b8" fontSize="9" fontWeight="bold">5%</text>

                {/* Bottom X Axis Labels */}
                <text x="90" y="170" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">2023</text>
                <text x="170" y="170" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">2024</text>
                <text x="250" y="170" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">2025</text>
                <text x="330" y="170" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">2026 (Est)</text>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex gap-4 justify-center text-[10px] font-bold font-mono">
              <div className="flex items-center gap-1.5 text-rose-500">
                <span className="w-3.5 h-1 bg-rose-500 rounded" />
                Post-Harvest Crop Damage Rate % (PICS Protected)
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "projections" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="space-y-0.5">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                NATIONAL VERIFIED PENETRATION
              </span>
              <h3 className="text-sm font-black text-slate-800">
                State-by-State Registered Cooperatives & Farmers
              </h3>
            </div>
            <span className="bg-green-50 text-brand-green border border-green-100 font-mono font-bold text-[10px] px-2.5 py-1 rounded-xl">
              12 STATES ACTIVE
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase font-mono font-bold">
                  <th className="py-2.5">State Covered</th>
                  <th className="py-2.5">Agroecological Zone</th>
                  <th className="py-2.5 text-right">Registered Farmers</th>
                  <th className="py-2.5 text-right">Active Cooperatives</th>
                  <th className="py-2.5 text-right">Adoption Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                {statesCovered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition">
                    <td className="py-3 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-brand-gold" />
                      <strong className="text-slate-900">{item.state}</strong>
                    </td>
                    <td className="py-3 text-slate-500">{item.zones}</td>
                    <td className="py-3 text-right text-slate-800 font-mono font-bold">{item.farmers}</td>
                    <td className="py-3 text-right text-slate-800 font-mono font-bold">{item.coops}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="font-mono text-brand-green">{item.progress}%</span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                          <div 
                            className="bg-brand-green h-full rounded-full" 
                            style={{ width: `${item.progress}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
