
'use client'
  import React, { useState } from 'react'
  import { useTranslations } from "next-intl";
  import Pin from "@/assets/admin/pin.svg";
  import Removebin from "@/assets/admin/removebin.svg";
  import roundimage from "@/assets/admin/personla.png";
  import FilterCard from "@/components/FilterCard/FilterCard";
  import SelectCard from "@/components/SelectCard/SelectCard";
 import AlertModal from "@/components/AlertModal/AlertModal";
  import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
  import Editform from "@/components/Editform/Editform";

  export default function ElectronicServiceTable({dat}) {

  const [showModal, setShowModal] = useState(false);
const [Itemid, setId] = useState(null);
 const t = useTranslations("tables");
  const ts = useTranslations("SidebarA");

 const [data , setData] = useState(dat)

//  const remove = async (id) => {
//   try {
//     const response = await fetch(
//       `https://api.lxera.net/api/development/organization/vodafone/services/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "x-api-key": "1234",
//           "Content-Type": "application/json",
//           Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
//         },
//       }
//     );

//     const data = await response.json();

//          setData((prev) => prev.filter((item) => item.id !== id));

//     console.log(data.message)
 
//   } catch (error) {
//     console.error("Status update failed:", error);
//     alert("تعذر تحديث الحالة، حاول مرة أخرى.");
//   }
// };


const handleSubmit = async (dataa) => {
   console.log(dataa.description);
  try {
    const response = await fetch(
      `https://api.lxera.net/api/development/organization/vodafone/services/${Itemid}`,
      {
        method: "PUT",
        headers: {
          "x-api-key": "1234",
          "Content-Type": "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
        },
        body: JSON.stringify({
          title: dataa.title,
         description: dataa.description,
          
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
 
   function toogle(){ 
    console.log("afsdf")
setShowModal(!showModal)

  }



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
    ];

    const trainingData = data.map((item, index) => ({
      columns: [
        { type: "text", value: item.id },
        { type: "text", value: item.title },
        { type: "text", value: item.description },
        { type: "text", value: item.price },
        { type: "text", value: item.status },
        { type: "text", value: item.created_by },
        { type: "text", value: item.created_at },
        { type: "text", value: item.start_date },
        { type: "text", value: item.end_date },

        {
          type: "buttons",
          buttons: [
            {
              label: "تعديل",
            action: () => {
              console.log("here")
      setShowModal(!showModal);
      setId(item.id);
                 } ,
              color: "#48BB78",
            },
            { 
              label:"حذف",
              action: () => remove(item.id),
              color: "#fc544b",
            },
          ],
        },
      ],
    }));


      const formTitles = [
        { label: "تعديل "  + ts("electronic-services"), type: "text" },
        { label: "تعديل", type: "text" },
      ];

      
       const fields = [
         { name: "title", label: t("title"), type: "text" },
         { name: "description", label: t("desc"), type: "text" },
         { name: "price", label: t("price"), type: "text" },
         { name: "status", label: t("status"), type: "text" },
         { name: "creator", label: t("creator"), type: "text" },
         { name: "creation_date", label: t("creation_date"), type: "text" },
         { name: "start_date", label: t("start_date"), type: "text" },
         { name: "end_date", label: t("end_date"), type: "text" },
       ];

    return (
      <>
        {showModal ? (
          <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
            <Editform
              fields={fields}
              data={data}
              formTitles={formTitles}
              handleSubmit={handleSubmit}
              setShowModal={toogle}
            />
          </div>
        ) : (
          <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
            <OngoingTrain
              TableHead={TableHead}
              trainingData={trainingData}
              button={false}
              Icon={Pin}
              Icon2={Removebin}
            />
          </div>
        )}
      </>
    );
  }
  