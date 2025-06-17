import { useTranslations } from "next-intl";
import React from "react";

export default function Regpro() {
  const t = useTranslations("RegisteredPrograms");

  return (
    <>
      <div className=" d-flex flex-column gap-4     ">
        <div className="p-4 rounded-2 d-xl-flex  d-sm-flex-column justify-content-between  align-items-center   cardbg min-rego-ht">
          <div className=" d-flex justify-content-center flex-column align-items-center align-items-lg-start">
            <h4 className="     "> {t("courseType")} </h4>
            <h2 className=" text-md-center  text-lg-end text-xl-end ">
              {" "}
              {t("courseName")}{" "}
            </h2>
            <h4 className=" "> {t("status")} </h4>
          </div>

          <div className=" d-flex  mt-sm-4  mt-4 mt-xl-0 flex-xl-column flex-sm-row gap-3 justify-content-center align-items-center ">
            <button className="btn  btn-outline-light custButt-outline  px-3 py-2 text-nowrap w-100">
              {t("installments")}
            </button>
            <button className=" btn  btn-light custButton border-0 px-3 py-2 text-nowrap w-100">
              {t("goToProgram")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
