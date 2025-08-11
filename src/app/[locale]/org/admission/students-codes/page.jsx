import React from "react";
import StudentsCodeTable from "@/components/Tables&filters/StudentsCodeTable/StudentsCodeTable";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
export default async function StudentCodes() {

  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const ts = await getTranslations("SidebarA");

let dat = [];
let current_page = [] || 1;
let last_page = [];
try {
  const data = await fetch(`${BASE_URL}/codes`, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const respond = await data.json();
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
