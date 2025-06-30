  import React from 'react'
  import { useTranslations } from "next-intl";
  import Filter from "@/assets/admin/filter.svg"
  import Search from "@/assets/admin/search.svg" 
  import Arrow from "@/assets/admin/arrow down.svg"


  export default function FilterCard() {

    const t = useTranslations("employee_progress");
    return (
      <>
        <h2 className=" hvvv p-4"> {t("page_title")}</h2>
        <div className="cardbg  px-3 py-2 d-flex flex-row justify-content-between align-items-center rounded-4  min-adash-ht">
          <div className="  row d-flex justify-content-between  w-100  m-lg-5">
            <div className=" col-6 ">
              <div className=" d-flex    gap-3 ">
                <button className="btn custfontbtnbold p-2 rounded-3">
                  {t("add_employee")}
                </button>
                <button className="btn custroundbtn p-2 ">
                  {t("filter")} <Filter className=" iconSize3" />
                </button>
              </div>
            </div>

            <div className=" col-6">
              <div className={`d-flex flex-xl-row  flex-column    gap-4`}>
                <div className="d-flex justify-content-center  align-items-center  w-100  position-relative  ">
                  <select
                    className="form-select   cselect  custroundbtn  "
                    aria-label="Default select example"
                    defaultValue={0}
                  >
                    <option value="0"> {t("sort_by")} </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <Arrow className="iconSize5 position-absolute selclass p-1" />
                </div>

                <div className="d-flex justify-content-center  align-items-center  w-100  position-relative  ">
                  <select
                    className="form-select   cselect  custroundbtn  "
                    aria-label="Default select example"
                    defaultValue={0}
                  >
                    <option value="0"> {t("view_option")} </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <Arrow className="iconSize5 position-absolute selclass p-1" />
                </div>
                <form className="form-inline my-2 my-lg-0 d-flex w-100 ">
                  <div className="form-control mr-sm-2  d-flex gap-2 ">
                    <Search className="iconSize" />
                    <input
                      className="tit-12-400 border-0 "
                      type="search"
                      placeholder={t("search_placeholder")}
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
  