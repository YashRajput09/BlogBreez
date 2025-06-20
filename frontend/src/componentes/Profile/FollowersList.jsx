import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";


const FollowerModal = ({ isOpen, onClose, type, users }) => {
  const [search, setSearch] = useState("");

  const list = users?.user?.[type.toLowerCase()] || [];
  console.log(type.toLowerCase());

  const filteredUsers = list.filter((user) =>
    user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-white/40 rounded-md backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-in Modal from Right */}
          <motion.div
            className="fixed top-0 right-0  md:h-2/5 w-full max-w-md bg-white rounded-md z-50 shadow-xl px-6 pt-3 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title & Close */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold ">{type}</h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-blue-500 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-1 mb-3 border border-gray-300 rounded-md focus:outline-none text-sm text-gray-500"
            />

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {filteredUsers.map((user, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 border-b pb-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {user.profileImage.url ? (
                      <img
                        src={user.profileImage.url}
                        alt="profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="text-2xl text-gray-500" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-black">
                      {user.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {user.bio || "Webdeveloper | Blogger | Educator"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FollowerModal;
