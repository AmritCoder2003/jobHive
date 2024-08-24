import { FaGoogle, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonSpinner from "../components/ButtonSpinner";

import axios from "axios";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userRedux";
//require
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 characters or more";
  }
  if (!values.role) {
    errors.role = "Role Required";
  }
  return errors;
};

const Login = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Added useNavigate hook

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8050/api/v1/users/login",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
       
        setIsLoading(false);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          toast.success("Login Successful");
         
          console.log(response);
          dispatch(setUser(response.data.user));
         if(response.data.user.role==="employer"){
        navigate("/ViewYourJobs"); 

        }else{
          navigate("/AllJobs");
        }

        } else {
          toast.error("Login Failed");
          formik.resetForm();
        
        }
      } catch (error) {
        setIsLoading(false);
        formik.resetForm();
        toast.error('Something went wrong. Please try again.');
      }
    },
  });

  useEffect(() => {
    if (isLoading) {
      console.log("loading");
    }
   
  }, [isLoading]);

  const handleBlink = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      setShowPassword(false);
    }, 1000);
  };

  const handleForget = () => {
    toast.info("Forget Password");
  };

  return (
    <React.Fragment>
     
      <div>
        <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
          <div className="bg-pink-600 rounded-2xl flex max-w-3xl p-5 items-center">
            <div className="md:w-1/2 px-8">
              <h2 className="font-bold text-3xl text-white">Login</h2>
              <p className="text-sm mt-4 text-white">
                If you are already a member, easily log in now.
              </p>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4"
              >
                <input
                  className="p-2 mt-8 rounded-xl border"
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
                <div className="relative">
                  <input
                    className="p-2 rounded-xl border w-full"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500">{formik.errors.password}</div>
                  ) : null}
                  <FaEye
                    onClick={handleBlink}
                    className="absolute right-2 top-3 text-gray-500 cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="jobseeker"
                    name="role"
                    value="jobseeker"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.role === "jobseeker"}
                  />
                  <label htmlFor="jobseeker" className="text-white">
                    Jobseeker
                  </label>
                  <input
                    type="radio"
                    id="employer"
                    name="role"
                    value="employer"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.role === "employer"}
                  />
                  <label htmlFor="employer" className="text-white">
                    Employer
                  </label>
                </div>
                {formik.touched.role && formik.errors.role ? (
                  <div className="text-red-500">{formik.errors.role}</div>
                ) : null}
                {isLoading ? (
                  <ButtonSpinner message="Logging in" />
                ) : (
                  <button
                    className="bg-pink-950 text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-pink-800 hover:text-white font-medium"
                    type="submit"
                  >
                    Login
                  </button>
                )}
              </form>
              <div className="mt-6 items-center text-gray-100">
                <p className="text-center text-sm">OR</p>
              </div>
              <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-pink-300 font-medium">
                <FaGoogle className="mr-2 text-pink-950" />
                Login with Google
              </button>
              <button
                onClick={handleForget}
                className="mt-2 text-sm border-b border-pink-500 py-5 playfair tooltip"
              >
                Forget password?
              </button>
              <div className="mt-4 text-sm flex justify-between items-center container-mr">
                <p className="mr-3 md:mr-0">
                  If you don&apos;t have an account..
                </p>
                <Link
                  to="/register"
                  className="hover:border register text-white bg-pink-950 hover:border-pink-950 rounded-xl py-2 px-5 hover:scale-110 hover:bg-pink-800 font-semibold duration-300"
                >
                  Register
                </Link>
              </div>
            </div>
            <div className="md:block hidden w-1/2">
              <img
                className="rounded-2xl max-h-[1600px]"
                src="/src/assets/images/applicantregister.png"
                alt="login form image"
              />
            </div>
          </div>
        </section>
      </div>

    </React.Fragment>
  );
};

export default Login;
