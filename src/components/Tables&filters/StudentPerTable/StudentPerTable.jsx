"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SelectCard from "@/components/SelectCard/SelectCard";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import Arrow from "@/assets/admin/arrow down.svg";
// import AlertModal from "@/components/AlertModal/AlertModal";

export default function StudentPerTable({ dataa = [] }) {
  const t = useTranslations("tables");
  const [filter, setFilter] = useState(dataa);
  const [more, setMore] = useState(5);

//   const [showModal, setShowModal] = useState(false);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [detailedRejectionReason, setDetailedRejectionReason] = useState("");
//   const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
      setMore(5);
    }, [filter]);

    const slicedFilter = filter.slice(0, more);

  const trainingData = slicedFilter.map((item, index) => ({
    columns: [
      { type: "text", value: index + 1 },
      { type: "user", name: item.sales.buyer.full_name },
      { type: "text", value: index + 1 },
      { type: "text", value: index + 1 },
      {},
      // {
      //   type: "radio",
      //   value: item.access_to_purchased_item,
      // },
      // {
    ],
  }));

  const TableHead = [
    "#",
    t("user-code"),
    t("user-name"),
    t("registered-program"),
    t("batch-number"),
    t("user-access"),
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

  return (
    <div className="row g-3">
      <div className="col-12">
        <SelectCard
          selectCardData={selectCardData}
          isTechSupport={true}
          setFilter={setFilter}
          dataa={dataa}
        />
      </div>

      <div className="col-12">
        <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
          {/* <button className="btn custfontbtn rounded-4" onClick={DownloadExcel}>
            Excel
          </button> */}
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

      {/* <AlertModal
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
      <label htmlFor="reason" className="form-label">سبب الرفض:</label>
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
      <label htmlFor="detailed-reason" className="form-label">تفاصيل الرفض:</label>
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
</AlertModal> */}
    </div>
  );
}
