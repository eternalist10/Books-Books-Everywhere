import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <div className="relative w-[300px] my-2 md:ml-4 ml-2">
      <input
        type="text"
        placeholder="Search for books..."
        className="p-2 px-3 border border-gray-300 rounded-full shadow-xl w-full"
        value={value}
        onChange={onChange}
      />
      <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
  );
};

export default Search;
