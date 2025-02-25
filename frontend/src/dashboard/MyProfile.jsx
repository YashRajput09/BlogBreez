import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const [creator, setCreator] = useState([]);
  console.log(
    "import.meta.env.VITE_APP_BACKEND_URL",
    import.meta.env.VITE_APP_BACKEND_URL
  );
  useEffect(() => {
    const fetchCreatorsDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/user/myprofile`,
          {
            withCredentials: true,
          }
        );
        // console.log("creators data: ", data);
        setCreator(data);
      } catch (error) {
        console.error("Error fetching creators data:", error);
      }
    };
    fetchCreatorsDetails();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center flex-wrap py-4 gap-5 overflow-hidden">
      <div
        key={creator._id}
        className="m-2 flex flex-col creators-center rounded-lg shadow-lg overflow-hidden group"
      >
        <div className="w-80 h-52 md:w-72 md:h-36 relative flex justify-center">
          <img
            className="w-full h-full bg-black object-cover"
            src={creator?.profileImage?.url || "/default-image.jpg"}
            alt="profile"
          />
          <div className="absolute -bottom-7 w-16 h-16 rounded-full bg-yellow-400 overflow-hidden border-2 group-hover:rounded-md group-hover:-bottom-9 duration-500 ease-in-out">
            <img
              className="bg-red-300 w-full h-full"
              src={creator?.profileImage?.url || "/default-avatar.jpg"}
              alt="avatar"
            />
          </div>
        </div>

        <div className="pt-10 text-center ">
          <h1 className="font-bold capitalize">
            {creator?.name || "Anonymous"}
          </h1>
          <p className="font-semibold text-slate-600">
            {creator?.email || "No Email Available"}
          </p>
          <div className="flex justify-around py-2">
            <p className="text-gray-500 text-sm">
              {creator?.mobileNumber || "No Number"}
            </p>
            <p className="text-gray-500 text-sm">
              {creator?.education || "No Education Info"}
            </p>
          </div>
        </div>

        <Link
          to={`/user/update/admin/profile/${creator._id}`}
          className="border-2 rounded-lg py-1 m-2 bg-blue-400 hover:bg-blue-500  duration-300 ease-in-out text-white text-center"
        >
          Update
        </Link>
        <Link
          to={`/user/forgotpassword`}
          className="cursor-pointer text-center mb-2 text-indigo-500 no-underline hover:text-indigo-500"
        >
          <small>Change Password</small>
        </Link>
      </div>
    </div>
  );
};

export default MyProfile;
