import React from 'react'
import Header from '../Common/header'
// import Sidebar from '../Common/sidebar'
import { Outlet } from 'react-router-dom'
import Sidebars from '../Common/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

function HomeLayout() {
  return (
    <div className="flex h-screen w-full">
    <div className="w-[200px] bg-blue-500">
      <SidebarProvider>
        <Sidebars />
      </SidebarProvider>
    </div>
    <div className="flex-1 bg-muted/40 p-4 md:p-6 bg-gray-800">
      <Outlet />
    </div>
  </div>
  )
}

export default HomeLayout