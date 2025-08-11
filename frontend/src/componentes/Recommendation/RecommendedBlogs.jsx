// components/RecommendedBlogs.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const RecommendedBlogs = () => {
  const { id } = useParams();
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/blog/recommanded/${id}`
        );
        setRelatedBlogs(res.data || []);
      } catch (err) {
        console.error("Error fetching recommended blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecommended();
    }
  }, [id]);

  if (loading) {
    return <p className="text-gray-500">Loading recommendations...</p>;
  }

  if (!relatedBlogs.length) {
    return <p className="text-gray-500">No related blogs found.</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">
        Recommended for you
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relatedBlogs.map((blog) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <Link to={`/blog/view/${blog._id}`}>
              <div className="relative">
                {blog?.blogImage?.url && (
                  <img
                    src={blog?.blogImage?.url}
                    alt={blog?.title}
                    className="w-full h-56 object-cover transform hover:scale-105 transition duration-300"
                  />
                )}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                  <h3 className="text-lg font-semibold text-white">
                    {blog.title.length > 60
                      ? blog.title.slice(0, 60) + "..."
                      : blog.title}
                  </h3>
                  {blog.category?.length > 0 && (
                    <p className="text-xs text-gray-200">
                      {blog.category.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBlogs;
