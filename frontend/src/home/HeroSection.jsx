import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import InfinityLogo from "./InfinityLogo"; // Adjust the path accordingly
import toast from "react-hot-toast";
import { GiArchiveResearch } from "react-icons/gi";
import SearchBar from "../pages/SearchBar.jsx";

const HeroSection = () => {
  const { isAuthenticated, profile } = useAuth();
  const navigate = useNavigate();

  const handleStartWriting = () => {
    if (isAuthenticated && profile.role === "admin") {
      navigate("/dashboard")
    } else {
      navigate("/login");
      toast.error("Only admin can create a blog");
    }
  }

  return (
    // <section className="relative bg-gradient-to-b from-white to-gray-50 text-black min-h-screen flex flex-col justify-center items-center py-10 px-4 md:px-8">
    <section className="relative text-black min-h-screen flex flex-col justify-center items-center py-10 px-4 md:px-8">
      {/* Infinity Sign Animation */}
       <div className="absolute top-5">
        <InfinityLogo />
      </div>

     {/* Hero Content */}
     <div className="text-center">
       {/* Headline */}
       <h1 className="text-3xl md:text-5xl font-bold text-blue-600">
         BreezBlog: Unleashing Ideas, Stories, and Creativity
       </h1>
       {/* Subheadline */}
       <p className="mt-4 text-base md:text-lg text-gray-700">
          Discover, write, and share stories that matter. Join a thriving
          community of dreamers and doers.
        </p>
        {/* Call-to-Actions */}
        <div className="mt-6 flex justify-center space-x-4 flex-wrap">
         <Link
          // onClick={handleExploreBlog}
          to={'blogs'}
          className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition shadow mb-4 md:mb-0"
          >
        Explore Blogs
        </Link>
          <button
            // to={`/dashboard`}
            onClick={handleStartWriting}
            className="px-5 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition shadow"
            >
            Start Writing
          </button>
     </div>
     </div>
      {/* Interactive Search Bar */}
      {/* <div className="absolute bottom-28 md:bottom-28 w-full px-4">
       <div className="relative mx-auto max-w-2xl">
          <input
            type="text"
             placeholder="What inspires you today?"
             value={serarchQuery}
             onChange={(e) => setSerarchQuery(e.target.value)}
          className="w-full py-3 px-5 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none shadow text-sm"
           />
         <button
         onClick={handleSearch}
         className="absolute flex items-center gap-1 right-1 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition shadow">
           Search <GiArchiveResearch />
         </button>
       </div>
     </div> */}
     <SearchBar />
     {/* <SearchBlogs results={searchResults}/>   //fix this  */}

      {/* Testimonial Section */}
      <div className="absolute bottom-4 md:bottom-7 w-full flex justify-center px-4">
        <div className="bg-gray-100 text-black px-5 py-2 rounded-full shadow-md flex items-center space-x-2">
          <span className="font-medium text-blue-600">
            "BreezBlog transformed my blogging journey!"
         </span>
         <span>- Yash R.</span>
       </div>
     </div>

      <div className="mt-6 text-gray-600 text-center">
         <p>📖 Over 10,000 blogs shared • 🌟 5,000+ writers onboard</p>
       </div>
     </section>
   );
 };

 export default HeroSection;
