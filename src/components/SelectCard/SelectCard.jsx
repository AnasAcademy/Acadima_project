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
  // title
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
     
      {/* <h2 className="px-3 my-2">{title}</h2> */}
 
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
                      <label className=" mb-1 text-end Tit-14-700">
                        {input.title}
                      </label>
                    )}
 
                    {input.type === "search" && (
                      <div className="search-wrapper d-flex align-items-center">
                        {input.icon !== false && (
                          <span className="search-icon" style={{ zIndex: 2 }}>
                            <SearchIcon width={15} height={15} />
                          </span>
                        )}
                        <input
                          type="text"
                          placeholder={
                            input.placeholder || t2("search-placeholder")
                          }
                          className=" search-input"
                          onChange={(e) =>
                            handleFilterChange(input.filter, e.target.value)
                          }
                        />
                      </div>
                    )}
                    {input.type === "date" && (
                      <div className="search-wrapper d-flex align-items-center">
                        
                        <input
                          type="date"
                          className="search-input"
                          onChange={(e) =>
                            handleFilterChange(input.filter, e.target.value)
                          }
                        />
                      </div>
                    )}
                    {input.type === "select" && (
                      <div className="search-wrapper d-flex align-items-center  ">
                        <select
                          className="search-input "
                          defaultValue=""
                          onChange={(e) =>
                            handleFilterChange(input.filter, e.target.value)
                          }
                        >
                          <option value=" " >
                            {input.placeholder || t("sort_by")}
                          </option>
                          {input.options?.map((option, i) => {
                            const value =
                              typeof option === "object"
                                ? option.value
                                : option;
                            const label =
                              typeof option === "object"
                                ? option.label
                                : option;
                            return (
                              <option key={i} value={value} >
                                {label}
                              </option>
                            );
                          })}
                        </select>
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
 