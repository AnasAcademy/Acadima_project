 import React from 'react'
 import Atch from "@/assets/lessons/Ellipse 22.svg";
import { useTranslations } from "next-intl";
import Line from "@/assets/Sidebar icons/Line 57.svg";

  import Image from "next/image";

 export default function WatchLessons({title}) {

    
      const t = useTranslations();
      const info = t.raw("lessons");
   return (
     <>
       <div className="d-flex justify-content-between flex-column  cardbg vh-100 ">
         <div className=" mt-3 m-5">
           <h2 className=" mt-4"> {info.section_title}</h2>
           <div className="  mt-5 d-flex justify-content-center ">
             <div className="video-container w-100">
               <iframe
                     className=' w-100'
                 src="https://youtu.be/GEAA4duLQcs?si=Dud55MBDYGTqcoQU"
                 title="YouTube video player"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               ></iframe>
             </div>
           </div>
         </div>

         <div>
           <Line className=" w-100" />
         </div>

         <div className="mt-3 m-5  ">
           <h2 className=" mt-2"> {info.additional_content}</h2>
           <h4 className=" mt-3 custcalendarti"> {info.lecture_title}</h4>

           <p className=" hv ">{info.note_text}</p>

           <h4 className=" mt-3 custcalendarti"> {info.attachments}</h4>
           <div className=" d-flex mt-3 align-items-center gap-2">
             <div className=" circbgg  rounded-circle m-1 p-1 ">
               <Atch className="iconSize1 " />
             </div>
             <p className=" hv ">{info.file_name}</p>
           </div>
         </div>
       </div>
     </>
   );
 }
 