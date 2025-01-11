import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/user/resetpassword`, {
        email,
        otp,
        newPassword,
      });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage('Error resetting password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-t from-slate-50 via-blue-700 to-white backdrop-blur-md overflow-hidden">
      <motion.div
        className="relative z-10 bg-white/10 border border-white/10 rounded-lg p-8 max-w-md w-full shadow-2xl"
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
          Reset Password
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
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="otp" className="text-sm text-gray-300">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 px-4 py-2 bg-transparent border border-white-400 rounded-md text-white placeholder-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="newPassword" className="text-sm text-gray-300">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 px-4 py-2 bg-transparent border border-white-400 rounded-md text-white placeholder-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-br from-blue-900 text-white font-bold rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
  