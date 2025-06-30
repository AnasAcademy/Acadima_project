import { useTranslations } from "next-intl";
import React from "react";


import SettingSidebar from "@/components/settingSidebar/SettingSidebar";



export default function Settings() {
  const t = useTranslations();
  const info = t.raw("settings");

  return (
    <>
      <div className="container p-3 pt-lg-0 pt-5 mt-5 ">
        <SettingSidebar />
      </div>
    </>
  );
}
