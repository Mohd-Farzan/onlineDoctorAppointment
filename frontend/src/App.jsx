import Authlayout from "./Component/auth/layout";
import CheckRoute from "./Component/Common/checkroute";
import Cookies from "js-cookie";
import HomeLayout from "./Component/home/layout";
import Welcome from "./pages/home/welcome";
import AuthLogin from "./pages/auth/login";
import React,{ useEffect } from "react";
import AuthSignup from "./pages/auth/signup"
import { Routes,Route } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { checkRoute } from "./store/auth-slice";
import Dashboard from "./pages/admin/dashboard";
import AdminLayout from "./Component/admin/layout";
import ForgotPassword from "./pages/auth/forgotPassword";
import ProfileUpdate from "./pages/home/profile";
import Medicine from "./pages/home/medicine";
import Appointment from "./pages/home/appointment";
import AdminProfile from "./pages/admin/profile";
import DoctorProfile from "./Component/home/doctor_profile";
import DoctorPage from "./pages/home/doctor-page";



function App() {
  const dispatch = useDispatch();
    const { isAuthenticated, user} = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(checkRoute());
    }, [dispatch]);
    
     
  return( 
  <div>
  <Routes>
        <Route path='/'element={<CheckRoute isAuthenticated={isAuthenticated} user={user}>
          <Authlayout/> 
        </CheckRoute>}>
          <Route path='signup' element={<AuthSignup/>}/>
          <Route path='login' element={<AuthLogin/>}/>
          <Route path='forgotPassword' element={<ForgotPassword/>}/>

        </Route>

        <Route path='/home'element={<CheckRoute isAuthenticated={isAuthenticated} user={user}>
          <HomeLayout/>
        </CheckRoute>}>
          <Route path='welcome' element={<Welcome/>}/>
          <Route path ="doctor" element={<DoctorPage/>}/>
          <Route path ="doctor-profile" element={<DoctorProfile/>}/>
          <Route path='profile' element={<ProfileUpdate/>}/>
          <Route path='appointment' element={<Appointment/>}/>


        </Route>

        <Route path='/admin' element={<CheckRoute isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckRoute>}>
          <Route path='dashboard' element={<Dashboard/>} />
          <Route path='profile' element={<AdminProfile/>} />
        </Route>
    </Routes>
        
  </div>  
  );
};

export default App
