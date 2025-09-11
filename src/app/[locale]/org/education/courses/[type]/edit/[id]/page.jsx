'use client'
import { notFound } from "next/navigation";
import React, { useEffect } from 'react'
 import Editform from "@/components/Editform/Editform";
import { useTranslations } from "next-intl";
 export default function Editpage({ params }) {

  const t = useTranslations("tables");

 const { type, id } = params;

   useEffect(() => {
     // This will run only on the client side
     console.log(id);
   }, []);

    const allowedTypes = ["course", "webinar", "workshop", "training"];
    if (!allowedTypes.includes(type)) {
      return notFound();
    }

   return (
     <>
       <div className="row g-3">
         {/* 1) Webinar edit form view (exclusive) */}
         <div className="col-12">
           <div className="rounded-4 shadow-sm p-4 container-fluid cardbg min-train-ht">
             <button
               type="button"
               className="btn custfontbtn mb-3"
               onClick={() => setShowWebinarEditForm(false)}
    
             >
               {t("back")}
             </button>
             <Editform
               fields={webinarFields}
               data={editData}
               formTitles={webinarFormTitles}
               handleSubmitEdit={handleSubmitWebinarEdit}
               setShowModal={() => setShowWebinarEditForm(false)}
               formState="edit"
               loading={webinarEditLoading}
             />
           </div>
         </div>
       </div>
     </>
   );
 }
 