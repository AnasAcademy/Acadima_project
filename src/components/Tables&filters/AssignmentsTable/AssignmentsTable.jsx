"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import Editform from "@/components/Editform/Editform";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import Pen from "@/assets/admin/pen.svg";
import { useApiClient } from "@/hooks/useApiClient";
import AlertModal from "@/components/AlertModal/AlertModal";
import SelectCard from "@/components/SelectCard/SelectCard";
import { useUserData } from "@/context/UserDataContext";

export default function AssignmentsTable({ dat, current_page, last_page }) {

const [currentPage, setCurrentPage] = useState(current_page);
const [showModal, setShowModal] = useState(false);
const [showAlertModal, setShowAlertModal] = useState(false);
const [Alertmssg, setAlertmssg] = useState("");
const [filter, setFilter] = useState(dat);
const [Itemid, setId] = useState(null);
const t = useTranslations("tables");
const ts = useTranslations("SidebarA");
const [data, setData] = useState(dat);
const [web, setWeb] = useState([]);
const [formState, setFormState] = useState("");
const [restble, setRestble] = useState(false);
const [restbledata, setRestbledata] = useState([]);
const { request } = useApiClient();
const [batch, setBatch] = useState([]);
const [cate, setCate] = useState([]);
const {
  getCategoryGroupedOptions,
  getClassTypeOptions,
  getProgramAttachmentOptions,
} = useUserData();

const remove = async (id) => {
  try {
    const response = await request({
      method: "DELETE",
      urlPath: `/bundles/${id}`,
    });

    console.log(response);

    setData((prev) => prev.filter((item) => item.id !== id));
  } catch (error) {
    console.error("Status update failed:", error);
    alert("تعذر تحديث الحالة، حاول مرة أخرى.");
  }
};

const removeRes = async (id) => {
  console.log(id);
  try {
    const response = await request({
      method: "DELETE",
      urlPath: `/quizzes/result/${id}`,
    });

    console.log(response);
    setRestbledata((prev) => prev.filter((item) => item.resultId !== id));
  } catch (error) {
    console.error("Status update failed:", error);
    alert("تعذر تحديث الحالة، حاول مرة أخرى.");
  }
};

useEffect(() => {
  console.log("✅ useEffect fired on mount");
  getBatches();
  getCatigories();
}, []);

const getBatches = async () => {
  try {
    const response = await request({
      method: "GET",
      urlPath: `/classes`,
    });

    console.log(response.data);
    const batches = response.data.map((tem) => ({
      value: tem.id,
      label: tem.title,
    }));
    console.log(batches);
    setBatch(batches);
  } catch (error) {
    console.error("Status update failed:", error);
    alert("تعذر تحديث الحالة، حاول مرة أخرى.");
  }
};

const getCatigories = async () => {
  try {
    const response = await request({
      method: "GET",
      urlPath: `/categories`,
    });

    console.log("hello ", response.message.categories.data);
    const cate = response.message.categories.data.map((tem) => ({
      value: tem.id,
      label: tem.title,
    }));
    console.log(cate);
    setCate(cate);
  } catch (error) {
    console.error("Status update failed:", error);
    alert("تعذر تحديث الحالة، حاول مرة أخرى.");
  }
};

const handleSubmitEdit = async (dataa) => {
  console.log(dataa);
  try {
    const response = await request({
      method: "PUT",
      urlPath: `/quizzes/${Itemid}`,
      body: {
        title: dataa.title || "null",
        time: dataa.time,
        attemp: dataa.attemp,
        pass_mark: dataa.pass_mark,
        expiry_days: dataa.expiry_days,
        display_questions_randomly: 1,
        certificate: 1,
        status: "active",
      },
    });

    console.log(response.message);

    // if (result.errors) {
    //   const messages = Object.values(result.errors).map((error) => error.ar);
    //   setAlertmssg(messages.join("\n"));
    //   setShowAlertModal(true);
    // } else {
    //   const updatedItem = {
    //     ...data.find((item) => item.id === Itemid),
    //     ...dataa,
    //   };
    //   setData((prev) =>
    //     prev.map(
    //       (item) => (item.id === Itemid ? updatedItem : item) // replace only the edited item
    //     )
    //   );

    //   setShowModal(false);
    // }
  } catch (error) {
    console.error("Status update failed:", error);
    alert("تعذر تحديث الحالة، حاول مرة أخرى.");
  }
};

const handleSubmitAdd = async (dataa) => {
  console.log(dataa);

  try {
    const response = await request({
      method: "POST",
      urlPath: `/quizzes`,
      body: {
        webinar_id: dataa.webinar_id,
        title: dataa.title || "null",
        time: dataa.time,
        attemp: dataa.attemp,
        pass_mark: dataa.pass_mark,
        expiry_days: dataa.expiry_days,
        display_questions_randomly: 1,
        certificate: 1,
        status: "active",
      },
    });

    console.log(response);

    // if (result.service) {
    //   const newItem = result.service;
    //   setData((prev) => [...prev, newItem]);
    //   //  Success Alert
    //   alert("تمت الإضافة بنجاح ");
    //   setShowModal(false);
    // } else {
    //   alert("فشل في الإضافة، يرجى المحاولة مرة أخرى.");
    // }
  } catch (err) {
    console.error("Status update failed:", err);
    alert("تعذر تحديث الحالة، حاول مرة أخرى.");
  }
};

const getwebninars = async () => {
  try {
    const response = await request({
      method: "GET",
      urlPath: `/webinars`,
    });

    const titles = response.webinars.data.map((tem) => ({
      value: tem.id,
      label: tem.translations[0].title,
    }));

    console.log(titles);
    setWeb(titles);

  } catch (err) {
    console.log(err);
  }
};

const getResData = async (id) => {
  try {
    const response = await request({
      method: "GET",
      urlPath: `/assignments/${id}/students`,
    });

    console.log(response.data.histories.data);

    setRestbledata(response.data.histories.data);
  } catch (err) {
    console.log(err);
  }
};

function toogle() {
  setShowModal(!showModal);
}

const TableHead = [
  t("title"),
  t("students"),
  t("grade"),
  t("passing-grade"),
  t("status"),
  t("actions"),
];

const TableHeadRes = [
  t("studentt"),
  t("registration_date"),
  t("firstSubmission"),
  t("lastSubmission"),
  t("attempts"),
  t("grade"),
  t("status"),
  // t("actions"),
];

const resDat = restbledata.map((item, index) => ({
  columns: [
    { type: "user", name: item.student.full_name, email: item.student.email },
    { type: "text", value: item.created_at },
    { type: "text", value: item.first_submission },
    { type: "text", value: item.last_submission },
    { type: "text", value: item.usedAttemptsCount },
    { type: "text", value: item.grade || "N/A" },
    { type: "text", value: item.status },
    // {
    //   type: "actionbutton",
    //   label: t("actions"),
    //   action: () => {
    //     setShowModal(!showModal);
    //     setId(item.id);
    //     setFormState("edit");
    //   },
    //   icon: Arrowdown,
    //   color: "#48BB78",
    //   lists: [
    //     {
    //       label: t("edit"),
    //       action: () => {
    //         setShowModal(!showModal);
    //         setId(item.id);
    //         setFormState("edit");
    //       },
    //       icon: Pen,
    //     },
    //     {
    //       label: t("delete"),
    //       action: () => removeRes(item.id),
    //       icon: X,
    //     },
    //   ],
    //   id: item.id,
    // },
    // { type: "text", value: item.content },
  ],
}));

const trainingData = data.map((item, index) => ({
  columns: [
    // { type: "text", value: index + 1 },

    {
      type: "user",
      name: item.assignmentTitle,
      email: item.webinarTitle,
    },
    { type: "text", value: item.studentsCount },
    { type: "text", value: item.assignmentGrade },
    { type: "text", value: item.assignmentPassGrade },
    { type: "label", value: item.assignmentStatus },
    {
      type: "actionbutton",
      label: t("actions"),
      action: () => {
        setShowModal(!showModal);
        setId(item.assignmentId);
        setFormState("edit");
      },
      icon: Arrowdown,
      color: "#48BB78",
      lists: [
        {
          label: t("users"),
          action: () => {
            setRestble(true);
            getResData(item.assignmentId);
               setId(item.assignmentId);
          },
          icon: Pen,
        },
        {
          label: t("edit"),
          action: () => {
            setShowModal(!showModal);
            setId(item.assignmentId);
            setFormState("edit");
          },
          icon: Pen,
        },
        {
          label: t("delete"),
          action: () => remove(item.assignmentId),
          icon: X,
        },
      ],
      id: item.assignmentId,
    },
  ],
}));

const formTitles = [
  {
    label:
      (formState === "add" ? t("add") + " " : t("edit") + " ") + t("coursek"),
    type: "text",
  },
  { label: formState === "add" ? t("add") + " " : t("edit"), type: "text" },
];

const fields = [
  ...(formState === "add"
    ? [
        {
          name: "webinar_id",
          label: t("coursek"),
          type: "select",
          options: web,
        },
      ]
    : []),
  {
    name: "title",
    label: t("course_type"),
    type: "select",
    options: getClassTypeOptions(),
  },
  {
    name: "time",
    label: t("program_type"),
    type: "select",
    options: getProgramAttachmentOptions(),
  },
  { name: "attemp", label: t("course_namee"), type: "text" },
  { name: "pass_mark", label: t("certificate_course_name"), type: "text" },
  { name: "pass_mark", label: t("add_teacher_to_attendance"), type: "text" },
  { name: "pass_mark", label: t("assistant_teacher"), type: "t" },
  { name: "pass_mark", label: t("choose_teacher"), type: "select" },
  { name: "pass_mark", label: t("desc"), type: "text" },
  { name: "pass_mark", label: t("course_requirements"), type: "number" },
  {
    name: "expiry_days",
    label: t("exclude_student_from_certificate"),
    type: "number",
  },
];

 
const selectCardData = {
  inputs: [
    {
      title: t("start_date"),
      type: "date",
      filter: "",
      placeholder: t("start_date"),
      apiKey: "from",
    },
    {
      title: t("end_date"),
      type: "date",
      filter: "",
      placeholder: t("end_date"),
      apiKey: "to",
    },

    {
      title: restble ? t("studentt") : t("webinar"),
      type: "search",
      filter: restble ? "student.full_name" : "webinarTitle",
      placeholder: restble ? t("studentt") : t("webinar"),
      apiKey:    restble ?  "student"   :   "webinar_name",
    },

    {
      title: t("status"),
      type: "select",
      filter: restble ? "status" : "assignmentStatus",
      placeholder: t("status"),
      apiKey: "status",
      options: restble
        ? [
            { value: "pending", label: "pending" },
            { value: "passed", label: "passed" },
            { value: "not_passed", label: "not passed" },
            { value: "not_submitted", label: "not submitted" },
          ]
        : [
            { value: "active", label: "active" },
            { value: "inactive", label: "inactive" },
          ],
    },
  ],
};
const handleSearch = async (filters, pageNumber = 1) => {
  // setLoading(true);
  try {
    const query = new URLSearchParams();

    // Append all filter parameters
    selectCardData.inputs.forEach((input) => {
      const value = filters[input.filter];
      if (value) {
        query.append(input.apiKey || input.filter, value);
      }
    });

    // Append pagination separately
    query.append("page", pageNumber);
 
     console.log(Itemid)
    const res = await request({
      method: "GET",
      urlPath: restble
        ? `/assignments/${Itemid}/students?${query.toString()}`
        : `/assignments?${query.toString()}`,
    });

    const data = restble ? res.data.histories.data : res.data.assignmentsTable || [];
    console.log(data);
    setFilter(data);
       restble ? setRestbledata(data)   :  setData(data);
    // Also update dataa to keep it in sync
    // setCurrentPage(respond.data?.current_page || 1);
    // setTotalPages(respond.data?.last_page || 1);
    // setPage(respond.data?.current_page || 1); // Update page state
  } catch (error) {
    console.error("Search error:", error);
  } finally {
    // setLoading(false);
  }
};




  return (
    <>
      {" "}
      <div className="row g-3">
        <div className="col-12">
          {!showModal &&
            <SelectCard
              selectCardData={selectCardData}
              isTechSupport={true}
              dataa={dat}
              setFilter={setFilter}
              handleSearch={handleSearch}
            />
          }
        </div>
        <div className="col-12">
          {showModal ? (
            <div className="rounded-4 shadow-sm   p-md-4  p-2 container-fluid  cardbg   min-train-ht">
              <Editform
                fields={fields}
                data={data.find((item) => item.quizId === Itemid) || {}}
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
                {restble ? (
                  <div className=" d-flex justify-content-between w-100">
                    <h4>خدمة {} </h4>

                    <button
                      className="btn  btn-light custfontbtn "
                      onClick={() => {
                        setRestble(false);
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
                      getwebninars();
                      setShowModal(true);
                      setId(null);
                      setFormState("add");
                    }}
                  >
                    {" "}
                    {t("new_quiz")}{" "}
                  </button>
                )}
              </div>
              {restble ? (
                <>
                  <OngoingTrain
                    TableHead={TableHeadRes}
                    trainingData={resDat}
                  />
                </>
              ) : (
                <OngoingTrain
                  TableHead={TableHead}
                  trainingData={trainingData}
                />
              )}

              <div className="row justify-content-center align-items-center mt-3">
                <button
                  disabled={currentPage === 1}
                  className="btn custfontbtn col-xl-1 col-lg-2 col-md-2 col-10"
                  onClick={() => {
                    fetchy("down");
                  }}
                >
                  {t("previous-page")}
                </button>
                <span className="mx-2 align-self-center col-md-2 col-4 text-center p-0 my-2">
                  {t("page")} {currentPage}
                </span>
                <button
                  disabled={currentPage === last_page}
                  className="btn custfontbtn col-xl-1 col-lg-2 col-md-2 col-10"
                  onClick={() => {
                    fetchy("up");
                  }}
                >
                  {t("next-page")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
