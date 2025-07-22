"use client";
import React from "react";
import { useTranslations } from "next-intl";
import AllStudentsTable from "@/components/Tables&filters/Records/AllStudentsTable/AllStudentsTable";

export default function AllStudents() {
  const ts = useTranslations("SidebarA");

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-lg-0">
          <div className=" row m-0  p-2 g-3">
            <h2 className="hvvv">{ts("students-list")}</h2>
            <div className=" col-lg-12 ">
              <AllStudentsTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
