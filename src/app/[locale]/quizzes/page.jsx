"use client";
import React from "react";
import { useTranslations } from "next-intl";

import Quiz1 from "@/assets/quizzes/quiz1.svg";
import Quiz2 from "@/assets/quizzes/quiz2.svg";
import Quiz3 from "@/assets/quizzes/quiz3.svg";
import Quiz4 from "@/assets/quizzes/quiz4.svg";
import roundimage from "@/assets/admin/personla.png";
import edit from "@/assets/quizzes/edit.svg"
import Removebin from "@/assets/admin/removebin.svg";

import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";

export default function Quizzes() {
  const t = useTranslations("Quizzes");

  const TableHead = [
    "",
    t("teacher"),
    t("quiz"),
    t("quiz-grade"),
    t("my-grade"),
    t("status"),
    t("date"),
    t("actions")
  ];

  const trainingData = [
    {
      columns: [
        { type: "image", value: roundimage },
        { type: "text", value: t("teacher") },
        { type: "text", value: t("quiz") },
        { type: "text", value: "5" },
        { type: "text", value: "0" },
        { type: "text", value: t("pending") },
        { type: "text", value: "05 مايو 2025" },
        { type: "button", value: t("edit"), icon: true, color: "#CBD5E0" }
      ],
    },
    {
      columns: [
        { type: "image", value: roundimage },
        { type: "text", value: t("teacher") },
        { type: "text", value: t("quiz") },
        { type: "text", value: "5" },
        { type: "text", value: "0" },
        { type: "text", value: t("passed") },
        { type: "text", value: "05 مايو 2025" },
        { type: "button", value: t("edit"), icon: true, color: "#CBD5E0" }
      ],
    },
    {
      columns: [
        { type: "image", value: roundimage },
        { type: "text", value: t("teacher") },
        { type: "text", value: t("quiz") },
        { type: "text", value: "5" },
        { type: "text", value: "0" },
        { type: "text", value: t("passed") },
        { type: "text", value: "05 مايو 2025" },
        { type: "button", value: t("edit"), icon: true, color: "#CBD5E0" }
      ],
    },
    {
      columns: [
        { type: "image", value: roundimage },
        { type: "text", value: t("teacher") },
        { type: "text", value: t("quiz") },
        { type: "text", value: "5" },
        { type: "text", value: "0" },
        { type: "text", value: t("failed") },
        { type: "text", value: "05 مايو 2025" },
        { type: "button", value: t("edit"), icon: true, color: "#CBD5E0" }
      ],
    },
    {
      columns: [
        { type: "image", value: roundimage },
        { type: "text", value: t("teacher") },
        { type: "text", value: t("quiz") },
        { type: "text", value: "5" },
        { type: "text", value: "0" },
        { type: "text", value: t("pending") },
        { type: "text", value: "05 مايو 2025" },
        { type: "button", value: t("edit"), icon: true, color: "#CBD5E0" }
      ],
    },
  ];

   const selectCardData = {
  inputs: [
    { title: "from", type: "date" },
    { title: "to", type: "date" },
    {
      title: "status",
      type: "select",
      options: ["جديد", "مكتمل", "جارٍ"]
    },
    { title: "quiz", type: "search", placeholder: "مثال: Math 101" },
    { title: "teacher", type: "search", placeholder: "اسم المدرّس" }
  ],
  button: {
    show: true,
    text: "show_results", // translation key
    onClick: () => console.log("Filters applied"),
  }
};

  return (
    <>
      <div className="   container p-3 pt-lg-0 pt-5  mt-5 ">
        <h2 className="hvvv mb-4">{t("Quizzes")}</h2>
        <div className="col-12 cardbg rounded-4 d-flex flex-row p-4 flex-wrap">
          <div className="col-lg-3 col-md-6 col-6 d-flex flex-column justify-content-center align-items-center   gap-1">
            <Quiz1 className="iconSize9" />
            <h2 className="fw-bold fs-2">4</h2>
            <h3 className="text-muted">{t("Quizzes")}</h3>
          </div>

          <div className="col-lg-3 col-md-6 col-6 d-flex flex-column justify-content-center align-items-center  gap-1 ">
            <Quiz2 className="iconSize9" />
            <h2 className="fw-bold fs-2">3</h2>
            <h3 className="text-muted">{t("passed")}</h3>
          </div>

          <div className="col-lg-3 col-md-6 col-6 d-flex flex-column justify-content-center align-items-center gap-1">
            <Quiz3 className="iconSize9" />
            <h2 className="fw-bold fs-2">1</h2>
            <h3 className="text-muted">{t("failed")}</h3>
          </div>

          <div className="col-lg-3 col-md-6 col-6 d-flex flex-column justify-content-center align-items-center gap-1">
            <Quiz4 className="iconSize9" />
            <h2 className="fw-bold fs-2">2</h2>
            <h3 className="text-muted">{t("ShowResults")}</h3>
          </div>
        </div>

        <h2 className="hvvv my-4">{t("FilterResults")}</h2>
        <div className=" col-lg-12 ">
          <SelectCard selectCardData={selectCardData} />
        </div>

        <h2 className="hvvv my-4">{t("my-quizzes")}</h2>
        <div className=" col-12 ">
          <OngoingTrain
            TableHead={TableHead}
            trainingData={trainingData}
            button={false}
            Icon={edit}
            Icon2={Removebin}
          />
        </div>
      </div>
    </>
  );
}
