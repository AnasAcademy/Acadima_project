"use client"
import React from "react";
import { useTranslations } from "next-intl";
import Techcard from '@/assets/admin/Techcard.svg';

export default function NewTechCard() {

  const t = useTranslations("techSupport");

   
   async function create_ticket(){

    console.log("here");
       try {
       
        const respond = await fetch(
           "https://api.lxera.net/api/development/organization/vodafone/supports",
           {
             method: "post",
             headers: {
               "x-api-key": "1234",
               "Content-Type": "application/json",
               Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5seGVyYS5uZXQvYXBpL2RldmVsb3BtZW50L2xvZ2luIiwiaWF0IjoxNzUxMzU5MzEzLCJuYmYiOjE3NTEzNTkzMTMsImp0aSI6IjcwUHV3TVJQMkVpMUJrM1kiLCJzdWIiOiIxIiwicHJ2IjoiNDBhOTdmY2EyZDQyNGU3NzhhMDdhMGEyZjEyZGM1MTdhODVjYmRjMSJ9.Ph3QikoBXmTCZ48H5LCRNmdLcMB5mlHCDDVkXYk_sHA`,
             },
             body: JSON.stringify({
               title: "شكوى عن التدريب",
               user_id: 1,
               message: "مواعيد الاختبارات غير مناسبة",
               attach: "store/1/quiz-schedule.png",
             }),
           }
         );
         const data = await respond.json();
         
         console.log(data.message || []);
        
       } catch (error) {
        
       }







   }
       
 






  return (
    <>
<<<<<<< HEAD
      <div className="p-0 w-100   mt-1 rounded-4  cardbg text-white min-nam-ht ">
=======
      <div className="p-0 w-100   mt-1 rounded-4  cardbg text-white   ">
>>>>>>> 6586ee9 (Modifications_p1)
        <div className=" d-flex flex-column justify-content-center align-items-start  text-white">
          <div className="circbg w-100 techcardtop">
            <h2 className="p-3 py-4 m-0 text-white">
              {t("create-new-ticket")}
            </h2>
          </div>
          <div className="p-4">
            <h2 className="">{t("create-new-ticket")}</h2>
            <p className="text-black">{t("create-new-ticket-p")}</p>
            <button
              className=" btn btn-light custfontbtn btncolor white-c d-flex justify-content-center align-items-center gap-2"
              onClick={create_ticket}
            >
              <Techcard />
              {t("create-new-ticket-button")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
