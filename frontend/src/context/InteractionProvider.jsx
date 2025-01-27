import axios from 'axios';
import React, {createContext, useContext, useState} from 'react';

export const InteractionContext = createContext();

export const InteractionProvider = ({children}) => {
    const [likes, setLikes] = useState({});
    const [comments, setComments] = useState({});

    //Like  a blog  
    const blogLikes = async(blogId, userId) => {
        try {
            const { data } = await axios.post(
                 `${import.meta.env.VITE_APP_BACKEND_URL}/blog/${blogId}/likes`, 
                 {userId},
                 {withCredentials: true}
                );
                setLikes((prevLikes) => ({...prevLikes, [blogId]: data.likes}));
        } catch (error) {
            console.error("Error Liking the blog: ", error)
        }
    }

    // fetch comment for a blog
     const fetchComments = async(blogId) => {
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/blog/comments/${blogId}`);
            console.log("Comments: ", data);
            
            setComments((prevComments) => ({...prevComments, [blogId]: data}));
        } catch (error) {
            console.error("Error fetching comments: ", error)
            
        }
     }

    //  Add a comment to a blog
    const addComment = async(blogId, comment, userId) => {
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/blog/comment/${blogId}`, {comment, userId}, {withCredentials: true});
            console.log("Comment added: ", data);
            setComments((prevComments) => ({...prevComments, [blogId]: [...prevComments[blogId], data.newComment]}));
        }
        catch (error) {
            console.error("Error adding comment: ", error)
        }
    }   

    
    return (
        <InteractionContext.Provider
        value={{likes, blogLikes, comments, fetchComments, addComment}}  
        >
        {children}
    </InteractionContext.Provider>
);
};

export const useInteraction = () => useContext(InteractionContext);