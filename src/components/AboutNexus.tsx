import React from "react";
import { 
  Compass, 
  Target, 
  Eye, 
  Cpu, 
  Settings, 
  ShieldCheck, 
  Users, 
  Zap, 
  Map, 
  ArrowRight,
  Sparkles
} from "lucide-react";

interface AboutNexusProps {
  profile: any;
}

export default function AboutNexus({ profile }: AboutNexusProps) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 animate-fade-in">
      
      {/* Hero Header Card */}
      <div className="bg-gradient-to-br from-[#212121] to-[#121212] text-white rounded-3xl p-8 relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-4 max-w-3xl relative z-10">
          <span className="px-3 py-1 bg-brand-gold/20 text-brand-gold text-[10px] font-mono font-black rounded-full border border-brand-gold/30 uppercase tracking-widest">
            OPERATING SYSTEM PHILOSOPHY
          </span>
          <h2 className="text-3xl font-black tracking-tight text-white leading-tight">
            TessyFarm <span className="text-brand-gold">Nexus AI</span>
          </h2>
          <p className="text-slate-300 font-medium text-sm leading-relaxed">
            The digital agricultural operating system built to foster agrarian prosperity, food self-sufficiency, and climate-smart resilience for smallholder cooperatives across Africa.
          </p>
          <p className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">
            Designed & Engineered by Oracle69 Systems
          </p>
        </div>
      </div>

      {/* Mission & Vision Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mission Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 text-brand-green rounded-2xl border border-green-100">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Core Purpose</span>
              <h3 className="text-lg font-black text-slate-800">Our Mission</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-semibold">
            To equip African smallholders with robust, offline-capable artificial intelligence. By demystifying complex soil metrics, forecasting dynamic terminal market prices, and validating field-level identity data, we enable farmers to move from survival agriculture to business scale.
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-brand-gold rounded-2xl border border-amber-100">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Future Horizon</span>
              <h3 className="text-lg font-black text-slate-800">Our Vision</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-semibold">
            To build Africa's unified agricultural data ledger. We envision a connected rural ecosystem where every smallholder possesses a secure digital passport, credit readiness metrics, cooperative transport channels, and real-time climate adaptive recommendations.
          </p>
        </div>

      </div>

      {/* How It Works - The Multi-Agent Cognitive Engine */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-md space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-[9px] font-mono text-brand-gold font-bold uppercase tracking-widest block">
            COGNITIVE ROUTING ARCHITECTURE
          </span>
          <h3 className="text-xl font-black text-white flex items-center gap-2 mt-1">
            <Cpu className="h-5 w-5 text-brand-gold" /> How TessyFarm Nexus AI Works
          </h3>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl font-medium">
          TessyFarm Nexus is not a generic chatbot. It runs a custom-engineered **Multi-Agent Orchestrator** which breaks down complex farming queries and dispatches them to six specialized AI Agents working in unison:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              num: "01",
              name: "AI Farm Advisor",
              desc: "Guides overall operations, greets farmers warmly, and synchronizes offline bio-profiles."
            },
            {
              num: "02",
              name: "AI Agronomist",
              desc: "Specializes in biological pest control formulas (like Neem), soil pH metrics, and plant spacing."
            },
            {
              num: "03",
              name: "AI Market Intelligence",
              desc: "Monitors regional crop prices, scans bulk buyer demands, and tracks food processing terminals."
            },
            {
              num: "04",
              name: "AI Finance Advisor",
              desc: "Models seasonal budgets, estimates ROI rates, and evaluates formal credit readiness profiles."
            },
            {
              num: "05",
              name: "AI Logistics Planner",
              desc: "Optimizes transport pooling routes, warehouse bulk storage, and cooperative shipping."
            },
            {
              num: "06",
              name: "AI Compliance Officer",
              desc: "Validates pesticide maximum residue limits (MRLs), safety codes, and organic certificates."
            }
          ].map((agent, i) => (
            <div key={i} className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-black text-brand-gold">{agent.num}</span>
                <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-[8px] font-mono font-bold text-slate-300">ACTIVE</span>
              </div>
              <strong className="text-white text-sm block font-sans">{agent.name}</strong>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{agent.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">
            NATIVE CLOUD INDUSTRIAL INGREDIENTS
          </span>
          <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5 mt-0.5">
            <Settings className="h-4.5 w-4.5 text-brand-green" /> The Technical Stack
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <strong className="text-slate-800 text-sm block">Google Gemini</strong>
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">AI Reasoning Engine</span>
            <p className="text-[10px] text-slate-500 leading-normal font-semibold">Gemini 3.5 Flash Model via @google/genai SDK</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <strong className="text-slate-800 text-sm block">Search Grounding</strong>
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Real-time Verify</span>
            <p className="text-[10px] text-slate-500 leading-normal font-semibold">Integrates direct Google Search queries to verify localized weather & prices</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <strong className="text-slate-800 text-sm block">React & Tailwind</strong>
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Core Frontend SPA</span>
            <p className="text-[10px] text-slate-500 leading-normal font-semibold">Lightweight and fully responsive, ensuring ultra-fast load over edge 3G/4G networks</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <strong className="text-slate-800 text-sm block">Express & Node.js</strong>
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Secure Proxy API</span>
            <p className="text-[10px] text-slate-500 leading-normal font-semibold">Acts as a secure proxy to process AI requests and safely shield keys from browser devtools</p>
          </div>
        </div>
      </div>

      {/* Target Users & Value Propositions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Value Proposition */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="h-4.5 w-4.5 text-brand-green" /> Key Benefits for Farmers
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
            <li className="flex gap-2 items-start">
              <span className="text-brand-green font-bold">✓</span>
              <span><strong>Actionable Reports</strong>: Every diagnostic parses directly into a custom-tailored checklist in under 5 seconds.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-brand-green font-bold">✓</span>
              <span><strong>Financial Security</strong>: Items compiled in Naira with exact NIRSAL credit benchmarks.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-brand-green font-bold">✓</span>
              <span><strong>Trust Verification</strong>: QR-enabled Digital Passport blocks middlemen from copying source farm metrics.</span>
            </li>
          </ul>
        </div>

        {/* Target Users */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
            <Users className="h-4.5 w-4.5 text-brand-gold" /> Target Users
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
            <li className="flex gap-2 items-start">
              <span className="text-brand-gold font-bold">★</span>
              <span><strong>Smallholder Cooperatives</strong>: Farmers pooling harvests to get optimal bulk pricing.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-brand-gold font-bold">★</span>
              <span><strong>Rural Extension Officers</strong>: Using TessyFarm as a reference field handbook on biological pest remedies.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-brand-gold font-bold">★</span>
              <span><strong>Agri-processors & Off-takers</strong>: Finding verified compliance data on chemical residues directly on ledger.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Strategic Roadmap */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest block">
            THE LONG-TERM SCALABILITY VISION
          </span>
          <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5 mt-0.5">
            <Map className="h-4.5 w-4.5 text-brand-green" /> TessyFarm Strategic Roadmap
          </h3>
        </div>

        <div className="relative border-l-2 border-slate-100 pl-6 space-y-6 ml-2 text-xs font-semibold">
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-brand-green border-4 border-white shadow-sm" />
            <h4 className="font-extrabold text-slate-800 text-sm">Phase 1: Coordinated Multi-Agent Operating System (Current)</h4>
            <p className="text-slate-500 mt-0.5">Integration of 6 specialized agents, localized Nigerian market pricing portals, microclimate weather indices, and vector-backed knowledge center.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow-sm" />
            <h4 className="font-extrabold text-slate-700 text-sm opacity-90">Phase 2: Local Language Audio Dialects (Q3 2026)</h4>
            <p className="text-slate-500 mt-0.5">Deploying native voice models to read out extension advisory bulletins in Hausa, Yoruba, Igbo, and Nigerian Pidgin for low-literacy rural communities.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow-sm" />
            <h4 className="font-extrabold text-slate-700 text-sm opacity-90">Phase 3: Decentralized Blockchain Traceability (Q1 2027)</h4>
            <p className="text-slate-500 mt-0.5">Porting the AI Digital Passports into a true decentralized gas-optimized blockchain ledger for international food exports validation.</p>
          </div>
        </div>
      </div>

      {/* Sealed Certificate Seal */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl text-center space-y-2">
        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">SYSTEM AUDIT VERIFICATION STATUS</span>
        <p className="text-xs text-slate-600 font-bold">TessyFarm Nexus AI is verified as fully compliant with smallholder operability guidelines.</p>
        <span className="inline-block px-3 py-1 bg-slate-900 text-brand-gold border border-slate-800 rounded font-bold font-mono text-[9px] uppercase tracking-wide">
          OFFICIAL SYSTEM OF RECORD • ORACLE69 SYSTEMS
        </span>
      </div>

    </div>
  );
}
