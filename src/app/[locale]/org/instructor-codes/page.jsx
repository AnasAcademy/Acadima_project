"use client";
import React from 'react'
import FilterCard from "@/components/FilterCard/FilterCard"
import SelectCard from "@/components/SelectCard/SelectCard"
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import { useTranslations } from "next-intl";
import Pin from "@/assets/admin/pin.svg"
import Removebin from "@/assets/admin/removebin.svg";
import roundimage from "@/assets/admin/personla.png"

export default function InstructorCodes() {


const ts = useTranslations("SidebarA");
  const t = useTranslations("employee_progress");


  const TableHead = [
    "",
    t("employee_name"),
    t("training_course"),
    t("program_status"),
    t("join_date"),
    t("completion_rate"),
    t("profile_access"),
  ];

  const trainingData = [
    {
      columns: [
        { type: "image", value: roundimage },
        { type: "text", value: t("add_employee") },
        { type: "text", value: t("leaderShip") },
        {
          type: "button",
          value: t("completed"),
          icon: false,
          color: "#48BB78",
        },
        { type: "text", value: "14/06/21" },
        { type: "progress", value: 60 },
        { type: "button", value: t("profile"), icon: true },
      ],
    },
    {
      columns: [
        { type: "image", value: roundimage },
        { type: "text", value: t("add_employee") },
        { type: "text", value: t("leaderShip") },
        {
          type: "button",
          value: t("inProgress"),
          icon: false,
          color: "#50C1FA",
        },
        { type: "text", value: "14/06/21" },
        { type: "progress", value: 60 },
        { type: "button", value: t("profile"), icon: true },
      ],
    },
    {
      columns: [
        { type: "image", value: roundimage },
        { type: "text", value: t("add_employee") },
        { type: "text", value: t("leaderShip") },
        {
          type: "button",
          value: t("notStarted"),
          icon: false,
          color: "#CBD5E0",
        },
        { type: "text", value: "14/06/21" },
        { type: "progress", value: 60 },
        { type: "button", value: t("profile"), icon: true },
      ],
    }
  ];


  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-0">
          <div className=" row m-0  p-2 g-3">
            <h2 class="hvvv">{ts("instructor-codes")}</h2>
            <div className=" col-12 ">
              <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
                <OngoingTrain
                  TableHead={TableHead}
                  trainingData={trainingData}
                  button={false}
                  Icon={Pin}
                  Icon2={Removebin}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
