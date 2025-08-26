"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import Editform from "@/components/Editform/Editform";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import printer from "@/assets/admin/printer.svg";
import check from "@/assets/admin/Check.svg";
import Pen from "@/assets/admin/pen.svg";
import { useApiClient } from "@/hooks/useApiClient";


export default function CourseCertificatesTable({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
}) {
  const t = useTranslations("tables");
  const ts = useTranslations("SidebarA");

  const [dataa, setDataa] = useState(initialData);
  const [filter, setFilter] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);
  const [formState, setFormState] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
    const { request } = useApiClient();
  

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
       const respond = await request({
        method: "GET",
        urlPath: `certificates/course-competition?page=${pageNumber}`,
      });
       
      const data = respond?.certificates?.data || respond?.data || [];
      setDataa(data);
      setFilter(data);
      setCurrentPage(
        respond?.certificates?.current_page || respond?.current_page || 1
      );
      setTotalPages(
        respond?.certificates?.last_page || respond?.last_page || 1
      );
      setPage(
        respond?.certificates?.current_page || respond?.current_page || 1
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Only fetch data on page change, not on initial mount since we have initialData
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return; // Skip fetch on initial mount
    }
    fetchData(page);
  }, [page]);

  const handleSearch = async (filters, pageNumber = 1) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();

      // Append all filter parameters
      selectCardData.inputs.forEach((input) => {
        const value = filters[input.filter];
        if (value) {
          query.append(input.apiKey || input.filter, value);
        }
      });

      // Append pagination separately
      query.append("page", pageNumber);

      const respond = await request({
        method: "GET",
        urlPath: `/certificates/course-competition?${query.toString()}`,
      });
        

      const data = respond?.certificates?.data || respond?.data || [];

      setFilter(data);
      setDataa(data);
      setCurrentPage(
        respond?.certificates?.current_page || respond?.current_page || 1
      );
      setTotalPages(
        respond?.certificates?.last_page || respond?.last_page || 1
      );
      setPage(
        respond?.certificates?.current_page || respond?.current_page || 1
      );
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const trainingData = filter.map((item, index) => {
    return {
      key: item.id || index,
      columns: [
        { type: "text", value: item.id },
        { type: "text", value: item.bundle.slug || item.course_title || "-" },
        { type: "text", value: item.certificate_code || "-" },
        {
          type: "user",
          name: item.student?.full_name || "-",
          code: item.student?.user_code || "-",
          email: item.student?.email || "-",
        },
        { type: "text", value: item.webinar?.teacher?.full_name || "-" },
        { type: "text", value: item.graduation_date || "-" },
        {
          type: "actionbutton",
          label: t("actions"),
          action: () => {
            setShowModal(!showModal);
            setSelectedId(item.id);
          },
          icon: Arrowdown,
          lists: [
            {
              label: t("download"),
              // action: () => viewCertificate(item.certificate_url || item.download_url),
              icon: printer,
            }
          ],
          id: item.id,
        },
      ],
    };
  });

  const TableHead = [
    "#",
    t("title"),
    t("certificate_code"),
    t("user"),
    t("teacher-name"),
    // t("completion-rate"),
    t("date"),
    t("actions"),
  ];

  const selectCardData = {
    inputs: [
      {
        title: t("title"),
        type: "search",
        filter: "title",
        placeholder: t("title-search"),
        apiKey: "title",
      },
      {
        title: t("teacher-name"),
        type: "search",
        filter: "teacher-name",
        placeholder: t("teacher-search"),
        apiKey: "teacherName",
      },
    ],
  };

  return (
    <div className="row g-3">
      <div className="col-12">
        <SelectCard
          selectCardData={selectCardData}
          isTechSupport={true}
          dataa={dataa}
          setFilter={setFilter}
          handleSearch={handleSearch}
        />
      </div>

      <div className="col-12">
        <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
          <OngoingTrain
            TableHead={TableHead}
            trainingData={trainingData}
            button={false}
          />

          <div className="row justify-content-center align-items-center gap-3 mt-3">
            <button
              disabled={currentPage === 1 || loading}
              className="btn custfontbtn col-1"
              onClick={() => setPage(Math.max(currentPage - 1, 1))}
            >
              {loading ? "..." : t("previous-page")}
            </button>
            <span className="px-2 align-self-center col-1 text-center">
              {t("page")} {currentPage}
            </span>
            <button
              disabled={currentPage >= totalPages || loading}
              className="btn custfontbtn col-1"
              onClick={() => setPage(currentPage + 1)}
            >
              {loading ? "..." : t("next-page")}
            </button>
          </div>
        </div>
      </div>

      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title={t("operation_completed")}
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>

      <AlertModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onSubmit={() => {
          if (confirmAction) {
            confirmAction();
          }
        }}
        title={t("operation_completed")}
      >
        <p className="m-0 text-center">{confirmMessage}</p>
      </AlertModal>
    </div>
  );
}
