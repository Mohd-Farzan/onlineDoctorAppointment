import React, { useState } from 'react'
// import logo from '../../../public/images/logo.jpeg'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu,SidebarMenuItem, SidebarTrigger } from '@/components/ui/sidebar';
import {Heart, Home ,LogOut, Menu, PersonStanding,WatchIcon, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/store/auth-slice';
import { Link } from 'react-router-dom';
function Sidebars() {
  const user=useSelector((state)=>state.auth)
  const[open,setOpen]=useState(false)
  const dispatch=useDispatch()
  function handleLogOut(){
      dispatch(logoutUser())
  }
    return (
      <>
      <Sidebar open={open} onOpenChange={setOpen} collapsible='icon' className='border-r' >
      <SidebarTrigger>
          {open? <X className='h-6 w-6'/>: <Menu className='h-6 w-6'/>}
        </SidebarTrigger>
        <SidebarHeader>
        <img  className='rounded-3xl w-[50px]'src="../../public/images/logo.jpeg" alt="logo" />
        <h1 className=' text-xl p-2 font-extrabold '> Welcome {user.user.userName? user.user.userName : 'Guest'}</h1>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu >
                <SidebarMenuItem className='flex font-semibold left-2 mb-5'><Home/><Link to='/home/welcome'>Home</Link></SidebarMenuItem>
                <SidebarMenuItem className='flex font-semibold left-2 mb-5'><Heart/><Link to='/home/doctor'>Doctor</Link></SidebarMenuItem>
                <SidebarMenuItem className='flex font-semibold left-2 mb-5'><WatchIcon/><Link to='/home/appointment'>Appointment</Link></SidebarMenuItem>
                <SidebarMenuItem className='flex font-semibold left-2 mb-5'><PersonStanding/><Link to='/home/profile'>Profile</Link></SidebarMenuItem>
                <SidebarMenuItem className='flex font-semibold left-2 p-1' onClick={()=>{handleLogOut()}}><LogOut/></SidebarMenuItem>
            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    
    </>
    );
}

export default Sidebars