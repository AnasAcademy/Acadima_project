"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Arrow from "@/assets/admin/arrow down.svg";
import SearchIcon from "@/assets/admin/search.svg";
import Calendar from "@/assets/calendar.svg";

export default function SelectCard({ selectCardData, isTechSupport, isOrgProfile , data , filterr, setFilter }) {
  const t = useTranslations("employee_progress");
  const t2 = useTranslations("techSupport");
  const t3 = useTranslations("orgProfile");


   const [val , setVal]= useState(null)

  const { inputs = [], button = { show: false } } = selectCardData;


  async function  searchTicket(e){

    const value = Number(e.target.value);;
    console.log("dfgf");
    console.log(filterr);
    const filteredData = filterr.filter(
            (dat) => dat.id === value
          ); 
    console.log(filteredData);

     if (filteredData.length > 0) {
       setFilter(filteredData);
     }   else {

      setFilter(data.supports);

     }

   }




  return (
    <div className="cardbg p-3 d-flex flex-column justify-content-start align-items-start rounded-4 min-adash-ht">
      {isTechSupport && <h2 className="px-3 my-2"> {t2("ticket-filter")} </h2>}
      {isOrgProfile && <h2 className="px-3 my-2"> {t3("orgprofile-table-title")} </h2>}

      <div className="row d-flex justify-content-between w-100 m-0">
        <div className="p-0">
          <div className="m-2 row g-4">
            {inputs.map((input, index) => {
              // Define column size per type (can be overridden with input.col)
              const defaultCol =
                input.col ||
                (input.type === "search" ? "col-xl-2" : "col-xl-2");
              const fullCol = `${defaultCol} col-lg-4 col-md-6 col-12`;

              return (
                <div className={fullCol} key={index}>
                  <div className="d-flex w-100 flex-column position-relative">
                    {input.title && (
                      <label className="h6 mb-1 text-end">
                        {t(input.title)}
                      </label>
                    )}

                    {input.type === "select" && (
                      <div className="d-flex justify-content-center align-items-center w-100 position-relative">
                        <select
                          className="form-select custroundbtn"
                          defaultValue={input.defaultValue || ""}
                        >
                          <option value="">{t("sort_by")}</option>
                          {input.options?.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <Arrow className="iconSize5 position-absolute selclass p-1" />
                      </div>
                    )}

                    {input.type === "date" && (
                      <div className="d-flex custroundbtn overflow-hidden border border-light">
                        {/* Icon container */}
                        <div className="bgprim d-flex align-items-center justify-content-center px-3">
                          <Calendar className="iconSize3"/>
                        </div>

                        {/* Date input */}
                        <input
                          type="date"
                          className="form-control shadow-none rounded-0 ps-3 no-calendar-icon"
                          placeholder="mm/dd/yyyy"
                        />
                      </div>
                    )}

                    {input.type === "search" && (
                      <div className="form-control mr-sm-2  d-flex gap-2 ">
                        {input.icon !== false && (
                          <span className="" style={{ zIndex: 2 }}>
                            <SearchIcon width={15} height={15} />
                          </span>
                        )}
                        <input
                          type="text"
                          placeholder={
                            input.placeholder || t2("search-placeholder")
    
                          }
                          className=" tit-12-400 border-0 w-75"
                         
                           onChange={
                                 searchTicket
                          }
           
                        />


                      </div>
                    )}

                    {input.type === "text" && (
                      <input
                        type="text"
                        placeholder={input.placeholder || ""}
                        className="form-control custroundbtn"
                      />
                    )}
                  </div>
                </div>
              );
            })}

            {button?.show && (
              <div
                className={`col-lg-${
                  button.col || 2
                } col-xl-2 col-lg-4 col-md-6 col-12 d-flex align-items-end mb-xl-1  `}
              >
                <button
                  className={`btn custfontbtn w-100 rounded-2 py-2 ${
                    button.className || ""
                  }`}
                  style={button.style}
                  onClick={button.onClick}
                >
                  {t(button.text || "apply")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
