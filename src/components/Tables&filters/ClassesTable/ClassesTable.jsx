   "use client";
  import React, { useState } from "react";
   import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
   import { useTranslations } from "next-intl";
     import Editform from "@/components/Editform/Editform";
      import Arrowdown from "@/assets/admin/arrow down.svg";
       import X from "@/assets/admin/x.svg";
       import Pen from "@/assets/admin/pen.svg";
   export default function ClassesTable({dat}) {
    
        const ts = useTranslations("SidebarA");
        const [showModal, setShowModal] = useState(false);
        const [formState , setFormState] = useState("")
        const [data, setData] = useState(dat);
        const [Itemid, setId] = useState(null);
        const [page, setPage] = useState("");

        
        // const pageTitles = [
        //   { 
        //     edit: ,
        //     students: ,

        //   }




      const handleSubmitEdit = async (dataa) => {
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
     const TableHead = [
       "ID",
       t("title"),
       t("seat_students"),
       t("program_students"),
       t("direct_students"),
       t("scholarship_students"),
       t("creation_date"),
       t("start_date"),
       t("end_date"),
       t("actions"),
     ];

     const trainingData = data.map((item, index) => ({
       columns: [
         { type: "text", value: item.id },
         { type: "text", value: item.title },
         { type: "text", value: 7 },
         { type: "text", value: 7 },
         { type: "text", value: 9 },
         { type: "text", value: 9 },
         { type: "text", value: item.start_date },
         { type: "text", value: item.end_date },
         { type: "text", value: item.created_at },
         {
           type: "actionbutton",
           label: t("actions"),
           action: () => {
             setShowModal(!showModal);
             setId(item.id);
             setFormState("edit");
           },
           icon: Arrowdown,
           color: "#48BB78",
           lists: [
             {
               label: t("edit"),
               action: () => {
                 setShowModal(!showModal);
                 setId(item.id);
                 setFormState("edit");
               },
               icon: Pen,
             },
             {
               label: t("delete"),
               action: () => remove(item.id),
               icon: X,
             },

            //  {
            //    label: ts("students"),
            //    action: () => {
            //      setId(item.id);
            //      getReqData(item.id);
            //      setReqtble(true);
            //    },
            //    icon: Pen,
            //  },
           ],
           id: item.id,
         },
       ],
     }));

   



    const formTitles = [
      {
        label:
          (formState === "add" ? t("add") + " " : t("edit") + " ") +
          ts("classes"),
        type: "text",
      },
      { label: formState === "add" ? t("add") + " " : t("edit"), type: "text" },
    ];

    const fields = [
      { name: "title", label: t("title"), type: "text" },

    ];


    function toogle() {
      setShowModal(!showModal);
    }
     return (
       <>
         {showModal ? (
           <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
             <Editform
               fields={fields}
               data={data}
               formTitles={formTitles}
               handleSubmitEdit={handleSubmitEdit}
               setShowModal={toogle}
            // handleSubmitAdd={handleSubmitAdd}
               formState={formState}
             />
           </div>
         ) : (
           <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht ">
             <OngoingTrain
               TableHead={TableHead}
               trainingData={trainingData}
               //  button={false}
               //  Icon={Pin}
               //  Icon2={Removebin}
             />
           </div>
         )}
       </>
     );
   }
   