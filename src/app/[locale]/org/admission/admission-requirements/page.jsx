import React from "react";
import { getTranslations } from "next-intl/server";
import AdmissionReqTable  from "@/components/Tables&filters/AdmissionReqTable/AdmissionReqTable"

export default async function AdmissionReq() {
  const t = await getTranslations("tables");


  



  return (
    <>
      <div className="  m-0  container-fluid p-0 d-flex flex-column   ">
        <div className=" p-lg-4  pt-lg-0">
          <div className=" row m-0  p-2 g-3">
            <h2 className="hvvv">{t("admission-requirements")}</h2>
            <div className=" col-lg-12 ">    
              <AdmissionReqTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
