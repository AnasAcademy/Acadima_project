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
    "/ar/not-found",
    "/en/not-found",
    "/ar/bundles/4/course/learning/4",
    "/ar/forget-password",
    "/en/forget-password",
    "/ar/reset-password",
    "/en/reset-password",
  ];

  return <>{!hideSidebarRoutes.includes(Pathname) && <Sidebar />}</>;
}
