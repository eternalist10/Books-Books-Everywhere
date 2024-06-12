import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  return (
    <div className="md:px-4 md:py-2 px-4 pb-4 shadow-lg flex flex-col md:flex-row w-full bg-white justify-between items-center rounded-b-2xl">
      <h1 className="text-lg md:text-xl lg:text-2xl px-2 py-2 text-center">
        Books, Books Everywhere
      </h1>
      <div>
        {location.pathname === "/bookshelf" ? (
          <NavLink
            to="/"
            className="bg-black p-2 px-3 text-white rounded-2xl hover:bg-blue-500 transition duration-500"
          >
            Home
          </NavLink>
        ) : (
          <NavLink
            to="/bookshelf"
            className="bg-black p-2 px-3 text-white rounded-2xl hover:bg-blue-500 transition duration-500"
          >
            My Bookshelf
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Nav;
