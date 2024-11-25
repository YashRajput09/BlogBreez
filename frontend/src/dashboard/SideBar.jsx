import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider.jsx";
import { toast } from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { SiPaperswithcode } from "react-icons/si";
import { GrScheduleNew } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";

const SideBarBtn = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full px-4 hover:underline hover:text-blue-500 text-left"
  >
    <Icon /> {label}
  </button>
);

const SideBar = ({ setComponent }) => {
  const { profile, setIsAuthenticated } = useAuth();
  const [show, setShow] = useState(false);
  // console.log(profile);

  const handleComponent = (value) => (setComponent(value), console.log(value));

  const handleHomeBtn = () => {
    window.location.pathname = "/";
    // e.view.parent.location.pathname = '/';
    // console.log("Home clicked");
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
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
      toast.error("Faild to logout");
    }
  };

  return (
    <>
      <div className={`sm:hidden fixed top-4 left-5`}>
        <GiHamburgerMenu className="text-xl" onClick={() => setShow(!show)} />
      </div>
      <div
        className={` fixed top-0 left-0 z-10 bg-gray-50 h-screen w-60 transition-transform duration-300 sm:translate-x-0 shadow-lg rounded-lg ${
          show ? "translate-x-0" : "-translate-x-full z-0"
        }`}
      >
        <div>
          <IoMdArrowRoundBack
            className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer"
            onClick={() => setShow(!show)}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center  gap-2 py-8">
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={profile?.profileImage?.url}
              alt=""
            />
            <p className="capitalize font-semibold text-xl">{profile?.name}</p>
          </div>
          <div className=" space-y-5 px-4">
            <SideBarBtn
              icon={SiPaperswithcode}
              label="My Blogs"
              onClick={() => handleComponent("My Blogs")}
            />
            <SideBarBtn
              icon={CgProfile}
              label="My Profile"
              onClick={() => handleComponent("My Profile")}
            />
            <SideBarBtn
              icon={GrScheduleNew}
              label="Create Blog"
              onClick={() => handleComponent("Create Blog")}
            />
            <SideBarBtn icon={FaHome} label="Home" onClick={handleHomeBtn} />
            <SideBarBtn
              icon={RiLogoutBoxRLine}
              label="Logout"
              onClick={handleLogoutBtn}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
