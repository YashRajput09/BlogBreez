import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import SkeletonLoader from "../loaders/SkeletonLoader";
import { useFollow } from "../context/UserFeedProvider";
import {useAuth} from "../context/AuthProvider";

const Creators = () => {
  const { follow, toggleFollow, loader } = useFollow();
  const {profile} = useAuth();
  const [creator, setCreator] = useState([]);
  const [loading, setLoading] = useState(true); //  loading state

  useEffect(() => {
    const fetchCreatorsDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/user/admins`,
          {
            withCredentials: true,
          }
        );
        console.log("creators data: ", data);
        setCreator(data);
      } catch (error) {
        console.error("Error fetching creators data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCreatorsDetails();
  }, []);

  // const toggleFollow = (id) => {
  //   setFollowed((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  // };

  const renderCreatorCard = (item) => (
    <div
      key={item._id}
      className="w-96 flex justify-center items-center bg-gradient-to-br to-blue-100 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          x: [0, 3, -3, 3, -3, 0],
          y: [0, -3, 3, -3, 3, 0],
        }}
        transition={{ duration: 0.01, ease: "linear" }}
        className="backdrop-blur-xl bg-white/70 border border-blue-200 rounded-3xl shadow-2xl p-4"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-full flex items-center  gap-6">
            {/* Profile Image */}
            <img
              src={item?.profileImage?.url || "/default-image.jpg"}
              alt="Profile Placeholder"
              className="w-24 h-24 rounded-full object-cover border-3 border-blue-400 p-1 shadow-md"
            />
            <div className="">
              <h1 className="mb-1 text-xl font-bold ">
                {item?.name || "Anonymous"}
              </h1>
              <div className="flex gap-4 ">
                <button
                  onClick={() => toggleFollow(item._id, profile._id)}
                  disabled={loader}
                  className={`btn-primary text-base w-20 rounded-md text-white ${
                    follow.includes(item._id) ? "bg-gray-400" : "bg-blue-400"
                  }`}
                >
                  {follow.includes(item._id) ? "Unfollow" : "Follow"}
                </button>
                <button className="btn-primary text-base px-3 rounded-md bg-gray-400 text-white">
                  Message
                </button>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center">
            {/* <h1 className="text-2xl font-bold text-indigo-700">
              John Doe
            </h1> */}

            <p className="text-sm text-gray-700 max-w-xl mx-auto">
              Passionate writer, lifelong learner, and tech enthusiast. Sharing
              stories about development, design, and digital life.
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-4 ">
              <a
                href="#"
                className="hover:text-indigo-800 transition"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-indigo-800 transition"
                aria-label="Github"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="#"
                className="hover:text-indigo-800 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-2 grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Blogs", value: item?.blogCount },
            { label: "Followers", value: item?.followers.length },
            { label: "Following", value: item?.following.length },
          ].map((stat, index) => (
            <div key={index}>
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
  return (
    <div className="w-full flex justify-center flex-wrap py-4 gap-5">
      {creator.length > 0 ? (
        creator.map(renderCreatorCard)
      ) : (
        <p>No creators found</p>
      )}
    </div>
  );
};

export default Creators;
