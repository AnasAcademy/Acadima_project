"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import Arrow from "@/assets/admin/arrow down.svg";

export default function StudentPerTable({ 
  initialData = [], 
  initialStudyClasses = [], 
  initialPage = 1, 
  initialTotalPages = 1 
}) {
  const t = useTranslations("tables");

  const [dataa, setDataa] = useState(initialData);
  const [studyClasses, setStudyClasses] = useState(initialStudyClasses);
  const [filter, setFilter] = useState(initialData);
  const [page, setPage] = useState(initialPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [activeFilters, setActiveFilters] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const fetchData = async (pageNumber = 1) => {
    try {
      const res = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/permission/user_access?page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MVBhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );
      const result = await res.json();
      setDataa(result.sales.data || []);
      setFilter(result.sales.data || []);
      setStudyClasses(result.studyClasses || []);
      setCurrentPage(result.sales?.current_page || 1);
      setTotalPages(result.sales?.last_page || 1);
      setPage(result.sales?.current_page || 1);
    } catch (err) {
      console.error("Failed to fetch permissions:", err);
    }
  };

  const handleSearch = async (searchFilters, pageNumber = 1) => {
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
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );

      const result = await res.json();
      setFilter(result.sales.data || []);
      setCurrentPage(result.sales?.current_page || 1);
      setTotalPages(result.sales?.last_page || 1);
      setPage(result.sales?.current_page || 1);
      setActiveFilters(searchFilters);
    } catch (err) {
      console.error("Failed to search:", err);
    }
  };

  // Only fetch data on page change, not on initial mount since we have initialData
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return; // Skip fetch on initial mount
    }
    if (activeFilters) {
      handleSearch(activeFilters, page);
    } else {
      fetchData(page);
    }
  }, [page]);

  const handleToggle = async (id, currentValue) => {
    const newValue = currentValue === 1 ? 0 : 1;
    
    // Optimistically update the access value immediately
    const updatedData = dataa.map(item => 
      item.id === id ? { ...item, access_to_purchased_item: newValue } : item
    );
    const updatedFilter = filter.map(item => 
      item.id === id ? { ...item, access_to_purchased_item: newValue } : item
    );
    setDataa(updatedData);
    setFilter(updatedFilter);

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

      const data = await response.json();
      
      if (!response.ok) {
        // If toggle failed, restore the original data
        setDataa(dataa);
        setFilter(filter);
        throw new Error("Failed to toggle access");
      }

      // Show success message from response
      setResultMessage(data.message || "تم تحديث حالة الوصول بنجاح");
      setShowResultModal(true);
    } catch (err) {
      console.error("Toggle failed:", err);
      // Restore original data on error
      if (activeFilters) {
        handleSearch(activeFilters, page);
      } else {
        fetchData(page);
      }
      // Show error message
      setResultMessage("تعذر تعديل حالة الوصول");
      setShowResultModal(true);
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

  const DownloadExcel = async () => {
    try {
      const response = await fetch(
        "https://api.lxera.net/api/development/organization/vodafone/permission/export",
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "report.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      alert("Download succeded");
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    }
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
          <button
            className="btn custfontbtn rounded-2 mb-3"
            onClick={DownloadExcel}
          >
            Excel
          </button>

          {/* Removed loading state - always show table */}
          <OngoingTrain
            TableHead={TableHead}
            trainingData={trainingData}
            button={false}
          />
          <div className="row justify-content-center align-items-center gap-3 mt-3">
            <button
              disabled={currentPage === 1}
              className="btn custfontbtn col-1"
              onClick={() => setPage(Math.max(currentPage - 1, 1))}
            >
              {t("previous-page")}
            </button>
            <span className="px-2 align-self-center col-1 text-center">
              {t("page")} {currentPage}
            </span>
            <button
              disabled={currentPage >= totalPages}
              className="btn custfontbtn col-1"
              onClick={() => setPage(currentPage + 1)}
            >
              {t("next-page")}
            </button>
          </div>
        </div>
      </div>

      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title="تمت العملية"
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>
    </div>
  );
}
