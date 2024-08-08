import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
//import { useState } from "react";
import Otp from "../components/Otp";
import React,{useState,useEffect} from 'react';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonSpinner from "../components/ButtonSpinner";
import ErrorModal from "../components/ErrorModal";
import axios from "axios";
import {useFormik} from 'formik';
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name Required';
  }else if(values.name.length>15){
    errors.name = 'Must be 15 characters or less';
  }
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
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password doesn't match";
  }
  return errors;

}
const RegisterRecruiter = () => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
 
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async(values) => {
      console.log(values);
      
      if(isVerified){
        setIsLoading(true);
        try{
         const response = await axios.post(
           "http://localhost:8050/api/v2/employees/signup",
           values,
           {
             headers: {
               "Content-Type": "application/json",
             },
           }
         );
          setIsLoading(false);
          formik.resetForm();
          setIsRegistered(true);
          console.log(response.status);
          if(response.status===200){
            toast.success("Registered Successfully");
          
          }else{
            setError("Something went wrong");
            setIsError(true);
          }
        }
        catch(error){
          
          setError(error.message);
          setIsLoading(false);
          setIsError(true);
        }
      }else{
        setError("Please verify your email first");
        setIsError(true);
      }
    },
  });
  const handleverify = (value) => {
    if(value){
      
      
      toast.success("Email Verified Successfully");
      setIsVerified(true);
    }else
    {
      
      toast.error("Email Verification Failed");
      setIsVerified(false);
    }
    setTimeout(() => {
      setOtpModal(false);
    }, 4000);
  }
  const verifyEmail = async () => {

   setOtpModal(true);
  }
  useEffect(() => {
    if (isloading) {
      console.log("loading");
    }
    if (isError) {
      console.log("error");
    }
    
  }, [isloading, isError]);
  const handleModalClose = () => {
    setIsError(false);
  };

 const googleAuth = () => {
   window.open("http://localhost:8050/emp/auth/google/callback", "_self");
 };

  return (
    <React.Fragment>
      {(
        <ErrorModal
          error={error}
          onModalClose={handleModalClose}
          onClear={() => setError(null)}
        />
      ) && isError}

      <div>
        <div className="min-h-screen z-20 bg-gray-100 text-gray-900 flex justify-center">
          <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
              <div>
                <img src="/public/favicon.ico" className="w-10 mx-auto" />
              </div>
              <div className="mt-4 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
                <div className="flex flex-col items-center">
                  <button onClick={googleAuth} className="w-full my-4 max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white ml-4 p-1 rounded-full">
                      <FaGoogle />
                    </div>
                    <span className="ml-4 mr-4">Sign Up with Google</span>
                  </button>
                </div>
                <hr className="bg-pink-400  w-full " />
                <div className="my-4 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign up with e-mail
                  </div>
                </div>

                <form
                  className="w-full flex-1 mt-4"
                  onSubmit={formik.handleSubmit}
                  action=""
                  method="POST"
                >
                  <div className="mx-auto max-w-xs">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div>{formik.errors.name}</div>
                    ) : null}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      placeholder="Official Email Id"
                      required
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div>{formik.errors.email}</div>
                    ) : null}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Confirm Password"
                      required
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <div>{formik.errors.confirmPassword}</div>
                    ) : null}

                    <div className="flex mt-5 items-center justify-center">
                      {isVerified ? (
                        <button
                          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="click"
                          disabled={isVerified}
                        >
                          Email Verified!
                        </button>
                      ) : (
                        <button
                          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="click"
                          onClick={verifyEmail}
                          disabled={!formik.isValid}
                        >
                          Verify Email
                        </button>
                      )}
                    </div>

                    {isloading ? (
                      <ButtonSpinner message="Registering " />
                    ) : (
                      <button
                        type="submit"
                        onSubmit={formik.handleSubmit}
                        disabled={!isVerified}
                        className="mt-5 tracking-wide font-semibold bg-pink-700 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        <i className="fa-solid fa-user-plus fa-lg"></i>
                        <span className="ml-3">Sign Up</span>
                      </button>
                    )}
                    <p className="text-sm font-light mt-3 text-black dark:text-black">
                      Already have an account?{" "}
                      <Link
                        to={"/login"}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Login here
                      </Link>
                    </p>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      I agree to abide by JobHive&apos;s&nbsp;
                      <a
                        href="#"
                        className="border-b border-gray-500 border-dotted"
                      >
                        Terms of Service&nbsp;
                      </a>
                      and its&nbsp;
                      <a
                        href="#"
                        className="border-b border-gray-500 border-dotted"
                      >
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </form>
                <ToastContainer />
              </div>
            </div>
            <div className="flex-1 bg-pink-100 text-center hidden lg:flex">
              <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
                {!otpModal ? (
                  <img src="/src/assets/images/register.png" alt="" />
                ) : (
                  <Otp
                    setVerifyHandler={handleverify}
                    email={formik.values.email}
                    username={formik.values.name}
                  />
                )}
                {isRegistered && (
                  <Link
                    to="/login"
                    className="mt-5 tracking-wide font-semibold bg-pink-700 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">
                      Registered Successfully - Go to Login Page
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
  
};

export default RegisterRecruiter;
