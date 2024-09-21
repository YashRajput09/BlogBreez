import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navebar from './componentes/Navebar';
import Home from './componentes/Home';
import Footer from './componentes/Footer';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/authProvider';

function App() {
  const location = useLocation();
  const hidePages = ["/login", "/signup", "/dashboard"].includes(
    location.pathname
  );
  const { blogs } = useAuth();
  console.log(blogs);
  
  return (
    <>
      <div className="font-bold w-full h-screen bg-slate-800 text-white">
       {!hidePages && <Navebar/>}
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
       </Routes>
       {!hidePages && <Footer/>}
      </div>
    </>
  )
}

export default App;