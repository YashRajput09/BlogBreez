import userModel from "../models/user_model.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const jwtToken = req.cookies.jwttoken;
    // console.log("jwtToken : ", jwtToken);
    
    if (!jwtToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized access, You wants to login first." });
    }
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    // console.log("decode: ", decoded);

    const user = await userModel.findById(decoded.userId);
    // console.log("auth User : ", user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
      // Attach user info to the request object
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
