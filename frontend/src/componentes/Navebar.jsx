import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
// import { CgLogIn } from "react-icons/cg";
import { useAuth } from "../context/AuthProvider.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { CgInfinity } from "react-icons/cg";
import DarkModeToggle from "./DarkModeToggle";


const Navebar = () => {
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();

  const [show, setShow] = useState(false);
  // const {isAuthenticated} =
  // Menu links for both mobile and desktop
  const menuLinks = [
    { to: "/", label: "Home" },
    { to: "/blogs", label: "Blogs" },
    { to: "/creators", label: "Creators" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  // function to handle toggling the menu
  const toggleMenu = () => {
    setShow(!show);
  };
  const handleLogoutBtn = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/user/logout`,
        {}, // Empty body for the logout request (if required)
        {
          withCredentials: true, // It Ensure credentials (cookies, tokens) are sent
        }
      );
      toast.success("User loggedOut successfully");
      // window.location.pathname = '/login';
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
      toast.error("Faild to logout");
    }
  };

  return (
    <>
      <nav className="shadow-xl px-4 py-3">
        <div className="flex justify-between items-center md:mx-11">
          <div>
            <Link to={'/'} className=" flex items-center font-semibold text-blue-500 text-xl gap-1">
            <CgInfinity className="text-3xl" /> 
             BreezBlogs 
            </Link>
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex gap-7">
            {menuLinks.map((link, index) => {
              const excludedLabels = ["Dashboard", "LogIn", "SignUp"]; //hide in mid size devices

              if (!excludedLabels.includes(link.label)) {
                return (
                  <Link
                    key={index}
                    to={link.to}
                    className="hover:text-cyan-600 duration-400"
                  >
                    {link.label}
                  </Link>
                );
              }
            })}
          </ul>

          {/* Mobile Menu Toggle Icon */}
          <div className="md:hidden" onClick={toggleMenu}>
            {show ? <RiCloseFill size={24} /> : <RiMenu3Fill size={24} />}
          </div>

          {/* Desktop Dashboard/Login Buttons */}
          <div className="hidden md:flex items-center gap-5 border-b-2 border-t-2 shadow-xl duration-200 d px-3 py-2 rounded-lg">
            {isAuthenticated && profile?.role === "admin" && (
              <Link to="/dashboard">Dashboard</Link>
            )}

            {!isAuthenticated ? (
              <Link to="/login">LogIn</Link>
            ) : (
              <button onClick={handleLogoutBtn}>Logout</button>
            )}
            {/* <DarkModeToggle /> */}
          </div>
        </div>

        {/* mobile menu*/}
        {show && (
          <div className="md:hidden">
            <ul className="flex flex-col h-screen items-center justify-center gap-7">
              {menuLinks.map((link, index) => (
                <Link
                  key={link.index}
                  to={link.to}
                  className="hover:text-cyan-600 duration-400"
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
               {/* <DarkModeToggle /> */}
              {isAuthenticated ? (
                <>
                <Link to='/dashboard' className="hover:text-blue-500" onClick={toggleMenu}> Dashboard</Link>
                <button onClick={handleLogoutBtn} className="hover:text-red-500">Logout</button>
                </>
              ) : (
                <>
                <Link to='/login' className="hover:text-blue-500" onClick={toggleMenu}>LogIn</Link>
                <Link to='/signup' className="hover:text-green-500" onClick={toggleMenu}>SignUp</Link>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navebar;
