import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { CgLogIn } from "react-icons/cg";

const Navebar = () => {
  const [show, setShow] = useState(false);

  // Menu links for both mobile and desktop
  const menuLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/blogs", label: "Blogs" },
    { to: "/creators", label: "Creators" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/login", label: "LogIn" },
    { to: "/signup", label: "SignUp" },
  ];

  // function to handle toggling the menu
  const toggleMenu = () => {
    setShow(!show);
  };

  return (
    <>
      <nav className="shadow-xl px-4 py-3">
        <div className="flex justify-between items-center md:mx-11">
          <div>
            <span className="font-semibold text-blue-500 text-xl">BreezBlogs</span>
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex gap-7">
            {menuLinks.map((link, index) => {
              const excludedLabels = ['Dashboard', 'LogIn', 'SignUp'] //hide in mid size devices 

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
          <div className="hidden md:flex gap-5 border-b-2 border-t-2 shadow-xl duration-200 d px-3 py-2 rounded-lg">
            <Link to="/dashboard">Dashboard</Link>
            {/* <Link to="/signup">SignUp</Link> */}
            <Link to="/login">LogIn</Link>
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
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navebar;
