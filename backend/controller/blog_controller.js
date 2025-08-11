import cloudinary from "../cloudConfig.js";
import blogModel from "../models/blog_model.js";
import activityModel from "../models/activity_model.js";
import mongoose from "mongoose";
import {generateSearchQuery} from "../utils/search.js";
import { generateEmbedding } from "../services/embeddingService.js";

// search blogs
export const searchBlogs = async(req, res) =>{
  const searchQuery = req.query.search || "" ; // Default to an empty string if search is not provided
  // console.log(req.query.search);
  if(searchQuery){
    const searchBlogs = generateSearchQuery(searchQuery);
    // console.log("searchBlogs", searchBlogs)
    const allSearchBlogs = await blogModel.find(searchBlogs);
    return res.status(200).json(allSearchBlogs); // Return search results as JSON
  }  else {
    return res.status(400).json({ message: "Search query is required" }); // Handle missing query
  }
};

//create blog
export const createBlog = async (req, res) => {
  const userId = req.user._id;
  try {
    // 1. Check if files are present
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" });
    }
    // console.log("file : ", req.files);

    const { blogImage } = req.files;

    // 2. Validate image format
    const allowedFormates = ["image/jpeg", "image/png", "image/pdf"];
    if (!allowedFormates.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid image formate, Only jpg, png, pdf are allowed ",
      });
    }

    // 3. Validate required fields in req.body
    const { category, title, description, tags} = req.body;
  // console.log(category, title, tags);
  
    let formattedTags;
    if (!tags) {
      formattedTags = [];
    } else if (typeof tags === "string") {
      formattedTags = tags.includes("[") ? JSON.parse(tags) : tags.split(",").map(tag => tag.trim());
    } else {
      formattedTags = tags; // Assume it's already an array
    }


    if (!category || !title || !description || !formattedTags.length) {
      return res
        .status(400)
        .json({ message: "Category, title, description, tags are required" });
    }

    // 4. Log the user and ensure user data is available
    // console.log("Req.User : ", req.user);
    const adminName = req?.user?.name;
    const adminImage = req?.user?.profileImage.url;
    const createdBy = req?.user?._id;

    if (!createdBy) {
      return res.status(400).json({ message: "User must be logged in" });
    }

    // 5. Upload the image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath,
      {
        folder: "Blog_web",
      }
    );

    // console.log("CloudinaryResponse : ", cloudinaryResponse);
    // 6. Handle Cloudinary upload errors
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      // console.log(cloudinaryResponse.error);
    }
       // Generate embedding from title + description
      const embeddingText = `${title}\n\n${description}`;
    const embedding = await generateEmbedding(embeddingText);

    // 7. Prepare blog data
    const blogData = {
      category,
      title,
      description,
      tags: formattedTags,
      adminName,
      adminImage,
      createdBy,
      embedding,
      blogImage: {
        url: cloudinaryResponse.url,
        public_id: cloudinaryResponse.public_id,
      },
    };

    // 8. Save the blog in the database
    const blog = await blogModel.create(blogData);

      // Save recent activity automatically 
  const createBlogActivity = await activityModel.create({
   user: userId,
    actionType: "publish",
    contentId: blog._id,
    contentType: "Blog",
    message: `New article publish`,
  });
        // console.log("createBlogActivity : ",createBlogActivity);


    // 9. Send success response
    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    // 10. Log the error and send a response
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  // console.log(req.params);
  const blog = await blogModel.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  await blog.deleteOne();
  //  const deletedBlogResponse = await blogModel.findByIdAndDelete(id);
  //  console.log(deletedBlogResponse);
  res.status(200).json({ message: "Blog deleted successfully" });
};

// get all blogs
export const getAllBlogs = async (req, res) => {
  const allBlogs = await blogModel.find();
  res.status(200).json(allBlogs);
};

// get only single blog
export const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  // console.log(userId);
  // console.log(id);
  
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog Id" });
  }
  const blog = await blogModel.findById(id).populate('createdBy');  
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  // const hasViewed = blog.viewers.includes(userId);
  // const hasViewed = blog.viewers.some((viewer) => viewer.equals(userId));
  // if (!hasViewed) {
  //   blog.views += 1;
  //   blog.viewers.push(userId);
  //   await blog.save();
  // };
  // Atomic update to increment views and add user to viewers only if not present
  if (userId) {
    await blogModel.updateOne(
      { _id: id, viewers: { $ne: userId } }, // Check if user hasn't viewed
      {
        $addToSet: { viewers: userId }, // Add user to viewers (ensures no duplicates)
        $inc: { views: 1 } // Increment views by 1
      }
    );
  }
  res.status(200).json({ blog });
}

// admin can see their all blog
export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const blogs = await blogModel.find({ createdBy });
  res.status(200).json(blogs);
};

// ********* update Blog *********
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  try {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog Id, Blog not found" });
    }

    //Fetch existing blog
    const existingBlog = await blogModel.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

  
 //check blog is present in database with given id
  let cloudinaryResponse;
  if (req.files && req.files.blogImage) {
    // console.log(req.files);
    const updatedImage = req.files.blogImage;
     cloudinaryResponse = await cloudinary.uploader.upload(
      updatedImage.tempFilePath,
      {
        folder: "Blog_web",
      }
    );
    // console.log("CloudinaryResponse : ", cloudinaryResponse);
  }
  const updatedData = { ...req.body };
  if (cloudinaryResponse) {
    updatedData.blogImage = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url
    };
    // updatedData.blogImage.public_id = cloudinaryResponse.public_id;
    // updatedData.blogImage.url = cloudinaryResponse.secure_url;
  }

  if (req.body.tags) {
    try {
      let newTags = JSON.parse(req.body.tags); // Convert JSON string to array
      if (!Array.isArray(newTags)) {
        return res.status(400).json({ message: "Tags must be an array" });
      }

        //Merge existing tags with new ones, ensuring a **flat structure**
        updatedData.tags = [...existingBlog.tags, ...newTags].flat();
              //remove duplicate tags

        updatedData.tags = [...new Set(updatedData.tags)];
      } catch (error) {
        return res.status(400).json({ message: "Invalid tags format" });
      }}
  
        //  Generate embedding from updated title + description
    if (updatedData.title || updatedData.description) {
      const title = updatedData.title || existingBlog.title;
      const description = updatedData.description || existingBlog.description;
      const embeddingText = `${title}\n\n${description}`;
      updatedData.embedding = await generateEmbedding(embeddingText);
    }

  const updatedBlog = await blogModel.findByIdAndUpdate(
    id,
    { $set: updatedData}, // $set is used to update only the fields provided in the request
    { new: true, runValidators: true } // Return the updated document & run validation
  );

  res.status(200).json({ updatedBlog });
} catch (error) {
    console.log(error);
    res.status(400).json({message: "All fields are required"})
}
}

// ********* blog Like feature *********
export const blogLikes = async(req, res) =>{
 try {
   const blog = await blogModel.findById(req.params.id);
   if(!blog) return res.status(400).json({message: "Blog not found"});
   res.json({ likes: blog.likes});
 } catch (error) {
   console.error(error);
   res.status(500).json({error: error.message});
 }
};

// ********* blog likedBy feature **********
export const blogLikedBy = async(req, res) =>{
  const userId  = req.body.userId; // Ensure this is sent from the frontend
  const {blogId} = req.params.id;
  try {
   const blog = await blogModel.findById(req.params.id);
   if(!blog) return res.status(400).json({message: "Blog not found"});
    
   if(blog.likedBy.includes(userId)){
    blog.likes -= 1;
    blog.likedBy = blog.likedBy.filter((id) => id.toString()!== userId);
   } else {
    blog.likes += 1;
    blog.likedBy.push(userId);
         // Save recent activity
  const likedActivity =  await activityModel.create({
    user: blog.createdBy,
    actionType: "like",
    contentId: blog._id,
    contentType: "Blog",
    message: `Article liked`,
  });
  // console.log(likedActivity)
   }
   await blog.save();

   res.json({ likes: blog.likes, likedBy: blog.likedBy })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
  }
}
