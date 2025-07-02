
'use client'

import React, { useState } from 'react'
import Arrow from "@/assets/admin/arrow down.svg";
import { useTranslations, getTranslations } from "next-intl";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import ticket from "@/assets/admin/ticket.svg";
 export default function PastticketComp({dataa}) {

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
    
    


   return (
     <>
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
         </div>
       </div>
     </>
   );
 }
 