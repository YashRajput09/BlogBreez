import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navebar from './componentes/Navebar';
import Home from './componentes/Home';
import Footer from './componentes/Footer';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';
import Creators from './pages/Creators';
import CreatorProfie from './pages/CreatorProfile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import UpdateBlog from './dashboard/UpdateBlog';
import ViewBlog from './pages/ViewBlog';
import UpdateAdminProfile from './dashboard/updateAdminProfile';
import PageNotFound from './pages/PageNotFound';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SearchBlogs from './pages/SearchBlogs';

function App() {
  const location = useLocation();
  const hidePages = ["/login", "/signup", "/dashboard"].includes(
    location.pathname
  );
  
  return (
    <>
      <div className="">
       {!hidePages && <Navebar/>}
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/creators" element={<Creators/>}/>
        <Route path="/creator/profile" element={<CreatorProfie/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/blog/update/:id" element={<UpdateBlog/>}/>
        <Route path="/blog/view/:id" element={<ViewBlog/>}/>
        <Route path="/user/update/admin/profile/:id" element={<UpdateAdminProfile/>}/>
        <Route path="/user/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/user/resetpassword" element={<ResetPassword/>}/>
        <Route path="/api/search" element={<SearchBlogs/>}/>
        <Route path='*' element={<PageNotFound/>}/>
       </Routes>
       <Toaster />
       {!hidePages && <Footer/>}
      </div>
    </>
  )
}

export default App;