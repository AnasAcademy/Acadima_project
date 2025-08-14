import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import CourseRegTable from "@/components/Tables&filters/CourseRegTable/CourseRegTable.jsx";


export default async function CourseRegistration() {
  const t = await getTranslations("tables");
  const locale = await getLocale(); // Get current locale
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  async function fetchData(pageNumber = 1) {
    try {
      const res = await fetch(`${BASE_URL}/courses/list?page=${pageNumber}`, {
        method: "GET",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        cache: "no-store",
      });
      const respond = await res.json();
      return {
        data: respond.data || [],
        currentPage: respond.current_page || 1,
        totalPages: respond.last_page || 1,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [], currentPage: 1, totalPages: 1 };
    }
  }

  const [{ data, currentPage, totalPages }, rejectionReasons] =
    await Promise.all([fetchData(1)]);

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-0">
          <div className=" row m-0  p-2 g-3">
            <h2 className="hvvv">{t("webinars")}</h2>
            <div className=" col-12 ">
                <CourseRegTable
                  data={data}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
