import React from "react";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import RolesTable from "@/components/Tables&filters/RolesTable/RolesTable";

export default async function Roles() {
const ts = await getTranslations("SidebarA");

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const companyName = process.env.company_name;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL.replace(
    "${company_name}",
    companyName
  );

  // Server-side fetch
  async function fetchData() {
    try {
      const res = await fetch(`${baseUrl}/users/roles`, {
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
        data: respond.roles || [],
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: [] };
    }
  }

  const { data } = await fetchData(1);


  return (
      <div className="m-0 container-fluid p-0 d-flex flex-column">
        <div className="p-lg-4 pt-lg-0">
          <div className="row m-0 p-2 g-3">
            <h2 className="hvvv">{ts("roles-list")}</h2>
            <div className="col-lg-12">
              <RolesTable
                initialData={data}
                companyName={companyName} // optional: pass to table
              />
            </div>
          </div>
        </div>
      </div>
    );
}