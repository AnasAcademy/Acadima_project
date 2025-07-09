"use client";
import React from "react";
import { useTranslations } from "next-intl";

export default function EnrollmentList() {
  const t = useTranslations("add-student-to-class");

  return (
    <>
      <div className="  m-0  container-fluid p-0   ">
        <div className=" p-lg-4   d-flex flex-column gap-4">
           <div className="col-11   col-lg-6    ">
               <div>
                 <h3 className=" Tit-12-700"> {t("class")}</h3>

                 <input
                   type="text"
                   value={" خالد محمد العنزي"}
                   className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                   style={{ border: "1px  solid  #E3E3E3" }}
                 />
               </div>
             </div>

             <div className="col-11   col-lg-6   ">
               <div>
                 <h3 className=" Tit-12-700"> {t("user")}</h3>

                 <input
                   type="text"
                   value={" خالد محمد العنزي"}
                   className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                   style={{ border: "1px  solid  #E3E3E3" }}
                 />
               </div>
             </div>

             <div class=" d-flex justify-content-start">
                <button class=" btn btn-light custfontbtn" type="submit">حفظ</button>
            </div>
          </div>
      </div>
    </>
  );
}
