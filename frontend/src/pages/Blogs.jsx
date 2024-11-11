import React from 'react';
import { useAuth } from '../context/AuthProvider.jsx';
import { Link } from 'react-router-dom';
// import 'react-multi-carousel/lib/styles.css';

const Blogs = () => {
  const { blogs } = useAuth();

  if (!blogs || blogs.length === 0) return <div />;
  // const blogs = blogs?.filter((blog) => blog.category === "Devotional");

  return (
    <div className='md:mx-10 px-1 my-5 mb-5'>
      <h1 className='text-2xl font-bold m-2'>All Blogs</h1>
      <div className="flex justify-center m-2">
        <h2>The concept of god varies widely accross different cultures, religions and belief systems.</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0">
      {blogs.map(({ _id, blogImage, title }) => (
        <Link 
          to={`/blog/view/${_id}`} 
          key={_id} 
          className='shadow-xl rounded-lg overflow-hidden transform hover:scale-105 duration-300 transition-transform flex flex-col  m-2'
        >
          <div className='group relative'>
            <img 
              src={blogImage.url} 
              className='w-full h-48 object-cover' 
              alt="Blog" 
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-25 group-hover:opacity-75 transition-transform duration-300'></div>
            <h1 className='absolute bottom-2 text-white tracking-tight left-2 md:text-md font-medium group-hover:text-gray-300 duration-300 group-hover:tracking-wider'>
              {title}
            </h1>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
};


export default Blogs;