"use client";
import React from "react";
import FilterCard from "@/components/FilterCard/FilterCard";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import { useTranslations } from "next-intl";
import Pin from "@/assets/admin/pin.svg";
import Removebin from "@/assets/admin/removebin.svg";
import roundimage from "@/assets/admin/personla.png";

export default function AllStudents() {
  const ts = useTranslations("SidebarA");

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-lg-0">
          <div className=" row m-0  p-2 g-3">
            <h2 className="hvvv">{ts("students-list")}</h2>


          </div>
        </div>
      </div>
    </>
  );
}
