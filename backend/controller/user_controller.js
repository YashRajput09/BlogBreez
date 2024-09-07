// import mongoose from 'mongoose';
import userModel from '../models/user_model.js';



export const signUpUser = async(req, res) =>{
    const { name, email, password, mobileNumber, education, profileImage, role, createdAt } = req.body;
    if(!name || !email || !password || !mobileNumber || !education || !role){
        return res.status(400).json({ message: "Please fill required fields" });
    }
    // const user = userModel.findOne({ email });
    // if( user ){
    //     return res.status(400).json({ message: "User already exist with this email" });
    // }
    const newUser = new userModel({ name, email, password, mobileNumber, education, role });
    await newUser.save();
    
    if(newUser){
        return res.send(200).json({ message: "User registered successfully"})
    }
    console.log(newUser); 
}