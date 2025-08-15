
import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateBlogMeta(base64Image) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Image,
      },
    },
    {
      text: `
        Analyze this image and return a JSON object with:
        - title: catchy blog title (max 10 words)
        - description: 50-70 word descriptive summary
        - tags: array of exactly 5 SEO-friendly tags
        - category: most appropriate blog category

        Output only raw JSON without extra text.
      `
    }
  ];

  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
  const response = await model.generateContent(contents);
  const textOutput = response.response.text();

  let metadata;
  try {
    metadata = JSON.parse(textOutput);
  } catch {
    const start = textOutput.indexOf("{");
    const end = textOutput.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      metadata = JSON.parse(textOutput.substring(start, end + 1));
    } else {
      throw new Error("Invalid JSON returned by AI");
    }
  }

  return metadata;
}
