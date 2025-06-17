 import React from 'react'
 import { useTranslations } from "next-intl";
 import Upload from "@/assets/admin/uploadd.svg";
 import Google from "@/assets/admin/google.svg";
 import Linkedin from "@/assets/admin/linkedin.svg";
 import Iphone from "@/assets/admin/iphone.svg";
 import Laptop from "@/assets/admin/laptop.svg";
 import Line from "@/assets/admin/Line18.svg";

 export default function OrgsettingAcc() {


    const t = useTranslations("adminSettings");




    
    
   return (
     <>
       <div className=" d-flex  flex-column">
         <div className="  cardbg p-4">
           <div>
             <h3 className=" tit-18-700  textcolor mb-0">
               {" "}
               {t("basic_user_info")}{" "}
             </h3>

             <Line className="w-75" />
           </div>
           <div className=" d-flex  align-items-center  gap-4 pt-2">
             <div
               className="  btncolor   rounded-circle  d-flex justify-content-center align-items-center  text-center text-white Tit-12-700 "
               style={{ width: "74px", height: "74px" }}
             >
               Upload Image
             </div>

             <div
               className=" d-flex  justify-content-center align-items-center rounded-3  px-3  gap-2   "
               style={{ border: "1px  solid  #E3E3E3" }}
             >
               <Upload className=" iconSize1   " />
               <h3 className=" Tit-14-700   mb-0  "> {t("change")}</h3>
             </div>
           </div>

           <div className=" row pt-4  g-3  ">
             <div className="col-12   col-lg-6 col-xl-3   ">
               <div>
                 <h3 className=" Tit-12-700"> {t("username")}</h3>

                 <input
                   type="text"
                   value={" خالد محمد العنزي"}
                   className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100   "
                   style={{ border: "1px  solid  #E3E3E3" }}
                 />
               </div>
             </div>

             <div className="col-12  col-lg-6 col-xl-3 ">
               <div>
                 <h3 className=" Tit-12-700"> {t("username")}</h3>

                 <input
                   type="text"
                   value={" Khaled_Mohammed@gmail.com  "}
                   className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2  Tit-14-700  w-100  "
                   style={{ border: "1px  solid  #E3E3E3" }}
                 />
               </div>
             </div>

             <div className="col-12 col-lg-6 col-xl-3   ">
               <div>
                 <h3 className=" Tit-12-700"> {t("username")}</h3>

                 <input
                   type="text"
                   value={" 55 555 5555  966+ "}
                   className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2  Tit-14-700 w-100  "
                   style={{ border: "1px  solid  #E3E3E3" }}
                 />
               </div>
             </div>
           </div>
         </div>

         <div className="  mt-4 cardbg p-4">
           <div>
             <h3 className=" tit-18-700  textcolor mb-0">
               {" "}
               {t("change_password")}{" "}
             </h3>

             <Line className="w-75" />
           </div>

           <div className=" row pt-4 g-3">
             <div className="col-12   col-lg-6 col-xl-3">
               <h3 className=" Tit-12-700"> {t("current_password")}</h3>

               <input
                 type="text"
                 value={" XXXXXXXXXX  "}
                 className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700  w-100 "
                 style={{ border: "1px  solid  #E3E3E3" }}
               />
             </div>

             <div className="col-12   col-lg-6 col-xl-3">
               <h3 className=" Tit-12-700"> {t("new_password")}</h3>

               <input
                 type="text"
                 className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2  Tit-14-700  w-100 "
                 style={{ border: "1px  solid  #E3E3E3" }}
               />
             </div>

             <div className="col-12   col-lg-6 col-xl-3">
               <h3 className=" Tit-12-700"> {t("confirm_new_password")}</h3>

               <input
                 type="text"
                 className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2  Tit-14-700 w-100  "
                 style={{ border: "1px  solid  #E3E3E3" }}
               />
             </div>
           </div>
         </div>

         <div className="  mt-4 cardbg p-4">
           <div>
             <h3 className=" tit-18-700  textcolor mb-0">
               {" "}
               {t("preferences")}{" "}
             </h3>

             <Line className="w-75" />
           </div>

           <div className=" row pt-4 g-3">
             <div className="col-12   col-lg-6 col-xl-3">
               <h3 className=" Tit-12-700"> {t("theme")}</h3>

               <input
                 type="text"
                 value={" الوضع الفاتح  "}
                 className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2 Tit-14-700 w-100  "
                 style={{ border: "1px  solid  #E3E3E3" }}
               />
             </div>

             <div className="col-12   col-lg-6 col-xl-3">
               <h3 className=" Tit-12-700"> {t("language")}</h3>

               <input
                 type="text"
                 value={" اللغة العربية  "}
                 className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2  Tit-14-700 w-100  "
                 style={{ border: "1px  solid  #E3E3E3" }}
               />
             </div>

             <div className="col-12   col-lg-6 col-xl-3">
               <h3 className=" Tit-12-700"> {t("username")}</h3>

               <input
                 type="text"
                 value={" اختر المنطقة الزمنية  "}
                 className=" d-flex  justify-content-center align-items-center rounded-3  p-2  gap-2  Tit-14-700  w-100 "
                 style={{ border: "1px  solid  #E3E3E3" }}
               />
             </div>
           </div>
         </div>

         <div className=" row">
           <div className=" col-12 col-xl-6">
             <div className="  mt-4 cardbg p-4">
               <div>
                 <h3 className=" tit-18-700  textcolor mb-0">
                   {" "}
                   {t("linked_accounts")}{" "}
                 </h3>

                 <Line className="w-100" />
               </div>

               <div className=" row pt-3  g-3 ">
                 <div className="col-12 d-flex       align-items-center     justify-content-between">
                   <div className=" d-flex gap-3  justify-content-center align-items-center ">
                     <Google className="iconSize11" />
                     <div className=" d-flex flex-column">
                       <h3 className=" Tit-14-700"> {t("google")}</h3>
                       <p className=" tit-12-400">
                         تم الربط مع: Khaled_Mohammed@gmail.com
                       </p>
                     </div>
                   </div>

                   <button className="btn btn-danger Tit-12-700 px-2  px-xl-5       text-nowrap ">
                     {" "}
                     {t("unlink")}{" "}
                   </button>
                 </div>

                 <div className="col-12 d-flex     align-items-center    justify-content-between">
                   <div className=" d-flex gap-3  justify-content-center align-items-center ">
                     <Linkedin className="iconSize11" />
                     <div className=" d-flex flex-column">
                       <h3 className=" Tit-14-700"> {t("linkedin")}</h3>
                       <p className=" tit-12-400">
                         تم الربط مع: Khaled_Mohammed@gmail.com
                       </p>
                     </div>
                   </div>

                   <button className="btn btn-danger Tit-12-700  px-2  px-xl-5 text-nowrap">
                     {" "}
                     {t("unlink")}{" "}
                   </button>
                 </div>
               </div>
             </div>
           </div>

           <div className="col-12  col-xl-6">
             <div className="  mt-4 cardbg p-4">
               <div>
                 <h3 className=" tit-18-700  textcolor mb-0">
                   {" "}
                   {t("devices")}{" "}
                 </h3>

                 <Line className="w-100" />
               </div>
               <div className=" row pt-3  g-3 ">
                 <div className="col-12 d-flex   flex-lg-column  flex-xl-row  align-items-center    justify-content-between">
                   <div className=" d-flex gap-3  justify-content-center align-items-center ">
                     <Iphone className="iconSize11" />
                     <div className=" d-flex flex-column">
                       <h3 className=" Tit-14-700"> iphon 16 pro</h3>
                       <p className=" tit-12-400">{t("last_used")}</p>
                     </div>
                   </div>

                   <button className="btn btn-light Tit-12-700  px-5">
                     {" "}
                     {t("remove_device")}{" "}
                   </button>
                 </div>

                 <div className="col-12 d-flex   flex-lg-column   flex-xl-row  align-items-center    justify-content-between">
                   <div className=" d-flex gap-3   justify-content-center align-items-center ">
                     <Laptop className="iconSize11" />
                     <div className=" d-flex flex-column">
                       <h3 className=" Tit-14-700"> laptop</h3>
                       <p className=" tit-12-400">{t("last_used")}</p>
                     </div>
                   </div>

                   <button className="btn  btn-light Tit-12-700 px-5">
                     {" "}
                     {t("remove_device")}{" "}
                   </button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </>
   );
 }
 