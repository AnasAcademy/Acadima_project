"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import Editform from "@/components/Editform/Editform";
import ExcelDownload from "@/components/ExcelDownload/ExcelDownload";
import Pin from "@/assets/admin/pin.svg";
import Removebin from "@/assets/admin/removebin.svg";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import Pen from "@/assets/admin/pen.svg";
import { useUserData } from "@/context/UserDataContext";
import { useApiClient } from "@/hooks/useApiClient";
import { formatDate } from "@/functions/formatDate";

export default function ScholarshipTable({
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
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [currentFilters, setCurrentFilters] = useState({});
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [formState, setFormState] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editFormLoading, setEditFormLoading] = useState(false);

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await request({
        method: "GET",
        urlPath: `/students/scholarship`,
        query: { page: pageNumber },
      });

      setDataa(response?.data || []);
      setFilter(response?.data || []);
      setPage(response?.current_page || 1);
      setCurrentPage(response?.current_page || 1);
      setTotalPages(response?.last_page || 1);
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
    if (Object.keys(currentFilters).length > 0) {
      handleSearch(currentFilters, page);
    } else {
      fetchData(page);
    }
  }, [page]);

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
        urlPath: `/students/scholarship`,
        query: queryParams,
      });

      setDataa(response?.data || []);
      setFilter(response?.data || []);
      setCurrentPage(response?.current_page || 1);
      setTotalPages(response?.last_page || 1);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const DeleteUser = async () => {
    if (!selectedId) return;
    try {
      const updatedData = dataa.filter((item) => item.buyer.id !== selectedId);
      const updatedFilter = filter.filter((item) => item.buyer.id !== selectedId);
      setDataa(updatedData);
      setFilter(updatedFilter);

      const response = await request({
        method: "DELETE",
        urlPath: `/users/${selectedId}`,
      });

      if (!response?.success) {
        setDataa(dataa);
        setFilter(filter);
        throw new Error("Failed to delete");
      }

      setResultMessage(response?.message || "تم التحديث بنجاح");
      setShowResultModal(true);
      setShowModal(false);
      setSelectedId(null);

      if (updatedFilter.length === 0 && currentPage > 1) {
        fetchData(currentPage - 1);
      }
    } catch (error) {
      console.error("Deletion failed:", error);
      fetchData(page);
      setResultMessage("فشل الرفض. حاول مرة أخرى.");
      setShowResultModal(true);
    }
  };

  const handleSubmitEdit = async (formData) => {
    if (!selectedId) return;

    try {
      setEditFormLoading(true);
      const originalItem = dataa.find((item) => item.buyer.id === selectedId);
      if (!originalItem || !originalItem.buyer) {
        setResultMessage("لم يتم العثور على البيانات الأصلية");
        setShowResultModal(true);
        setEditFormLoading(false);
        return;
      }

      const originalData = {
        full_name: originalItem.buyer.full_name || "",
        en_name: originalItem.en_name || originalItem.buyer.full_name || "",
        email: originalItem.buyer.email || "",
        mobile: originalItem.buyer.mobile || "",
        bio: originalItem.buyer.bio || "",
        about: originalItem.buyer.about || "",
        status: originalItem.buyer.status || "",
        role_name: originalItem.buyer.role_name || "",
        password: "",
      };

      const apiData = {};

      Object.entries(formData).forEach(([key, value]) => {
        const original = originalData[key];
        const cleaned = typeof value === "string" ? value.trim() : value;
        const cleanedOriginal =
          typeof original === "string" ? original.trim() : original;

        if (
          cleaned !== cleanedOriginal &&
          cleaned !== "" &&
          cleaned !== null &&
          cleaned !== undefined
        ) {
          if (key === "mobile") {
            apiData[key] = String(cleaned).replace(/\s+/g, "");
          } else if (key === "user_role") {
            apiData["role_name"] = cleaned;
          } else {
            apiData[key] = cleaned;
          }
        }
      });

      if (Object.keys(apiData).length === 0) {
        setResultMessage("لا يوجد تغييرات لإرسالها");
        setShowResultModal(true);
        setEditFormLoading(false);
        return;
      }

      const response = await request({
        method: "PUT",
        urlPath: `/users/${selectedId}`,
        body: apiData,
      });

      setResultMessage(t("operation_completed"));
      setShowResultModal(true);
      setShowEditForm(false);

      if (Object.keys(currentFilters).length > 0) {
        handleSearch(currentFilters, currentPage);
      } else {
        fetchData(currentPage);
      }
    } catch (error) {
      console.error("Edit failed:", error);
      setResultMessage("فشل التحديث. حاول مرة أخرى.");
      setShowResultModal(true);
    } finally {
      setEditFormLoading(false);
    }
  };

  const trainingData = filter.map((item, index) => ({
    key: item.id || index,
    columns: [
      { type: "text", value: index + 1 },
      { type: "text", value: item.buyer.user_code || item.code || "-" },
      {
        type: "user",
        name: item.buyer.en_name || item.buyer.full_name || item.buyer.name || "-",
        email: item.buyer.email || "-",
        phone: item.buyer.mobile || item.buyer.phone || "-",
      },
      { type: "image", value: item.buyer?.identity_scan || "-" },
      {
        type: "text",
        value:
          item.bundle.translations?.[0]?.title ||
          item.course ||
          item.bundle?.translations?.[0]?.title || "-",
      },
      { type: "text", value: formatDate(item.created_at) || formatDate(item.join_date) || "-" },
      { type: "label", value: item.buyer.status || "-" },
      {
        type: "actionbutton",
        label: t("actions"),
        action: () => {
          setShowModal(!showModal);
          setSelectedId(item.buyer.id);
          setFormState("edit");
        },
        icon: Arrowdown,
        lists: [
          {
            label: t("edit"),
            action: () => {
              setSelectedId(item.buyer.id);
              setFormState("edit");
              setShowEditForm(true);
            },
            icon: Pen,
          },
          {
            label: t("delete"),
            action: () => {
              setShowModal(!showModal);
              setSelectedId(item.buyer.id);
              setFormState("delete");
            },
            icon: X,
          },
        ],
        id: item.buyer.id,
      },
    ],
  }));

  const TableHead = [
    "#",
    t("user-code"),
    t("user-name"),
    t("identity-file"),
    t("registered-program-type"),
    t("registration_date"),
    t("user-status"),
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
        title: t("user-phone"),
        type: "search",
        filter: "mobile",
        placeholder: t("phone-search"),
        apiKey: "mobile",
      },
    ],
  };

  const formTitles = [
    {
      label: (formState === "add" ? t("add") : t("edit")) + " " + t("user"),
      type: "text",
    },
    { label: formState === "add" ? t("add") : t("edit"), type: "text" },
  ];

  const fields = [
    { name: "full_name", label: ts("full_name"), type: "text" },
    { name: "en_name", label: ts("en_name"), type: "text" },
    {
      name: "role_name",
      label: ts("user_role"),
      type: "select",
      options: getRoleOptions(),
    },
    { name: "email", label: ts("email"), type: "text" },
    { name: "mobile", label: ts("mobile"), type: "text" },
    { name: "password", label: ts("password"), type: "text" },
    { name: "bio", label: ts("bio"), type: "text" },
    { name: "about", label: ts("about"), type: "text" },
    {
      name: "status",
      label: t("status"),
      type: "select",
      options: getStatusOptions(),
    },
  ];

  return (
    <>
      {showEditForm ? (
        <div className="row g-3">
          <div className="col-12">
            <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
              <Editform
                fields={fields}
                data={(() => {
                  const item = dataa.find(
                    (item) => item.buyer.id === selectedId
                  );
                  if (!item || !item.buyer) return {};

                  return {
                    full_name: item.buyer.full_name || "",
                    en_name: item.en_name || item.buyer.full_name || "",
                    email: item.buyer.email || "",
                    mobile: item.buyer.mobile || "",
                    bio: item.buyer.bio || "",
                    about: item.buyer.about || "",
                    status: item.buyer.status || "",
                    role_name: item.buyer.role_name || "",
                    password: "",
                  };
                })()}
                formTitles={formTitles}
                handleSubmitEdit={handleSubmitEdit}
                setShowModal={() => setShowEditForm(false)}
                formState={formState}
                loading={editFormLoading}
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
              <ExcelDownload
                endpoint="/api/proxy/students/excelScholarship"
                filename="scholarship_registration_report"
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
                Icon={Pin}
                Icon2={Removebin}
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
      )}

      <AlertModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={DeleteUser}
        title={t("are_you_sure_you_want_to_delete")}
        btn={t("yes")}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            DeleteUser();
          }}
        >
          <div className="mb-3">
            <p className="m-0 text-center">{t("delete_validation")}</p>
          </div>
        </form>
      </AlertModal>

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
