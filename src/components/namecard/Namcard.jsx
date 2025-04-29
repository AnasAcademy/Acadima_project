"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import show from "@/assets/navbar assets/vector.svg";

export default function Namcard() {
  const t = useTranslations("Namcard");

  const [toggle, setToggle] = useState("");

  function togglef() {
    if (toggle === "show") {
      setToggle("hide");
    } else {
      setToggle("show");
    }
  }

  useEffect(() => {
    setToggle("hide");
  }, []);

  return (
    <>
      <div className="  p-4 rounded-2   cardbg ">
        <h1>
          {" "}
          {t("hello")} {t("name")}{" "}
        </h1>
        <h3> {t("info")} </h3>
        <div>
          <h4 className=" custfontbold"> {t("Academic_info")} </h4>

          <div className=" d-flex">
            <h4 className=" custfont"> {t("Student ID")}</h4>
            <h4 className=" custfont">000000</h4>
          </div>

          <div className=" d-flex">
            <h4 className=" custfont"> {t("Academic_Email")}</h4>
            <h4 className=" custfont"> aaaa@anansacademy.u</h4>
          </div>

          <div className=" d-flex  gap-1">
            <h4 className=" custfont"> {t("Password")}</h4>

            <div className=" d-flex  align-items-baseline gap-1">
              {toggle === "show" ? (
                <h4 className=" custfont">000000</h4>
              ) : (
                <h4 className=" custfont">______</h4>
              )}

              <button
                type="button"
                onClick={togglef}
                className=" border-0 bg-transparent"
              >
                {" "}
                <Image src={show} alt="show" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
