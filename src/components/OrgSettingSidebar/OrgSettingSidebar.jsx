 'use client'
 import React, { useEffect, useState } from 'react'
 import Dash from "@/assets/admin/maindash.svg";
 import Team from "@/assets/admin/team.svg";
 import System from "@/assets/admin/system.svg";
 import Helper from "@/assets/admin/helper.svg";
 import Support from "@/assets/admin/support.svg";
 import Pen from "@/assets/admin/pen.svg";
 import { useTranslations } from "next-intl";
 import OrgsettingAcc from "@/components/OrgSettingsAcc/OrgsettingAcc"
 import OrgSettSystem from "@/components/OrgSettSystem/OrgSettSystem"
import OrgsettHelper from "@/components/OrgsettHelper/OrgsettHelper"
import OrgsettSuport from "@/components/OrgsettSupport/OrgsettSupport"


 export default function OrgSettingSidebar() {

    const t = useTranslations("adminSettings");

     const [sel , setSel] = useState(null)
     const [activeTab, setActiveTab] = useState(1);
    const selector = {
      1: <OrgsettingAcc />,
      2: <h2>Team Page</h2>,
      3: <OrgSettSystem />,
      4:<OrgsettHelper />,
      5: <OrgsettSuport />
      

    }

    useEffect(()=>{

      
        setSel(selector[1])

       
    },[])
    
 

    function select(num){

        setSel(selector[num]);

        setActiveTab(num);


   }

   return (
     <>
       <div className=" row m-0   g-3 ">
         <div className="col-12 col-xl-2  p-5 pt-0 pb-1 p-xl-0   ">
           <div className=" d-flex flex-column gap-4 pt-5 mt-2  ps-4 pe-4 pb-5 cardbg  mb-3 align-items-center align-items-lg-start ">
             <div
               className=" d-flex gap-2  align-items-center cursor-pointer "
               onClick={() => {
                 select(1);
               }}
             >
               <Dash
                 className={`iconSize1  ${
                   activeTab === 1 ? "iconcolor2" : "iconcolor3"
                 }       `}
               />
               <h3
                 className={` Tit-14-700   mb-0    ${
                   activeTab === 1 ? " textcolor" : ""
                 }       `}
               >
                 {t("account")}
               </h3>
             </div>
             <div
               className=" d-flex gap-2  align-items-center cursor-pointer"
               onClick={() => {
                 select(2);
               }}
             >
               <Team
                 className={`iconSize1  ${
                   activeTab === 2 ? "iconcolor2" : "iconcolor3"
                 }       `}
               />
               <h3
                 className={` Tit-14-700   mb-0    ${
                   activeTab === 2 ? " textcolor" : ""
                 }       `}
               >
                 {t("team")}
               </h3>
             </div>
             <div
               className=" d-flex gap-2  align-items-center cursor-pointer"
               onClick={() => {
                 select(3);
               }}
             >
               <System
                 className={`iconSize1  ${
                   activeTab === 3 ? "iconcolor2" : "iconcolor3"
                 }       `}
               />
               <h3
                 className={` Tit-14-700   mb-0    ${
                   activeTab === 3 ? " textcolor" : ""
                 }       `}
               >
                 {t("system")}
               </h3>
             </div>
             <div
               className=" d-flex gap-2  align-items-center cursor-pointer"
               onClick={() => {
                 select(4);
               }}
             >
               <Helper
                 className={`iconSize1  ${
                   activeTab === 4 ? "iconcolor2" : "iconcolor3"
                 }       `}
               />
               <h3
                 className={` Tit-14-700   mb-0    ${
                   activeTab === 4 ? " textcolor" : ""
                 }       `}
               >
                 {t("assistant")}
               </h3>
             </div>
             <div
               className=" d-flex gap-2  align-items-center cursor-pointer"
               onClick={() => {
                 select(5);
               }}
             >
               <Support
                 className={`iconSize1  ${
                   activeTab === 5 ? "iconcolor2" : "iconcolor3"
                 }       `}
               />
               <h3
                 className={` Tit-14-700   mb-0    ${
                   activeTab === 5 ? " textcolor" : ""
                 }       `}
               >
                 {t("support")}
               </h3>
             </div>
           </div>
           <div>
             <button className=" btn  btn-light   btncolor text-white w-100 Tit-12-700">
               {" "}
               <Pen className="  m-1" /> {t("save_changes")}
             </button>
           </div>
         </div>

         <div className="col-12 col-xl-10     p-5   pt-0 ">{sel}</div>
       </div>
     </>
   );
 }
 