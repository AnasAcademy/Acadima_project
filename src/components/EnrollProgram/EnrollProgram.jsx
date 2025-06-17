import React from "react";
import { useTranslations } from "next-intl";
import Arrow from "@/assets/admin/arrow down.svg";

export default function EnrollProgram() {
  const t = useTranslations("EnrollProgram");

  return (
    <>
      <div className=" d-flex flex-column gap-4   ">
        <div className="p-4 rounded-2   d-flex flex-column gap-5  justify-content-start  cardbg min-enroll-ht  ">
          <div className=" row d-flex flex-column gap-4">
            <div className=" col-lg-12 col-md-12 col-12">
              <h4 className=" custcalendartit"> {t("programTypeLabel")} </h4>

              <div className="d-flex justify-content-center align-items-center w-100 position-relative">
                <select
                  className="form-select no-native-arrow"
                  aria-label="Default select example"
                >
                  <option value="0">{t("programTypePlaceholder")}</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </select>
                <Arrow className="iconSize5 position-absolute selclass p-1" />
              </div>
            </div>

            <div className=" col-lg-12 col-md-12 col-12">
              <h4 className=" custcalendartit "> {t("courseNameLabel")} </h4>
              <div className="d-flex justify-content-center align-items-center w-100 position-relative">
                <select
                  className="form-select no-native-arrow"
                  aria-label="Default select example"
                >
                  <option value="0">{t("programTypePlaceholder")}</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </select>
                <Arrow className="iconSize5 position-absolute selclass p-1" />
              </div>
            </div>
          </div>

          <div className=" d-flex gap-2  flex-column  ">
            <div className="form-check d-flex gap-2 ">
              <input
                className="form-check-input  custCheckbox"
                type="checkbox"
                value=""
                id="flexCheckk"
              />
              <label className="form-check-label custfont me-4 " htmlFor="">
                <h4>{t("checkbox1")}</h4>
              </label>
            </div>
            <div className="form-check d-flex gap-2">
              <input
                className="form-check-input custCheckbox "
                type="checkbox"
                value=""
                id="flexCheck"
              />

              <label className="form-check-label custfont me-4" htmlFor="">
                <h4>{t("checkbox2")}</h4>
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
