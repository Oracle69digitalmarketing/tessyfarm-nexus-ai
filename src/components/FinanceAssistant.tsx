import React, { useState } from "react";
import { FarmerProfile } from "../types";
import { 
  Coins, 
  Landmark, 
  TrendingUp, 
  Sparkles, 
  RefreshCw, 
  FileText, 
  CheckCircle2, 
  Award, 
  Percent, 
  Plus, 
  ArrowRight,
  Info,
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  HelpCircle
} from "lucide-react";
import { motion } from "motion/react";

interface FinanceAssistantProps {
  profile: FarmerProfile;
}

export default function FinanceAssistant({ profile }: FinanceAssistantProps) {
  const [loading, setLoading] = useState(false);
  const [activeSegment, setActiveSegment] = useState<"budget" | "roi" | "cashflow" | "credit">("budget");

  // Inputs for calculators
  const [landHectares, setLandHectares] = useState(2);
  const [expectedYieldBags, setExpectedYieldBags] = useState(45);
  const [targetMarketPrice, setTargetMarketPrice] = useState(28000); // per bag

  // Loan simulator inputs
  const [requestedLoanAmount, setRequestedLoanAmount] = useState(500000);
  const [repaymentTenorMonths, setRepaymentTenorMonths] = useState(6);

  // Profile-based defaults for different crops
  const getCropFactor = () => {
    const crop = (profile.crops || "").toLowerCase();
    if (crop.includes("maize")) return { name: "Maize", costPerHectare: 95000, seedCost: 15000, fertilizerCost: 45000, laborCost: 25000, transportCost: 10000 };
    if (crop.includes("cassava")) return { name: "Cassava", costPerHectare: 85000, seedCost: 18000, fertilizerCost: 35000, laborCost: 20000, transportCost: 12000 };
    if (crop.includes("rice")) return { name: "Rice", costPerHectare: 110000, seedCost: 22000, fertilizerCost: 50000, laborCost: 28000, transportCost: 10000 };
    if (crop.includes("fish")) return { name: "Catfish Aquaculture", costPerHectare: 180000, seedCost: 45000, fertilizerCost: 90000, laborCost: 30000, transportCost: 15000 };
    return { name: "General Crop", costPerHectare: 90000, seedCost: 16000, fertilizerCost: 40000, laborCost: 22000, transportCost: 12000 };
  };

  const cropFactor = getCropFactor();

  // Dynamic calculations
  const totalSeedsCost = cropFactor.seedCost * landHectares;
  const totalFertilizerCost = cropFactor.fertilizerCost * landHectares;
  const totalLaborCost = cropFactor.laborCost * landHectares;
  const totalTransportCost = cropFactor.transportCost * landHectares;
  const otherAdminCost = 15000 * landHectares;

  const totalProductionCost = totalSeedsCost + totalFertilizerCost + totalLaborCost + totalTransportCost + otherAdminCost;
  const projectedRevenue = expectedYieldBags * targetMarketPrice;
  const netProfit = projectedRevenue - totalProductionCost;
  
  // ROI Calculation: (Net Profit / Total Cost) * 100
  const calculatedROI = totalProductionCost > 0 ? (netProfit / totalProductionCost) * 100 : 0;

  // Break-even Yield Calculation: Total Production Cost / Target Market Price
  const breakEvenYieldNeeded = targetMarketPrice > 0 ? (totalProductionCost / targetMarketPrice) : 0;

  // Credit Readiness calculations
  const baseCreditScore = 78; // Out of 100
  const finalScore = Math.min(100, Math.max(0, baseCreditScore + (landHectares > 2 ? 5 : 0) + (profile.experience === "experienced" ? 10 : 5)));

  // Simulated loan terms
  const interestRateYearly = 0.15; // 15% NIRSAL / Bank Rate
  const totalInterest = requestedLoanAmount * (interestRateYearly * (repaymentTenorMonths / 12));
  const totalRepaymentAmount = requestedLoanAmount + totalInterest;
  const monthlyRepayment = totalRepaymentAmount / repaymentTenorMonths;

  // Eligibility probability simulation based on Credit score
  const getEligibilityStatus = () => {
    if (finalScore >= 80) return { prob: "95%", desc: "Highly Eligible. Eligible for pre-approved low-interest NIRSAL smallholder credit programs.", color: "text-brand-green bg-green-50" };
    if (finalScore >= 60) return { prob: "75%", desc: "Eligible. Likely to be approved with cooperative backing and daily ledger records verified.", color: "text-amber-600 bg-amber-50" };
    return { prob: "45%", desc: "Under review. Approval requires additional ledger synchronization and group collateral verification.", color: "text-rose-500 bg-rose-50" };
  };
  const eligibility = getEligibilityStatus();

  // Helper to format Nigerian Naira
  const formatNaira = (num: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header and top tab controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="px-2 py-0.5 bg-green-50 text-brand-green border border-green-100 text-[10px] font-mono font-bold rounded-md uppercase tracking-wider">
              Fintech Intelligence Module
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">AI Seasonal Budgeting & Credit Suite</h2>
          </div>
          <p className="text-xs text-slate-500 font-semibold max-w-2xl">
            Estimate seasonal inputs, calculate yield break-even margins, view cash flow forecasts, and simulate regional bank or NIRSAL credit loan term eligibility.
          </p>
        </div>

        <button
          onClick={handleCalculate}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-green hover:bg-green-700 text-white font-bold rounded-xl text-xs transition duration-150 shadow-sm active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Re-Modeling..." : "Re-Calculate Plan"}
        </button>
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Interactive Calculator Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest">
                Interactive Farm Parameters
              </h3>
              <span className="bg-amber-50 text-brand-gold text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                {cropFactor.name} Factor
              </span>
            </div>

            <div className="space-y-4 pt-3">
              {/* Land Hectares Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-700">Cultivated Land Size</span>
                  <span className="text-brand-green font-mono font-black">{landHectares} Hectares</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={landHectares}
                  onChange={(e) => setLandHectares(parseFloat(e.target.value))}
                  className="w-full accent-brand-green"
                />
                <span className="text-[10px] text-slate-400 block font-semibold">
                  *Standard input costs adjust linearly relative to hectares.
                </span>
              </div>

              {/* Expected Yield Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-slate-700">Expected Harvest Yield</span>
                  <span className="text-brand-gold font-mono font-black">{expectedYieldBags} Bags / Units</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={expectedYieldBags}
                  onChange={(e) => setExpectedYieldBags(parseInt(e.target.value))}
                  className="w-full accent-brand-gold"
                />
              </div>

              {/* Expected Market Price input */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 block">
                  Projected Market Selling Price (per bag)
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-xs font-mono">
                    ₦
                  </div>
                  <input
                    type="number"
                    value={targetMarketPrice}
                    onChange={(e) => setTargetMarketPrice(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 focus:border-brand-green rounded-xl pl-8 pr-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-green font-bold"
                  />
                </div>
                <span className="text-[9px] text-slate-400 block font-semibold leading-relaxed">
                  *Refer to Market Intel tab for current Bodija and Lagos Mile 12 terminals.
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-2.5">
            <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Mathematical Profit Model Explained
            </h4>
            <div className="space-y-1.5 text-[10px] text-slate-500 font-semibold leading-relaxed">
              <p>
                <strong>Revenue formula:</strong> Yield Bags ({expectedYieldBags}) × Market Price ({formatNaira(targetMarketPrice)}) = <span className="text-brand-green font-bold font-mono">{formatNaira(projectedRevenue)}</span>.
              </p>
              <p>
                <strong>ROI formula:</strong> (Net Profit / Production Cost) × 100 = <span className="text-brand-green font-bold font-mono">{calculatedROI.toFixed(1)}%</span>.
              </p>
              <p>
                <strong>Break-even formula:</strong> Production Cost ({formatNaira(totalProductionCost)}) / Market Price ({formatNaira(targetMarketPrice)}) = <span className="text-brand-gold font-bold font-mono">{breakEvenYieldNeeded.toFixed(1)} bags</span> needed to cover core inputs.
              </p>
            </div>
          </div>
        </div>

        {/* Middle Tabbed Segment (Budget Table, ROI breakdown, Cash Flow charts) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Metrics summary grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
              <span className="text-[9px] font-mono font-black text-slate-400 block uppercase">Total Production Cost</span>
              <span className="text-sm font-extrabold text-slate-800 font-mono mt-1 block">
                {formatNaira(totalProductionCost)}
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
              <span className="text-[9px] font-mono font-black text-slate-400 block uppercase">Projected Revenue</span>
              <span className="text-sm font-extrabold text-brand-green font-mono mt-1 block">
                {formatNaira(projectedRevenue)}
              </span>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 shadow-sm text-center">
              <span className="text-[9px] font-mono font-black text-brand-green block uppercase">Net Profit</span>
              <span className="text-sm font-extrabold text-brand-green font-mono mt-1 block">
                {formatNaira(netProfit)}
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
              <span className="text-[9px] font-mono font-black text-brand-gold block uppercase">Calculated ROI</span>
              <span className="text-sm font-extrabold text-brand-gold font-mono mt-1 block">
                {calculatedROI.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Interactive Navigation tabs for middle segment */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex border-b border-slate-100 pb-2 overflow-x-auto gap-2">
              {[
                { id: "budget", label: "Seasonal Budgeting", icon: Coins },
                { id: "roi", label: "ROI & Break-Even", icon: Percent },
                { id: "cashflow", label: "Cash Flow Forecast", icon: TrendingUp },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeSegment === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSegment(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition duration-150 ${
                      isSelected
                        ? "bg-[#212121] text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Sub-tab 1: Seasonal Budgeting */}
            {activeSegment === "budget" && (
              <div className="space-y-3">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-100 text-xs">
                    <thead>
                      <tr className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 text-left">
                        <th className="pb-3 pt-1">Budget Item</th>
                        <th className="pb-3 pt-1">Category</th>
                        <th className="pb-3 pt-1 text-right">Unit Rate / Hectare</th>
                        <th className="pb-3 pt-1 text-right">Total Cost (₦)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-3 font-extrabold text-slate-800">Certified Hybrid Seeds / Stem Cuttings</td>
                        <td className="py-3"><span className="px-1.5 py-0.5 bg-green-50 text-brand-green border border-green-100 rounded text-[9px] font-bold">Input</span></td>
                        <td className="py-3 text-right font-mono text-slate-500">{formatNaira(cropFactor.seedCost)}</td>
                        <td className="py-3 text-right font-mono font-bold text-slate-800">{formatNaira(totalSeedsCost)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-extrabold text-slate-800">NPK Fertilizer & Organic Compost Bags</td>
                        <td className="py-3"><span className="px-1.5 py-0.5 bg-green-50 text-brand-green border border-green-100 rounded text-[9px] font-bold">Input</span></td>
                        <td className="py-3 text-right font-mono text-slate-500">{formatNaira(cropFactor.fertilizerCost)}</td>
                        <td className="py-3 text-right font-mono font-bold text-slate-800">{formatNaira(totalFertilizerCost)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-extrabold text-slate-800">Manual Ridging & Weeding Labor</td>
                        <td className="py-3"><span className="px-1.5 py-0.5 bg-amber-50 text-brand-gold border border-amber-100 rounded text-[9px] font-bold">Labor</span></td>
                        <td className="py-3 text-right font-mono text-slate-500">{formatNaira(cropFactor.laborCost)}</td>
                        <td className="py-3 text-right font-mono font-bold text-slate-800">{formatNaira(totalLaborCost)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-extrabold text-slate-800">Cooperative Logistics Transport Pooling</td>
                        <td className="py-3"><span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-[9px] font-bold">Logistics</span></td>
                        <td className="py-3 text-right font-mono text-slate-500">{formatNaira(cropFactor.transportCost)}</td>
                        <td className="py-3 text-right font-mono font-bold text-slate-800">{formatNaira(totalTransportCost)}</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-extrabold text-slate-800">Soil testing kits, protective gears, sundries</td>
                        <td className="py-3"><span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 border border-slate-200 rounded text-[9px] font-bold">Other</span></td>
                        <td className="py-3 text-right font-mono text-slate-500">₦15,000</td>
                        <td className="py-3 text-right font-mono font-bold text-slate-800">{formatNaira(otherAdminCost)}</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td colSpan={3} className="py-3 font-bold text-right text-[10px] text-slate-400 uppercase font-mono">Sub-Total Seasonal Cost:</td>
                        <td className="py-3 text-right font-mono font-black text-brand-gold text-sm">{formatNaira(totalProductionCost)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-tab 2: ROI & Break-Even Calculator */}
            {activeSegment === "roi" && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <span className="text-[9px] font-mono font-bold text-brand-green block uppercase">ROI Efficiency Verdict</span>
                    <strong className="text-xs text-slate-800 block">Seasonal Return Rate: {calculatedROI.toFixed(1)}%</strong>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                      {calculatedROI >= 40 
                        ? "Highly efficient. Production metrics are yielding exceptional commercial output. Highly recommended to secure inputs now." 
                        : "Moderate efficiency. Consider scaling up cultivated hectares or utilizing cooperative pooled transport to reduce unit shipping costs."}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <span className="text-[9px] font-mono font-bold text-brand-gold block uppercase">Break-Even Metric</span>
                    <strong className="text-xs text-slate-800 block">Required Yield: {breakEvenYieldNeeded.toFixed(1)} Bags</strong>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                      You must harvest and sell at least <strong>{breakEvenYieldNeeded.toFixed(1)}</strong> bags of {cropFactor.name} at <strong>{formatNaira(targetMarketPrice)}/bag</strong> to cover your total production investment of <strong>{formatNaira(totalProductionCost)}</strong>.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-[10px] text-slate-600 font-semibold flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Calculation Note:</strong> To reduce your break-even point, you can decrease manual labor rates by adopting cooperative tractor leasing or lock in seed volume wholesale discounts.
                  </span>
                </div>
              </div>
            )}

            {/* Sub-tab 3: Cash Flow Forecast */}
            {activeSegment === "cashflow" && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Below is a 6-month projected agricultural cash flow cycle. Notice how Cash Outflows peak in Month 1-2 (Input purchasing & planting), while Cash Inflow surges in Month 5-6 during peak terminal selling.
                </p>

                {/* Cash flow SVG chart */}
                <div className="h-40 bg-slate-50 border border-slate-200 rounded-2xl p-2 relative">
                  <svg viewBox="0 0 500 150" className="w-full h-full">
                    {/* Outflow lines (Red/Amber) */}
                    <path
                      d="M 30,120 Q 120,40 210,130 T 470,140"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                    />
                    {/* Inflow lines (Green) */}
                    <path
                      d="M 30,135 Q 120,135 210,135 T 380,40 T 470,25"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.5"
                    />
                    {/* Month markers */}
                    {["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"].map((m, i) => (
                      <text
                        key={i}
                        x={30 + i * 85}
                        y="145"
                        textAnchor="middle"
                        className="text-[9px] font-mono font-bold fill-slate-400"
                      >
                        {m}
                      </text>
                    ))}
                    {/* Annotations */}
                    <text x="70" y="50" className="text-[8px] font-bold fill-rose-500">Outflow Peak (Inputs)</text>
                    <text x="350" y="55" className="text-[8px] font-bold fill-emerald-600">Inflow Peak (Harvest Sales)</text>
                  </svg>
                </div>
                <div className="flex gap-4 items-center justify-center text-[10px] font-mono font-bold">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-1 bg-emerald-500 rounded" />
                    <span className="text-slate-600">Projected Cash Inflow (Revenue)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-1 bg-rose-500 border border-dashed rounded" />
                    <span className="text-slate-600">Projected Cash Outflow (Expenses)</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Loan Eligibility Simulator Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
        
        {/* Header split */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-3 gap-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
              <Landmark className="h-4.5 w-4.5 text-brand-gold" /> NIRSAL & Bank Credit Simulator
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Test terms, repayment plans, and interest margins based on your actual Digital Credit score.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono bg-slate-900 border border-slate-800 text-white px-3.5 py-1.5 rounded-xl text-xs">
            <Award className="h-4 w-4 text-brand-gold animate-bounce" />
            <span>CREDIT SCORE: <strong className="text-brand-gold font-black">{finalScore} / 100</strong></span>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Inputs Column */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
              Loan Request Criteria
            </span>

            {/* Requested Loan Amount */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-slate-700">Requested Credit</span>
                <span className="text-brand-green font-mono font-black">{formatNaira(requestedLoanAmount)}</span>
              </div>
              <input
                type="range"
                min="100000"
                max="2500000"
                step="50000"
                value={requestedLoanAmount}
                onChange={(e) => setRequestedLoanAmount(parseInt(e.target.value))}
                className="w-full accent-brand-green"
              />
            </div>

            {/* Repayment Tenor slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-slate-700">Repayment Tenor</span>
                <span className="text-brand-gold font-mono font-black">{repaymentTenorMonths} Months</span>
              </div>
              <input
                type="range"
                min="3"
                max="18"
                step="1"
                value={repaymentTenorMonths}
                onChange={(e) => setRepaymentTenorMonths(parseInt(e.target.value))}
                className="w-full accent-brand-gold"
              />
            </div>
          </div>

          {/* Simulated Terms Output Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block">Simulated Loan Terms</span>
              
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <span className="text-[9px] text-slate-400 font-semibold block uppercase">Interest Rate</span>
                  <strong className="text-xs text-slate-800 font-mono block">15.0% p.a. (NIRSAL)</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-semibold block uppercase">Total Interest Cost</span>
                  <strong className="text-xs text-slate-800 font-mono block">{formatNaira(totalInterest)}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-semibold block uppercase">Monthly Installment</span>
                  <strong className="text-xs text-brand-green font-mono block">{formatNaira(monthlyRepayment)} / mo</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-semibold block uppercase">Total Repayment</span>
                  <strong className="text-xs text-brand-gold font-mono block">{formatNaira(totalRepaymentAmount)}</strong>
                </div>
              </div>
            </div>

            <p className="text-[9px] text-slate-400 font-semibold leading-relaxed border-t border-slate-200 pt-2.5">
              *Microfinance terms calculated using standard reducing balance. NIRSAL guarantees reduce risk thresholds.
            </p>
          </div>

          {/* AI Decision and coaching */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">AI Underwriting Decision</span>
              
              <div className="flex items-center gap-3 mt-3">
                <div className={`px-2.5 py-1 rounded text-lg font-black font-mono ${eligibility.color}`}>
                  {eligibility.prob}
                </div>
                <div>
                  <strong className="text-xs text-slate-800 block font-sans">Approval Probability</strong>
                  <span className="text-[10px] text-slate-500 font-semibold">Tessy score matching index</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 leading-normal mt-3.5 font-medium">
                {eligibility.desc}
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 text-[10px] text-slate-500 font-semibold">
              <strong className="text-brand-green flex items-center gap-1">✓ AI Optimization Recommendation:</strong>
              <span>Always log your weekly harvest volume in TessyFarm actions to boost your verified transaction score by +15 points.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
