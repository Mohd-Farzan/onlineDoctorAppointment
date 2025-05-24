import  React, { useState } from "react" // Added import for React
import { Link } from "react-router-dom"
// import logo from '../../../public/images/a.jpeg'
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from '@/store/auth-slice';

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user=useSelector((state)=>state.auth);
  const dispatch= useDispatch();
  function handleLogOut(){
    dispatch(logoutUser());
  }

  return (
 <>



<div className="flex h-screen bg-blue-500">
  {/* <div>
    <img src={logo} className="w-20 h-20 rounded-full"/>
      </div> */}
  <aside className={` text-white w-64 h-screen p-4 ${sidebarOpen ? "hidden" : "block"} md:block`}>
    <nav>
      <div className="mb-6">
    {/* <img src={logo} className="w-20 h-20 rounded-full"/> */}
    <h1 className="text-white" >{user.user.userName}</h1>
    <h1 className="text-white" >{user.user.email}</h1>


        {/* <Link to="/" className="text-white text-2xl font-semibold">
          DOCTROIS
        </Link> */}
      </div>
      <ul>
        <li className="mb-2">
          <Link to="/admin/dashboard" className="block py-2 px-4 text-sm hover:bg-gray-700 rounded">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/doctor/appointment" className="block py-2 px-4 text-sm hover:bg-gray-700 rounded">
            Appointment
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/doctor/profile" className="block py-2 px-4 text-sm hover:bg-gray-700 rounded">
            Profile
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/doctor/create-meeting" className="block py-2 px-4 text-sm hover:bg-gray-700 rounded">
            Create Meeting
          </Link>
        </li> <li className="mb-2">
          <Link to="/doctor/chat" className="block py-2 px-4 text-sm hover:bg-gray-700 rounded">
            DOC-Chat
          </Link>
        </li>

        {/* <li className="mb-2">
          <Link to="/admin/chart" className="block py-2 px-4 text-sm hover:bg-gray-700 rounded">
            Charts
          </Link>
        </li> */}
        {/* <li className="mb-2">
          <Link to="/admin/table" className="block py-2 px-4 text-sm hover:bg-gray-700 rounded">
            Tables
          </Link>
        </li> */}
        <li   className="block py-2 px-4 text-sm hover:bg-gray-700 rounded"
                    onClick={handleLogOut}>
                      <span>Logout</span>

        </li>
      </ul>
    </nav>
  </aside>

</div>

 </> 


  
  )
}


