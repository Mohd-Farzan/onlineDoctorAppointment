import Authlayout from "./Component/auth/layout";
import CheckRoute from "./Component/Common/checkroute";
import Cookies from "js-cookie"; // Not directly used in this snippet but keep if needed elsewhere
import HomeLayout from "./Component/home/layout";
import Welcome from "./pages/home/welcome";
import AuthLogin from "./pages/auth/login";
import React, { useEffect } from "react";
import AuthSignup from "./pages/auth/signup";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkRoute } from "./store/auth-slice";
import Dashboard from "./pages/admin/dashboard";
import AdminLayout from "./Component/admin/layout";
import ProfileUpdate from "./pages/home/profile";
import Medicine from "./pages/home/medicine"; // Unused in this context, keep if needed
import Appointment from "./pages/home/appointment";
import AdminProfile from "./pages/admin/profile";
import DoctorProfile from "./Component/home/doctor_profile"; // Appears twice, check usage
import DoctorPage from "./pages/home/doctor-page";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/reset-password";
import CunsultPage from "./pages/home/consult";
import ConsultForm from "./pages/home/consultForm";
import DoctorDashboard from "./pages/doctor/dashboard";
import DoctorRegistration from "./pages/admin/profile"; // Appears to be AdminProfile, check usage
import FindDoctor from "./Component/home/doctor_profile"; // Appears twice, check usage
import Services from "./pages/home/services";
import AppointmentForm from "./pages/home/appointmentForm";
import AboutUs from "./pages/home/aboutPage";
import Contact from "./pages/home/contact";
import DoctorAppointment from "./pages/admin/appointment";
import DoctorChart from "./pages/admin/chart";
import Doctortable from "./pages/admin/Table";
import DoctorAppoint from "./pages/doctor/doctorappointment"
import DocMeeting from "./pages/doctor/DocMeeting";
import Docchating from "./pages/doctor/docchat";
import Chat from "./pages/home/chat";
import ChatUser from "./pages/home/Chatuser";
import GoogleOAuthCallback from "./Component/auth/googleAuth";

// NEW: Import for Google OAuth callback
 // Create this component

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkRoute());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<CheckRoute isAuthenticated={isAuthenticated} user={user}>
          <Authlayout />
        </CheckRoute>}>
          <Route path='signup' element={<AuthSignup/>}/>
          <Route path='login' element={<AuthLogin/>}/>
          <Route path='reset-password'element={<ResetPassword/>}/>
          <Route path='forgot-password' element={<ForgotPassword/>}/> 

        </Route>

        {/* NEW: Route for Google OAuth callback */}
        <Route path='/auth/google/callback' element={<GoogleOAuthCallback />} />

        <Route path='/home' element={<CheckRoute isAuthenticated={isAuthenticated} user={user}>
          <HomeLayout />
        </CheckRoute>}>
          <Route path='welcome' element={<Welcome />} />
          <Route path="doctor" element={<DoctorPage />} />
          <Route path="find-doctor" element={<DoctorPage />} />
          <Route path='profile' element={<ProfileUpdate />} />
          <Route path='appointment' element={<Appointment />} />
          <Route path='consult' element={<CunsultPage />} />
          <Route path='consulting-form' element={<ConsultForm />} />
          <Route path='services' element={<Services />} />
          <Route path='book-appointment' element={<AppointmentForm />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='contact' element={<Contact />} />
          <Route path='chatuser' element={<ChatUser />} />
          <Route path='chat/:id' element={<Chat />} />
        </Route>

        <Route path='/admin' element={<CheckRoute isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckRoute>}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='profile' element={<AdminProfile />} />
          <Route path='appointment' element={<DoctorAppointment />} />
          <Route path='chart' element={<DoctorChart />} />
          <Route path='table' element={<Doctortable />} />
        </Route>

        <Route path='/doctor' element={<CheckRoute isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout /> {/* Assuming Doctor also uses AdminLayout, adjust if a separate DoctorLayout exists */}
        </CheckRoute>}>
          <Route path='dashboard' element={<DoctorDashboard/>} />
          <Route path='profile' element={<DoctorRegistration/>} />
          <Route path='appointment' element={<DoctorAppoint/>} />
          <Route path='create-meeting' element={<DocMeeting/>} />
          <Route path='chat' element={<Docchating/>} />
          
          


          
        </Route>
      </Routes>
    </div>
  );
}

export default App;