import React, { useState, useEffect } from "react";
import { useInteraction } from "../../context/InteractionProvider";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import { MessageCircle } from "lucide-react";

const CommentButton = ({ blogId }) => {
  const { profile } = useAuth();
  const { comments, fetchComments, addComment, editComment, deleteComment } =
    useInteraction();
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [visibleReplies, setVisibleReplies] = useState({});

  useEffect(() => {
    if (showComments) fetchComments(blogId);
  }, [blogId, showComments]);

  // Structure comments into nested hierarchy
  const structureComments = (comments) => {
    const commentMap = {};
    const rootComments = [];

    comments.forEach((comment) => {
      commentMap[comment._id] = {
        ...(comment.toObject ? comment.toObject() : comment),
        replies: [],
      };
    });

    comments.forEach((comment) => {
      if (comment.parentCommentId) {
        const parent = commentMap[comment.parentCommentId];
        parent?.replies.push(commentMap[comment._id]);
      } else {
        rootComments.push(commentMap[comment._id]);
      }
    });

    return rootComments;
  };

  const handleAddReply = async (parentCommentId) => {
    if (!profile) return toast.error("Please login to comment.");
    if (!replyText.trim()) return toast.error("Reply cannot be empty!");

    await addComment(blogId, replyText, profile._id, parentCommentId);
    setReplyText("");
    setActiveReplyId(null);
    toast.success("Reply added!");
  };

  const handleAddComment = async () => {
    if (!profile) {
      return toast.error("Please login to comment.");
    }
    if (newComment.trim() === "") {
      return toast.error("Comment cannot be empty!");
    }
    await addComment(blogId, newComment, profile._id);
    setNewComment("");
    toast.success("Comment added successfully!");
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId, blogId);
    toast.success("Comment deleted successfully!");
  };

  const handleEditComment = async (commentId) => {
    if (editedComment.trim() === "") {
      return toast.error("Comment cannot be empty!");
    }
    await editComment(commentId, editedComment, blogId);
    setEditingCommentId(null);
    setEditedComment("");
    toast.success("Comment updated successfully!");
  };

  const renderComment = (comment, depth = 0) => {
    const currentVisible = visibleReplies[comment._id] || 0;
    const displayedReplies = comment.replies.slice(0, currentVisible);
    const hasMore = comment.replies.length > currentVisible;

    return (
      <div key={comment._id} className="ml-4 border-l-2 border-gray-200 pl-4">
        <div className="p-2 mb-2">
          <p className="font-medium text-gray-700">
            @{comment?.userId?.name || "Unknown"}
          </p>
          {editingCommentId === comment._id ? (
            <div>
              <textarea
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="w-full p-2 border rounded-md mt-1"
                rows={3}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEditComment(comment._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingCommentId(null)}
                  className="px-3 py-1 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-800">{comment.comment}</p>
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
            
                {comment?.userId?._id === profile?._id && (
                  <>
                    <button
                      className="text-blue-500 text-sm"
                      onClick={() => {
                        setEditingCommentId(comment._id);
                        setEditedComment(comment.comment);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => deleteComment(comment._id, blogId)}
                    >
                      Delete
                    </button>
                  </>
                )}

                <button
                  className="text-green-500 text-sm"
                  onClick={() => setActiveReplyId(comment._id)}
                >
                  Reply
                </button>
              </div>
            </div>
          )}

          {activeReplyId === comment._id && (
            <div className="mt-2">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Write your reply..."
                rows={2}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleAddReply(comment._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Post Reply
                </button>
                <button
                  onClick={() => setActiveReplyId(null)}
                  className="px-3 py-1 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* {comment.replies?.length > 0 && (
          <div className="mt-2">
            {comment.replies.map(reply => renderComment(reply, depth + 1))}
          </div>
        )} */}

          {displayedReplies.length > 0 && (
            <div className="mt-2">
              {displayedReplies.map((reply) => renderComment(reply, depth + 1))}
            </div>
          )}

          {hasMore && (
            <button
              onClick={() =>
                setVisibleReplies((prev) => ({
                  ...prev,
                  [comment._id]: (prev[comment._id] || 2) + 2,
                }))
              }
              className="text-blue-500 text-sm mt-1 hover:text-blue-600"
            >
              Show replies
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowComments(!showComments)}
        className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
      >
        <MessageCircle size={18} />
        {/* <span>Comments</span> */}
      </button>

      {showComments && (
        <div className="absolute top-8 -left-16 w-80 md:w-80 bg-white border rounded-lg shadow-lg p-4 z-50">
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Write a comment..."
              rows={3}
            />
            <button
              onClick={() => {
                if (!profile) return toast.error("Login required");
                addComment(blogId, newComment, profile._id);
                setNewComment("");
              }}
              className="mt-2 px-4 py-2 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              Post Comment
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {structureComments(comments[blogId] || []).length > 0 ? (
              structureComments(comments[blogId] || []).map(renderComment)
            ) : (
              <p className="text-gray-500">No comments yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentButton;
