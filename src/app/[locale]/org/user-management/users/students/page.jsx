import React from "react";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import AllStudentsTable from "@/components/Tables&filters/Records/AllStudentsTable/AllStudentsTable";
import DashboardCards from "@/components/AdminComp/Home/DashboardCards";
import { FaUserTie } from "react-icons/fa";

export default async function UsersStudents() {
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
      const res = await fetch(`${baseUrl}/students/all?page=${pageNumber}`, {
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
        dat: respond || [],
        data: respond.students?.data || [],
        currentPage: respond.students?.current_page || 1,
        totalPages: respond.students?.last_page || 1,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [], currentPage: 1, totalPages: 1, dat: [] };
    }
  }

  const { data, currentPage, totalPages, dat } = await fetchData(1);

  const cards = [
    {
      title: t("all_students"),
      value: dat.totalStudents,
      icon: <FaUserTie size={18} />,
    },
    {
      title: t("inactive_students"),
      value: dat.inactiveStudents,
      icon: <FaUserTie size={18} />,
    },
    {
      title: t("ban_student"),
      value: dat.banStudents,
      icon: <FaUserTie size={18} />,
    },
  ];

  return (
    <div className="m-0 container-fluid p-0 d-flex flex-column">
      <div className="p-lg-4 pt-lg-0">
        <div className="row m-0 p-2 g-3">
          <h2 className="hvvv">{ts("students-list")}</h2>
          <div className="col-lg-12">
            <DashboardCards cards={cards} minHeight="95px" />
          </div>
          <div className="col-lg-12">
            <AllStudentsTable
              initialData={data}
              initialPage={currentPage}
              initialTotalPages={totalPages}
              companyName={companyName} // optional: pass to table
            />
          </div>
        </div>
      </div>
    </div>
  );
}
