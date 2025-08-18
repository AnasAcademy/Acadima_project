"use client";
import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import ExcelDownload from "@/components/ExcelDownload/ExcelDownload";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import check from "@/assets/admin/Check.svg";
import { useApiClient } from "@/hooks/useApiClient";
import { useUserData } from "@/context/UserDataContext"; // ⬅️ use provider

export default function CourseDetailsTable({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
}) {
  const t = useTranslations("tables");
  const { request } = useApiClient();
  const isAr = useLocale().startsWith("ar");

  // options from context (populated from /webinars etc.)
  const {
    getStatusOptions, // generic statuses
    getCategoryGroupedOptions,
  } = useUserData();

  // data
  const [rows, setRows] = useState(initialData);
  const [filteredRows, setFilteredRows] = useState(initialData);

  // ui
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // result modal (Excel)
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  // put this near the top of the component
  const DEFAULT_QUERY = { type: "course" };

  // ---------- Fetch list ----------
  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const resp = await request({
        method: "GET",
        urlPath: "/webinars",
        query: { ...DEFAULT_QUERY, page: pageNumber }, // => ?type=course&page=...
      });

      const webinars = resp?.webinars ?? {};
      const data = Array.isArray(webinars?.data) ? webinars.data : [];

      setRows(data);
      setFilteredRows(data);
      setCurrentPage(webinars?.current_page ?? pageNumber ?? 1);
      setTotalPages(webinars?.last_page ?? 1);
      setPage(webinars?.current_page ?? pageNumber ?? 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Only refetch when page changes after first mount
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // ---------- Filters + Search ----------
  const selectCardData = {
    inputs: [
      {
        title: t("categories"),
        type: "select",
        filter: "category_id",
        placeholder: t("categories-search"),
        apiKey: "category_id",
        options: getCategoryGroupedOptions(), // ⬅️ from context
      },
      {
        title: t("title"),
        type: "search",
        filter: "title",
        placeholder: t("title-search"),
        apiKey: "title",
      },
      {
        title: t("teacher"),
        type: "search",
        filter: "teacher",
        placeholder: t("teacher-search"),
        apiKey: "teacher",
      },
      {
        title: t("status"),
        type: "select",
        filter: "status",
        // placeholder: t("status-search"),
        apiKey: "status",
        options: [
          ...getStatusOptions(),
          { value: "is_draft", label: isAr ? "مسودة" : "Draft" },
        ],
      },
    ],
  };

  const handleSearch = async (filters, pageNumber = 1) => {
    setLoading(true);
    try {
      const query = { ...DEFAULT_QUERY, page: pageNumber };
      selectCardData.inputs.forEach((input) => {
        const v = filters?.[input.filter];
        if (v !== undefined && v !== null && String(v).trim() !== "") {
          query[input.apiKey || input.filter] = v;
        }
      });
      const x = filters?.category_id;
      if (x && !String(x).startsWith("__cat_")) {
        query.category_id = x;
      }
      const resp = await request({
        method: "GET",
        urlPath: "/webinars",
        query,
      });

      const webinars = resp?.webinars ?? {};
      const data = Array.isArray(webinars?.data) ? webinars.data : [];
      setRows(data);
      setFilteredRows(data);
      setCurrentPage(webinars?.current_page ?? pageNumber ?? 1);
      setTotalPages(webinars?.last_page ?? 1);
    } catch (e) {
      console.error("Search error:", e);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      const response = await request({
        method: "DELETE",
        urlPath: `/webinars/${id}`,
      });

      // Remove the item from local state
      setData((prev) => prev.filter((item) => item.id !== id));
      setResultMessage(t("service_deleted_successfully"));

      // } else {
      // //   throw new Error(t("service_delete_failed"));
      // // }
    } catch (error) {
      console.error("Delete failed:", error);
      setResultMessage(t("service_delete_failed"));
    } finally {
      setShowResultModal(true);
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
        urlPath: `/webinars/${id}/approve`,
      });

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

  const Decline = async (id) => {
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

      const data = await request(
    
        {
          method: "GET",
          urlPath: `/webinars/${selectedId}/reject`,
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
      setSelectedId(null);
    } catch (error) {
      console.error("Rejection failed:", error);
      // Restore original data on error
      fetchData(page);
      alert("فشل الرفض. حاول مرة أخرى.");
    }
  };

  // ---------- Table mapping ----------
  const trainingData = filteredRows.map((item, index) => ({
    key: item?.id ?? index,
    columns: [
      { type: "text", value: item?.id ?? "-" },
      {
        type: "user",
        name: item?.translations?.[0]?.title ?? "-",
        email: item?.category?.translations?.[0]?.title ?? "-",
      },
      { type: "text", value: item?.teacher?.full_name ?? "-" },
      {
        type: "text",
        value:
          String(item?.price ?? "") === "0" || item?.price === 0
            ? t("free")
            : item?.price ?? "-",
      },
      { type: "text", value: item?.sales ?? "-" },
      { type: "text", value: item?.capacity ?? "-" },
      { type: "text", value: item?.sales_amount ?? "-" },
      { type: "text", value: item?.created_at ?? "-" },
      { type: "label", value: item?.status ?? "-" },
      {
        type: "actionbutton",
        label: t("actions"),
        action: () => {},
        icon: Arrowdown,
        lists: [
          // {
          //   label: t("details"),
          //   action: () => {
          //     getServiceDetails(item.id);
          //   },
          //   icon: Eye,
          // },
          // {
          //   label: t("requests"),
          //   action: () => {
          //     setId(item.id);
          //     getReqData(item.id);
          //     setReqtble(true);
          //   },
          //   icon: Pen,
          // },
          // {
          //   label: t("edit"),
          //   action: () => {
          //     setShowModal(!showModal);
          //     setId(item.id);
          //     setFormState("edit");
          //   },
          //   icon: Pen,
          // },
          // {  item?.status }
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
          {
            label: t("delete"),
            action: () => remove(item.id),
            icon: X,
          },
        ],
        id: item?.id,
      },
    ],
  }));

  const TableHead = [
    "ID",
    t("title"),
    t("teacher"),
    t("price"),
    t("revenue"),
    t("capacity"),
    t("users"),
    t("creation_date"),
    t("status"),
    t("actions"),
  ];

  return (
    <div className="row g-3">
      <div className="col-12">
        <SelectCard
          selectCardData={selectCardData}
          isTechSupport={true}
          dataa={rows}
          setFilter={setFilteredRows}
          handleSearch={handleSearch}
        />
      </div>

      <div className="col-12">
        <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
          <ExcelDownload
            endpoint="/api/proxy/webinars/excel"
            filename="webinars_report"
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
