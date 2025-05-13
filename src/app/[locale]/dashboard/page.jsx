import React from "react";
import Namcard from "@/components/namecard/Namcard";
import WeeklySchedule from "@/components/WeeklyScheduleCard/WeeklySchedule";
import Smallcard from "@/components/smallCard/Smallcard";
import Filescard from "@/components/filescard/Filescard";
import Calendar from "@/components/Calendarcard/Calendar";
import ProblemCard from "@/components/problemcard/ProblemCard";



export default function Home() {
  return (
    <>
      <div className="  mt-3  container p-3  ">
        <div className=" row     g-3 ">
          <div className="   col-md-12  col-lg-12 col-12 col-xl-7 d-flex flex-column  ">
            <div className=" row     g-3  ">
              <div className="  col-xl-12 col-lg-6 ">
                <Namcard />
              </div>
              {/* justify-content-around */}
              <div className=" d-flex flex-column    gap-3 col-md-12  col-lg-6 col-12 col-xl-6 ">
                <div className=" d-flex justify-content-around gap-3">
                  <Smallcard />
                  <Smallcard />
                </div>

                <div className=" d-lg-none d-xl-flex ">
                  <Filescard />
                </div>
              </div>
              <div className=" d-flex flex-column   justify-content-start gap-3 col-md-12  col-lg-6 col-12 col-xl-6  ">
                <Calendar />
              </div>
              <div className="col-md-12 flex-column  d-none  col-lg-6 col-12 col-xl-6 d-xl-none d-lg-flex d-md-none d-sm-none gap-3">
                <Filescard />

                <ProblemCard />
              </div>
            </div>
          </div>

          <div className="col-md-12  col-lg-12 col-12 col-xl-5  d-flex flex-column gap-3   ">
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
