import React, { useState } from "react";
import { FarmerProfile } from "../types";
import { 
  BookOpen, 
  Search, 
  FileText, 
  Upload, 
  Check, 
  Plus, 
  Sparkles, 
  ChevronRight, 
  Download,
  Database,
  ArrowUpRight,
  Bookmark,
  Shield,
  HelpCircle,
  X,
  Clock,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface KnowledgeCentreProps {
  profile: FarmerProfile;
}

export default function KnowledgeCentre({ profile }: KnowledgeCentreProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [readingArticle, setReadingArticle] = useState<any | null>(null);
  const [customDocs, setCustomDocs] = useState<Array<{ name: string; size: string; date: string; category: string; pages: number }>>([
    { name: "NIRSAL_Smallholder_Credit_Framework_2025.pdf", size: "2.4 MB", date: "2026-03-12", category: "Farm Finance", pages: 28 },
    { name: "IITA_Maize_Hybrid_Weed_IPM_Manual.pdf", size: "4.1 MB", date: "2026-05-18", category: "Pest & Disease", pages: 52 },
    { name: "FAO_Climatic_Savannah_Adaptation_Guide.pdf", size: "1.8 MB", date: "2026-02-04", category: "Climate Smart Agriculture", pages: 18 },
  ]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // The 8 requested categories
  const categories = [
    { name: "Crops", icon: "🌱", count: 18 },
    { name: "Livestock", icon: "🐓", count: 12 },
    { name: "Aquaculture", icon: "🐟", count: 8 },
    { name: "Pest & Disease", icon: "🐛", count: 24 },
    { name: "Climate Smart Agriculture", icon: "☀️", count: 15 },
    { name: "Farm Finance", icon: "💰", count: 9 },
    { name: "Market Access", icon: "📈", count: 11 },
    { name: "Post-harvest Management", icon: "📦", count: 16 }
  ];

  // Highly rich, localized, and actionable articles matching each of the 8 categories
  const knowledgeArticles = [
    {
      id: "kb-1",
      title: "Optimizing Guinea Savannah Nitrogen Levels via Split-NPK Application",
      category: "Crops",
      docRef: "IITA_Savannah_NPK_Split_v2.pdf",
      summary: "Detailed guidelines for smallholder maize & grain growers in the Guinea Savannah zone. Standard NPK 15-15-15 is applied at week 3-4 (top dressing) followed by urea top-dressing at week 6.",
      benefits: "+18.2% grain density, 25% lower nitrogen runoff loss.",
      priority: "High",
      fullContent: `
# Split-NPK Application Guide for Guinea Savannah Crops
By Dr. Ayo Balogun, IITA Soil Science Lead

## Introduction
Nitrogen fertilizer loss through soil runoff is a major challenge in Oyo, Kaduna, and Benue states. Applying all your NPK fertilizer at planting is wasteful because young roots cannot absorb it all.

## The 2-Stage Split NPK Protocol
1. **Basal Application (At Planting / Week 1):** Apply 50kg of NPK 15-15-15 per acre. Place the fertilizer in a ring or shallow trench 5cm away from the stem and cover it with soil.
2. **Top Dressing (Week 4 to 6):** Apply 25kg of Urea per acre. Apply when the soil is damp (immediately after rain is ideal). This triggers rapid leaf growth and stem thickening.

## Expected Outcomes
- Improves grain cob sizing and kernel density by over 18.2%.
- Saves ₦22,000 per acre by eliminating fertilizer run-off waste.
      `
    },
    {
      id: "kb-2",
      title: "Neem Oil Extract (Dongoyaro) Formulation Recipes",
      category: "Pest & Disease",
      docRef: "NIHORT_Biological_Pesticide_Manual.pdf",
      summary: "A powerful biological insecticide utilizing crushed neem seeds and leaves steeped for 24 hours. Effectively neutralizes Fall Armyworm (Spodoptera frugiperda) and Stem Borers.",
      benefits: "Organic, zero chemical cost, zero chemical pesticide residue.",
      priority: "High",
      fullContent: `
# Homemade Dongoyaro (Neem Oil) Biological Insecticide Recipe
By National Horticultural Research Institute (NIHORT)

## Why Biological Neem?
Fall Armyworm has developed resistance to standard synthetic chemicals. Neem leaves contain azadirachtin, which naturally disrupts the feeding and breeding cycle of moths, caterpillars, and borers without toxic residues.

## Materials Required
- 1kg of fresh Dongoyaro (Neem) leaves or seeds
- 10 Liters of clean water
- 30ml of liquid black soap (Ose dudu) or hand dishwashing soap (used as an emulsifier)
- Standard knapsack sprayer

## Preparation & Application
1. **Crushing:** Crush the neem leaves or seeds thoroughly in a mortar.
2. **Steeping:** Steep the crushed pulp in 10 Liters of water for 24 hours in a cool, shaded place.
3. **Filtering:** Strain the brown liquid through a fine cloth to filter out solid leaf residues (which might clog the sprayer).
4. **Emulsification:** Stir in 30ml of liquid soap. This allows the neem oil to bind to water.
5. **Spraying:** Spray directly into the crop whorl (the center of the leaf clump) early in the morning or late in the evening. Repeat every 7 days.
      `
    },
    {
      id: "kb-3",
      title: "Triple-Layer Hermetic (PICS) Bag Storage Standards",
      category: "Post-harvest Management",
      docRef: "PICS_Global_Storage_v4.pdf",
      summary: "Instructions on grain sealing. Ensures grains are sun-dried below 12.5% moisture. Sealing cuts off oxygen, naturally suffocating weevils and protecting crops for up to 18 months.",
      benefits: "Eliminates post-harvest insect damage, zero chemical exposure.",
      priority: "High",
      fullContent: `
# Triple-Layer Purdue Improved Crop Storage (PICS) Manual
Purdue University & Federal Ministry of Agriculture Partnership

## Post-Harvest Preservation
Weevils can destroy up to 40% of harvested maize or cowpeas within 3 months. PICS bags use airtight multi-layer high-density polyethylene sheets to choke out oxygen.

## Crucial 4-Step Storage Guide
1. **Sun Drying:** Thoroughly dry your grain on clean tarpaulins. Test moisture level: place grains in a dry glass bottle with some table salt, shake. If salt clumps to the bottle, moisture is above 12.5% and needs more sun.
2. **Bag Inspection:** Ensure the PICS bag layers have no punctures.
3. **Sealing:** Fill the inner bag, twist the neck tightly, and bind with string. Repeat separately for the second and third outer layers.
4. **Storage:** Elevate the bags off the bare ground using wooden pallets. Keep away from rats.
      `
    },
    {
      id: "kb-4",
      title: "Catfish Fingerling Grading & Feeding Ratios",
      category: "Aquaculture",
      docRef: "FAO_Catfish_Farming_WestAfrica.pdf",
      summary: "Technical guide on size grading to eliminate cannibalism in concrete ponds. Recommends feed ratios from 2mm to 4mm floating extruded pellets based on average body weight.",
      benefits: "Reduces fingerling mortality from 35% to less than 5%.",
      priority: "Medium",
      fullContent: `
# Catfish (Clarias gariepinus) Pond Grading & Feed Formulation
FAO Aquaculture Technical Bulletin

## Solving Feed Cannibalism
When catfish fingerlings grow at different rates, larger shooters will eat smaller fingerlings. Regular size sorting is mandatory.

## Sizing & Feeding Protocol
1. **Weekly Grading:** Use floating plastic grates (sieve boxes) to separate fish into three distinct size groups: small, medium, and shooters. Move them to separate ponds.
2. **Feeding Schedule:** Feed fingerlings 5-8% of their body weight daily, split across three feeding sessions (7:00 AM, 1:00 PM, 6:00 PM).
3. **Feed Size Progression:**
   - Weight 2g - 10g: 1.5mm micro pellets
   - Weight 10g - 50g: 2.0mm floating pellets
   - Weight 50g+: 3.0mm to 4.0mm high-protein floating feed.
      `
    },
    {
      id: "kb-5",
      title: "NIRSAL Agricultural Credit & Loan Readiness Metrics",
      category: "Farm Finance",
      docRef: "NIRSAL_Smallholder_Credit_Framework_2025.pdf",
      summary: "Understand the requirements for smallholder cooperative loans. Emphasizes structured daily farm ledger logging, bank verification numbers (BVN), and cooperative pooling.",
      benefits: "Speeds up commercial micro-loan approval cycles.",
      priority: "Medium",
      fullContent: `
# NIRSAL Smallholder Credit Requirements Checklist
Nigeria Incentive-Based Risk Sharing System for Agricultural Lending

## Financial Readiness Steps
To access single-digit interest agricultural loans through NIRSAL or the Bank of Agriculture, smallholder farmers must pool risks.

## Eligibility Checklist
1. **Cooperative Registration:** Must be a member of a cooperative registered with your state’s Ministry of Cooperatives.
2. **BVN Linkage:** Ensure your Bank Verification Number is active and matches your biometric farm profile name.
3. **Daily Farm Logging:** Keep detailed records of your input costs, planting dates, and harvest weights. A 3-month consistent digital log on TessyFarm increases rating by 35%.
      `
    },
    {
      id: "kb-6",
      title: "Savannah Drought Mitigation via Grass Mulching",
      category: "Climate Smart Agriculture",
      docRef: "FAO_Climatic_Savannah_Adaptation_Guide.pdf",
      summary: "How applying dry savanna grass mulch around cassava stem nodes blocks soil solar moisture evaporation during prolonged dry spells.",
      benefits: "Retains up to 45% soil moisture during 2-week drought windows.",
      priority: "High",
      fullContent: `
# Drought-Proofing Cassava & Tubers using Savanna Grass Mulch
United Nations Environmental Programme (UNEP) Climate Adaptation

## Managing Evaporative Water Stress
With changing rainfall patterns, Oyo, Osun, and Oyo East see unpredictable 2-to-3 week rain pauses in July/August.

## Implementation Guide
- **Mulch Depth:** Apply a 10cm thick layer of dried elephant grass or savanna vetiver grass around the base of cassava ridges.
- **Benefits:** The mulch layer reflects solar heat, reduces soil temperature by 4°C, and prevents moisture evaporation.
- **Decomposition Bonus:** After the dry spell, the grass rots into rich, organic carbon soil humus.
      `
    },
    {
      id: "kb-7",
      title: "Poultry Biosecurity & Newcastle Prevention Standards",
      category: "Livestock",
      docRef: "NAPRI_Poultry_Biosecurity_Codes.pdf",
      summary: "Comprehensive hygiene, footbath protocols, and localized thermal management standards to combat Newcastle disease outbreaks in chicken coops.",
      benefits: "Reduces flock mortality rates from 24% to less than 4%.",
      priority: "High",
      fullContent: `
# National Animal Production Research Institute (NAPRI) Poultry Protocol
Newcastle & Gumboro Disease Management Guide

## Core Biosecurity Framework
Disease outbreaks are mostly transmitted through shoes, vehicles, and dirty water buckets.

## Essential Poultry Guard Procedures
1. **Sanitation footbaths:** Install a shallow plastic pan with Virkon or chlorine solution at the coop entrance. Every worker must dip boots.
2. **Water Sanitation:** Sanitize drinking water with safe water tablets or organic apple cider mixtures weekly.
3. **Flock Thermal Management:** Block cold dry Harmattan winds using tarpaulin curtains while maintaining roof vents for ammonia gas outflow.
      `
    },
    {
      id: "kb-8",
      title: "Direct Wholesale Sourcing Contracts & Market Arbitration",
      category: "Market Access",
      docRef: "FMAN_Market_Sourcing_Standards.pdf",
      summary: "How to prepare harvests for high-value direct sales contracts with flour millers, breweries, and food processors in major trading centers.",
      benefits: "Bypasses exploitative middle-men traders, increasing revenues.",
      priority: "High",
      fullContent: `
# Flour Millers Association of Nigeria (FMAN) Grain Sourcing
Standard Direct Offtake Contract Guide

## Bypassing Middlemen
Relying on random field traders results in extremely low pricing. Direct wholesale contracts guarantee fixed, profitable pricing.

## Preparing Harvest for Direct Offtake
1. **Size Sifting & Grading:** Grains must be graded into uniform size classes. Broken kernels must be less than 3%.
2. **Aflatoxin Testing:** Keep grains dry! Food processors reject any maize showing over 10 parts-per-billion aflatoxin levels. Use hermetic storage bags.
3. **Cooperative Volume Aggregation:** Most industrial mills require a minimum volume of 5 Tonnes. Cooperatives pool individual harvests to hit these minimum limits.
      `
    }
  ];

  const filteredArticles = knowledgeArticles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? art.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadFile(e.target.files[0]);
    }
  };

  const handleUploadFile = (file: File) => {
    if (!file.name.endsWith(".pdf")) {
      alert("Please upload PDF files only. The TessyFarm indexer only supports parsing PDF files.");
      return;
    }
    setUploading(true);
    setTimeout(() => {
      const newDoc = {
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        date: new Date().toISOString().split("T")[0],
        category: selectedCategory || "Crops",
        pages: Math.floor(Math.random() * 25) + 10
      };
      setCustomDocs([newDoc, ...customDocs]);
      setUploading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#14291e] to-slate-900 text-white p-6 rounded-3xl relative overflow-hidden shadow-md">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1.5 relative z-10">
          <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-widest bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700/50 inline-block">
            📚 COGNITIVE AGRICULTURAL KNOWLEDGE CORE
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight font-sans">
            Specialized Knowledge Base & Indexer
          </h2>
          <p className="text-xs md:text-sm text-teal-100 font-medium max-w-2xl leading-relaxed">
            Every recommendation from TessyFarm Nexus is derived from this indexed agronomical knowledge database. Drag and drop any custom agronomy manual, PDF, or regional guide below to embed it into the AI's localized memory vectors.
          </p>
        </div>
      </div>

      {/* Grid of 8 Required Categories */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
          INDEXED KNOWLEDGE SECTORS
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                className={`p-3.5 rounded-2xl border text-left transition duration-150 flex flex-col justify-between h-24 shadow-sm relative overflow-hidden ${
                  isSelected
                    ? "bg-[#212121] border-[#212121] text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:border-brand-green/30 hover:bg-slate-50/50"
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h4 className="text-[11px] font-extrabold tracking-tight leading-tight uppercase line-clamp-1">
                    {cat.name}
                  </h4>
                  <span className={`text-[9px] font-mono font-semibold block mt-0.5 ${isSelected ? "text-brand-gold" : "text-slate-400"}`}>
                    {cat.count} files indexed
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main split work space */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Knowledge Base Articles */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                <Database className="h-4.5 w-4.5 text-brand-green" /> Indexed Memory Records
              </h3>
              
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles & manuals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green placeholder-slate-400 font-semibold"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredArticles.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400 font-semibold">
                  No knowledge articles matched your filters. Clear filters or add custom PDF materials.
                </div>
              ) : (
                filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50 hover:border-brand-green/20 transition duration-150 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono font-extrabold text-brand-green bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase">
                            {art.category}
                          </span>
                          <h4 className="text-xs font-black text-slate-800 font-sans mt-1">
                            {art.title}
                          </h4>
                        </div>
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                          art.priority === "High" ? "bg-red-50 text-red-600 border border-red-100" : "bg-amber-50 text-brand-gold border border-amber-100"
                        }`}>
                          {art.priority} Priority
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        {art.summary}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-200 text-[10px]">
                        <div>
                          <strong className="text-slate-500 block">KEY OUTCOME / BENEFITS:</strong>
                          <span className="text-brand-green font-bold">{art.benefits}</span>
                        </div>
                        <div>
                          <strong className="text-slate-500 block">ORIGINAL SOURCE DOCUMENT:</strong>
                          <span className="text-slate-700 font-mono font-bold flex items-center gap-1">
                            <FileText className="h-3 w-3 text-slate-400 shrink-0" /> {art.docRef}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setReadingArticle(art)}
                      className="mt-3 py-2 px-4 bg-slate-900 hover:bg-black text-white rounded-xl text-[11px] font-bold shadow-sm transition duration-150 flex items-center gap-1.5 self-start"
                    >
                      <Eye className="h-3.5 w-3.5 text-brand-gold" /> Read Full Leaflet
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* PDF Document Indexer and Storage Architecture panel */}
        <div className="space-y-6">
          
          {/* Draggable upload panel */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
              <Upload className="h-4.5 w-4.5 text-brand-gold" /> PDF Doc Vector Indexer
            </h3>
            <p className="text-xs text-slate-500 leading-normal font-semibold">
              The interface's modular design automatically splits uploaded PDF texts into paragraphs and loads them as context without altering UI elements.
            </p>

            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById("pdf-upload-file")?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition duration-150 flex flex-col items-center justify-center gap-2 ${
                dragActive 
                  ? "border-brand-green bg-green-50/20" 
                  : "border-slate-200 hover:border-brand-gold/30 hover:bg-slate-50/50"
              }`}
            >
              <input 
                type="file" 
                id="pdf-upload-file" 
                accept=".pdf" 
                className="hidden" 
                onChange={handleFileChange} 
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-2 py-4">
                  <div className="w-6 h-6 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-mono font-bold text-slate-400">Embedding vectors...</span>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-slate-300 group-hover:text-brand-gold" />
                  <span className="text-xs font-bold text-slate-700">Drag & Drop PDF or Click</span>
                  <span className="text-[10px] text-slate-400 font-semibold font-mono">Max 10MB per manual • .pdf format</span>
                </>
              )}
            </div>
          </div>

          {/* List of currently indexed PDF files */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                ACTIVE VECTOR EMBEDDINGS
              </span>
              <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                {customDocs.length} DOCS
              </span>
            </div>

            <div className="space-y-3">
              {customDocs.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-brand-green/20 transition duration-150 flex items-start gap-3 relative overflow-hidden"
                >
                  <div className="p-2 bg-white rounded-lg border border-slate-200 text-brand-gold shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] font-bold text-slate-800 truncate leading-snug">
                      {doc.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[9px] text-slate-400 font-mono font-semibold">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.pages} pages</span>
                      <span>•</span>
                      <span className="text-brand-green font-bold">Indexed 🟢</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* DETAILED DOCUMENT READER MODAL */}
      <AnimatePresence>
        {readingArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReadingArticle(null)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="bg-white text-slate-800 border border-slate-200 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative z-10 flex flex-col max-h-[85vh] overflow-y-auto gap-6"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-extrabold text-brand-green bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase">
                      {readingArticle.category}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-400">
                      SOURCE: {readingArticle.docRef}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    {readingArticle.title}
                  </h3>
                </div>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition shrink-0"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Reader Content */}
              <div className="text-xs text-slate-600 leading-relaxed space-y-4 whitespace-pre-wrap font-semibold">
                {readingArticle.fullContent ? (
                  <div className="prose max-w-none text-slate-700">
                    {readingArticle.fullContent.split('\n').map((line: string, i: number) => {
                      if (line.startsWith('# ')) {
                        return <h2 key={i} className="text-lg font-extrabold text-slate-900 mt-4 mb-2">{line.replace('# ', '')}</h2>;
                      }
                      if (line.startsWith('## ')) {
                        return <h3 key={i} className="text-sm font-black text-slate-800 mt-3 mb-1.5 uppercase tracking-wide">{line.replace('## ', '')}</h3>;
                      }
                      if (line.startsWith('- ') || line.startsWith('* ')) {
                        return <li key={i} className="ml-4 list-disc text-slate-600 my-1">{line.replace(/^[-*]\s+/, '')}</li>;
                      }
                      if (/^\d+\.\s+/.test(line)) {
                        return <li key={i} className="ml-4 list-decimal text-slate-600 my-1">{line.replace(/^\d+\.\s+/, '')}</li>;
                      }
                      return line.trim() ? <p key={i} className="my-2">{line}</p> : null;
                    })}
                  </div>
                ) : (
                  <p>{readingArticle.summary}</p>
                )}
              </div>

              {/* Footer / Controls */}
              <div className="flex gap-3 justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-[9px] font-mono text-slate-400 font-bold flex items-center gap-1">
                  <Clock className="h-3 w-3" /> ~4 min read time
                </span>
                <button
                  type="button"
                  onClick={() => setReadingArticle(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold shadow transition active:scale-95"
                >
                  Dismiss Reader
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
