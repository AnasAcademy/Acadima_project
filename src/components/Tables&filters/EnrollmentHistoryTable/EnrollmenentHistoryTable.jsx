"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import Editform from "@/components/Editform/Editform";
import ExcelDownload from "@/components/ExcelDownload/ExcelDownload";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import printer from "@/assets/admin/printer.svg";
import check from "@/assets/admin/Check.svg";
import { useApiClient } from "@/hooks/useApiClient";
import { useUserData } from "@/context/UserDataContext";

export default function EnrollmentHistoryTable({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
}) {
  const t = useTranslations("tables");
  const ts = useTranslations("SidebarA");
  const { request } = useApiClient();

  // ---- CHANGED: use getters instead of raw studentsList
  const { getStudentOptions, getWebinarOptions } = useUserData();

  const [dataa, setDataa] = useState(initialData);
  const [filter, setFilter] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [currentFilters, setCurrentFilters] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);
  const [formState, setFormState] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await request({
        method: "GET",
        urlPath: `/enrollments/history`,
        query: { page: pageNumber },
      });

      const data = response?.data || [];
      setDataa(data);
      setFilter(data);
      setCurrentPage(response?.current_page || 1);
      setTotalPages(response?.last_page || 1);
      setPage(response?.current_page || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    if (Object.keys(currentFilters).length > 0) {
      handleSearch(currentFilters, page);
    } else {
      fetchData(page);
    }
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = async (filters, pageNumber = 1) => {
    setLoading(true);
    setCurrentFilters(filters);
    try {
      const queryParams = {};

      selectCardData.inputs.forEach((input) => {
        const value = filters[input.filter];
        if (value) {
          queryParams[input.apiKey || input.filter] = value;
        }
      });

      queryParams.page = pageNumber;

      const response = await request({
        method: "GET",
        urlPath: `/enrollments/history`,
        query: queryParams,
      });

      const data = response?.data || [];
      setFilter(data);
      setDataa(data);
      setCurrentPage(response?.current_page || 1);
      setTotalPages(response?.last_page || 1);
      setPage(response?.current_page || 1);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const openInvoice = (invoiceUrl) => {
    if (invoiceUrl) {
      window.open(invoiceUrl, "_blank", "noopener,noreferrer");
    } else {
      setResultMessage("رابط الفاتورة غير متوفر");
      setShowResultModal(true);
    }
  };

  const handleEnableAccess = (id) => {
    setSelectedId(id);
    setConfirmMessage(t("are_you_sure_you_want_to_enable_access"));
    setConfirmAction(() => () => enableAccess(id));
    setShowConfirmModal(true);
  };

  const handleDisableAccess = (id) => {
    setSelectedId(id);
    setConfirmMessage(t("are_you_sure_you_want_to_deny_access"));
    setConfirmAction(() => () => disableAccess(id));
    setShowConfirmModal(true);
  };

  const enableAccess = async (id) => {
    try {
      const response = await request({
        method: "GET",
        urlPath: `/enrollments/${id}/enable-access`,
      });

      if (response?.[0]?.status === "success") {
        setResultMessage(response.msg || t("access_enabled"));
        setShowResultModal(true);
        fetchData(currentPage);
      } else {
        throw new Error(response.msg || "فشل في تفعيل الوصول");
      }
    } catch (error) {
      console.error("Enable access failed:", error);
      setResultMessage("فشل في تفعيل الوصول. حاول مرة أخرى.");
      setShowResultModal(true);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const disableAccess = async (id) => {
    try {
      const response = await request({
        method: "GET",
        urlPath: `/enrollments/${id}/block-access`,
      });

      if (response?.[0]?.status === "success") {
        setResultMessage(response.msg || t("access_denied"));
        setShowResultModal(true);
        fetchData(currentPage);
      } else {
        throw new Error(response.msg || "فشل في إلغاء الوصول");
      }
    } catch (error) {
      console.error("Disable access failed:", error);
      setResultMessage("فشل في إلغاء الوصول. حاول مرة أخرى.");
      setShowResultModal(true);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const handleSubmitAdd = async (formData) => {
    try {
      const response = await request({
        method: "POST",
        urlPath: `/enrollments/store`,
        body: {
          user_id: parseInt(formData.user_id),
          webinar_id: parseInt(formData.webinar_id),
        },
      });

      if (response.status === 422) {
        setResultMessage(t("user_already_enrolled"));
        setShowResultModal(true);
        setShowEditForm(false);
      } else {
        setResultMessage(
          t("user_enrolled_successfully")
        );
        setShowResultModal(true);
        setShowEditForm(false);
        fetchData(currentPage);
      }
    } catch (error) {
      console.error("Add failed:", error);
      const errorMsg = error.message?.includes("422")
        ? t("user_already_enrolled")
        : "فشل الإضافة. حاول مرة أخرى.";
      setResultMessage(errorMsg);
      setShowResultModal(true);
    }
  };

  const trainingData = filter.map((item, index) => {
    const hasAccess = item.access_to_purchased_item || false;

    return {
      key: item.id || index,
      columns: [
        { type: "text", value: index + 1 },
        {
          type: "user",
          name: item.buyer?.full_name || item.full_name || "-",
          id: item.buyer?.id || item.id || "-",
        },
        {
          type: "user",
          name:
            item.webinar?.creator?.full_name ||
            item.full_name ||
            "-",
          id: item.webinar?.creator?.id || item.id || "-",
        },
        {
          type: "user",
          name:
            item.webinar?.translations?.[0]?.title ||
            item.full_name ||
            "-",
          id:
            item.webinar?.translations?.[0]?.id ||
            item.id ||
            "-",
        },
        {
          type: "label",
          value: item.manual_added ? t("manual") : t("automatic"),
        },
        { type: "text", value: item.created_at || item.join_date || "-" },
        { type: "label", value: item.status_label || "-" },
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
              label: t("invoice"),
              action: () => openInvoice(item.invoice_url),
              icon: printer,
            },
            {
              label: hasAccess ? t("close-entry") : t("enable-student-access"),
              action: () =>
                hasAccess
                  ? handleDisableAccess(item.id)
                  : handleEnableAccess(item.id),
              icon: hasAccess ? X : check,
            },
          ],
          id: item.id,
        },
      ],
    };
  });

  const TableHead = [
    "#",
    t("user-name"),
    t("teacher-name"),
    t("registered-program"),
    t("type"),
    t("creation_date"),
    t("status"),
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
        title: t("teacher-name"),
        type: "search",
        filter: "teacher_name",
        placeholder: t("teacher-search"),
        apiKey: "teacher_name",
      },
      {
        title: t("registered-program"),
        type: "search",
        filter: "program_name",
        placeholder: t("program-search"),
        apiKey: "item_title",
      },
    ],
  };

  // ---- CHANGED: use getters from context
  const studentOptions = getStudentOptions();
  const webinarOptions = getWebinarOptions();

  const formTitles = [
    {
      label: t("add-new-enrollment"),
      type: "text",
    },
    { label: formState === "add" ? t("add") : t("edit"), type: "text" },
  ];

  const fields = [
    {
      name: "user_id",
      label: t("user_id"),
      type: "selectsearch",
      options: studentOptions,
      required: true,
      placeholder: "Search students",
    },
    {
      name: "webinar_id",
      label: t("webinar_id"),
      type: "selectsearch",
      options: webinarOptions,
      required: true,
      placeholder: "Search classes",
    },
  ];

  return (
    <>
      {showEditForm ? (
        <div className="row g-3">
          <div className="col-12">
            <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
              <Editform
                fields={fields}
                formTitles={formTitles}
                handleSubmitAdd={handleSubmitAdd}
                setShowModal={() => setShowEditForm(false)}
                formState={formState}
                loading={loading}
              />
            </div>
          </div>
        </div>
      ) : (
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
              <div className="d-flex justify-content-between align-items-center mb-3">
                <ExcelDownload
                  endpoint="/api/proxy/enrollments/export"
                  filename="enrollment_history_report"
                  className="btn custfontbtn rounded-2"
                  onSuccess={() => {
                    setResultMessage(t("download_success"));
                    setShowResultModal(true);
                  }}
                  onError={() => {
                    setResultMessage(t("download_failed"));
                    setShowResultModal(true);
                  }}
                >
                  Excel
                </ExcelDownload>

                <button
                  className="btn btn-light custfontbtn"
                  onClick={() => {
                    setShowEditForm(true);
                    setSelectedId(null);
                    setFormState("add");
                  }}
                >
                  {t("add-new-enrollment")}
                </button>
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
                  {t("previous-page")}
                </button>
                <span className="px-2 align-self-center col-1 text-center">
                  {t("page")} {currentPage}
                </span>
                <button
                  disabled={currentPage >= totalPages || loading}
                  className="btn custfontbtn col-1"
                  onClick={() => setPage(currentPage + 1)}
                >
                  {t("next-page")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
}
