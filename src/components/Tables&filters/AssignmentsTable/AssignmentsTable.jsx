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
const { getCategoryGroupedOptions } = useUserData();

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
      urlPath: `/bundles/${id}/students`,
    });

    console.log(response.students.data);

    setRestbledata(response.students.data);
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
  "ID",
  t("name"),
  t("evaluations"),
  t("learninbg"),
  t("gpa"),
  t("registration_date"),
  t("status"),
  t("actions"),
];

const resDat = restbledata.map((item, index) => ({
  columns: [
    { type: "text", value: item.id },
    { type: "text", value: item.full_name },
    { type: "text", value: item.rate },
    { type: "text", value: item.learning },
    { type: "text", value: item.gpa },
    { type: "text", value: item.bundle_join_date },
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
          action: () => removeRes(item.id),
          icon: X,
        },
      ],
      id: item.id,
    },
    // { type: "text", value: item.content },
  ],
}));

const trainingData = data.map((item, index) => ({
  columns: [
    // { type: "text", value: index + 1 },

    {
      type: "user",
      name: item.assignmentTitle,
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
        setId(item.id);
        setFormState("edit");
      },
      icon: Arrowdown,
      color: "#48BB78",
      lists: [
        {
          label: t("users"),
          action: () => {
            setRestble(true);
            getResData(item.id);
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
    label: (formState === "add" ? t("add") + " " : t("edit") + " ") + t("quiz"),
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
  { name: "title", label: t("quiz_title"), type: "text" },
  { name: "time", label: t("quiz_time"), type: "number" },
  { name: "attemp", label: t("attempts"), type: "number" },
  { name: "pass_mark", label: t("passing-grade"), type: "number" },
  { name: "expiry_days", label: t("expiryDays"), type: "number" },
];

const selectCardData = {
  inputs: [
    {
      title: t("title"),
      type: "search",
      filter: "translations[0].title",
      placeholder: t("search"),
      apiKey: "title",
    },
    {
      title: t("teacher"),
      type: "search",
      filter: "teacher.full_name",
      placeholder: t("teacher"),
      apiKey: "teacher_name",
    },
    {
      title: t("batch-number"),
      type: "select",
      filter: "batch.title",
      placeholder: t("batch-number"),
      apiKey: "batch",
      options: batch,
    },

    {
      title: t("categories"),
      type: "select",
      filter: "",
      placeholder: t("categories"),
      apiKey: "category_id",
      options: getCategoryGroupedOptions(),
    },
    {
      title: t("status"),
      type: "select",
      filter: "quizzesTable.status",
      placeholder: t("status"),
      apiKey: "status",
      options: [
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

    const res = await request({
      method: "GET",
      urlPath: `/assignments?${query.toString()}`,
    });

    const data = res.bundles.data || [];
    console.log(data);
    setFilter(data);
    setData(data);
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
          {
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
        </div>
      </div>
    </>
  );
}
