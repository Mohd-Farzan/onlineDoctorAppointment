import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebars from './sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import HeaderSection from './header-section'
import Footer from './footer'

function HomeLayout() {
  return (
    <><div className="flex flex-col min-h-screen w-full ">
    <div className="flex flex-1 w-full flex-col">
    <HeaderSection/>
    
    <main className=" bg-slate-100 flex flex-col mt-20 p-4 md:p-6  ">
      <Outlet />
    </main>
    <div className="flex  bg-blue-400 ">
      <Footer/>
    </div>
  </div>
  </div>
  </>

  )
}

export default HomeLayout