import React from "react";
import { useTranslations } from "next-intl";
export default function ProblemCard() {
  const t = useTranslations("support");

  return (
    <>
      <div className=" p-3 rounded-2 w-100   mt-1   cardbg text-white min-pro-ht ">
        <div className=" d-flex flex-column justify-content-center align-items-start  text-white gap-3">
          <h4 className="tit-18-700 Gray-Gray-700 "> {t("title")} </h4>
          <p className="custsubtitle2 mb-3"> {t("description")} </p>
          <div className=" d-flex gap-4 ">
            <button className="btn btn-light custfontbtn px-3">
              {" "}
              {t("newRequest")}{" "}
            </button>
            <button className="btn btn-light custfontbtn px-3">
              {" "}
              {t("followUp")}{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
