 import React from 'react'
 import { useTranslations } from "next-intl";
 import AdminNotifi from "@/components/AdminNotifi/AdminNotifi";
 import Filterr from "@/assets/admin/filterr.svg"
 import Search from "@/assets/admin/search.svg"; 
 export default function Notifications() {

  const t = useTranslations();
  const info = t.raw("notifications");

  return (
    <>
      <div className="   container p-3  mt-5 cardbg ">
       

        <div className=" d-flex row ">
          <div className=" mt-4 d-flex gap-3 flex-column w-100 ">
            <AdminNotifi />
          </div>
        </div>
      </div>
    </>
  );
 }
 