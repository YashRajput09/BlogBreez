// import React from 'react';
import { PiPhoneCallFill } from "react-icons/pi";
import { CgMail } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formData = {
      access_key: import.meta.env.VITE_APP_ACCESS_KEY,
      name: data.username,
      email: data.email,
      message: data.message,
    };
    try {
        await axios.post(
        "https://api.web3forms.com/submit",
        formData
      );
      toast.success("Details sent successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Error sending details.");
    }
  };
  return (
    <>
      <div className="flex justify-center py-5">
        <div className="w-11/12 md:w-auto flex flex-col rounded-lg  px-2 py-5 shadow-lg bg-white">
          <div className="flex flex-col">
            <h1 className="font-semibold text-xl p-2 text-indigo-600 animate-pulse">
              Get In Touch
            </h1>
            <div className="grid grid-cols-1 gap-2 md:flex md:space-x-3 p-4">
              {[
                {
                  text: "+91 1234567890",
                  rotate: "rotate-2",
                  icon: <PiPhoneCallFill />,
                },
                {
                  text: "breezblogs@gmail.com",
                  rotate: "-rotate-2",
                  icon: <CgMail />,
                },
                {
                  text: "Crystal IT-Park Indore",
                  rotate: "rotate-3",
                  icon: <FaLocationDot />,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-center items-center w-44 px-3 py-2 rounded-full shadow-xl bg-blue-400 hover:scale-105 duration-300 ease-in-out ${item.rotate} space-y-8`}
                >
                  <span className="text-white text-xs">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-xl p-2">Contact Us</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col items-center gap-5"
            >
              <div className="flex flex-col w-5/6 gap-4 ">
                <input
                  name="username"
                  {...register("username", { required: true })}
                  type="text"
                  className="w-full bg-transparent border-b-2 px-3 py-2 appearance-none rounded-md outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                  placeholder="Your Name"
                />
                {errors.username && (
                  <span className="text-sm text-red-600 font-semibold px-1">
                    Please enter name.
                  </span>
                )}

                <input
                  name="email"
                  {...register("email", { required: true })}
                  type="text"
                  className="w-full bg-transparent border-b-2 px-3 py-2 appearance-none rounded-md outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                  placeholder="Your Email"
                />
                {errors.email && (
                  <span className="text-sm text-red-600 font-semibold px-1">
                    Please enter email.
                  </span>
                )}
                {/* <div> */}
                <h1 className="text-gray-500 text-sm p-2">Add your comment</h1>
                <textarea
                  name="message"
                  {...register("message", { required: true })}
                  className="border-2 rounded-md w-full h-32 bg-transparent text-sm p-2 outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                  placeholder="......"
                ></textarea>
                {errors.message && (
                  <span className="text-sm text-red-600 font-semibold px-1">
                    Please write a message.
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-5/6 bg-blue-400 hover:bg-blue-500 duration-300 text-white px-4 py-2 rounded-md text-sm md:text-base"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
