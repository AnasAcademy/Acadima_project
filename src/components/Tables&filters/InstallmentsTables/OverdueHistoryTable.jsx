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

export default function OverdueHistoryTable({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
}) {
  const t = useTranslations("tables");
  const ts = useTranslations("settings");
  const { getStudyClassOptions, getFinancialDocumentTypeOptions } =
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
        urlPath: `/financial/installments/overdue_history`,
        query: { page: pageNumber },
      });

      const data = response?.orders?.data || [];
      setDataa(data);
      setFilter(data);
      setCurrentPage(response?.orders?.current_page || 1);
      setTotalPages(response?.orders?.last_page || 1);
      setPage(response?.orders?.current_page || 1);
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
        urlPath: `/financial/installments/overdue_history`,
        query: queryParams,
      });

      const data = response?.orders?.data || [];
      setFilter(data);
      setDataa(data);
      setCurrentPage(response?.orders?.current_page || 1);
      setTotalPages(response?.orders?.last_page || 1);
      setPage(response?.orders?.current_page || 1);
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
    }
    if (Object.keys(currentFilters).length > 0) {
      handleSearch(currentFilters, page);
    } else {
      fetchData(page);
    }
  }, [page]);

  const TableHead = [
    "#",
    t("user"),
    t("installment_plan"),
    t("item"),
    t("count"),
    t("overdue_date"),
    t("status"),
    t("payment_date"),
    t("late_period"),
    t("actions"),
  ];

  const selectCardData = {
    inputs: [
        {
        title: t("user-code"),
        type: "search",
        filter: "user_code",
        placeholder: t("code-search"),
        apiKey: "user_code",
      },
      {
        title: t("user-mail"),
        type: "search",
        filter: "email",
        placeholder: t("mail-search"),
        apiKey: "email",
      },
      {
        title: t("user-name"),
        type: "search",
        filter: "full_name",
        placeholder: t("name-search"),
        apiKey: "full_name",
      },
      {
        title: t("registered-program-type"),
        type: "search",
        filter: "bundle_title",
        placeholder: t("program-search"),
        apiKey: "bundle_title",
      },
    ],
  };

  const trainingData = filter.map((item, index) => ({
    key: item.id || index,
    columns: [
      { type: "text", value: index + 1  },
      {
        type: "user",
        name: item.user?.full_name || "-",
        email: item.user?.email || "-",
        phone: item.user?.mobile || "-",
        code: item.user?.user_code || "-",
      },
      { type: "user", name: item.installment?.translations?.[0]?.title || "-", email: item.installment?.target_type || "-" },
      {
        type: "text",
        value: "#" + item.bundle?.translations?.[0]?.id + item.bundle?.translations?.[0]?.title || "-",
      },
      { type: "text", value: item.amount + t("rs") || "-"  },
      { type: "text", value: formatDate(item.overdue_date) || "-" },
      { type: "label", value: item.status || "-"  },
      { type: "text", value: formatDate(item.paid_at) || "-" },
      { type: "text", value: item.overdue_days || "-" },
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
              endpoint="/api/proxy/financial/installments/overdue_history/export"
              filename="all_students_report"
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
