"use client";

import React, { useState, useEffect } from "react";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import Circle from "@/assets/admin/circle.svg";
import { useTranslations } from "next-intl";
import { useApiClient } from "@/hooks/useApiClient"; // ✅ ensure request exists

export default function OngoingTraincomp({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
}) {
  const ts = useTranslations("tables");
  const t = useTranslations("HomePageA");
  const { request } = useApiClient();              // ✅

  const [dataa, setDataa] = useState(initialData);
  const [page, setPage] = useState(initialPage);   // single source of truth
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);

  const fetchData = async (pageNumber) => {
    setLoading(true);
    try {
      const respond = await request({
        method: "GET",
        urlPath: `/progress/bundlesProgress?page=${pageNumber}`,
      });

      const rows = respond?.data ?? [];
      setDataa(rows);
      setCurrentPage(respond?.current_page ?? pageNumber); // ✅ don't touch `page`
      setTotalPages(respond?.last_page ?? 1);
      // ❌ remove setFilter(...)
      // ❌ don't do setPage(...)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and whenever `page` changes
  useEffect(() => {
    fetchData(page);
  }, [page]); // ✅ you don't need isInitialRender

  const TableHead = ["#", t("tableHead3"), t("tableHead2"), t("tableHead1")];

  const trainingData = (Array.isArray(dataa) ? dataa : []).map((item, index) => ({
    key: item.bundle_id ?? index,
    columns: [
      { type: "text", value: item.bundle_id },
      { type: "text", value: item.bundle_title ?? "-" },
      { type: "text", value: item.student_count ?? 0 },
      { type: "progress", value: Number(item.average_percent ?? 0) },
    ],
  }));

  return (
    <div className="rounded-4 shadow-sm p-md-4 p-2 container-fluid cardbg min-train-ht">
      <h3>{t("trainpro")}</h3>
      <div className="d-flex gap-2">
        <Circle />
        <h6 className="h6v">{t("subtrainpro")}</h6>
      </div>

      <OngoingTrain TableHead={TableHead} trainingData={trainingData} />

      <div className="row justify-content-center align-items-center gap-3 mt-3">
        <button
          disabled={page <= 1 || loading}
          className="btn custfontbtn col-1"
          onClick={() => setPage(p => Math.max(1, p - 1))}   // ✅ functional update
        >
          {loading ? "..." : ts("previous-page")}
        </button>

        <span className="px-2 align-self-center col-1 text-center">
          {ts("page")} {currentPage} 
        </span>

        <button
          disabled={page >= totalPages || loading}
          className="btn custfontbtn col-1"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))} // ✅ functional update
        >
          {loading ? "..." : ts("next-page")}
        </button>
      </div>
    </div>
  );
}
