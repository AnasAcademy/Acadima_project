// OrgsettHelper.jsx
"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Backg from "@/assets/admin/Background2.png";
import CompnamCard from "@/components/compnamCard/CompnamCard.jsx";

export default function OrgsettHelper() {
  const t = useTranslations("aihelper");

  const dataa = {
    plans: [
      {
        name_ar: "الخطة 1",
        name_en: "Plan 1",
        description_ar: "وصف الخطة 1",
        description_en: "Description of Plan 1",
        price: 100,
        currency: "USD",
        start_date: "2025-08-01",
        end_date: "2026-08-01",
        max_users: 50,
      },
      {
        name_ar: "الخطة 1",
        name_en: "Plan 1",
        description_ar: "وصف الخطة 1",
        description_en: "Description of Plan 1",
        price: 100,
        currency: "USD",
        start_date: "2025-08-01",
        end_date: "2026-08-01",
        max_users: 50,
      },
    ],
  };

  return (
    <div className="container-fluid">
      <div className="row g-3">
        <h2 className="  tit-18-700  textcolor mb-0"> {t("title_settings")} </h2>
        <div className=" col-xl-6 p-0">
          <CompnamCard dat={dataa} Img={Backg} />
        </div>
      </div>
    </div>
  );
}
