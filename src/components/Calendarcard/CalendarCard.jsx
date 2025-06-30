"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styling
import "../../styles/calendar-dark.css";
import { useTranslations } from "next-intl";
import Line from "@/assets/calendar/Line 50.svg";
import Blucircle from "@/assets/calendar/Ellipse 18.svg";
import Redcircle from "@/assets/calendar/Ellipse 19.svg";
import Image from "next/image";

export default function CalendarCard() {
  const t = useTranslations("todaySchedule");
  const [value, setValue] = useState(new Date());

  return (
    <>
      <div className="p-3 rounded-4  d-flex justify-content-center flex-column   cardbg ">
        <h3 className="mb-3 tit-18-700 Gray-Gray-700 "> {t("month")} </h3>
        <Calendar
          onChange={setValue}
          value={value}
          className="dark-calendar  w-100"
        />

        <div className=" d-flex justify-content-center align-items-center m-3 ">
          <Line width={250} />
        </div>
      </div>
    </>
  );
}
