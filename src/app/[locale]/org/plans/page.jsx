 import React from 'react'
 import { getTranslations } from "next-intl/server";
 import Line from "@/assets/navbar assets/Line 49.svg"
 import Backg from "@/assets/admin/Backund.png";
 import Image from "next/image";

export default async function Plans() {

 const tr = await getTranslations("tables");
     const t = await getTranslations("SubMan");
 
let dataa = [];

try {
  const data = await fetch(
    "https://api.lxera.net/api/development/organization/vodafone/plans",
    {
      method: "GET",
      headers: {
        "x-api-key": "1234",
        "Content-Type": "application/json",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUwODQzMzU1LCJuYmYiOjE3NTA4NDMzNTUsImp0aSI6IjBVZDcwYTNoa1RpZDd3WUMiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.LKM9YIlrS8FOnNBTXP7aRm2gLNDNbJflcB4_rHIFJBs`,
      },
    }
  );

  const respond = await data.json();
  dataa = respond.message.plans;
  console.log(dataa);
} catch (err) {
  console.error("Fetch error:", err);
}
 



   return (
     <>
       <div className="  m-0  container-fluid p-0 d-flex flex-column    ">
         <div className="   pt-0">
           <div className=" row m-0  p-2 g-3 ">
             <h2 className=" hvvv p-4 pb-0 pt-0"> {tr("plan_details")} </h2>

             {dataa.map((plan, index) => (
               <div key={index} className=" col-xl-7  bg-white d-flex">
                 <div className="   ">
                   <div className="  text-dark   z-0    p-5   ">
                     <h3 className="tit-18-700 text-dark">
                       {" "}
                       {t("company_name")}{" "}
                     </h3>
                     <h3 className="tit-18-700 text-dark"> {plan.name_ar} </h3>

                     <h3 className="tit-20-700 text-dark ">
                       {"$"} {plan.price}.00
                     </h3>

                     <div className=" d-flex gap-4 mt-3 ">
                       <div>
                         <h3 className="tit-12-400  text-dark">
                           {t("subscription_date")}
                         </h3>
                         <h3 className="  Tit-12-700  text-dark">
                           {plan.start_date}
                         </h3>
                       </div>
                       <div>
                         <h3 className="tit-12-400  text-dark">
                           {t("end_date")}
                         </h3>
                         <h3 className="  Tit-12-700  text-dark">
                           {plan.end_date}
                         </h3>
                       </div>
                       <div>
                         <h3 className="tit-12-400  text-dark text-nowrap">
                           {t("employees")}
                         </h3>
                         <h3 className="  Tit-12-700  text-dark text-nowrap">
                           {plan.max_users}
                         </h3>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className=" ">
                   <Line width={20} height={200} />
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>
     </>
   );
 }
 