"use client";

import React from 'react'
import {usePathname} from 'next/navigation';
import Sidebar from '../../../components/AdminComp/sideBar/Sidebar';


export default function SideBarWrapper() {

    const pathname = usePathname(); 
    const hideSidebarRoutes = ["ar/admin", "en/admin"];

    const shouldHideSidebar = hideSidebarRoutes.some((route) =>
      pathname.includes(route)
    );

  return <>{shouldHideSidebar && <Sidebar />}</>;
}
