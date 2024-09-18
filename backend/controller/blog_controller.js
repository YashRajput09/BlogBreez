import cloudinary from "../cloudConfig.js";
import blogModel from "../models/blog_model.js";

export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" });
    }
    console.log("file : ", req.files);
    
    const { blogImage } = req.files;
    const allowedFormates = ["image/jpeg", "image/png", "image/pdf"];
    if (!allowedFormates.includes(blogImage.mimetype)) {
      return res
        .status(400)
        .json({
          message: "Invalid image formate, Only jpg, png, pdf are allowed ",
        });
    }

    const { category, title, description } = req.body;
    if (!category || !title || !description) {
      return res
        .status(400)
        .json({ message: "Category, title, description are required" });
    }
console.log("Req.User : ",req.user);

    const adminName = req?.user?.name;
    const adminImage = req?.user?.profileImage.url;
    const createdBy = req?.user?._id;

    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath,
      {
        folder: "Blog_web",
      }
    );

    console.log("CloudinaryResponse : ", cloudinaryResponse);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }

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

    const blog = await blogModel.create(blogData);
    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
