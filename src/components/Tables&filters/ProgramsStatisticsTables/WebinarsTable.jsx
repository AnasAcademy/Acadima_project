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
import check from "@/assets/admin/Check.svg";
import Eye from "@/assets/admin/eye.svg";
import Pen from "@/assets/admin/pen.svg";

import DashboardCards from "@/components/AdminComp/Home/DashboardCards";
import { FaUserTie, FaAward } from "react-icons/fa";

import { useApiClient } from "@/hooks/useApiClient";
import { useUserData } from "@/context/UserDataContext";
import { Placeholder } from "react-bootstrap";

export default function WebinarsStatsTable({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
}) {
  const t = useTranslations("tables");
  const ts = useTranslations("settings");
  const { getStudyClassOptions, getCategoryGroupedOptions } =
    useUserData();
  const { request } = useApiClient();
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
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [formState, setFormState] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editFormLoading, setEditFormLoading] = useState(false);

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await request({
        method: "GET",
        urlPath: `/programs_statistics/webinars`,
        query: { page: pageNumber },
      });

      const data = response?.webinars || [];
      setDataa(data);
      setFilter(data);
      setCurrentPage(response?.pagination?.current_page || 1);
      setTotalPages(response?.pagination?.last_page || 1);
      setPage(response?.pagination?.current_page || 1);
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
    else {
      fetchData(page);
    }
  }, [page]);

  const TableHead = [
    "ID",
    t("title"),
    t("student_count"),
  ];

  const trainingData = filter.map((item, index) => ({
    key: item.id || index,
    columns: [
      { type: "text", value: item.id || "-" },
      { type: "text", value: item.webinarsTitle || "-" },
      { type: "text", value: item.webinarsStudentsCount || "-" },
    ],
  }));

  return (
    <>
      <div className="row g-3">

        <div className="col-12">
          <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">

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
                {t("previous-page")}
              </button>
              <span className="mx-2 align-self-center col-md-2 col-4 text-center p-0 my-2">
                {t("page")} {currentPage}
              </span>
              <button
                disabled={currentPage >= totalPages || loading}
                className="btn custfontbtn col-xl-1 col-lg-2 col-md-2 col-10"
                onClick={() => setPage(currentPage + 1)}
              >
                {t("next-page")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
