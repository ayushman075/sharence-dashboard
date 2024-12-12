import React from "react";
import logo from "../../public/shareableLogo.png"
import { MdOutlineLogout } from "react-icons/md";
import { useAuthData } from "../context/AuthContext";

const Navbar = () => {
    const {logout} =useAuthData();
  return (
    <nav className="bg-blue-200 py-1 mb-2 rounded-lg text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold tracking-wide text-white hover:text-gray-300">
            <img
            src={logo}
            alt="Logo"
            className="h-14 w-14  rounded-full"
          />
            </a>
          </div>
          <div>
            <h1 className="text-black text-2xl font-bold">Sharence</h1>
          </div>

          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition"
              onClick={logout}
            >
              <MdOutlineLogout size={25}/>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
