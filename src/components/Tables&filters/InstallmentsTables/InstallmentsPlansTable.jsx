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
import Pen from "@/assets/admin/pen.svg";
import { useUserData } from "@/context/UserDataContext";
import { useApiClient } from "@/hooks/useApiClient";
import { formatDate } from "@/functions/formatDate";

export default function InstallmentsPalnsTable({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
}) {
  const t = useTranslations("tables");
  const ts = useTranslations("settings");
  const { getRoleOptions, getStatusOptions } = useUserData();
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
        urlPath: `/financial/installments`,
        query: { page: pageNumber },
      });

      const data = response?.installments.data || [];
      setDataa(data);
      setFilter(data);
      setCurrentPage(response?.installments?.current_page || 1);
      setTotalPages(response?.installments?.last_page || 1);
      setPage(response?.installments?.current_page || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const TableHead = [
    t("title"),
    "sales",
    t("first_installment"),
    t("number_of_installments"),
    t("capacity"),
    t("creation_date"),
    t("end_date"),
    t("status"),
    t("actions"),
  ];

  const trainingData = filter.map((item, index) => ({
    key: item.id || index,
    columns: [
      { type: "text", value: item.translations?.[0]?.title || "-" },
      { type: "text", value: item.sales_count || "-" },
      { type: "text", value: item.upfront   || "-" },
      { type: "text", value: item.steps_count || "-" },
        { type: "text", value: item.capacity || "-" },
      { type: "text", value: formatDate(item.start_date) },
      { type: "text", value: formatDate(item.end_date) },
      { type: "label", value: item.enable ? "active" : "inactive" },
      {
        type: "actionbutton",
        label: t("actions"),
        action: () => {
          setShowModal(!showModal);
          setSelectedId(item.id);
          setFormState("edit");
          setEditFormData(item);
        },
        icon: Arrowdown,
        lists: [
          {
            label: t("edit"),
            // action: () => {
            //   setSelectedId(item.id);
            //   setFormState("edit");
            //   setEditFormData(item);
            //   setShowEditForm(true);
            // },
            icon: Pen,
          },
          {
            label: t("delete"),
            // action: () => {
            //   setShowModal(!showModal);
            //   setSelectedId(item.id);
            //   setFormState("delete");
            // },
            icon: X,
          },
        ],
        id: item.id,
      },
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

      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title={t("operation_completed")}
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>
    </>
  );
}
