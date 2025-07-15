"use client";
import React from 'react'
import FilterCard from "@/components/FilterCard/FilterCard"
import SelectCard from "@/components/SelectCard/SelectCard"
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";

import EmpProgressTable from "@/components/EmpProgressTable/EmpProgressTable"

export default  async function EmployeeProgress() {
  const selectCardData = {
  inputs: [
    {
      title: "training_course",
      type: "select",
      options: ["React", "Next.js", "Laravel"]
    },
    {
      title: "branch",
      type: "select",
      options: ["Cairo", "Alex"]
    },
    {
      title: "department",
      type: "select",
      options: ["Cairo", "Alex"]
    },
    {
      title: "program_status",
      type: "select",
      options: ["on", "off"]
    },
  ]
};

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className="   pt-0">
          <div className=" row m-0  p-2 g-3">
            <div className="col-lg-12">
              <FilterCard />
            </div>

            <div className=" col-lg-12 ">
              <SelectCard selectCardData={selectCardData} />
            </div>

            <div className=" col-12 ">

              <EmpProgressTable/>


            </div>
          </div>
        </div>
      </div>
    </>
  );
}
