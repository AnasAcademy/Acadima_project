import React from "react";
import { useTranslations } from "next-intl";
import Regproaca from "@/components/regproaca/Regproaca";



 export default function PurchaseCourses() {
const t = useTranslations("RegisteredProgramss");
  const ts = useTranslations("CourseSchedule");

  const regInfo = [
    {
      courseId:"1",
      courseType: t("courseType"),
      courseNAm: "courseone",
      progress: "80%",
    },
    {
      courseId:"2",
      courseType: t("courseType"),
      courseNAm: "coursetwo",
      progress: "30%",
    },
    {
      courseId:"3",
      courseType: t("courseType"),
      courseNAm: "coursethree",
      progress: "100%",
    },
    {
      courseId:"4",
      courseType: t("courseType"),
      courseNAm: "coursefour",
      progress: "20%",
    },
  ];

 

  return (
    <>
      <div className="container p-3  mt-5 ">
        <div>
          <h2 className="hvvv">{t("title")}</h2>
          <div className=" row g-3 mt-4">
           
                  <Regproaca
                    data={regInfo}
               
                  />
              
          </div>
        </div>

      
      </div>
    </>
  );
}
