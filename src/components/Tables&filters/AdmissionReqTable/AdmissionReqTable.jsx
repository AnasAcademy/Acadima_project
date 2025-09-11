"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import ExcelDownload from "@/components/ExcelDownload/ExcelDownload";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import check from "@/assets/admin/Check.svg";
import { useApiClient } from "@/hooks/useApiClient";
import { formatDate } from "@/functions/formatDate";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function AdmissionReqTable({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
  rejectionReasons = [] // Already localized from server
}) {
  const t = useTranslations("tables");
  const [dataa, setDataa] = useState(initialData);
  const [filter, setFilter] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showRejectionDetailsModal, setShowRejectionDetailsModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [detailedRejectionReason, setDetailedRejectionReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedRejectionDetails, setSelectedRejectionDetails] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);
  const { request } = useApiClient();
  // Update showRejectionDetails to handle API labels
  const showRejectionDetails = (item) => {
    if (item.message) {
      const parts = item.message.split('<br>');
      const reasonValue = parts[0] || '';
      const description = parts[1] || '';
      
      // Find the reason from the API response to get the localized label
      const reasonFromAPI = rejectionReasons.find(r => r.value === reasonValue.trim());
      const displayReason = reasonFromAPI ? reasonFromAPI.label : reasonValue.trim();
      
      setSelectedRejectionDetails({
        reason: displayReason,
        description: description.trim(),
        fullMessage: item.message
      });
      setShowRejectionDetailsModal(true);
    }
  };

  // Create rejection action function
  const rejection_action = (item) => {
    if (item.status === "rejected" && item.message) {
      return () => showRejectionDetails(item);
    }
    return null;
  };

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const respond = await request({
        method: "GET",
        urlPath: `/requirements/list?page=${pageNumber}`,
      });
 
      const data = respond.data.data || [];
      setDataa(data);
      setFilter(data);
      setCurrentPage(respond.data.current_page || 1);
      setTotalPages(respond.data.last_page || 1);
      setPage(respond.data.current_page || 1);
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
        urlPath: `/requirements/list?${query.toString()}`,
      });


      const data = respond.data?.data || [];

      setFilter(data);
      setDataa(data); // Also update dataa to keep it in sync
      setCurrentPage(respond.data?.current_page || 1);
      setTotalPages(respond.data?.last_page || 1);
      setPage(respond.data?.current_page || 1); // Update page state
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const Accept = async (id) => {
    try {
      // Optimistically update the status to "approved" immediately
      const updatedData = dataa.map((item) =>
        item.id === id ? { ...item, status: "approved" } : item
      );
      const updatedFilter = filter.map((item) =>
        item.id === id ? { ...item, status: "approved" } : item
      );
      setDataa(updatedData);
      setFilter(updatedFilter);
      const data = await request({
        method: "GET",
        urlPath: `/requirements/${id}/approve`,
      });
       console.log("Approval response:", data);

      if ( !data.success) {
        // If approval failed, restore the original data
        setDataa(dataa);
        setFilter(filter);
        throw new Error("Failed to approve");
      }

      setResultMessage(t("requirements_approved"));
      setShowResultModal(true);
    } catch (error) {
      console.error("Status update failed:", error);
      fetchData(page);
      alert("تعذر تحديث الحالة، حاول مرة أخرى.");
    }
  };

  const Decline = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleRejectionSubmit = async () => {
    try {
      // Optimistically update the status to "rejected" immediately
      const updatedData = dataa.map((item) =>
        item.id === selectedId ? { ...item, status: "rejected" } : item
      );
      const updatedFilter = filter.map((item) =>
        item.id === selectedId ? { ...item, status: "rejected" } : item
      );
      setDataa(updatedData);
      setFilter(updatedFilter);

      const payload = {
        reason: rejectionReason,
        message: detailedRejectionReason,
      };

      const data = await request(
    
        {
          method: "POST",
          urlPath: `/requirements/${selectedId}/reject`,
          body: payload,
        }
      );


      if ( !data.success) {
        // If rejection failed, restore the original data
        setDataa(dataa);
        setFilter(filter);
        throw new Error("Failed to reject");
      }

      setResultMessage(t("requirements_rejected"));
      setShowResultModal(true);
      setShowModal(false);
      setRejectionReason("");
      setDetailedRejectionReason("");
      setSelectedId(null);
    } catch (error) {
      console.error("Rejection failed:", error);
      // Restore original data on error
      fetchData(page);
      alert("فشل الرفض. حاول مرة أخرى.");
    }
  };

  const trainingData = filter.map((item, index) => ({
    key: item.id || index,
    columns: [
      { type: "text", value: index + 1 },
      { type: "text", value: item.bundle_student.student.user.user_code || "-" },
      {
        type: "user",
        name: item.bundle_student.student.en_name || "-",
        email: item.bundle_student.student.email || "-",
        phone: item.bundle_student.student.phone || "-",
      },
      {
        type: "text",
        value: item.bundle_student.bundle.translations[0].title || "-",
      },
      {
        type: "text",
        value: item.bundle_student.bundle.translations[0].title || "-",
      },
      { 
        type: "label", 
        value: item.status, 
        rejection_action: rejection_action(item)
      },
      { type: "text", value: formatDate(item.created_at) || "-" },
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
            label: t("accept"),
            action: () => Accept(item.id),
            icon: check,
          },
          {
            label: t("reject"),
            action: () => Decline(item.id),
            icon: X,
          },
        ],
        id: item.id,
      },
    ],
  }));

  const TableHead = [
    "#",
    t("user-code"),
    t("user-name"),
    t("registered-program-type"),
    t("registered-program"),
    t("user-status"),
    t("submission-date"),
    t("actions"),
  ];

  const selectCardData = {
    inputs: [
      {
        title: t("user-code"),
        type: "search",
        filter: "bundle_student.user.user_code",
        placeholder: t("code-search"),
        apiKey: "user_code",
      },
      {
        title: t("user-mail"),
        type: "search",
        filter: "bundle_student.student.email",
        placeholder: t("mail-search"),
        apiKey: "email",
      },
      {
        title: t("user-name"),
        type: "search",
        filter: "bundle_student.student.en_name",
        placeholder: t("name-search"),
        apiKey: "full_name",
      },
      {
        title: t("user-phone"),
        type: "search",
        filter: "bundle_student.student.phone",
        placeholder: t("phone-search"),
        apiKey: "mobile",
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
          <ExcelDownload
            endpoint="/api/proxy/requirements/export"
            filename="admission_requirements_report"
            className="gradient-btn"
            onSuccess={() => {
              setResultMessage(t("download_success"));
              setShowResultModal(true);
            }}
            onError={() => {
              setResultMessage(t("download_failed"));
              setShowResultModal(true);
            }}
          >
            {t("export_to_excel")}
          </ExcelDownload>

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

      {/* Updated Rejection Form Modal */}
      <AlertModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setRejectionReason("");
          setDetailedRejectionReason("");
        }}
        onSubmit={handleRejectionSubmit}
        title={t("rejection_title")}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRejectionSubmit();
          }}
        >
          <div className="mb-3">
            <label htmlFor="reason" className="form-label">
              {t("rejection_reason")}
            </label>
            <select
              id="reason"
              className="form-select"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              required
            >
              <option value="" disabled>
                {t("select_rejection_reason")}
              </option>
              {rejectionReasons.map((reason) => (
                <option key={reason.value} value={reason.value}>
                  {reason.label}{" "}
                  {/* Use the already localized label from API */}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="detailed-reason" className="form-label">
              {t("rejection_details")}
            </label>
            <textarea
              id="detailed-reason"
              className="form-control"
              value={detailedRejectionReason}
              onChange={(e) => setDetailedRejectionReason(e.target.value)}
              rows={4}
              placeholder={t("additional_details_placeholder")}
              required
            />
          </div>
        </form>
      </AlertModal>

      {/* Rejection Details Modal */}
      <AlertModal
        show={showRejectionDetailsModal}
        onClose={() => setShowRejectionDetailsModal(false)}
        onSubmit={() => setShowRejectionDetailsModal(false)}
        title={t("rejection_details")}
      >
        {selectedRejectionDetails && (
          <div className="text-end">
            <div className="mb-3">
              <strong>{t("rejection_reason")}:</strong>
              <p className="m-1 p-2 bg-light rounded">
                {selectedRejectionDetails.reason || t("no_reason_provided")}
              </p>
            </div>

            {selectedRejectionDetails.description && (
              <div className="mb-3">
                <strong>{t("rejection_details")}:</strong>
                <p className="m-1 p-2 bg-light rounded">
                  {selectedRejectionDetails.description}
                </p>
              </div>
            )}

            {!selectedRejectionDetails.reason &&
              !selectedRejectionDetails.description && (
                <div className="mb-3">
                  <strong>{t("rejection_message")}:</strong>
                  <p className="m-1 p-2 bg-light rounded">
                    {selectedRejectionDetails.fullMessage}
                  </p>
                </div>
              )}
          </div>
        )}
      </AlertModal>

      {/* Result Modal */}
      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title={t("operation_completed")}
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>
    </div>
  );
}
