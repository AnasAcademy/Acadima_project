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
import check from "@/assets/admin/check.svg";

export default function EnrollmentHistoryTable({
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

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/enrollments/history?page=${pageNumber}`,
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
      const respond = await res.json();
      const data = respond?.data || [];
      setDataa(data);
      setFilter(data);
      setCurrentPage(respond?.current_page || 1);
      setTotalPages(respond?.last_page || 1);
      setPage(respond?.current_page || 1);
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

      const res = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/enrollments/history?${query.toString()}`,
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

      const respond = await res.json();
      const data = respond?.data || [];

      setFilter(data);
      setDataa(data);
      setCurrentPage(respond?.current_page || 1);
      setTotalPages(respond?.last_page || 1);
      setPage(respond?.current_page || 1);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const openInvoice = (invoiceUrl) => {
    if (invoiceUrl) {
      // Open the invoice URL in a new tab/window
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
      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/enrollments/${id}/enable-access`,
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

      const result = await response.json();
      if (response.ok && result?.[0].status === "success") {
        setResultMessage(result.msg || t("access_enabled"));
        setShowResultModal(true);
        // Refresh data to reflect changes
        fetchData(currentPage);
      } else {
        throw new Error(result.msg || "فشل في تفعيل الوصول");
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
      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/enrollments/${id}/block-access`,
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

      const result = await response.json();

      if (response.ok && result?.[0].status === "success") {
        setResultMessage(result.msg || t("access_denied"));
        setShowResultModal(true);
        // Refresh data to reflect changes
        fetchData(currentPage);
      } else {
        throw new Error(result.msg || "فشل في إلغاء الوصول");
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
      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/enrollments/store`,
        {
          method: "POST",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
          body: JSON.stringify({
            user_id: parseInt(formData.user_id),
            webinar_id: parseInt(formData.webinar_id),
          }),
        }
      );

      const result = await response.json();
      if (response.status === 422) {
        setResultMessage(t("user_already_enrolled"));
        setShowResultModal(true);
        setShowEditForm(false);
      } else if (response.ok) {
        setResultMessage(
          result.message || "User enrolled successfully into group A"
        );
        setShowResultModal(true);
        setShowEditForm(false);
        fetchData(currentPage);
      } else {
        const errorText = result.errors
          ? Object.values(result.errors).join(", ")
          : result.message || `فشل الإضافة (${response.status})`;
        setResultMessage(`فشل الإضافة: ${errorText}`);
        setShowResultModal(true);
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Add failed:", error);
      setResultMessage("فشل الإضافة. حاول مرة أخرى.");
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
          name: item.buyer.full_name || item.full_name || "-",
          id: item.buyer.id || item.id || "-",
        },
        {
          type: "user",
          name: item.webinar.creator.full_name || item.full_name || "-",
          id: item.webinar.creator.id || item.id || "-",
        },
        {
          type: "user",
          name: item.webinar.translations?.[0].title || item.full_name || "-",
          id: item.webinar.translations?.[0].id || item.id || "-",
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
      //   {
      //     title: t("status"),
      //     type: "select",
      //     filter: "status",
      //     placeholder: t("status"),
      //     apiKey: "status",
      //     options: [
      //       { value: "completed", label: t("completed") },
      //       { value: "in_progress", label: t("in-progress") },
      //       { value: "not_started", label: t("not-started") },
      //     ],
      //   },
    ],
  };

  const formTitles = [
    {
      label:
        //   (formState === "add" ? t("add") + " " : t("edit") + " ") +
        t("add-new-enrollment"),
      type: "text",
    },
    { label: formState === "add" ? t("add") : t("edit"), type: "text" },
  ];

  const fields = [
    { name: "user_id", label: t("user_id"), type: "number" },
    { name: "webinar_id", label: t("webinar_id"), type: "number" },
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
              {/* Add Service Button (like ElectronicServiceTable) */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                {/* Replace the old button with ExcelDownload component */}
                <ExcelDownload
                  endpoint="https://api.lxera.net/api/development/organization/vodafone/enrollments/export"
                  filename="enrollment_history_report"
                  className="btn custfontbtn rounded-2"
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
