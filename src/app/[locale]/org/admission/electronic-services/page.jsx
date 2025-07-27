
import React from "react";
import FilterCard from "@/components/FilterCard/FilterCard";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import { getTranslations } from "next-intl/server";
import Pin from "@/assets/admin/pin.svg";
import Removebin from "@/assets/admin/removebin.svg";
import roundimage from "@/assets/admin/personla.png";
import ElectronicServiceTable from "@/components/ElectronicServiceTable/ElectronicServiceTable"


export default async function ElectronicServicesList() {
  const ts = await getTranslations("SidebarA");
  // const t = useTranslations("employee_progress");


let dat =[]
  
   try {
   

      const data = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/services`,
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
       console.log("go", respond.data.data);
     dat = respond.data.data;
 
   } catch (error) {
     console.error("Fetch error:", error);
   }













  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-0">
          <div className=" row m-0  p-2 g-3">
            <h2 className="hvvv">{ts("electronic-services")}</h2>
            
            <div className=" col-12 ">
              <ElectronicServiceTable dat={dat} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
