 import React from 'react'
 import { getTranslations } from "next-intl/server";
 import Line from "@/assets/navbar assets/Line 49.svg"
 import Backg from "@/assets/admin/Backund.png";
 import Image from "next/image";
 import  Planbg from "@/assets/admin/icon 1.svg"
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
       <div className="  m-0    ">
         <div className="  m-0  p-4 g-3  ">
           <h2 className="  hvvv p-4 pb-0 pt-0"> {tr("plan_details")} </h2>
           {dataa.map((plan, index) => (
             <div
               key={index}
               className="bg-white card border-0 row rounded-4 m-4 d-flex flex-column justify-content-center align-items-center  justify-content-xl-start  flex-lg-row "
             >
               <div className="  text-dark   z-0  col-lg-5 col-xl-3   p-5    d-flex justify-content-center  flex-column align-items-center    align-items-lg-start  ">
                 <div className="position-relative d-inline-block">
                   <Planbg
                     className=" h-auto"
                     style={{ opacity: 0.8 }}
                     width={210}
                     height={50}
                   />
                   <h4 className="position-absolute   start-50 translate-middle text-white planabsolute  text-nowrap">
                     {plan.name}
                   </h4>
                 </div>
                 <h3 className=" tit-20-700 text-dark text-nowrap pt-2">
                   {" "}
                   {plan.name_ar}{" "}
                 </h3>
                 <div className=" d-flex align-items-center   ">
                   <h3 className="tit-55-700 text-dark  text-nowrap">
                     {"$"} {plan.price}
                   </h3>
                   <h4 className="tit-20-400 pt-3  text-nowrap">/الشهر</h4>
                 </div>
                 <h4 className="tit-16-400 "> {plan.description}</h4>
               </div>

               <div className=" p-3  d-none d-lg-flex col-lg-1 col-xl-2 justify-content-center ">
                 <Line width={20} height={200} />
               </div>

               <div className="  d-flex p-4 flex-column gap-5 col-lg-6 col-xl-3 text-center d-flex justify-content-center  flex-column align-items-center   align-items-lg-start ">
                 <div className=" d-flex gap-1 flex-column ">
                   <h4 className="tit-20-700 text-dark">
                     {tr("subscription_validity")}
                   </h4>
                   <div className=" d-flex gap-3 ">
                     <h5> {plan.start_date} </h5>
                     <h5> {plan.end_date} </h5>
                   </div>
                 </div>

                 <div className=" d-flex gap-2 flex-column ">
                   <h4 className="  p-0 m-0  tit-16-700"> ادارة الاشتراك</h4>
                   <div className=" d-flex gap-2">
                     <button className=" btn planbtn-g   w-100  text-nowrap ">
                       حالة الإشتراك : نشط
                     </button>
                     <button className=" btn planbtn-b  w-100 text-nowrap">
                       تعديل الخطة
                     </button>
                     <button className=" btn planbtn-r  w-100 text-nowrap">
                       إ يقاف الخطة
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>
     </>
   );
 }
 