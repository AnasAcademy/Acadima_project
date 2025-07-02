
'use client'

import React, { useState } from 'react'
import Arrow from "@/assets/admin/arrow down.svg";
import { useTranslations, getTranslations } from "next-intl";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import ticket from "@/assets/admin/ticket.svg";
<<<<<<< HEAD
 export default function PastticketComp({dataa}) {
=======
import SelectCard from "@/components/SelectCard/SelectCard"; 

export default function PastticketComp({dataa}) {
>>>>>>> 6586ee9 (Modifications_p1)

    const t = useTranslations("techSupport");
       let num=3
      const [more , setMore] = useState(num)

    const TableHead = [
      t("ticket_number"),
      t("subject"),
      t("status"),
      t("last_updated"),
      t("action"),
    ];

    const trainingData = dataa.supports.slice(0, more).map((ticket, index) => ({
      columns: [
        { type: "text", value: ticket.id },
        { type: "text", value: ticket.title },
        {
          type: "button",
          value: ticket.status,
          icon: false,
          color: "#FFD900",
          width: "70%",
        },
        { type: "text", value: ticket.updated_at },
        {
          type: "button",
          value: t("show-details"),
          icon: true,
          textColor: "#216ED7",
          color: "#fff",
          decoration: "underline",
          width: "100%",
        },
      ],
    }));
    
<<<<<<< HEAD
    
=======
    const selectCardData = {
      inputs: [
        {
          title: "",
          type: "select",
          options: ["React", "Next.js", "Laravel"]
        },
        {
          title: "",
          type: "select",
          options: ["Cairo", "Alex"]
        },
        {
          title: "",
          type: "select",
          options: ["Cairo", "Alex"]
        },
        {
          title: "",
          type: "select",
          options: ["on", "off"]
        },{
          title: "",
          type: "search",
        },
      ]
    };
>>>>>>> 6586ee9 (Modifications_p1)


   return (
     <>
<<<<<<< HEAD
       <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
         <h2> {t("previous-tickets")} </h2>
         <OngoingTrain
           TableHead={TableHead}
           trainingData={trainingData}
           button={false}
           Icon={ticket}
         />

         <div
           className="text-primary fw-semibold d-flex align-items-center gap-2 "
           role="button"  onClick={()=>{
                  num = num + 3
               setMore(num)
           }}
         >
           <Arrow size={18} />
           {t("view-all-tickets")}
=======
       <div className=" row g-3">
         <div className="col-12">
           <SelectCard
             selectCardData={selectCardData}
             isTechSupport={true}
             dataa={dataa}
           />
         </div>

         <div className="col-12">
           <div className="rounded-4 shadow-sm   p-4   container-fluid  cardbg    min-train-ht">
             <h2> {t("previous-tickets")} </h2>
             <OngoingTrain
               TableHead={TableHead}
               trainingData={trainingData}
               button={false}
               Icon={ticket}
             />

             <div
               className="text-primary fw-semibold d-flex align-items-center gap-2 mt-2 "
               role="button"
               onClick={() => {
                 num = num + 3;
                 setMore(num);
               }}
             >
               <Arrow size={18} />
               {t("view-all-tickets")}
             </div>
           </div>
>>>>>>> 6586ee9 (Modifications_p1)
         </div>
       </div>
     </>
   );
 }
 