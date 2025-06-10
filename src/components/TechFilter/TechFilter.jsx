import React from "react";
import { useTranslations } from "next-intl";
import Arrow from "@/assets/admin/arrow down.svg";
import Search from "@/assets/admin/search.svg" 

export default function TechFilter() {

  const t = useTranslations("techSupport");
    const ts = useTranslations("employee_progress");
  

  return (
    <>
      <div className="cardbg  px-3 py-2 d-flex flex-row justify-content-between align-items-center rounded-4  min-adash-ht">
        <div className="  row d-flex justify-content-between  w-100  align-items-center">
          <div className="col-xl-12">
            <h2>{t("ticket-filter")}</h2>
            <div className={`  m-2  row  g-4   `}>
              <div className=" col-lg-6 col-xl-2 col-md-3 col-12 pe-0">
                <div className=" d-flex w-100 flex-column  ">
                  <div className="d-flex justify-content-center  align-items-center  w-100  position-relative  ">
                    <select
                      className="form-select   cselect  custroundbtn  "
                      aria-label="Default select example"
                    >
                      <option selected> {t("sort_by")} {t("date")} </option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <Arrow className="iconSize5 position-absolute selclass p-1" />
                  </div>
                </div>
              </div>

              <div className=" col-lg-6 col-xl-2 col-md-3 col-12">
                <div className="d-flex w-100 flex-column  ">
                  <div className="d-flex justify-content-center  align-items-center  w-100  position-relative  ">
                    <select
                      className="form-select  custroundbtn"
                      aria-label="Default select example"
                    >
                      <option selected> {t("sort_by")} {t("date")}</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <Arrow className="iconSize5 position-absolute selclass p-1" />
                  </div>
                </div>
              </div>

              <div className=" col-lg-6 col-xl-2 col-md-3 col-12">
                <div className="d-flex w-100 flex-column">
                  <div className="d-flex justify-content-center  align-items-center  w-100  position-relative  ">
                    <select
                      className="form-select  custroundbtn"
                      aria-label="Default select example"
                    >
                      <option selected> {t("sort_by")} {t("date")}</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <Arrow className="iconSize5 position-absolute selclass p-1" />
                  </div>
                </div>
              </div>
              <div className=" col-lg-6 col-xl-2 col-md-3 col-12">
                <div className="d-flex w-100 flex-column">
                  <div className="d-flex justify-content-center  align-items-center  w-100  position-relative  ">
                    <select
                      className="form-select  custroundbtn"
                      aria-label="Default select example"
                    >
                      <option selected> {t("sort_by")} {t("date")}</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <Arrow className="iconSize5 position-absolute selclass p-1" />
                  </div>
                </div>
              </div>
              <form className="form-inline d-flex  col-xl-4">
                  <div className="form-control mr-sm-2  d-flex gap-2 align-items-center">
                    <Search className="iconSize" />
                    <input
                      className="tit-12-400 border-0 w-100 py-2"
                      type="search"
                      placeholder={ts("search_placeholder")}
                      aria-label="Search"
                    />
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
