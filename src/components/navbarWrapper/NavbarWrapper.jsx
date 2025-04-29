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
  ];

  return <>{!hideNavbarRoutes.includes(pathname) && <Navbar />}</>;
}
