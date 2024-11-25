import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if(!role || !email || !password){
      return toast.error("Please fill all the fields");
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/user/login`,
        { role, email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(data);
      toast.success("Loggedin successfully");
      setRole("");
      setEmail("");
      setPassword("");
      window.location.pathname = "/";
    } catch (error) {
      console.log(error);
      toast.error("role || email || password is incorrect")
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center text-gray-600 bg-gray-50 relative">
      <div className="relative">
        {/* Dot on the top-left */}
        <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute z-0 -left-20 -top-20">
          <svg
            id="patternId"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="a"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="scale(0.6) rotate(0)"
              >
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  strokeWidth="1"
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="800%"
              height="800%"
              transform="translate(0,0)"
              fill="url(#a)"
            />
          </svg>
        </div>
        {/* Dot on the bottom-right */}
        <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute z-0 -right-20 -bottom-16">
          <svg
            id="patternId"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="b"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="scale(0.5) rotate(0)"
              >
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  strokeWidth="1"
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="800%"
              height="800%"
              transform="translate(0,0)"
              fill="url(#b)"
            />
          </svg>
        </div>

        {/* Login Form */}
        <div className="md:mt-20 relative z-10 flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            {/* Logo */}
            <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
              <a
                href="#"
                className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500"
              >
                <span className="flex-shrink-0 text-3xl font-semibold tracking-tight opacity-100">
                  BreezBlogs
                </span>
              </a>
            </div>
            {/* /Logo */}
            <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">
              Welcome to BreezBlogs!
            </h4>
            <p className="mb-6 text-gray-500">
              Please log-in to access your account
            </p>

            <form onSubmit={handleLoginSubmit} className="mb-4">
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                >
                  Select Role
                </label>

                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full border rounded-md border-gray-400 py-2 px-3 text-sm text-gray-400 bg-gray-100 outline-none focus:border-indigo-500
                focus:bg-white focus:text-gray-600 focus:shadow"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg-gray-100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                  id="email"
                  name="email-username"
                  placeholder="Enter your email"
                  autoFocus=""
                />
              </div>
              <div className="mb-4">
                <div className="flex justify-between">
                  <label
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    href="auth-forgot-password-basic.html"
                    className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"
                  >
                    <small>Forgot Password?</small>
                  </a>
                </div>
                <div className="relative flex w-full flex-wrap items-stretch">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg-gray-100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    name="password"
                    placeholder="············"
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="block">
                  <input
                    className="mt-1 mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-indigo-500 focus:border-indigo-500 focus:shadow"
                    type="checkbox"
                    id="remember-me"
                  />
                  <label className="inline-block" htmlFor="remember-me">
                    {" "}
                    Remember Me{" "}
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <button
                  className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                  type="submit"
                >
                  Log in
                </button>
              </div>
            </form>

            <p className="mb-4 text-center">
              New on BreezBlogs?
              <a
                href="/signup"
                className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"
              >
                {" "}
                Create an account{" "}
              </a>
            </p>
          </div>
        </div>
        {/* /Login Form */}
      </div>
    </div>
  );
};

export default Login;
