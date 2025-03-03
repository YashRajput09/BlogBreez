import blogModel from "../models/blog_model.js";
import userModel from "../models/user_model.js";

// export const recommendedBlogs = async (req, res) => {
//     const { userId } = req.params;

//     try {
//         // const user = await userModel.findById(userId).populate("readBlogs");
//         const user = await userModel.findById(userId).populate({
//           path: "readBlogs",
//           select: "category tags"
//       });
      

//         if (!user || user.readBlogs.length === 0) {
//             const trendingBlogs = await blogModel.find().sort({ views: -1 }).limit(5);
//             return res.status(200).json({ message: "Showing trending blogs", blogs: trendingBlogs });
//         }

//         // Extract categories & tags from read blogs
//         const readCategories = user.readBlogs.flatMap((blog) => blog.category);
//         const readTags = user.readBlogs.flatMap((blog) => blog.tags);
//         const readids = user.readBlogs.map((blog) => blog._id.toString()); // Get already read blog IDs

//         // Find relevant blogs
//         const recommendedBlogs = await blogModel.aggregate([
//             {
//                 $match: {
//                     _id: { $nin: readBlogIds }, // Exclude already read blogs
//                     $or: [
//                       { category: { $in: Array.isArray(readCategories) ? readCategories : [readCategories] } },
//                       { tags: { $in: Array.isArray(readTags) ? readTags : [readTags] } }                      
//                     ],
//                 },
//             },
//             {
//                 $addFields: {
//                     matchScore: {
//                         $add: [
//                             { $size: { $setIntersection: ["$category", readCategories] } },
//                             { $size: { $setIntersection: ["$tags", readTags] } }
//                         ]
//                     }
//                 }
//             },
//             { $sort: { matchScore: -1, views: -1 } }, // Sort by relevance & views
//             { $limit: 5 }
//         ]);

//         res.status(200).json({ blogs: recommendedBlogs });

//     } catch (error) {
//         res.status(500).json({ message: "Error fetching recommendations", error });
//     }
// };

// export const recommendedBlogs = async (req, res) => {
//     try {
//         const { id } = req.params;

//         //  Fetch the current blog
//         const currentBlog = await blogModel.findById(id);
//         if (!currentBlog) {
//             return res.status(404).json({ message: "Blog not found" });
//         }
//         console.log("Current Blog Tags:", currentBlog.tags);
//         // const currentTags = currentBlog.tags;

//         // Flatten & Extract Tags
//         const currentTags = currentBlog.tags.flat(); // Flatten array 
//         // console.log("Current Blog Flattened Tags:", currentTags);

//         // Find Recommended Blogs
//         const recommendedBlogs = await blogModel.find({
//             _id: { $ne: id }, // Exclude the current blog
//             // tags: { $elemMatch: { $in: currentTags } } //  for nested array structure
//             tags: { $in: currentTags } // Match tags correctly
//             // _id: { $ne: "66f5465b923f8499cfd969c8" }, // Exclude the current blog
//             // tags: { $elemMatch: { $in: ['god'] } } // Match tags correctly
//         })
//         // .sort({ createdAt: -1, views: -1 }) // Sort by views
//         .limit(5); // fetch only 5 blogs

//         console.log("Recommended Blogs:", recommendedBlogs);
//         res.status(200).json(recommendedBlogs);

//     } catch (error) {
//         console.error("Error fetching recommended blogs:", error);
//         res.status(500).json({ message: "Server error", error });
//     }
// };

export const recommendedBlogs = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the current blog
        const currentBlog = await blogModel.findById(id);
        if (!currentBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        console.log("Current Blog Tags:", currentBlog.tags);

        // Extract tags correctly
        const currentTags = currentBlog.tags.flat(); // Flatten nested arrays if necessary

        // Find Recommended Blogs
        const recommendedBlogs = await blogModel.aggregate([
            {
                $match: {
                    _id: { $ne: currentBlog._id }, // Exclude the current blog
                    tags: { $in: currentTags } // Match at least one tag
                }
            },
            {
                $addFields: {
                    matchedTagsCount: {
                        $size: {
                            $setIntersection: [currentTags, { $ifNull: ["$tags", []] }]
                        }
                    }
                }
            },
            { $sort: { matchedTagsCount: -1, views: -1 } }, // Sort by highest matches, then by views
            { $limit: 5 } // Limit to top 5 results
        ]);

        console.log("Recommended Blogs:", recommendedBlogs);
        res.status(200).json(recommendedBlogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};



export const trackView = async(req, res) => {
    // const {userId, blogId} = req.body;
    const { id } = req.params;
console.log(id);

    if (!userId || !id) {
        return res.status(400).json({ message: "User ID and Blog ID required" });
      }
      try {
        // Update Blog View Count
        await blogModel.findByIdAndUpdate(id, { $inc: { views: 1 } });
    
        // Store blog in user’s read history
        await userModel.findByIdAndUpdate(userId, { $addToSet: { readBlogs: id } });
    
        res.status(200).json({ message: "View tracked successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error tracking view", error });
      }
}  

