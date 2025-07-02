

 import React from 'react'
 import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
 import Circle from "@/assets/admin/circle.svg";
 import { useTranslations } from "next-intl";
 export default function OngoingTraincomp() {

    const TableHead = ["-", "-", "-"];

    const trainingData = [
      {
        columns: [
          { type: "text", value: "-" },
          { type: "text", value: 6 },

          { type: "progress", value: 60 },
        ],
      },
      {
        columns: [
          { type: "text", value: "-" },
          { type: "text", value: 6 },

          { type: "progress", value: 70 },
        ],
      },
    ];
    const t = useTranslations("HomePageA");


   return (
     <>
       <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
         <h3> {t("trainpro")} </h3>
         <div className=" d-flex gap-2">
           <Circle />
           <h6 className=" h6v  "> {t("subtrainpro")} </h6>
         </div>
         <OngoingTrain
           TableHead={TableHead}
           trainingData={trainingData}
           button={true}
           ContainerTop={true}
         />
       </div>
     </>
   );
 }
 