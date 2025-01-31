import React, { useState } from 'react'
// import logo from '../../../public/images/logo.jpeg'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Calendar, Home, Inbox, PanelsTopLeft, Search, Settings } from 'lucide-react';
// import { LogOut } from 'lucide-react';
function Sidebars() {
  const items = [
    {
      title: "Home",
      url: "/welcome",
      icon: Home,
    },
    {
      title: "Doctor",
      url: "/doctor",
      icon: Inbox,
    },
    {
      title: "Appointment",
      url: "/appointment",
      icon: Calendar,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: PanelsTopLeft,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ]
    return (
      <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
   
    );
}

export default Sidebars