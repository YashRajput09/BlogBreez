import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SubmitBtnLoader from "../loaders/SubmitBtnLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [education, setEducation] = useState("");
  const [role, setRole] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const changeProfileImageHandler = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const reader = new FileReader(); // object is created to read the contents of the file
    // console.log(reader);

    reader.readAsDataURL(file); //reads the file and converts it to a data URL (base64-encoded string). Used to display the image before it is uploaded
    reader.onload = () => {
      //triggered when the file reading is completed.
      setImagePreview(reader.result); //reader.result contains the data URL (the base64-encoded image).
      setProfileImage(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("mobileNumber", mobileNumber);
    formData.append("education", education);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);

    // }
    // console.log(formData);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/user/signup`,
        formData, //sending form data to /signup endpoint
        {
          withCredentials: true, // This option allows sending cookies and other credentials (like authorization tokens) along with the request.
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(data);
      toast.success("Welcome to BreezBlogs");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Error signing up");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center px-3">
      <div className="mx-auto max-w-md rounded-xl border shadow-lg px-4 py-10 my-10 text-gray-700 sm:w-[30rem]">
        <div className="flex justify-between mb-10">
          <span className="font-semibold text-blue-500 text-xl">
            BreezBlogs
          </span>
          <span>
            Have account?{" "}
            <Link
              to={"/login"}
              className="text-blue-600 hover:underline font-medium"
            >
              LogIn
            </Link>
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <select
            value={role}
            className="w-full border-b-2 mb-3 focus-within:border-blue-500 rounded-md p-2 px-4 focus:outline-none"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <div className="focus-within:border-b-blue-500 border-b-2 mb-3 rounded-md relative flex overflow-hidden transition">
            <input
              type="text"
              value={name}
              placeholder="Your Name"
              className=" w-full p-2 px-4  focus:outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="focus-within:border-b-blue-500 border-b-2 rounded-md relative flex overflow-hidden transition mb-3">
            <input
              type="email"
              value={email}
              placeholder="Email"
              className=" w-full p-2 px-4  focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="focus-within:border-b-blue-500 border-b-2 rounded-md relative flex overflow-hidden transition mb-3">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Create Password, minimum 8 character"
              className=" w-full p-2 px-4  focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-indigo-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="focus-within:border-b-blue-500 border-b-2 rounded-md relative flex overflow-hidden transition mb-3">
            <input
              type="number"
              value={mobileNumber}
              placeholder="Mobile Number"
              className=" w-full p-2 px-4  focus:outline-none"
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <div className="focus-within:border-b-blue-500 border-b-2 rounded-md relative flex overflow-hidden transition mb-3">
            <input
              type="text"
              value={education}
              placeholder="Education"
              className=" w-full p-2 px-4  focus:outline-none"
              onChange={(e) => setEducation(e.target.value)}
            />
          </div>

          <div iv className="flex ">
            <div className="w-12 h-14 rounded-full overflow-hidden profileImage">
              <img
                src={imagePreview ? `${imagePreview}` : "Image Preview"}
                alt="Img"
              />
            </div>

            <div className="focus-within:border-b-blue-500 border-b-2 rounded-md relative flex overflow-hidden transition mb-3">
              <input
                type="file"
                className="w-full p-2 px-4  focus:outline-none"
                onChange={changeProfileImageHandler}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 py-2 mt-5 rounded-md text-white"
          >
            {loading ? <SubmitBtnLoader /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
