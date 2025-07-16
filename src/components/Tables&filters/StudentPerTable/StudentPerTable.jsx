"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import Arrow from "@/assets/admin/arrow down.svg";

export default function StudentPerTable() {
  const t = useTranslations("tables");

  const [dataa, setDataa] = useState([]);
  const [studyClasses, setStudyClasses] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilters, setActiveFilters] = useState(null);

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/permission/user_access?page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );
      const result = await res.json();
      setDataa(result.sales.data || []);
      setFilter(result.sales.data || []);
      setStudyClasses(result.studyClasses || []);
      setCurrentPage(result.sales?.current_page || 1); 
      setTotalPages(result.sales?.last_page || 1); 
    } catch (err) {
      console.error("Failed to fetch permissions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchFilters, pageNumber = 1) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      selectCardData.inputs.forEach((input) => {
        const value = searchFilters[input.filter];
        if (value) {
          query.append(input.apiKey || input.filter, value);
        }
      });

      query.append("page", pageNumber); 

      const res = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/permission/user_access?${query.toString()}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );

      const result = await res.json();
      setFilter(result.sales.data || []);
      setCurrentPage(result.sales?.current_page || 1); 
      setTotalPages(result.sales?.last_page || 1); 
      setActiveFilters(searchFilters); 
    } catch (err) {
      console.error("Failed to search:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeFilters) {
      handleSearch(activeFilters, page);
    } else {
      fetchData(page); 
    }
  }, [page]);

  const handleToggle = async (id, currentValue) => {
    const newValue = currentValue === 1 ? 0 : 1;
    try {
      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/permission/toggle_access/${id}`,
        {
          method: "POST",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
          body: JSON.stringify({ value: newValue }),
        }
      );

      if (!response.ok) throw new Error("Failed to toggle access");

      if (activeFilters) {
        handleSearch(activeFilters, page);
      } else {
        fetchData(page);
      }
    } catch (err) {
      console.error("Toggle failed:", err);
      alert("تعذر تعديل حالة الوصول");
    }
  };

  const trainingData = filter.map((item, index) => ({
    columns: [
      { type: "text", value: index + 1 },
      {
        type: "user",
        name: item.buyer.full_name,
        email: item.buyer.id,
        phone: item.buyer.user_code,
      },
      { type: "text", value: item.item_title },
      { type: "text", value: item.class.title },
      {
        type: "toggleAccess",
        value: item.access_to_purchased_item,
        id: item.id,
        onToggle: handleToggle,
      },
    ],
  }));

  const TableHead = [
    "#",
    t("user-name"),
    t("registered-program"),
    t("batch-number"),
    t("user-access"),
  ];

  const studyClassOptions = studyClasses.map((cls) => cls.title);

  const selectCardData = {
    inputs: [
      {
        title: t("user-code"),
        type: "search",
        filter: "bundle_student.student_id",
        apiKey: "user_code",
      },
      {
        title: t("user-name"),
        type: "search",
        filter: "bundle_student.student.en_name",
        apiKey: "full_name",
      },
      {
        title: t("study-classes"),
        type: "select",
        filter: "study_class.title",
        apiKey: "class",
        options: studyClassOptions,
      },
    ],
  };

  return (
    <div className="row g-3">
      <div className="col-12">
        <SelectCard
          selectCardData={selectCardData}
          isTechSupport={true}
          setFilter={setFilter}
          dataa={dataa}
          handleSearch={(filters) => {
            setPage(1);
            handleSearch(filters, 1);
          }}
        />
      </div>

      <div className="col-12">
        <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
          {loading ? (
            <div className="text-center py-4">جاري التحميل...</div>
          ) : (
            <>
              <OngoingTrain
                TableHead={TableHead}
                trainingData={trainingData}
                button={false}
              />
              <div className="row justify-content-center align-items-center gap-3 mt-3">
                <button
                  disabled={page === 1}
                  className="btn custfontbtn col-1"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
                  {t("previous-page")}
                </button>
                <span className="px-2 align-self-center col-1 text-center">
                  {t("page")} {currentPage}
                </span>
                <button
                  disabled={page >= totalPages}
                  className="btn custfontbtn col-1"
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  {t("next-page")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
