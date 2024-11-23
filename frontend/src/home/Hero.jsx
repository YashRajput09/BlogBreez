import React from 'react';
import { useAuth } from '../context/AuthProvider.jsx';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { blogs } = useAuth();
  // console.log("Hero : ", blogs);

  if (!blogs || blogs.length === 0) return <div />;

  return (
    <div  className=" md:mx-10 px-7">
      <h1 className="text-2xl font-semibold ">Daily Blogs</h1>
    <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4'>
      {blogs.slice(0, 4).map(({ _id, blogImage, title, adminImage, adminName }) => (
        <Link 
          to={`/blog/view/${_id}`} 
          key={_id} 
          className='shadow-xl rounded-lg overflow-hidden transform hover:scale-105 duration-300 transition-transform'
        >
          <div className='group relative'>
            <img 
              src={blogImage.url} 
              className='w-full h-56 object-cover' 
              alt="Blog" 
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-25 group-hover:opacity-75 transition-transform duration-300'></div>
            <h1 className='absolute bottom-4 text-white tracking-tight left-4 md:text-xl font-semibold group-hover:text-gray-300 duration-300 group-hover:tracking-wider'>
              {title}
            </h1>
          </div>
          <div className='flex gap-4 p-5'>
            <img 
              src={adminImage} 
              className='w-12 h-12 rounded-full border-2 border-blue-400' 
              alt="Admin" 
            />
            <div>
              <p className='font-semibold uppercase text-lg'>
                {adminName || "Unknown"}
              </p>
              <p className='text-xs text-gray-400'>Rajput</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default Hero;
