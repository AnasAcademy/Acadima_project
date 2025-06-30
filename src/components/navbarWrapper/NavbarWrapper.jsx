"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "../../components/sidebar/navbar/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  const hideNavbarRoutes = [
    "/ar/login",
    "/en/login",
    "/en/register",
    "/ar/register",
    "/ar/bundles/4/course/learning/4",
    "/en/bundles/4/course/learning/4",
    "/ar/forget-password",
    "/en/forget-password",
    "/ar/reset-password",
    "/en/reset-password",
    "/en/installments-conditions",
    "/ar/installments-conditions",
    "/ar/admin/user",
    "/en/admin/user",
    "/ar/dashboard",
    "/en/dashboard",
  ];

  return <>{!hideNavbarRoutes.includes(pathname) && <Navbar />}</>;
}
