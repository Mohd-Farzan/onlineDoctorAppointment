import React from 'react'
import Header from '../Common/header'
// import Sidebar from '../Common/sidebar'
import { Outlet } from 'react-router-dom'
import Sidebars from '../Common/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

function HomeLayout() {
  return (
    <div className="flex min-h-screen w-full">
    <div className="flex flex-col ">
      <SidebarProvider className='flex h-screen'>
        <Sidebars/>
      </SidebarProvider>
    </div>
    <main className="flex-1 bg-muted/40 p-4 md:p-6 bg-purple-800">
      <Outlet />
    </main>
  </div>
  )
}

export default HomeLayout