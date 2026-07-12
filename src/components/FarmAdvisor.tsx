import React, { useState, useEffect, useRef } from "react";
import { FarmerProfile, ChatMessage } from "../types";
import { Send, Sprout, ShieldAlert, ThermometerSun, AlertCircle, RefreshCw, BookOpen, Search, ExternalLink, Mic, MicOff, Volume2, VolumeX, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface FarmAdvisorProps {
  profile: FarmerProfile;
}

// Custom simple markdown formatter to handle bold, lists, and linebreaks elegantly in React 19
function renderFormattedText(text: string) {
  if (!text) return null;
  const lines = text.split("\n");
  return lines.map((line, idx) => {
    // Check if line is a bullet point
    if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
      const content = line.trim().substring(2);
      return (
        <li key={idx} className="ml-4 list-disc pl-1 text-sm text-slate-700 leading-relaxed mb-1.5 font-medium">
          {parseInlineFormatting(content)}
        </li>
      );
    }
    // Check if line is a heading
    if (line.trim().startsWith("### ")) {
      return (
        <h4 key={idx} className="text-sm font-bold text-brand-gold mt-4 mb-2">
          {parseInlineFormatting(line.trim().substring(4))}
        </h4>
      );
    }
    if (line.trim().startsWith("## ")) {
      return (
        <h3 key={idx} className="text-base font-bold text-brand-green mt-5 mb-2.5 border-b border-slate-100 pb-1">
          {parseInlineFormatting(line.trim().substring(3))}
        </h3>
      );
    }
    if (line.trim().startsWith("# ")) {
      return (
        <h2 key={idx} className="text-lg font-extrabold text-slate-900 mt-6 mb-3">
          {parseInlineFormatting(line.trim().substring(2))}
        </h2>
      );
    }
    // Regular paragraph
    if (line.trim() === "") {
      return <div key={idx} className="h-2" />;
    }
    return (
      <p key={idx} className="text-sm text-slate-700 leading-relaxed mb-2.5 font-medium">
        {parseInlineFormatting(line)}
      </p>
    );
  });
}

function parseInlineFormatting(text: string) {
  const parts: React.ReactNode[] = [];
  let currentText = text;
  let key = 0;

  while (currentText.includes("**")) {
    const startIdx = currentText.indexOf("**");
    const endIdx = currentText.indexOf("**", startIdx + 2);
    if (endIdx === -1) break;

    // Add text before **
    if (startIdx > 0) {
      parts.push(<span key={key++}>{currentText.substring(0, startIdx)}</span>);
    }
    // Add bold text
    parts.push(
      <strong key={key++} className="font-bold text-slate-900">
        {currentText.substring(startIdx + 2, endIdx)}
      </strong>
    );
    currentText = currentText.substring(endIdx + 2);
  }

  if (currentText.length > 0) {
    parts.push(<span key={key++}>{currentText}</span>);
  }

  return parts.length > 0 ? parts : text;
}

export default function FarmAdvisor({ profile }: FarmAdvisorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchUrls, setSearchUrls] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Speech synthesis and recognition states
  const [isListening, setIsListening] = useState(false);
  const [ttsActive, setTtsActive] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const loadingTexts = [
    "🌱 Agronomist Agent: Examining soil nitrogen absorption rates for Oyo State clays...",
    "📈 Market Scout AI: Fetching direct processing contract arbitrage tables...",
    "⚡ Climate Oracle: Mapping July rain forecasts and ridge water index...",
    "💰 Credit Analyst AI: Securing crop risk scores for NIRSAL readiness...",
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingTextIndex(0);
      interval = setInterval(() => {
        setLoadingTextIndex(prev => (prev + 1) % loadingTexts.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Initialize Speech Recognition API
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-NG"; // Tailored to Nigerian English pronunciation!

        rec.onstart = () => {
          setIsListening(true);
          setSpeechError(null);
        };

        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInput(transcript);
          }
        };

        rec.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          if (event.error === "not-allowed") {
            setSpeechError("Microphone permission denied.");
          } else {
            setSpeechError(`Speech error: ${event.error}`);
          }
          setIsListening(false);
        };

        rec.onend = () => {
          setIsListening(false);
        };

        setRecognition(rec);
      } catch (e) {
        console.error("Failed to initialize speech recognition:", e);
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      alert("Speech recognition is not fully supported in this browser environment. Try using Chrome, Safari or Edge.");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      try {
        setSpeechError(null);
        recognition.start();
      } catch (err) {
        console.error("Failed to start speech recognition", err);
      }
    }
  };

  // Speak back response function (Text to Speech)
  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    // Cancel ongoing synthesis
    window.speechSynthesis.cancel();

    // Strip markdown formatting characters for clean speech
    const cleanText = text
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/###\s+/g, "")
      .replace(/##\s+/g, "")
      .replace(/#\s+/g, "")
      .replace(/\*\s+/g, "")
      .substring(0, 320); // Speak first 320 characters summaries to be performant and light

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "en-NG"; 
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  // Stop text to speech
  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // Generate dynamic quick suggestions based on farmer crops
  const getQuickSuggestions = () => {
    const cropLower = (profile.crops || "").toLowerCase();
    if (cropLower.includes("maize")) {
      return [
        { icon: ShieldAlert, label: "Diagnose Fall Armyworm infestation", query: "What are the early signs of Fall Armyworm on maize leaves and what organic or chemical controls do you recommend for a small farm in Nigeria?" },
        { icon: Sprout, label: "NPK fertilizer schedule", query: "Can you design a calendar for applying NPK 15-15-15 and Urea on my maize, including exact crop growth weeks?" },
        { icon: ThermometerSun, label: "Climate-smart seed choices", query: "What climate-smart, drought-tolerant maize seed varieties are certified in Nigeria for my zone?" }
      ];
    }
    if (cropLower.includes("cassava")) {
      return [
        { icon: ShieldAlert, label: "Cassava Mosaic Virus remedy", query: "How do I spot Cassava Mosaic Disease and protect my field? What resistant stem cuttings are available?" },
        { icon: Sprout, label: "Intercropping Cassava options", query: "What are the best companion crops to intercrop with Cassava on my size of land to maximize income?" },
        { icon: BookOpen, label: "Improve root starch content", query: "How can I improve the soil nutrients to increase the size and starch content of my cassava tubers at harvest?" }
      ];
    }
    if (cropLower.includes("poultry") || cropLower.includes("bird") || cropLower.includes("chicken")) {
      return [
        { icon: ShieldAlert, label: "Newcastle & Gumboro protect", query: "What is the standard vaccination schedule and biosecurity checklist to protect poultry from Newcastle and Gumboro disease in Nigeria?" },
        { icon: ThermometerSun, label: "Reducing chicken heat stress", query: "My birds are panting from heat. How do I cool down my poultry pen using simple cost-effective local resources?" },
        { icon: Sprout, label: "Cheaper organic feed formula", query: "How can I blend local materials (like maize bran, soybean cake, fishmeal) to formulate affordable quality feed?" }
      ];
    }
    if (cropLower.includes("fish") || cropLower.includes("aquaculture") || cropLower.includes("catfish")) {
      return [
        { icon: Sprout, label: "Catfish water quality checks", query: "What are the optimal water parameters (pH, ammonia, temperature) for concrete catfish ponds and how do I manage them?" },
        { icon: ShieldAlert, label: "Prevent catfish mortality", query: "What causes catfish fingerlings to develop white spots or red skin? How do I treat it?" },
        { icon: BookOpen, label: "Grading and sorting schedule", query: "What is the recommended timing for grading my catfish to prevent cannibalism and promote uniform growth?" }
      ];
    }
    // General suggestions
    return [
      { icon: ShieldAlert, label: "Organic pest spray recipe", query: "How do I make a simple, effective organic pesticide spray using neem seeds (Dongoyaro) or local resources?" },
      { icon: ThermometerSun, label: "Coping with irregular rains", query: "Rainfall in my location has become unpredictable. What simple irrigation or mulching methods can conserve soil moisture?" },
      { icon: Sprout, label: "Best soil preparation tips", query: "What are the best methods to test and prepare my soil before the planting season without destroying the organic matter?" }
    ];
  };

  useEffect(() => {
    // Initial welcome message
    const welcomeText = `Hello, **${profile.name}**! 

I am your **AI Farm Advisor** on the TessyFarm Nexus platform. I've configured my agricultural brain to support your **${profile.farmSize}** farm of **${profile.crops}** located in **${profile.location} State**.

I am ready to help you with:
1. **Pest & Disease Diagnosis**: Identifying symptoms and recommending natural/organic or safe chemical treatments.
2. **Fertilizer & Soil Timing**: Proper organic manure composting and inorganic fertilizer scheduling.
3. **Livestock & Broiler Health**: Disease schedules and feed optimizations.
4. **Climate-Smart Adaptations**: Water conservation, mulching, and drought-resistant seeds.

What farming challenge would you like to solve today?`;

    setMessages([
      {
        role: "model",
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [profile]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    // Stop speaking old responses
    stopSpeaking();

    // Add user message
    const userMsg: ChatMessage = {
      role: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setSearchUrls([]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-8), // Keep recent context
          profile,
          module: "advisor"
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Server responded with an error.");
      }

      setMessages(prev => [...prev, {
        role: "model",
        text: "",
        agents: data.agents || ["Farm Advisor"],
        categories: data.categories || ["Crop Production"],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isStreaming: true
      }]);

      setLoading(false);

      if (data.searchUrls && data.searchUrls.length > 0) {
        setSearchUrls(data.searchUrls);
      }

      if (ttsActive) {
        speakText(data.text);
      }

      // Snappy and natural word-by-word streaming animation
      const words = data.text.split(" ");
      let currentWordIndex = 0;
      let accumulatedText = "";

      const intervalId = setInterval(() => {
        if (currentWordIndex < words.length) {
          accumulatedText += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
          setMessages(prev => {
            const copy = [...prev];
            if (copy.length > 0 && copy[copy.length - 1].role === "model") {
              copy[copy.length - 1] = {
                ...copy[copy.length - 1],
                text: accumulatedText
              };
            }
            return copy;
          });
          currentWordIndex++;
        } else {
          clearInterval(intervalId);
          setMessages(prev => {
            const copy = [...prev];
            if (copy.length > 0 && copy[copy.length - 1].role === "model") {
              copy[copy.length - 1] = {
                ...copy[copy.length - 1],
                isStreaming: false
              };
            }
            return copy;
          });
        }
      }, 15);

    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: "model",
        text: `⚠️ **Connection Error**: I could not retrieve agricultural advice. Please check that your Gemini API key is configured in the Secrets panel, or try again shortly.\n\n*Error details: ${err.message || "Unknown error"}*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setLoading(false);
    }
  };

  const suggestions = getQuickSuggestions();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)] min-h-[500px]">
      {/* Suggestions and Bio Rail */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        {/* Farm context card */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-green-50 rounded-lg border border-green-100">
              <Sprout className="h-4 w-4 text-brand-green" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Active Soil Profile</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400 font-semibold">Crops/Stock:</span>
              <span className="text-slate-800 font-bold">{profile.crops}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400 font-semibold">Size:</span>
              <span className="text-slate-800 font-bold">{profile.farmSize}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400 font-semibold">Ecozone:</span>
              <span className="text-brand-green font-bold">📍 {profile.location}</span>
            </div>
            <div className="py-1">
              <span className="text-slate-400 block mb-1 font-semibold">Target Challenge:</span>
              <span className="px-2 py-1 bg-amber-50 text-brand-gold border border-amber-100 rounded-md block font-bold text-center">
                {profile.challenge || "General Optimization"}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Advisor Suggestions */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 flex-1 overflow-y-auto">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-brand-green" /> Quick Diagnostics
          </h4>
          <div className="space-y-2.5">
            {suggestions.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.query)}
                  disabled={loading}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-green-50/50 border border-slate-200 hover:border-brand-green/30 transition-all text-xs text-slate-700 group focus:outline-none flex gap-2.5"
                >
                  <IconComp className="h-4 w-4 text-brand-green shrink-0 group-hover:scale-110 transition-transform mt-0.5" />
                  <span className="group-hover:text-brand-green font-semibold leading-relaxed">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main chat interface */}
      <div className="lg:col-span-3 flex flex-col bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden relative">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                <Sprout className="h-5 w-5 text-brand-green" />
              </div>
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-brand-green ring-2 ring-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">TessyFarm Nexus AI Agent</h3>
              <p className="text-[10px] font-mono font-bold text-slate-400">AGRICULTURAL INTELLIGENCE CORE • ACTIVE</p>
            </div>
          </div>
          {messages.length > 1 && (
            <button
              onClick={() => setMessages(prev => [prev[0]])}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
              title="Clear conversation"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Message feed */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[calc(100vh-25rem)]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3.5 text-sm shadow-sm border ${
                  msg.role === "user"
                    ? "bg-green-50 border-green-100 text-slate-800"
                    : "bg-slate-50 border-slate-200 text-slate-800"
                }`}
              >
                <div className="prose max-w-none break-words relative">
                  {renderFormattedText(msg.text)}
                  {msg.isStreaming && (
                    <span className="inline-block w-2 h-3.5 bg-brand-green ml-1 animate-pulse rounded" />
                  )}
                </div>

                {msg.role === "model" && (msg.agents || msg.categories) && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-col gap-2">
                    {msg.agents && msg.agents.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                        <span className="text-slate-400 font-mono font-bold uppercase tracking-wider text-[8px]">🧠 Orchestrated Experts:</span>
                        {msg.agents.map((agt, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-900 text-brand-gold border border-slate-800 rounded font-extrabold font-mono text-[8px] uppercase tracking-wide">
                            {agt}
                          </span>
                        ))}
                      </div>
                    )}
                    {msg.categories && msg.categories.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                        <span className="text-slate-400 font-mono font-bold uppercase tracking-wider text-[8px]">📚 Cited Knowledge:</span>
                        {msg.categories.map((cat, i) => (
                          <span key={i} className="px-2 py-0.5 bg-emerald-50 text-brand-green border border-green-100 rounded font-extrabold text-[8px] uppercase tracking-wide">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {msg.timestamp && (
                  <span className="block text-[10px] text-slate-400 text-right mt-1.5 font-mono font-medium">
                    {msg.timestamp}
                  </span>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 flex flex-col gap-2.5 max-w-[85%] shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest">Nexus Multi-Agent Engine</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 leading-normal">
                  <div className="w-3.5 h-3.5 border-2 border-brand-green border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>{loadingTexts[loadingTextIndex]}</span>
                </div>
              </div>
            </div>
          )}

          {/* Search grounding citations */}
          {searchUrls.length > 0 && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                <Search className="h-3.5 w-3.5 text-brand-green" />
                Verified Sources via Google Search Grounding:
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {searchUrls.map((url, i) => {
                  let host = url;
                  try { host = new URL(url).hostname; } catch(e) {}
                  return (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:border-brand-green/30 text-[10px] text-brand-green hover:text-green-700 rounded-md transition font-bold shadow-sm"
                    >
                      {host} <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Voice Speech Assistant feedback */}
        {isListening && (
          <div className="mx-4 mt-2 px-4 py-2.5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs text-slate-700 font-bold">
                Listening... Speak English, Yoruba, Hausa or Igbo now
              </span>
            </div>
            {/* Animated simple SVG audio-wave lines */}
            <div className="flex gap-0.5 items-center">
              <div className="w-1 h-3 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1 h-4 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              <div className="w-1 h-4 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: "450ms" }} />
            </div>
          </div>
        )}

        {speechError && (
          <div className="mx-4 mt-2 px-3 py-2 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-[10px] font-bold flex justify-between items-center">
            <span>{speechError}</span>
            <button onClick={() => setSpeechError(null)} className="text-[10px] hover:underline font-mono">Dismiss</button>
          </div>
        )}

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="p-4 border-t border-slate-200 bg-slate-50/50 flex gap-2 items-center"
        >
          {/* TTS Toggle Button */}
          <button
            type="button"
            onClick={() => {
              const active = !ttsActive;
              setTtsActive(active);
              if (!active) {
                stopSpeaking();
              } else {
                speakText("Voice response enabled. I will read solutions out loud.");
              }
            }}
            className={`p-3 rounded-xl border transition-all shrink-0 ${
              ttsActive 
                ? "bg-brand-gold text-slate-900 border-brand-gold shadow-sm" 
                : "bg-white text-slate-400 border-slate-200 hover:text-slate-600"
            }`}
            title={ttsActive ? "Mute automatic replies" : "Read replies out loud"}
          >
            {ttsActive ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Microphone button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-3 rounded-xl border transition-all shrink-0 ${
              isListening 
                ? "bg-red-500 text-white border-red-500 animate-pulse shadow-sm" 
                : "bg-white text-slate-500 border-slate-200 hover:text-brand-green hover:border-brand-green/40"
            }`}
            title={isListening ? "Stop listening" : "Ask with voice"}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder={isListening ? "Listening..." : `Ask a farming question (e.g. "My ${profile.crops.split(" ")[0]} leaves have spots")`}
            className="flex-1 bg-white hover:bg-slate-50/85 focus:bg-white border border-slate-200 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green text-slate-800 rounded-xl px-4 py-3 text-sm placeholder-slate-400 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-brand-green hover:bg-green-700 text-white p-3 rounded-xl disabled:opacity-40 transition-all shadow-sm active:scale-95 flex items-center justify-center shrink-0"
          >
            <Send className="h-4 w-4 font-bold" />
          </button>
        </form>
      </div>
    </div>
  );
}
