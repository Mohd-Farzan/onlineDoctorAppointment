import { SearchIcon, UserIcon } from "lucide-react"
import { Bell, Mail } from "lucide-react"
import profile from "../../assets/img/profile.png"
import { useState } from "react";

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  return (
    <div className="flex-1 flex h-[80%] flex-col overflow-hidden">
      <header className="shadow-md">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-700 ml-2">Dashboard</h1>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                className="bg-gray-200 text-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:shadow-outline"
                placeholder="Search..."
              />
              <div className="absolute top-0 left-0 mt-2 ml-3">
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            <button className="ml-4 text-gray-500 focus:outline-none focus:text-gray-700">
               <img src={profile} alt="profile" className="w-12 h-12" />
            </button>
            
          </div>
        </div>
      </header>
    </div>
  );
}

