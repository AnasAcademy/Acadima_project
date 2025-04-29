import React from "react";
import { useTranslations } from "next-intl";

export default function EnrollProgram() {
  const t = useTranslations("EnrollProgram");

  return (
    <>
      <div className=" d-flex flex-column gap-4  ">
        <div className="p-4 rounded-2   d-flex flex-column gap-5  justify-content-start  cardbg">
          <div>
            <h4 className=" custcalendartit"> {t("programTypeLabel")} </h4>
            <select
              className="form-select   w-50    "
              aria-label="Default select example"
            >
              <option value="0">{t("programTypePlaceholder")}</option>
              <option value="1">One</option>
              <option value="2">Two</option>
            </select>
          </div>

          <div>
            <h4 className=" custcalendartit "> {t("courseNameLabel")} </h4>
            <select
              className="form-select  w-50"
              aria-label="Default select example"
            >
              <option value="0">{t("courseNamePlaceholder")}</option>
              <option value="1">One</option>
              <option value="2">Two</option>
            </select>
          </div>

          <div className=" d-flex gap-2  flex-column  ">
            <div className="form-check d-flex gap-2 ">
              <input
                className="form-check-input  custButt-outline p-1"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label custfont me-4 "
                htmlFor="flexCheckDefault"
              >
                {t("checkbox1")}
              </label>
            </div>
            <div className="form-check d-flex gap-2">
              <input
                className="form-check-input custButt-outline p-1 "
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              <label
                className="form-check-label custfont me-4"
                htmlFor="flexCheckChecked"
              >
                {t("checkbox2")}
              </label>
            </div>
          </div>

          <div className=" ">
            <button className=" btn   m-auto btn-light custButton border-0 px-5 py-2 text-nowrap">
              {t("submitButton")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
