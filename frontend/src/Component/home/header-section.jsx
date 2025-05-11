import { Button } from "@/components/ui/button";
import { logoutUser } from "@/store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function HeaderSection() {
  const user=useSelector((state)=>state.auth)
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(logoutUser());
  }
  return (
    <nav className="border-b fixed top-0 left-0 text-zinc-900 font-semibold transition-all z-50 p-2 duration-300 bg-blue-400 w-full">
      <div className="mx-auto px-4 w-full">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to = '/home/welcome' className="text-2xl font-bold text-primary">
              Doctorist
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/home/doctor" className="hover:text-slate-200">
                Find Doctors
              </Link>
              <Link to="/home/consult" className="hover:text-slate-200">
                Video Consult
              </Link>
              <Link to="/home/appointment" className=" hover:text-slate-200">
                Appointment
              </Link>
            </div>
          </div>

          {/* Right Section (Corporate, Providers, Security, Button) */}
          <div className="flex items-center space-x-4">
            {/* Links - Hidden on Mobile */}
            <div className="hidden md:flex items-center space-x-4">
            <Link to="/home/about" className="hover:text-slate-200">
               About
              </Link>
              <Link to="/home/contact" className="hover:text-slate-200">
                Contact
              </Link>
              <Link to="/home/profile" className=" hover:text-slate-200">
                Profile
              </Link>
              <Link to="/home/chatuser" className=" hover:text-slate-200">
                Chat
              </Link>
              <Link onClick={handleLogOut} className=" hover:text-slate-200">
                Logout
              </Link>
              <h1 className="p-2 font-bold">
                Welcome {user.user?.userName ? user.user.userName : 'Guest'}
              </h1>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderSection;
