import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import ErrorModal from "../components/ErrorModal";

const Otp = ({ setVerifyHandler, username, email }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(0); // Start with 0 seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [otpSended, setOtpSended] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const verifyHandler = async () => {
    setOtpSended(true);
    try {
      const response = await axios.post(
        "http://localhost:8050/api/v2/employees/emailVerification",
        { email: email, name: username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setOtp(Array(6).fill("")); // Clear the OTP input
      setTimer(120); // Reset the timer to 2 minutes
      setIsTimerActive(true); // Activate the timer
      toast.success("OTP sent to your email");
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || error.message);
      setIsError(true);
    }
  };

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    console.log(otpValue);
    if (otpValue.length < 6) {
      toast.error("Please enter valid OTP");
    } else {
      try {
        const response = await axios.post(
          `http://localhost:8050/api/v2/employees/verifyOtp`,
          { email: email, otp: otpValue },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          
          toast.success("OTP verified successfully");
          setIsTimerActive(false);
          setVerifyHandler(true);
        }
      } catch (error) {
        console.error(
          "Error verifying OTP:",
          error.response?.data || error.message
        );
        setError(error.response?.data?.message || error.message);
        setIsError(true);
        setVerifyHandler(false);
      }
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <React.Fragment>
      {isError && (
        <ErrorModal
          error={error}
          onClear={() => setIsError(false)}
          onClose={() => setIsError(false)}
        />
      )}
      <div className="max-w-sm mx-auto md:max-w-lg">
        <div className="w-full">
          <div className="bg-white h-90 py-3 rounded text-center">
            <h1 className="text-2xl font-bold">OTP Verification</h1>
            {otpSended && (
              <div className="flex flex-col mt-4">
                <span>Enter the OTP you received at</span>
                <span className="font-bold">{email}</span>
              </div>
            )}

            <div
              id="otp"
              className="flex flex-row justify-center text-center px-2 mt-5"
            >
              {otp.map((data, index) => (
                <input
                  key={index}
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            <div className="flex justify-center text-center mt-5">
              <button
                disabled={isTimerActive}
                onClick={verifyHandler}
                className={`flex items-center text-pink-700 hover:text-pink-900 cursor-pointer ${
                  isTimerActive ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Send OTP
              </button>
            </div>
            <div className="flex justify-center text-center mt-5">
              <button
                onClick={handleSubmit}
                className="bg-pink-500 text-white font-bold py-2 px-4 rounded"
                disabled={!isTimerActive}
                type="submit"
              >
                Verify OTP
              </button>
            </div>

            {isTimerActive && (
              <div className="flex justify-center text-center mt-5">
                <span className="font-bold">{formatTime(timer)}</span>
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      </div>
    </React.Fragment>
  );
};

Otp.propTypes = {
  setVerifyHandler: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Otp;
