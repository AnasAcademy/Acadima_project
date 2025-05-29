"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Icon from "@/assets/calendar/Group.svg";

export default function WeeklySchedule() {
  const t = useTranslations("weeklySchedule");

  const [task, setTask] = useState("");
  const [liveLec, setLivelec] = useState("");
  const [recLec, setReclec] = useState("");

  useEffect(() => {
    setTask("actv");
  }, []);

  function setActv(actvtab) {
    setTask(actvtab === "task" ? "actv" : "");
    setLivelec(actvtab === "live" ? "actv" : "");
    setReclec(actvtab === "rec" ? "actv" : "");
  }

  return (
    <>
      <div className=" p-4 rounded-2   cardbg texto-white  min-week-ht  pb-0 ">
        <div className="  d-flex flex-column align-items-start texto-white">
          <h4 className="tit-18-700  Gray-Gray-700 mb-5 ">{t("title")} </h4>

          <div className="d-flex justify-content-around mb-5 pb-2 texto-white  gap-2  w-100">
            <span
              className={`Tit-14-600 custcolor cursor-pointer   ${
                task === "actv" ? "" : "texto-white"
              }`}
              onClick={() => {
                setActv("task");
              }}
            >
              {t("columns.tasks")}{" "}
            </span>
            <span
              className={` Tit-14-600 custcolor  cursor-pointer    ${
                liveLec === "actv" ? "" : "texto-white"
              }   d-none  d-lg-none d-xl-flex hideun`}
              onClick={() => {
                setActv("live");
              }}
            >
              {" "}
              {t("columns.liveLectures")}
            </span>
            <span
              className={`Tit-14-600 custcolor cursor-pointer    ${
                recLec === "actv" ? "" : "texto-white"
              }  `}
              onClick={() => {
                setActv("record");
              }}
            >
              {t("columns.recordedLectures")}
            </span>
          </div>

          <div className="d-flex flex-column justify-content-between align-items-start gap-3  mb-5  w-100">
            {task === "actv" ? (
              ["lecture1", "lecture2", "lecture3", "lecture4"].map((key) => (
                <div
                  key={key}
                  className="d-flex   w-100 justify-content-between  align-items-center   mb-3  "
                >
                  <div className=" row w-100 d-flex  justify-content-between align-items-center  p-0 m-0 ">
                    <div className=" col-2   rounded-circle  d-flex justify-content-center">
                      <div className=" priBack  p-2 rounded-5 ">
                        <Icon className=" comicon     " />
                      </div>
                    </div>

                    <div className=" col-6 d-flex flex-column">
                      <div className="hv">{t(`lectures.${key}.number`)}</div>

                      <div className="custcalendartit mt-2 ">
                        {t(`lectures.${key}.title`)}
                      </div>
                    </div>

                    <div className="col-4 d-flex justify-content-end  p-0 align-items-center ">
                      <button className="btn btn-light custfontbtnv ">
                        {t(`lectures.${key}.button`)}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>other lectures</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
