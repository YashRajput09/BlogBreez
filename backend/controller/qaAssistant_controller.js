// controllers/qaController.js
import blogModel from "../models/blog_model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const qaAssistant = async (req, res) => {
  try {
    const { question } = req.body;
    const { blogId } = req.params;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // Fetch blog content
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const blogContent = `
      Title: ${blog.title}
      Content: ${blog.description}
      Tags: ${blog.tags?.join(", ")}
    `;

    // Call AI model with context
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
   const result = await model.generateContent([
  `
You are a helpful blog assistant. 
1. If the user's question can be answered using the blog content, answer ONLY from the blog. 
2. If the answer is not in the blog, clearly say "This information is not mentioned in the blog." 
   Then, optionally, you may provide a correct general answer. 
3. Never ignore the blog when the answer is already present. 
4. Do not use phrases like "Based on the blog content." Respond naturally and directly.



   Blog Content:
   ${blogContent}

   User Question:
   ${question}`
]);

    const answer = result.response.text();

    res.json({ answer });
  } catch (error) {
    console.error("Q&A Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
