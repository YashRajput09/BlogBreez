import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

const CreatorProfile = () => {
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
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <FaUserCircle className="w-full h-full text-gray-600" />
          </motion.div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left space-y-2 text-black">
            <h2 className="text-3xl font-bold tracking-wide">Jane Developer</h2>
            <p className="text-sm text-gray-600 italic">Web Developer | Blogger | Educator</p>
            <p className="text-gray-600 max-w-lg">
              Passionate about building accessible web applications and writing
              tutorials for aspiring developers. 💻✨
            </p>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-center md:text-left">
              <div>
                <p className="text-xl font-bold">12</p>
                <p className="text-xs text-gray-600">Blogs</p>
              </div>
              <div>
                <p className="text-xl font-bold">180</p>
                <p className="text-xs text-gray-600">Followers</p>
              </div>
              <div>
                <p className="text-xl font-bold">34</p>
                <p className="text-xs text-gray-600">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div className="space-y-6 text-black">
          <h3 className="text-2xl font-semibold border-b border-white/20 pb-2">Recent Blogs</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow hover:scale-[1.01] transition"
                whileHover={{ y: -2 }}
              >
                <h4 className="text-lg font-bold">Placeholder Blog Title {i}</h4>
                <p className="text-sm text-gray-600 mt-2">
                  A short placeholder description about the blog topic. This will be
                  replaced by the actual content in the future.
                </p>
                <div className="mt-3 text-xs text-gray-600">Published: 2 days ago</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreatorProfile;
