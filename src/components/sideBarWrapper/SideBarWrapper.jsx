"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../../components/sidebar/sidebarr/Sidebar";

export default function SideBarWrapper() {
  const Pathname = usePathname();

  const hideSidebarRoutes = [
    "/ar/login",
    "/en/login",
    "/en/register",
    "/ar/register",
  ];

  return <>{!hideSidebarRoutes.includes(Pathname) && <Sidebar />}</>;
}
