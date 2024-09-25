import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext(); //creates a context to that manage authenticated data (blog Info) golbally.

// context provider component
export const AuthProvider = ({ children }) => {  // takes {children} as a props, (means wraped with provider will be consider its children).
  const [blogs, setBlogs] = useState(); // manage the blogs state, initialy blogs is undefined.
  useEffect(() => { 
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(     //fetch Blogs using axios 
          "http://localhost:3000/blog/all-blogs"
        );
        setBlogs(data); // store the data in the state, using setBlogs().
        console.log(data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []); // '[]' indicates useEffect will run only once after component mounts.
  return (
    <AuthContext.Provider value={{ blogs }}>{children}</AuthContext.Provider> // provides the data to the childrean via the value prop
  );
};

export const useAuth = () => useContext(AuthContext); // use the data 