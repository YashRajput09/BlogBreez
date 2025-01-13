import React, { useState } from "react";
import { GiArchiveResearch } from "react-icons/gi";
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); 

  const handleSearch = () => {
    // onSearch(searchQuery); //pass the query to the parent
    if (searchQuery.trim()) {
    navigate(`/api/search?search=${searchQuery}`);
    }
  };

  return (
    <div className="absolute bottom-28 md:bottom-28 w-full px-4">
      <div className="relative mx-auto max-w-2xl">
      <form
        className="flex items-center space-x-2"
        onSubmit={handleSearch} // Handle the form submission
      >
        <input
          type="text"
          placeholder="What inspires you today?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 px-5 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none shadow text-sm"
        />
        <button
        type="submit"
        //   onClick={handleSearch}
          className="absolute flex items-center gap-1 right-1 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition shadow"
        >
          Search <GiArchiveResearch />
        </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
