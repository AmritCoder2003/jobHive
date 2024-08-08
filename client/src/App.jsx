import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Login,
  Register,
  DashboardLayout,
  Error,
  Landing,
  AddJob,
  AllJobs,
  Stats,
  Profile,
  RegisterRecruiter,
  About,
  Contact
} from "./pages";
import { useCallback, useEffect,useState } from "react";
import { AuthContext } from "./Context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const router = createBrowserRouter(
  [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "dashboard", element: <DashboardLayout /> },
      { path: "landing", element: <Landing /> },
      { path: "AddJob", element: <AddJob /> },
      { path: "AllJobs", element: <AllJobs /> },
      { path: "Stats", element: <Stats /> },
      { path: "Profile", element: <Profile /> },
      { path: "registerRecruiter", element: <RegisterRecruiter /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);
let logoutTimer;
const App = () => {
  const [sessionId, setSessionId] = useState(false);
  const [userId, setUserId] = useState(null);
  const [sessionExpiration, setSessionExpiration] = useState();
  
  // useEffect(() => {
  //   const getUser=async()=>{
  //  try{
  //   const res = await axios.get("http://localhost:8050/emp/auth/login/success",{
  //     withCredentials: true,
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //   }

  // }

  //   );
  //   console.log(res);
  //   if(res.status===200){
  //     setUser(res.data.user);
  //   }else{
  //     console.log("User not authenticated");
  //   }
  //  }catch(err){
  //    console.log(err);
  //  }
  // }
  // getUser();
  // }, []);
  const login=useCallback((uid,session,expirationDate)=>{
    setUserId(uid);
    setSessionId(session);
    const sessionExpiration=expirationDate || new Date(new Date().getTime()+1000*60*60);
    setSessionExpiration(sessionExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        sessionId: session,
        expiration: sessionExpiration.toISOString(),
      })
    );
  },[]);
  const logout=useCallback(()=>{
    setUserId(null);
    setSessionId(null);
    setSessionExpiration(null);
    localStorage.removeItem("userData");
  },[]);
  useEffect(()=>{
    if(sessionId && sessionExpiration){
      const remainingTime=sessionExpiration.getTime()-new Date().getTime();
      logoutTimer=setTimeout(logout,remainingTime);
    }else{
      clearTimeout(logoutTimer);
    }
  },[sessionId,logout,sessionExpiration]);
  useEffect(()=>{
    const storedData=JSON.parse(localStorage.getItem("userData"));
    if(storedData && storedData.sessionId && new Date(storedData.expiration)>new Date()){
      login(storedData.userId,storedData.sessionId,new Date(storedData.expiration));
    }
  },[login]);

   return <RouterProvider router={router} />;
};

export default App;
