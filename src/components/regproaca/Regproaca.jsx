"use client";
import React, { useState } from "react";
import CoursesTable from "@/components/CoursesTable/CoursesTable";
import { useTranslations } from "next-intl";

export default function Regproaca({ data }) {
  const t = useTranslations("RegisteredProgramss");
  const ts = useTranslations("CourseSchedule");

  const [actv, setActv] = useState(0);

  const tabHeaders = [
    ts("courseNumber"),
    ts("courseName"),
    ts("startDate"),
    ts("numberOfTasks"),
    ts("numSubmission"),
    ts("actions"),
  ];

  const tabCourses1 = [
    {
      flagColor: "red",
      data: [
        ts("td.courseNum"),
        ts("td.courseNam"),
        ts("td.startDate"),
        ts("td.numTasks"),
        ts("td.numSubmission"),
        ts("td.lec"),
      ],
    },
    {
      flagColor: "red",
      data: [
        ts("td.courseNum"),
        ts("td.courseNam"),
        ts("td.startDate"),
        ts("td.numTasks"),
        ts("td.numSubmission"),
        ts("td.lec"),
      ],
    },
    {
      flagColor: "red",
      data: [
        ts("td.courseNum"),
        ts("td.courseNam"),
        ts("td.startDate"),
        ts("td.numTasks"),
        ts("td.numSubmission"),
        ts("td.lec"),
      ],
    },
  ];
  const tabCourses2 = [
    {
      flagColor: "red",
      data: [
        ts("td.courseNum"),
        ts("td.courseNam"),
        ts("td.startDate"),
        ts("td.numTasks"),
        ts("td.numSubmission"),
        ts("td.lec"),
      ],
    },
    {
      flagColor: "red",
      data: [
        ts("td.courseNum"),
        ts("td.courseNam"),
        ts("td.startDate"),
        ts("td.numTasks"),
        ts("td.numSubmission"),
        ts("td.lec"),
      ],
    }

  ];

  const [showPro, setShowPro] = useState(tabCourses1);

  function toggle(k) {
    if (k === 0) {
      setShowPro(tabCourses1);
      setActv(0);
    } else {
      setShowPro(tabCourses2);
      setActv(1);
    }
  }

  return (
    <>
      {data.map(function (reg, key) {
        return (
          <div
            key={key}
            className=" d-flex flex-column gap-3 col-sm-12 col-xl-4 col-md-6 "
            onClick={() => {
              toggle(key);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className=" d-flex flex-column gap-4  ">
              <div
                className={`p-4 rounded-2 d-xl-flex  d-sm-flex-column  min-rego-ht  ${
                  actv === key ? "tableCardco" : "cardbg"
                }`}
              >
                <div className=" d-flex flex-column ">
                  <h4 className={`  ${actv === key ? "text-black" : ""} `}>
                    {" "}
                    {reg.courseType}{" "}
                  </h4>
                  <h2 className={`  ${actv === key ? "text-black" : ""} `}>
                    {" "}
                    {reg.courseNAm}{" "}
                  </h2>
                  <div className=" d-flex flex-row  align-items-baseline gap-2">
                    <div className="progress w-75" style={{ height: "8px" }}>
                      <div
                        className={`progress-bar custButton  ${
                          actv === key ? "text-black" : ""
                        }`}
                        role="progressbar"
                        style={{ width: reg.progress }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div>
                      <h4 className={`  ${actv === key ? "text-black" : ""} `}>
                        {reg.progress}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className=" mt-5">
        <h2 className=" hvvv"> {ts("title")}</h2>
        <h3> {ts("programDuration")}</h3>
        <CoursesTable
          headers={tabHeaders}
          courses={showPro}
          btn={ts("dwnldLectable")}
          join={ts("join")}
          reg={ts("register")}
          lec={ts("td.lec")}
          isCourses={true}
        />
      </div>
    </>
  );
}
