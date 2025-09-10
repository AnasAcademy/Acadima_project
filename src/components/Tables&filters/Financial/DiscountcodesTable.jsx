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

export default function DiscountCodesTable({
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
        urlPath: `/financial/discounts?page=${pageNumber}`,
      });

      const data = respond.discounts.data || [];
      setDataa(data);
      setFilter(data);
      setCurrentPage(respond.discounts.current_page || 1);
      setTotalPages(respond.discounts.last_page || 1);
      setPage(respond.discounts.current_page || 1);
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
        urlPath: `/financial/discounts?${query.toString()}`,
      });

      const data = respond.discounts?.data || [];

      setFilter(data);
      setDataa(data); // Also update dataa to keep it in sync
      setCurrentPage(respond.discounts?.current_page || 1);
      setTotalPages(respond.discounts?.last_page || 1);
      setPage(respond.discounts?.current_page || 1); // Update page state
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const trainingData = filter.map((item, index) => ({
    key: item.id || index,
    columns: [
      { type: "text", value: item.title  || "-" },
      { type: "text", value: item.discount_type || "-" },
      {
        type: "text",
        value: item.code || "-",
      },
      {
        type: "text",
        value: item.user_type || "-",
      },
      { type: "text", value: formatDate(item.created_at) || "-" },
      { type: "text", value: formatDate(item.expired_at) || "-" },
      { type: "text", value: item.count || "-" },
      { type: "text", value: item.percent || "-" },
      {
        type: "text",
        value: item.max_amount || "-",
      },
      { type: "text", value: item.amount || "-" },
      {
        type: "text",
        value: item.minimum_order || "-",
      },
      { type: "label", value: item.status || "-" },

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
    t("title"),
    t("type"),
    t("code"),
    t("users"),
    t("start_date"),
    t("end_date"),
    t("times-used"),
    t("discount-percentage"),
    t("highest_value"),
    t("capacity"),
    t("lowest_value"),
    t("status"),
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
        title: t("status"),
        type: "select",
        filter: "status",
        apiKey: "status",
        options: [
          { value: "active", label: t("active") },
          { value: "inactive", label: t("inactive") },
          // { value: "rejected", label: t("rejected") },
        ],
      },
      {
        title: t("start_date"),
        type: "date",
        filter: "from",
        apiKey: "from",
      },
      {
        title: t("end_date"),
        type: "date",
        filter: "to",
        apiKey: "to",
      },
      {
        title: t("sort"),
        type: "select",
        filter: "sort",
        apiKey: "sort",
        options: [
          { value: "percent_asc", label: t("percent_asc") },
          { value: "percent_desc", label: t("percent_desc") },
          { value: "amount_asc", label: t("amount_asc") },
          { value: "amount_desc", label: t("amount_desc") },
          { value: "usable_time_asc", label: t("usable_time_asc") },
          { value: "usable_time_desc", label: t("usable_time_desc") },
          { value: "usable_time_remain_asc", label: t("usable_time_remain_asc") },
          { value: "usable_time_remain_desc", label: t("usable_time_remain_desc") },
          { value: "created_at_asc", label: t("created_at_asc") },
          { value: "created_at_desc", label: t("created_at_desc") },
          { value: "expire_at_asc", label: t("expire_at_asc") },
          { value: "expire_at_desc", label: t("expire_at_desc") },
        ],
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
