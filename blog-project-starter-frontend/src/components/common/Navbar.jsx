import React, { useEffect, useState } from "react";
import "./Navbar.css";

import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../config/firebase";

function Navbar() {
  const navigate = useNavigate();
  const [logout, setlogout] = useState(false);
  const [isblog, setblog] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in");
        setlogout(true);
        setblog(true);
      } else {
        console.log("logged out");
        setlogout(false);
        setblog(false);
      }
    });

    return () => unsubscribe();
  }, []);

  async function handlelogout() {
    try {
      await signOut(auth);
      navigate("/home");
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return (
    <header className="w-full bg-white px-1.5 pt-1.5 sm:px-4 sm:pt-4">
      <nav className="mx-auto flex w-full max-w-7xl flex-col gap-2  bg-white p-2 sm:gap-4 sm:p-4 md:flex-row md:items-center md:justify-between md:gap-5 md:px-6 md:py-4">
        {/* Brand */}
        <NavLink
          to="/home"
          className="w-fit shrink-0 text-xl font-black tracking-tight sm:text-3xl"
        >
          Personal<span className="text-[#8BAA24]">.</span>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex w-full flex-wrap items-center gap-1 sm:gap-2 md:w-auto md:flex-nowrap md:gap-3">
          {/* Home */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `px-2 py-1.5 text-xs font-bold transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                isActive
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          {/* Blogs */}
          {isblog && (
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `px-2 py-1.5 text-xs font-bold transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`
              }
            >
              Blogs
            </NavLink>
          )}

          {/* About */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-2 py-1.5 text-xs font-bold transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                isActive
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white"
              }`
            }
          >
            About
          </NavLink>

          {/* Logout */}
          {logout && (
            <button
              type="button"
              onClick={handlelogout}
              className="ml-auto border-2 border-black bg-[#D9F36A] px-2 py-1.5 text-xs font-black text-black transition-colors duration-200 hover:bg-black hover:text-white sm:px-4 sm:py-2 sm:text-sm md:ml-0"
            >
              Logout
            </button>
          )}

          {/* Login */}
          {!logout && (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="ml-auto border-2 border-black bg-[#D9F36A] px-2 py-1.5 text-xs font-black text-black transition-colors duration-200 hover:bg-black hover:text-white sm:px-4 sm:py-2 sm:text-sm md:ml-0"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
