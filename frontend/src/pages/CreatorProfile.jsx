import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useFollow } from "../context/UserFeedProvider";
import { useAuth } from "../context/AuthProvider";
import FollowerModal from "../componentes/Profile/FollowersList";

const CreatorProfile = () => {
  const { id } = useParams();
  const {
    follow,
    toggleFollow,
    loader
  } = useFollow();
  const { profile } = useAuth();

  const [creatorProfile, setCreatorProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "Followers" or "Following"
  const [modalUsers, setModalUsers] = useState([]);

  useEffect(() => {
    const fetchCreatorProfile = async () => {
      const creatorProfile = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/user/admin/profile/${id}`
      );
      setCreatorProfile(creatorProfile.data);
    };
    fetchCreatorProfile();
  }, [follow]);

  const openModal = async (type) => {
    setModalType(type);
    setIsModalOpen(true);

    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/user/${type.toLowerCase()}/${id}`,
        { withCredentials: true }
      );
      setModalUsers(res.data);
    } catch (err) {
      console.error("Error loading list: ", err);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#e3e7ec] p-6 text-white flex items-center justify-center"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image */}
          <motion.div
            className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <img
              className="object-cover w-full h-full"
              src={creatorProfile?.profileImage?.url}
              alt=""
              srcSet=""
            />
            {/* <FaUserCircle className="w-full h-full text-gray-600" /> */}
          </motion.div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left space-y-2 text-black">
            <h2 className="text-3xl font-bold tracking-wide">
              {creatorProfile?.name}
            </h2>
            <div className="space-x-4 ">
              <button
                onClick={() => toggleFollow(creatorProfile._id, profile._id)}
                disabled={loader}
                className={`btn-primary text-base w-20 rounded-md text-white ${
                  follow.includes(creatorProfile?._id)
                    ? "bg-gray-400"
                    : "bg-blue-400"
                }`}
              >
                {follow.includes(creatorProfile?._id) ? "Unfollow" : "Follow"}
              </button>
              <button className="btn-primary text-base px-3 rounded-md bg-gray-400 text-white">
                Message
              </button>
            </div>
            <p className="text-sm text-gray-600 italic">
              Web Developer | Blogger | Educator
            </p>
            <p className="text-gray-600 max-w-lg">
              Passionate about building accessible web applications and writing
              tutorials for aspiring developers. 💻✨
            </p>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-center md:text-left">
              <div>
                <p className="text-xl font-bold">{creatorProfile?.blogCount}</p>
                <p className="text-xs text-gray-600">Blogs</p>
              </div>
              <div  onClick={() => openModal("Followers")}>
                <p
                  className="text-xl font-bold"
                >
                  {creatorProfile?.followers.length}
                </p>
                <p className="text-xs text-gray-600">Followers</p>
              </div>
              <div onClick={() => openModal("Following")}>
                <p
                  className="text-xl font-bold"
                >
                  {creatorProfile?.following.length}
                </p>
                <p className="text-xs text-gray-600">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div className="space-y-6 text-black">
          <h3 className="text-2xl font-semibold border-b border-white/20 pb-2">
            {creatorProfile?.blogs?.length > 0
              ? "Recent Blogs"
              : "No Blog Posted"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {creatorProfile?.blogs?.map((blog) => (
              <Link to={`/blog/view/${blog?._id}`} key={blog._id}>
                <motion.div
                  key={blog}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow hover:scale-[1.01] transition"
                  whileHover={{ y: -2 }}
                >
                  <h4 className="text-lg font-bold">{blog.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    {`${blog.description.substring(0, 113)}...`}
                  </p>
                  <div className="mt-3 text-xs text-gray-600">
                    Published: {new Date(blog?.createdAt).toLocaleDateString()}
                  </div>
                </motion.div>
              </Link>
            ))}
            
 {/* Reusable Modal */}
      <FollowerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        users={modalUsers}
      />

          </div>
        </div>
      </div>
     
    </motion.div>
  );
};

export default CreatorProfile;
