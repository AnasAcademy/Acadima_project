import React from "react";
import { getTranslations } from "next-intl/server";
import PastticketComp from "@/components/PastticketComp/PastticketComp";

export default async function StudentPermissions() {
  const ts = await getTranslations("SidebarA");
  const t = await getTranslations("tables");

  let dataa = [];

  try {
    const res = await fetch(
      "https://api.lxera.net/api/development/organization/vodafone/permission/user_access",
      {
        method: "GET",
        headers: {
          "x-api-key": "1234",
          "Content-Type": "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
        },
      }
    );
    const respond = await res.json();
    dataa = respond;
    console.log(dataa.sales);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const TableHead = [
    "#",
    t("user-name"),
    t("registered-program"),
    t("batch-number"),
    t("user-access"),
  ];

  const selectCardData = {
    inputs: [
      {
        title: t("user-code"),
        type: "search",
      },
      {
        title: t("user-name"),
        type: "search",
      },
      {
        title: t("batch-number"),
        type: "select",
        options: ["React", "Next.js", "Laravel"]
      },
    ],
  };

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-0">
          <div className=" row m-0  p-2 g-3">
            <h2 className="hvvv">{ts("student-permission")}</h2>
            <div className=" col-lg-12 ">
              <PastticketComp
                dataa={dataa?.sales}
                selectCardData={selectCardData}
                TableHead={TableHead}
                type="student-permission"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
