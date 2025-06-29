import { motion } from "framer-motion";
import "../styles/ViewBlogSkeletonLoader.css"; // for shimmer animation

const ViewBlogSkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 p-4 flex justify-center items-center">
      <motion.div
        className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Image Skeleton */}
        <div className="h-64 bg-gray-300 rounded-lg mb-5 shimmer" />

        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4 shimmer" />

        {/* Meta Info Skeleton */}
        <div className="flex gap-4 mb-4">
          <div className="h-4 w-20 bg-gray-300 rounded shimmer" />
          <div className="h-4 w-16 bg-gray-300 rounded shimmer" />
          <div className="h-4 w-24 bg-gray-300 rounded shimmer" />
        </div>

        {/* Paragraph Skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-300 rounded shimmer" />
          <div className="h-4 w-5/6 bg-gray-300 rounded shimmer" />
          <div className="h-4 w-4/6 bg-gray-300 rounded shimmer" />
          <div className="h-4 w-3/4 bg-gray-300 rounded shimmer" />
          <div className="h-4 w-2/4 bg-gray-300 rounded shimmer" />
        </div>

        {/* Buttons Skeleton */}
        <div className="mt-6 flex gap-4 justify-end">
          <div className="h-8 w-24 bg-gray-300 rounded shimmer" />
          <div className="h-8 w-24 bg-gray-300 rounded shimmer" />
        </div>
      </motion.div>
    </div>
  );
};

export default ViewBlogSkeletonLoader;
