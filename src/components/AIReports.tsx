import React, { useState } from "react";
import { FarmerProfile } from "../types";
import { 
  FileText, 
  Download, 
  Award, 
  TrendingUp, 
  Activity, 
  Calendar, 
  Sparkles, 
  CheckCircle,
  FileSpreadsheet,
  Coins,
  ShieldAlert,
  Layers,
  Search,
  Check,
  Zap,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIReportsProps {
  profile: FarmerProfile;
}

export default function AIReports({ profile }: AIReportsProps) {
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState<number>(-1);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  // List of 5 requested Reports
  const reportTemplates = [
    {
      id: "farm-health",
      title: "Farm Health Report",
      type: "Agronomic Diagnostics",
      icon: Activity,
      desc: "Comprehensive diagnostic audit covering soil micro-nutrients, weed competition indexes, pest hotspots, and biological IPM crop recipe compliance.",
      size: "1.4 MB",
      badge: "Highly Critical",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100",
      steps: [
        "Analyzing regional soil map arrays and moisture matrices...",
        "Evaluating crop nitrogen absorption ratios from satellite indicators...",
        "Simulating bio-pesticide leaf coverage requirements...",
        "Generating biological soil rejuvenation guidelines..."
      ],
      generate: () => ({
        soilNitrogen: "Medium-Low (Needs split application)",
        phLevel: "6.2 (Highly suitable for grains/tubers)",
        pestAlert: "High Risk of Fall Armyworm (Spodoptera frugiperda)",
        weedIndex: "12% weed density (Controlled)",
        organicMatter: "2.4% (Excellent soil humus index)",
        recommendations: [
          "Apply immediate 5% concentration Neem (Dongoyaro) leaf extract across leaf nodes to target insect eggs.",
          "Perform NPK 15-15-15 split application aroundCassava nodes (approx. 50g per node) prior to expected rains.",
          "Introduce deep grass mulching to retain active root humidity."
        ]
      })
    },
    {
      id: "financial",
      title: "Financial Report",
      type: "Cash Flow & ROI",
      icon: Coins,
      desc: "Detailed agribusiness capital statement detailing expected cost-benefit ratios, seed-to-yield ROI multipliers, and cooperative credit-readiness grades.",
      size: "1.1 MB",
      badge: "Credit Ready",
      badgeColor: "bg-emerald-50 text-brand-green border-emerald-100",
      steps: [
        "Querying commercial smallholder market indices (Lagos & Akure)...",
        "Structuring input expense ledger (fertilizer bags, seeds, logistics)...",
        "Calculating Net Present Value (NPV) & internal return rates...",
        "Formulating credit score grades compatible with NIRSAL boards..."
      ],
      generate: () => ({
        capitalInvestment: "₦145,000 (Seeds, bio-formulations, labor)",
        projectedRevenue: "₦480,000 to ₦540,000",
        netProfitMargin: "69.8% (Highly profitable seasonal yield)",
        roiRatio: "3.5x Capital Multiplier",
        creditScore: "765/850 (NIRSAL Grade-A Eligible)",
        recommendations: [
          "Pool harvest with local cooperative to negotiate 15% price premium with industrial starch processors.",
          "Keep daily operational expenditures logged in TessyFarm to unlock 8% interest micro-credits.",
          "Reserve 25% of profit for hermetic storage bag bulk purchases next season."
        ]
      })
    },
    {
      id: "market",
      title: "Market Opportunity Report",
      type: "Wholesale & Arbitration",
      icon: TrendingUp,
      desc: "Daily trade terminal scans analyzing wholesale price spikes in Bodija, Akure, and Mile-12, identifying direct purchase contracts.",
      size: "950 KB",
      badge: "Arbitrage Alert",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-100",
      steps: [
        "Connecting to southwest commercial wholesale price streams...",
        "Identifying direct processing contract arbitrage opportunities...",
        "Calculating haulage distance and logistics cost curves...",
        "Mapping buyer pricing matrices (Starch mills vs. Retail traders)..."
      ],
      generate: () => ({
        targetTerminal: "Akure Wholesale Depot / Bodija",
        currentPriceSpike: "₦1,850 per basket (+18% weekly surge)",
        buyerDemandLevel: "High (Processing mills active for Cassava/Maize)",
        logisticsBuffer: "12% fuel and transport premium factor",
        arbitrageBenefit: "₦42,000 extra revenue per wholesale batch",
        recommendations: [
          "Direct Cassava tubers to Akure starch processing mills immediately due to starch-content premiums.",
          "Delay grain sales by 3 weeks; price trends indicate short-supply price increases.",
          "Coordinate delivery haulage with local cooperative to halve transport fees."
        ]
      })
    },
    {
      id: "climate-risk",
      title: "Climate Risk Report",
      type: "Meteorological Resilience",
      icon: ShieldAlert,
      desc: "Weather-hazard simulation tracking dry spells, heavy precipitation run-offs, and temperature anomalies.",
      size: "1.2 MB",
      badge: "Climate Shield",
      badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
      steps: [
        "Pulling micro-radar precipitation forecast sequences...",
        "Evaluating soil water holding index for dry spells...",
        "Modeling pesticide runoff boundaries from expected rain...",
        "Calculating overall Farm Resilience Score index..."
      ],
      generate: () => ({
        resilienceScore: "84/100 (Highly resilient infrastructure)",
        imminentThreats: "August dry spell anomaly (moderate risk of water stress)",
        rainfallForecast: "Heavy rainfall window expected within 48-72 hours",
        runoffSusceptibility: "Low (Mitigated by ridge-planting configurations)",
        remedialPlan: "Urgent mulching and fertilizer timing alignment",
        recommendations: [
          "Execute fertilizer top-dressing within 12 hours before rain to ensure natural soil penetration without runoff.",
          "Install straw trenches around sloped boundaries to harvest rain moisture safely.",
          "Suspend spray chemicals during rain; high probability of chemical wash-away."
        ]
      })
    },
    {
      id: "performance",
      title: "Farm Performance Summary",
      type: "Executive Dashboard",
      icon: Layers,
      desc: "An all-in-one consolidated audit file aggregating your yield metrics, identity passports, and cooperative engagement scores.",
      size: "1.8 MB",
      badge: "Verified Ledger",
      badgeColor: "bg-purple-50 text-purple-600 border-purple-100",
      steps: [
        "Summoning identity verification blockchain metrics...",
        "Compiling historical action-plan achievement percentages...",
        "Formatting compliance metadata according to export standards...",
        "Structuring final executive summary print PDF..."
      ],
      generate: () => ({
        overallGrade: "Grade-A Operating Model",
        taskCompliance: "88% Action Plan achievements",
        cooperativeContribution: "Active (Gold Level Member)",
        blockchainTag: "SHA-256 Verified (0x4f7b...e92a)",
        exportReadiness: "Fully certified for EU/UK sustainable criteria",
        recommendations: [
          "Export this summary to the local agricultural officer to expedite subsidy grain bags.",
          "Complete outstanding action plan tasks to secure a 100% compliance rating.",
          "Renew digital passport before the upcoming harvest season."
        ]
      })
    }
  ];

  const handleGenerate = (rep: typeof reportTemplates[0]) => {
    setActiveReportId(rep.id);
    setGeneratedContent(null);
    setGenerationStep(0);

    // Simulate multi-stage operating system progress stream
    const interval = setInterval(() => {
      setGenerationStep((prev) => {
        if (prev < rep.steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setGeneratedContent(rep.generate());
          return prev;
        }
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111e16] via-[#1c3024] to-slate-900 text-white p-6 rounded-3xl relative overflow-hidden shadow-md">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1.5 relative z-10">
          <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-widest bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700/50 inline-block">
            📊 AI REPORT GENERATOR CORE
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight font-sans">
            AI Operations & Expert Ledgers
          </h2>
          <p className="text-xs md:text-sm text-teal-100 font-medium max-w-2xl">
            Acquire localized agronomic and financial evaluations tailored to your farm profile. Perfect for credit applications, cooperatives, and expert oversight.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Reports Selection Panel */}
        <div className="lg:col-span-1 space-y-3">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
            AVAILABLE DECISION TEMPLATES
          </span>
          
          <div className="space-y-3">
            {reportTemplates.map((rep) => {
              const Icon = rep.icon;
              const isGeneratingThis = activeReportId === rep.id;
              return (
                <div
                  key={rep.id}
                  onClick={() => !isGeneratingThis && handleGenerate(rep)}
                  className={`p-4 rounded-3xl border text-left cursor-pointer transition-all duration-150 flex flex-col gap-2.5 shadow-sm relative overflow-hidden ${
                    isGeneratingThis
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-slate-200 text-slate-700 hover:border-brand-green/30 hover:bg-slate-50/40"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-brand-green group-hover:bg-green-50 shrink-0">
                      <Icon className={`h-5 w-5 ${isGeneratingThis ? "text-brand-gold" : "text-brand-green"}`} />
                    </div>
                    <span className={`text-[8px] font-mono font-black border px-2 py-0.5 rounded-md uppercase ${rep.badgeColor}`}>
                      {rep.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className={`text-xs font-black tracking-tight ${isGeneratingThis ? "text-brand-gold" : "text-slate-800"}`}>
                      {rep.title}
                    </h4>
                    <p className={`text-[10px] font-medium leading-relaxed mt-1 ${isGeneratingThis ? "text-slate-300" : "text-slate-500"}`}>
                      {rep.desc}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2.5 border-t border-slate-100/10 text-[9px] font-mono font-bold">
                    <span className={isGeneratingThis ? "text-brand-gold" : "text-slate-400"}>
                      PDF FORMAT • {rep.size}
                    </span>
                    <span className="text-brand-green flex items-center gap-0.5">
                      Generate <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Compilation and Report Presentation Area */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm min-h-[400px] flex flex-col justify-between relative overflow-hidden">
            
            {/* If no report is selected */}
            {activeReportId === null && (
              <div className="my-auto text-center space-y-3 py-16">
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 text-slate-300 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <FileText className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-800">
                    No Report Selected
                  </h4>
                  <p className="text-[11px] text-slate-400 font-semibold max-w-sm mx-auto leading-normal">
                    Select any decision template from the left panel to execute our multi-agent diagnostic analysis and compile your farm ledger file.
                  </p>
                </div>
              </div>
            )}

            {/* If report is currently compiling/generating */}
            {activeReportId !== null && generatedContent === null && (
              <div className="my-auto space-y-6 py-12 max-w-md mx-auto w-full">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl border-4 border-brand-green/20 border-t-brand-green animate-spin" />
                    <Sparkles className="h-5 w-5 text-brand-gold absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono">
                      Compiling Farm AI Ledger
                    </h4>
                    <p className="text-[11px] text-slate-400 font-bold mt-1">
                      Generating specialized report based on Oyo soil vectors...
                    </p>
                  </div>
                </div>

                {/* Simulated detailed reasoning step indicators */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                  {reportTemplates.find(r => r.id === activeReportId)?.steps.map((stepText, idx) => {
                    const isPassed = generationStep > idx;
                    const isActive = generationStep === idx;
                    return (
                      <div key={idx} className="flex items-center gap-2.5 text-[10px] font-semibold">
                        {isPassed ? (
                          <div className="p-0.5 bg-emerald-500 rounded-full text-white shrink-0">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        ) : isActive ? (
                          <div className="w-4 h-4 border-2 border-brand-green border-t-transparent rounded-full animate-spin shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-slate-200 shrink-0" />
                        )}
                        <span className={isPassed ? "text-slate-500 line-through" : isActive ? "text-brand-green font-bold" : "text-slate-400"}>
                          {stepText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* If report is completed and ready */}
            {activeReportId !== null && generatedContent !== null && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Generated Report Header */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-brand-green uppercase tracking-widest block">
                      AI GENERATION COMPLETE • VERIFIED 🟢
                    </span>
                    <h3 className="text-base font-black text-slate-900">
                      {reportTemplates.find(r => r.id === activeReportId)?.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase font-mono">
                      Farmer: {profile.name} • Ecozone: {profile.location} • State: {profile.location.split(" ")[0]}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      alert("PDF Download successfully compiled! Your official report is now ready for presentation.");
                    }}
                    className="px-3.5 py-2 bg-[#212121] hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow transition active:scale-95 shrink-0"
                  >
                    <Download className="h-4 w-4" /> Download PDF
                  </button>
                </div>

                {/* Structured diagnostic outputs */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(generatedContent).map(([key, value]) => {
                      if (key === "recommendations") return null;
                      const readableKey = key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase());
                      return (
                        <div key={key} className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                            {readableKey}
                          </span>
                          <span className="text-xs font-bold text-slate-800 block mt-1 leading-normal">
                            {value as string}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recommendations segment */}
                  {generatedContent.recommendations && (
                    <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-3xl space-y-3">
                      <h4 className="text-[10px] font-mono font-bold text-brand-green uppercase tracking-widest flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-brand-gold animate-bounce" /> Recommended Action Items
                      </h4>
                      <div className="space-y-2">
                        {generatedContent.recommendations.map((rec: string, idx: number) => (
                          <div key={idx} className="flex gap-2.5 text-xs text-slate-700 font-semibold leading-relaxed">
                            <span className="text-brand-green font-bold">{idx + 1}.</span>
                            <p>{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom navigation helper */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[10px]">
                  <span className="text-slate-400 font-mono font-bold uppercase">
                    ID Tag: SHA-256 (0x{Math.floor(Math.random() * 10000000).toString(16)}...f8c2)
                  </span>
                  <button 
                    onClick={() => {
                      setActiveReportId(null);
                      setGeneratedContent(null);
                    }}
                    className="text-brand-green font-bold uppercase tracking-wider hover:underline"
                  >
                    Generate another report
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
