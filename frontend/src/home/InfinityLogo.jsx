import React from "react";
import "./HeroSection.css"

const InfinityLogo = () => {
  return (
    <div className="relative w-96 h-40">
      {/* Infinity Shape */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 200 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50,50 C50,25 75,25 100,50 C125,75 150,75 150,50 C150,25 125,25 100,50 C75,75 50,75 50,50 Z"
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            strokeLinecap="round"
            className="infinity-path"
          />
        </svg>
      </div>
    </div>
  );
};

export default InfinityLogo;
