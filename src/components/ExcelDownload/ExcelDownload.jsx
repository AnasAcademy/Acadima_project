"use client";
import React from "react";
import { useTranslations } from "next-intl";

export default function ExcelDownload({
  endpoint, // should now be a proxy path like `/api/proxy/organization/{companyName}/students/excelAll`
  filename = "export",
  className ,
  children,
  onSuccess,
  onError,
  headers = {},
  disabled = false,
}) {
  const t = useTranslations("tables");

  const downloadExcel = async () => {
    try {
      if (!endpoint) {
        const errorMsg =
          t("download_failed") || "خطأ: لم يتم تحديد رابط التحميل";
        console.error("ExcelDownload: No endpoint provided");
        if (onError) onError(errorMsg);
        else alert(errorMsg);
        return;
      }

      // Default headers (no hardcoded auth, proxy will add cookies/x-api-key)
      const defaultHeaders = {
        "Content-Type": "application/json",
        ...headers,
      };

      const response = await fetch(endpoint, {
        method: "GET",
        headers: defaultHeaders,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Detect Excel file content type
      const contentType = response.headers.get("content-type") || "";
      const isExcelFile =
        contentType.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) ||
        contentType.includes("application/vnd.ms-excel") ||
        contentType.includes("application/octet-stream");

      if (!isExcelFile) {
        // Might be JSON error
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || t("download_failed") || "فشل في تحميل الملف"
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const timestamp = new Date().toISOString().split("T")[0];
      const finalFilename = `${filename}_${timestamp}.xlsx`;

      const a = document.createElement("a");
      a.href = url;
      a.download = finalFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      const successMsg = t("download_success") || "تم تحميل الملف بنجاح";
      if (onSuccess) onSuccess(successMsg);
      else alert(successMsg);
    } catch (error) {
      console.error("Excel download failed:", error);
      const errorMsg = `${t("download_failed") || "فشل في تحميل الملف"}: ${
        error.message
      }`;
      if (onError) onError(errorMsg);
      else alert(errorMsg);
    }
  };

  return (
    <button
      className={`${className ?? ""} mx-3`}
      onClick={downloadExcel}
      disabled={disabled}
      title={t("download_excel") || "تحميل Excel"}
    >
      {children || "Excel"}
    </button>
  );
}
