import axios from "axios";
import React, { createContext, useContext, useState } from "react";

export const InteractionContext = createContext();

export const InteractionProvider = ({ children }) => {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  //Like  a blog
  const blogLikes = async (blogId, userId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/blog/${blogId}/likes`,
        { userId },
        { withCredentials: true }
      );
      setLikes((prevLikes) => ({ ...prevLikes, [blogId]: data.likes }));
    } catch (error) {
      console.error("Error Liking the blog: ", error);
    }
  };

  // fetch comment for a blog
  const fetchComments = async (blogId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/blog/comments/${blogId}`
      );
      console.log("Comments: ", data);

      setComments((prevComments) => ({ ...prevComments, [blogId]: data }));
    } catch (error) {
      console.error("Error fetching comments: ", error);
    }
  };

  //  Add a comment to a blog
  const addComment = async (blogId, comment, userId, parentCommentId = null) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/blog/comment/${blogId}`,
        { comment, userId, parentCommentId },
        { withCredentials: true }
      );
      console.log("Comment added: ", data);
      setComments((prevComments) => ({
        ...prevComments,
        [blogId]: [...(prevComments[blogId] || []), data.newComment],
      }));
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  //edit comment
  const editComment = async (commentId, comment, blogId) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BACKEND_URL}/blog/comment/${commentId}`,
        { comment },
        { withCredentials: true }
      );
      console.log("Comment updated: ", data);
      setComments((prevComments) => {
        const updatedComments = { ...prevComments };
      
        // Ensure the blogId exists and is an array
        if (!updatedComments[blogId] || !Array.isArray(updatedComments[blogId])) {
          console.error("Invalid blogId or comments array");
          return prevComments;
        }
      
        // Update the specific comment
        updatedComments[blogId] = updatedComments[blogId].map((c) =>
          c._id === commentId
            ? { ...c, comment: comment } // Replace with updated comment
            : c
        );
      
        return updatedComments;
      });
    } catch (error) {
      console.error("Error updating comment: ", error);
    }
  };

  //delete comment
  const deleteComment = async (commentId, blogId) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BACKEND_URL}/blog/comment/${commentId}`,
        { withCredentials: true }
      );
      console.log("Comment deleted: ", data);
      setComments((prevComments) => ({
        ...prevComments,
        [blogId]: prevComments[blogId]?.filter(
          (comment) => comment._id !== commentId
        ),
      }));
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };
  return (
    <InteractionContext.Provider
      value={{
        likes,
        blogLikes,
        comments,
        fetchComments,
        addComment,
        editComment,
        deleteComment,
      }}
    >
      {children}
    </InteractionContext.Provider>
  );
};

export const useInteraction = () => useContext(InteractionContext);
