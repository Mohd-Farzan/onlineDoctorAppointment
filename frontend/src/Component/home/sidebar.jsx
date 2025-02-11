import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { Heart, Home, LogOut, Menu, PersonStanding, WatchIcon, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/store/auth-slice';
import { Link } from 'react-router-dom';

function Sidebars() {
  const user = useSelector((state) => state.auth);
  const [open, setOpen] = useState(true); // Sidebar starts open
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(logoutUser());
  }

  return (
    <div className="flex flex-col flex-1  min-h-screen bg-red-800">
      {/* Sidebar (Expands & Collapses) */}
      <div className={`transition-all duration-300 ${open ? 'w-64' : 'w-0'} md:w-64`}>
        <Sidebar open={open} onOpenChange={setOpen} collapsible className="border-r h-screen">
          <SidebarHeader>
            <img className="rounded-3xl w-[50px]" src="/images/logo.jpeg" alt="logo" />
            {open && (
              <h1 className="text-xl p-2 font-extrabold">
                Welcome {user.user?.userName ? user.user.userName : 'Guest'}
              </h1>
            )}
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {/* Sidebar Menu Items */}
                  <SidebarMenuItem className="flex items-center space-x-2 font-semibold mb-5">
                    <Home />
                    {open && <Link to="/home/welcome">Home</Link>}
                  </SidebarMenuItem>

                  <SidebarMenuItem className="flex items-center space-x-2 font-semibold mb-5">
                    <Heart />
                    {open && <Link to="/home/doctor">Doctor</Link>}
                  </SidebarMenuItem>

                  <SidebarMenuItem className="flex items-center space-x-2 font-semibold mb-5">
                    <WatchIcon />
                    {open && <Link to="/home/appointment">Appointment</Link>}
                  </SidebarMenuItem>

                  <SidebarMenuItem className="flex items-center space-x-2 font-semibold mb-5">
                    <PersonStanding />
                    {open && <Link to="/home/profile">Profile</Link>}
                  </SidebarMenuItem>

                  {/* Logout Button */}
                  <SidebarMenuItem
                    className="flex items-center space-x-2 font-semibold p-1 cursor-pointer text-red-600 hover:text-red-800"
                    onClick={handleLogOut}
                  >
                    <LogOut />
                    {open && <span>Logout</span>}
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>

      {/* Main Content (Adjusts based on sidebar state) */}
      <div className={`flex-1 transition-all duration-300 ${open ? 'ml-64' : 'ml-0'}`}>
        {/* Menu Toggle Button */}
        <button
          className="absolute top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

       
      </div>
    </div>
  );
}

export default Sidebars;
