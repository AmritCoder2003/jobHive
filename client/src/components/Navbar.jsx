import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user || {});
  const navigate = useNavigate(); // Use useNavigate hook

  const toggleevent = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");

    navigate("/login");
    window.location.reload();
  };



  const withoutloginmenu = [
    { key: 1, name: "Home", link: "/" },
    { key: 2, name: "About", link: "/about" },
    { key: 3, name: "Contact", link: "/contact" },
    { key: 4, name: "Register", link: "/register" },
    { key: 5, name: "Login", link: "/login" },
  ];

  const withloginmenuforemployer = [
    { key: 1, name: "View Your Jobs", link: "/ViewYourJobs" },
    { key: 2, name: "Post Job", link: "/job/post" },
    { key: 3, name: "Applications", link: "/application/me" },
    { key: 4, name: "Profile", link: "/Profile" },
    { key: 5, name: "Logout", link: "/", onClick: handleLogout },
  ];

  const withloginmenuforcandidate = [
   
    { key: 2, name: "All Jobs", link: "/AllJobs" },
    { key: 3, name: "My Jobs", link: "job/me" },
    { key: 4, name: "Profile", link: "/Profile" },
    { key: 5, name: "Logout", link: "/", onClick: handleLogout },
  ];

  return (
    <nav id="activeline" className="bg-white border-pink-200 dark:bg-pink-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            JobHive
          </span>
        </a>

        <div className="w-18 md:hidden z-10 relative" onClick={toggleevent}>
          {open ? (
            <i className="fa-brands fa-x-twitter cursor-pointer fa-2xl text-rose-50"></i>
          ) : (
            <i className="fa-solid fa-bars fa-beat cursor-pointer fa-2xl text-rose-50"></i>
          )}
        </div>
        {open && (
          <div className="gap-8 text-4xl absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {/* Mobile Menu */}
              {user && user.role === "employer"
                ? withloginmenuforemployer.map((item) => (
                    <li key={item.key}>
                      <NavLink
                        to={item.link}
                        className="block py-2 px-3 text-pink-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-pink-500 dark:text-white dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-pink-700"
                        onClick={item.onClick}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))
                : withoutloginmenu.map((item) => (
                    <li key={item.key}>
                      <NavLink
                        to={item.link}
                        className="block py-2 px-3 text-pink-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-pink-500 dark:text-white dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-pink-700"
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
            </ul>
          </div>
        )}

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-pink-100 rounded-lg bg-pink-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-pink-800 md:dark:bg-pink-900 dark:border-pink-700">
            {!user &&
              withoutloginmenu.map((item) => (
                <li key={item.key}>
                  <NavLink
                    to={item.link}
                    className="block py-2 px-3 text-pink-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-pink-500 dark:text-white dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-pink-700"
                    exact={true}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            {user &&
              user.role === "employer" &&
              withloginmenuforemployer.map((item) => (
                <li key={item.key}>
                  <NavLink
                    to={item.link}
                    className="block py-2 px-3 text-pink-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-pink-500 dark:text-white dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-pink-700"
                    onClick={item.onClick}
                    exact={true}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            {user &&
              user.role === "jobseeker" &&
              withloginmenuforcandidate.map((item) => (
                <li key={item.key}>
                  <NavLink
                    to={item.link}
                    className="block py-2 px-3 text-pink-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:hover:text-pink-700 md:p-0 md:dark:hover:text-pink-500 dark:text-white dark:hover:bg-pink-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-pink-700"
                    onClick={item.onClick}
                    exact={true}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
