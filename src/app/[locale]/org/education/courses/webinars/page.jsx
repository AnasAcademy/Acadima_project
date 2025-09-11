import React from "react";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import CourseDetailsTable from "@/components/Tables&filters/Courses/CourseDetailsTable.jsx";


export default async function page() {


const t = await getTranslations("tables");

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value || "";
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  // Server-side fetch (mirrors the style used in StudentPermissions)
  async function fetchData(pageNumber = 1) {
    try {
      const res = await fetch(
        `${BASE_URL}/webinars?type=webinar&page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();
      return {
        data: result.webinars?.data || [],
        currentPage: result.webinars?.current_page || 1,
        totalPages: result.webinars?.last_page || 1,
        info: result || {},
      };
    } catch (error) {
      console.error("Error fetching course data:", error);
      return { data: [], currentPage: 1, totalPages: 1, info: {} };
    }
  }

  const { data, currentPage, totalPages, info } = await fetchData(1);





  return     <div className="m-0 container-fluid p-0 d-flex flex-column">
        <div className="p-lg-4 pt-0">
          <div className="row m-0 p-2 g-3">
            <h2 className="hvvv">{t("webinars")}</h2>
            <div className="col-12">
              <CourseDetailsTable
                initialData={data}
                initialPage={currentPage}
                initialTotalPages={totalPages}
                info={info}
                type="webinar"
              />
            </div>
          </div>
        </div>
      </div>;
}
