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
      <div className=" p-4 rounded-2   cardbg texto-white">
        <div className="  d-flex flex-column align-items-start texto-white">
          <h4 className="custsubtitle mb-5 ">{t("title")} </h4>

          <div className="d-flex justify-content-around mb-5 pb-2 texto-white  gap-5">
            <span
              className={`h3v cursor-pointer  text-nowrap ${
                task === "actv" ? "" : "texto-white"
              }`}
              onClick={() => {
                setActv("task");
              }}
            >
              {" "}
              {t("columns.tasks")}{" "}
            </span>
            <span
              className={` h3v  cursor-pointer   ${
                liveLec === "actv" ? "" : "texto-white"
              }   d-none d-lg-flex d-xl-flex`}
              onClick={() => {
                setActv("live");
              }}
            >
              {" "}
              {t("columns.liveLectures")}
            </span>
            <span
              className={` h3v cursor-pointer    ${
                recLec === "actv" ? "" : "texto-white"
              }  `}
              onClick={() => {
                setActv("record");
              }}
            >
              {" "}
              {t("columns.recordedLectures")}
            </span>
          </div>

          <div className="d-flex flex-column justify-content-between align-items-start gap-3  mb-5">
            {task === "actv" ? (
              ["lecture1", "lecture2", "lecture3", "lecture4"].map((key) => (
                <div
                  key={key}
                  className="d-flex   w-100 justify-content-between  align-items-center   gap-5 mb-3"
                >
                  <div className=" d-flex justify-content-center align-items-center gap-4">
                    <Icon  className="iconSize1" />
                    <div>
                      <div className="hv">{t(`lectures.${key}.number`)}</div>
                      <div className="custcalendartit texto-white">
                        {t(`lectures.${key}.title`)}
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-light custfontbtn px-3 text-nowrap "
                    style={{ width: "120px" }}
                  >
                    {t(`lectures.${key}.button`)}
                  </button>
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
