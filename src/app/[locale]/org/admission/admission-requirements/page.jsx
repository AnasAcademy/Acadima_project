import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import AdmissionReqTable from "@/components/Tables&filters/AdmissionReqTable/AdmissionReqTable";
import { cookies } from "next/headers";
export default async function AdmissionReq() {
  const t = await getTranslations("tables");
  const locale = await getLocale(); // Get current locale
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  // Server-side fetch for admission requirements data


  async function fetchData(pageNumber = 1) {



    try {
      const res = await fetch(
        `${BASE_URL}/requirements/list?page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
          cache: "no-store",
        }
      );
      const respond = await res.json();
      return {
        data: respond.data.data || [],
        currentPage: respond.data.current_page || 1,
        totalPages: respond.data.last_page || 1,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [], currentPage: 1, totalPages: 1 };
    }
  }

  // Server-side fetch for rejection reasons based on current locale
  async function fetchRejectionReasons() {
    try {
      const response = await fetch(
        `${BASE_URL}/requirements/rejectionReasons`,
        {
          method: "GET",
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "force-cache", // Cache rejection reasons as they change less frequently
          next: { revalidate: 3600 }, // Revalidate every hour
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reasons = data.rejectionReasons || [];

        // Transform the API response to use the correct label based on locale
        return reasons.map((reason) => ({
          value: reason.value,
          label: locale === "ar" ? reason.label_ar : reason.label_en, // Use locale-specific label
          label_en: reason.label_en, // Keep both for potential future use
          label_ar: reason.label_ar,
        }));
      }
      return [];
    } catch (error) {
      console.error("Error fetching rejection reasons:", error);
      // Fallback reasons with both languages if API fails
      // return [
      //   {
      //     value: "issue_id_passport",
      //     label:
      //       locale === "ar"
      //         ? "يوجد مشكلة في مرفق بطاقة الهوية الوطنية أو جواز السفر"
      //         : "There is an issue with the national ID or passport attachment",
      //     label_en: "There is an issue with the national ID or passport attachment",
      //     label_ar: "يوجد مشكلة في مرفق بطاقة الهوية الوطنية أو جواز السفر",
      //   },
      //   {
      //     value: "issue_bachelor_certificate",
      //     label:
      //       locale === "ar"
      //         ? "يوجد مشكلة في مرفق شهادة البكالوريوس"
      //         : "There is an issue with the bachelor's certificate attachment",
      //     label_en: "There is an issue with the bachelor's certificate attachment",
      //     label_ar: "يوجد مشكلة في مرفق شهادة البكالوريوس",
      //   },
      //   {
      //     value: "issue_highschool_certificate",
      //     label:
      //       locale === "ar"
      //         ? "يوجد مشكلة في مرفق شهادة الثانوية"
      //         : "There is an issue with the high school certificate attachment",
      //     label_en: "There is an issue with the high school certificate attachment",
      //     label_ar: "يوجد مشكلة في مرفق شهادة الثانوية",
      //   },
      // ];
    }
  }

  // Fetch both data sets in parallel for better performance
  const [{ data, currentPage, totalPages }, rejectionReasons] = await Promise.all([
    fetchData(1),
    fetchRejectionReasons(),
  ]);

  return (
    <>
      <div className="m-0 container-fluid p-0 d-flex flex-column">
        <div className="p-lg-4 pt-lg-0">
          <div className="row m-0 p-2 g-3">
            <h2 className="hvvv">{t("admission-requirements")}</h2>
            <div className="col-lg-12">
              <AdmissionReqTable
                initialData={data}
                initialPage={currentPage}
                initialTotalPages={totalPages}
                rejectionReasons={rejectionReasons} // Pass localized rejection reasons
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}