
'use client'
import React, { useState } from 'react'
 import { useTranslations } from "next-intl";
 import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
  import Editform from "@/components/Editform/Editform";
 import Arrowdown from "@/assets/admin/arrow down.svg"
 import X from "@/assets/admin/x.svg";
 import Pen from "@/assets/admin/pen.svg"
 import { useApiClient } from "@/hooks/useApiClient";
 import AlertModal from "@/components/AlertModal/AlertModal"
  export default function ElectronicServiceTable({ dat, current_page, last_page }) {
    const [currentPage, setCurrentPage] = useState(current_page);
    const [showModal, setShowModal] = useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [Alertmssg, setAlertmssg] = useState("");
    const [Itemid, setId] = useState(null);
    const t = useTranslations("tables");
    const ts = useTranslations("SidebarA");
    const [data, setData] = useState(dat);
    const [formState , setFormState] = useState("");
    const [reqtble , setReqtble]   = useState(false)
    const [reqtbledata, setReqtbledata] = useState([]);

    const { request } = useApiClient();
    
    async function fetchy(stat) {
      const newPage = stat === "up" ? currentPage + 1 : currentPage - 1;

      if (stat === "up") {
        setCurrentPage(currentPage + 1);
      } else {
        setCurrentPage(currentPage - 1);
      }

      try {
        const data = await fetch(
          `https://api.lxera.net/api/development/organization/vodafone/services?page=${newPage}`,
          {
            method: "GET",
            headers: {
              "x-api-key": "1234",
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
            },
          }
        );

        const respond = await data.json();
        console.log("go", respond.data.data);
        dat = respond.data.data;
        setData(dat);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    const remove = async (id) => {
      try {
        const response = await fetch(
          `https://api.lxera.net/api/development/organization/vodafone/services/${id}`,
          {
            method: "DELETE",
            headers: {
              "x-api-key": "1234",
              "Content-Type": "application/json",
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
            },
          }
        );

        const data = await response.json();

        setData((prev) => prev.filter((item) => item.id !== id));

        console.log(data.message);
      } catch (error) {
        console.error("Status update failed:", error);
        alert("تعذر تحديث الحالة، حاول مرة أخرى.");
      }
    };

    const handleSubmitEdit = async (dataa) => {
      console.log(dataa.title);
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
              title:  dataa.title ||  "null" ,
              description: dataa.description,
              price:dataa.price
          
            }),
          }
        );

        const result = await response.json();


        console.log(result.message);

     if (result.errors) {
         const messages = Object.values(result.errors).map((error) => error.ar);
         console.log("help")
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

const handleSubmitAdd = async (dataa) => {
  console.log(dataa.description);
  try {
    const response = await fetch(
      `https://api.lxera.net/api/development/organization/vodafone/services`,
      {
        method: "POST",
        headers: {
          "x-api-key": "1234",
          "Content-Type": "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
        },
        body: JSON.stringify({
          title: dataa.title,
          description: dataa.description,
          price: dataa.price,
          start_date: dataa.start_date,
          end_date: dataa.end_date,
          status: dataa.status,
          target: dataa.target,
        }),
      }
    );

    const result = await response.json();

    if (result.service) {
      console.log(result.service);
      const newItem = result.service;
      setData((prev) => [...prev, newItem]);
      // ✅ Success Alert

      alert("تمت الإضافة بنجاح ✅");
      setShowModal(false);
    } else {
      alert("فشل في الإضافة، يرجى المحاولة مرة أخرى.");
    }



   
  } catch (err) {
    console.error("Status update failed:", err);
    alert("تعذر تحديث الحالة، حاول مرة أخرى.");
  }
};


const getReqData = async(id)=>{


 try {
  
     const response = await fetch(
       `https://api.lxera.net/api/development/organization/vodafone/services/${id}/requests`,
       {
         method: "GET",
         headers: {
           "x-api-key": "1234",
           "Content-Type": "application/json",
           Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
         },
       }
     );

  const result = await response.json();
    console.log(result.service_users.data);
   setReqtbledata(result.service_users.data);

 } catch (error) {
  
 }









}
  





    function toogle() {
  
      setShowModal(!showModal);
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
      t("actions"),
    ];


      const TableHeadReq = [
        "#",
        t("student"),
        t("student_name"),
        t("request_status"),
        t("request_content"),
        t("request_date"),
        // t("admin"),
        // t("actions"),
      ];


   

const reqDat = reqtbledata.map((item, index) => ({
  columns: [
    { type: "text", value: index + 1 },
    { type: "text", value: item.id },
    { type: "text", value: item.user.full_name },
    { type: "text", value: item.status },
    { type: "text", value: item.content },
    { type: "text", value: item.created_at },
    // { type: "text", value: item.content },
  ],
}));




    const trainingData = data.map((item, index) => ({
      columns: [
        { type: "text", value: index + 1 },
        { type: "text", value: item.title },
        { type: "text", value: item.description },
        { type: "text", value: item.price },
        { type: "text", value: item.status },
        { type: "text", value: item.created_by.full_name },
        { type: "text", value: item.created_at },
        { type: "text", value: item.start_date },
        { type: "text", value: item.end_date },
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
              label: t("requests"),
              action: () => {
                setId(item.id);
                getReqData(item.id);
                setReqtble(true);
              },
              icon: Pen,
            },

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
          ],
          id: item.id,
        },
      ],
    }));

    const formTitles = [
      {
        label:
          (formState === "add" ? t("add") + " " : t("edit") + " ") +
          ts("electronic-services"),
        type: "text",
      },
      { label: formState === "add" ? t("add") + " " : t("edit"), type: "text" },
    ];

    const fields = [
      { name: "title", label: t("title"), type: "text" },
      { name: "description", label: t("desc"), type: "text" },
      { name: "price", label: t("price"), type: "number" },
      { name: "status", label: t("status"), type: "text" },
      { name: "target", label: t("creator"), type: "text" },
      { name: "start_date", label: t("start_date"), type: "text" },
      { name: "end_date", label: t("end_date"), type: "text" },
    ];

    return (
      <>
        {showModal ? (
          <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
            <Editform
              fields={fields}
              data={data.find((item) => item.id === Itemid) || {}}
              formTitles={formTitles}
              handleSubmitEdit={handleSubmitEdit}
              setShowModal={toogle}
              handleSubmitAdd={handleSubmitAdd}
              formState={formState}
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
            <div className=" d-flex justify-content-end  ">
              {reqtble ? (
                <div className=" d-flex justify-content-between w-100">
                  <h4>خدمة {}   </h4>

                  <button
                    className="btn  btn-light custfontbtn "
                    onClick={() => {
                      setReqtble(false);
                 
                    }}
                  >
                    {" "}
                    back
                  </button>
                </div>
              ) : (
                <button
                  className=" btn  btn-light custfontbtn "
                  onClick={() => {
                    setShowModal(true);
                    setId(null);
                    setFormState("add");
                  }}
                >
                  {" "}
                  {t("add_new_service")}{" "}
                </button>
              )}
            </div>
            {reqtble ? (
              <>
                <OngoingTrain TableHead={TableHeadReq} trainingData={reqDat} />
              </>
            ) : (
              <OngoingTrain TableHead={TableHead} trainingData={trainingData} />
            )}

            <div className="row justify-content-center align-items-center gap-3 mt-3">
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
            </div>
          </div>
        )}
      </>
    );
  }
  