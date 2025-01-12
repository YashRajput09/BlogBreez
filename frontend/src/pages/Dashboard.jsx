import React, {useState} from "react";
import SideBar from "../dashboard/SideBar.jsx";
import MyProfile from "../dashboard/MyProfile.jsx";
import CreateBlog from "../dashboard/CreateBlog.jsx";
import MyBlogs from "../dashboard/MyBlogs.jsx"
import { useAuth } from "../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

 const Dashboard = () => {
  const [component, setComponent] = useState("My Profile");
  const navigate = useNavigate()

  const {isAuthenticated} = useAuth();
  
  //check user is LoggedIn
  if(!isAuthenticated){ 
    navigate('/')
  }

  return( 
    <div>
     <SideBar component={component} setComponent={setComponent}/>
    {
      component === "My Profile" ? (
        <MyProfile/>
      ) : component === "Create Blog" ? (
        <CreateBlog/>
      ) : (
        <MyBlogs/>
      )
    }
    </div>
)
};

export default Dashboard;
