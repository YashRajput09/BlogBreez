import crypto from "crypto";
import userModel from "../models/user_model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    //    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });

    // generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    user.resetOtp = otp;
    user.resetOtpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // sent OTP via email
    await sendEmail({
      to: user.email,
      subject: "BreezBlog Password Reset OTP",
      text: `Your OTP for Resetting the password is ${otp} `,
    });

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error sending Otp", error });
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, otp, newPassword } = req.body;
  try {
   const hashedPassword = await hashPassword(newPassword);
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.resetOtpExpires < Date.now())
      return res.status(400).json({ message: "OTP has expired" });
    if (user.resetOtp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });
    // update password
    user.password = hashedPassword;
    user.resetOtp = null;
    user.resetOtpExpires = null;
    await user.save();
    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error updating password", error });
  }
};
