import React from "react";
import { getTranslations } from "next-intl/server";
import CreateAccountTable from "@/components/Tables&filters/Records/create-accountTable/CreateAccountTable";

export default async function CreateAccountStudents() {
  const ts = await getTranslations("SidebarA");

  // Server-side fetch
  async function fetchData(pageNumber = 1) {
    try {
      const res = await fetch(
        `https://api.lxera.net/api/development/organization/vodafone/students/registered_users?page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "1234",
            "Content-Type": "application/json",
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
          },
        }
      );

      const respond = await res.json();
      console.log("Full API response:", respond);

      return {
        data: respond.users?.data || [],
        currentPage: respond.users?.current_page || 1,
        totalPages: respond.users?.last_page || 1,
        statuses: respond.statusOptions || [],
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [], currentPage: 1, totalPages: 1, statuses: [] };
    }
  }

  const { data, currentPage, totalPages, statuses } = await fetchData(1);

  return (
    <div className="m-0 container-fluid p-0 d-flex flex-column">
      <div className="p-lg-4 pt-lg-0">
        <div className="row m-0 p-2 g-3">
          <h2 className="hvvv">{ts("students-list")}</h2>
          <div className="col-lg-12">
            <CreateAccountTable
              initialData={data}
              initialPage={currentPage}
              initialTotalPages={totalPages}
              initialStatuses={statuses}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
