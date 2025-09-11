"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import Editform from "@/components/Editform/Editform";
import ExcelDownload from "@/components/ExcelDownload/ExcelDownload"; // Add import
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import printer from "@/assets/admin/printer.svg";
import check from "@/assets/admin/Check.svg";
import Pen from "@/assets/admin/pen.svg";
import { useApiClient } from "@/hooks/useApiClient";
import { formatDate } from "@/functions/formatDate";


export default function QuizCertificatesTable({
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
      const res = await request({
         method: "GET",
         urlPath: `/certificates?page=${pageNumber}`,
        query: { ...DEFAULT_QUERY, page: pageNumber },
      });

      const data = res?.certificates?.data || [];
      setDataa(data);
      setFilter(data);
      setCurrentPage(res?.certificates?.current_page || 1);
      setTotalPages(res?.certificates?.last_page || 1);
      setPage(res?.certificates?.current_page || 1);
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

      const res = await request({
        method: "GET",
        urlPath: `/certificates?${query.toString()}`,
      });

      const data = res.certificates?.data || [];

      setFilter(data);
      setDataa(data);
      setCurrentPage(res.certificates?.current_page || 1);
      setTotalPages(res.certificates?.last_page || 1);
      setPage(res.certificates?.current_page || 1);
    } catch (error) {
      console.log("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewCertificate = (certificateUrl) => {
    if (certificateUrl) {
      // Open the certificate URL in a new tab/window
      window.open(certificateUrl, "_blank", "noopener,noreferrer");
    } else {
      setResultMessage("رابط الشهادة غير متوفر");
      setShowResultModal(true);
    }
  };

  const handleDelete = async (id) => {
    setSelectedId(id);
    setConfirmMessage("هل أنت متأكد من حذف هذه الشهادة؟");
    setConfirmAction(() => () => deleteCertificate(id));
    setShowConfirmModal(true);
  };

  const trainingData = filter.map((item, index) => {
    return {
      key: item.id || index,
      columns: [
        { type: "text", value: item.id },
        {
          type: "user",
          name:
            item.quiz?.webinar?.course_name_certificate ||
            item.quiz_title ||
            "-",
            email: item.quiz?.webinar?.translations?.[0]?.title || "-"
        },
        {
          type: "text",
          value: item.student.full_name || item.certificate_title || "-",
        },
        {
          type: "text",
          value: item.quiz?.teacher.full_name || item.quiz_score || "-",
        },
        { type: "text", value: item.quizzes_result?.user_grade || "-" },
        { type: "text", value: formatDate(item.graduation_date) },
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
            },
          ],
          id: item.id,
        },
      ],
    };
  });

  const TableHead = [
    "#",
    t("title"),
    t("user"),
    t("teacher-name"),
    t("score"),
    t("date"),
    t("actions"),
  ];

  const selectCardData = {
    inputs: [
      {
        title: t("user-name"),
        type: "search",
        filter: "student_name",
        placeholder: t("name-search"),
        apiKey: "student_name",
      },
      {
        title: t("title"),
        type: "search",
        filter: "quiz_title",
        placeholder: t("title-search"),
        apiKey: "title",
      },
      {
        title: t("teacher-name"),
        type: "search",
        filter: "certificate_title",
        placeholder: t("teacher-search"),
        apiKey: "teacher_name",
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
          {/* Add Service Button (like ElectronicServiceTable) */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* Replace the old button with ExcelDownload component */}
            <ExcelDownload
              endpoint="/api/proxy/certificates/export"
              filename="quiz_certificates_report"
              className="btn custfontbtn rounded-2"
              onSuccess={(message) => {
                setResultMessage(t("download_success"));
                setShowResultModal(true);
              }}
              onError={(error) => {
                setResultMessage(t("download_failed"));
                setShowResultModal(true);
              }}
            >
              Excel
            </ExcelDownload>
          </div>

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
