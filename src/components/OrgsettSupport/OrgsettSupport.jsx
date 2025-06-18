 import React from 'react'
 import Line from "@/assets/admin/Line18.svg";
 import Ai from "@/assets/admin/ailogo.svg";
 import { useTranslations } from "next-intl";
 export default function OrgsettSupport() {


 const t = useTranslations("aisupport");

   return (
     <>
       <div className="  container">
         <div className=" row g-3">
           <div className=" col-12 cardbg p-4">
             <div>
               <h3 className=" tit-16-700 textcolor  ">
                 {t("title_support_settings")}
               </h3>
               <p className=" tit-14-400">
                 {t("description_support_settings")}
               </p>
             </div>
           </div>

           <div className=" col-12 col-lg-12 col-xl-5 ">
             <div className="  cardbg p-4 min-prev-ai">
               <div>
                 <h3 className=" tit-18-700  textcolor d-flex gap-2 ">
                   {t("title_channels")}{" "}
                 </h3>
                 <p className=" tit-14-400">{t("channels_description")}</p>
               </div>

               <div className=" row  g-3  ">
                 <div className=" d-flex  flex-column justify-content-start align-items-start col-12   col-lg-6 col-xl-3">
                   <h3 className=" Tit-14-700 text-nowrap d-flex justify-content-center gap-2 align-items-center">
                     {" "}
                     <div className="form-check form-check-inline">
                       <input
                         class="form-check-input p-2"
                         type="checkbox"
                         id="inlineCheckbox1"
                         value="option1"
                         checked
                       />
                     </div>
                     {t("channel_email")}
                   </h3>
                   <h3 className=" Tit-14-700 text-nowrap d-flex justify-content-center gap-2 align-items-center">
                     {" "}
                     <div className="form-check form-check-inline">
                       <input
                         class="form-check-input p-2"
                         type="checkbox"
                         id="inlineCheckbox1"
                         value="option1"
                         checked
                       />
                     </div>
                     {t("channel_chat")}
                   </h3>
                   <h3 className=" Tit-14-700 text-nowrap d-flex justify-content-center gap-2 align-items-center">
                     {" "}
                     <div className="form-check form-check-inline">
                       <input
                         class="form-check-input p-2"
                         type="checkbox"
                         id="inlineCheckbox1"
                         value="option1"
                         checked
                       />
                     </div>
                     {t("channel_tickets")}
                   </h3>
                   <h3 className=" Tit-14-700 text-nowrap d-flex justify-content-center gap-2 align-items-center">
                     {" "}
                     <div className="form-check form-check-inline">
                       <input
                         class="form-check-input p-2"
                         type="checkbox"
                         id="inlineCheckbox1"
                         value="option1"
                         checked
                       />
                     </div>
                     {t("channel_ai_assistant")}
                   </h3>
                   <h3 className=" Tit-14-700 text-nowrap d-flex justify-content-center gap-2 align-items-center">
                     {" "}
                     <div className="form-check form-check-inline">
                       <input
                         class="form-check-input p-2"
                         type="checkbox"
                         id="inlineCheckbox1"
                         value="option1"
                         checked
                       />
                     </div>
                     {t("channel_phone")}
                   </h3>
                 </div>
               </div>
             </div>
           </div>

           <div className=" col-12 col-lg-12 col-xl-7 ">
             <div className="  cardbg p-4 min-prev-ai ">
               <div className=" d-flex flex-column gap-2">
                 <div>
                   <h3 className=" tit-18-700  textcolor d-flex gap-2 ">
                     {t("title_availability_settings")}{" "}
                   </h3>
                   <p className=" tit-14-400 ">
                     {t("availability_description")}
                   </p>
                 </div>

                 <div className=" d-flex  col-12 rounded-2 gap-3   ">
                   <div
                     className=" d-flex justify-content-center align-items-center rounded-3 "
                     style={{ border: "1px  solid  #E3E3E3" }}
                   >
                     {" "}
                     <p className=" tit-12-400 mb-0 p-1 ps-4 pe-4">
                       {t("days_available")}
                     </p>{" "}
                   </div>

                   <div
                     className="  d-flex justify-content-center align-items-center rounded-3  "
                     style={{ border: "1px  solid  #E3E3E3" }}
                   >
                     {" "}
                     <p className=" tit-12-400 mb-0  p-1 ps-4 pe-4">
                       8:00 صباحاً
                     </p>{" "}
                   </div>
                   <h3>-</h3>
                   <div
                     className=" d-flex justify-content-center align-items-center rounded-3 "
                     style={{ border: "1px  solid  #E3E3E3" }}
                   >
                     {" "}
                     <p className=" tit-12-400 mb-0 p-1 ps-4 pe-4 ">
                       6:00 صباحاً
                     </p>{" "}
                   </div>
                 </div>
               </div>

               <div className=" d-flex flex-column mt-4">
                 <div className=" d-flex flex-column gap-3">
                   <div>
                     <h3 className=" tit-18-700  textcolor d-flex gap-2  bg-w ">
                       {t("title_response_settings")}{" "}
                     </h3>
                     <p className=" tit-14-400 mb-0">
                       {t("response_description")}
                     </p>
                   </div>

                   <div className=" d-flex   gap-3 ">
                     <div
                       className=" d-flex gap-3 rounded-3 justify-content-between align-items-center pt-0 pb-0  ps-4 pe-4   "
                       style={{ border: "1px  solid  #E3E3E3" }}
                     >
                       <h3 className="Tit-14-700">{t("edit_response")}</h3>
                       <div class="form-check form-switch">
                         <input
                           class="form-check-input  p-0"
                           type="checkbox"
                           role="switch"
                           id="flexSwitchCheckChecked"
                           checked
                           style={{ width: "36px " }}
                         />
                       </div>
                     </div>

                     <div className=" d-flex gap-3 justify-content-between align-items-center ">
                       <div
                         className=" rounded-3 "
                         style={{ border: "1px  solid  #E3E3E3" }}
                       >
                         {" "}
                         <p className=" tit-14-700 mb-0  p-2  text-nowrap ps-3 pe-3 ">
                           {t("default_response")}
                         </p>{" "}
                       </div>
                     </div>
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
 