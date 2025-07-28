
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

  export default function ElectronicServiceTable({ dat, current_page, last_page }) {
    const [currentPage, setCurrentPage] = useState(current_page);
    const [showModal, setShowModal] = useState(false);
    const [Itemid, setId] = useState(null);
    const t = useTranslations("tables");
    const ts = useTranslations("SidebarA");
    const [data, setData] = useState(dat);
    const [formState , setFormState] = useState("")
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

    console.log(result.service);
    const newItem = result.service;
    setData((prev)=>[...prev , newItem])
 
  } catch (error) {
    console.error("Status update failed:", error);
    alert("تعذر تحديث الحالة، حاول مرة أخرى.");
  }
};









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
    ];

    const trainingData = data.map((item, index) => ({
      columns: [
        { type: "text", value: index+1 },
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
              label: t("edit"),
              action: () => {
                setShowModal(!showModal);
                setId(item.id);
                setFormState("edit")
              },
              color: "#48BB78",
            },
            {
              label: t("delete"),
              action: () => remove(item.id),
              color: "#fc544b",
            },
          ],
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
      { name: "price", label: t("price"), type: "text" },
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
              data={data}
              formTitles={formTitles}
              handleSubmitEdit={handleSubmitEdit}
              setShowModal={toogle}
              handleSubmitAdd={handleSubmitAdd}
              formState={formState}
            />
          </div>
        ) : (
          <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht">
            <div className=" d-flex justify-content-end ">
              <button
                className=" btn  btn-light custfontbtn "
                onClick={()=>{
                       setShowModal(true);
                        setFormState("add");
                        
                }}
              >
                {" "}
                {t("add_new_service")}{" "}
              </button>
            </div>

            <OngoingTrain
              TableHead={TableHead}
              trainingData={trainingData}
              button={false}
              Icon={Pin}
              Icon2={Removebin}
            />

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
  