 import React from 'react'
 import { useTranslations } from "next-intl";
 import Line from "@/assets/admin/Line18.svg";
 import Ai from "@/assets/admin/ailogo.svg"
 export default function OrgsettHelper() {




 const t = useTranslations("aihelper");



   return (
     <>
       <div className="   container-fluid ">
         <div className=" row g-3">
           <div className=" col-12 col-lg-12 col-xl-6 ">
             <div className=" cardbg rounded-4 p-4 min-prev-ai">
               <div>
                 <h3 className=" tit-18-700  textcolor mb-0 d-flex gap-2 ">
                   {" "}
                   <Ai className="iconSize110" />
                   {t("title_settings")}{" "}
                 </h3>
                 <Line className="w-100" />
               </div>

               <div className=" d-flex  align-items-center  gap-4 pt-2  ">
                 <div>
                   <h3 className="Tit-14-700">{t("enable_assistant")}</h3>
                   <h4 className="tit-12-400"> {t("enable_assistant_note")}</h4>
                 </div>
                 <div className="form-check form-switch">
                   <input
                     className="form-check-input"
                     type="checkbox"
                     role="switch"
                     id="flexSwitchCheckChecked"
                     checked
                     style={{ width: "36px " }}
                   />
                 </div>
               </div>

               <div className=" d-flex flex-column   gap-3 justify-content-center   pt-2 ">
                 <h3 className="   Tit-14-700 mb-0">{t("assistant_tone")}</h3>
                 <div className=" d-flex gap-1 ">
                   <div className=" d-flex gap-2">
                     <div className="form-check">
                       <input
                         className="form-check-input "
                         type="radio"
                         name="exampleRadios"
                         id="exampleRadios1"
                         value="option1"
                         checked
                       />
                     </div>
                     <h3 className="  Tit-14-700"> {t("tone_formal")}</h3>
                   </div>

                   <div className=" d-flex gap-2">
                     <div className="form-check">
                       <input
                         className="form-check-input "
                         type="radio"
                         name="exampleRadios"
                         id="exampleRadios1"
                         value="option1"
                       />
                     </div>
                     <h3 className="  Tit-14-700"> {t("tone_friendly")}</h3>
                   </div>

                   <div className=" d-flex gap-2">
                     <div className="form-check">
                       <input
                         claclassNamess="form-check-input "
                         type="radio"
                         name="exampleRadios"
                         id="exampleRadios1"
                         value="option1"
                       />
                     </div>
                     <h3 className="  Tit-14-700 "> {t("tone_short")}</h3>
                   </div>
                 </div>
                 <h3 className="   Tit-14-700 mb-0">
                   {t("language_settings")}
                 </h3>
                 <div className=" d-flex gap-1">
                   <div className=" d-flex gap-2">
                     <div className="form-check">
                       <input
                         className="form-check-input "
                         type="radio"
                         name="exampleRadios"
                         id="exampleRadios1"
                         value="option1"
                         checked
                       />
                     </div>
                     <h3 className="  Tit-14-700"> {t("language_ar")}</h3>
                   </div>

                   <div className=" d-flex gap-2">
                     <div className="form-check">
                       <input
                         className="form-check-input "
                         type="radio"
                         name="exampleRadios"
                         id="exampleRadios1"
                         value="option1"
                       />
                     </div>
                     <h3 className="  Tit-14-700"> {t("language_en")}</h3>
                   </div>

                   <div className=" d-flex gap-2">
                     <div className="form-check">
                       <input
                         className="form-check-input "
                         type="radio"
                         name="exampleRadios"
                         id="exampleRadios1"
                         value="option1"
                       />
                     </div>
                     <h3 className="  Tit-14-700"> {t("language_both")}</h3>
                   </div>
                 </div>

                 <div className=" d-flex  align-items-center  gap-4 pt-2  ">
                   <div>
                     <h3 className="Tit-14-700">{t("restore_defaults")}</h3>
                     <h4 className="tit-12-400">
                       {" "}
                       {t("restore_defaults_note")}
                     </h4>
                   </div>
                   <div className="form-check form-switch">
                     <input
                       className="form-check-input"
                       type="checkbox"
                       role="switch"
                       id="flexSwitchCheckChecked"
                       checked
                       style={{ width: "36px " }}
                     />
                   </div>
                 </div>
               </div>
             </div>
           </div>

           <div className=" col-12 col-lg-12 col-xl-6 ">
             <div className="  cardbg rounded-4 p-4 min-prev-ai">
               <div>
                 <h3 className=" tit-18-700  textcolor mb-0 d-flex gap-2 ">
                   {" "}
                   <Ai className="iconSize110" />
                   {t("title_tasks")}{" "}
                 </h3>
                 <Line className="w-100" />
               </div>

               <div className=" row pt-2 g-3  ">
                 <h3 className=" tit-16-700 mb-0"> {t("select_tasks")} </h3>
                 <div className=" d-flex  flex-column justify-content-start align-items-start col-12   col-lg-6 col-xl-3">
                   <h3 className=" Tit-14-700 text-nowrap d-flex justify-content-center gap-2 align-items-center">
                     {" "}
                     <div className="form-check form-check-inline">
                       <input
                         className="form-check-input p-2"
                         type="checkbox"
                         id="inlineCheckbox1"
                         value="option1"
                         checked
                       />
                     </div>
                     {t("respond_to_queries")}
                   </h3>
                   <h3 className=" Tit-14-700 text-nowrap d-flex justify-content-center gap-2 align-items-center">
                     {" "}
                     <div className="form-check form-check-inline">
                       <input
                         className="form-check-input p-2"
                         type="checkbox"
                         id="inlineCheckbox1"
                         value="option1"
                         checked
                       />
                     </div>
                     {t("performance_suggestions")}
                   </h3>
                   <h3 className=" Tit-14-700 text-nowrap d-flex justify-content-center gap-2 align-items-center">
                     {" "}
                     <div className="form-check form-check-inline">
                       <input
                         className="form-check-input p-2"
                         type="checkbox"
                         id="inlineCheckbox1"
                         value="option1"
                         checked
                       />
                     </div>
                     {t("smart_notifications")}
                   </h3>
                   <h3 className=" Tit-14-700 text-nowrap d-flex justify-content-center gap-2 align-items-center">
                     {" "}
                     <div className="form-check form-check-inline">
                       <input
                         className="form-check-input p-2"
                         type="checkbox"
                         id="inlineCheckbox1"
                         value="option1"
                         checked
                       />
                     </div>
                     {t("procedure_guides")}
                   </h3>
                   <h3 className=" Tit-14-700 text-nowrap d-flex justify-content-center gap-2 align-items-center">
                     {" "}
                     <div className="form-check form-check-inline">
                       <input
                         className="form-check-input p-2"
                         type="checkbox"
                         id="inlineCheckbox1"
                         value="option1"
                         checked
                       />
                     </div>
                     {t("report_summaries")}
                   </h3>
                 </div>

                 <h3 className=" tit-16-700 mb-0">
                   {" "}
                   {t("suggest_new_tasks")}{" "}
                 </h3>
                 <textarea
                   name=""
                   id=""
                   className=" w-75  p-2  m-2 "
                   style={{ border: "1px  solid  #E3E3E3" }}
                 >
                   {" "}
                 </textarea>
               </div>
             </div>
           </div>
         </div>
       </div>
     </>
   );
 }
 