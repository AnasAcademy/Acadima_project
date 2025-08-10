"use client";
import React, { useState } from "react";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import { useTranslations } from "next-intl";
import Editform from "@/components/Editform/Editform";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import Pen from "@/assets/admin/pen.svg";
import { useApiClient } from "@/hooks/useApiClient";

export default function ClassesTable({ dat }) {
  const ts = useTranslations("SidebarA");
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState(dat);
  const [datast, setDatast] = useState([]);
  const [datarg, setDatarg] = useState([]);
  const [Itemid, setId] = useState(null);
  const [page, setPage] = useState("classes");
  const t = useTranslations("tables");
  const { request } = useApiClient();

  // const fetchData = async (Itemid, page) => {
  //   try {
  //     const response = await request({
  //       method: "GET",
  //       urlPath: `https://api.lxera.net/api/development/organization/vodafone`, // Example: "/users/me"
  //     });
  //     if (page === "students") {
  //       dat = response.enrollments.data;
  //       setDatast(dat);
  //     } else {
  //       dat = response.data;
  //       setDatarg(dat);
  //       console.log(dat);
  //     }
  //   } catch (error) {
  //     console.error("Fetch failed:", error);
  //   }
  // };

  const fetchData = async (Itemid, page) => {
    try {
      const response = await request({
        method: "GET",
        urlPath: `/classes/${Itemid}/${page}`,
      });

      if (page === "students") {
        dat = response.enrollments.data;
        setDatast(dat);
      } else {
        dat = response.data;
        setDatarg(dat);
        console.log(dat);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const fetchpages = async (Itemid , page) => {
    console.log(Itemid);
    console.log(page);
    try {
      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/classes/${Itemid}/${page}`,
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
      if (page === "students") {
            dat = result.enrollments.data;
   setDatast(dat);
      }else{
          dat = result.data;
        setDatarg(dat);
          console.log(dat);
      }

    } catch (error) {
      console.error("Status update failed:", error);
      alert("تعذر تحديث الحالة، حاول مرة أخرى.");
    }
  };













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

  const TableHeadstudents = [
    "ID",
    t("student_code"),
    t("name"),
    t("national_id"),
    t("registered_diplomas"),
    t("registration_date"),
    t("status"),
    t("actions"),
  ];

  const TableHead = [
    "ID",
    t("title"),
    t("register_enrollments"),
    t("seat_students"),
    t("program_students"),
    t("direct_students"),
    t("scholarship_students"),
    t("creation_date"),
    t("start_date"),
    t("end_date"),
    t("actions"),
  ];

  const trainingDatareg = datarg.map((item, index) => ({
    columns: [
      { type: "text", value: item.id },
      { type: "text", value: item.full_name },
      {
        type: "text",
        value:
          item.applied_program?.translations?.length > 0
            ? item.applied_program.translations.map((t, index) => (
                <p key={index}>{t.title}</p>
              ))
            : "N/A",
      },
      //  { type: "text", value: item.slug },
      { type: "text", value: item.created_at },
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

  const trainingDatastudent = datast.map((item, index) => ({
    columns: [
      { type: "text", value: item.buyer.id },
      { type: "text", value: item.buyer.user_code },
      { type: "text", value: item.buyer.full_name },
      { type: "text", value: item.buyer.identity_scan || "N/A" },
      { type: "text", value: item.bundle.slug },
      { type: "text", value: item.buyer.created_at },
      { type: "text", value: item.buyer.status },
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
        ],
        id: item.id,
      },
    ],
  }));

  const trainingData = data.map((item, index) => ({
    columns: [
      { type: "text", value: item.id },
      { type: "text", value: item.title },
      { type: "text", value: item.register_enrollments },
      { type: "text", value: item.form_fee_enrollments },
      { type: "text", value: item.bundle_enrollments },
      { type: "text", value: item.direct_register_enrollments },
      { type: "text", value: item.scholarship_enrollments },
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

          {
            label: ts("students"),
            action: () => {
              setPage("students");
              setId(item.id);
              fetchData(item.id, "students");
              //  fetchpages(item.id, "students");
              setTitle(item.title);
              //  setId(item.id);
              //  getReqData(item.id);
            },
            icon: Pen,
          },
          {
            label: t("register_enrollments"),
            action: () => {
              setPage("registered_users");
              setId(item.id);
              fetchData(item.id, "registered_users");
              // fetchpages(item.id, "registered_users");
              //  setId(item.id);
              //  getReqData(item.id);
            },
            icon: Pen,
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
        ts("classes"),
      type: "text",
    },
    {
      label: formState === "add" ? t("add") + " " : t("edit"),
      type: "text",
    },
  ];

  const fields = [{ name: "title", label: t("title"), type: "text" }];

  const pageTitles = {
    classes: (
      <OngoingTrain
        TableHead={TableHead}
        trainingData={trainingData}
 
      />
    ),
    students: (
      <OngoingTrain
        TableHead={TableHeadstudents}
        trainingData={trainingDatastudent}
    
      />
    ),
    registered_users: (
      <OngoingTrain
        TableHead={TableHeadstudents}
        trainingData={trainingDatareg}
   
      />
    ),
  };

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
        <>
          <div className=" d-flex   justify-content-between  pb-3">
            {page === "classes" ? (
              <h2 className="hvvv">{ts("classes")}</h2>
            ) : null}{" "}
            {page === "students" ? (
              <h2 className="hvvv"> قائمة الطلاب {title}</h2>
            ) : null}{" "}
            {page === "registered_users" ? (
              <h2 className="hvvv">{t("students_list")}</h2>
            ) : null}{" "}
            <button
              className="btn btn-light custfontbtn"
              onClick={() => {
                setPage("classes");
              }}
            >
              {t("back")}
            </button>
          </div>
          <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht ">
            {pageTitles[page]}
          </div>
        </>
      )}
    </>
  );
}
