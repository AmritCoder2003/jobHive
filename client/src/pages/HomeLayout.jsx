import { Outlet } from "react-router-dom";
//import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "/src/assets/css/index.css";

const HomeLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />

      <Footer/>
    </div>
  );
};

export default HomeLayout;
