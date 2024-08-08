import { NavLink } from "react-router-dom";
import { useState } from "react";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const toggleevent = () => {
    setOpen(!open);
  };
  return (
    <nav id="activeline" className="bg-white border-pink-200 dark:bg-pink-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            JobHive
          </span>
        </a>

        <div className="w-18 md:hidden z-10  relative" onClick={toggleevent}>
          {open && (
            <i className="fa-brands fa-x-twitter cursor-pointer fa-2xl text-rose-50"></i>
          )}

          {!open && (
            <i className="fa-solid fa-bars fa-beat cursor-pointer fa-2xl text-rose-50 "></i>
          )}
        </div>
        {open && (
          <div className="gap-8 text-4xl absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              <li>
                <NavLink
                  to="/AddJob"
                  className=" block py-2 px-3 text-pink-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-pink-500 dark:text-white dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-pink-700"
                  exact={true}
                >
                  Add Job
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/AllJobs"
                  exact={true}
                  className="block py-2 px-3 text-pink-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-pink-500 dark:text-white dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-pink-700"
                >
                  All Jobs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Stats"
                  exact={true}
                  className="block py-2 px-3 text-pink-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-pink-500 dark:text-white dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-pink-700"
                >
                  Stats
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Profile"
                  exact={true}
                  className="block py-2 px-3 text-pink-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-pink-500 dark:text-white dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-pink-700"
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <div
          className="items-center  justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-pink-100 rounded-lg bg-pink-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-pink-800 md:dark:bg-pink-900 dark:border-pink-700">
            <li>
              <NavLink
                to="/AddJob"
                className=" block py-2 px-3 text-pink-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-pink-500 dark:text-white dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-pink-700"
                exact={true}
              >
                Add Job
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/AllJobs"
                exact={true}
                className="block py-2 px-3 text-pink-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-pink-500 dark:text-white dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-pink-700"
              >
                All Jobs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Stats"
                exact={true}
                className="block py-2 px-3 text-pink-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-pink-500 dark:text-white dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-pink-700"
              >
                Stats
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Profile"
                exact={true}
                className="block py-2 px-3 text-pink-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-pink-500 dark:text-white dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-pink-700"
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
