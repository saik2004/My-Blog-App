import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../config/firebase";

function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <footer className="w-full border-t-2 border-black bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-7xl">
        {/* TOP SECTION */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/home"
            className="w-fit text-2xl font-black tracking-tight transition-opacity duration-200 hover:opacity-60"
          >
            Personal<span className="text-gray-400">.</span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
            <Link
              to="/home"
              className="transition-colors duration-200 hover:text-gray-500"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="transition-colors duration-200 hover:text-gray-500"
            >
              About
            </Link>

            {authChecked && (
              <Link
                to={isLoggedIn ? "/blogs" : "/login"}
                className="transition-colors duration-200 hover:text-gray-500"
              >
                {isLoggedIn ? "Blogs" : "Login to Read Blogs"}
              </Link>
            )}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-7 border-t-2 border-black sm:my-8"></div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col gap-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>
            © {new Date().getFullYear()} Personal. All rights reserved.
          </p>

          <p className="font-semibold uppercase tracking-widest">
            Designed with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;