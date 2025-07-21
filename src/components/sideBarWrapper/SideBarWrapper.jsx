"use client";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../../components/sidebar/sidebarr/Sidebar";
import { NotificationContext } from "@/context/NotificationContext";

export default function SideBarWrapper() {
  const Pathname = usePathname();

  // const { notFound } = useContext(NotificationContext);

  const SidebarRoutes = [
    "/ar",
    "/en",
  ];


  const adminSidebar = [
    "ar/org",
    "en/org",
    "/login",
    "/register",
    "/forget-password",
    "/ar/bundles/4/course/learning/4",
    "/en/bundles/4/course/learning/4",
  ];

  const shouldShowSidebaruser = SidebarRoutes.some((route) =>
    Pathname.includes(route)
  );


  const shouldShowSidebaradmin = adminSidebar.some((route) =>
   Pathname.includes(route)
  );


  return (
    <>
      {shouldShowSidebaruser  && !shouldShowSidebaradmin && <Sidebar />}
    </>
  );
}
