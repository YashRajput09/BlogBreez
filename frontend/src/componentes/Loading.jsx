// Loading.jsx
import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 w-16 h-16"></div>
      <p className="ml-4 text-xl">Loading...</p>
    </div>
  );
};

export default Loading;
