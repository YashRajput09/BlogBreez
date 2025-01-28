import React, { useState, useEffect } from 'react';
import { useInteraction } from '../../context/InteractionProvider';
import { useAuth } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
import { MessageCircle } from 'lucide-react';

const CommentButton = ({ blogId }) => {
  const { profile } = useAuth();
  const { comments, fetchComments, addComment, editComment, deleteComment } = useInteraction();
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  useEffect(() => {
    if (showComments) fetchComments(blogId);
  }, [blogId, showComments]);

  const handleAddComment = async () => {
    if (!profile) {
      return toast.error('Please login to comment.');
    }
    if (newComment.trim() === '') {
      return toast.error('Comment cannot be empty!');
    }
    await addComment(blogId, newComment, profile._id);
    setNewComment('');
    toast.success('Comment added successfully!');
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId, blogId);
    toast.success('Comment deleted successfully!');
  };

  const handleEditComment = async (commentId) => {
    if (editedComment.trim() === '') {
      return toast.error('Comment cannot be empty!');
    }
    await editComment(commentId, editedComment, blogId);
    setEditingCommentId(null);
    setEditedComment('');
    toast.success('Comment updated successfully!');
  };

  const renderComments = () => {
    const commentsList = Array.isArray(comments[blogId]) ? comments[blogId] : [];
    
    return (
      <div className="mt-4">
        {commentsList.length > 0 ? (
          commentsList.map((comment) => (
            <div key={comment._id} className="p-2 border-b border-gray-200">
              <p className="font-medium text-gray-700">
                {`${comment?.userId?.name || 'Unknown'}:`}
              </p>

              {editingCommentId === comment._id ? (
                <div>
                  <textarea
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                  ></textarea>
                  <button
                    onClick={() => handleEditComment(comment._id)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Save Edit
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  {/* Handle both content/comment field names */}
                  <p>{ comment?.comment || 'No content'}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                  <button
                    className="pr-3 text-blue-400"
                    onClick={() => {
                      setEditingCommentId(comment._id);
                      setEditedComment(comment.comment || '');
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-400"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <div
        onClick={() => setShowComments(!showComments)}
        className="cursor-pointer flex items-center gap-2 text-gray-500 hover:text-blue-700"
      >
        <MessageCircle size={18} />
      </div>

      {showComments && (
        <div
          className="absolute top-10 -left-20 w-96 p-4 bg-white border rounded-lg shadow-md z-50"
          style={{ maxHeight: '400px', overflowY: 'auto' }}
        >
          <h2 className="text-lg font-semibold">Comments</h2>

          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full p-2 border rounded-md"
              rows={3}
            ></textarea>
            <button
              onClick={handleAddComment}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Comment
            </button>
          </div>

          {renderComments()}
        </div>
      )}
    </div>
  );
};

export default CommentButton;