"use client";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../../components/sidebar/sidebarr/Sidebar";
import { NotificationContext } from "@/context/NotificationContext";

export default function SideBarWrapper() {
  const Pathname = usePathname();

  const { notFound } = useContext(NotificationContext);

  const hideSidebarRoutes = [
    "/ar/login",
    "/en/login",
    "/en/register",
    "/ar/register",
    "/ar/not-found",
    "/en/not-found",
    "/ar/bundles/4/course/learning/4",
    "/en/bundles/4/course/learning/4",
    "/ar/forget-password",
    "/en/forget-password",
    "/ar/reset-password",
    "/en/reset-password",
    "/ar/bundles/675/course/learning/45",
    "/en/bundles/675/course/learning/45",
    "/en/installments-conditions",
    "/ar/installments-conditions",
    "/ar/checkout",
    "/en/checkout",
    "/ar/quiz/4",
    "/en/quiz/4",
  ];


  const adminSidebar = ["ar/org", "en/org"];

  const shouldHideSidebar = adminSidebar.some((route) =>
   Pathname.includes(route)
  );


  return (
    <>
      {!hideSidebarRoutes.includes(Pathname) &&
        !notFound &&   !shouldHideSidebar && <Sidebar />}
    </>
  );
}
