"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";
import Pin from "@/assets/admin/pin.svg";
import Removebin from "@/assets/admin/removebin.svg";
import { useUserData } from "@/context/UserDataContext";

export default function DirectRegTable({
  initialData = [],
  initialPage = 1,
  initialTotalPages = 1,
}) {
  const t = useTranslations("tables");
  const { statuses, roles, categories, loading: contextLoading } = useUserData();

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

  const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/students/enrollers?page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );

      const respond = await res.json();
      setDataa(respond?.data || []);
      setFilter(respond?.data || []);
      setPage(respond?.current_page || 1);
      setCurrentPage(respond?.current_page || 1);
      setTotalPages(respond?.last_page || 1);
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
        if (value) {
          console.log(`Adding filter: ${input.apiKey || input.filter} = ${value}`);
          query.append(input.apiKey || input.filter, value);
        }
      });

      query.append("page", pageNumber);
      
      console.log("Final query string:", query.toString());

      const res = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/students/enrollers?${query.toString()}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );

      const respond = await res.json();
      setDataa(respond?.data || []);
      setFilter(respond?.data || []);
      setCurrentPage(respond?.current_page || 1);
      setTotalPages(respond?.last_page || 1);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const Delete = (id) => {
    setSelectedId(id);
    setShowModal(true);
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
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
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
      alert("فشل الرفض. حاول مرة أخرى.");
    }
  };

  const trainingData = filter.map((item, index) => ({
    key: item.id || index,
    columns: [
      { type: "text", value: index + 1 },
      { type: "text", value: item.buyer.user_code },
      {
        type: "user",
        name: item.en_name || item.buyer.full_name,
        email: item.buyer.email,
        phone: item.buyer.mobile,
      },
      { type: "text", value: item.bundle?.translations[0].title  },
      { type: "text", value: item.created_at },
      { type: "text", value: item.buyer.status },
      {
        type: "buttons",
        buttons: [
          { label: t("edit"), color: "#28a745" },
          { label: t("delete"), action: () => Delete(item.id), color: "#fc544b" },
        ],
      },
    ],
  }));

  const TableHead = [
    "#",
    t("user-code"),
    t("user-name"),
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
      }
    ],
  };

  const DownloadExcel = async () => {
    try {
      const response = await fetch(
        "https://api.lxera.net/api/development/organization/vodafone/students/excelEnroller",
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "direct-registration-report.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      alert("Download succeeded");
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    }
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
          <button className="btn custfontbtn rounded-4 mb-3" onClick={DownloadExcel}>
            Excel
          </button>

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

      <AlertModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={DeleteUser}
        title= {t("are_you_sure_you_want_to_delete")}
        btn={t("yes")}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            DeleteUser();
          }}
        >
          <div className="mb-3">
            <p className="m-0 text-center">
               {t("delete_validation")}
            </p>
          </div>
        </form>
      </AlertModal>

      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title= {t("operation_completed")}
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>
    </div>
  );
}
