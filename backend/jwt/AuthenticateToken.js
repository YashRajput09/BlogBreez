import jwt from 'jsonwebtoken';
import userModel from '../models/user_model.js';

const createTokenAndSaveCookies = async (userId, res, rememberMe = false) => {
    // console.log(process.env.JWT_SECRET);
    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
        expiresIn: rememberMe ? "7d" : "1h",
    });
    res.cookie("jwttoken", token , {
        httpOnly: false, //protect from xss attck 
        sameSite: "none", //protect from csrf attack
        secure: true,  // For development (set to true in production with HTTPS)    
        // httpOnly: true, //protect from xss attck 
        // sameSite: "lax", //protect from csrf attack
        // secure: false,  // For development (set to true in production with HTTPS)    
    })
    await userModel.findByIdAndUpdate(userId, {token});
    return token;
}

export default createTokenAndSaveCookies;