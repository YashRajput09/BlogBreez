import commentModel from '../models/comment_model.js';

// Create a comment
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

// Get all comments
export const getBlogComments = async(req, res) => {
  try {
    const allComments = await commentModel.find({ blogId: req.params.id }).populate("userId", "name");
    res.status(200).json(allComments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments." });
  }
}

// Update a comment
export const updateBlogComments = async(req, res) => {
  const {comment} = req.body;

  try {
    const updatedComment = await commentModel.findByIdAndUpdate(req.params.id, {comment}, {new: true});
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found." });
    }
    res.status(200).json({message: "Comment updated Successfully ",updatedComment});
  } catch (error) {
    console.error("Error updating comment: ", error);
    res.status(500).json({ error: "Failed to update comment." });
  }
}

// Delete a comment and its replies
export const deleteBlogComments = async(req, res) => {
  try {
    const comment = await commentModel.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    // delete comment and all its replies
    await commentModel.deleteMany({ $or: [{_id:comment._id}, {parentCommentId: comment._id}]})
    res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment.", error });
  }
}