import React, { useState } from "react";
import { FarmerProfile } from "../types";
import { 
  Users, 
  Truck, 
  Warehouse, 
  ShieldAlert, 
  TrendingUp, 
  Plus, 
  Check, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Briefcase, 
  BarChart3, 
  UserCheck, 
  FileText, 
  CloudRain, 
  Sliders, 
  AlertTriangle,
  BadgeAlert,
  Download,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CooperativeHubProps {
  profile: FarmerProfile;
}

interface TransportPool {
  id: string;
  routeFrom: string;
  routeTo: string;
  driverName: string;
  truckType: string;
  departureDate: string;
  currentWeight: number;
  maxWeight: number;
  costPerTon: number;
  joined: boolean;
}

export default function CooperativeHub({ profile }: CooperativeHubProps) {
  // Setup dynamic name based on State & crop
  const coopName = `${profile.location} ${profile.crops.split(" ")[0]} Producers Cooperative`;
  
  // Tab control: "farmer" or "manager"
  const [viewMode, setViewMode] = useState<"farmer" | "manager">("farmer");

  // State for transport pools
  const [pools, setPools] = useState<TransportPool[]>([
    {
      id: "pool-1",
      routeFrom: `${profile.lga || "Central"} Hub, ${profile.location}`,
      routeTo: "Mile 12 Market, Lagos",
      driverName: "Alhaji Musa Kabir",
      truckType: "15-Ton Refrigerated Truck",
      departureDate: "In 2 days (July 12)",
      currentWeight: 11.5,
      maxWeight: 15,
      costPerTon: 45000,
      joined: false
    },
    {
      id: "pool-2",
      routeFrom: `${profile.lga || "South"} Loading Center, ${profile.location}`,
      routeTo: "Bodija Food Terminal, Ibadan",
      driverName: "Sunday Adebayo",
      truckType: "10-Ton Flatbed Truck",
      departureDate: "In 4 days (July 14)",
      currentWeight: 6.0,
      maxWeight: 10,
      costPerTon: 38000,
      joined: false
    }
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: "ann-1",
      tag: "Buyer Alert",
      text: "⚡ 'Olam Grains Ltd' is requesting 40 tons of quality grain at premium rates. Deliveries must coordinate via Coop office.",
      type: "success"
    },
    {
      id: "ann-2",
      tag: "Pest Warning",
      text: "⚠️ Armyworm infestation confirmed in adjacent Local Government Area. All corn/crop farmers advised to spray biological neem recipes immediately.",
      type: "warning"
    }
  ]);

  // Manager interactive states
  const [yieldMultiplier, setYieldMultiplier] = useState<number>(1.0); // slider
  const [selectedDemandId, setSelectedDemandId] = useState<string | null>(null);
  const [managerMessage, setManagerMessage] = useState<string | null>(null);

  // Manager: collective risk reporting data
  const [collectiveRisks, setCollectiveRisks] = useState([
    {
      id: "risk-1",
      hazard: "Fall Armyworm Spreading",
      severity: "High",
      affectedMembers: 14,
      status: "Mitigating",
      measure: "Distributed botanical neem oil sprays & biological control packets to affected quadrants."
    },
    {
      id: "risk-2",
      hazard: "Irregular Rainfall Deficit",
      severity: "Medium",
      affectedMembers: 22,
      status: "Monitoring",
      measure: "Advising conservation mulching and micro-irrigation scheduling via Nexus voice alerts."
    },
    {
      id: "risk-3",
      hazard: "Soil Acidity Spikes (Sector 4)",
      severity: "Low",
      affectedMembers: 5,
      status: "Resolved",
      measure: "Dispatched collective limestone treatment buffer bags to local storehouse."
    }
  ]);

  // Manager: member list & passport tracking
  const [members, setMembers] = useState([
    { name: "Baba Tunde", crop: "White Maize", farmSize: "2.5 Hectares", passport: "NG-AG-OND-01", status: "Verified" },
    { name: "Grace Alao", crop: "Yellow Maize", farmSize: "3.2 Hectares", passport: "NG-AG-OND-04", status: "Verified" },
    { name: "Sunday Adebayo", crop: "Cassava Tubers", farmSize: "1.8 Hectares", passport: "NG-AG-OND-11", status: "Verified" },
    { name: "Emeka Obi", crop: "Poultry Feed Maize", farmSize: "5.0 Hectares", passport: "NG-AG-OND-23", status: "Pending Audit" },
    { name: profile.name, crop: profile.crops, farmSize: profile.farmSize, passport: `NG-AG-${profile.location.substring(0,3).toUpperCase()}-26`, status: "Verified" }
  ]);

  // Manager: wholesale market demand alerts
  const [demands, setDemands] = useState([
    {
      id: "dem-1",
      buyer: "AFEX Commodities Exchange",
      volumeNeeded: "120 Tons",
      cropType: "Grade-A Dry Grain",
      priceOffered: "₦480,000 / Ton",
      urgency: "Immediate (7 days)",
      status: "Open"
    },
    {
      id: "dem-2",
      buyer: "Ondo Feedmill Processing Ltd",
      volumeNeeded: "45 Tons",
      cropType: "Yellow Maize / Feed grains",
      priceOffered: "₦420,000 / Ton",
      urgency: "Medium (14 days)",
      status: "Open"
    },
    {
      id: "dem-3",
      buyer: "Lagos Mile 12 Wholesale Union",
      volumeNeeded: "80 Tons",
      cropType: "Starch Cassava / Tubers",
      priceOffered: "₦310,000 / Ton",
      urgency: "Immediate (4 days)",
      status: "Open"
    }
  ]);

  const [newPostText, setNewPostText] = useState("");
  const [chatFeed, setChatFeed] = useState([
    { name: "Baba Tunde", role: "Maize Lead", text: "Has anyone gotten fertilizer subsidies in our local ward this week?", time: "10:32 AM" },
    { name: "Emeka Obi", role: "Treasurer", text: "Reminder: we have our seasonal cooperative credit review meeting this Friday at the primary health center hall.", time: "11:15 AM" },
    { name: "Grace Alao", role: "Agronomist", text: "Rainfall looks consistent. Perfect window for organic mulching on sandy soil patches.", time: "1:05 PM" }
  ]);

  const handleJoinPool = (id: string) => {
    setPools(pools.map(p => {
      if (p.id === id) {
        const isJoining = !p.joined;
        return {
          ...p,
          joined: isJoining,
          currentWeight: isJoining ? p.currentWeight + 1.2 : p.currentWeight - 1.2
        };
      }
      return p;
    }));
  };

  const handlePostChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    setChatFeed([
      ...chatFeed,
      {
        name: profile.name,
        role: "You (Active Farmer)",
        text: newPostText.trim(),
        time: "Just Now"
      }
    ]);
    setNewPostText("");
  };

  const handleAcceptDemand = (id: string, buyerName: string) => {
    setSelectedDemandId(id);
    setDemands(demands.map(d => d.id === id ? { ...d, status: "Contracted" } : d));
    setManagerMessage(`Wholesale Contract successfully initiated with ${buyerName}! Automated SMS alerts dispatched to all matched cooperative members.`);
    setTimeout(() => setManagerMessage(null), 5000);
  };

  // Base dynamic calculations
  const totalCoopFarmers = 42;
  const jointBargainingGain = "+16.5%";
  const baseForecastValue = profile.farmSize.includes("Small") ? 35 : profile.farmSize.includes("Medium") ? 120 : 480;
  
  // Aggregate projections for coop managers
  const coopBaseMaize = 145;
  const coopBaseCassava = 95;
  const coopBaseLegumes = 40;

  const dynamicTotalMaize = Math.round(coopBaseMaize * yieldMultiplier);
  const dynamicTotalCassava = Math.round(coopBaseCassava * yieldMultiplier);
  const dynamicTotalLegumes = Math.round(coopBaseLegumes * yieldMultiplier);
  const dynamicGrandTotal = dynamicTotalMaize + dynamicTotalCassava + dynamicTotalLegumes;

  return (
    <div className="space-y-6">
      {/* Premium Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white p-6 rounded-3xl relative overflow-hidden shadow-md">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-widest bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-700/50 inline-block">
              👥 COOPERATIVE OPERATING HUB
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight font-sans">
              {coopName}
            </h2>
            <p className="text-xs md:text-sm text-emerald-100 font-medium max-w-2xl">
              Pool yields, secure collective transportation, mitigate common ecological risks, and directly unlock high-volume wholesale processing channels.
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-emerald-950/70 border border-emerald-700/50 px-4 py-3 rounded-2xl shrink-0">
            <Users className="h-5 w-5 text-brand-gold" />
            <div className="text-left">
              <p className="text-xs font-bold text-white">{totalCoopFarmers} Farmers</p>
              <p className="text-[9px] font-mono text-slate-400 font-bold uppercase">Active in State</p>
            </div>
          </div>
        </div>

        {/* View Mode Interactive Toggle Tabs */}
        <div className="flex gap-2 mt-6 border-t border-emerald-800 pt-4 relative z-10">
          <button
            onClick={() => setViewMode("farmer")}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition duration-150 flex items-center gap-1.5 ${
              viewMode === "farmer"
                ? "bg-brand-gold text-slate-950 shadow-sm"
                : "bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-100 border border-emerald-800/60"
            }`}
          >
            👥 Farmer Portal
          </button>
          <button
            onClick={() => setViewMode("manager")}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition duration-150 flex items-center gap-1.5 relative ${
              viewMode === "manager"
                ? "bg-brand-gold text-slate-950 shadow-sm"
                : "bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-100 border border-emerald-800/60"
            }`}
          >
            📊 Manager Dashboard (Admin)
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-[#121212] animate-ping" />
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-[#121212]" />
          </button>
        </div>
      </div>

      {/* Notifications banner */}
      <AnimatePresence>
        {managerMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-emerald-50 border border-emerald-100 text-brand-green rounded-2xl text-xs font-bold flex items-center gap-2"
          >
            <Sparkles className="h-4.5 w-4.5 text-brand-gold shrink-0 animate-spin" />
            <span>{managerMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER VIEW: farmer (original interface) */}
      {viewMode === "farmer" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left column: Cooperative Performance & Stats */}
          <div className="space-y-6 lg:col-span-1">
            {/* Dashboard Metrics */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-brand-green" /> Group Statistics
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Production Target</span>
                  <span className="text-base font-black text-slate-800 block mt-1">{baseForecastValue} Tons</span>
                  <span className="text-[9px] text-brand-green font-bold block mt-0.5">Aggregate pool</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                  <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Price Bargaining</span>
                  <span className="text-base font-black text-brand-green block mt-1">{jointBargainingGain}</span>
                  <span className="text-[9px] text-slate-500 font-semibold block mt-0.5">Above standard middleman</span>
                </div>
              </div>

              {/* Warehouse capacity bar */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase flex items-center gap-1">
                    <Warehouse className="h-3.5 w-3.5 text-brand-green" /> Shared Silo Storage
                  </span>
                  <span className="text-xs font-bold text-slate-700">65% Full</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-300">
                  <div className="bg-brand-gold h-full rounded-full" style={{ width: "65%" }} />
                </div>
                <p className="text-[9px] text-amber-600 font-bold mt-1.5 leading-normal">
                  ⚠️ High utilization. Group transport highly advised within 5 days to clear storage.
                </p>
              </div>
            </div>

            {/* Real-time Alerts */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-brand-gold" /> Coop Broadcast Alerts
              </h3>
              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-3 bg-slate-50 border-l-4 border-l-brand-gold rounded-r-2xl border border-slate-200 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-mono font-black text-brand-gold uppercase">{ann.tag}</span>
                      <span className="text-[9px] text-slate-400 font-mono">Today</span>
                    </div>
                    <p className="text-slate-700 font-semibold leading-relaxed">
                      {ann.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Middle/Right columns: Transport Pooling & Social Board */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Transport Pooling Board */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-brand-green animate-pulse" /> Active Joint Transport Pools
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Share transit costs by bulk-shipping together to high-volume metropolitan buyers.
                  </p>
                </div>
                <span className="bg-green-50 text-brand-green border border-green-100 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                  2 ACTIVE POOLS
                </span>
              </div>

              <div className="space-y-4">
                {pools.map((pool) => {
                  const filledPct = Math.round((pool.currentWeight / pool.maxWeight) * 100);
                  return (
                    <div key={pool.id} className="p-4 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-brand-green/30 rounded-2xl transition duration-150 relative overflow-hidden">
                      
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-slate-800">{pool.routeFrom}</span>
                            <ArrowRight className="h-3 w-3 text-slate-400" />
                            <span className="text-xs font-black text-brand-green">{pool.routeTo}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                            Truck: <strong className="text-slate-700">{pool.truckType}</strong> • Driver: <strong className="text-slate-700">{pool.driverName}</strong>
                          </p>
                        </div>

                        <div className="text-left md:text-right">
                          <span className="text-xs font-black text-slate-800">₦{pool.costPerTon.toLocaleString()}/Ton</span>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">Estimated collective cost</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200/50 pt-3">
                        {/* Bar and capacity status */}
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500">
                            <span>Pool Weight: <strong>{pool.currentWeight.toFixed(1)} / {pool.maxWeight} Tons</strong></span>
                            <span>{filledPct}% Full</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-brand-green h-full rounded-full" style={{ width: `${filledPct}%` }} />
                          </div>
                        </div>

                        {/* CTA */}
                        <button
                          onClick={() => handleJoinPool(pool.id)}
                          className={`py-2 px-4 rounded-xl text-xs font-bold transition duration-150 shrink-0 flex items-center gap-1 ${
                            pool.joined
                              ? "bg-emerald-500 text-white shadow-sm"
                              : "bg-white border border-slate-300 hover:border-brand-green hover:text-brand-green text-slate-600 shadow-sm"
                          }`}
                        >
                          {pool.joined ? (
                            <>
                              <Check className="h-4 w-4" /> Joined (1.2 Tons pooled)
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4" /> Join Pool (+1.2T)
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Cooperative Discussion Feed */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <MessageSquare className="h-4.5 w-4.5 text-brand-green" /> Cooperative Discussion Board
              </h3>
              
              <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                {chatFeed.map((msg, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs space-y-1">
                    <div className="flex justify-between items-center font-bold">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-800">{msg.name}</span>
                        <span className="text-[9px] bg-green-50 text-brand-green px-1.5 py-0.5 rounded-md border border-green-100 text-[10px] font-semibold">
                          {msg.role}
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">{msg.time}</span>
                    </div>
                    <p className="text-slate-600 font-semibold leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handlePostChat} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask your cooperative a question or share a market spot..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-brand-green hover:bg-green-700 text-white text-xs font-bold rounded-xl transition duration-150 active:scale-95 shadow-sm"
                >
                  Post
                </button>
              </form>
            </div>

          </div>

        </div>
      )}

      {/* RENDER VIEW: manager (aggregated cooperative administrator dashboard) */}
      {viewMode === "manager" && (
        <div className="space-y-6">
          
          {/* Top Aggregated Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-brand-green rounded-2xl border border-emerald-100">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block">Total Coop Forecast</span>
                <span className="text-xl font-black text-slate-800 block mt-0.5">{dynamicGrandTotal} Tons</span>
                <p className="text-[9px] text-brand-green font-bold">Accumulated yield data</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block">Wholesale Demand</span>
                <span className="text-xl font-black text-slate-800 block mt-0.5">245 Tons</span>
                <p className="text-[9px] text-blue-600 font-bold">Unmet contracted demand</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
                <BadgeAlert className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block">Active Risks Reported</span>
                <span className="text-xl font-black text-slate-800 block mt-0.5">3 Sectors</span>
                <p className="text-[9px] text-amber-600 font-bold">Countermeasures deployed</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
                <UserCheck className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block">Compliance Audits</span>
                <span className="text-xl font-black text-slate-800 block mt-0.5">97.6% Verified</span>
                <p className="text-[9px] text-purple-600 font-bold">Digital farm passports</p>
              </div>
            </div>

          </div>

          {/* Aggregated Forecast & Slider Simulator */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-brand-green" /> Cumulative Production Forecasts (Seasonal)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Aggregated predictive yields calculated from connected farmer profile sizes, crops, and live soil sensor parameters.
                </p>
              </div>
              <button 
                onClick={() => {
                  setManagerMessage("Downloading complete CSV production ledger...");
                  setTimeout(() => setManagerMessage(null), 3000);
                }}
                className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold rounded-xl text-xs transition duration-150 flex items-center gap-1.5 self-start sm:self-center border border-slate-200"
              >
                <Download className="h-3.5 w-3.5" /> Export Ledger
              </button>
            </div>

            {/* Slider Interactive Multiplier */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-600 flex items-center gap-1.5">
                  <Sliders className="h-4 w-4 text-brand-green" /> Crop Yield Sensitivity Simulator
                </span>
                <span className="font-mono bg-white border border-slate-200 px-2 py-0.5 rounded-md font-bold text-slate-700">
                  Multiplier: {yieldMultiplier.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={yieldMultiplier}
                onChange={(e) => setYieldMultiplier(parseFloat(e.target.value))}
                className="w-full accent-brand-green bg-slate-200 h-2 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 leading-normal font-medium">
                👉 Simulate rainfall variances, cooperative pest mitigation successes, or credit input distribution to forecast total bulk packaging shipments.
              </p>
            </div>

            {/* Simulated Visual Bar Chart */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">🌽 White & Yellow Maize</span>
                  <span className="text-xs font-mono font-black text-slate-800">{dynamicTotalMaize} Tons</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/60">
                  <div className="bg-brand-green h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (dynamicTotalMaize / 300) * 100)}%` }} />
                </div>
                <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">
                  28 Connected Smallholders Contributing
                </span>
              </div>

              <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">🍠 Starch-rich Cassava</span>
                  <span className="text-xs font-mono font-black text-slate-800">{dynamicTotalCassava} Tons</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/60">
                  <div className="bg-brand-gold h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (dynamicTotalCassava / 300) * 100)}%` }} />
                </div>
                <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">
                  11 Connected Smallholders Contributing
                </span>
              </div>

              <div className="p-4 border border-slate-200 rounded-2xl bg-white space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">🌱 Legumes & Soybeans</span>
                  <span className="text-xs font-mono font-black text-slate-800">{dynamicTotalLegumes} Tons</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/60">
                  <div className="bg-amber-600 h-full rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (dynamicTotalLegumes / 300) * 100)}%` }} />
                </div>
                <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">
                  3 Connected Smallholders Contributing
                </span>
              </div>

            </div>
          </div>

          {/* Market Demand & Risks Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Wholesale Market Demand Alerts */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <TrendingUp className="h-4.5 w-4.5 text-brand-green" /> Aggregated Market Demand Alerts
                </h3>
                <p className="text-[10px] text-slate-500 font-medium">
                  Direct large-volume buy orders matched with your cooperative's combined crop projections.
                </p>
              </div>

              <div className="space-y-3">
                {demands.map((demand) => (
                  <div key={demand.id} className="p-4 border border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition duration-150 relative overflow-hidden">
                    
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-bold text-slate-800">{demand.buyer}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded">
                            {demand.cropType}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase">
                            Vol: {demand.volumeNeeded}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-brand-green font-mono">{demand.priceOffered}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200/50 pt-3 mt-3 text-[10px] font-semibold">
                      <span className="text-amber-600 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Urgency: {demand.urgency}
                      </span>

                      <button
                        onClick={() => handleAcceptDemand(demand.id, demand.buyer)}
                        disabled={demand.status === "Contracted"}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition duration-150 shadow-sm ${
                          demand.status === "Contracted"
                            ? "bg-slate-200 text-slate-500 border border-slate-300 cursor-not-allowed"
                            : "bg-[#212121] text-white hover:bg-black"
                        }`}
                      >
                        {demand.status === "Contracted" ? "✓ Contracted" : "Accept Contract"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collective Risk Reporting & Mitigation */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldAlert className="h-4.5 w-4.5 text-brand-gold animate-pulse" /> Collective Risk Reporting
                </h3>
                <p className="text-[10px] text-slate-500 font-medium">
                  State-wide agricultural threats reported by connected smallholders requiring unified manager countermeasures.
                </p>
              </div>

              <div className="space-y-3">
                {collectiveRisks.map((risk) => (
                  <div key={risk.id} className="p-3.5 border border-slate-200 rounded-2xl bg-white space-y-2">
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className={`h-4 w-4 ${risk.severity === "High" ? "text-rose-500" : risk.severity === "Medium" ? "text-amber-500" : "text-emerald-500"}`} />
                        <span className="text-xs font-bold text-slate-800">{risk.hazard}</span>
                      </div>
                      <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md ${
                        risk.severity === "High" 
                          ? "bg-rose-50 text-rose-600 border border-rose-100" 
                          : risk.severity === "Medium"
                          ? "bg-amber-50 text-amber-600 border border-amber-100"
                          : "bg-emerald-50 text-brand-green border border-emerald-100"
                      }`}>
                        {risk.severity} Severity
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                      Mitigation Measure: <span className="text-slate-500 font-medium">{risk.measure}</span>
                    </p>

                    <div className="flex justify-between items-center border-t border-slate-100 pt-2 text-[9px] font-mono text-slate-400 font-bold">
                      <span>AFFECTED: {risk.affectedMembers} MEMBERS</span>
                      <span className="text-brand-green uppercase">STATUS: {risk.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Member compliance audit directory */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <UserCheck className="h-4.5 w-4.5 text-brand-green" /> Cooperative Member Compliance & Audits
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Verify digital farm passports, track ecozone verification status, and audit records to secure collective export eligibility.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-[9px] font-mono uppercase font-bold">
                    <th className="pb-3 pr-4">Member Name</th>
                    <th className="pb-3 px-4">Primary Crops</th>
                    <th className="pb-3 px-4">Active Farm Size</th>
                    <th className="pb-3 px-4">Digital Passport ID</th>
                    <th className="pb-3 pl-4 text-right">Compliance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {members.map((member, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-3.5 pr-4 font-bold text-slate-800">{member.name}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-500">{member.crop}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-600 font-mono">{member.farmSize}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">{member.passport}</td>
                      <td className="py-3.5 pl-4 text-right">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          member.status === "Verified"
                            ? "bg-emerald-50 text-brand-green border border-emerald-100"
                            : "bg-amber-50 text-amber-600 border border-amber-100"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${member.status === "Verified" ? "bg-brand-green" : "bg-brand-gold animate-pulse"}`} />
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
