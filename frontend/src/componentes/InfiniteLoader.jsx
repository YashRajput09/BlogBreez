import React from "react";
// import "./Loader.css"; // Custom CSS for animations

const InfiniteLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* <p className="text-xl font-bold">5</p> */}
      <div className="absolute scale-75 loader-5">
        <svg
          viewBox="0 0 187.3 93.7"
        //   height={200}
          width={1500}
          className="svgbox"
        >
          <defs>
            <linearGradient y2="0%" x2="100%" y1="0%" x1="0%" id="gradient">
              {/* <stop stopColor="#8f44fd" offset="0%" /> */}
              <stop stopColor="#2563eb" offset="0%" />
              <stop stopColor="#fd44db" offset="100%" />
            </linearGradient>
          </defs>
          <path
            stroke="url(#gradient)"
            d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default InfiniteLoader;
