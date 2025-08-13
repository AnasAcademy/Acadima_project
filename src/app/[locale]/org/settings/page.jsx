import React from "react";
import OrgSettingSidebar from "@/components/OrgSettingSidebar/OrgSettingSidebar";
import { useTranslations } from "next-intl";

export default function Settings() {
  const t = useTranslations("adminSettings");

  return (
    <>
      <div className="  m-0  container  d-flex flex-column    ">
        <h2 className=" hvvv p-5   pb-3"> {t("settings")}</h2>
        <OrgSettingSidebar />
      </div>
    </>
  );
}
