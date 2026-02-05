import React from "react";
import { Search, BookAudio } from "lucide-react";

function Navbar() {
    return (
        <div className="bg-[#0E1113] z-50 fixed w-full flex items-center justify-between px-6 py-3 border-b border-gray-700">

            {/* Left Logo */}
            <div className="flex items-center gap-2">
                <img
                    src="https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png"
                    alt="logo"
                    className="w-8 h-8"
                />
                <span className="text-white font-bold text-lg">
                    Thoughts
                </span>
            </div>

            {/* Search Bar */}
            <div className="flex items-center bg-[#1A1D1F] border border-gray-600 rounded-full px-4 py-2 w-[40%] hover:border-gray-400 transition">
                <Search size={18} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search Thoughts"
                    className="bg-transparent outline-none text-white px-2 w-full placeholder-gray-400"
                />
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-full text-white font-medium hover:bg-gray-800 transition">
                    Log In
                </button>

                <button className="px-4 py-2 rounded-full bg-[#D93900] text-white font-semibold hover:bg-[#b92f00] transition">
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default Navbar;
