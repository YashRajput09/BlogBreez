import blogModel from "../models/blog_model.js";
import userModel from "../models/user_model.js";

export const recommendedBlogs = async (req, res) => {
    const { userId } = req.params;

    try {
        // const user = await userModel.findById(userId).populate("readBlogs");
        const user = await userModel.findById(userId).populate({
          path: "readBlogs",
          select: "category tags"
      });
      

        if (!user || user.readBlogs.length === 0) {
            const trendingBlogs = await blogModel.find().sort({ views: -1 }).limit(5);
            return res.status(200).json({ message: "Showing trending blogs", blogs: trendingBlogs });
        }

        // Extract categories & tags from read blogs
        const readCategories = user.readBlogs.flatMap((blog) => blog.category);
        const readTags = user.readBlogs.flatMap((blog) => blog.tags);
        const readBlogIds = user.readBlogs.map((blog) => blog._id.toString()); // Get already read blog IDs

        // Find relevant blogs
        const recommendedBlogs = await blogModel.aggregate([
            {
                $match: {
                    _id: { $nin: readBlogIds }, // Exclude already read blogs
                    $or: [
                      { category: { $in: Array.isArray(readCategories) ? readCategories : [readCategories] } },
                      { tags: { $in: Array.isArray(readTags) ? readTags : [readTags] } }                      
                    ],
                },
            },
            {
                $addFields: {
                    matchScore: {
                        $add: [
                            { $size: { $setIntersection: ["$category", readCategories] } },
                            { $size: { $setIntersection: ["$tags", readTags] } }
                        ]
                    }
                }
            },
            { $sort: { matchScore: -1, views: -1 } }, // Sort by relevance & views
            { $limit: 5 }
        ]);

        res.status(200).json({ blogs: recommendedBlogs });

    } catch (error) {
        res.status(500).json({ message: "Error fetching recommendations", error });
    }
};


export const trackView = async(req, res) => {
    const {userId, blogId} = req.body;
    if (!userId || !blogId) {
        return res.status(400).json({ message: "User ID and Blog ID required" });
      }
      try {
        // Update Blog View Count
        await blogModel.findByIdAndUpdate(blogId, { $inc: { views: 1 } });
    
        // Store blog in user’s read history
        await userModel.findByIdAndUpdate(userId, { $addToSet: { readBlogs: blogId } });
    
        res.status(200).json({ message: "View tracked successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error tracking view", error });
      }
}  

