"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import Arrow from "@/assets/admin/arrow down.svg";
import AlertModal from "@/components/AlertModal/AlertModal";

export default function AdmissionReqTable({ dataa = [] }) {
  const t = useTranslations("tables");
  const [filter, setFilter] = useState(dataa.data);
  const [more, setMore] = useState(5);

  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [detailedRejectionReason, setDetailedRejectionReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);

  // Reset view count when filters change
  useEffect(() => {
    setMore(5);
  }, [filter]);

  const slicedFilter = filter.slice(0, more);

  const Accept = async (id) => {
    try {
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
        throw new Error("Failed to approve");
      }

      setResultMessage(data.message || "Status updated successfully");
      setShowResultModal(true);
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Status update failed. Please try again.");
    }
  };

  const Decline = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleRejectionSubmit = async () => {
    try {
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
        throw new Error("Failed to reject");
      }

      setResultMessage(data.message || "Status updated successfully");
      setShowResultModal(true);
      setShowModal(false);
      setRejectionReason("");
      setDetailedRejectionReason("");
      setSelectedId(null);
    } catch (error) {
      console.error("Rejection failed:", error);
      alert("Rejection failed. Please try again.");
    }
  };

  const trainingData = slicedFilter.map((item, index) => ({
    columns: [
      { type: "text", value: index + 1 },
      { type: "text", value: item.bundle_student.student_id },
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
      { type: "image", value: item.identity_attachment },
      { type: "text", value: item.status },
      {},
      { type: "text", value: item.created_at },
      {
        type: "buttons",
        value1: t("accept"),
        value2: t("reject"),
        action1: () => Accept(item.id),
        action2: () => Decline(item.id),
        icon: false,
        color1: "#48BB78",
        color2: "#fc544b",
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
        filter: "bundle_student.student_id",
      },
      {
        title: t("user-mail"),
        type: "search",
        filter: "bundle_student.student.email",
      },
      {
        title: t("user-name"),
        type: "search",
        filter: "bundle_student.student.en_name",
      },
      {
        title: t("user-phone"),
        type: "search",
        filter: "bundle_student.student.phone",
      },
      // {
      //   title: t("status"),
      //   type: "select",
      //   path: "status",
      //   options: ["approved", "rejected", "pending"],
      // },
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
          setFilter={setFilter}
          dataa={dataa.data}
        />
      </div>

      <div className="col-12">
        <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
          <button className="btn custfontbtn rounded-4" onClick={DownloadExcel}>
            Excel
          </button>
          <OngoingTrain
            TableHead={TableHead}
            trainingData={trainingData}
            button={false}
          />

          {more < filter.length && (
            <div
              className="text-primary fw-semibold d-flex align-items-center gap-2 mt-2"
              role="button"
              onClick={() => setMore((prev) => prev + 5)}
            >
              <Arrow size={18} />
              {t("view-more")}
            </div>
          )}
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
