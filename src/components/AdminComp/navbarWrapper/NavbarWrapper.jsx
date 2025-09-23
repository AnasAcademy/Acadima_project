"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "../../../components/AdminComp/Navbar/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideSidebarRoutes = [
    "/ar/login",
    "/en/login",
    "/en/register",
    "/ar/register",
    "/ar/forget-password",
    "/en/forget-password",
    "/ar/reset-password",
    "/en/reset-password",
    "/ar/bundles/4/course/learning/4",
    "/en/bundles/4/course/learning/4",
    "/ar/checkout",
    "/en/checkout",
  ];

  return <>{!hideSidebarRoutes.includes(pathname) && <Navbar />}</>;
}
