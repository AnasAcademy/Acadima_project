import React from "react";
import { useTranslations } from "next-intl";
import CertificateCard from "@/components/CertificateCard/CertificateCard";

export default function Services() {
  const t = useTranslations("certificates");
  const certs = t.raw("items");

  return (
    <div className="container p-3 mt-5">
      <h3 className="custsubtitle mb-4">{t("title")}</h3>
      <CertificateCard certs={certs} t={t} />
    </div>
  );
}
