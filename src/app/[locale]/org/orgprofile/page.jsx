 import React from 'react'
 import Backprofile from "@/assets/admin/Backprofile.svg";
 import Rec from '@/assets/admin/Rectangle41.svg'
 import Logo from '@/assets/admin/73763.svg'
import LatestTrain from '@/components/AdminComp/latestTrain/LatestTrain';
import TechFilter from '@/components/TechFilter/TechFilter';

 export default function OrgProfile() {


  


   return (
     <>
       <div className=" w-100 position-relative  ">
         <div className=" btncolor w-100 p-4 ">
           <h5 className=" Tit-14-700 text-white">الملف الشخصي للمنشئة</h5>

           <h2 className=" tit-18-700 text-white p-4"> شركة lxera </h2>
         </div>

         <div className=" recstyle w-100"></div>
       </div>

       <div className="  m-0  container-fluid p-0 d-flex flex-column    ">
         <div className=" p-lg-4  pt-0">
           <div className=" row m-0  p-2 g-3 ">
             <h2 className=" hvvv p-4 pb-0"> </h2>
             <div className="col-lg-8 col-xl-4  position-relative rounded-3 shadow-sm    container-fluid  p-5 cardbg min-train-ht">
               <div>
                 <Logo className=" iconSize4" />

                 <p>
                   شركة الرؤية المستقبلية للتقنيات هي إحدى الشركات السعودية
                   الرائدة في مجال التحول الرقمي، وتسعى إلى تمكين كوادرها من
                   خلال برامج تدريبية متخصصة تهدف إلى رفع الكفاءة وتعزيز
                   الإنتاجية داخل بيئة العمل.
                 </p>

                 <h5>اسم المنشأة: شركة الرؤية المستقبلية للتقنيات</h5>
                 <h5> المجال: تقنية معلومات</h5>
                 <h5>عدد الموظفين: 125 موظف</h5>
                 <h5>المدينة: الرياض، السعودية</h5>
                 <h5>خطة الاشتراك: باقة الشركات المتقدمة</h5>
                 <h5>تاريخ التسجيل: 12 فبراير 2024</h5>
                 <h5>تاريخ إنتهاء الإشتراك : 12 فبراير 2025</h5>
               </div>
             </div>

             <div className="  col-lg-8 col-xl-4  d-flex  gap-3 ">
               <LatestTrain />
             </div>

             <div className=" col-lg-7  col-xl-7    ">
      
                   <TechFilter />


             </div>

             <div className="col-lg-8   "></div>
             <div className="col-lg-4 "></div>
           </div>
         </div>
       </div>
     </>
   );

 }
 