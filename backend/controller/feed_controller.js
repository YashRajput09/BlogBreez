import userModel from "../models/user_model.js";
import activityModel from "../models/activity_model.js";

export const followUser = async (req, res) => {
  try {
    // console.log(req.user._id);

    const userToFollow = await userModel.findById(req.params.id);
    const currentUser = await userModel.findById(req.user._id);
    // console.log("userToFollow: ", userToFollow.followers);
    // console.log("currentUser: ", currentUser.following);

    if (!userToFollow || !currentUser)
      return res.status(404).json({ message: "Login || User not found" });
    if (!currentUser.following.includes(userToFollow._id)) {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
      await currentUser.save();
      await userToFollow.save();

        // recent activity store
       const followActivity =  await activityModel.create({
        user: currentUser._id,
        actionType: "subscriber",
        contentId: userToFollow._id,
        contentType: "User",
        message: `New Subscriber: ${userToFollow.name}`,
      });
      // console.log("follow activity: ",followActivity);
      
      res.status(200).json({ message: "User Followed" });
    } else {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== userToFollow._id.toString()
      );
      userToFollow.followers = userToFollow.followers.filter(
        (id) => id.toString() !== currentUser._id.toString()
      );
      await currentUser.save();
      await userToFollow.save();

      res.status(200).json({ message: "User unfollowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error following user", error });
  }
};

export const getFollowing = async (req, res) => {
  try {
    // console.log("req id: ",req.user);
    // const user = await userModel.findById(req.user._id).select("following");
    const user = await userModel.findById(req.user._id).populate("following", "name profileImage");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ following: user.following });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "faild to fetch following list" });
  }
};

// Single user following
export const getSingleUserFollowing = async (req, res) =>{
  try {
    const user = await userModel.findById(req.params.id).populate("following", "name profileImage");
    res.status(200).json({user})
  } catch (error) {
    console.error(error);
  }

}
// Single user follower
export const getSingleUserFollower = async (req, res) =>{
  try {
    const user = await userModel.findById(req.params.id).populate("followers", "name profileImage");
    res.status(200).json({user})
  } catch (error) {
    console.error(error);
  }

}