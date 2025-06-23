import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
// import SubmitBtnLoader from "../loaders/SubmitBtnLoader";

const UserFeedContext = createContext();

export const UserFeedProvider = ({ children }) => {
  const [follow, setFollow] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  // const [loader, setLoader] = useState(false);

  // load following list on mount
  useEffect(() => {
    const loadFollowing = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/user/following`,
          { withCredentials: true }
        );
        setFollow(res.data.following); // Populate follow state
      } catch (error) {
        console.log("Error loading following list:", error);
      }
    };
    loadFollowing();
  }, []);

  const toggleFollow = async (userToFollowId, currentUserId) => {
    // setLoader(true);
    try {
      // console.log(currentUserId);
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/user/follow/${userToFollowId}`,
        { currentUserId },
        { withCredentials: true }
      ),
        setFollow((prev) =>
          prev.includes(userToFollowId)
            ? prev.filter((id) => id !== userToFollowId)
            : [...prev, userToFollowId]
        );
    } catch (error) {
      console.log("Error during toggleFollow : ", error);
    } finally {
      // setLoader(false);
    }
  };

  // single user follower
  const singleUserFollowers = async(id)=>{
    // console.log("data");
        try {
      
          const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/user/follower/${id}`,
            {withCredentials: true}
          )
          setFollowers(res.data);
          // console.log(res.data);
          
    } catch (error) {
      console.error(error);
      
    }
    
  }
  // single user follower

  const singleUserFollowings = async(id)=>{

    const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/user/following/${id}`,
      {withCredentials: true}
    )
    setFollowings(res.data);

  }


  return (
    <UserFeedContext.Provider value={{ follow, toggleFollow, followers, followings, singleUserFollowers, singleUserFollowings }}>
      {children}
    </UserFeedContext.Provider>
  );
};

export const useFollow = () => useContext(UserFeedContext);
