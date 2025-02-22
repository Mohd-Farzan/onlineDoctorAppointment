import React from 'react'
import { Link } from 'react-router-dom';

function DoctorDashboard() {

  return (
    <>
    <div className='flex items-center justify-center'>
      <h1>Doctor | Dashboard</h1>
      </div>
       <div className="max-w-sm bg-blue-700 shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:bg-zinc-700  transition-all duration-200 ease-in-out">
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
                    <Link to='/doctor/profile'>profile</Link>
                 
                  </div>
                  </div>
      </>
  );
}

export default DoctorDashboard