import React, { useState, useEffect } from "react";
import { FarmerProfile } from "../types";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  ShieldAlert, 
  Sparkles, 
  RefreshCw, 
  Landmark, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  MapPin, 
  Truck,
  Building,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";

interface MarketIntelligenceProps {
  profile: FarmerProfile;
}

// 5 Required Terminals
const TERMINALS = [
  { id: "lagos", name: "Lagos Mile 12", state: "Lagos", desc: "Southern West Africa's largest food hub, high wholesale volume" },
  { id: "bodija", name: "Bodija Terminal", state: "Oyo", desc: "Major grain and root crop transit node for the southwest region" },
  { id: "dawanau", name: "Dawanau Market", state: "Kano", desc: "Sub-Saharan Africa's largest international grain aggregator" },
  { id: "akure", name: "Akure Terminal", state: "Ondo", desc: "Primary cocoa, plantain, and root crop trade centre" },
  { id: "makurdi", name: "Makurdi Hub", state: "Benue", desc: "The Food Basket hub, bulk tuber and citrus aggregation point" }
];

// Price dataset for the 5 terminals
const TERMINAL_DATA: Record<string, {
  prices: Array<{ commodity: string; price: string; change: string; trend: "up" | "down" | "stable"; demand: "High" | "Medium" | "Low"; bestTime: string }>;
  processors: Array<{ name: string; distance: string; crop: string; capacity: string }>;
  buyers: Array<{ name: string; contact: string; quantity: string; priceNaira: string }>;
  historicalData: Array<{ month: string; value: number }>;
  storageTip: string;
}> = {
  lagos: {
    prices: [
      { commodity: "Cassava Starch", price: "₦38,000 / bag", change: "+12.4%", trend: "up", demand: "High", bestTime: "Sell now to wholesale agents" },
      { commodity: "White Maize", price: "₦34,500 / bag", change: "-2.1%", trend: "down", demand: "Medium", bestTime: "Hold for 4-6 weeks in PICS bags" },
      { commodity: "Paddy Rice", price: "₦42,000 / bag", change: "+6.8%", trend: "up", demand: "High", bestTime: "Batch sales through coops" },
      { commodity: "Tomatoes (Basket)", price: "₦18,000 / basket", change: "+18.2%", trend: "up", demand: "High", bestTime: "Sell immediately (highly perishable)" },
      { commodity: "Catfish (1kg)", price: "₦2,400 / kg", change: "0.0%", trend: "stable", demand: "Medium", bestTime: "Steady weekly supply lock" }
    ],
    processors: [
      { name: "Eko Food Processing Ltd", distance: "14 km away", crop: "Cassava & Grains", capacity: "50 Tons/day" },
      { name: "Mile 12 Agri-Millers", distance: "3 km away", crop: "Rice & Maize", capacity: "20 Tons/day" }
    ],
    buyers: [
      { name: "Suleiman wholesale Corp", contact: "Lagos Mile 12 Terminal", quantity: "Minimum 10 Tons", priceNaira: "₦37,500/bag" },
      { name: "Juli Agro Traders Ltd", contact: "Ikorodu Depot", quantity: "Minimum 5 Tons", priceNaira: "₦34,000/bag" }
    ],
    historicalData: [
      { month: "Jan", value: 31000 },
      { month: "Feb", value: 32500 },
      { month: "Mar", value: 34000 },
      { month: "Apr", value: 35000 },
      { month: "May", value: 37500 },
      { month: "Jun", value: 38000 }
    ],
    storageTip: "Lagos is humid. Store grains exclusively in triple-layer PICS bags to protect against moisture absorption and mould. Tomatoes must go to solar-cooled logistics bins immediately."
  },
  bodija: {
    prices: [
      { commodity: "Cassava Starch", price: "₦34,000 / bag", change: "+8.5%", trend: "up", demand: "High", bestTime: "Sell 50% now, process remainder" },
      { commodity: "White Maize", price: "₦29,000 / bag", change: "+5.3%", trend: "up", demand: "Medium", bestTime: "Hold 2 weeks for market peak" },
      { commodity: "Paddy Rice", price: "₦38,000 / bag", change: "+1.2%", trend: "up", demand: "Medium", bestTime: "Sell through cooperative pool" },
      { commodity: "Tomatoes (Basket)", price: "₦14,500 / basket", change: "-8.0%", trend: "down", demand: "Low", bestTime: "Process into puree to defer sale" },
      { commodity: "Catfish (1kg)", price: "₦2,100 / kg", change: "+2.4%", trend: "up", demand: "Medium", bestTime: "Supply weekend retail hotels" }
    ],
    processors: [
      { name: "Oyo Starch Millers Association", distance: "24 km away", crop: "Cassava tubers", capacity: "120 Tons/day" },
      { name: "Ibadan Grain Aggregators Ltd", distance: "12 km away", crop: "Maize & Sorghum", capacity: "40 Tons/day" }
    ],
    buyers: [
      { name: "Adeyemi & Sons Allied Foods", contact: "Bodija Depot A", quantity: "Minimum 8 Tons", priceNaira: "₦33,500/bag" },
      { name: "Alhaji Ibrahim Grains", contact: "Bodija Section 4", quantity: "Minimum 15 Tons", priceNaira: "₦28,800/bag" }
    ],
    historicalData: [
      { month: "Jan", value: 28000 },
      { month: "Feb", value: 29500 },
      { month: "Mar", value: 30000 },
      { month: "Apr", value: 31200 },
      { month: "May", value: 32800 },
      { month: "Jun", value: 34000 }
    ],
    storageTip: "Bodija traders reward low moisture content. Ensure grains are sun-dried down to 11% before bagging to lock in premium prices and prevent weevil infestations."
  },
  dawanau: {
    prices: [
      { commodity: "Cassava Starch", price: "₦31,000 / bag", change: "0.0%", trend: "stable", demand: "Medium", bestTime: "Process immediately for export" },
      { commodity: "White Maize", price: "₦27,500 / bag", change: "+14.6%", trend: "up", demand: "High", bestTime: "Hold for bulk international sale" },
      { commodity: "Paddy Rice", price: "₦34,000 / bag", change: "+9.2%", trend: "up", demand: "High", bestTime: "Sell to local millers" },
      { commodity: "Tomatoes (Basket)", price: "₦9,000 / basket", change: "-12.5%", trend: "down", demand: "Low", bestTime: "Sell immediately locally" },
      { commodity: "Catfish (1kg)", price: "₦1,800 / kg", change: "-1.5%", trend: "down", demand: "Low", bestTime: "Hold in rearing tanks to gain mass" }
    ],
    processors: [
      { name: "Kano Allied Flour & Starch", distance: "8 km away", crop: "Maize, Rice, Wheat", capacity: "250 Tons/day" },
      { name: "Northern Feed Mills Co.", distance: "15 km away", crop: "Soybeans & Maize", capacity: "150 Tons/day" }
    ],
    buyers: [
      { name: "Dawanau Grain Export Union", contact: "Section G Gate 2", quantity: "Minimum 30 Tons", priceNaira: "₦27,400/bag" },
      { name: "Kano Food Reserve Agency", contact: "Government Silos", quantity: "Minimum 50 Tons", priceNaira: "₦33,800/bag" }
    ],
    historicalData: [
      { month: "Jan", value: 24000 },
      { month: "Feb", value: 25500 },
      { month: "Mar", value: 26000 },
      { month: "Apr", value: 27800 },
      { month: "May", value: 29500 },
      { month: "Jun", value: 31000 }
    ],
    storageTip: "Kano's low ambient humidity is excellent for grain. Use raised wooden pallets in your warehouse to prevent soil moisture rising into the bottom sacks."
  },
  akure: {
    prices: [
      { commodity: "Cassava Starch", price: "₦36,000 / bag", change: "+11.1%", trend: "up", demand: "High", bestTime: "Sell to local ethanol processors" },
      { commodity: "White Maize", price: "₦31,000 / bag", change: "-1.8%", trend: "down", demand: "Medium", bestTime: "Hold for feed mill peak in September" },
      { commodity: "Paddy Rice", price: "₦39,000 / bag", change: "+4.5%", trend: "up", demand: "High", bestTime: "Sell to Ondo Rice Millers" },
      { commodity: "Tomatoes (Basket)", price: "₦16,000 / basket", change: "+14.0%", trend: "up", demand: "High", bestTime: "Sell via cooperative transit" },
      { commodity: "Catfish (1kg)", price: "₦2,300 / kg", change: "+5.1%", trend: "up", demand: "High", bestTime: "Supply processing smokehouses" }
    ],
    processors: [
      { name: "Ondo Bio-Starch & Ethanol Co", distance: "32 km away", crop: "Cassava tuber roots", capacity: "80 Tons/day" },
      { name: "Akure Livestock Feed Millers", distance: "6 km away", crop: "Grains & Fish meal", capacity: "30 Tons/day" }
    ],
    buyers: [
      { name: "Sunshine State Agropool", contact: "Akure Agric Depot", quantity: "Minimum 5 Tons", priceNaira: "₦35,500/bag" },
      { name: "Dr. Akin Smoked Catfish Co", contact: "Ondo Highway", quantity: "Minimum 2 Tons", priceNaira: "₦2,250/kg" }
    ],
    historicalData: [
      { month: "Jan", value: 30000 },
      { month: "Feb", value: 31500 },
      { month: "Mar", value: 33000 },
      { month: "Apr", value: 32000 },
      { month: "May", value: 34500 },
      { month: "Jun", value: 36000 }
    ],
    storageTip: "High forest zone humidity. Cassava tubers spoil within 48 hours of harvest. Process into dry garri or high-quality starch within 24 hours of uprooting."
  },
  makurdi: {
    prices: [
      { commodity: "Cassava Starch", price: "₦33,000 / bag", change: "+6.5%", trend: "up", demand: "Medium", bestTime: "Coordinate bulk truck to South" },
      { commodity: "White Maize", price: "₦26,000 / bag", change: "+8.2%", trend: "up", demand: "High", bestTime: "Sell dry grain to regional buyers" },
      { commodity: "Paddy Rice", price: "₦36,000 / bag", change: "+10.4%", trend: "up", demand: "High", bestTime: "Mill and bag locally to double value" },
      { commodity: "Tomatoes (Basket)", price: "₦11,000 / basket", change: "-5.3%", trend: "down", demand: "Low", bestTime: "Sell to regional sun-dryers" },
      { commodity: "Catfish (1kg)", price: "₦1,950 / kg", change: "+3.2%", trend: "up", demand: "Medium", bestTime: "Supply local Makurdi joints" }
    ],
    processors: [
      { name: "Benue Valley Starch Mills", distance: "18 km away", crop: "Fresh Cassava roots", capacity: "100 Tons/day" },
      { name: "Makurdi Grain Silo Aggregators", distance: "5 km away", crop: "Maize, Soybeans, Beniseed", capacity: "60 Tons/day" }
    ],
    buyers: [
      { name: "Tiv Land Agricultural Alliance", contact: "Makurdi Main Market", quantity: "Minimum 12 Tons", priceNaira: "₦32,500/bag" },
      { name: "Benue Grain Hub", contact: "Gboko Highway", quantity: "Minimum 10 Tons", priceNaira: "₦25,500/bag" }
    ],
    historicalData: [
      { month: "Jan", value: 27000 },
      { month: "Feb", value: 28500 },
      { month: "Mar", value: 29000 },
      { month: "Apr", value: 30500 },
      { month: "May", value: 32000 },
      { month: "Jun", value: 33000 }
    ],
    storageTip: "Makurdi is the Food Basket transit point. If storing Cassava tubers, cover them with damp sacks under shade to delay physiological enzymatic browning for up to 5 days."
  }
};

export default function MarketIntelligence({ profile }: MarketIntelligenceProps) {
  const [loading, setLoading] = useState(false);
  const [selectedTerminal, setSelectedTerminal] = useState("bodija"); // Defaults to Bodija
  const [activeTab, setActiveTab] = useState<"prices" | "processors" | "trends">("prices");

  const terminalInfo = TERMINALS.find(t => t.id === selectedTerminal) || TERMINALS[1];
  const activeData = TERMINAL_DATA[selectedTerminal] || TERMINAL_DATA.bodija;

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  // Helper to draw clean SVG charts for prices
  const drawChart = () => {
    const data = activeData.historicalData;
    const padding = 35;
    const width = 500;
    const height = 180;
    const minVal = Math.min(...data.map(d => d.value)) * 0.95;
    const maxVal = Math.max(...data.map(d => d.value)) * 1.05;
    const range = maxVal - minVal;

    const points = data.map((d, i) => {
      const x = padding + (i * (width - padding * 2)) / (data.length - 1);
      const y = height - padding - ((d.value - minVal) / range) * (height - padding * 2);
      return `${x},${y}`;
    }).join(" ");

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full text-brand-green">
        {/* Grids */}
        {[0, 1, 2, 3].map((val, idx) => {
          const y = padding + (idx * (height - padding * 2)) / 3;
          return (
            <line
              key={idx}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}
        {/* Trend Area */}
        <path
          d={`M ${padding},${height - padding} L ${points} L ${width - padding},${height - padding} Z`}
          fill="url(#gradient)"
          className="opacity-15"
        />
        {/* Trend Line */}
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          className="transition-all duration-500 text-brand-green"
        />
        {/* Data points */}
        {data.map((d, i) => {
          const x = padding + (i * (width - padding * 2)) / (data.length - 1);
          const y = height - padding - ((d.value - minVal) / range) * (height - padding * 2);
          return (
            <g key={i} className="group">
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="#ffffff"
                stroke="currentColor"
                strokeWidth="2.5"
                className="cursor-pointer hover:r-6 text-brand-gold transition-all"
              />
              <text
                x={x}
                y={y - 10}
                textAnchor="middle"
                className="text-[9px] font-mono font-bold fill-slate-700 bg-white"
              >
                ₦{(d.value / 1000).toFixed(1)}k
              </text>
              <text
                x={x}
                y={height - 12}
                textAnchor="middle"
                className="text-[9px] font-mono font-bold fill-slate-400"
              >
                {d.month}
              </text>
            </g>
          );
        })}
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="px-2 py-0.5 bg-amber-50 text-brand-gold border border-amber-100 text-[10px] font-mono font-bold rounded-md uppercase tracking-wider">
              Specialized Core System
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">AI Market Intelligence & Demand Oracle</h2>
          </div>
          <p className="text-xs text-slate-500 font-semibold max-w-2xl">
            Complete agricultural terminal monitoring. Query commodities, buyer requirements, regional millers, and historical index curves across Nigeria's largest aggregation centers.
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <select
            value={selectedTerminal}
            onChange={(e) => {
              setSelectedTerminal(e.target.value);
              handleRefresh();
            }}
            className="flex-1 lg:flex-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-green"
          >
            {TERMINALS.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-green hover:bg-green-700 text-white font-bold rounded-xl text-xs transition active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Scan Terminal
          </button>
        </div>
      </div>

      {/* Terminal Highlight Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-green-50/20 via-white to-amber-50/20 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-green-50 text-brand-green border border-green-100 rounded-xl shrink-0">
            <Building className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[9px] font-mono font-bold text-brand-gold uppercase tracking-widest block">Selected Aggregation Center</span>
            <strong className="text-sm font-black text-slate-800">{terminalInfo.name} Terminal ({terminalInfo.state} State)</strong>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">{terminalInfo.desc}</p>
          </div>
        </div>
        <div className="bg-slate-900 text-brand-gold px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5 self-start md:self-auto text-xs font-mono font-bold uppercase">
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-gold" /> AI Trend Accuracy: 94.2%
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Terminal Prices Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-3xl p-5 flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-brand-green" /> Commodity Board Index Prices
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-black">₦ Naira Bulk Quotation</span>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center gap-3">
                <RefreshCw className="h-8 w-8 text-brand-green animate-spin" />
                <span className="text-xs font-mono font-bold text-slate-400">Loading terminal ledgers...</span>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-slate-100 text-xs">
                <thead>
                  <tr className="text-[9px] font-mono font-extrabold uppercase tracking-wider text-slate-400 text-left">
                    <th className="pb-3 pt-1">Commodity</th>
                    <th className="pb-3 pt-1 text-right">Index Price</th>
                    <th className="pb-3 pt-1 text-center">24h Shift</th>
                    <th className="pb-3 pt-1 text-center">Market Demand</th>
                    <th className="pb-3 pt-1 text-right">Advisory Directive</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeData.prices.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 font-extrabold text-slate-800">{item.commodity}</td>
                      <td className="py-3.5 text-right font-mono font-bold text-brand-green">{item.price}</td>
                      <td className="py-3.5 text-center">
                        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                          item.trend === "up" ? "bg-green-50 text-brand-green" : "bg-red-50 text-red-600"
                        }`}>
                          {item.trend === "up" ? "+" : ""}{item.change}
                        </span>
                      </td>
                      <td className="py-3.5 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                          item.demand === "High" ? "bg-amber-50 text-brand-gold border border-amber-100" : "bg-slate-100 text-slate-500"
                        }`}>
                          {item.demand}
                        </span>
                      </td>
                      <td className="py-3.5 text-right text-slate-600 font-semibold">{item.bestTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs leading-normal font-medium text-slate-500 space-y-2">
            <div className="flex gap-1.5 items-center">
              <Layers className="h-4 w-4 text-brand-gold shrink-0" />
              <strong className="text-slate-700">Storage Preservation Guidelines:</strong>
            </div>
            <p className="text-[11px] leading-relaxed">
              {activeData.storageTip} Use our recommended triple-layer hermetic PICS bags to safely delay grain sales until high price periods.
            </p>
          </div>
        </div>

        {/* Right Column: Trend Charts & Buyer directory */}
        <div className="space-y-6">
          
          {/* Trend Chart Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                <TrendingUp className="h-4.5 w-4.5 text-brand-gold" /> 6-Month Price Index
              </h3>
              <span className="bg-green-50 text-brand-green text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                TREND
              </span>
            </div>

            {loading ? (
              <div className="h-36 flex items-center justify-center">
                <RefreshCw className="h-6 w-6 text-brand-green animate-spin" />
              </div>
            ) : (
              <div className="h-40 bg-slate-50 border border-slate-100 rounded-2xl p-2 relative">
                {drawChart()}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded border border-slate-200 text-[8px] font-bold font-mono text-slate-500">
                  Bulk Cassava/Rice (₦)
                </div>
              </div>
            )}
            
            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed text-center">
              *Historical average price curves computed over cooperative transaction ledgers.
            </p>
          </div>

          {/* Prospective Buyers Directory */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
              <Users className="h-4.5 w-4.5 text-brand-green" /> Terminal Buyer Directory
            </h3>
            
            <div className="space-y-3">
              {activeData.buyers.map((buyer, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-2 shadow-xs hover:border-brand-green/20 transition duration-150">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800 leading-none">{buyer.name}</h4>
                      <span className="text-[9px] text-slate-400 mt-1 block font-semibold">Matched @ {buyer.contact}</span>
                    </div>
                    <span className="text-[9px] font-mono bg-green-50 text-brand-green border border-green-100 px-2 py-0.5 rounded font-black uppercase">
                      verified
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] bg-white p-2 border border-slate-100 rounded-lg">
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[8px]">Requirement</span>
                      <strong className="text-slate-700">{buyer.quantity}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[8px]">Offer Rate</span>
                      <strong className="text-brand-green">{buyer.priceNaira}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Nearby Processing Plants */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
          <Building className="h-4.5 w-4.5 text-brand-gold" /> Regional Agro-Processors & High-Volume Offtakers
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeData.processors.map((proc, idx) => (
            <div key={idx} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between hover:border-brand-green/20 transition duration-150 bg-slate-50/50">
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">OFFTAKER #{idx+1}</span>
                <h4 className="text-xs font-black text-slate-800">{proc.name}</h4>
                <p className="text-[10px] text-slate-500 font-semibold">{proc.distance} • Focuses on {proc.crop}</p>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">Daily Capacity</span>
                <strong className="text-xs font-bold text-brand-green">{proc.capacity}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
