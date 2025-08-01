import userModel from "../models/user_model.js";
import cloudinary from "../cloudConfig.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/AuthenticateToken.js";
import mongoose from "mongoose";
import blogModel from "../models/blog_model.js";

// signup User
export const signUpUser = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ message: "User profile image is required" });
    }
    const { profileImage } = req.files;

    const allowedFormates = ["image/jpeg", "image/png", "image/pdf"];
    if (!allowedFormates.includes(profileImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid image formate, only jpg, png, pdf are allowed",
      });
    }

    const { name, email, password, mobileNumber, education, role } =
      req.body;
    if (
      !name ||
      !email ||
      !password ||
      !mobileNumber ||
      !education ||
      !role
      // !profileImage
    ) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exist with this email" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      profileImage.tempFilePath,
      {
        folder: "Blog_web",
      }
    );
    // console.log("cloudinary response : ", cloudinaryResponse);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      mobileNumber,
      education,
      role,
      profileImage: {
        url: cloudinaryResponse.url,
        public_id: cloudinaryResponse.public_id,
      },
    });
    await newUser.save();

    if (newUser) {
      const token = await createTokenAndSaveCookie(newUser._id, res);
      return res
        .status(200)
        .json({
          message: "User registered successfully",
          newUser,
          token: token,
        });
    }
    // console.log("New response : ", newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Login User
export const logInUser = async (req, res) => {
  const { email, password, role, rememberMe } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!user || !isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (user.role !== role) {
      return res.status(400).json({ message: `Invalid role ${role}` });
    }
    const token = await createTokenAndSaveCookie(user._id, res, rememberMe);
    // console.log(token);

    res.status(200).json({
      message: "User loggedIn successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
};

// Logout user
export const logOutUser = async (req, res) => {
  try {
    res.clearCookie("jwttoken", {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({ message: "User loggedOut successfully " });
  } catch (errro) {
    return res.status(500).json({ message: "Internal server error " });
  }
};

export const getMyProfile = async (req, res) => {
  // console.log(req);

  const profileDetails = await req.user;
  // console.log(profileDetails);
  res.status(200).json(profileDetails);
};

// get all admins
export const getAdmins = async (req, res) => {
  const admins = await userModel.find({ role: "admin" });
  const blogCounts = await blogModel.aggregate([
    {
      $group: {
        _id: "$createdBy", // Group by author id
        count: { $sum: 1 },
      },
    },
  ]);

  // Convert array to map for quick lookup
  const blogCountMap = {};
  blogCounts.forEach((entry) => {
    blogCountMap[entry._id.toString()] = entry.count;
  });

  const adminsWithBlogCount = admins.map((admin) => {
    return {
      ...admin.toObject(), // convert Mongoose doc to plain object
      blogCount: blogCountMap[admin._id.toString()] || 0,
    };
  });

  res.status(200).json(adminsWithBlogCount);
};

// get single admin profile
export const getAdminProfile = async (req, res) => {
  try {
    const adminProfile = await userModel.findById(req.params.id);

    if (!adminProfile) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Count blogs created by this admin
    const blogCount = await blogModel.countDocuments({
      createdBy: adminProfile._id,
    });
    const blogs = await blogModel.find({ createdBy: adminProfile._id }).sort({ createdAt: -1 });

    // Combine profile and blog count
    res.status(200).json({ ...adminProfile._doc, blogCount, blogs });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Failed to fetch admin profile", error });
  }
};

export const editAdminProfile = async (req, res) => {
  const { id } = req.params;

  try {
    let cloudinaryResponse;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid Admin Id, Admin not found" });
    }
    if (req.files && req.files.profileImage) {
      const updatedImage = req.files.profileImage;
      cloudinaryResponse = await cloudinary.uploader.upload(
        updatedImage.tempFilePath,
        {
          folder: "Blog_web",
        }
      );
    }
    const updatedData = { ...req.body };
    if (cloudinaryResponse) {
      updatedData.profileImage = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }
    // console.log(updatedData);

    // Find and update the user based on the extracted id
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: id }, // Use id directly, not as an object
      { $set: updatedData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // console.log(updatedUser);

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "All fields are required" });
  }
};
