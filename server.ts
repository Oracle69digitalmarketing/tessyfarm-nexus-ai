import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to clean JSON strings returned by the AI before parsing
function cleanJsonString(str: string): string {
  let cleaned = str.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```json/i, "").replace(/```$/i, "").trim();
  }
  return cleaned;
}

// Robust fallback model array for Groq Chat Completions
const GROQ_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-70b-versatile",
  "llama-3.1-8b-instant",
  "mixtral-8x7b-32768"
];

// Secure server-side call helper for Groq with automatic model fallbacks
async function callGroqWithFallback(messages: any[], isJson: boolean = false): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY environment variable is required but was not provided. Please set it in Settings > Secrets.");
  }

  let lastError: any = null;

  for (const model of GROQ_MODELS) {
    try {
      const payload: any = {
        model,
        messages,
        temperature: isJson ? 0.1 : 0.7,
      };

      if (isJson) {
        payload.response_format = { type: "json_object" };
      }

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "User-Agent": "aistudio-build"
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Groq API error (${res.status}): ${errBody}`);
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        return content;
      }
      throw new Error("No content received from Groq API response choice.");
    } catch (err: any) {
      console.warn(`[Groq Fallback Engine] Failed with model ${model}:`, err.message || err);
      lastError = err;
      // Continue to next fallback model
    }
  }

  throw lastError || new Error("All Groq models in the fallback pipeline failed to respond.");
}

// Specialist Agent Execution Helper
async function callSpecialistAgent(agentName: string, query: string, profile: any, moduleContext: string): Promise<string> {
  const profileStr = profile ? JSON.stringify(profile) : "No profile available";
  let specialistInstructions = "";

  switch (agentName) {
    case "Farm Advisor Agent":
      specialistInstructions = `
        You are the Farm Advisor Agent. You coordinate overall smallholder farm planning, crop calendars, and local farming schedules in Nigeria.
        Focus: Practical local recommendations, encouraging words, simple instructions, and general crop management coordination.
      `;
      break;
    case "Agronomist Agent":
      specialistInstructions = `
        You are the Agronomist Agent. You are a scientific crop and soil health expert.
        Focus: Soil nutrients (NPK, Urea, organic manure), soil pH correction, companion cropping, organic/botanical IPM recipes (like neem seed/Dongoyaro spray), plant disease treatment (cassava mosaic, blight, armyworm), and precise planting intervals.
      `;
      break;
    case "Market Intelligence Agent":
      specialistInstructions = `
        You are the Market Intelligence Agent. You are a commodity pricing, grading, and post-harvest sales expert.
        Focus: Wholesale pricing trends in local markets (e.g., Mile 12, Bodija, Dawanau), curing/sorting guidelines, hermetic bags storage (PICS bags), matching harvests with buyers (cooperatives, local food processors), and timing bulk sales.
      `;
      break;
    case "Finance Agent":
      specialistInstructions = `
        You are the Finance Agent. You are an expert agricultural accountant and farm credit advisor.
        Focus: Meticulous Naira (₦) input budgeting, cost reduction, estimating gross revenue, cash flow peaks, return on investment (ROI %), credit-readiness practices, BOA/NIRSAL micro-credit guidelines, and cooperative savings groups.
      `;
      break;
    case "Logistics Agent":
      specialistInstructions = `
        You are the Logistics Agent. You are an expert in rural agricultural transportation and supply chains.
        Focus: Cooperative harvest pooling, negotiating local truck/transit costs, safe packaging methods for transit (to avoid tuber bruising or leaf spoilage), scheduling shared transit, and local transport route safety.
      `;
      break;
    case "Compliance Agent":
      specialistInstructions = `
        You are the Compliance Agent. You are a standards, safety, and regulatory officer.
        Focus: Safe pesticide chemical application, Maximum Residue Limits (MRLs), pre-harvest chemical withdrawal periods, organic standards compliance, livestock/poultry biosecurity protocols (vaccinations, quarantine), and food hygiene.
      `;
      break;
    default:
      specialistInstructions = "You are a helpful multi-agent farming assistant. Provide specific, practical agricultural advice.";
  }

  const prompt = `
    User Query: "${query}"
    Farmer Profile: ${profileStr}
    Module Context: ${moduleContext}

    Task:
    Provide 2-3 specific, highly professional, expert bullet-point recommendations purely from your domain of expertise.
    Keep your response concise, actionable, and tailored to the query and farmer's details.
    Do NOT write conversational greetings, introductions, or conclusions. Your notes will be compiled directly by the Orchestrator.
  `;

  const messages = [
    { role: "system", content: specialistInstructions },
    { role: "user", content: prompt }
  ];

  // For speed, use the instant model or let the fallback system handle it
  return await callGroqWithFallback(messages, false);
}

// 1. CHAT ENDPOINT - Implementing the Orchestrated Multi-Agent Architecture
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [], profile, module = "general" } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    console.log(`[Multi-Agent Router] Analyzing request: "${message.substring(0, 50)}..."`);

    // --- STEP 1: ROUTING LAYER ---
    const routerSystemPrompt = `
      You are the Orchestrator Router for TessyFarm Nexus AI, an agricultural multi-agent engine.
      Your job is to analyze the user's query and determine which of the 6 specialized agents must be activated to provide a comprehensive response.

      The 6 agents are:
      1. "Farm Advisor Agent" - General farm advice, extension officer greetings, and overall management.
      2. "Agronomist Agent" - Soil nutrients, crop growth, pests/diseases, companion cropping, biological IPM.
      3. "Market Intelligence Agent" - Local commodity prices, market trends in Nigeria, buyer discovery, post-harvest curing/grading.
      4. "Finance Agent" - Production cost estimating, cash flow, credit readiness, microloans, ROI calculation.
      5. "Logistics Agent" - Crop bulk transportation, cooperative pooling, warehouse transit safety.
      6. "Compliance Agent" - Pesticide residues (MRLs), food safety, biosecurity protocols, organic certification.

      You MUST select between 1 and 4 relevant agents. "Farm Advisor Agent" is always selected as the general coordinator.
      
      Respond strictly in JSON format. Do not use markdown backticks.
      Format:
      {
        "relevantAgents": ["Farm Advisor Agent", "Agronomist Agent"],
        "reasoning": "Brief explanation of why these agents were selected."
      }
    `;

    const routerMessages = [
      { role: "system", content: routerSystemPrompt },
      { role: "user", content: `User Query: "${message}"\nFarmer Profile: ${profile ? JSON.stringify(profile) : "None"}` }
    ];

    let relevantAgents = ["Farm Advisor Agent"];
    try {
      const routerReply = await callGroqWithFallback(routerMessages, true);
      const parsedRouter = JSON.parse(cleanJsonString(routerReply));
      if (Array.isArray(parsedRouter.relevantAgents) && parsedRouter.relevantAgents.length > 0) {
        // Normalize agents list to make sure they are valid
        const validAgents = [
          "Farm Advisor Agent",
          "Agronomist Agent",
          "Market Intelligence Agent",
          "Finance Agent",
          "Logistics Agent",
          "Compliance Agent"
        ];
        relevantAgents = parsedRouter.relevantAgents.filter((a: string) => validAgents.includes(a));
        if (!relevantAgents.includes("Farm Advisor Agent")) {
          relevantAgents.unshift("Farm Advisor Agent");
        }
      }
    } catch (routeErr) {
      console.warn("[Multi-Agent Router] Routing failed, falling back to all-agent or default:", routeErr);
      // Fallback selection based on query keywords
      const queryLower = message.toLowerCase();
      if (queryLower.includes("soil") || queryLower.includes("fertilizer") || queryLower.includes("disease") || queryLower.includes("pest") || queryLower.includes("crop")) {
        relevantAgents.push("Agronomist Agent");
      }
      if (queryLower.includes("price") || queryLower.includes("market") || queryLower.includes("sell") || queryLower.includes("buyer")) {
        relevantAgents.push("Market Intelligence Agent");
      }
      if (queryLower.includes("money") || queryLower.includes("cost") || queryLower.includes("budget") || queryLower.includes("loan") || queryLower.includes("finance")) {
        relevantAgents.push("Finance Agent");
      }
      if (queryLower.includes("transport") || queryLower.includes("truck") || queryLower.includes("move") || queryLower.includes("logistics")) {
        relevantAgents.push("Logistics Agent");
      }
      if (queryLower.includes("safe") || queryLower.includes("pesticide") || queryLower.includes("chemical") || queryLower.includes("certif")) {
        relevantAgents.push("Compliance Agent");
      }
    }

    console.log(`[Multi-Agent Router] Activated Agents:`, relevantAgents);

    // --- STEP 2: CONCURRENT SPECIALIST AGENTS EXECUTION ---
    const specialistPromises = relevantAgents.map(agentName =>
      callSpecialistAgent(agentName, message, profile, module)
        .then(output => ({ agentName, output }))
        .catch(err => {
          console.error(`[Specialist ${agentName}] failed:`, err);
          return { agentName, output: "Unable to compile recommendations for this segment." };
        })
    );
    const specialistResults = await Promise.all(specialistPromises);

    // --- STEP 3: ORCHESTRATION & SYNTHESIS LAYER ---
    const synthesizerSystemPrompt = `
      You are TessyFarm Nexus AI - Building Africa's AI Operating System for Agriculture.
      You act as an extremely experienced, warm, and highly practical Nigerian Agricultural Extension Officer. 
      Your voice must be respectful, encouraging, and localized (using supportive regional phrases like "My brother,", "My sister,", "Ah, well done on your hard work,", "By God's grace," referencing local conditions like the August break, dry Harmattan wind, Southern rains, Oyo red clay, or local remedies like Dongoyaro neem leaf sprays). Avoid cold, clinical corporate-speak.

      You will be given:
      1. User Query
      2. Farmer Profile
      3. Active Specialist Agents who analyzed this query
      4. Expert recommendations generated by each specialist agent

      Your task is to synthesize these specialized expert recommendations into a single, cohesive, highly personalized, and beautifully formatted response.
      Do NOT output separate sections for each agent. Instead, weave their expert advice seamlessly into the requested 8-part advisory report format!

      =========================================
      KNOWLEDGE ENGINE SECTORS (Cited Categories)
      =========================================
      Include citations of the relevant categories from our 10 indexed sectors that were utilized to retrieve this knowledge:
      - Crop Production, Livestock, Aquaculture, Pest & Disease, Climate Smart Agriculture, Soil Health, Farm Finance, Market Access, Food Safety, Post Harvest Management.

      =========================================
      Advisory Format Requirements
      =========================================
      You MUST structure the compiled output strictly according to the following template:

      ## 🧠 AI Agent Decision Engine Analysis
      Provide step-by-step diagnostic reasoning:
      1. **Farmer Profile Context**:
         - **Name**: [Farmer's Name]
         - **State**: [Farmer's State]
         - **Agroecological Zone**: [Identify the precise zone based on state, e.g. Humid Rainforest, Guinea Savannah, Sudan Savannah, Sahel]
         - **Farming Type**: [Farming Type]
         - **Main Crop/Livestock**: [Main products]
         - **Farm Size**: [Size]
         - **Experience Level**: [Beginner / Intermediate / Experienced]
         - **Current Challenge**: [Obstacle]
      2. **Environmental & Climate Context**:
         - **Climate Conditions**: [Evaluate current temperature and rainfall trends for their region]
         - **Seasonal Farming Calendar**: [Immediate tasks for their crops/livestock at this time of year]
      3. **Agricultural Knowledge Mapping**:
         - [Map relevant biological, chemical, or operational concepts from our Indexed Knowledge Base]

      ## 📋 Agricultural Advisory Report
      You MUST follow this exact 8-part reasoning structure for your report:

      ### 1. Situation Assessment
      [Local, personalized assessment of the situation. Speak directly to the farmer, greeting them warmly by name and validating their efforts as an extension officer. Incorporate their State, Agroecological zone, Farm type, Main crop/livestock, Farm size, Experience level, and Current challenge directly into the assessment of their query.]

      ### 2. Possible Causes
      [Identify specific agronomic, environmental, or operational root factors behind the challenge]

      ### 3. Recommended Actions
      [Step-by-step actionable procedures tailored to their farm size, experience level, and main crops or animals. Integrate the specific advice from your active Agronomist, Logistics, or Compliance specialists here.]

      ### 4. Cost Estimate (where applicable)
      [Provide realistic local estimates in Nigerian Naira (₦) for seeds, treatments, fertilizer bags, or organic formulations. If not applicable, explicitly state "N/A" and briefly explain why.]

      ### 5. Expected Outcome
      [Expected benefits, yield/revenue recovery, and standard crop response milestones]

      ### 6. Risks
      [Potential risks during execution, such as rainfall run-off, herbicide drift, feed spoilage, or bird mortality]

      ### 7. Preventive Measures
      [Long-term preventative steps, biosecurity, or organic soil-building to prevent recurrence]

      ### 8. Next Recommended Action
      [The single most immediate, practical action the farmer can perform today or tomorrow to begin execution]

      At the very end of your response, you MUST append this exact metadata segment:
      ---METADATA---
      AGENTS: [Comma-separated list of active agents involved]
      CATEGORIES: [Comma-separated list of knowledge categories cited from the 10 listed above]
      ---END_METADATA---
    `;

    const synthesizerPrompt = `
      User Query: "${message}"
      Farmer Profile: ${profile ? JSON.stringify(profile) : "No profile available"}
      Active Specialist Agents: ${relevantAgents.join(", ")}

      Here are the expert recommendations from each active specialist:
      ${specialistResults.map(so => `=== ${so.agentName} ===\n${so.output}`).join("\n\n")}

      Task:
      Synthesize the above expert insights into the final 8-part advisory report in the warm Nigerian agricultural extension officer voice. Keep it cohesive and unified!
    `;

    // Compile historical system message and prompt context
    const messages: any[] = [
      { role: "system", content: synthesizerSystemPrompt }
    ];

    // Maintain historical conversation structure
    for (const h of history) {
      messages.push({
        role: h.role === "model" ? "assistant" : "user",
        content: h.text
      });
    }

    messages.push({
      role: "user",
      content: synthesizerPrompt
    });

    console.log(`[Multi-Agent Synthesizer] Composing unified expert report...`);
    const reply = await callGroqWithFallback(messages, false);

    // Parse synthesis response for agents & categories
    let agents: string[] = relevantAgents;
    let categories: string[] = ["Crop Production"];
    let cleanText = reply;

    const metadataRegex = /---METADATA---[\s\S]*?AGENTS:\s*([^\n\r]+)[\s\S]*?CATEGORIES:\s*([^\n\r]+)[\s\S]*?---END_METADATA---/i;
    const match = reply.match(metadataRegex);
    if (match) {
      agents = match[1].split(",").map(s => s.trim());
      categories = match[2].split(",").map(s => s.trim());
      cleanText = reply.replace(/---METADATA---[\s\S]*?---END_METADATA---/gi, "").trim();
    } else {
      const simpleAgentsMatch = reply.match(/AGENTS:\s*([^\n\r]+)/i);
      const simpleCatsMatch = reply.match(/CATEGORIES:\s*([^\n\r]+)/i);
      if (simpleAgentsMatch) agents = simpleAgentsMatch[1].split(",").map(s => s.trim());
      if (simpleCatsMatch) categories = simpleCatsMatch[1].split(",").map(s => s.trim());

      cleanText = reply
        .replace(/AGENTS:\s*[^\n\r]+/gi, "")
        .replace(/CATEGORIES:\s*[^\n\r]+/gi, "")
        .replace(/---METADATA---/gi, "")
        .replace(/---END_METADATA---/gi, "")
        .trim();
    }

    // Force return the actual routed agents if the synthesizer listed something generic
    if (agents.length === 0 || (agents.length === 1 && agents[0] === "Farm Advisor")) {
      agents = relevantAgents;
    }

    res.json({
      text: cleanText,
      agents,
      categories,
      searchUrls: []
    });

  } catch (error: any) {
    console.error("Multi-Agent Orchestrator Error:", error);
    res.status(500).json({
      error: error.message || "An error occurred inside the multi-agent orchestration pipeline.",
    });
  }
});

// 2. FINANCIAL ANALYSIS ENDPOINT - Uses responseSchema to get structured JSON analysis
app.post("/api/finance-analysis", async (req, res) => {
  try {
    const { profile } = req.body;

    if (!profile) {
      return res.status(400).json({ error: "Farmer profile is required for financial planning." });
    }

    const prompt = `
      Perform a professional smallholder farm financial budget, profitability analysis, and credit readiness assessment based on this farmer profile:
      - Location: ${profile.location || "Nigeria"}
      - Farm Type: ${profile.farmType}
      - Primary Crops/Livestock: ${profile.crops}
      - Farm Size: ${profile.farmSize}
      - Main Challenge: ${profile.challenge}

      Deliverables to include:
      1. Itemized list of 4-6 required inputs, labor, or logistics items with costs specified in Nigerian Naira (₦). Ensure costs are realistic for Nigerian agriculture (e.g., land prep, fertilizer bags, improved seeds, labor). Keep totals aligned with the farm size of ${profile.farmSize}.
      2. Projected total production cost.
      3. Projected gross revenue based on typical yields and harvest prices.
      4. Net profit and Return on Investment (ROI %).
      5. Break-even yield estimate (e.g., "1.8 metric tons per hectare" or "25 crates of eggs per week").
      6. A credit readiness score out of 100, reflecting the farmer's current readiness based on their profile, alongside 3 specific credit readiness recommendations (e.g., opening a cooperative savings account, maintaining a daily operational ledger, registering with the local cooperative).

      CRITICAL: You MUST respond with a single valid JSON object. Do NOT wrap the JSON in markdown code blocks. The JSON object must match the following structure:
      {
        "estimatedCosts": [
          {
            "item": "Name of the expense item, e.g., 'Improved Maize Seeds (10kg)', 'NPK Fertilizer (2 bags)', 'Tractor Tillage'",
            "cost": 120000,
            "category": "One of: 'input', 'labor', 'logistics', 'other'",
            "notes": "Brief description of the estimate"
          }
        ],
        "totalCost": 120000,
        "projectedRevenue": 360000,
        "netProfit": 240000,
        "roi": 200,
        "breakEvenYield": "Physical yield needed, e.g., '2.4 Tons of Cassava'",
        "creditReadinessScore": 85,
        "creditReadinessFeedback": [
          "Recommendation 1",
          "Recommendation 2",
          "Recommendation 3"
        ]
      }
    `;

    const systemInstruction = `
      You are the TessyFarm Nexus AI Finance Engine. Your job is to output extremely realistic agricultural financial analyses and budgets for African smallholder farmers in Nigerian Naira (₦).
      Format all currency numbers as pure integers or floats in Naira. Respond with a single valid JSON object and nothing else.
    `;

    const messages = [
      { role: "system", content: systemInstruction },
      { role: "user", content: prompt }
    ];

    const reply = await callGroqWithFallback(messages, true);
    const parsedData = JSON.parse(cleanJsonString(reply));
    res.json(parsedData);

  } catch (error: any) {
    console.error("Finance API Error:", error);
    res.status(500).json({
      error: error.message || "An error occurred while generating your farm financial plan.",
    });
  }
});

// 3. MARKET INTEL UPDATE ENDPOINT - Generates localized pricing and suggestions
app.post("/api/market-intelligence", async (req, res) => {
  try {
    const { location = "Nigeria", crops = "Maize" } = req.body;

    const prompt = `
      Provide real-time market prices and insights for a farmer in ${location} growing/rearing ${crops}.
      Include:
      1. Current prices in 3 key regional markets in Nigeria for ${crops} and related staple food commodities (in Naira per bag or appropriate unit).
      2. 3 prospective local buyers/buyer categories (e.g., processors, poultry feed mills, regional aggregators, local retail associations).
      3. A supply chain recommendation or post-harvest preservation tip to maximize profitability.

      CRITICAL: You MUST respond with a single valid JSON object. Do NOT wrap the JSON in markdown code blocks. The JSON object must match the following structure:
      {
        "marketPrices": [
          {
            "commodity": "Staple commodity name (e.g., White Maize, Yellow Garri, Catfish)",
            "location": "Market location in Nigeria (e.g., Bodija Market Ibadan, Mile 12 Lagos, Dawanau Kano)",
            "pricePerUnit": "Price with Naira symbol and unit, e.g., '₦82,000 per 100kg bag'",
            "trend": "One of: 'up', 'down', 'stable'",
            "lastUpdated": "Today"
          }
        ],
        "discoveredBuyers": [
          {
            "name": "Name/Type of buyer",
            "location": "Coverage area",
            "requirement": "What they look for, e.g., 'Minimum 2 tons, moisture under 14%'",
            "contactConcept": "How to connect via cooperative"
          }
        ],
        "marketInsight": "A highly actionable 2-3 sentence strategic recommendation on timing the market or post-harvest storage"
      }
    `;

    const systemInstruction = `
      You are the TessyFarm Nexus AI Market Intelligence Engine. Your job is to output structured commodity pricing and strategic market access tips for West African agritech.
      Respond with a single valid JSON object and nothing else.
    `;

    const messages = [
      { role: "system", content: systemInstruction },
      { role: "user", content: prompt }
    ];

    const reply = await callGroqWithFallback(messages, true);
    const parsedData = JSON.parse(cleanJsonString(reply));
    res.json(parsedData);

  } catch (error: any) {
    console.error("Market Intel API Error:", error);
    // Fallback static data if AI fails or no key
    res.json({
      marketPrices: [
        { commodity: "White Maize", location: "Dawanau Market (Kano)", pricePerUnit: "₦78,000 per 100kg bag", trend: "up", lastUpdated: "Today" },
        { commodity: "White Garri", location: "Bodija Market (Ibadan)", pricePerUnit: "₦42,000 per 50kg bag", trend: "stable", lastUpdated: "Today" },
        { commodity: "Local Rice", location: "Mile 12 (Lagos)", pricePerUnit: "₦65,000 per 50kg bag", trend: "up", lastUpdated: "Today" }
      ],
      discoveredBuyers: [
        { name: "West African Agro-Processors Ltd", location: "Kano / Kaduna", requirement: "Dry maize grain, max 13% moisture", contactConcept: "Connected via TessyFarm Bulk Aggregation program" },
        { name: "Bodija Poultry Feed Mill Cooperative", location: "Oyo State", requirement: "Maize and soybeans grade A", contactConcept: "Submit farm volume forecast in Market tab" },
        { name: "Lagos Food Hub Aggregation Desk", location: "Lagos State", requirement: "Tubers of Yam, Cassava starch, leafy vegetables", contactConcept: "Direct delivery slot matching available" }
      ],
      marketInsight: "Prices of local grain staples are trending upward due to seasonal logistics constraints. We highly recommend storing grain in PICS hermetic bags for another 4 weeks before bulk sale to gain 15% higher margins."
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TessyFarm Nexus Server running on http://localhost:${PORT}`);
  });
}

startServer();
