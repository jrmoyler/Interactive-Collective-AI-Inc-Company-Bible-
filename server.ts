import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Seed compliance events
let complianceEvents = [
  {
    id: "AEG-4091",
    timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    divisionId: "D-01",
    description: "ZenFlow agent instance deployment in development sandbox",
    requiredClearance: "Clear",
    agentName: "AXIS_Builder_v1.0",
    status: "approved",
    details: "Automated test cluster validation. Safety scan reported aegis_clear with zero safety flag collisions.",
    reviewer: "Dr. Joseph Johnson"
  },
  {
    id: "AEG-4092",
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    divisionId: "D-06",
    description: "Compound prescription formulation requested for cohort patient Cook",
    requiredClearance: "Review",
    agentName: "Vital_Helix_Wellness_v4.2",
    status: "pending",
    details: "Personalized anti-inflammatory supplement routine calculated. Triggers sensitive health audit. Requires a human physician co-signature under Aegis regulation 04.",
    reviewer: ""
  },
  {
    id: "AEG-4093",
    timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    divisionId: "D-11",
    description: "Civic Core broadband allocation files storage directory upload",
    requiredClearance: "Review",
    agentName: "Impact_Logger_v1.2",
    status: "approved",
    details: "Data validation completed. Verified zero PII leakage. Stanley Constant signed off with community fiduciary clearance.",
    reviewer: "Stanley Constant"
  },
  {
    id: "AEG-4094",
    timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    divisionId: "D-05",
    description: "Helios Grid online deployment execution request",
    requiredClearance: "Hold",
    agentName: "Helios_Controller_v1.0",
    status: "pending",
    details: "CRITICAL: Helios Grid is flagged on ACTIVE HOLD (Terra Axis D-05) pending SEC legal review. Zero deployment permitted. Strict executive approval required. CLO signature mandatory.",
    reviewer: ""
  }
];

const app = express();
app.use(express.json());

const PORT = 3000;

// API routes first
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Aegis compliance events endpoints
app.get("/api/compliance/events", (req, res) => {
  res.json(complianceEvents);
});

app.post("/api/compliance/action", (req, res) => {
  const { id, action, reviewer } = req.body;
  const eventIndex = complianceEvents.findIndex(ev => ev.id === id);
  if (eventIndex !== -1) {
    if (action === "approve") {
      complianceEvents[eventIndex].status = "approved";
    } else if (action === "block") {
      complianceEvents[eventIndex].status = "blocked";
    } else if (action === "escalate") {
      complianceEvents[eventIndex].status = "escalated";
    }
    complianceEvents[eventIndex].reviewer = reviewer || "System Admin";
    return res.json({ success: true, event: complianceEvents[eventIndex] });
  }
  res.status(404).json({ error: "Event not found" });
});

app.post("/api/compliance/create", (req, res) => {
  const { divisionId, description, requiredClearance, agentName, details } = req.body;
  if (!divisionId || !description || !requiredClearance) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newEvent = {
    id: `AEG-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString(),
    divisionId,
    description,
    requiredClearance,
    agentName: agentName || "System_Agent_T4",
    status: "pending" as const,
    details: details || "Automated telemetry flag recorded.",
    reviewer: ""
  };
  complianceEvents.unshift(newEvent);
  res.json({ success: true, event: newEvent });
});

// Gemini assistant endpoint
app.post("/api/assistant/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages structure" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY environment variable is not configured. Please add it to your secrets panel."
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });

    const systemInstruction = `You are the ultimate official Collective AI Inc Intelligent Company Assistant (the Oracle).
Your purpose is to answer factual, strategic, and technical questions about Collective AI Inc using ONLY the exact specifications and records documented in the Company Bible.

Tone Guidelines:
- Adhere strictly to the "Hataalii" voice standard: confident but humble, optimistic but realistic, human-centered, and objective. Speak with professional composure.
- NO warm-up openers: do NOT start messages with "Certainly!", "Absolutely!", or greetings unless answering a standard query directly.
- STRICTLY BANNED WORDS/PHRASES: Do NOT use these words in your replies under any circumstances: "delve", "tapestry", "underscore", "pivotal", "meticulous", "harness", "bolster", "testament vibrant", "beacon", "illuminate", "robust transformative", "leverage", "seamlessly foster", "garner", "spearhead", "synergy".
- Avoid generic descriptions like "In today's ever-evolving world...", "In an era defined by...", "It goes without saying...", "In conclusion...", "In summary...", "Moving forward...", "Embrace the future...".
- Be incredibly specific about details: name the founders (JR Moyler - Hataalii; Devon Scott), CLO (Dr. Joseph Johnson), non-profit fiduciary (Stanley Constant), the 20 divisions (D-01 to D-20), the digital/physical synergy nodes (SN-01 to SN-20, SYN-01 to SYN-13), variables, budget limits, software tools (such as Python, React, Next.js, LangGraph, n8n), hardware specifications (LiDAR sensors, nRF52840, Jetson Orin), and the 4-tier agent taxonomy (Executive, Specialist, Operator, Task).
- Under no circumstances make up or loose-guess hardware pricing or compliance clearances.
- Keep responses clean, concise, scannable, using structured bullet points or markdown tables.
`;

    // Map message history into standard API contents
    // Translate client message history format to API content parts
    const apiContents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: apiContents,
      config: {
        systemInstruction,
        temperature: 0.2, // Keep it highly analytical and factual
        maxOutputTokens: 1024
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in /api/assistant/chat:", error);
    res.status(500).json({ error: error.message || "An error occurred calling the assistant backend." });
  }
});

// Configure Vite and Server Ingress
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite integration...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started on http://localhost:${PORT}`);
  });
}

startServer();
