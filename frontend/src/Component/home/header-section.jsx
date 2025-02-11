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
    <nav className="border-b fixed top-0 left-0  transition-all z-50 p-4duration-300 bg-blue-500 w-full">
      <div className="mx-auto px-4 w-full">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold text-primary">
              Doctorist
            </a>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/home/doctor" className="text-gray-900 hover:text-primary">
                Find Doctors
              </Link>
              <Link to="/home/consult" className="text-gray-900 hover:text-primary">
                Video Consult
              </Link>
              <Link to="/home/appointment" className="text-gray-900 hover:text-primary">
                Appointment
              </Link>
            </div>
          </div>

          {/* Right Section (Corporate, Providers, Security, Button) */}
          <div className="flex items-center space-x-4">
            {/* Links - Hidden on Mobile */}
            <div className="hidden md:flex items-center space-x-4">
            <Link to="/home/about" className="text-gray-900 hover:text-primary">
               About
              </Link>
              <Link to="/home/contact" className="text-gray-900 hover:text-primary">
                Contact
              </Link>
              <Link to="/home/profile" className="text-gray-900 hover:text-primary">
                Profile
              </Link>
              <Link onClick={handleLogOut} className="text-gray-900 hover:text-primary">
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
