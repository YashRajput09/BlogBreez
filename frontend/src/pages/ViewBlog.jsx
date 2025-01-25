    // ViewBlog.js

    import React, {useState, useEffect} from 'react';
    import { motion } from 'framer-motion';
    import { useParams, Link } from 'react-router-dom';
    import { useAuth } from '../context/AuthProvider.jsx';
    import { useInteraction } from '../context/InteractionProvider.jsx';
    import toast from 'react-hot-toast';

    const ViewBlog = () => {
   
    const { blogs, profile } = useAuth(); // Assuming blogs come from useAuth context
    const {likes, blogLikes} = useInteraction();
    const [localLikes, setLocalLikes] = useState(0); // Local state for likes count
    
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const handleLikes = () =>{

        // console.log("ViewBlog Blog id: ", id) // fetch corerctly - ViewBlog Blog id:  66eae3b90099cd15baed4a8c

        if (!profile) {
            toast.error("You need to log in to like a blog.");
            return;
          }
        const userId = profile._id;
        blogLikes(blog._id, userId);
    }


    useEffect(() => {
      if (blogs && id) {
        const selectedBlog = blogs.find(blog => blog._id === id);
        setBlog(selectedBlog);
        // Initialize likes from the backend
        if (selectedBlog && likes[selectedBlog._id] === undefined) {
            setLocalLikes(selectedBlog.likes || 0); // Fallback to 0 if likes are undefined
          } else {
            setLocalLikes(likes[selectedBlog._id]);
          }
        }
      }, [blogs, id, likes]);
    
        //character limit for preview text
    const previewLimit = 800;  
    if (blog === null) return <div>Loading...</div>;
        if (!blog) return <div>Blog not found</div>
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 p-2 md:p-5  flex justify-center items-center ">
            <div className='group'>
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
            className="w-full h-64 object-cover rounded-lg mb-5 group-hover:h-96 transition-all ease-in-out"
            //  className="w-full h-64 object-cover rounded-lg mb-5 hover:scale-105 transition-transform duration-500"
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
            <div className="mt-3 flex items-center justify-between text-sm">
            <div className='space-x-4 text-gray-500'>
            <span>by {blog?.adminName}</span>
            <span className="font-light">|</span>
            <span>24-07-2024</span>
            <span className="font-light">|</span>
            {/* <button onClick={handleLikes}>👍 Like {likes[blog?._id] || 0}</button> */}
            <button onClick={handleLikes}>👍 Like {localLikes || 0}</button>
            </div>
            <Link to={`/blog/update/${id}`} className="underline text-blue-500">update</Link>
            </div>

            {/* Divider */}
            <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.7 }}
            className="mt-3 border-t border-gray-300"
            />

            Content
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 text-gray-700 leading-relaxed text-lg"
            >
            {blog?.description}
            </motion.div>

           

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
