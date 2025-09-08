import React from "react";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

import BalancesTable from "@/components/Tables&filters/financial/BalancesTable";

export default async function Balances() {
  const ts = await getTranslations("SidebarA");
  
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
  
    const companyName = process.env.company_name;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL.replace(
      "${company_name}",
      companyName
    );
  
    // Server-side fetch
    async function fetchData(pageNumber = 1) {
      try {
        const res = await fetch(`${baseUrl}/financial/documents?page=${pageNumber}`, {
          method: "GET",
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store", // avoid stale data
        });
  
        const respond = await res.json();
  
        return {
          data: respond?.data || [],
          currentPage: respond.pagination?.current_page || 1,
          totalPages: respond.pagination?.last_page || 1,
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        return { data: [], currentPage: 1, totalPages: 1 };
      }
    }
  
    const { data, currentPage, totalPages } = await fetchData(1);
   
    return (
      <>
        <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
          <div className=" p-lg-4  pt-0">
            <div className=" row m-0  p-2 g-3">
              <h2 className="hvvv">{ts("balances")}</h2>
  
              <div className=" col-lg-12 ">
                <BalancesTable
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