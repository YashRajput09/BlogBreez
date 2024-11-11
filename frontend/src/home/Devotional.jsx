import React from 'react';
import { useAuth } from '../context/AuthProvider.jsx';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Devotional = () => {
  const { blogs } = useAuth();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6 
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
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotional");

  return (
    <div className='md:mx-10 px-5 my-5 mb-5'>
      <h1 className='text-2xl font-bold m-2'>Devotional</h1>
      <div className="flex justify-center m-2">
        <h2>The concept of god varies widely accross different cultures, religions and belief systems.</h2>
      </div>
      <Carousel responsive={responsive}>
      {devotionalBlogs.map(({ _id, blogImage, title }) => (
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
      </Carousel>
    </div>
  );
};


export default Devotional;