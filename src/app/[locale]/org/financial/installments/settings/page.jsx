import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import OfflinePaymentsTable from "@/components/Tables&filters/financial/OfflinePaymentsTable";
import { cookies } from "next/headers";

export default async function DiscountCodes() {
const t = await getTranslations("SidebarA");
  const locale = await getLocale(); // Get current locale
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  // Server-side fetch for admission requirements data


  async function fetchData(pageNumber = 1) {



    try {
      const res = await fetch(
        `${BASE_URL}/financial/offline_payments?page=${pageNumber}`,
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
        data: respond.offlinePayments.data || [],
        currentPage: respond.offlinePayments.current_page || 1,
        totalPages: respond.offlinePayments.last_page || 1,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [], currentPage: 1, totalPages: 1 };
    }
  }

  // Fetch both data sets in parallel for better performance
    const { data, currentPage, totalPages } = await fetchData(1);

  return (
    <>
      <div className="m-0 container-fluid p-0 d-flex flex-column">
        <div className="p-lg-4 pt-lg-0">
          <div className="row m-0 p-2 g-3">
            <h2 className="hvvv">{t("discount-codes")}</h2>
            <div className="col-lg-12">
              <OfflinePaymentsTable
                initialData={data}
                initialPage={currentPage}
                initialTotalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}