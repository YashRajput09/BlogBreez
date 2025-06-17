import React from "react";
import { motion } from "framer-motion";

const SkeletonCard = () => {
  return (
    <motion.div
      className="w-full sm:w-[22rem] h-[22rem] rounded-3xl p-5 bg-white/70 border border-blue-200 shadow-2xl animate-pulse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-24 h-24 bg-gray-300 rounded-full" />
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          <div className="h-3 bg-gray-300 rounded w-3/4" />
          <div className="flex gap-2">
            <div className="h-6 bg-gray-300 rounded w-20" />
            <div className="h-6 bg-gray-300 rounded w-24" />
          </div>
        </div>
      </div>
      <div className="h-3 bg-gray-300 rounded mb-2" />
      <div className="h-3 bg-gray-300 rounded mb-2" />
      <div className="h-3 bg-gray-300 rounded mb-6" />
      <div className="flex justify-center gap-4 mb-4">
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
        <div className="w-6 h-6 bg-gray-300 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <div className="h-4 bg-gray-300 rounded w-8 mx-auto" />
          <div className="h-3 bg-gray-300 rounded w-12 mx-auto" />
        </div>
        <div className="space-y-1">
          <div className="h-4 bg-gray-300 rounded w-8 mx-auto" />
          <div className="h-3 bg-gray-300 rounded w-12 mx-auto" />
        </div>
        <div className="space-y-1">
          <div className="h-4 bg-gray-300 rounded w-8 mx-auto" />
          <div className="h-3 bg-gray-300 rounded w-12 mx-auto" />
        </div>
      </div>
    </motion.div>
  );
};

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="w-full flex justify-center flex-wrap py-6 gap-6 bg-gradient-to-b from-white to-blue-50 min-h-screen">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
