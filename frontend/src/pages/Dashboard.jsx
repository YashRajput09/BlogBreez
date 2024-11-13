import React, {useState} from "react";
import SideBar from "../dashboard/SideBar.jsx";
import MyProfile from "../dashboard/MyProfile.jsx";
import CreateBlog from "../dashboard/CreateBlog.jsx";
import MyBlogs from "../dashboard/MyBlogs.jsx"
import { useAuth } from "../context/AuthProvider.jsx";
import { Navigate } from "react-router-dom";
import UpdateBlog from "../dashboard/UpdateBlog.jsx";
const Dashboard = () => {
  const [component, setComponent] = useState("My Blogs");
  const {isAuthenticated} = useAuth();
  // console.log(isAuthenticated);
  
  //check user is LoggedIn
  if(!isAuthenticated){ 
    return window.location.pathname = '/';
    // return <Navigate to={'/'}/>
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
