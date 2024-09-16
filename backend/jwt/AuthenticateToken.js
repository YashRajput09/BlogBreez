import jwt from 'jsonwebtoken';
import userModel from '../models/user_model.js';

const createTokenAndSaveCookies = async (userId, res) => {
    console.log(process.env.JWT_SECRET);
    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
        expiresIn: "7d"
    });
    res.cookie("jwttoken", token , {
        httpOnly: true, //protect from xss attck
        sameSite: "strict", //protect from csrf attack
        secure: true
    })
    await userModel.findByIdAndUpdate(userId, {token});
    return token;
}

export default createTokenAndSaveCookies;