   
   import React from 'react'
   import { useTranslations } from "next-intl";
   import Pin from "@/assets/admin/pin.svg";
   import Removebin from "@/assets/admin/removebin.svg";
   import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain"
   export default function OrgProfileTable() {

    const t = useTranslations("employee_progress");
    const TableHead = [
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
      },
      {
        columns: [
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
          { type: "text", value: t("add_employee") },
          { type: "text", value: t("leaderShip") },
          {
            type: "button",
            value: t("completed"),
            icon: false,
            color: "#50C1FA",
          },
          { type: "text", value: "14/06/21" },
          { type: "progress", value: 60 },
          { type: "button", value: t("profile"), icon: true },
        ],
      },
    ];
    



     return (
       <>
         <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
           <OngoingTrain
             TableHead={TableHead}
             trainingData={trainingData}
           />
         </div>
       </>
     );
   }
   