import axios from 'axios';
import React, {createContext, useContext, useState} from 'react';

export const InteractionContext = createContext();

export const InteractionProvider = ({children}) => {
    const [likes, setLikes] = useState({});

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
    
    return (
        <InteractionContext.Provider
        value={{likes, blogLikes}}
        >
        {children}
    </InteractionContext.Provider>
);
};

export const useInteraction = () => useContext(InteractionContext);