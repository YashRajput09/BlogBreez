import axios from "axios";
import React, { createContext, useContext, useState } from "react";
// import SubmitBtnLoader from "../loaders/SubmitBtnLoader";

const UserFeedContext = createContext();

export const UserFeedProvider = ({ children }) => {
  const [follow, setFollow] = useState([]);
  const [loader, setLoader] = useState(false);

  const toggleFollow = async (userToFollowId, currentUserId) => {
      
      setLoader(true);
      try {
        console.log(currentUserId);
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/user/follow/${userToFollowId}`,
        {currentUserId},
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
      setLoader(false);
    }
  };

  return(
    <UserFeedContext.Provider value={{follow, toggleFollow, loader}}>{children}</UserFeedContext.Provider>
  )
};

export const useFollow =() => useContext(UserFeedContext);

