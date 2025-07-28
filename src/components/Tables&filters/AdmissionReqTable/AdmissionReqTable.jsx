"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import AlertModal from "@/components/AlertModal/AlertModal";

export default function AdmissionReqTable({ initialData = [], initialPage = 1, initialTotalPages = 1 }) {
  const t = useTranslations("tables");

  const [dataa, setDataa] = useState(initialData);
  const [filter, setFilter] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [detailedRejectionReason, setDetailedRejectionReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);

 const fetchData = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/requirements/list?page=${pageNumber}`,
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
      const data = respond.data.data || [];
      setDataa(data);
      setFilter(data); // show full data initially
      setCurrentPage(respond.data.current_page || 1);
      setTotalPages(respond.data.last_page || 1);
      setPage(respond.data.current_page || 1);
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

    const res = await fetch(
      `https://api.lxera.net/api/development/organization/vodafone/requirements/list?${query.toString()}`,
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
    const data = respond.data?.data || [];

    setFilter(data);
    setDataa(data); // Also update dataa to keep it in sync
    setCurrentPage(respond.data?.current_page || 1);
    setTotalPages(respond.data?.last_page || 1);
    setPage(respond.data?.current_page || 1); // Update page state
  } catch (error) {
    console.error("Search error:", error);
  } finally {
    setLoading(false);
  }
};


  const Accept = async (id) => {
    try {
      // Optimistically update the status to "approved" immediately
      const updatedData = dataa.map(item => 
        item.id === id ? { ...item, status: "approved" } : item
      );
      const updatedFilter = filter.map(item => 
        item.id === id ? { ...item, status: "approved" } : item
      );
      setDataa(updatedData);
      setFilter(updatedFilter);

      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/requirements/${id}/approve`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        // If approval failed, restore the original data
        setDataa(dataa);
        setFilter(filter);
        throw new Error("Failed to approve");
      }

      setResultMessage(data.message || "تم التحديث بنجاح");
      setShowResultModal(true);
    } catch (error) {
      console.error("Status update failed:", error);
      // Restore original data on error
      fetchData(page);
      alert("تعذر تحديث الحالة، حاول مرة أخرى.");
    }
  };

  const Decline = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleRejectionSubmit = async () => {
    try {
      // Optimistically update the status to "rejected" immediately
      const updatedData = dataa.map(item => 
        item.id === selectedId ? { ...item, status: "rejected" } : item
      );
      const updatedFilter = filter.map(item => 
        item.id === selectedId ? { ...item, status: "rejected" } : item
      );
      setDataa(updatedData);
      setFilter(updatedFilter);

      const payload = {
        reason: rejectionReason,
        message: detailedRejectionReason,
      };

      const response = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/requirements/${selectedId}/reject`,
        {
          method: "POST",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        // If rejection failed, restore the original data
        setDataa(dataa);
        setFilter(filter);
        throw new Error("Failed to reject");
      }

      setResultMessage(data.message || "تم التحديث بنجاح");
      setShowResultModal(true);
      setShowModal(false);
      setRejectionReason("");
      setDetailedRejectionReason("");
      setSelectedId(null);
    } catch (error) {
      console.error("Rejection failed:", error);
      // Restore original data on error
      fetchData(page);
      alert("فشل الرفض. حاول مرة أخرى.");
    }
  };

  const trainingData = filter.map((item, index) => ({
    key: item.id || index,
    columns: [
      { type: "text", value: index + 1 },
      { type: "text", value: item.bundle_student.student.user.user_code },
      {
        type: "user",
        name: item.bundle_student.student.en_name,
        email: item.bundle_student.student.email,
        phone: item.bundle_student.student.phone,
      },
      {
        type: "text",
        value: item.bundle_student.bundle.translations.title,
      },
      {
        type: "text",
        value: item.bundle_student.bundle.translations.title,
      },
      { type: "image", value: item.identity_attachment },
      {},
      { type: "text", value: item.status },
      {},
      { type: "text", value: item.created_at },
      {
        type: "buttons",
        buttons: [
          {
            label: t("accept"),
            action: () => Accept(item.id),
            color: "#48BB78",
          },
          {
            label: t("reject"),
            action: () => Decline(item.id),
            color: "#fc544b",
          },
        ],
      },
    ],
  }));

  const TableHead = [
    "#",
    t("user-code"),
    t("user-name"),
    t("registered-program-type"),
    t("registered-program"),
    t("identity-file"),
    t("requirements"),
    t("user-status"),
    t("admin"),
    t("submission-date"),
    t("actions"),
  ];

  const selectCardData = {
    inputs: [
      {
        title: t("user-code"),
        type: "search",
        filter: "bundle_student.user.user_code",
        placeholder: t("code-search"),
        apiKey: "user_code",
      },
      {
        title: t("user-mail"),
        type: "search",
        filter: "bundle_student.student.email",
        placeholder: t("mail-search"),
        apiKey: "email",
      },
      {
        title: t("user-name"),
        type: "search",
        filter: "bundle_student.student.en_name",
        placeholder: t("name-search"),
        apiKey: "full_name",
      },
      {
        title: t("user-phone"),
        type: "search",
        filter: "bundle_student.student.phone",
        placeholder: t("phone-search"),
        apiKey: "mobile",
      },
    ],
  };

   const DownloadExcel = async () => {
    try {
      const response = await fetch(
        "https://api.lxera.net/api/development/organization/vodafone/requirements/excel",
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "report.xlsx"; // Default file name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      alert("Download succeded");
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
          <button className="btn custfontbtn rounded-4 mb-3" onClick={DownloadExcel}>Excel</button>

       
            <>
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
            </>
      
        </div>
      </div>

      <AlertModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleRejectionSubmit}
        title="رفض الطلب"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRejectionSubmit();
          }}
        >
          <div className="mb-3">
            <label htmlFor="reason" className="form-label">
              سبب الرفض:
            </label>
            <textarea
              id="reason"
              className="form-control"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={1}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="detailed-reason" className="form-label">
              تفاصيل الرفض:
            </label>
            <textarea
              id="detailed-reason"
              className="form-control"
              value={detailedRejectionReason}
              onChange={(e) => setDetailedRejectionReason(e.target.value)}
              rows={4}
              required
            />
          </div>
        </form>
      </AlertModal>

      <AlertModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onSubmit={() => setShowResultModal(false)}
        title="تمت العملية"
      >
        <p className="m-0 text-center">{resultMessage}</p>
      </AlertModal>
    </div>
  );
}
