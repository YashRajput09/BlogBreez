import blogModel from "../models/blog_model.js";
import { generateEmbedding } from "../services/embeddingService.js";

export const getRelatedBlogs = async (req, res) => {
  try {
    const currentBlog = await blogModel.findById(req.params.id).lean();
    if (!currentBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Create embedding vector from title + content
    const queryVector = await generateEmbedding(
      `${currentBlog.title} ${currentBlog.content || ""}`
    );

    // Run vector search
    const related = await blogModel.aggregate([
      {
        $vectorSearch: {
          index: "vector_index", // MongoDB Atlas Search index name
          path: "embedding",
          queryVector,
          numCandidates: 50, // how many to consider before filtering
          limit: 20 // bring more so we can boost before final limit
        }
      },
      // Flatten nested tags so matching works
      {
        $addFields: {
          flatTags: {
            $reduce: {
              input: "$tags",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] }
            }
          }
        }
      },
      // Add a custom score = AI score + boosts for category/tags match
      {
        $addFields: {
          finalScore: {
            $add: [
              { $meta: "vectorSearchScore" },
              {
                $cond: [
                  { $in: [currentBlog.category[0], "$category"] },
                  0.15, // boost for category match
                  0
                ]
              },
              {
                $cond: [
                  { $gt: [{ $size: { $setIntersection: ["$flatTags", currentBlog.tags.flat()] } }, 0] },
                  0.1, // boost if at least one tag matches
                  0
                ]
              }
            ]
          }
        }
      },
      // Remove the blog itself
      { $match: { _id: { $ne: currentBlog._id } } },
      // Sort by finalScore (AI + boosts)
      { $sort: { finalScore: -1 } },
      // Take top 5
      { $limit: 6 },
      // Only send necessary fields
      {
        $project: {
          title: 1,
          category: 1,
          tags: 1,
          blogImage: 1,
          score: "$finalScore"
        }
      }
    ]);

    res.json(related);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};



// import Blog from "../models/blog_model.js";
// import { generateEmbedding } from "../services/embeddingService.js";

// export const getRelatedBlogs = async (req, res) => {
//   try {
//     const currentBlog = await Blog.findById(req.params.id).lean();
//     if (!currentBlog) {
//       return res.status(404).json({ error: "Blog not found" });
//     }

//     // Create query vector
//     const queryVector = await generateEmbedding(
//       `${currentBlog.title} ${currentBlog.content || ""}`
//     );

//     const titleKeywords = currentBlog.title.split(/\s+/).filter(Boolean);

//     const related = await Blog.aggregate([
//       {
//         $vectorSearch: {
//           index: "vector_index",
//           path: "embedding",
//           queryVector,
//           numCandidates: 50,
//           limit: 50
//         }
//       },
//       // Flatten nested tags so $in works
//       {
//         $addFields: {
//           flatTags: {
//             $reduce: {
//               input: "$tags",
//               initialValue: [],
//               in: { $concatArrays: ["$$value", "$$this"] }
//             }
//           }
//         }
//       },
//       {
//         $match: {
//           _id: { $ne: currentBlog._id },
//           $or: [
//             { title: { $regex: titleKeywords.join("|"), $options: "i" } },
//             { flatTags: { $in: currentBlog.tags.flat() } },
//             { category: { $in: currentBlog.category } }
//           ]
//         }
//       },
//       { $limit: 5 },
//       {
//         $project: {
//           title: 1,
//           category: 1,
//           tags: 1,
//           score: { $meta: "vectorSearchScore" }
//         }
//       }
//     ]);

//     res.json(related);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

