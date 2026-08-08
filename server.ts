import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Google GenAI
const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Screen Generator Endpoint
app.post("/api/generate-screen", async (req, res) => {
  try {
    const { prompt, screenCategory = "dashboard", theme = "light" } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getAIClient();

    const systemInstruction = `
You are an expert UI/UX designer and web developer.
Generate a complete, modern web screen layout definition in valid JSON matching the requested prompt.
The screen should consist of a cohesive structure of sections, components, titles, subtitles, call-to-action buttons, badges, metrics, and high-resolution hotlinked images from Unsplash (https://images.unsplash.com/...).
Make sure all hotlinked Unsplash image URLs are realistic, beautiful, and working (e.g. https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80).

Categories allowed: "dashboard", "ecommerce", "hero", "social", "portfolio", "custom".
Output strictly JSON matching the response schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Create a UI screen for: "${prompt}". Category: ${screenCategory}, Default Theme: ${theme}.`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            category: { type: Type.STRING },
            description: { type: Type.STRING },
            badgeText: { type: Type.STRING },
            theme: {
              type: Type.OBJECT,
              properties: {
                primaryColor: { type: Type.STRING },
                backgroundColor: { type: Type.STRING },
                textColor: { type: Type.STRING },
                cardBg: { type: Type.STRING },
                borderRadius: { type: Type.STRING },
              },
              required: ["primaryColor", "backgroundColor", "textColor", "cardBg", "borderRadius"],
            },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING }, // "hero", "stats", "grid", "banner", "testimonials", "pricing", "features"
                  title: { type: Type.STRING },
                  subtitle: { type: Type.STRING },
                  imageUrl: { type: Type.STRING },
                  badge: { type: Type.STRING },
                  items: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        value: { type: Type.STRING },
                        change: { type: Type.STRING },
                        imageUrl: { type: Type.STRING },
                        badge: { type: Type.STRING },
                        buttonText: { type: Type.STRING },
                      },
                    },
                  },
                  primaryActionText: { type: Type.STRING },
                  secondaryActionText: { type: Type.STRING },
                },
                required: ["id", "type", "title"],
              },
            },
          },
          required: ["id", "title", "category", "description", "theme", "sections"],
        },
      },
    });

    if (!response.text) {
      throw new Error("Empty response received from Gemini model");
    }

    const generatedScreen = JSON.parse(response.text.trim());
    return res.json({ success: true, screen: generatedScreen });
  } catch (error: any) {
    console.error("Error generating screen with Gemini:", error);
    return res.status(500).json({
      error: "Failed to generate screen",
      details: error.message || "Unknown error",
    });
  }
});

async function startServer() {
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
    console.log(`[AppScreen Studio] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
