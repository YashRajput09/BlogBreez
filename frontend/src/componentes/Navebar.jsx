import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";

const Navebar = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <nav className="shadow-xl px-4 py-3">
        <div className="flex justify-between items-center md:mx-11">
          <div className="">
            Breez<span className="font-semibold text-blue-500">Blogs</span>
          </div>
          {/* desktop size navbar*/}
          <div className="">
            <ul className="hidden md:flex gap-7">
              <Link to="/" className="hover:text-cyan-600 duration-400">
                Home
              </Link>
              <Link to="/blogs" className="hover:text-cyan-600 duration-400">
                Blogs
              </Link>
              <Link to="/creators" className="hover:text-cyan-600 duration-400">
                Creators
              </Link>
              <Link to="/about" className="hover:text-cyan-600 duration-400">
                About
              </Link>
              <Link to="/contect" className="hover:text-cyan-600 duration-400">
                Contect
              </Link>
            </ul>
          <div className="md:hidden" onClick={() => setShow(!show)}>
            {show ? <RiCloseFill size={24}/> : <RiMenu3Fill size={24} />}
          </div>
          </div>
          <div className="hidden md:flex gap-5 border-b-2 border-t-2 shadow-xl duration-200 d px-3 py-2 rounded-lg">
            <Link to="/dashboard">Dashboard</Link>
            {/* <Link to="/signup">SignUp</Link> */}
            <Link to="/login">LogIn</Link>
          </div>
          </div>

          {/* mobile size navbar*/}
          { show && (
             <div className="">
             <ul className="md:hidden flex flex-col h-screen items-center justify-center gap-7">
               <Link to="/" className="hover:text-cyan-600 duration-400" onClick={() => setShow(!show)} smooth="true" duration={1000}>
                 Home
               </Link>
               <Link to="/blogs" className="hover:text-cyan-600 duration-400" onClick={() => setShow(!show)} smooth="true" duration={1000}>
                 Blogs
               </Link>
               <Link to="/creators" className="hover:text-cyan-600 duration-400" onClick={() => setShow(!show)} smooth="true" duration={1000}>
                 Creators
               </Link>
               <Link to="/about" className="hover:text-cyan-600 duration-400" onClick={() => setShow(!show)} smooth="true" duration={1000}>
                 About
               </Link>
               <Link to="/contect" className="hover:text-cyan-600 duration-400" onClick={() => setShow(!show)} smooth="true" duration={1000}>
                 Contact
               </Link>
             </ul>
           </div>
          )}
      </nav>
    </>
  );
};

export default Navebar;
