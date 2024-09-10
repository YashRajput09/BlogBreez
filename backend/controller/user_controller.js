import userModel from "../models/user_model.js";
import cloudinary from "../cloudConfig.js";

export const signUpUser = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "User profile image is required" });
  }
  const { profileImage } = req.files;

  const allowedFormates = ["image/jpeg", "image/png", "image/pdf"];
  if (!allowedFormates.includes(profileImage.mimetype)) {
    return res
      .status(400)
      .json({
        message: "Invalid image formate, only jpg, png, pdf are allowed",
      });
  }

  const { name, email, password, mobileNumber, education, role, createdAt } =
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
    profileImage.tempFilePath,{
        folder: "Blog_web"
    }
  );
  console.log("cloudinary response : ", cloudinaryResponse);

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(cloudinaryResponse.error);
  }
  const newUser = new userModel({
    name,
    email,
    password,
    mobileNumber,
    education,
    role,
    profileImage: {
        url: cloudinaryResponse.url,
        public_id: cloudinaryResponse.public_id 
    }
  });
  await newUser.save();

  if (newUser) {
    return res.status(200).json({ message: "User registered successfully" });
  }
  console.log("New response : ", newUser);
};
