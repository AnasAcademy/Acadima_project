 "use client";
 import React, { useContext, useEffect, useState } from "react";
 import Image from "next/image";
 import Circle from "@/assets/notifCard/Ellipse 26.svg";
 import AdminPrevCard from "@/components/AdminPrevCard/AdminPrevCard";
 import { NotificationContext } from "@/context/NotificationContext";
 import Filterr from "@/assets/admin/filterr.svg";
 import Search from "@/assets/admin/search.svg";
 import { useTranslations } from "next-intl";
 export default function AdminNotifi() {

  const { info, key, setKey , flag , setFlag} = useContext(NotificationContext);
  const [show, setShow] = useState("");
  const [index, setIndex] = useState(null);
  const [MsgData, setmsgData] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const t = useTranslations("adminNotfi");
//false --->  green 

  function showMessage(key) {

    setShow("show");
    setmsgData(info[key].body);
    setTitle(info[key].title);
    setDate(info[key].date);
   

    if (index === key) {

      setIndex(null);

    } else {

      setIndex(key);
      setmsgData(info[key].body);
      setTitle(info[key].title);
      setDate(info[key].date);
      setFlag((prevFlags) => {
        const newFlags = [...prevFlags];
        newFlags[key] = "true"; 
        return newFlags;
      });
       
    }
  }

  useEffect(() => {


    console.log(key);
    console.log(flag);
    

      setFlag(flag);


    if (key !== null  ) {
      setShow("show");
      setmsgData(info[key].body);
      setTitle(info[key].title);
      setDate(info[key].date);
      setFlag((prevFlags) => {
        const newFlags = [...prevFlags];
        newFlags[key] = "true";
        return newFlags;
      });

    } else {
      setShow("hide");
    }

 
     
  }, [key]);

   return (
     <>
       <div className=" w-100  ">
         <div className="row d-flex gy-4">
           <div className=" col-lg-4 col-xl-3  col-sm-11 col-11 d-flex   justify-content-start align-items-center flex-column gap-4  ">
             <div className=" d-flex justify-content-around justify-content-center align-items-center gap-5   w-100   ">
               <h2 className="hvvv m-3">{info[0].tit}</h2>
               <Filterr className="iconSize1" />
             </div>

             <div className=" d-flex gap-3  rounded-5 border-1 p-1 ps-3 pe-3 justify-content-center align-items-center prevcarda">
               <h4
                 className="tit-10-700    p-2 rounded-3"
                 style={{ backgroundColor: "#E2E8F0" }}
               >
                 {" "}
                 {t("all")}
               </h4>
               <h4 className="tit-10-700"> {t("read")}</h4>
               <h4 className="tit-10-700"> {t("unread")} </h4>
             </div>

             {info.map((dat, key) => {
               return (
                 <div
                   key={key}
                   className={` " rounded-4 shadow-sm  w-100 d-flex flex-column prevcardta   p-3 min-notfi-ht ${
                     index === key ? " cardbg swap" : " cardbg "
                   }    "  `}
                 >
                   <div
                     className=" d-flex gap-1"
                     onClick={() => {
                       showMessage(key);
                     }}
                   >
                     <div className=" ">
                       <Circle
                         width={10}
                         height={10}
                         className={` ${
                           flag[key] === "true" ? "flg" : " iconcol"
                         } `}
                       />
                     </div>
                     <div className=" d-flex flex-column  w-100">
                       <div className=" d-flex flex-column w-100 ">
                         <div className=" d-flex flex-column gap-2 w-100">
                           <div className=" d-flex justify-content-between g-4 w-100 ">
                             <h4
                               className={`custsubtitle3 p-0 m-0 ${
                                 index === key ? " swap" : "  "
                               }  `}
                             >
                               {dat.title}
                             </h4>

                             <p
                               className={`ft p-0 m-0  ${
                                 index === key ? " swap" : "  "
                               } `}
                             >
                               ١٧:١٢
                             </p>
                           </div>
                           <p className={`ft p-0 m-0  namcolr `}>
                             {t("senderName")}
                           </p>
                         </div>
                         <p
                           className={`ft d-xl-flex     mt-3 d-sm-none d-none ${
                             index === key ? " swap" : "  "
                           }`}
                         >
                           {dat.body}
                         </p>
                         {index === key ? (
                           <p className=" d-xl-none d-lg-none d-sm-flex d-flex">
                             <div className=" h6v  message mt-3 p-3  ">
                               {MsgData}
                             </div>
                           </p>
                         ) : (
                           ""
                         )}
                       </div>
                     </div>
                   </div>
                 </div>
               );
             })}
           </div>

           <div className=" mt-4 col-lg-8  col-xl-9 col-sm-12 col-12  prevcarda">
             <form className="form-inline my-2 my-lg-0 d-flex  p-3 prevcardta ">
               <div className="form-control mr-sm-2 w-50  d-flex gap-2  cardbg  p-2 ">
                 <Search className="iconSize" />
                 <input
                   className="tit-12-400 border-0 "
                   type="search"
                   placeholder="البحث عن اشعار ......"
                   aria-label="Search"
                 />
               </div>
             </form>
             {
               <AdminPrevCard
                 date={date}
                 title={title}
                 show={show}
                 MsgData={MsgData}
               />
             }
           </div>
         </div>
       </div>
     </>
   );
 }
 