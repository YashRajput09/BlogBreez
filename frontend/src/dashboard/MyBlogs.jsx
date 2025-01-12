import axios from 'axios';
import {useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loader from '../componentes/Loading';
import { useNavigate } from 'react-router-dom';
import EmptyBlog from './EmptyBlog';

const MyBlogs = ({ setComponent }) => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  useEffect( ()=>{
    const fetchBlogs = async()=>{

    try {
      const {data} = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/blog/myblogs`,{
        withCredentials: true
      }
    )
      // console.log(data);
      setMyBlogs(data);
      setLoader(false);
      
    } catch (error) {
      console.log(error);
    }
  }
fetchBlogs();
  }, [])

  if (loader) {
    return <Loader/>
  }

  const handleDelete= async(id) =>{
    try{
    const {data} = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/blog/delete/${id}`,
      {
        withCredentials: true,
      }
    )
    
      toast.success("Bloge deleted successfully");
      setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      navigate('/dashboard');
    }
   catch(error){
    console.log(error);
      toast.error("Faild to delete blog");
    }
  }

  // if (!myBlogs || myBlogs.length === 0) return <div />;
  return (
    <div className='md:mx-10 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-5 gap-4 p-5 my-8 md:my-5 md:ml-60 '>
    {
    myBlogs && myBlogs.length > 0 ? (
       myBlogs.map(({ _id, blogImage, title, category }) => (
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
        <div className=' space-y-2 p-4'>
          <div>
            <p className='text-xs text-gray-400'>{category}</p>
          </div>
          <div className='flex justify-between text-xs text-white'>
          <Link to={`/blog/update/${_id}`} className='border-2 rounded-md px-3 py-1 bg-blue-400 hover:bg-blue-600  duration-300 ease-in-out'>Update</Link>
          <button onClick={(e) => handleDelete(_id)}  className='border-2 rounded-md px-3 py-1 bg-red-400 hover:bg-red-600  duration-300 ease-in-out'>Delete</button>
          </div>
        </div>
      </Link>
    ))) : (
      <div className="absolute top-0 right-0 min-w-full z-0">
        <p className='text-center text-gray-500 '>
       <EmptyBlog setComponent={setComponent} />
      </p>
      </div>
    )
  }
  </div>
  )

}

export default MyBlogs;