"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import Editform from "@/components/Editform/Editform";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import Pen from "@/assets/admin/pen.svg";
import { useApiClient } from "@/hooks/useApiClient";
import AlertModal from "@/components/AlertModal/AlertModal";
import SelectCard from "@/components/SelectCard/SelectCard";

export default function QuizzesTable({ dat, current_page, last_page }) {
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
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState([]);
  const { request } = useApiClient();
  const [extraformquiz, setExtraformquiz] = useState(true);

  // async function fetchy(stat) {
  //   const newPage = stat === "up" ? currentPage + 1 : currentPage - 1;

  //   if (stat === "up") {
  //     setCurrentPage(currentPage + 1);
  //   } else {
  //     setCurrentPage(currentPage - 1);
  //   }

  //   try {
  //     const data = await fetch(
  //       `https://api.lxera.net/api/development/organization/vodafone/services?page=${newPage}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "x-api-key": "1234",
  //           "Content-Type": "application/json",
  //           Authorization:
  //             "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
  //         },
  //       }
  //     );

  //     const respond = await data.json();
  //     console.log("go", respond.data.data);
  //     dat = respond.data.data;
  //     setData(dat);
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   }
  // }

  const remove = async (id) => {
    try {
      const response = await request({
        method: "DELETE",
        urlPath: `/quizzes/${id}`,
      });

      console.log(response);

      setData((prev) => prev.filter((item) => item.quizId !== id));
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

  const handleSubmitEdit = async (dataa) => {
    console.log(dataa);
    try {
      const response = await request({
        method: "PUT",
        urlPath: `/quizzes/${Itemid}`,
        body: {
          title: dataa.quizTitle || "null",
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

      setShowModal(false);
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

  const getQuetions = async (id) => {
    try {
      const response = await request({
        method: "GET",
        urlPath: `/quizzes/questions/${id}`,
      });

      const questionTitles = response.data.quiz.quiz_questions;
      // .map(
      //   (q , index) =>
      //      {  return { id : q.id,
      //       title :  q.translations[0]?.title ,
      //                    type: q.type,
      //                    grade: q.grade
      //   }
      //                               }
      // );
      // console.log(response.data.quiz.quiz_questions[0].translations[0].title);

      console.log(questionTitles);
      setQuestions(questionTitles);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteQuetion = async (id) => {
    try {
      const response = await request({
        method: "DELETE",
        urlPath: `/quizzes/questions/${id}`,
      });

      console.log(response);
      setQuestions(questions.filter((itm) => itm.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuetion = async (data) => {
    console.log(data);
    try {
      const response = await request({
        method: "PUT",
        urlPath: `/quizzes/questions/${data.id}`,
        body: {
          title: data.translations?.[0]?.title,
          grade: data.grade,
          type: data.type,
          answers: data.quizzes_questions_answers.map((itm, inx) => ({
            id: itm.id,
            title: itm.translations[0]?.title,
            correct: itm.correct,
          })),
        },
      });

      console.log(response);
      // setQuestions((prev) =>
      //   prev.map((itm) => (itm.id === id ? { ...itm, ...updatedData } : itm))
      // );
    } catch (err) {
      console.log(err);
    }
  };

  const AddQuetion = async (data) => {
    console.log(data);
    try {
      const response = await request({
        method: "POST",
        urlPath: `/quizzes/questions`,
        body: {
          title: data.translations?.[0]?.title,
          grade: data.grade,
          type: data.type,
          answers: data.quizzes_questions_answers.map((itm, inx) => ({
            id: itm.id,
            title: itm.translations[0]?.title,
            correct: itm.correct,
          })),
        },
      });

      console.log(response);
      // setQuestions((prev) =>
      //   prev.map((itm) => (itm.id === id ? { ...itm, ...updatedData } : itm))
      // );
    } catch (err) {
      console.log(err);
    }
  };

  const getResData = async (id) => {
    try {
      const response = await request({
        method: "GET",
        urlPath: `/quizzes/${id}/results`,
      });

      console.log(response);

      setRestbledata(response.quizzesResults);
    } catch (err) {
      console.log(err);
    }
  };

  function toogle() {
    setShowModal(!showModal);
  }

  const TableHead = [
    //  "#",
    t("title"),
    t("teacher"),
    t("questions"),
    t("students"),
    t("average_grades"),
    t("certificate"),
    t("status"),
    t("actions"),
  ];

  const TableHeadRes = [
    t("title"),
    t("studentt"),
    t("teacher"),
    t("grade"),
    t("exams_date"),
    t("status"),
    t("actions"),
  ];

  const resDat = restbledata.map((item, index) => ({
    columns: [
      { type: "text", value: item.quiz_title },
      { type: "text", value: item.student_name },
      { type: "text", value: item.teacher_name },
      { type: "text", value: item.grade },
      { type: "text", value: item.quiz_date },
      { type: "text", value: item.status },
      {
        type: "actionbutton",
        label: t("actions"),
        action: () => {
          setShowModal(!showModal);
          setId(item.resultId);
          setFormState("edit");
        },
        icon: Arrowdown,
        color: "#48BB78",
        lists: [
          {
            label: t("delete"),
            action: () => removeRes(item.resultId),
            icon: X,
          },
        ],
        id: item.resultId,
      },
      // { type: "text", value: item.content },
    ],
  }));

  const trainingData = data.map((item, index) => ({
    columns: [
      // { type: "text", value: index + 1 },
      { type: "text", value: item.quizTitle },
      { type: "text", value: item.teacher },
      { type: "text", value: item.quizQuestions },
      { type: "text", value: item.Students },
      { type: "text", value: item.avgGrade },
      { type: "text", value: item.certificate },
      { type: "text", value: item.status },
      {
        type: "actionbutton",
        label: t("actions"),
        action: () => {
          setShowModal(!showModal);
          setId(item.quizId);
          setFormState("edit");
        },
        icon: Arrowdown,
        color: "#48BB78",
        lists: [
          {
            label: t("results"),
            action: () => {
              setRestble(true);
              getResData(item.quizId);
            },
            icon: Pen,
          },
          {
            label: t("edit"),
            action: () => {
              getQuetions(item.quizId);
              setShowModal(!showModal);
              setId(item.quizId);
              setFormState("edit");
            },
            icon: Pen,
          },
          {
            label: t("delete"),
            action: () => remove(item.quizId),
            icon: X,
          },
        ],
        id: item.quizId,
      },
    ],
  }));

  const formTitles = [
    {
      label:
        (formState === "add" ? t("add") + " " : t("edit") + " ") + t("quiz"),
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
    { name: "quizTitle", label: t("quiz_title"), type: "text" },
    { name: "time", label: t("quiz_time"), type: "number" },
    { name: "attemp", label: t("attempts"), type: "number" },
    { name: "pass_mark", label: t("passing-grade"), type: "number" },
    { name: "expiry_days", label: t("expiryDays"), type: "number" },
  ];

  const selectCardData = {
    inputs: [
      {
        title: t("search"),
        type: "search",
        filter: "quizzesTable.quizTitle",
        placeholder: t("quiz_title"),
        apiKey: "title",
      },
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
        title: t("teacher"),
        type: "search",
        filter: "quizzesTable.teacher",
        placeholder: t("teacher"),
        apiKey: "teacher_name",
      },
      {
        title: t("coursek"),
        type: "search",
        filter: "quizzesTable.webinarTitle",
        placeholder: t("coursek"),
        apiKey: "webinar_name",
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
        urlPath: `/quizzes?${query.toString()}`,
      });

      const data = res.quizzesTable || [];
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
      <div className="row g-3">
        <div className="col-12">
          {!showModal && !restble && (
            <SelectCard
              selectCardData={selectCardData}
              isTechSupport={true}
              dataa={dat}
              setFilter={setFilter}
              handleSearch={handleSearch}
            />
          )}
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
                extraformquiz={extraformquiz}
                questions={questions}
                deleteQuetion={deleteQuetion}
                setQuestion={setQuestion}
                question={question}
                updateQuetion={updateQuetion}
                setQuestions={setQuestions}
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
