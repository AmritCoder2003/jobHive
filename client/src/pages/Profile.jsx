import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  // Accessing user data from Redux store
  const user = useSelector((state) => state.user || {});

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-16 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center space-x-4">
          <img
            className="w-20 h-20 rounded-full"
            src={user.user.avatar}
            alt={`${user.user.name}'s avatar`}
          />
          <div>
            <h2 className="text-xl font-semibold">{user.user.name}</h2>
            <p className="text-gray-600">{user.user.role}</p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-gray-800 p-2">
            <span className="font-medium  ">Email:</span> {user.user.email}
          </p>
          <p className="text-gray-800 p-2">
            <span className="font-medium  ">Phone:</span> {user.user.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;