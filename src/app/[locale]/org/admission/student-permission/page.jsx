import React from "react";
import { getTranslations } from "next-intl/server";
import StudentPerTable from "@/components/Tables&filters/StudentPermissionsTable/StudentPerTable";
import { cookies } from "next/headers";



export default async function StudentPermissions() {
  const ts = await getTranslations("SidebarA");
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  // Server-side fetch

  async function fetchData(pageNumber = 1) {
    try {
      const res = await fetch(
        `${BASE_URL}/permission/user_access?page=${pageNumber}`,
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
        data: result.sales.data || [],
        studyClasses: result.studyClasses || [],
        currentPage: result.sales?.current_page || 1,
        totalPages: result.sales?.last_page || 1,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [], studyClasses: [], currentPage: 1, totalPages: 1 };
    }
  }

  const { data, studyClasses, currentPage, totalPages } = await fetchData(1);



  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-lg-0">
          <div className=" row m-0  p-2 g-3">
            <h2 className="hvvv">{ts("student-permission")}</h2>
            <div className=" col-lg-12 ">
           
                <StudentPerTable 
                  initialData={data}
                  initialStudyClasses={studyClasses}
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
