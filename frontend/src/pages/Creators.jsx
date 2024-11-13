import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Creators = () => {
  const [creator, setCreator] = useState([]);

  useEffect(() => {
    const fetchCreatorsDetails = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/user/admins", {
          withCredentials: true,
        });
        console.log("creators data: ", data);
        setCreator(data);
      } catch (error) {
        console.error("Error fetching creators data:", error);
      }
    };
    fetchCreatorsDetails();
  }, []);

  const renderCreatorCard = (item) => (
    <div key={item._id} className='flex flex-col items-center rounded-lg shadow-lg overflow-hidden group'>
      <div className='w-72 h-52 md:w-60 md:h-36 relative flex justify-center'>
        <img
          className='w-full h-full bg-black object-cover'
          src={item?.profileImage?.url || "/default-image.jpg"}
          alt="profile"
        />
        <div className='absolute -bottom-7 w-16 h-16 rounded-full bg-yellow-400 overflow-hidden border-2 group-hover:rounded-md group-hover:-bottom-9 duration-500 ease-in-out'>
          <img
            className='bg-red-300 w-full h-full'
            src={item?.profileImage?.url || "/default-avatar.jpg"}
            alt="avatar"
          />
        </div>
      </div>

      <div className='pt-10 text-center'>
        <h1 className='font-bold capitalize'>{item?.name || "Anonymous"}</h1>
        <p className='font-semibold text-slate-600'>{item?.email || "No Email Available"}</p>
        <div className='flex space-x-12 py-2'>
          <p className='text-gray-500 text-sm'>{item?.mobileNumber || "No Number"}</p>
          <p className='text-gray-500 text-sm'>{item?.education || "No Education Info"}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className='w-full flex justify-center flex-wrap py-4 gap-5'>
      {creator.length > 0 ? (
        creator.map(renderCreatorCard)
      ) : (
        <p>No creators found</p>
      )}
    </div>
  );
};

export default Creators;
