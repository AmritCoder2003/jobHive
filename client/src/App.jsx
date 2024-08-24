import React, { useEffect } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./Redux/userRedux";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  HomeLayout,
  Login,
  Register,
  Error,
  Landing,
  PostJob,
  AllJobs,
  Profile,
  About,
  Contact,
  Admin,
  Apply,
  EditJob,
  Application,
  Myapplication,
  ResumeModal,
  PopularCompanies,
  Myjobs,
  PopularCategory,
  JobDetails,
  Howitworks,
  PorfileEdit,
  ViewYourJobs,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "landing", element: <Landing /> },
      { path: "job/post", element: <ProtectedRoute element={<PostJob />} /> },
      { path: "AllJobs", element: <ProtectedRoute element={<AllJobs />} /> },
      { path: "Profile", element: <ProtectedRoute element={<Profile />} /> },
      { path: "about", element: <About /> },
      { path: "contact", element:<Contact /> },
      { path: "admin", element: <ProtectedRoute element={<Admin />} /> },
      { path: "Apply/:id", element: <ProtectedRoute element={<Apply />} /> },
      { path: "EditJob/:id", element: <ProtectedRoute element={<EditJob />} /> },
      { path: "application/:id", element: <ProtectedRoute element={<Application />} /> },
      { path: "application/me", element: <ProtectedRoute element={<Myapplication />} /> },
      { path: "ResumeModal", element: <ProtectedRoute element={<ResumeModal />} /> },
      { path: "PopularCompanies", element: <ProtectedRoute element={<PopularCompanies />} /> },
      { path: "job/me", element: <ProtectedRoute element={<Myjobs />} /> },
      { path: "PopularCategory", element: <ProtectedRoute element={<PopularCategory />} /> },
      { path: "jobs/:id", element: <ProtectedRoute element={<JobDetails />} /> },
      { path: "Howitworks", element: <ProtectedRoute element={<Howitworks />} /> },
      { path: "PorfileEdit", element: <ProtectedRoute element={<PorfileEdit />} /> },
      { path: "ViewYourJobs", element: <ProtectedRoute element={<ViewYourJobs />} /> },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user || {});


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8050/api/v1/users/getuser",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data.user);
        if (response.data.user) {
          dispatch(setUser(response.data.user));
        }
      } catch (error) {
        dispatch(setUser(null));
      }
    };

    fetchUser();
  
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
