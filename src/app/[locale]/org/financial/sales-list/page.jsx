import React from "react";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

import { FaUserTie, FaAward } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { RiBarChart2Fill } from "react-icons/ri";

import DashboardCards from "@/components/AdminComp/Home/DashboardCards";
import SalesListTable from "@/components/Tables&filters/financial/SalesListTable";
import Rs from "@/assets/payments icons/rs.svg";

export default async function SalesList() {
  const ts = await getTranslations("SidebarA");
  const t = await getTranslations("tables");

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
      const res = await fetch(`${baseUrl}/financial/sales?page=${pageNumber}`, {
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
        data: respond?.sales?.data || [],
        currentPage: respond.sales?.current_page || 1,
        totalPages: respond.sales?.last_page || 1,
        dat: respond || [],
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [], currentPage: 1, totalPages: 1 };
    }
  }

  const { data, currentPage, totalPages, dat } = await fetchData(1);

  const cards = [
    {
      title: t("total_sales_no_discount"),
      value: dat.totalSales.count,
      value2: (
        <h3 className="">
          {dat.totalSales.amount} <Rs className="iconcolor" />
        </h3>
      ),
      icon: <FaUserTie size={18} />,
    },
    {
      title: t("total_sales_no_discount"),
      value: dat.totalSales2.count,
      value2: (
        <h3 className="">
          {dat.totalSales2.amount} <Rs className="iconcolor" />
        </h3>
      ),
      icon: <FaUserTie size={18} />,
    },
    {
      title: t("total_discount"),
      value: dat.totalDiscounts.count,
      value2: (
        <h3 className="">
          {dat.totalDiscounts.amount} <Rs className="iconcolor" />
        </h3>
      ),
      icon: <FaUserTie size={18} />,
    },
    {
      title: t("total_seat_reservations"),
      value: dat.classesSales.count,
      value2: (
        <h3 className="">
          {dat.classesSales.amount} <Rs className="iconcolor" />
        </h3>
      ),
      icon: <FaUserTie size={18} />,
    },
    {
      title: t("failed_sales"),
      value: dat.failedSales,
      icon: <FaUserTie size={18} />,
    },
    {
      title: t("total_bundles_sales"),
      value: dat.bundlesSales.count,
      value2: (
        <h3 className="">
          {dat.bundlesSales.amount} <Rs className="iconcolor" />
        </h3>
      ),
      icon: <FaUserTie size={18} />,
    },
  ];

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-0">
          <div className=" row m-0  p-2 g-3">
            <h2 className="hvvv">{ts("sales-list")}</h2>
            <div className="col-lg-12">
              <DashboardCards cards={cards} />
            </div>
            <div className=" col-lg-12 ">
              <SalesListTable
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
