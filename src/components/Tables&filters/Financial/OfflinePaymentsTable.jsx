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

export default function offlinePaymentsTable({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
  rejectionReasons = [], // Already localized from server
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
  const [showRejectionDetailsModal, setShowRejectionDetailsModal] =
    useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [detailedRejectionReason, setDetailedRejectionReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedRejectionDetails, setSelectedRejectionDetails] =
    useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);
  const { request } = useApiClient();
  const [banks, setBanks] = useState([]);

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const respond = await request({
        method: "GET",
        urlPath: `/financial/offline_payments?page=${pageNumber}`,
      });

    //   const bankNames = (
    //     response?.data?.offlineBanks ??
    //     response?.offlineBanks ??
    //     []
    //   ).flatMap((bank) =>
    //     (bank?.translations ?? []).map((tr) => tr?.title).filter(Boolean)
    //   );

    //   setBanks(bankNames);
    //   console.log(banks);

      const data = respond.offlinePayments.data || [];
      setDataa(data);
      setFilter(data);
      setCurrentPage(respond.offlinePayments.current_page || 1);
      setTotalPages(respond.offlinePayments.last_page || 1);
      setPage(respond.offlinePayments.current_page || 1);
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
        urlPath: `/financial/offline_payments?${query.toString()}`,
      });

      const data = respond.offlinePayments?.data || [];

      setFilter(data);
      setDataa(data); // Also update dataa to keep it in sync
      setCurrentPage(respond.offlinePayments?.current_page || 1);
      setTotalPages(respond.offlinePayments?.last_page || 1);
      setPage(respond.offlinePayments?.current_page || 1); // Update page state
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const trainingData = filter.map((item, index) => ({
    key: item.id || index,
    columns: [
      { type: "text", value: item.user.full_name || "-" },
      { type: "text", value: item.user.mobile   || "-" },
      {
        type: "text",
        value: item.amount || "-",
      },
      {
        type: "text",
        value: item.pay_for_label || "-",
      },
      { type: "text", value: item.bank_name || "-" },
      { type: "text", value: item.iban || "-" },
      //   { type: "image", value: item.attachment },
      { type: "label", value: item.status || "-" },
      { type: "text", value: formatDate(item.created_at) },
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
    t("user-name"),
    t("user-phone"),
    t("total_amount"),
    t("payment_purpose"),
    t("bank"),
    "IBAN",
    // t("import"),
    t("status"),
    t("date"),
    t("actions"),
  ];

  const selectCardData = {
    inputs: [
      {
        title: t("user-name"),
        type: "search",
        filter: "bundle_student.student.en_name",
        placeholder: t("name-search"),
        apiKey: "full_name",
      },
      {
        title: t("status"),
        type: "select",
        filter: "status",
        apiKey: "status",
        options: [
          { value: "pending", label: t("pending") },
          { value: "approved", label: t("approved") },
          { value: "rejected", label: t("rejected") },
        ],
      },
      {
        title: t("bank"),
        type: "select",
        filter: "bank",
        apiKey: "bank",
        options: [{ value: "Revolut Ltd	", label: "Revolut Ltd	" }]
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
            endpoint="/api/proxy/financial/offline_payments/excel"
            filename="admission_requirements_report"
            className="btn custfontbtn rounded-2 mb-3"
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

          <OngoingTrain
            TableHead={TableHead}
            trainingData={trainingData}
            button={false}
          />
          <div className="row justify-content-center align-items-center mt-3">
            <button
              disabled={currentPage === 1 || loading}
              className="btn custfontbtn col-xl-1 col-lg-2 col-md-2 col-10"
              onClick={() => setPage(Math.max(currentPage - 1, 1))}
            >
              {loading ? "..." : t("previous-page")}
            </button>
            <span className="mx-2 align-self-center col-md-2 col-4 text-center p-0 my-2">
              {t("page")} {currentPage}
            </span>
            <button
              disabled={currentPage >= totalPages || loading}
              className="btn custfontbtn col-xl-1 col-lg-2 col-md-2 col-10"
              onClick={() => setPage(currentPage + 1)}
            >
              {loading ? "..." : t("next-page")}
            </button>
          </div>
        </div>
      </div>

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
