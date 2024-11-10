import userModel from "../models/user_model.js";
import cloudinary from "../cloudConfig.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/AuthenticateToken.js"

export const signUpUser = async (req, res) => {
  try {
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
        public_id: cloudinaryResponse.public_id 
    }
  });
  await newUser.save();

  if (newUser) {
    const token = await createTokenAndSaveCookie(newUser._id, res);
    return res.status(200).json({ message: "User registered successfully",newUser, token: token});
  }
  console.log("New response : ", newUser);
} catch(error) {
  console.log(error);
  res.status(500).json({ message: "Internal server error", error})
}
};

export const logInUser = async (req, res) => {
  const { email, password, role } = req.body;
  try{
    if(!email || !password || !role){
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await userModel.findOne({ email }).select("+password");
    if(!user.password){
      return res.status(400).json({ message: "User password is missing" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!user || !isValidPassword){
      return res.status(400).json({ message: "Invalid email or password"});
    }
    if(user.role !== role){
      return res.status(400).json({ message: `Invalid role ${role}`});
    }
    const token = await createTokenAndSaveCookie(user._id, res);
    // const  redirectUrl = req.session.redirectTo || "/";
    // res.redirect(redirectUrl);
    
    res.status(200).json({
      message: "User loggedIn successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }, token: token,
      // redirectUrl: redirectUrl  // Send redirect URL as part of JSON response
    })
    // let redirectUrl = res.locals.redirectUrl || "/";
    // console.log("Original Url : ",req.originalUrl );
    // console.log("Redirect Url : ",redirectUrl );
    
    // res.redirect(redirectUrl);
  } catch(error){
    return res.status(400).json({ error: "Invalid credentials" });
  }
};

export const logOutUser = async (req, res) => {
  try{
    res.clearCookie("jwttoken");
    res.status(200).json({ message: "User loggedOut successfully "});
  } catch(errro){
    return res.status(500).json({ message: "Internal server error "});
  }
};  

export const getMyProfile = async (req, res) => {
  console.log(req);
  
  const profileDetails = await req.user;
  // console.log(profileDetails);
  res.status(200).json(profileDetails)
}

export const getAdmins = async (req, res) => {
  const admins = await userModel.find({ role: "admin"});
  res.status(200).json(admins);
}