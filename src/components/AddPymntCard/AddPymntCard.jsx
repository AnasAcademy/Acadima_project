 import React from 'react'
 import Visa from "@/assets/admin/VisaIcon.svg";
 import Master from "@/assets/admin/MastercardIcon.svg";
 import Edit from "@/assets/admin/penedit.svg";

 import { useTranslations } from "next-intl";
 export default function AddPymntCard() {



      const t = useTranslations("SubMan");
   return (
     <>
       <div className=" d-flex  flex-column  gap-4  justify-content-center h-100 p-4 cardbg">
         <div className=" d-flex align-items-center w-100 justify-content-between">
           <h3 className="Tit-14-700 ">{t("payment_methods")}</h3>
           <button className=" btn  custfontbtn tit-10-700 ">
             {t("add_payment_method")}
           </button>
         </div>

         <div className=" d-flex flex-column  gap-3">
           <div className=" d-flex w-100  justify-content-between align-items-center border-2 bordcolor border p-2 rounded-3  ">
             <Edit className="iconSize12 m-2 " />

             <div className=" d-flex align-items-center gap-3 ">
               <h6 className=" m-0 text-center tit-14-400 ">
                 7812 2139 0823 XXXX
               </h6>
               <Visa className="iconSize2  " />
             </div>
           </div>

           <div className="  d-flex w-100  justify-content-between align-items-center border-2 bordcolor border p-2 rounded-3 ">
             <Edit className="iconSize12 m-2" />
             <div className=" d-flex align-items-center gap-3  ">
               <h6 className=" m-0  text-center  tit-14-400">
                 7812 2139 0823 XXXX
               </h6>
               <Master className="iconSize2  " />
             </div>
           </div>
         </div>
       </div>
     </>
   );
 }
 