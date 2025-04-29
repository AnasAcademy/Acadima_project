import React from "react";
import { useTranslations } from "next-intl";
export default function ProblemCard() {
  const t = useTranslations("support");

  return (
    <>
      <div className=" p-3 rounded-2 w-100   cardbg text-white">
        <div className=" d-flex flex-column justify-content-center align-items-start  text-white">
          <h4 className="hvvv "> {t("title")} </h4>
          <p className="custsubtitle2 mb-5"> {t("description")} </p>
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
