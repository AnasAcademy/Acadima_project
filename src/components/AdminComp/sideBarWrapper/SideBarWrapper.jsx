"use client";

import React from 'react'
import {usePathname} from 'next/navigation';
// import Sidebar from '../../../components/AdminComp/sideBar/Sidebar';
import NewSideBar from '@/components/AdminComp/NewSideBar/NewSideBar';
import Sidebar from "@/components/AdminComp/sideBar/Sidebar"
export default function SideBarWrapper() {

    const pathname = usePathname(); 
    const hideSidebarRoutes = ["ar/org", "en/org"];

    const shouldShowSidebar = hideSidebarRoutes.some((route) =>
      pathname.includes(route)
    );

  return <>{shouldShowSidebar  && (
    <>
      {/* <Sidebar /> */}
      <NewSideBar />
    </>
  )}
</>

}
