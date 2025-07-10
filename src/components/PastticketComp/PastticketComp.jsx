"use client";

import React, { useState, useMemo, useEffect } from "react";
import Arrow from "@/assets/admin/arrow down.svg";
import { useTranslations } from "next-intl";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import SelectCard from "@/components/SelectCard/SelectCard";

export default function PastticketComp({ dataa = [] }) {
  const t = useTranslations("techSupport");

  const [more, setMore] = useState(5); // Controls number of tickets shown
  const [filter, setFilter] = useState(dataa);

  // Slice the filtered array based on 'more'
  const slicedFilter = filter.slice(0, more);

  const trainingData = slicedFilter.map((item) => ({
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
        filter: "status",
        options: ["open", "close", "replied"],
      },
      {
        title: "",
        type: "select",
        filter: "id",
        options: ["43", "41"],
      },
      {
        title: "",
        type: "select",
        filter: "title",
        options: ["شكوى عن التدريب", "استفسار عن البرنامج"],
      },
      {
        title: "",
        type: "select",
        filter: "place3",
        options: ["on", "off"],
      },
      {
        title: "",
        type: "search",
        filter: "id",
      },
    ],
  };

  useEffect(() => {
    console.log("Filter state updated", filter);
  }, [filter]);

  return (
    <div className="row g-3">
      <div className="col-12">
        <SelectCard
          selectCardData={selectCardData}
          isTechSupport={true}
          setFilter={setFilter}
          data={dataa}
        />
      </div>

      <div className="col-12">
        <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
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
    </div>
  );
}
