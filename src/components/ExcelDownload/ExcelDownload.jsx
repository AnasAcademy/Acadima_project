"use client";
import React from "react";
import { useTranslations } from "next-intl";

export default function ExcelDownload({
  endpoint,
  filename = "export",
  className = "btn custfontbtn rounded-2",
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
        const errorMsg = "خطأ: لم يتم تحديد رابط التحميل";
        console.error("ExcelDownload: No endpoint provided");
        if (onError) onError(errorMsg);
        else alert(errorMsg);
        return;
      }

      // Default headers
      const defaultHeaders = {
        "x-api-key": "1234",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
        ...headers,
      };

      const response = await fetch(endpoint, {
        method: "GET",
        headers: defaultHeaders,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if the response is actually a file (Excel)
      const contentType = response.headers.get("content-type");
      
      // Handle different Excel content types
      const isExcelFile = contentType && (
        contentType.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") ||
        contentType.includes("application/vnd.ms-excel") ||
        contentType.includes("application/octet-stream")
      );

      if (!isExcelFile) {
        // If it's not an Excel file, it might be JSON with an error
        const errorData = await response.json();
        throw new Error(errorData.message || "فشل في تحميل الملف");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0];
      const finalFilename = `${filename}_${timestamp}.xlsx`;

      const a = document.createElement("a");
      a.href = url;
      a.download = finalFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      const successMsg = t("download_success") || "تم تحميل الملف بنجاح ";
      if (onSuccess) onSuccess(successMsg);
      else alert(successMsg);

    } catch (error) {
      console.error("Excel download failed:", error);
      const errorMsg = `${t("download_failed") || "فشل في تحميل الملف"}: ${error.message}`;
      if (onError) onError(errorMsg);
      else alert(errorMsg);
    }
  };

  return (
    <button
      className={className}
      onClick={downloadExcel}
      disabled={disabled}
      title={t("download_excel") || "تحميل Excel"}
    >
      {children || "Excel"}
    </button>
  );
}