import React from "react";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import AssignmentsTable from "@/components/Tables&filters/AssignmentsTable/AssignmentsTable";


export default async function Assignments() {

  const t = await getTranslations("employee_progress");

  let dat = [];
  let current_page = [] || 1;
  let last_page = [];

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  try {
    const respond = await fetch(`${BASE_URL}/assignments`, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer  ${token}`,
      },
    });

    const data = await respond.json();
    dat = data.data.assignmentsTable;
    console.log(dat);
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
            {/* <h2 className="hvvv"></h2> */}

            <div className=" col-12 ">
              <AssignmentsTable dat={dat} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
