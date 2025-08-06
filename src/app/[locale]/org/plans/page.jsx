 import React from 'react'
 import { getTranslations } from "next-intl/server";

 import Backg from "@/assets/admin/Backund.png";

 import PlansComp from "@/components/planscomp/PlansComp"
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
} catch (err) {
  console.error("Fetch error:", err);
}
 



   return (
     <>
       <div className="  m-0    ">
         <div className="  m-4 p-0  p-md-4 g-3   mt-2">
        
            <PlansComp data={dataa} />
         </div>
       </div>
     </>
   );
 }
 