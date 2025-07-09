"use client";

import React, { useState, useMemo } from "react";
import Arrow from "@/assets/admin/arrow down.svg";
import { useTranslations } from "next-intl";
import OngoingTrain from "@/components/AdminComp/ongoingTrain/OngoingTrain";
import SelectCard from "@/components/SelectCard/SelectCard";
import { formatTrainingData } from "@/components/AdminComp/TrainigDataFormatter/trainingDataFormatter";

export default function PastticketComp({
  dataa = [],
  selectCardData,
  TableHead,
  type = "supports",
}) {
  const t = useTranslations("tables");

  const initialData = Array.isArray(dataa) ? dataa : [];
  const [more, setMore] = useState(3);
  const [filter, setFilter] = useState(initialData);

  const trainingData = useMemo(() => {
    const safeSlice = Array.isArray(filter) ? filter.slice(0, more) : [];
    return formatTrainingData(type, safeSlice, t);
  }, [filter, more, type, t]);

  return (
    <div className="row g-3">
      <div className="col-12">
        <SelectCard
          selectCardData={selectCardData}
          isTechSupport={true}
          filterr={filter}
          setFilter={setFilter}
          data={initialData}
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
