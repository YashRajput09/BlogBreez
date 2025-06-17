import userModel from "../models/user_model.js";

export const followUser = async(req, res)=>{
    try{
        console.log(req.user._id);
        
    const userToFollow = await userModel.findById(req.params.id);
    const currentUser = await userModel.findById(req.user._id);
    console.log("userToFollow: ",userToFollow);
    console.log("currentUser: ",currentUser);
    
        
     if (!userToFollow || !currentUser) return res.status(404).json({ message: 'Login || User not found' });
    if(!currentUser.following.includes(userToFollow._id)){
        currentUser.following.push(userToFollow._id);
        userToFollow.followers.push(currentUser._id);
        await currentUser.save();
        await userToFollow.save();
        res.status(200).json({ message: 'User Followed'});
    } else{
         currentUser.following = currentUser.following.filter(id => id.toString() !== userToFollow._id.toString());
         userToFollow.followers = userToFollow.followers.filter(id => id.toString() !== currentUser._id.toString());
          await currentUser.save();
    await userToFollow.save();
    res.status(200).json({ message: 'User unfollowed' });
    }
} catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Error following user', error });
  }

    }