 import React from 'react'
 import { useTranslations } from "next-intl";
 import Arrow from "@/assets/admin/arrow down.svg";
 export default function SelectCard() {
  

    const t = useTranslations("employee_progress");
   return (
     <>
       <div className="cardbg  px-3 py-2 d-flex flex-row justify-content-between align-items-center rounded-4  min-adash-ht">
         <div className="  row d-flex justify-content-between  w-100 ">
           <div className="col-lg-12 col-xl-9 col-12 col-md-12 ">
             <div className={`  m-2  row  g-4   `}>
               <div className=" col-lg-6 col-xl-3    col-12 m-0">
                 <div className=" d-flex w-100 flex-column  ">
                   <h3 className="h6"> {t("training_course")} </h3>

                   <div className="d-flex justify-content-center  align-items-center  w-100  position-relative  ">
                     <select
                       className="form-select   cselect  custroundbtn  "
                       aria-label="Default select example"
                       defaultValue={0}
                     >
                       <option value="0"> {t("sort_by")} </option>
                       <option value="1">One</option>
                       <option value="2">Two</option>
                       <option value="3">Three</option>
                     </select>
                     <Arrow className="iconSize5 position-absolute selclass p-1" />
                   </div>
                 </div>
               </div>

               <div className=" col-lg-6 col-xl-3 col-12">
                 <div className="d-flex w-100 flex-column  ">
                   <h3 className="h6"> {t("branch")}</h3>
                   <div className="d-flex justify-content-center  align-items-center  w-100  position-relative  ">
                     <select
                       className="form-select  custroundbtn"
                       aria-label="Default select example"
                       defaultValue={0}
                     >
                       <option value="0"> {t("sort_by")}</option>
                       <option value="1">One</option>
                       <option value="2">Two</option>
                       <option value="3">Three</option>
                     </select>
                     <Arrow className="iconSize5 position-absolute selclass p-1" />
                   </div>
                 </div>
               </div>

               <div className=" col-lg-6 col-xl-3 col-12">
                 <div className="d-flex w-100 flex-column">
                   <h3 className="h6"> {t("department")}</h3>
                   <div className="d-flex justify-content-center  align-items-center  w-100  position-relative  ">
                     <select
                       className="form-select  custroundbtn"
                       aria-label="Default select example"
                       defaultValue={0}
                     >
                       <option value="0"> {t("sort_by")} </option>
                       <option value="1">One</option>
                       <option value="2">Two</option>
                       <option value="3">Three</option>
                     </select>
                     <Arrow className="iconSize5 position-absolute selclass p-1" />
                   </div>
                 </div>
               </div>
               <div className=" col-lg-6 col-xl-3 col-12">
                 <div className="d-flex w-100 flex-column">
                   <h3 className="h6"> {t("program_status")}</h3>
                   <div className="d-flex justify-content-center  align-items-center  w-100  position-relative  ">
                     <select
                       className="form-select  custroundbtn"
                       aria-label="Default select example"
                       defaultValue={0}
                     >
                       <option value="0"> {t("sort_by")}</option>
                       <option value="1">One</option>
                       <option value="2">Two</option>
                       <option value="3">Three</option>
                     </select>
                     <Arrow className="iconSize5 position-absolute selclass p-1" />
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </>
   );
 }
 