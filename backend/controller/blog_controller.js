import cloudinary from "../cloudConfig.js";
import blogModel from "../models/blog_model.js";
import mongoose from "mongoose";

//create blog
export const createBlog = async (req, res) => {
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
    const { category, title, description } = req.body;
    if (!category || !title || !description) {
      return res
        .status(400)
        .json({ message: "Category, title, description are required" });
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

    console.log("CloudinaryResponse : ", cloudinaryResponse);
    // 6. Handle Cloudinary upload errors
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }

    // 7. Prepare blog data
    const blogData = {
      category,
      title,
      description,
      adminName,
      adminImage,
      createdBy,
      blogImage: {
        url: cloudinaryResponse.url,
        public_id: cloudinaryResponse.public_id,
      },
    };

    // 8. Save the blog in the database
    const blog = await blogModel.create(blogData);
    console.log(blog);

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
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog Id" });
  }
  const blog = await blogModel.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json({ blog });
};

// admin can see their all blog
export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const blogs = await blogModel.find({ createdBy });
  res.status(200).json(blogs);
};

//update Blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  try {
    
  

  //check blog is present in database with given id
  let cloudinaryResponse;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog Id, Blog not found" });
  }
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
  console.log(updatedData);
  
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
};
