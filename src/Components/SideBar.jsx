import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, LayoutDashboardIcon, NotebookPen, Notebook, Trash2, BookCheckIcon, SunIcon, MoonIcon, Moon, MoonStar } from 'lucide-react';
import { NoteContext, useContextwithContext } from '../ContextApi/useContext';
import { fetchUser } from '../Api/userAuthApi';

const SideBar = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const { isauth, setIsAuth } = useContext(NoteContext);
    const [userData, setUserData] = useState({})
    const location = useLocation();
    const { theme, setTheme } = useContextwithContext()

    const handleTheme = () => {
        setTheme(!theme)
    }

    useEffect(() => {

        const fetchuser = async () => {
            try {
                const response = await fetchUser()
                if (response.status === 200) {
                    // console.log(response);
                    setUserData(response.data)
                } else {

                }
            } catch (error) {
                console.log('Error while fetch user:', error);
            }
        }
        fetchuser()

        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setOpenSidebar(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleAuthtrue = () => {
        setIsAuth(true);
    };

    const handleSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    const handleProfile = () => {
        setOpenProfile(!openProfile);
    };

    const activeLinkClass = "bg-gray-100 dark:bg-gray-700 text-red-600 dark:text-blue-400";
    const normalLinkClass = "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700";

    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                onClick={handleSidebar}
                                type="button"
                                className="sm:hidden items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                {!openSidebar ? <X /> : <Menu />}
                            </button>
                            <NavLink to="/sidebar/analyze_table" onClick={handleAuthtrue}>
                                <div className="text-2xl font-semibold text-red-600 flex gap-2 items-center cursor-pointer">
                                    <BookCheckIcon size={32} /> InoteBook
                                </div>
                            </NavLink>
                        </div>
                        <div className="flex items-center">
                            <div>
                                <button
                                    onClick={handleTheme}
                                    className="p-2 text-gray-400 dark:text-gray-200 cursor-pointer  rounded-full hover:bg-gray-100 hover:dark:bg-gray-600 hover:rounded-2xl">{theme ? <SunIcon size={26} /> : <Moon size={26} />}</button>
                            </div>
                            <div className="flex items-center ms-3">
                                <div>
                                    <button
                                        onClick={handleProfile}
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        aria-expanded="false"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                <div
                                    className={`z-50 ${openProfile ? "" : 'hidden'} absolute right-0 top-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600`}
                                    id="dropdown-user"
                                >
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                                            {userData?.username}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                            {userData.email}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <NavLink
                                                to="/sidebar/logout-pop-up"
                                                className="flex items-center gap-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                <LogOut size={14} /> Logout
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                className={`fixed top-0 left-0 z-40 w-48 sm:w-64 h-screen pt-20 transition-transform sm:translate-x-0 ${openSidebar ? "-translate-x-full" : "translate-x-0"} bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium text-left">
                        <li>
                            <NavLink
                                to="analyze_table"
                                className={({ isActive }) =>
                                    `flex p-2 rounded-lg group ${isActive ? activeLinkClass : normalLinkClass}`
                                }
                            >
                                <LayoutDashboardIcon />
                                <span className="ms-3">Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="all-notes"
                                className={({ isActive }) =>
                                    `flex p-2 rounded-lg group ${isActive ? activeLinkClass : normalLinkClass}`
                                }
                            >
                                <Notebook />
                                <span className="ms-3">All Notes</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="add-note"
                                className={({ isActive }) =>
                                    `flex p-2 rounded-lg group ${isActive ? activeLinkClass : normalLinkClass}`
                                }
                            >
                                <NotebookPen />
                                <span className="ms-3">Add Note</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="logout-pop-up"
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-lg group ${isActive ? activeLinkClass : normalLinkClass}`
                                }
                            >
                                <LogOut size={20} />
                                <span className="ms-3">Logout</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="sm:ml-65 sm:pl-4 sm:pt-18 pt-16">
                <Outlet />
            </div>
        </div>
    );
};

export default SideBar;