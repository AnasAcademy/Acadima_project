 "use client"
 
 import React, { useState,  useEffect } from "react";
 import { useTranslations } from "next-intl";
 import SelectCard from "@/components/SelectCard/SelectCard";
 import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
 export default function AdmissionReqTable({dataa = []}) {



    const t = useTranslations("tables");
    const [filter, setFilter] = useState(dataa.data);

  


  const trainingData = filter.map((item, index) => ({
    columns: [
      { type: "text", value: index + 1 },
      { type: "text", value: item.bundle_student.student_id },
      { type: "text", value: item.bundle_student.student.en_name },
      {
        type: "text",
        value: item.bundle_student.bundle.translations.title,
      },
      {
        type: "text",
        value: item.bundle_student.bundle.translations.title,
      },
      { type: "image", value: item.identity_attachment },
      { type: "image", value: item.identity_attachment },
      { type: "text", value: item.status },
      {},
      { type: "text", value: item.created_at },
      {
        type: "buttons",
        value1: t("accept"),
        value2: t("reject"),
        icon: false,
        color1: "#48BB78",
        color2: "#fc544b",
      },
    ],
  }));


    const TableHead = [
      "#",
      t("user-code"),
      t("user-name"),
      t("registered-program-type"),
      t("registered-program"),
      t("identity-file"),
      t("requirements"),
      t("user-status"),
      t("admin"),
      t("submission-date"),
      t("actions"),
    ];
    

   
  const selectCardData = {
    inputs: [
      {
        title: t("user-code"),
        type: "search",
      },
      {
        title: t("user-mail"),
        type: "search",
      },
      {
        title: t("user-name"),
        type: "search",
      },
      {
        title: t("user-phone"),
        type: "search",
      },
    ],
  };
  


  
   return (
     <>
       <div className="row g-3">
         <div className="col-12">
           <SelectCard
             search="bundle_student.student_id"
             selectCardData={selectCardData}
             isTechSupport={true}
             setFilter={setFilter}
             data={filter}
           />
         </div>

         <div className="col-12">
           <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
             {/* <h2>{t("previous-tickets")}</h2> */}

             <OngoingTrain
               TableHead={TableHead}
               trainingData={trainingData}
               button={false}
             />
           </div>
         </div>
       </div>
     </>
   );



 }
 