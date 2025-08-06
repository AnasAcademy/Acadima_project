"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import Editform from "@/components/Editform/Editform";
import ExcelDownload from "@/components/ExcelDownload/ExcelDownload"; // Add import
import Pin from "@/assets/admin/pin.svg";
import Removebin from "@/assets/admin/removebin.svg";
import Arrowdown from "@/assets/admin/arrow down.svg";
import X from "@/assets/admin/x.svg";
import Pen from "@/assets/admin/pen.svg";
import { useUserData } from "@/context/UserDataContext";

export default function CreateAccountTable({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
}) {
  const t = useTranslations("tables");
  const ts = useTranslations("settings");
  const {
    statuses,
    roles,
    categories,
    loading: contextLoading,
    getRoleOptions,
    getStatusOptions,
  } = useUserData();

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
      const res = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/students/registered_users?page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );

      const respond = await res.json();
      setDataa(respond.users?.data || []);
      setFilter(respond.users?.data || []);
      setPage(respond.users?.current_page || 1);
      setCurrentPage(respond.users?.current_page || 1);
      setTotalPages(respond.users?.last_page || 1);
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
      const query = new URLSearchParams();

      selectCardData.inputs.forEach((input) => {
        const value = filters[input.filter];
        if (value) query.append(input.apiKey || input.filter, value);
      });

      query.append("page", pageNumber);

      const res = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/students/registered_users?${query.toString()}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );

      const respond = await res.json();
      setDataa(respond.users?.data || []);
      setFilter(respond.users?.data || []);
      setCurrentPage(respond.users?.current_page || 1);
      setTotalPages(respond.users?.last_page || 1);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const DeleteUser = async () => {
    try {
      const updatedData = dataa.filter((item) => item.id !== selectedId);
      const updatedFilter = filter.filter((item) => item.id !== selectedId);
      setDataa(updatedData);
      setFilter(updatedFilter);

      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/students/${selectedId}`,
        {
          method: "DELETE",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        setDataa(dataa);
        setFilter(filter);
        throw new Error("Failed to delete");
      }

      setResultMessage(data.message || "تم التحديث بنجاح");
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
    try {
      const apiData = {};

      Object.entries(formData).forEach(([key, value]) => {
        const original = editFormData[key];

        // Normalize strings (trim, remove spaces)
        const cleaned = typeof value === "string" ? value.trim() : value;
        const cleanedOriginal =
          typeof original === "string" ? original.trim() : original;

        // Skip unchanged or empty fields
        if (
          cleaned !== cleanedOriginal &&
          cleaned !== "" &&
          cleaned !== null &&
          cleaned !== undefined
        ) {
          if (key === "mobile") {
            apiData[key] = cleaned.replace(/\s+/g, "");
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
        return;
      }

      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/students/${selectedId}`,
        {
          method: "PUT",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
          body: JSON.stringify(apiData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setResultMessage(result.message || "تم التحديث بنجاح");
        setShowResultModal(true);
        setShowEditForm(false);
        fetchData(currentPage);
      } else {
        console.error("API Error Details:", {
          status: response.status,
          statusText: response.statusText,
          result: result,
        });

        const errorText = result.errors
          ? Object.values(result.errors).join(", ")
          : result.message || `فشل التحديث (${response.status})`;
        setResultMessage(`فشل التحديث: ${errorText}`);
        setShowResultModal(true);
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Edit failed:", error);
      setResultMessage("فشل التحديث. حاول مرة أخرى.");
      setShowResultModal(true);
    }
  };

  const trainingData = filter.map((item, index) => ({
    key: item.id || index,
    columns: [
      { type: "text", value: index + 1 },
      {
        type: "user",
        name: item.en_name || item.name,
        email: item.email,
        phone: item.mobile || item.phone,
      },
      { type: "text", value: item.program_translation?.title || item.course },
      { type: "text", value: item.created_at || item.join_date },
      { type: "label", value: item.status },
      // {
      //   type: "buttons",
      //   buttons: [
      //     {
      //       label: t("edit"),
      //       action: () => {
      //         setSelectedId(item.id);
      //         setFormState("edit");
      //         setShowEditForm(true);
      //       },
      //       color: "#48BB78",
      //     },
      //     {
      //       label: t("delete"),
      //       action: () => Delete(item.id),
      //       color: "#fc544b",
      //     },
      //   ],
      // },
      {
        type: "actionbutton",
        label: t("actions"),
        action: () => {
          setShowModal(!showModal);
          setId(item.id);
          setFormState("edit");
        },
        icon: Arrowdown,
        lists: [
          {
            label: t("edit"),
            action: () => {
              setSelectedId(item.id);
              setFormState("edit");
              setShowEditForm(true);
            },
            icon: Pen,
          },
          {
            label: t("delete"),
            action: () => {
              setShowModal(!showModal);
              setId(item.id);
              setFormState("delete");
            },
            icon: X,
          },
        ],
        id: item.id,
      },
    ],
  }));

  const TableHead = [
    "#",
    t("user-name"),
    t("registered-program-type"),
    t("registration_date"),
    t("user-status"),
    t("actions"),
  ];

  const selectCardData = {
    inputs: [
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
      {
        title: t("status"),
        type: "select",
        filter: "status",
        placeholder: t("status"),
        apiKey: "status",
        options: getStatusOptions(),
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
                data={dataa.find((item) => item.id === selectedId) || {}}
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
              {/* Replace the old button with ExcelDownload component */}
              <ExcelDownload
                endpoint="https://api.lxera.net/api/development/organization/vodafone/students/excelRegisteredUsers"
                filename="create_account_report"
                className="btn custfontbtn rounded-2 mb-3"
                onSuccess={(message) => {
                setResultMessage("تم تحميل التقرير بنجاح");
                setShowResultModal(true);
              }}
              onError={(error) => {
                setResultMessage("فشل التحميل. حاول مرة أخرى.");
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

              <div className="row justify-content-center align-items-center gap-3 mt-3">
                <button
                  disabled={currentPage === 1}
                  className="btn custfontbtn col-1"
                  onClick={() => setPage(Math.max(currentPage - 1, 1))}
                >
                  {t("previous-page")}
                </button>
                <span className="px-2 align-self-center col-1 text-center">
                  {t("page")} {currentPage}
                </span>
                <button
                  disabled={currentPage >= totalPages}
                  className="btn custfontbtn col-1"
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
