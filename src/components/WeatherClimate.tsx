import React, { useState } from "react";
import { FarmerProfile } from "../types";
import { 
  CloudRain, 
  CloudSun, 
  Sun, 
  Droplets, 
  Thermometer, 
  Wind, 
  Compass, 
  Sparkles, 
  AlertTriangle,
  RefreshCw,
  TrendingDown,
  TrendingUp
} from "lucide-react";

interface WeatherClimateProps {
  profile: FarmerProfile;
}

export default function WeatherClimate({ profile }: WeatherClimateProps) {
  const [updating, setUpdating] = useState(false);
  const locationName = profile.location;

  const [forecast, setForecast] = useState([
    { day: "Today", temp: "31°C", condition: "Partly Cloudy", moisture: "62%", rainProb: "10%", icon: CloudSun },
    { day: "Tomorrow", temp: "29°C", condition: "Heavy Showers", moisture: "85%", rainProb: "90%", icon: CloudRain },
    { day: "Sunday", temp: "28°C", condition: "Thunderstorms", moisture: "90%", rainProb: "85%", icon: CloudRain },
    { day: "Monday", temp: "30°C", condition: "Intermittent Rain", moisture: "78%", rainProb: "60%", icon: CloudRain },
    { day: "Tuesday", temp: "32°C", condition: "Sunny Spells", moisture: "55%", rainProb: "20%", icon: Sun },
  ]);

  const handleRefresh = () => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl relative overflow-hidden shadow-md">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-widest bg-blue-950/60 px-3 py-1 rounded-full border border-blue-700/50 inline-block">
              🌤️ LOCALIZED ECO-CLIMATE CENTRE
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight font-sans">
              Weather & Climate Intelligence
            </h2>
            <p className="text-xs md:text-sm text-blue-100 font-medium max-w-2xl">
              Real-time radar feeds, precipitation models, and crop-specific micro-weather recommendations tailored to {locationName} State.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={updating}
            className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition duration-150 flex items-center gap-1.5 shadow-sm shrink-0"
          >
            <RefreshCw className={`h-4 w-4 ${updating ? "animate-spin" : ""}`} />
            {updating ? "Syncing Sensors..." : "Sync Radar Station"}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Current Conditions Block */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Thermometer className="h-4.5 w-4.5 text-blue-500" /> Current Metrics
            </h3>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-blue-100">
              Ondo Central Station
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-1">
              <span className="text-3xl font-black text-slate-800">30°C</span>
              <p className="text-xs text-slate-500 font-medium">Feels like 33°C • Humid Savannah</p>
            </div>
            <CloudSun className="h-12 w-12 text-amber-500 animate-pulse" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
              <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Soil Moisture</span>
              <span className="text-base font-black text-slate-800 block mt-1">68%</span>
              <p className="text-[10px] text-brand-green font-bold flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="h-3 w-3" /> Optimal for root crops
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
              <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Wind Speed</span>
              <span className="text-base font-black text-slate-800 block mt-1">12 km/h</span>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">SSW direction</p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
              <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Relative Humidity</span>
              <span className="text-base font-black text-slate-800 block mt-1">82%</span>
              <p className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5 mt-0.5">
                <AlertTriangle className="h-3 w-3" /> Fungal hazard alert
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
              <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">UV Index</span>
              <span className="text-base font-black text-slate-800 block mt-1">8.5 Very High</span>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">Noon shielding advised</p>
            </div>
          </div>
        </div>

        {/* 5-Day Agricultural Weather Forecast */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <CloudRain className="h-4.5 w-4.5 text-blue-500" /> 5-Day Predictive Outlook
            </h3>
            <span className="text-xs text-slate-500 font-semibold">Precipitation-weighted models</span>
          </div>

          <div className="space-y-3">
            {forecast.map((day, idx) => {
              const IconComponent = day.icon;
              return (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-300 transition duration-150">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white border border-slate-200 rounded-xl">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{day.day}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">{day.condition}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-2 sm:mt-0 justify-between sm:justify-start">
                    <div className="text-left sm:text-right">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase block">Temp</span>
                      <span className="text-xs font-extrabold text-slate-800">{day.temp}</span>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase block">Soil Moisture</span>
                      <span className="text-xs font-extrabold text-slate-800">{day.moisture}</span>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase block">Rain Prob</span>
                      <span className={`text-xs font-extrabold ${parseInt(day.rainProb) > 50 ? "text-blue-600" : "text-slate-700"}`}>
                        {day.rainProb}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* AI Advisory Climate Recommendations */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <Sparkles className="h-4.5 w-4.5 text-brand-gold" /> Proactive AI Climate Advisory Recommendations
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border-l-4 border-l-brand-green bg-green-50/30 rounded-r-2xl border border-slate-200 space-y-1.5">
            <span className="text-[9px] font-mono font-black text-brand-green uppercase tracking-wider block">Maize / Grains Advisory</span>
            <p className="text-xs font-bold text-slate-800">Coordinate top-dressing fertilizer with incoming rainfall</p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Heavy rain is expected tomorrow evening. Standard nitrogen application (NPK 15-15-15) is highly efficient when applied 12 hours before gentle to medium rainfall. Avoid application on Sunday as thunderstorm runoff will wash away nutrients.
            </p>
          </div>

          <div className="p-4 border-l-4 border-l-blue-600 bg-blue-50/20 rounded-r-2xl border border-slate-200 space-y-1.5">
            <span className="text-[9px] font-mono font-black text-blue-600 uppercase tracking-wider block">Root Crops & Tubers Advisory</span>
            <p className="text-xs font-bold text-slate-800">Construct drainage channels on sandy loam patches</p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Continuous soil moisture above 85% might induce rapid root hypoxia on younger Cassava root stalks. We recommend clearing adjacent ridge runoffs today to ensure standing water drains effectively during Saturday's heavy downpour.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
