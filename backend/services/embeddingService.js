// import dotenv from 'dotenv';
// dotenv.config();
// import OpenAI from "openai";
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function generateEmbedding(text) {
//   const response = await openai.embeddings.create({
//     model: "text-embedding-3-small",
//     input: text
//   });
//   return response.data[0].embedding;
// }


// services/embeddingService.js
import { pipeline } from "@xenova/transformers";

let embedder;

// Load model once at startup
(async () => {
  embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
})();

export async function generateEmbedding(text) {
  if (!embedder) throw new Error("Embedding model not loaded yet");

  const output = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(output.data); // Convert tensor to plain JS array
}
