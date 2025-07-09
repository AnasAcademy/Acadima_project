import React from "react";
import { getTranslations } from "next-intl/server";
import PastticketComp from "@/components/PastticketComp/PastticketComp";


export default async function AdmissionReq() {
  const t = await getTranslations("tables");

  let dataa = [];

  try {
    const res = await fetch(
      "https://api.lxera.net/api/development/organization/vodafone/requirements/list",
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
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const TableHead = [
    "#",
    t("user-code"),
    t("user-name"),
    t("registered-program-type"),
    t("registered-program"),
    t("identity-file"),
    t("requirements"),
    t("user-status"),
    t("admin"),
    t("submission-date"),
    t("actions"),
  ];

  const selectCardData = {
    inputs: [
      {
        title: t("user-code"),
        type: "search",
      },
      {
        title: t("user-mail"),
        type: "search",
      },
      {
        title: t("user-name"),
        type: "search",
      },
      {
        title: t("user-phone"),
        type: "search",
      },

    ],
  };

  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-0">
          <div className=" row m-0  p-2 g-3">
            <h2 className="hvvv">{t("admission-requirements")}</h2>
            <div className=" col-lg-12 ">
              <PastticketComp
                dataa={dataa?.data}
                selectCardData={selectCardData}
                TableHead={TableHead}
                type="admin-req"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
