"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Editform from "@/components/Editform/Editform";
import { useUserData } from "@/context/UserDataContext";


export default function NewUser() {
  const t = useTranslations("tables");
  const ts = useTranslations("settings");
    const { getRoleOptions, getStatusOptions } = useUserData();
  

  const fields = [
    { name: "full_name", label: ts("full_name"), type: "text" },
    { name: "en_name", label: ts("en_name"), type: "text" },
    {
      name: "role_name",
      label: ts("user_role"),
      type: "select",
      options: getRoleOptions(),
    },
    { name: "email", label: ts("email"), type: "text" },
    { name: "mobile", label: ts("mobile"), type: "text" },
    { name: "password", label: ts("password"), type: "text" },
    { name: "bio", label: ts("bio"), type: "text" },
    { name: "about", label: ts("about"), type: "text" },
    {
      name: "status",
      label: t("status"),
      type: "select",
      options: getStatusOptions(),
    },
  ];
  const formState = t("add"); 
  
  return (
    <div className="  m-0  container-fluid p-0   ">
      <div className=" p-lg-4   d-flex flex-column gap-4">
        <div className="col-12  ">
          <h3 className=" hvvv my-4"> {t("add_new_user")}</h3>
          <div className="col-12 bg-white rounded-4 shadow-sm">
          <Editform
            fields={fields}
            formState={formState}

          />
          </div>
        </div>
      </div>
    </div>
  );
}
