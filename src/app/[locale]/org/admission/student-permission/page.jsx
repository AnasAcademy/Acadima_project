import React from "react";
import { getTranslations } from "next-intl/server";
import StudentPerTable from "@/components/Tables&filters/StudentPerTable/StudentPerTable";

export default async function StudentPermissions() {
  const ts = await getTranslations("SidebarA");



  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-lg-0">
          <div className=" row m-0  p-2 g-3">
            <h2 className="hvvv">{ts("student-permission")}</h2>
            <div className=" col-lg-12 ">
              {Array.isArray(dataa) && dataa.length > 0 ? (
                <StudentPerTable dataa={dataa} />
              ) : (
                <div className="text-muted">{t("no-data")}</div> // or just "No data available"
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
