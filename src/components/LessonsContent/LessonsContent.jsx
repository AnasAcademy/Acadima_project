  'use client'
  
  import React , { useState} from 'react'
  import Line from "@/assets/Sidebar icons/Line 57.svg";

  import Con from "@/assets/lessons/Layer_1.svg";
  import Exm from "@/assets/lessons/exam.svg";
  import Arrow from "@/assets/lessons/arrowdown.svg";
  import Up from '@/assets/lessons/up.svg'
  import { useTranslations } from "next-intl";
import WatchLessons from "@/components/WatchLessons/WatchLessons";
import ExamComp from '@/components/ExamsComp/ExamsComp'
import Homework from "@/components/Homework/Homework"


  export default function LessonsContent() {

     const [ actv , setActv ] = useState(false)

  const t = useTranslations();
  const info = t.raw("lessons");


   const [title , setTitle] =  useState("watchlessons");
   
   function toggle(){

      if(actv){
         setActv(!actv);
      }else{

           setActv(!actv);
      }
       

   }

      function changetitle(tit){

                if (tit === "watchlessons") {
                  setTitle("watchlessons");
                } else if (tit === "exm") {
                  setTitle("examcomp");
                }
                else{


                           setTitle("homework");
                }

        
      }
    

      const components = {
        watchlessons: <WatchLessons />,
        examcomp: <ExamComp  />,
        homework: <Homework />
      };



    return (
      <>
        <div className=" row  m-3  g-4  ">
          <div className=" col-12 col-lg-8   ">
            <div>{components[title]}</div>
          </div>

          <div className=" col-12 col-lg-4    cardbg  ">
            <div className=" ">
              <div className=" d-flex m-5 justify-content-around mb-2">
                <div
                  className=" d-flex gap-2 cursor-pointer"
                  onClick={() => {
                    changetitle("watchlessons");
                  }}
                >
                  <Con className=" iconSize1" />
                  <h3 className="custcalendar"> {info.content}</h3>
                </div>
                <div
                  className=" d-flex gap-2 cursor-pointer"
                  onClick={() => {
                    changetitle("exm");
                  }}
                >
                  <Exm className=" iconSize1" />
                  <h3 className="custcalendar text-light"> {info.exams}</h3>
                </div>
              </div>
              <div>
                <Line className=" w-100" />
              </div>

              <div>
                <div>
                  <div className=" d-flex gap-2   align-items-center justify-content-between m-4 prevcard p-2  pe-3 ps-3 rounded-3 flex-column">
                    {title === "watchlessons" ? (
                      <>
                        <div className=" d-flex  justify-content-between  align-items-center  w-100  ">
                          <div className=" d-flex align-items-center  gap-2 ">
                            <div className="circbg  rounded-circle m-1 p-3 ">
                              <Con className=" iconSize1 " />
                            </div>
                            <div>
                              <h3 className="custcalendarti">
                                {" "}
                                {info.lecture_title}
                              </h3>
                              <h3 className="hv"> {info.lecture_count}</h3>
                            </div>
                          </div>

                          <div className=" cursor-pointer" onClick={toggle}>
                            {actv ? <Up /> : <Arrow />}
                          </div>
                        </div>

                        {actv && (
                          <div>
                            <p className=" text-light m-3">
                              هنا نص عشوائي يُستخدم لملء الفراغات في التصميم.
                              هذا النص لا يحمل معنى محدد بل يُستخدم لأغراض العرض
                              فقط. يمكنك استخدامه لتجربة توزيع النصوص وتنسيقها
                              في التصميم. النص يتكرر هنا بدون محتوى فعلي لإظهار
                              الشكل النهائي للصفحة.
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div
                         className=' cursor-pointer'
                          onClick={() => {
                            changetitle("homework");
                          }}
                        >
                          <div className=" d-flex align-items-center  gap-2 ">
                            <div className="circbg  rounded-circle m-1 p-3 ">
                              <Con className=" iconSize1 " />
                            </div>
                            <div>
                              <h3 className="custcalendarti">
                                {" "}
                                {info.lecture_title}
                              </h3>
                              <h3 className="hv"> {info.lecture_count}</h3>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  