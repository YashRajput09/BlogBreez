// ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/user/forgotpassword`, { email });
      // console.log(response);
      setMessage(response.data.message);
      window.location.pathname = '/user/resetpassword';
    } catch (error) {
      setMessage('Error sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-t from-slate-50 via-blue-700 to-white  backdrop-blur-md overflow-hidden">
      {/* Animated Background */}
      {/* <div className="absolute inset-0 animate-breezblogs">
        <div className="absolute w-72 h-72 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 rounded-full blur-2xl animate-move1"></div>
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 rounded-full blur-3xl animate-move2"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-blue-700 to-green-500 opacity-20 rounded-full blur-2xl animate-move3"></div>
      </div> */}

      {/* Form Container */}
      <motion.div
        className="relative z-10 bg-white/10  border border-white/10 rounded-lg p-8 max-w-md w-full shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl font-bold text-center text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Forgot Password
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 px-4 py-2 bg-transparent border border-white-400 rounded-md text-white placeholder-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-br from-blue-900 text-white font-bold rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </motion.button>
        </form>
        {message && (
          <motion.p
            className={`mt-4 text-center text-base font-semibold ${
              message.includes('Error') ? 'text-red-700' : 'text-green-700'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
