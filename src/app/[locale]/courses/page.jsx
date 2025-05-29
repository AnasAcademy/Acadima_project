import React from "react";
import { useTranslations } from "next-intl";
import Regproaca from "@/components/regproaca/Regproaca";
import CoursesTable from "@/components/CoursesTable/CoursesTable";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";



export default function Courses() {
  const t = useTranslations("RegisteredProgramss");
  const ts = useTranslations("CourseSchedule");

  const regInfo = [
    {
      courseType: t("courseType"),
      courseNAm: t("courseName"),
      progress: "80%",
    },
    {
      courseType: t("courseType"),
      courseNAm: t("courseName"),
      progress: "30%",
    },
    
  ];

  const tabHeaders = [
    ts("courseNumber"),
    ts("courseName"),
    ts("startDate"),
    ts("numberOfTasks"),
    ts("numSubmission"),
    ts("actions"),
  ];


  const tabCourses = [
    {
      flagColor: "green",
      data: [
        ts("td.courseNum"),
        ts("td.courseNam"),
        ts("td.startDate"),
        ts("td.numTasks"),
        ts("td.numSubmission"),
        ts("td.lec"),
      ],
    },
    {
      flagColor: "green",
      data: [
        ts("td.courseNum"),
        ts("td.courseNam"),
        ts("td.startDate"),
        ts("td.numTasks"),
        ts("td.numSubmission"),
        ts("td.lec"),
      ],
    },
    {
      flagColor: "red",
      data: [
        ts("td.courseNum"),
        ts("td.courseNam"),
        ts("td.startDate"),
        ts("td.numTasks"),
        ts("td.numSubmission"),
        ts("td.lec"),
      ],
    },
  ];
  return (
    <>
    
        <div className="  container-fluid p-3  mt-5 w-100 ">
          <div>
            <h2 className="hvvv">{t("title")}</h2>
            <div className=" row g-3 mt-4">
              <Regproaca data={regInfo} />
            </div>
          </div>
        </div>
     
    </>
  );
}
