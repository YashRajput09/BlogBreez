import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateAutoMeta = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const file = req.file;

    // Convert Buffer to base64
    const base64Image = file.buffer.toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: file.mimetype || "image/jpeg",
                data: base64Image,
              },
            },
            {
              text: `
                Analyze this image and generate blog metadata in JSON format:
                {
                  "title": "short catchy title (max 10 words)",
                  "description": "250-300 words",
                  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"](without space),
                  "category": "best category"
                }
                Return only JSON, no extra text.
              `,
            },
          ],
        },
      ],
    });

    // Get the AI's output
    const rawText = response.outputText || response.text || "";
    let metadata;

    // Try parsing JSON safely
    try {
      metadata = JSON.parse(rawText);
    } catch {
      const start = rawText.indexOf("{");
      const end = rawText.lastIndexOf("}");
      if (start !== -1 && end !== -1) {
        metadata = JSON.parse(rawText.slice(start, end + 1));
      } else {
        throw new Error("Invalid JSON from AI");
      }
    }

    res.status(200).json(metadata);
  } catch (error) {
    console.error("AI processing error:", error);
    res.status(500).json({
      error: "Failed to create blog",
      details: error.message || error,
    });
  }
};
