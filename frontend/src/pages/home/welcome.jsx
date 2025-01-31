import React, { useEffect } from 'react';
import logo from '../../../public/images/logo.jpeg'
import { BriefcaseMedical, CalendarCheck, GraduationCapIcon, Home, LogOut, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/store/auth-slice';
import { Link, useNavigate} from 'react-router-dom';


function Welcome() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {user}=useSelector((state)=>state.auth)
    function handleLogOut(){
      dispatch(logoutUser()).unwrap()
      console.log(logoutUser)
      alert('logout successfull')
      navigate('/auth/login');
    }
    
    
  return (
    <>
      <div className="flex items-center justify-evenly mt-5 ">
        <div className="flex space-x-4 ">
          <div className="max-w-sm bg-blue-700 shadow-lg rounded-lg hover:shadow-xl hover:bg-zinc-700  transition-all duration-200 ease-in-out">
            <div className="flex ">
              <div className="w-2/3 p-4 ">
                <h5 className="text-lg font-bold text-white">Book Your Next</h5>
                <p className="text-blue-600 border-2 border-white rounded font-bold bg-white">
                  Appointment
                  <span className="bg-cyan-500 text-white text-lg rounded font-bold ml-5">Online!</span>
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  <small>Book Now And Get 30% OFF</small>
                </p>
                <button className="border-2 border-orange-500 text-lg bg-orange-500 rounded text-white font-bold mt-3">
                  BOOK NOW -
                </button>
              </div>
              <div className="w-1/3 hidden md:block">
                <img src={logo} alt="Promotion" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div className="max-w-sm bg-orange-400 shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:bg-zinc-700  transition-all duration-200 ease-in-out">
            <div className="flex">
              <div className="w-2/3 p-4">
                <h5 className="text-lg font-semibold text-blue-600 mt-1">Find Your Right</h5>
                <p className="text-gray-700 text-lg">Specialist Doctor</p>
                <p className="text-gray-500 text-sm mt-1">
                  <small>Book Now And Get 30% OFF</small>
                </p>
                <button className="border-2 border-black text-lg bg-black rounded text-white font-bold mt-3">BOOK NOW</button>
              </div>
              <div className="w-1/3 hidden md:block">
                <img src={logo} alt="Doctor" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="con">
        <div className="flex flex-wrap justify-center mt-7 mx-10 gap-6 ">
          <div className="p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 bg-white hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out">
            <i className="text-blue-600"><GraduationCapIcon /></i>
            <h2 className="text-lg font-bold mt-2">
              <a href="/read">Doctor</a>
            </h2>
          </div>
          <div className="p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 bg-white hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out">
            <i className="text-blue-500"><CalendarCheck /></i>
            <Link className='font-bold text-lg mt-2' to = "/home/appointment"><h5 className='mt-2'>Appointment</h5></Link>
          </div>
          <div className="p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 bg-white hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out">
            <i className="text-blue-500"><BriefcaseMedical /></i>
            <h2 className="font-bold text-lg mt-2">Prescription</h2>
          </div>
          <div className="p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 bg-white hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out">
            <i className="text-blue-500"><Pill /></i>
             <Link className="text-lg font-bold " to="/home/medicine">
                    <h5 className='mt-2'>Medicine</h5>
                  </Link>
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-center mt-6">
          <h1 className="text-lg font-bold text-center">Top Doctor</h1>
        </div>

        <div className="flex flex-wrap justify-center mt-7 mx-10 gap-6">
          <div  className="bg-white p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48
         hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out ">
            <img src={logo} alt="Doctor" />
            <h2 className="font-bold">Dr. Taylor Samaro</h2>
            <span className="text-gray-500">Dental Surgeon</span>
          </div>

          <div className="bg-white p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out">
            <img src={logo} alt="Doctor" />
            <h2 className="font-bold">Dr. Taylor Samaro</h2>
            <span className="text-gray-500">Dental Surgeon</span>
          </div>

          <div className="bg-white p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out">
            <img src={logo} alt="Doctor" />
            <h2 className="font-bold">Dr. Taylor Samaro</h2>
            <span className="text-gray-500">Dental Surgeon</span>
          </div>

          <div className="bg-white p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out">
            <img src={logo} alt="Doctor" />
            <h2 className="font-bold">Dr. Taylor Samaro</h2>
            <span className="text-gray-500">Dental Surgeon</span>
          </div>

          <div className="bg-white p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out">
            <img src={logo} alt="Doctor" />
            <h2 className="font-bold">Dr. Taylor Samaro</h2>
            <span className="text-gray-500">Dental Surgeon</span>
          </div>

          <div className="bg-white p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out">
            <img src={logo} alt="Doctor" />
            <h2 className="font-bold">Dr. Taylor Samaro</h2>
            <span className="text-gray-500">Dental Surgeon</span>
          </div>

          <div className="bg-white p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out">
            <img src={logo} alt="Doctor" />
            <h2 className="font-bold">Dr. Taylor Samaro</h2>
            <span className="text-gray-500">Dental Surgeon</span>
          </div>

          <div className="bg-white p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out">
            <img src={logo} alt="Doctor" />
            <h2 className="font-bold">Dr. Taylor Samaro</h2>
            <span className="text-gray-500">Dental Surgeon</span>
          </div>

          <div className="bg-white p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out">
            <img src={logo} alt="Doctor" />
            <h2 className="font-bold">Dr. Taylor Samaro</h2>
            <span className="text-gray-500">Dental Surgeon</span>
          </div>

          <div className="bg-white p-4 border-2 shadow-md rounded w-32 sm:w-40 md:w-48 hover:shadow-xl hover:bg-blue-50 hover:p-2  transition-all duration-200 ease-in-out">
            <img src={logo} alt="Doctor" />
            <h2 className="font-bold">Dr. Taylor Samaro</h2>
            <span className="text-gray-500">Dental Surgeon</span>
          </div>
          {/* Repeat for other doctors */}
        </div>
      </section>
    </>
  );
}

export default Welcome;
