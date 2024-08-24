import React, { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../Redux/userRedux";
import axios from "axios";


const ProtectedRoute = ({ element }) => {
  const { user } = useSelector((state) => state.user || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8050/api/v1/users/getuser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(setUser(response.data.user));

      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user ) {
      getUser();
    }
  }, [user]);

  if(!user) {
    localStorage.removeItem("token");
    navigate("/login");
  }

  if (localStorage.getItem("token") ) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
