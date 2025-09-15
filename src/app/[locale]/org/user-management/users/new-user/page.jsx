import React from "react";
import { useTranslations } from "next-intl";
import NewUserForm from "@/components/Tables&filters/UsersTable/NewUserForm";

export default function NewUser() {
  const t = useTranslations("tables");

  return (
    <div className="  m-0  container-fluid p-0   ">
      <div className=" p-lg-4   d-flex flex-column gap-4">
        <div className="col-12  ">
          <h3 className=" hvvv my-4"> {t("add_new_user")}</h3>
          <NewUserForm />
        </div>
      </div>
    </div>
  );
}
