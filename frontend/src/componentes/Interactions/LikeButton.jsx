import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeButton = ({ initialLiked = false, initialCount = 0 }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => liked ? prev - 1 : prev + 1);
  };

  return (
    <button onClick={handleLike} className="flex items-center gap-1 transition duration-200">
      {liked ? (
        <FaHeart className="text-red-500 text-xl transition-all duration-300" />
      ) : (
        <FaRegHeart className="text-gray-400 text-xl hover:text-red-400 transition-all duration-300" />
      )}
      <span className="text-sm">{likeCount}</span>
    </button>
  );
};

export default LikeButton;
