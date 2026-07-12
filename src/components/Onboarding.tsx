import React, { useState } from "react";
import { FarmerProfile } from "../types";
import { Sprout, MapPin, Scale, HelpCircle, Activity, Award, ArrowRight, User, Compass, TrendingUp, Coins, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

interface OnboardingProps {
  onComplete: (profile: FarmerProfile) => void;
}

const NIGERIAN_STATES = [
  "Benue",
  "Kano",
  "Oyo",
  "Kaduna",
  "Lagos",
  "Ogun",
  "Delta",
  "Anambra",
  "Plateau",
  "Nasarawa",
  "Taraba",
  "Cross River",
  "Edo",
  "Kwara",
  "Enugu",
  "Ondo",
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Bauchi",
  "Bayelsa",
  "Borneo",
  "Ebonyi",
  "Ekiti",
  "Gombe",
  "Imo",
  "Jigawa",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Niger",
  "Osun",
  "Rivers",
  "Sokoto",
  "Yobe",
  "Zamfara",
  "FCT Abuja"
];

const PRESET_CROPS = [
  { label: "Maize", emoji: "🌽" },
  { label: "Cassava", emoji: "🍠" },
  { label: "Rice", emoji: "🌾" },
  { label: "Tomato", emoji: "🍅" },
  { label: "Fish", emoji: "🐟" },
  { label: "Poultry", emoji: "🐔" },
  { label: "Cattle", emoji: "🐂" }
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<"landing" | "form">("landing");
  const [profile, setProfile] = useState<FarmerProfile>({
    name: "",
    location: "Benue",
    lga: "",
    farmType: "crop",
    crops: "Maize",
    farmSize: "Small (<2 hectares)",
    challenge: "Pest/Disease",
    experience: "Intermediate"
  });

  const [customCropActive, setCustomCropActive] = useState(false);
  const [customCropValue, setCustomCropValue] = useState("");

  const handleSelectCrop = (crop: string) => {
    if (crop === "custom") {
      setCustomCropActive(true);
      setProfile({ ...profile, crops: customCropValue || "" });
    } else {
      setCustomCropActive(false);
      setProfile({ ...profile, crops: crop });
    }
  };

  const handleCustomCropChange = (val: string) => {
    setCustomCropValue(val);
    setProfile({ ...profile, crops: val });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim() || !profile.crops.trim() || !profile.farmSize.trim()) {
      return;
    }
    onComplete(profile);
  };

  if (step === "landing") {
    return (
      <div id="landing-container" className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
        {/* Decorative backdrop gradients */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-green-600/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center mb-4 shadow-md rounded-full overflow-hidden border-2 border-slate-200 w-24 h-24"
          >
            <img 
              src="/src/assets/images/tessy_farm_logo_1783724208644.jpg" 
              alt="Tessy Farm Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            TessyFarm <span className="text-brand-green">Nexus AI</span>
          </h1>
          <p className="mt-2 text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
            Africa's AI Agricultural Operating System
          </p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10"
        >
          <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-slate-200 sm:px-10 text-center">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Your Digital AI Agent Awaits</h2>
            <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto leading-relaxed font-semibold">
              Empowering African smallholders and cooperatives with hyper-localized AI agronomy, real-time market data, and microfinance planning.
            </p>

            {/* Feature lists for landing page */}
            <div className="mt-8 space-y-4 text-left max-w-md mx-auto">
              <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                <div className="p-2.5 bg-green-50 rounded-xl text-brand-green h-10 w-10 shrink-0 flex items-center justify-center border border-green-100">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800">🌱 Hyper-Localized AI Advisor</h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5 leading-normal">
                    Get custom treatment advice for pests (like Armyworm), weather anomalies, and livestock diseases suited to your ecological zone.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                <div className="p-2.5 bg-amber-50 rounded-xl text-brand-gold h-10 w-10 shrink-0 flex items-center justify-center border border-amber-100">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800">📈 Live Market Scouting</h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5 leading-normal">
                    Track grain and food prices across Bodija, Kano, and Mile 12, reduce post-harvest rot, and connect with prospective bulk processors.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 h-10 w-10 shrink-0 flex items-center justify-center border border-blue-100">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800">💰 Automated Seasonal Budgets</h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5 leading-normal">
                    Model input costs, calculate ROI margins, check your digital credit readiness, and export standard Credit Passports for loan applications.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep("form")}
              className="mt-8 w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-sm font-bold text-white bg-brand-green hover:bg-green-700 shadow-md active:scale-95 transition-all duration-150"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-xs text-slate-400 relative z-10 max-w-sm mx-auto px-4 leading-relaxed font-semibold">
          TessyFarm Nexus AI supports smallholders and cooperatives to build reliable production records and optimize yield profitability.
        </div>
      </div>
    );
  }

  return (
    <div id="onboarding-container" className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Decorative vector background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-green-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center mb-4 shadow-md rounded-full overflow-hidden border-2 border-slate-200 w-20 h-20"
        >
          <img 
            src="/src/assets/images/tessy_farm_logo_1783724208644.jpg" 
            alt="Tessy Farm Logo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          TessyFarm <span className="text-brand-green">Nexus AI</span>
        </h2>
        <p className="mt-2 text-xs font-mono uppercase tracking-wider text-brand-gold font-bold">
          Building Africa's AI Operating System for Agriculture
        </p>
        <p className="mt-2 text-sm text-slate-500 max-w-lg mx-auto font-medium">
          Helping smallholder farmers make smarter decisions through AI-powered agronomy, market intelligence, financial planning, and climate resilience.
        </p>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10"
      >
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-slate-200 sm:px-10">
          <div className="mb-6 border-b border-slate-100 pb-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold leading-6 text-slate-800 font-sans">Farmer Profile Setup</h3>
              <p className="mt-1 text-xs text-slate-500 font-semibold">
                Initialize your customized agronomical agent and dashboards.
              </p>
            </div>
            <button 
              onClick={() => setStep("landing")}
              className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
            >
              Back
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* 1. Full Name */}
            <div>
              <label htmlFor="farmer-name" className="block text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <User className="h-4 w-4 text-brand-green" /> Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="name"
                  id="farmer-name"
                  required
                  placeholder="e.g. Chinedu Okafor"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="block w-full rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-brand-green focus:ring-brand-green px-4 py-3 text-sm focus:outline-none focus:ring-2 transition duration-200 font-semibold"
                />
              </div>
            </div>

            {/* 2. Location (State & LGA) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="farmer-location" className="block text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand-green" /> State
                </label>
                <div className="mt-1">
                  <select
                    id="farmer-location"
                    name="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="block w-full rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-brand-green focus:ring-brand-green px-4 py-3 text-sm focus:outline-none focus:ring-2 transition duration-200 font-semibold"
                  >
                    {NIGERIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state} State
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="farmer-lga" className="block text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand-gold" /> LGA <span className="text-[10px] text-slate-400 font-normal">(optional)</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="lga"
                    id="farmer-lga"
                    placeholder="e.g. Owo"
                    value={profile.lga || ""}
                    onChange={(e) => setProfile({ ...profile, lga: e.target.value })}
                    className="block w-full rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-brand-green focus:ring-brand-green px-4 py-3 text-sm focus:outline-none focus:ring-2 transition duration-200 font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* 3. Farming Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Farming Type
              </label>
              <div className="grid grid-cols-2 gap-3 font-semibold">
                {[
                  { id: "crop", label: "🌱 Crop Farming" },
                  { id: "livestock", label: "🐓 Livestock Farming" },
                  { id: "aquaculture", label: "🐟 Aquaculture" },
                  { id: "mixed", label: "🚜 Mixed Farming" },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setProfile({ ...profile, farmType: type.id as any })}
                    className={`p-3 text-xs rounded-xl border text-left transition duration-200 focus:outline-none ${
                      profile.farmType === type.id
                        ? "border-brand-green bg-green-50 text-brand-green font-bold shadow-sm"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700 font-semibold"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Main Crop/Livestock */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-brand-gold" /> Main Crop/Livestock
              </label>
              
              {/* Preset Crop/Livestock Pills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESET_CROPS.map((pc) => {
                  const isSelected = !customCropActive && profile.crops === pc.label;
                  return (
                    <button
                      key={pc.label}
                      type="button"
                      onClick={() => handleSelectCrop(pc.label)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition duration-150 focus:outline-none ${
                        isSelected
                          ? "bg-green-50 text-brand-green border-brand-green font-bold"
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-semibold"
                      }`}
                    >
                      {pc.emoji} {pc.label}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => handleSelectCrop("custom")}
                  className={`px-3 py-1.5 rounded-full text-xs border transition duration-150 focus:outline-none ${
                    customCropActive
                      ? "bg-green-50 text-brand-green border-brand-green font-bold"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-semibold"
                  }`}
                >
                  ✏️ Other...
                </button>
              </div>

              {/* Dynamic input if "Other" is active or for precise values */}
              {(customCropActive || !PRESET_CROPS.some(pc => pc.label === profile.crops)) && (
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    placeholder="Type your crop/livestock, e.g., Cocoa, Snail, Pepper"
                    value={profile.crops}
                    onChange={(e) => handleCustomCropChange(e.target.value)}
                    className="block w-full rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-brand-green focus:ring-brand-green px-4 py-3 text-sm focus:outline-none focus:ring-2 transition duration-200 font-semibold"
                  />
                </div>
              )}
            </div>

            {/* 5. Farm Size */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <Scale className="h-4 w-4 text-brand-green" /> Farm Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "Small (<2 hectares)",
                  "Medium (2-10 hectares)",
                  "Large (>10 hectares)"
                ].map((size) => {
                  const isSelected = profile.farmSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setProfile({ ...profile, farmSize: size })}
                      className={`p-2.5 text-[10px] sm:text-xs rounded-xl border text-center transition duration-150 focus:outline-none ${
                        isSelected
                          ? "border-brand-green bg-green-50 text-brand-green font-bold shadow-sm"
                          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700 font-semibold"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Current Farming Challenge */}
            <div>
              <label htmlFor="farmer-challenge" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-brand-gold" /> Current Farming Challenge
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Pest/Disease",
                  "Low Yield",
                  "Market Access",
                  "High Input Cost",
                  "Finance",
                  "Climate/Weather",
                  "Storage/Post-harvest Loss"
                ].map((ch) => {
                  const isSelected = profile.challenge === ch;
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setProfile({ ...profile, challenge: ch })}
                      className={`p-2.5 text-left text-xs rounded-xl border transition duration-150 focus:outline-none truncate ${
                        isSelected
                          ? "border-brand-green bg-green-50 text-brand-green font-bold shadow-sm"
                          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700 font-semibold"
                      }`}
                    >
                      ⚠️ {ch}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 7. Farming Experience */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <Award className="h-4 w-4 text-brand-green" /> Farming Experience
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "beginner", label: "Beginner" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "experienced", label: "Experienced" }
                ].map((exp) => {
                  const isSelected = profile.experience === exp.value;
                  return (
                    <button
                      key={exp.value}
                      type="button"
                      onClick={() => setProfile({ ...profile, experience: exp.value as any })}
                      className={`p-2.5 text-xs rounded-xl border text-center transition duration-150 focus:outline-none ${
                        isSelected
                          ? "border-brand-green bg-green-50 text-brand-green font-bold shadow-sm"
                          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700 font-semibold"
                      }`}
                    >
                      {exp.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!profile.name.trim() || !profile.crops.trim() || !profile.farmSize.trim()}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-brand-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green shadow-sm active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 font-semibold"
              >
                Launch Farm Operating System
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      <div className="mt-8 text-center text-xs text-slate-400 relative z-10 max-w-sm mx-auto px-4 leading-relaxed font-semibold">
        TessyFarm Nexus AI supports smallholders and cooperatives to build reliable production records and optimize yield profitability.
      </div>
    </div>
  );
}
