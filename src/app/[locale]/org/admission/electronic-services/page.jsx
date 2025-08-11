import React from "react";
import { getTranslations } from "next-intl/server";
import ElectronicServiceTable from "@/components/Tables&filters/ElectronicServiceTable/ElectronicServiceTable"

import { cookies } from "next/headers";




export default async function ElectronicServicesList() {
  const ts = await getTranslations("SidebarA");
  // const t = useTranslations("employee_progress");
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

let reqDat = [];
let dat =[]
let current_page=[] || 1
let last_page = []
   try {
      const data = await fetch(`${BASE_URL}/services/${current_page}`, {
        method: "GET",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
        const respond = await data.json();
     dat = respond.data.data;
     current_page = respond.data.current_page
     last_page = respond.data.last_page;
   } catch (error) {
     console.error("Fetch error:", error);
   }



  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-0">
          <div className=" row m-0  p-2 g-3">
            <div className=" d-flex justify-content-between">
              <h2 className="hvvv">{ts("electronic-services")}</h2>
            </div>
            <div className=" col-12 ">
              <ElectronicServiceTable
                dat={dat}
                current_page={current_page}
                last_page={last_page}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
