import React from "react";
import FilterCard from "@/components/FilterCard/FilterCard";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import { getTranslations } from "next-intl/server";
import Pin from "@/assets/admin/pin.svg";
import Removebin from "@/assets/admin/removebin.svg";
import roundimage from "@/assets/admin/personla.png";
import QuizzesTable from "@/components/Tables&filters/QuizzesTable/QuizzesTable"


export default async function Quizzes() {
 

const ts = await getTranslations("SidebarA");

let dat = [];
let current_page = [] || 1;
let last_page = [];
try {
  const data = await fetch(
    `https://api.lxera.net/api/development/organization/vodafone/quizzes`,
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
  dat = respond.quizzesTable;
  // current_page = respond.data.current_page;
  // last_page = respond.data.last_page;
} catch (error) {
  console.error("Fetch error:", error);
}



  

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-0">
          <div className=" row m-0  p-2 g-3">
            {/* <h2 className="hvvv"></h2> */}

       
                   


                <div className=" col-12 ">
                        <QuizzesTable dat={dat} />
                      </div>
          </div>
        </div>
      </div>
    </>
  );
}
