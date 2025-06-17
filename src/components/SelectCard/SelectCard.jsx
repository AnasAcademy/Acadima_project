"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Arrow from "@/assets/admin/arrow down.svg";
import SearchIcon from "@/assets/admin/search.svg"; // Optional

export default function SelectCard({ selectCardData, isTechSupport }) {
  const t = useTranslations("employee_progress");
  const t2 = useTranslations("techSupport");

  const { inputs = [], button = { show: false } } = selectCardData;

  return (
    <div className="cardbg p-3 d-flex flex-column justify-content-start align-items-start rounded-4 min-adash-ht">
      {isTechSupport && (
          <h2 className="px-3 my-2"> {t2("ticket-filter")} </h2>
        )}
      <div className="row d-flex justify-content-between w-100 m-0">
        <div className="p-0">
          <div className="m-2 row g-4">
            {inputs.map((input, index) => {
              // Define column size per type (can be overridden with input.col)
              const defaultCol =
                input.col || (input.type === "search" ? "col-xl-2" : "col-xl-2");
              const fullCol = `${defaultCol} col-lg-4 col-md-6 col-12`;

              return (
                <div className={fullCol} key={index}>
                  <div className="d-flex w-100 flex-column position-relative">
                    {input.title && (
                      <label className="h6 mb-1 text-end">{t(input.title)}</label>
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
                      <div className="position-relative align-items-center">
                        <input
                          type="date"
                          className="form-select custroundbtn" 
                        />
                      </div>
                    )}

                    {input.type === "search" && (
                      <div className="form-control mr-sm-2  d-flex gap-2 ">
                        {input.icon !== false && (
                          <span
                            className=""
                            style={{ zIndex: 2 }}
                          >
                            <SearchIcon width={15} height={15} />
                          </span>
                        )}
                        <input
                          type="text"
                          placeholder={input.placeholder || t2("search-placeholder")}
                          className=" tit-12-400 border-0 "
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
              <div className={`col-lg-${button.col || 2} col-xl-2 col-lg-4 col-md-6 col-12 d-flex align-items-end`}>
                <button
                  className={`btn w-100 rounded-2 py-2 ${button.className || "btn-dark text-white"}`}
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
