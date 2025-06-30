"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import ShowIcon from "@/assets/navbar assets/vector.svg";

export default function Namcard({user}) {
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
      <div className="  p-4 rounded-4   cardbg min-nam-ht ">
        <h1 className="tit-20-700 Gray-Gray-700">
          {" "}
          {t("hello")} {user?.full_name}{" "}
        </h1>
        <h3 className="tit-14-400 Gray-Gray-700 "> {t("info")} </h3>
     
        <div>
          <h4 className=" tit-18-700 Gray-Gray-700  "> {t("Academic_info")}</h4>

          <div className=" d-flex">
            <h4 className=" Tit-12-700 Gray-Gray-800"> {t("Student ID")}</h4>
            <h4 className=" Tit-12-700 Gray-Gray-800">{user?.user_code}</h4>
          </div>

          <div className=" d-flex">
            <h4 className=" Tit-12-700 Gray-Gray-800">
              {" "}
              {t("Academic_Email")}
            </h4>
            <h4 className=" Tit-12-700 Gray-Gray-800"> {user?.email}</h4>
          </div>

          <div className=" d-flex  gap-1">
            <h4 className=" Tit-12-700 Gray-Gray-800"> {t("Password")}</h4>

            <div className=" d-flex  align-items-baseline gap-1 iconcolor">
              {toggle === "show" ? (
                <h4 className=" Tit-12-700 Gray-Gray-800">000000</h4>
              ) : (
                <h4 className=" Tit-12-700 Gray-Gray-800">______</h4>
              )}

              <button
                type="button"
                onClick={togglef}
                className=" border-0 bg-transparent"
              >
                <ShowIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
