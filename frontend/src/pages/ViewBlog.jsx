// ViewBlog.js

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import { useInteraction } from "../context/InteractionProvider.jsx";
import toast from "react-hot-toast";
import CommentButton from "../componentes/Interactions/CommentButton.jsx";
import ShareButton from "../componentes/Interactions/ShareButton.jsx";
import VoiceReader from "../componentes/Interactions/VoiceReader.jsx";
import { Heart } from "lucide-react"; // Using lucide-react for the heart icon
import BlogSummarization from "../ai/BlogSummarizer.jsx";
import axios from "axios";
import { IoIosEye } from "react-icons/io";
import ExportToPDF from "../componentes/Interactions/ExportToPDF.jsx";
import ViewBlogSkeletonLoader from "../loaders/SkeletonLoader.jsx";

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log(id);

  const { blogs, profile } = useAuth(); // Assuming blogs come from useAuth context
  const { likes, blogLikes } = useInteraction();
  const [blog, setBlog] = useState(null);
  const [localLikes, setLocalLikes] = useState(0); // Local state for likes count
  const [isFullDescription, setIsFullDesctiption] = useState(false);
  const [hide, setHide] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLikes = () => {
    const userId = profile._id;
    setLiked((prev) => !prev); // Toggle liked state
    blogLikes(blog._id, userId);
  };

  useEffect(() => {
    if (!profile) {
      toast.error("You need to log in to read the blog.");
      navigate("/login");
    }

    const fetchBlog = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/blog/single-blog/${id}`,
        {
          withCredentials: true, // This ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("data : ",res.data.blog);
      const singleBlog = res.data.blog;
      setBlog(singleBlog); // Assuming res.data.blog is the blog object

      if (singleBlog && likes[singleBlog._id] === undefined) {
        setLocalLikes(singleBlog.likes || 0); // Fallback to 0 if likes are undefined
      } else {
        setLocalLikes(likes[singleBlog._id]);
      }

      // Check if user has already liked the blog
      const hasLiked = singleBlog.likedUsers?.includes(profile._id);
      setLiked(hasLiked || false);
    };
    if (id) {
      fetchBlog();
    }
  }, [blogs, id, likes, profile]);
  // console.log(blog);

  if (!blog)
    return (
      <div>
        <ViewBlogSkeletonLoader />
      </div>
    );
  // if (!blog) return <div>Blog not found</div>;

  //character limit for preview text
  const previewLimit = 400;

  const handleShowMore = () => {
    setIsFullDesctiption(true);
  };

  const handleShowLess = () => {
    setIsFullDesctiption(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 p-2 md:p-5  flex justify-center items-center ">
      <div id="pdf-content" className="group">
        <motion.div
          className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Blog Image */}
          <motion.img
            src={blog?.blogImage?.url}
            alt="Blog cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full h-64 object-cover rounded-lg mb-5 hover:h-96 transition-all ease-in-out"
          />

          {/* Title */}
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl md:text-4xl font-semibold text-indigo-700"
          >
            {blog?.title}
          </motion.h1>

          {/* Author & Date */}
          <div className="mt-6 flex items-center justify-between text-sm">
            {!hide ? (
              <div className="flex gap-4">
                {/* Likes Section */}
                <button onClick={handleLikes}>
                  <motion.div
                    whileTap={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex text-gray-500 text-xs items-center"
                  >
                    <Heart
                      size={18}
                      color={liked ? "red" : "gray"}
                      fill={liked ? "red" : "none"}
                    />
                    &nbsp;{localLikes || 0}
                  </motion.div>
                </button>
                <span className="font-light">|</span>

                {/* Comments Section */}
                <CommentButton blogId={id} />
                <span className="font-light">|</span>

                {/* New Share Section */}
                <ShareButton url={window.location.href} title={blog?.title} />
                <span className="font-light">|</span>

                {/* views section */}
                <div className="flex gap-1 items-center">
                  <IoIosEye size={18} className="text-gray-500" />
                  <span className="text-xs ">{blog.views}</span>
                </div>
              </div>
            ) : (
              <Link to={`/blog/view/${id}`} className="underline text-blue-500">
                www.breezblogs.com
              </Link>
            )}

            <div className=" flex items-center space-x-4 text-gray-500 ">
              <span className="font-light">|</span>
              <span>by {blog?.adminName}</span>
              <span className="font-light">|</span>
              <span>24-07-2024</span>
            </div>
            {blog?.createdBy?._id == profile?._id ? (
              <Link
                to={`/blog/update/${id}`}
                className="underline text-blue-500"
              >
                update
              </Link>
            ) : (
              ""
            )}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.7 }}
            className="mt-3 border-t border-gray-300"
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 text-gray-700 leading-relaxed text-lg  blog-post-content"
          >
            {/* {isFullDescription
              ? blog?.description
              : `${blog?.description.slice(0, previewLimit)}...`} */}
            {isFullDescription
              ? blog?.description
              : `${(blog?.description).slice(0, previewLimit)}...`}
          </motion.div>

          {!hide ? (
            <div className=" text-center mt-5">
              {/*  VoiceReader  */}
              <div className="">
                <VoiceReader />
              </div>
              <div className="flex justify-end gap-3">
                {/* Export blog */}
                <ExportToPDF
                  blog={blog}
                  descriptionState={setIsFullDesctiption}
                  hide={setHide}
                />

                {/* Summarize blog */}
                <BlogSummarization blogDescription={blog?.description} />
              </div>
              {isFullDescription ? (
                <button
                  onClick={handleShowLess}
                  className="border border-blue-500 px-4 py-1 rounded-md text-blue-500 text-sm"
                >
                  show less
                </button>
              ) : (
                <button
                  onClick={handleShowMore}
                  className=" border border-blue-500 px-4 py-1 rounded-md text-blue-500 text-sm"
                >
                  show more
                </button>
              )}
            </div>
          ) : (
            ""
          )}

          {/* Floating Icons */}
          <div className="absolute hidden lg:block md:right-12 md:bottom-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex gap-4"
            >
              <button className="p-3 bg-indigo-500 rounded-full text-white shadow-md hover:bg-indigo-600 transition">
                <i className="fas fa-thumbs-up"></i>
              </button>
              <button className="p-3 bg-indigo-500 rounded-full text-white shadow-md hover:bg-indigo-600 transition">
                <i className="fas fa-share"></i>
              </button>
              <button className="p-3 bg-indigo-500 rounded-full text-white shadow-md hover:bg-indigo-600 transition">
                <i className="fas fa-bookmark"></i>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewBlog;
