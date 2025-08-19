"use client"
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import X from "@/assets/admin/x.svg";
import Pen from "@/assets/admin/pen.svg";
import Arrowdown from "@/assets/admin/arrow down.svg";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import Editform from "@/components/Editform/Editform";
import AlertModal from "@/components/AlertModal/AlertModal";
import { useApiClient } from "@/hooks/useApiClient";
import { useUserData } from "@/context/UserDataContext";
export default function CategoriesTable({ dat }) {
  const t = useTranslations("tables");
  const {  getStatusOptions } = useUserData();
  const ts = useTranslations("SidebarA");
  const tr = useTranslations("employee_progress");
  const [showModal, setShowModal] = useState(false);
  const [formState , setFormState] = useState("")
  const [data, setData] = useState(dat);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [Itemid, setId] = useState(null);
  const [reqtable , setReqTable] = useState([])
  const [Alertmssg, setAlertmssg] = useState("");
  const [subcat ,setSubcat] = useState(false)
    const [sub, setSub] = useState([]);
  const { request } = useApiClient();

//  async function fetchy(stat) {
//    const newPage = stat === "up" ? currentPage + 1 : currentPage - 1;

//    if (stat === "up") {
//      setCurrentPage(currentPage + 1);
//    } else {
//      setCurrentPage(currentPage - 1);
//    }

//    try {
//      const data = await fetch(
//        `https://api.lxera.net/api/development/organization/vodafone/services?page=${newPage}`,
//        {
//          method: "GET",
//          headers: {
//            "x-api-key": "1234",
//            "Content-Type": "application/json",
//            Authorization:
//              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
//          },
//        }
//      );

//      const respond = await data.json();
//      console.log("go", respond.data.data);
//      dat = respond.data.data;
//      setData(dat);
//    } catch (error) {
//      console.error("Fetch error:", error);
//    }
//  }

 const remove = async (id) => {
   try { 

    const data = await request({ method: "DELETE", urlPath: `categories/${id}/delete` });
     setData((prev) => prev.filter((item) => item.id !== id));

   } catch (error) {
     console.error("Status update failed:", error);
     alert("تعذر تحديث الحالة، حاول مرة أخرى.");
   }
 };

const getSubcatData = async (Itemid) => {
  try {
    const result = await request({
      method: "GET",
      urlPath: `/categories/subCategories/${Itemid}`,
    });
     
    console.log(result);
      setData(result.message.subCategories.data);
       setSubcat(true);
  } catch (error) {
    console.error("Status update failed:", error);
    alert("تعذر تحديث الحالة، حاول مرة أخرى.");
  }
};


const getreqData = async (Itemid) => {
  try {
    const result = await request({
      method: "GET",
      urlPath: `/categories/${Itemid}`,
    });

    const res = result.data.category_requirements;
    const sub = result.data.sub_categories;
    console.log(res , sub)
   setReqTable( res);
   setSub(sub)
   
   
  } catch (error) {
    console.error("Status update failed:", error);
    alert("تعذر تحديث الحالة، حاول مرة أخرى.");
  }
};


 const handleSubmitEdit = async (dataa) => {
        console.log( ' this data ' ,dataa)
        console.log(dataa.has_sub === 0 ? "off" : "on");
   try {
     const result = await request({
       method: "PUT",
       urlPath: `/categories/${Itemid}`,
       body: {
         title: dataa.title,
         status: dataa.status,
         icon: dataa.icon,
         slug: dataa.slug,
         has_sub: dataa.has_sub === 0 ? "off" : "on",
         sub_categories: dataa.sub_categories,
         requirements: dataa.requirements,
       },
     });


     if (result.errors) {
       const messages = Object.values(result.errors).map((error) => error.ar);
       setAlertmssg(messages.join("\n"));
       setShowAlertModal(true);
     } else {
       const updatedItem = {
         ...data.find((item) => item.id === Itemid),
         ...dataa,
       };
       setData((prev) =>
         prev.map(
           (item) => (item.id === Itemid ? updatedItem : item) // replace only the edited item
         )
       );

       setShowModal(false);
     }
   } catch (error) {
     console.error("Status update failed:", error);
     alert("تعذر تحديث الحالة، حاول مرة أخرى.");
   }
 };

//  const handleSubmitAdd = async (dataa) => {
//    console.log(dataa.description);
//    try {
//      const response = await fetch(
//        `https://api.lxera.net/api/development/organization/vodafone/services`,
//        {
//          method: "POST",
//          headers: {
//            "x-api-key": "1234",
//            "Content-Type": "application/json",
//            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
//          },
//          body: JSON.stringify({
//            title: dataa.title,
//            description: dataa.description,
//            price: dataa.price,
//            start_date: dataa.start_date,
//            end_date: dataa.end_date,
//            status: dataa.status,
//            target: dataa.target,
//          }),
//        }
//      );

//      const result = await response.json();

//      if (result.service) {
//        console.log(result.service);
//        const newItem = result.service;
//        setData((prev) => [...prev, newItem]);
//        //  Success Alert

//        alert("تمت الإضافة بنجاح ");
//        setShowModal(false);
//      } else {
//        alert("فشل في الإضافة، يرجى المحاولة مرة أخرى.");
//      }
//    } catch (err) {
//      console.error("Status update failed:", err);
//      alert("تعذر تحديث الحالة، حاول مرة أخرى.");
//    }
//  };


 function toogle() {
   setShowModal(!showModal);
 }


  const TableHead = [
    t("icon"),
    t("order"),
    t("title"),
    !subcat && t("subCategories"),
    t("chapters"),
    t("teachers"),
    t("status"),
    t("actions"),
  ].filter(Boolean);

  const trainingData = data.map((item, index) => ({
    columns: [
      { type: "text", value: item.icon || "icon" },
      { type: "text", value: item.order },
      { type: "text", value: item.title },
      !subcat && {
        type: "buttons",
        buttons: [
          {
            label: item.subCategoriesCount + " تصنيفات",
            color: "#0dac0dff",
            action: () => {
              if (item.subCategoriesCount <= 0) {
                console.log(item.subCategoriesCount);
              } else {
                getSubcatData(item.id);
              }
            },
          },
        ],
        id: item.id,
      },
    
      // {
      //   type: "buttons",
      //   label: item.subCategories,
      //   action: () => {
      //
      //   },
      // },
      { type: "text", value: item.courses_count },
      { type: "text", value: item.teachers_count },
      { type: "text", value: item.status },
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
              getreqData(item.id);
              setFormState("edit");
            },
            icon: Pen,
          },
          {
            label: t("delete"),
            action: () => remove(item.id),
            icon: X,
          },
        ],
        id: item.id,
      },
    ].filter(Boolean),
  }));


const formTitles = [
  {
    label:
      (formState === "add" ? t("add") + " " : t("edit") + " ") +
      ts("categories"),
       type: "text",
  },
  { label: formState === "add" ? t("add") + " " : t("edit"), type: "text" },
];

const fields = [
  { name: "title", label: t("title"), type: "text" },
  {
    name: "status",
    label: t("status"),
    type: "select",
    // getStatusOptions().filter((item) => item.value !== "pending") ||
    options: [
      { label: "active", value: "active" },
      { label: "inactive", value: "inactive" },
    ],
  },

  { name: "icon", label: t("icon"), type: "text" },
  { name: "slug", label: "url", type: "text" },
  {
    name: "has_sub",
    label: t("sub_cat_included"),
    type: "checkbox01",
    required: true, // set true if you need it to be 1
    checkboxLabel: t("sub_cat_included"), // optional; otherwise falls back to `label`
  },
];



  return (
    <>
      <div>
        <h2 className="hvvv">{ subcat ? t("subCategories") : ts("categories") }</h2>
      </div>
      {showModal ? (
        <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
          <Editform
            fields={fields}
            data={data.find((item) => item.id === Itemid) || {}}
            formTitles={formTitles}
            handleSubmitEdit={handleSubmitEdit}
            setShowModal={toogle}
            //  handleSubmitAdd={handleSubmitAdd}
            formState={formState}
            extraForm={true}
            reqtble = {reqtable}
            setReqTable = {setReqTable}
            sub={sub}
            setSub={setSub}
          />

          <AlertModal
            show={showAlertModal}
            onClose={() => setShowAlertModal(false)}
            onSubmit={() => console.log("submitted")}
            title="? Are you sure you want to delete this user"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                DeleteUser();
              }}
            >
              <div className="mb-3">
                <p className="m-0 text-center">{Alertmssg}</p>
              </div>
            </form>
          </AlertModal>
        </div>
      ) : (
        <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
          <OngoingTrain TableHead={TableHead} trainingData={trainingData} />

          {/* <div className="row justify-content-center align-items-center gap-3 mt-3">
                     <button
                       disabled={currentPage === 1}
                       className="btn custfontbtn col-1"
                       onClick={() => {
                         fetchy("down");
                       }}
                     >
                       {t("previous-page")}
                     </button>
                     <span className="px-2 align-self-center col-1 text-center">
                       {t("page")} {currentPage}
                     </span>
                     <button
                       disabled={currentPage === last_page}
                       className="btn custfontbtn col-1"
                       onClick={() => {
                         fetchy("up");
                       }}
                     >
                       {t("next-page")}
                     </button>
                   </div> */}
        </div>
      )}
    </>
  );
}
