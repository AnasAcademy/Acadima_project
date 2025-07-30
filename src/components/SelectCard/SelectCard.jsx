"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from "@/assets/admin/search.svg";
import Arrow from "@/assets/admin/Arrow-down.svg";
import Calendar from "@/assets/calendar.svg";
import { useTranslations } from "next-intl";

export default function SelectCard({
  selectCardData,
  isTechSupport,
  isOrgProfile,
  handleSearch,
}) {
  const t = useTranslations("employee_progress");
  const t2 = useTranslations("techSupport");
  const t3 = useTranslations("orgProfile");

  const [filters, setFilters] = useState({});

  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch(filters);
    }, 300);

    return () => clearTimeout(delay);
  }, [filters]);

  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const { inputs = [], button = { show: false } } = selectCardData;

  return (
    <div className="cardbg p-3 d-flex flex-column justify-content-start align-items-start rounded-4 min-adash-ht">
      {isTechSupport && <h2 className="px-3 my-2">{t2("ticket-filter")}</h2>}
      {isOrgProfile && (
        <h2 className="px-3 my-2">{t3("orgprofile-table-title")}</h2>
      )}

      <div className="row d-flex justify-content-between w-100 m-0">
        <div className="p-0">
          <div className="m-2 row g-4">
            {inputs.map((input, index) => {
              const defaultCol = input.col || "col-xl-2";
              const fullCol = `${defaultCol} col-lg-4 col-md-6 col-12`;

              return (
                <div className={fullCol} key={index}>
                  <div className="d-flex w-100 flex-column align-items-start position-relative">
                    {input.title && (
                      <label className="h6 mb-1 text-end">{input.title}</label>
                    )}

                    {input.type === "search" && (
                      <div className="form-control mr-sm-2 d-flex gap-2">
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
                          onChange={(e) =>
                            handleFilterChange(input.filter, e.target.value)
                          }
                        />
                      </div>
                    )}

                    {input.type === "select" && (
                      <div className="d-flex justify-content-center align-items-center w-100 position-relative">
                        <select
                          className="form-select custroundbtn"
                          defaultValue=""
                          onChange={(e) =>
                            handleFilterChange(input.filter, e.target.value)
                          }
                        >
                          <option value="">{input.placeholder || t("sort_by")}</option>
                          {input.options?.map((option, i) => {
                            // Handle both string options and objects with value/label
                            const value = typeof option === 'object' ? option.value : option;
                            const label = typeof option === 'object' ? option.label : option;
                            return (
                              <option key={i} value={value}>
                                {label}
                              </option>
                            );
                          })}
                        </select>
                        <Arrow className="iconSize5 position-absolute selclass p-1" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
