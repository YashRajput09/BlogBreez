import blogModel from "../models/blog_model.js";
import userModel from "../models/user_model.js";

export const recommendedBlogs = async(req, res) =>{
    const {userId} = req.params;
    try {
        const user = await userModel.findById(userId).populate("readBlogs");
    
        if (!user || user.readBlogs.length === 0) {
          const trendingBlogs = await blogModel.find().sort({ views: -1 }).limit(5);
          return res.status(200).json({ message: "Showing trending blogs", blogs: trendingBlogs });
        }
    
        // Extract categories & tags from read blogs
        const readCategories = user.readBlogs.flatMap((blog) => blog.category);
        const readTags = user.readBlogs.flatMap((blog) => blog.tags);
    
        // Find similar blogs
        const recommendedBlogs = await blogModel.find({
          $or: [
            { category: { $in: readCategories } },
            { tags: { $in: readTags } },
          ],
        }).limit(5);
    
        res.status(200).json({ blogs: recommendedBlogs });
      } catch (error) {
        res.status(500).json({ message: "Error fetching recommendations", error });
      }
}

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

