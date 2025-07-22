"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { use } from 'react';

export default function edit({ params }) {
  const { id } = params;
  const t = useTranslations("settings");

  

  return (
    <>
      <div className="  m-0  container-fluid p-0   ">
        <div className=" p-lg-4   d-flex flex-column gap-4">
           <div className="col-11   col-lg-6    ">
            <h1 className=" hvvv mb-4"> {t("edit_user")}</h1>
               <div>
                 <h3 className=" Tit-12-700"> {t("full_name")}</h3>

                 <input
                   type="text"
                   className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                   style={{ border: "1px  solid  #E3E3E3" }}
                 />
               </div>
             </div>

             <div className="col-11   col-lg-6   ">
               <div>
                 <h3 className=" Tit-12-700"> {t("en_name")}</h3>

                 <input
                   type="text"
                   className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                   style={{ border: "1px  solid  #E3E3E3" }}
                 />
               </div>
             </div>

             <div className="col-11   col-lg-6   ">
               <div>
                {/* select not input */}
                 <h3 className=" Tit-12-700"> {t("user_role")}</h3>

                 <input
                   type="text"
                   className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                   style={{ border: "1px  solid  #E3E3E3" }}
                 />
               </div>
             </div>

             <div className="col-11   col-lg-6   ">
               <div>
                 <h3 className=" Tit-12-700"> {t("email")}</h3>

                 <input
                   type="text"
                   className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                   style={{ border: "1px  solid  #E3E3E3" }}
                 />
               </div>
             </div>

             <div className="col-11   col-lg-6   ">
               <div>
                 <h3 className=" Tit-12-700"> {t("mobile")}</h3>

                 <input
                   type="text"
                   className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                   style={{ border: "1px  solid  #E3E3E3" }}
                 />
               </div>
             </div>

             <div className="col-11   col-lg-6   ">
               <div>
                 <h3 className=" Tit-12-700"> {t("password")}</h3>

                 <input
                   type="text"
                   className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                   style={{ border: "1px  solid  #E3E3E3" }}
                 />
               </div>
             </div>

              <div className="col-11   col-lg-6   ">
               <div>
                 <h3 className=" Tit-12-700"> {t("bio")}</h3>

                 <input
                   type="text"
                   className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                   style={{ border: "1px  solid  #E3E3E3" }}
                 />
               </div>
             </div>

             <div className="col-11   col-lg-6   ">
               <div>
                {/* radio button */}
                 <h3 className=" Tit-12-700"> {t("status")}</h3>

                 <input
                   type="text"
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
