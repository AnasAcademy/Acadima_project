import React from "react";
import StudentsCodeTable from "@/components/Tables&filters/StudentsCodeTable/StudentsCodeTable";
import { getTranslations } from "next-intl/server";

export default async function StudentCodes() {



 const ts = await getTranslations("SidebarA");

let dat = [];
let current_page = [] || 1;
let last_page = [];
try {
  const data = await fetch(
    `https://api.lxera.net/api/development/organization/vodafone/codes`,
    {
      method: "GET",
      headers: {
        "x-api-key": "1234",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA",
      },
    }
  );

  const respond = await data.json();
  console.log("go", respond.message);
  dat = respond.message;
  // current_page = respond.data.current_page;
  // last_page = respond.data.last_page;
} catch (error) {
  console.error("Fetch error:", error);
}











  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-0">
          <div className=" row m-0  p-2 g-3">
            <h2 className="hvvv">{ts("student-codes")}</h2>

            <div className=" col-12 ">
              <StudentsCodeTable dat={dat} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
