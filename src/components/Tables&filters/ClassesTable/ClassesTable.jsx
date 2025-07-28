   "use client";
   import React from 'react'
   import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
   import { useTranslations } from "next-intl";
   import Pin from "@/assets/admin/pin.svg";
   import Removebin from "@/assets/admin/removebin.svg";
   import roundimage from "@/assets/admin/personla.png";
   export default function ClassesTable({dat}) {
     const ts = useTranslations("employee_progress");
   const t = useTranslations("tables");
     const TableHead = [
       "ID",
       t("title"),
       t("seat_students"),
       t("program_students"),
       t("direct_students"),
       t("scholarship_students"),
       t("creation_date"),
       t("actions"),
     ];

     const trainingData = dat.map((item, index) => ({
       columns: [
         { type: "text", value: item.id },
         { type: "text", value: item.title },
         { type: "text", value: 7 },
         { type: "text", value: 7 },
         { type: "text", value: 9 },
         { type: "text", value: 9 },
         { type: "text", value: item.created_at },
       ],
     }));

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
            //  button={false}
            //  Icon={Pin}
            //  Icon2={Removebin}
           />
         </div>
       </>
     );
   }
   