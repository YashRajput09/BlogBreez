import commentModel from '../models/comment_model.js';

export const createBlogComments = async(req, res) => {
    const  { id } = req.params;
    const blogId = id;
    const {comment} = req.body;
    console.log("req.body : ",req.body);
    
    const userId = req.user._id;
  
    if (!comment || comment.trim() === "") {
      return res.status(400).json({ error: "Comment cannot be empty." });
    }
  
    try {
      const newComment = new commentModel({ blogId, userId, comment });
      console.log("comment : ",newComment);
      await newComment.save();
      res.status(201).json({ message: "Comment added successfully!", newComment });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ error: "Failed to add comment." });
    }
}

export const getBlogComments = async(req, res) => {
  try {
    const allComments = await commentModel.find({ blogId: req.params.id }).populate("userId", "name");
    res.status(200).json(allComments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments." });
  }
}