"use client";
import React from "react";
import Money from "@/assets/wallet.svg";
import Ring from "@/assets/payments icons/Ring-chart.svg";
import CoursesTable from "@/components/CoursesTable/CoursesTable";
import InstallSmallCard from "@/components/InstallSmallCard/InstallSmallCard";
import Rs from "@/assets/payments icons/rs.svg";
import { useTranslations } from "next-intl";

export default function InstallmentsCard({ info }) {
  const t = useTranslations("installments");

  const tableTitle = t("table.title");
  const tabHeaders = t.raw("table.headers"); // array of header strings
  const tableRows = t.raw("table.rows"); // array of rows

  const tabCourses1 = tableRows.map((row) => ({
  flagColor: row[5] === "مدفوع" ? "green" : "red",
  data: row.map((cell, idx) =>
    idx === 2 &&
    typeof cell === "string" &&
    (cell.includes("SAR") || cell.includes("ر.س"))
      ? [cell.replace(/(SAR\s?|ر\.س)/, "").trim(), { type: "image", src: "rs" }]
      : cell
  ),
}));


  return (
    <div className="w-100">
      <div className="row d-flex gy-4">
        {/* Top Card Section */}
        <div className="d-flex flex-column gap-4 col-xl-9 col-12">
          <div className="cardbg p-4 rounded-4 shadow-sm d-flex flex-xl-row flex-lg-row gap-4 flex-sm-column flex-column justify-content-between align-items-center align-items-md-start">
            {/* Left Info */}
            <div className="d-flex gap-4">
              <div>
                <div className="d-flex flex-column mb-2 gap-2">
                  <h4 className="htitle">{t("program_details.name")}</h4>
                  <h4 className="ftnote">{t("program_details.reg_date")}</h4>
                  <h4 className="ftnote">{t("program_details.status")}</h4>
                </div>
                <div className="d-flex gap-2 mt-5">
                  <Money className="iconSize1" />
                  <p className="custsubtitle3">{t("program_details.install_dtls_titl")}</p>
                </div>
                <div className="d-flex flex-xl-row flex-lg-row flex-sm-column flex-column gap-3">
                  <h4 className="ftnote">{t("program_details.fee")}</h4>
                  <h4 className="ftnote">{t("program_details.installment_info")}</h4>
                </div>
              </div>
            </div>

            {/* Right Summary */}
            <div className="d-flex position-relative flex-column gap-2">
              <div className="centered-absolute justify-content-center flex-column align-items-center d-xl-flex d-lg-flex d-sm-none d-none">
                <h4>{t("summary.amount_paid")}</h4>
                <h2>
                  {t("summary.paid")}
                  <Rs className="iconcolor" />
                </h2>
                <h4 className="text-nowrap">{t("summary.note")}</h4>
              </div>
              <div className="d-xl-flex d-lg-flex d-sm-none d-none">
                <Ring className="ringSize" />
              </div>
            </div>
          </div>
        </div>

        {/* Table View for Large Screens */}
        <div className="col-12 mt-5">
          <h4 className="hvvv">{tableTitle}</h4>
          <div className="d-xl-flex d-lg-flex d-sm-none d-none">
            <CoursesTable headers={tabHeaders} courses={tabCourses1} />
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="d-xl-none d-lg-none d-sm-flex d-flex col-12">
          <InstallSmallCard headers={tabHeaders} installments={tabCourses1} />
        </div>
      </div>
    </div>
  );
}
