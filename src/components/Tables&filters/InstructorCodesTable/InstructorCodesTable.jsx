    "use client"
    import React, { useState } from "react";
    import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
    import { useTranslations } from "next-intl";
    import Editform from "@/components/Editform/Editform";
 


 export default function InstructorCodesTable({dat}) {

   const ts = useTranslations("SidebarA");
   const [showModal, setShowModal] = useState(false);
   const [formState, setFormState] = useState("");
   const [data, setData] = useState(dat);
   const [Itemid, setId] = useState(null);


const handleSubmitEdit = async (dataa) => {
  console.log(dataa.title);
  try {
    const response = await fetch(
      `https://api.lxera.net/api/development/organization/vodafone/classes/${Itemid}`,
      {
        method: "PUT",
        headers: {
          "x-api-key": "1234",
          "Content-Type": "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
        },
        body: JSON.stringify({
          title: dataa.title,
        }),
      }
    );

    const result = await response.json();

    console.log(result.message);
    const updatedItem = {
      ...data.find((item) => item.id === Itemid),
      ...dataa,
    };
    setData((prev) =>
      prev.map(
        (item) => (item.id === Itemid ? updatedItem : item) // replace only the edited item
      )
    );
  } catch (error) {
    console.error("Status update failed:", error);
    alert("تعذر تحديث الحالة، حاول مرة أخرى.");
  }
};

const t = useTranslations("tables");
const TableHead = [t("teacher_codes"), t("last_teacher_code")];

const trainingData = data.map((item, index) => ({
  columns: [
    { type: "text", value: item.instructor_code },
    { type: "text", value: item.lst_tr_code },
  ],
}));

const formTitles = [
  {
    label:
      (formState === "add" ? t("add") + " " : t("edit") + " ") + ts("classes"),
    type: "text",
  },
  {
    label: formState === "add" ? t("add") + " " : t("edit"),
    type: "text",
  },
];

const fields = [{ name: "title", label: t("title"), type: "text" }];

function toogle() {
  setShowModal(!showModal);
}





   return (
     <>
       <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
         <OngoingTrain
           TableHead={TableHead}
           trainingData={trainingData}
           //    button={false}
           //    Icon={Pin}
           //    Icon2={Removebin}
         />
       </div>
     </>
   );
 }
 