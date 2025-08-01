"use client";
import React from "react";
import { useTranslations } from "next-intl";

import Quiz1 from "@/assets/quizzes/quiz1.svg";
import Quiz2 from "@/assets/quizzes/quiz2.svg";
import Quiz3 from "@/assets/quizzes/quiz3.svg";
import Quiz4 from "@/assets/quizzes/quiz4.svg";
import roundimage from "@/assets/admin/personla.png";
import edit from "@/assets/quizzes/edit.svg";
import Removebin from "@/assets/admin/removebin.svg";

import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";

export default function Assignments() {
  const t = useTranslations("Quizzes");
  const t2 = useTranslations("assignments");

  const TableHead = [
    t2("course"),
    t2("deadline"),
    t2("firstSubmission"),
    t2("lastSubmission"),
    t2("attempts"),
    t("my-grade"),
    t2("passing-grade"),
    t("status"),
    t("actions"),
  ];

  const trainingData = [
    {
      columns: [
        {
          type: "user",
          name: "adafagdgdgdg",
          email: "acp test",
        },
        { type: "text", value: "3 august " },
        { type: "text", value: "-" },
        { type: "text", value: "-" },
        { type: "text", value: "0/1" },
        { type: "text", value: "-" },
        { type: "text", value: "60" },
        { type: "text", value: t2("not-submitted") },
        {
          type: "button",
          value: t2("show-assignment"),
          icon: true,
          color: "#1024dd",
        },
      ],
    },
    {
      columns: [
        {
          type: "user",
          name: "adafagdgdgdg",
          email: "acp test",
        },
        { type: "text", value: "3 august " },
        { type: "text", value: "-" },
        { type: "text", value: "-" },
        { type: "text", value: "0/1" },
        { type: "text", value: "-" },
        { type: "text", value: "60" },
        { type: "text", value: t2("not-submitted") },
        {
          type: "button",
          value: t2("show-assignment"),
          icon: true,
          color: "#1024dd",
        },
      ],
    },
    {
      columns: [
        {
          type: "user",
          name: "adafagdgdgdg",
          email: "acp test",
        },
        { type: "text", value: "3 august " },
        { type: "text", value: "-" },
        { type: "text", value: "-" },
        { type: "text", value: "0/1" },
        { type: "text", value: "-" },
        { type: "text", value: "60" },
        { type: "text", value: t2("not-submitted") },
        {
          type: "button",
          value: t2("show-assignment"),
          icon: true,
          color: "#1024dd",
        },
      ],
    },
    {
      columns: [
        {
          type: "user",
          name: "adafagdgdgdg",
          email: "acp test",
        },
        { type: "text", value: "3 august " },
        { type: "text", value: "-" },
        { type: "text", value: "-" },
        { type: "text", value: "0/1" },
        { type: "text", value: "-" },
        { type: "text", value: "60" },
        { type: "text", value: t2("not-submitted") },
        {
          type: "button",
          value: t2("show-assignment"),
          icon: true,
          color: "#1024dd",
        },
      ],
    },
    {
      columns: [
        {
          type: "user",
          name: "adafagdgdgdg",
          email: "acp test",
        },
        { type: "text", value: "3 august " },
        { type: "text", value: "-" },
        { type: "text", value: "-" },
        { type: "text", value: "0/1" },
        { type: "text", value: "-" },
        { type: "text", value: "60" },
        { type: "text", value: t2("not-submitted") },
        {
          type: "button",
          value: t2("show-assignment"),
          icon: true,
          color: "#1024dd",
        },
      ],
    },
  ];

  const selectCardData = {
    inputs: [
      { title: "from", type: "date" },
      { title: "to", type: "date" },
      {
        title: "course",
        type: "select",
        options: ["جديد", "مكتمل", "جارٍ"],
        placeholder: "مثال: Math 101",
      },
      {
        title: "status",
        type: "select",
        options: ["جديد", "مكتمل", "جارٍ"],
      }
    ],
    button: {
      show: true,
      text: "show_results", // translation key
      onClick: () => console.log("Filters applied"),
    },
  };

  return (
    <>
      <div className="   container p-3 pt-lg-0 pt-5  mt-5 ">
        <h2 className="hvvv mb-4">{t2("assignments")}</h2>
        <div className="col-12 cardbg rounded-4 d-flex flex-row p-4 flex-wrap">
          <div className="col-lg-3 col-md-6 col-6 d-flex flex-column justify-content-center align-items-center   gap-1">
            <Quiz1 className="iconSize9" />
            <h2 className="fw-bold fs-2">4</h2>
            <h3 className="text-muted">{t2("courseAssignments")}</h3>
          </div>

          <div className="col-lg-3 col-md-6 col-6 d-flex flex-column justify-content-center align-items-center  gap-1 ">
            <Quiz2 className="iconSize9" />
            <h2 className="fw-bold fs-2">3</h2>
            <h3 className="text-muted">{t2("pendingReview")}</h3>
          </div>

          <div className="col-lg-3 col-md-6 col-6 d-flex flex-column justify-content-center align-items-center gap-1">
            <Quiz3 className="iconSize9" />
            <h2 className="fw-bold fs-2">1</h2>
            <h3 className="text-muted">{t("passed")}</h3>
          </div>

          <div className="col-lg-3 col-md-6 col-6 d-flex flex-column justify-content-center align-items-center gap-1">
            <Quiz4 className="iconSize9" />
            <h2 className="fw-bold fs-2">2</h2>
            <h3 className="text-muted">{t("failed")}</h3>
          </div>
        </div>

        <h2 className="hvvv my-4">{t2("filter-Assignments")}</h2>
        <div className=" col-lg-12 ">
          <SelectCard selectCardData={selectCardData} />
        </div>

        <h2 className="hvvv my-4">{t2("my-assignments")}</h2>
        <div className=" col-12 ">
          <OngoingTrain
            TableHead={TableHead}
            trainingData={trainingData}
            button={false}
            padding={4}
            isUserImg={false}
          />
        </div>
      </div>
    </>
  );
}
