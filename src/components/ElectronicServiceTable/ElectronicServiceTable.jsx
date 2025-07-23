

  import React from 'react'
  import { useTranslations } from "next-intl";
  import Pin from "@/assets/admin/pin.svg";
  import Removebin from "@/assets/admin/removebin.svg";
  import roundimage from "@/assets/admin/personla.png";
  import FilterCard from "@/components/FilterCard/FilterCard";
  import SelectCard from "@/components/SelectCard/SelectCard";
  import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
  export default function ElectronicServiceTable() {


 const t = useTranslations("tables");

    const TableHead = [
      "#",
      t("title"),
      t("desc"),
      t("price"),
      t("status"),
      t("creator"),
      t("creation_date"),
      t("start_date"),
      t("end_date"),
      t("actions"),
    ];

    const trainingData = [
      {
        columns: [
          { type: "text", value: "1" },
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
          { type: "text", value: "2" },
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
          { type: "text", value: "4" },
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
    ];

    //   const selectCardData = {
    //     inputs: [
    //       {
    //         title: "training_course",
    //         type: "select",
    //         options: ["React", "Next.js", "Laravel"],
    //       },
    //       {
    //         title: "branch",
    //         type: "select",
    //         options: ["Cairo", "Alex"],
    //       },
    //       {
    //         title: "department",
    //         type: "select",
    //         options: ["Cairo", "Alex"],
    //       },
    //       {
    //         title: "program_status",
    //         type: "select",
    //         options: ["on", "off"],
    //       },
    //     ],
    //   };

    return (
      <>
        <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
                <OngoingTrain
                  TableHead={TableHead}
                  trainingData={trainingData}
                  button={false}
                  Icon={Pin}
                  Icon2={Removebin}
                />
              </div>
      </>
    );
  }
  