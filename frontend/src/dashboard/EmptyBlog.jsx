import React from 'react';
import { Link } from 'react-router-dom';

const EmptyBlog = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-white h-screen shadow-inner ">
      <img
        src="https://cdn.dribbble.com/users/887568/screenshots/3172047/ufo.gif"
        alt="Empty log page"
        className="w-96 h-auto"
      />
      <h1 className="text-3xl font-bold mt-4 font-mono">Look like you do not creat BLogs Yet.</h1>
      {/* <p className="text-lg text-gray-600 mt-2 font-mono">
       The page you are looking for not available
      </p> */}
      <Link to={'/'} className='bg-green-600 px-3 py-2 text-white m-5'>Go to Home</Link>
    </div>
  );
};

export default EmptyBlog;
