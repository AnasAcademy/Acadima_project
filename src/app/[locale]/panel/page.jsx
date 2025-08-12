import React from "react";
import Namcard from "@/components/namecard/Namcard";
import WeeklySchedule from "@/components/WeeklyScheduleCard/WeeklySchedule";
import Smallcard from "@/components/smallCard/Smallcard";
import Filescard from "@/components/filescard/Filescard";
import Calendar from "@/components/Calendarcard/Calendar";
import ProblemCard from "@/components/problemcard/ProblemCard";
import Frame1 from "@/assets/smallCard assets/Frame_31.svg"
import Frame2 from '@/assets/smallCard assets/sec.svg'
import { cookies } from "next/headers";
 
export default  async function Home() {
 
  const locale = cookies().get("NEXT_LOCALE")?.value;
  const token = cookies().get("auth_token")?.value;
  let dat = []
try{
  const data = await fetch( "https://api.lxera.net/api/development/organization/vodafone/panel",
    {
      method: "GET",
      headers: {
        "x-api-key": "1234",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const respond = await data.json();
  dat = respond;
} catch (err){
 
   console.log(err)
}
 
  return (
    <>
      <div
        className="  mt-3 container  p-3   "
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <div className=" row  mt-lg-0 mt-4   g-3 ">
          <div className="   col-md-12  col-lg-12 col-12 col-xl-8 d-flex flex-column   ">
            <div className=" row     g-3 d-flex justify-content-center   ">
              <div className="  col-xl-6 col-lg-6   pt-sm-4 pt-4 pt-lg-0 ">
                <Namcard
                  user={dat.user}
                />
              </div>
 
              <div className=" d-flex justify-content-around gap-3  col-xl-6 col-lg-6 ">
                <Smallcard Frame="smallcard" />
                <Smallcard Frame="smallcardd" />
              </div>
              {/* justify-content-around */}
              <div className=" d-flex flex-column    gap-3 col-md-12  col-lg-6 col-12 col-xl-6 d-lg-none d-xl-flex  ">
                <Filescard />
              </div>
 
              <div className=" d-flex flex-column   justify-content-start gap-3 col-md-12  col-lg-6 col-12 col-xl-6   ">
                <Calendar />
              </div>
 
              <div className="col-md-12 flex-column  d-none  col-lg-6 col-12 col-xl-6 d-xl-none d-lg-flex d-md-none d-sm-none gap-3 ">
                <Filescard />
 
                <ProblemCard />
              </div>
            </div>
          </div>
 
          <div className="col-md-12  col-lg-12 col-12 col-xl-4  d-flex flex-column gap-3   justify-content-between   ">
            <div>
              <WeeklySchedule />
            </div>
 
            <div className=" d-xl-flex d-lg-none d-md-flex d-sm-flex">
              <ProblemCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}