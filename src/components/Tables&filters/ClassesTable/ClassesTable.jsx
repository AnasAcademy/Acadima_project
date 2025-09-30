"use client";
import React, { useState } from "react";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import { useTranslations } from "next-intl";
import Editform from "@/components/Editform/Editform";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import Pen from "@/assets/admin/pen.svg";
import { useApiClient } from "@/hooks/useApiClient";
import AlertModal from "@/components/AlertModal/AlertModal";
import { useUserData } from "@/context/UserDataContext";
import { object } from "yup";
import { formatDate } from "@/functions/formatDate";

export default function ClassesTable({ dat }) {
  
  const ts = useTranslations("SidebarA");
  const tr = useTranslations("settings");
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState(dat);
  const [datast, setDatast] = useState([]);
  const [Sdata, setSData] = useState([]);
  const [datarg, setDatarg] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [Itemid, setId] = useState(null);
  const [student, setStudent] = useState(false);
  const [page, setPage] = useState("classes");
  const t = useTranslations("tables");
  const [resultMessage, setResultMessage] = useState("");
  const { getRoleOptions, getStatusOptions } = useUserData();
  const { request } = useApiClient();
  const [showResultModal, setShowResultModal] = useState(false);

  const fetchData = async (Itemid, page) => {
    try {
      const response = await request({
        method: "GET",
        urlPath: `/classes/${Itemid}/${page}`,
      });

      if (page === "students") {
        dat = response.enrollments.data;
        setDatast(dat);
      } else if (page === "registered_users") {
        dat = response.data;
        setDatarg(dat);
      } else if (page === "users") {
        dat = response.data;
        setDatast(dat);
      } else if (page === "enrollers") {
        dat = response.message.data;
        setDatast(dat);
      } else if (page === "direct_register") {
        dat = response.data;
        setDataUser(dat);
      } else if (page === "scholarship") {
        dat = response.data;
        setDatast(dat);
      } else if (page === "requirements") {
        dat = response.data;
        setDataUser(dat);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const fetchStudents = async (Itemid) => {
    try {
      const response = await request({
        method: "GET",
        urlPath: `/students/${Itemid}`,
      });
      setSData(response[0][0]);
      console.log(response[0][0]);
    } catch (error) {
      console.error("Fetch students failed:", error);
    }
  };

  const remove = async (id) => {
    try {
      const data = await request({
        method: "DELETE",
        urlPath: `/classes/${id}`,
      });
      setData((prev) => prev.filter((item) => item.id !== id));
      if (data.success) {
        setShowModal(false);
        setResultMessage(data.message);
        setShowResultModal(true);
      }
    } catch (error) {
      console.error("Status update failed:", error);
      alert("تعذر تحديث الحالة، حاول مرة أخرى.");
    }
  };

  const handleSubmitEdit = async (dataa) => {
    console.log(dataa);
    try {
      const result = await request({
        method: "PUT",
        urlPath: `/classes/${Itemid}`,
        body: {
          title: dataa.title,
          start_date: dataa.start_date,
          end_date: dataa.end_date,
        },
      });
      if (result.message) {
        setShowModal(false);
        setResultMessage(result.message);
        setShowResultModal(true);
      }

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

      const { errors } = error.data;

      const firstKey = Object.keys(errors)[0]; // e.g., "status" or "title"
      const message = errors[firstKey]?.ar;
      console.error("Update failed:", message);

      setResultMessage(message);
   
      setShowResultModal(true);
    }
  };

  const handleSubmitAdd = async (dataa) => {
    console.log("here ", dataa);
    Object.keys(dataa).forEach((key) => {
      if (dataa[key] === "") {
        dataa[key] = null;
      }
    });
    console.log(dataa);
    try {
      const result = await request({
        method: "POST",
        urlPath: `/classes`,
        body: {
          title: dataa.title,
          start_date: dataa.start_date,
          end_date: dataa.end_date,
        },
      });
      if (result.message === "تم اضافة دفعة جديدة بنجاح") {
        setShowModal(false);
        setResultMessage(result.message);
        setShowResultModal(true);
      }
      const newItem = {
        id: result.id,
        title: dataa.title,
        start_date: dataa.start_date,
        end_date: dataa.end_date,
      };
      setData((prev) => [...prev, newItem]); // Add the new item to the existing data
    } catch (error) {
    const { errors } = error.data;

    const firstKey = Object.keys(errors)[0]; // e.g., "status" or "title"
    const message = errors[firstKey]?.ar;
    console.error("Update failed:", message);

    setResultMessage(message);

    setShowResultModal(true);
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

  const TableHeadregstudents = [
    "ID",
    t("name"),
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
      { type: "text", value: item.full_name || "-" },
      {
        type: "text",
        value:
          item.applied_program?.translations?.length > 0
            ? item.applied_program.translations.map((t, index) => (
                <p key={index}>{t.title}</p>
              ))
            : "-",
      },
      //  { type: "text", value: item.slug },
      { type: "text", value: formatDate(item.created_at) || "-" },
      { type: "label", value: item.status || "-" },
      {
        type: "actionbutton",
        label: t("actions"),
        action: () => {
          setShowModal(!showModal);

          setStudent(true);
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
              fetchStudents(item.id);
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
      { type: "text", value: item.buyer.user_code || "-" },
      { type: "text", value: item.buyer.full_name || "-" },
      { type: "text", value: item.buyer.identity_scan || "-" },
      { type: "text", value: item.bundle.slug || "-" },
      { type: "text", value: formatDate(item.buyer.created_at) || "-" },
      { type: "label", value: item.buyer.status || "-" },
      {
        type: "actionbutton",
        label: t("actions"),
        action: () => {
          setShowModal(!showModal);

          setFormState("edit");
        },
        icon: Arrowdown,
        color: "#48BB78",
        lists: [
          {
            label: t("edit"),
            action: () => {
              setShowModal(!showModal);
              setId(item.buyer.id);
              console.log(item.buyer.id);
              setStudent(true);
              setFormState("edit");
              fetchStudents(item.buyer.id);
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

  const trainingDatadirect = dataUser.map((item, index) => ({
    columns: [
      { type: "text", value: item.student.id || "-" },
      { type: "text", value: item.student.user_id || "-" },
      { type: "text", value: item.student.ar_name || "-" },
      { type: "text", value: item.student.identity_scan || "-" },
      { type: "text", value: item.bundle.slug || "-" },
      { type: "text", value: formatDate(item.student.created_at) || "-" },
      { type: "label", value: item.student.status || "-" },
      {
        type: "actionbutton",
        label: t("actions"),
        action: () => {
          setShowModal(!showModal);

          setStudent(true);
          setFormState("edit");
        },
        icon: Arrowdown,
        color: "#48BB78",
        lists: [
          {
            label: t("edit"),
            action: () => {
              setShowModal(!showModal);
              setId(item.student.id);
              console.log(item.student.id);
              setFormState("edit");
              fetchStudents(item.student.user_id);
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
      { type: "text", value: item.id || "-" },
      { type: "text", value: item.title || "-" },
      { type: "text", value: item.register_enrollments || "-" },
      { type: "text", value: item.form_fee_enrollments || "-" },
      { type: "text", value: item.bundle_enrollments || "-" },
      { type: "text", value: item.direct_register_enrollments || "-" },
      { type: "text", value: item.scholarship_enrollments || "-" },
      { type: "text", value: formatDate(item.start_date) || "-" },
      { type: "text", value: formatDate(item.end_date) || "-" },
      { type: "text", value: formatDate(item.created_at) || "-" },
      {
        type: "actionbutton",
        label: t("actions"),
        action: () => {
          setShowModal(!showModal);
          setId(item.id);
          console.log(item.id);
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
              console.log(item.id);
              setStudent(false);
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
              console.log(item.id);
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
          {
            label: t("ListReserveSeat"),
            action: () => {
              setPage("users");
              setId(item.id);
              fetchData(item.id, "users");
              // fetchpages(item.id, "registered_users");
              //  setId(item.id);
              //  getReqData(item.id);
            },
            icon: Pen,
          },
          {
            label: t("Program Registration"),
            action: () => {
              setPage("enrollers");
              setId(item.id);
              fetchData(item.id, "enrollers");
              // fetchpages(item.id, "registered_users");
              //  setId(item.id);
              //  getReqData(item.id);
            },
            icon: Pen,
          },
          {
            label: t("Direct Registration"),
            action: () => {
              setPage("direct_register");
              setId(item.id);
              fetchData(item.id, "direct_register");
              // fetchpages(item.id, "registered_users");
              //  setId(item.id);
              //  getReqData(item.id);
            },
            icon: Pen,
          },
          {
            label: t("register_scholarship"),
            action: () => {
              setPage("scholarship");
              setId(item.id);
              fetchData(item.id, "registered_users");
              // fetchpages(item.id, "registered_users");
              //  setId(item.id);
              //  getReqData(item.id);
            },
            icon: Pen,
          },
          {
            label: t("req_form"),
            action: () => {
              setPage("requirements");
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

  const handleSubmitEditStudent = async (dataa) => {
    console.log("here ", dataa);
    console.log(Itemid);

    Object.keys(dataa).forEach((key) => {
      if (dataa[key] === "") {
        dataa[key] = null;
      }
    });

    console.log(dataa);
    try {
      const result = await request({
        method: "PUT",
        urlPath: `/users/${Itemid}`,
        body: {
          full_name: dataa.full_name,
          en_name: dataa.en_name,
          role_name: dataa.role_name,
          email: dataa.email,
          mobile: dataa.mobile,
          password: dataa.password,
          bio: dataa.bio,
          about: dataa.about,
          status: dataa.status,
        },
      });
      if (result.message === "User updated successfully") {
        setShowModal(false);
        setResultMessage(result.message);
        setShowResultModal(true);
      } else {
        console.log(result.errors);
      }

     console.log("item id is ", Itemid);

      const updatedItem = {
        ...data.find((item) => item.id === Itemid),
        ...dataa,
      };

      console.log(updatedItem);

      const updated = setDatast((prev) => {
        prev.map(
          (item) => (item.id == Itemid ? updatedItem : item) // replace only the edited item
        );

        console.log("Prev:", prev);
        console.log("Updated:", updated);
      });
    } catch (error) {
  

  const { errors } = error.data;

  const firstKey = Object.keys(errors)[0]; // e.g., "status" or "title"
  const message = errors[firstKey]?.ar;
  console.error("Update failed:", message);

  setResultMessage(message);

  setShowResultModal(true);
    }
  };

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

  const fields = [
    { name: "title", label: t("title"), type: "text" },
    { name: "start_date", label: t("start_date"), type: "date" },
    { name: "end_date", label: t("end_date"), type: "date" },
  ];

  const studentFields = [
    { name: "full_name", label: tr("full_name"), type: "text" },
    { name: "en_name", label: tr("en_name"), type: "text" },
    {
      name: "role_name",
      label: tr("user_role"),
      type: "select",
      options: getRoleOptions(),
    },
    { name: "email", label: tr("email"), type: "text" },
    { name: "mobile", label: tr("mobile"), type: "text" },
    { name: "password", label: tr("password"), type: "text" },
    { name: "bio", label: tr("bio"), type: "text" },
    { name: "about", label: tr("about"), type: "text" },
    {
      name: "status",
      label: t("status"),
      type: "select",
      options: getStatusOptions(),
    },
  ];

  const pageTitles = {
    classes: <OngoingTrain TableHead={TableHead} trainingData={trainingData} />,
    students: (
      <OngoingTrain
        TableHead={TableHeadstudents}
        trainingData={trainingDatastudent}
      />
    ),
    registered_users: (
      <OngoingTrain
        TableHead={TableHeadregstudents}
        trainingData={trainingDatareg}
      />
    ),
    users: (
      <OngoingTrain
        TableHead={TableHeadstudents}
        trainingData={trainingDatastudent}
      />
    ),
    enrollers: (
      <OngoingTrain
        TableHead={TableHeadstudents}
        trainingData={trainingDatastudent}
      />
    ),
    direct_register: (
      <OngoingTrain
        TableHead={TableHeadstudents}
        trainingData={trainingDatadirect}
      />
    ),
    scholarship: (
      <OngoingTrain
        TableHead={TableHeadstudents}
        trainingData={trainingDatastudent}
      />
    ),
    requirements: (
      <OngoingTrain
        TableHead={TableHeadstudents}
        trainingData={trainingDatastudent}
      />
    ),
  };

  function toogle() {
    setShowModal(!showModal);
  }
  return (
    <>
      {showModal ? (
        <div className="rounded-4 shadow-sm p-md-4 p-2 container-fluid cardbg min-train-ht">
          {student ? (
            <Editform
              fields={studentFields}
              data={Sdata || {}}
              formTitles={formTitles}
              handleSubmitEdit={handleSubmitEditStudent}
              setShowModal={toogle}
              formState={formState}
              setId={setId}
            />
          ) : (
            <Editform
              fields={fields}
              data={data.find((item) => item.id === Itemid) || {}}
              formTitles={formTitles}
              handleSubmitEdit={handleSubmitEdit}
              setShowModal={toogle}
              handleSubmitAdd={handleSubmitAdd}
              formState={formState}
            />
          )}
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
            {page === "users" ? (
              <h2 className="hvvv">{t("ListReserveSeat")}</h2>
            ) : null}{" "}
            {page === "enrollers" ? (
              <h2 className="hvvv">{t("Program Registration")}</h2>
            ) : null}{" "}
            {page === "direct_register" ? (
              <h2 className="hvvv">{t("Direct Registration")}</h2>
            ) : null}{" "}
            {page === "scholarship" ? (
              <h2 className="hvvv">{t("register_scholarship")}</h2>
            ) : null}{" "}
            {page === "requirements" ? (
              <h2 className="hvvv">{t("req_form")}</h2>
            ) : null}{" "}
            <button
              className="btn btn-light custfontbtn"
              onClick={() => {
                if (page !== "classes") {
                  setPage("classes");
                } else {
                  setShowModal(!showModal);
                  setId(null);
                  setStudent(false);
                  setFormState("add");
                }
              }}
            >
              {page === "classes" ? t("create_new_batch") : t("back")}
            </button>
          </div>
          <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg    min-train-ht ">
            {pageTitles[page]}
          </div>
          {/* Result Modal */}
        </>
      )}

      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title={resultMessage || t("operation_completed")}
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>
    </>
  );
}
