import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { navbarItems } from '@/config';
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

function NavbarItems() {
    return (
      <nav className="flex lg:mb-0 gap-6 lg:flex-row">
        {navbarItems.map(navItem => (
          <Link className='text-sm font-bold' key={navItem.id} to={navItem.path}>
            {navItem.lable}
          </Link>
        ))}
      </nav>
    );
  }
function Header(){
  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
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
    // <header className="sticky top-0 z-40 w-full border-b bg-gray-500">
    //   <div className="flex h-16 items-center justify-center px-4 md:px-6">
    //     <div className="hidden lg:block">
    //         <NavbarItems/>
    //     </div>
    //   </div>
    //   </header>
    );
}

export default Header