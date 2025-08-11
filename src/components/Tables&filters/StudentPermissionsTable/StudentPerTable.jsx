"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import ExcelDownload from "@/components/ExcelDownload/ExcelDownload"; // Add import
import Arrow from "@/assets/admin/arrow down.svg";
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { useApiClient } from "@/hooks/useApiClient";
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
  const { request } = useApiClient();

  const fetchData = async (pageNumber = 1) => {
    try {
      const result= await request(
        {
          method: "GET",
          urlPath: `/permission/user_access?page=${pageNumber}`,
        }
      );
      
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

      const  result = await request(
      
        {
          method: "GET",
          urlPath: `/permission/user_access?${query.toString()}`,
        }
      );

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
      const response = await request(
    
        {
          method: "POST",
          urlPath: `/permission/toggle_access/${id}`,
          body: { value: newValue },
        }
      );

      
      
      // if (!response.ok) {
      //   // If toggle failed, restore the original data
      //   setDataa(dataa);
      //   setFilter(filter);
      //   throw new Error("Failed to toggle access");
      // }

      // Show success message from response
      setResultMessage(t("access_toggled_success"));
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
          {/* Replace the old button with ExcelDownload component */}
          <ExcelDownload
            endpoint={`${BASE_URL}/permission/export`}
            filename="student_permissions_report"
            className="btn custfontbtn rounded-2 mb-3"
             onSuccess={(message) => {
                setResultMessage("تم تحميل التقرير بنجاح");
                setShowResultModal(true);
              }}
              onError={(error) => {
                setResultMessage("فشل التحميل. حاول مرة أخرى.");
                setShowResultModal(true);
              }}
          >
            Excel
          </ExcelDownload>

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
