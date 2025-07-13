import React, { useState } from "react";
import { BookCheckIcon, MenuIcon, Moon, SunIcon, XIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useContextwithContext } from "../ContextApi/useContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { theme, setTheme } = useContextwithContext()

  const handleTheme = () => {
    setTheme(!theme)
  }

  return (
    <div className=" sticky top-0 z-100">
      <nav className="w-full bg-white dark:bg-gray-900 text-black dark:text-white shadow-sm relative z-50">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center py-4 px-4">
          <Link to={"/"} onClick={() => setIsMenuOpen(false)}>
            <div className="text-2xl font-semibold text-red-600 flex gap-2 items-center cursor-pointer">
              <BookCheckIcon size={32} /> InoteBook
            </div>
          </Link>
          <div>
            <button
              onClick={handleTheme}
              className="p-2 md:hidden text-gray-400 dark:text-gray-200 cursor-pointer  rounded-full hover:bg-gray-100 hover:dark:bg-gray-600 hover:rounded-2xl">
              {theme ? <SunIcon size={26} /> : <Moon size={26} />}
            </button>
            <button
              onClick={toggleMenu}
              className="md:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>

          <div className="hidden md:flex gap-3 items-center font-sans text-lg">
            <ul className="flex gap-3">
              <li className="px-3 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">
                <NavLink to="/" className={({ isActive }) => `${isActive ? 'text-red-600' : ''}`}>Home</NavLink>
              </li>
              <li className="px-3 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">
                <NavLink to="/prising" className={({ isActive }) => `${isActive ? 'text-red-600' : ''}`}>Pricing</NavLink>
              </li>
              <button
                onClick={handleTheme}
                className="p-2 text-gray-400 dark:text-gray-200 cursor-pointer  rounded-full hover:bg-gray-100 hover:dark:bg-gray-600 hover:rounded-2xl">{theme ? <SunIcon size={26} /> : <Moon size={26} />}</button>
            </ul>

            <div className="h-7 w-px bg-gray-300 dark:bg-gray-600"></div>

            <div className="flex gap-2 text-lg">
              <Link
                to="/login"
                className="px-4 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 rounded-md bg-red-500 text-white font-medium border border-red-500 hover:bg-red-600"
              >
                Start for free
              </Link>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-md absolute top-full left-0 w-full animate-slide-down">
            <ul className="flex flex-col p-4 gap-3">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/prising"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
                >
                  Pricing
                </Link>
              </li>

              <div className="flex flex-col gap-2 mt-4">
                <Link
                  to="/login"
                  className="block text-center px-4 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-center rounded-md bg-red-500 text-white font-medium border border-red-500 hover:bg-red-600"
                >
                  Start for free
                </Link>
              </div>
            </ul>
          </div>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
