import React from "react";
import { useAuth } from "../context/AuthProvider.jsx";

const MyProfile = () => {
    const { profile, isAuthenticated } = useAuth();

  console.log(profile);
  console.log(isAuthenticated);
  

  return <div>MyProfile</div>;
};

export default MyProfile;
