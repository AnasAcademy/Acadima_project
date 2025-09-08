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

export default function GroupsTable({
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
        urlPath: `/users/groups`,
        query: { page: pageNumber },
      });

      const data = response?.groups?.data || [];
      setDataa(data);
      setFilter(data);
      setCurrentPage(response?.groups?.current_page || 1);
      setTotalPages(response?.groups?.last_page || 1);
      setPage(response?.groups?.current_page || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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
        urlPath: `/users/groups`,
        query: queryParams,
      });

      const data = response?.groups?.data || [];
      setFilter(data);
      setDataa(data);
      setCurrentPage(response?.groups?.current_page || 1);
      setTotalPages(response?.groups?.last_page || 1);
      setPage(response?.groups?.current_page || 1);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    } else {
      fetchData(page);
    }
  }, [page]);

  const TableHead = [
    "#",
    t("name"),
    t("number_of_users"),
    t("commission"),
    t("coupon_discount"),
    t("status"),
    t("actions"),
  ];

  const trainingData = filter.map((item, index) => ({
    key: item.id || index,
    columns: [
      { type: "text", value: item.id },
      { type: "text", value: item.name },
      {
        type: "text",  value: item.capacity || "-" },
      { type: "text",   value: item.commission != null ? `${item.commission}%` : "0%"},
      { type: "text",   value: item.discount != null ? `${item.discount}%` : "0%"},
      { type: "label", value: item.status },
      {
        type: "actionbutton",
        label: t("actions"),
        // action: () => {
        //   setShowModal(!showModal);
        //   setSelectedId(item.id);
        //   setFormState("edit");
        //   setEditFormData(item);
        // },
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
