import React from 'react';
import { useAuth } from '../context/AuthProvider.jsx';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Trending = () => {
  const { blogs } = useAuth();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  // console.log("Hero : ", blogs);

  if (!blogs || blogs.length === 0) return <div />;

  return (
    <div className='md:mx-10 px-5 p-5  my-5 mb-5'>
      <h1 className='text-2xl font-bold m-2'>Tranding</h1>
      <Carousel responsive={responsive}>
      {blogs.map(({ _id, blogImage, title, adminImage, adminName }) => (
        <Link 
          to="/" 
          key={_id} 
          className='shadow-xl rounded-lg overflow-hidden transform hover:scale-105 duration-300 transition-transform flex flex-col  m-2'
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
      </Carousel>
    </div>
  );
};


export default Trending;