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
import ProfileUpdate from "./pages/home/profile";
import Medicine from "./pages/home/medicine";
import Appointment from "./pages/home/appointment";
import AdminProfile from "./pages/doctor/profile";
import DoctorProfile from "./Component/home/doctor_profile";
import DoctorPage from "./pages/home/doctor-page";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/reset-password";
import CunsultPage from "./pages/home/consult";
import ConsultForm from "./pages/home/consultForm";
import DoctorDashboard from "./pages/doctor/dashboard";
import DoctorRegistration from "./pages/doctor/profile";
import FindDoctor from "./Component/home/doctor_profile";



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
          <Route path='forgot-password' element={<ForgotPassword/>}/>
          <Route path='reset-password'element={<ResetPassword/>}/>
          <Route path='forgot-password' element={<ForgotPassword/>}/> 

        </Route>

        <Route path='/home'element={<CheckRoute isAuthenticated={isAuthenticated} user={user}>
          <HomeLayout/>
        </CheckRoute>}>
          <Route path='welcome' element={<Welcome/>}/>
          <Route path ="doctor" element={<DoctorPage/>}/>
          <Route path ="find-doctor" element={<DoctorPage/>}/>
          <Route path='profile' element={<ProfileUpdate/>}/>
          <Route path='appointment' element={<Appointment/>}/>
          <Route path='consult' element={<CunsultPage/>}/>
          <Route path='consulting-form' element={<ConsultForm/>}/>


        </Route>

        <Route path='/admin' element={<CheckRoute isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckRoute>}>
          <Route path='dashboard' element={<Dashboard/>} />
          <Route path='profile' element={<AdminProfile/>} />
        </Route>

        <Route path='/doctor' element={<CheckRoute isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckRoute>}>
          <Route path='dashboard' element={<DoctorDashboard/>} />
          <Route path='profile' element={<DoctorRegistration/>} />

          
        </Route>

    </Routes>
        
  </div>  
  );
};

export default App
