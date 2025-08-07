import React from "react";
import { getTranslations } from "next-intl/server";
import ElectronicServiceTable from "@/components/Tables&filters/ElectronicServiceTable/ElectronicServiceTable"


export default async function ElectronicServicesList() {
  const ts = await getTranslations("SidebarA");
  // const t = useTranslations("employee_progress");

let reqDat = [];
let dat =[]
let current_page=[] || 1
let last_page = []
   try {
      const data = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/services/${current_page}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );
  
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
