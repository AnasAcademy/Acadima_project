import React from "react";
import Regpro from "@/components/regpro/Regpro";
import EnrollProgram from "@/components/EnrollProgram/EnrollProgram";
import { useTranslations } from "next-intl";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

import { cookies } from "next/headers";


export default function Admissions() {
        const token = cookies().get("auth_token")?.value;

  const t = useTranslations("RegisteredPrograms");
  const ts = useTranslations("EnrollProgram");
  return (
    <>
   
        <div className="  container pt-lg-0 pt-5 p-3  mt-5 w-100  ">
          <div>
            <h2 className=" hvvv mt-md-4 mt-lg-0"> {t("title")}</h2>

            <div className=" row g-3 mt-4">
              <div className=" d-flex flex-column gap-3 col-sm-12 col-md-6  col-xl-6">
                <Regpro />
              </div>

              <div className=" d-flex flex-column gap-3 col-sm-12 col-md-6 col-xl-6">
                <Regpro />
              </div>
            </div>
          </div>

          <div className=" mt-5">
            <h2 className=" hvvv"> {ts("title")}</h2>

            <div className=" row g-3 mt-4">
              <div className=" col-xl-6 mt-4  col-12  ">
                <EnrollProgram token={token}/>
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
}
