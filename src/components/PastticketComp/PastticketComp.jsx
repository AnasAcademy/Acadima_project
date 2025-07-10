"use client";

import React, { useState, useMemo } from "react";
import Arrow from "@/assets/admin/arrow down.svg";
import { useTranslations } from "next-intl";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import SelectCard from "@/components/SelectCard/SelectCard";
import { formatTrainingData } from "@/components/AdminComp/TrainigDataFormatter/trainingDataFormatter";

export default function PastticketComp({
  dataa = [],
}) {
  const t = useTranslations("techSupport");

 
  const [more, setMore] = useState(3);
  const [filter, setFilter] = useState(dataa);

  const trainingData = filter.map((item) => ({
    columns: [
      { type: "text", value: item.id },
      { type: "text", value: item.title },
      {
        type: "button",
        value: item.status,
        icon: false,
        color: "#FFD900",
        width: "70%",
      },
      { type: "text", value: item.updated_at },
      {
        type: "button",
        value: t("show-details"),
        icon: true,
        textColor: "#216ED7",
        color: "#fff",
        decoration: "underline",
        width: "100%",
      },
    ],
  }));

const TableHead = [
    t("ticket_number"),
    t("subject"),
    t("status"),
    t("last_updated"),
    t("action"),
  ];

  const selectCardData = {
    inputs: [
      {
        title: "",
        type: "select",
        options: ["open", "close", "replied"],
      },
      {
        title: "",
        type: "select",
        options: ["open", "close"],
      },
      {
        title: "",
        type: "select",
        options: ["Cairo", "Alex"],
      },
      {
        title: "",
        type: "select",
        options: ["on", "off"],
      },
      {
        title: "",
        type: "search",
      },
    ],
  };



  return (
    <div className="row g-3">
      <div className="col-12">
        <SelectCard
          search="id"
          searchtwo="status"
          selectCardData={selectCardData}
          isTechSupport={true}
          setFilter={setFilter}
          data={filter}
          dataa={dataa}
        />
      </div>

      <div className="col-12">
        <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
          {/* <h2>{t("previous-tickets")}</h2> */}

          <OngoingTrain
            TableHead={TableHead}
            trainingData={trainingData}
            button={false}
          />

          <div
            className="text-primary fw-semibold d-flex align-items-center gap-2 mt-2"
            role="button"
            onClick={() => setMore((prev) => prev + 3)}
          >
            <Arrow size={18} />
            {t("view-more")}
          </div>
        </div>
      </div>
    </div>
  );
}
