import React from "react";
import { getTranslations } from "next-intl/server";
import StudentPerTable from "@/components/Tables&filters/StudentPerTable/StudentPerTable";

export default async function StudentPermissions() {
  const ts = await getTranslations("SidebarA");

  // let dataa = [];

  // try {
  //   const res = await fetch(
  //     "https://api.lxera.net/api/development/organization/vodafone/permission/user_access",
  //     {
  //       method: "GET",
  //       headers: {
  //         "x-api-key": "1234",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
  //       },
  //     }
  //   );
  //   const respond = await res.json();
  //   dataa = respond;
  //   // console.log(dataa.sales);
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-0">
          <div className=" row m-0  p-2 g-3">
            <h2 className="hvvv">{ts("student-permission")}</h2>
            <div className=" col-lg-12 ">
              <StudentPerTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
