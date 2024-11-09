import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MyProfile = () => {
  const [creator, setCreator] = useState([]);

  useEffect(() => {
    const fetchCreatorsDetails = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/user/myprofile", {
          withCredentials: true,
        });
        // console.log("creators data: ", data);
        setCreator(data);
      } catch (error) {
        console.error("Error fetching creators data:", error);
      }
    };
    fetchCreatorsDetails();
  }, []);

  return (
    <div className='w-full h-screen flex justify-center items-center flex-wrap py-4 gap-5'>
      <div key={creator._id} className='flex flex-col creators-center rounded-lg shadow-lg overflow-hidden group'>
      <div className='w-72 h-52 md:w-52 md:h-28 relative flex justify-center'>
        <img
          className='w-full h-full bg-black object-cover'
          src={creator?.profileImage?.url || "/default-image.jpg"}
          alt="profile"
        />
        <div className='absolute -bottom-7 w-14 h-14 rounded-full bg-yellow-400 overflow-hidden border-2 group-hover:rounded-md group-hover:-bottom-9 duration-500 ease-in-out'>
          <img
            className='bg-red-300 w-full h-full'
            src={creator?.profileImage?.url || "/default-avatar.jpg"}
            alt="avatar"
          />
        </div>
      </div>

      <div className='pt-10 text-center'>
        <h1 className='font-bold capitalize'>{creator?.name || "Anonymous"}</h1>
        <p className='font-semibold text-slate-600'>{creator?.email || "No Email Available"}</p>
        <div className='flex justify-around py-2'>
          <p className='text-gray-500 text-sm'>{creator?.mobileNumber || "No Number"}</p>
          <p className='text-gray-500 text-sm'>{creator?.education || "No Education Info"}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyProfile;
