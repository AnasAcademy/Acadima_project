import React from "react";
import { useTranslations } from "next-intl";
import Regproaca from "@/components/regproaca/Regproaca";
import CoursesTable from "@/components/CoursesTable/CoursesTable";

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
    {
      courseType: t("courseType"),
      courseNAm: t("courseName"),
      progress: "100%",
    },
    {
      courseType: t("courseType"),
      courseNAm: t("courseName"),
      progress: "20%",
    },
  ];
  
  const tabHeaders = [ts('courseNumber'), ts('courseName'), ts('startDate'), ts('numberOfTasks'), ts('numSubmission'), ts('actions') ]
  const tabCourses = [[ts("td.courseNum"), ts('td.courseNam'), ts('td.startDate'), ts('td.numTasks'), ts('td.numSubmission'), ts('td.lec') ],
    [ts('td.courseNum'), ts('td.courseNam'), ts('td.startDate'), ts('td.numTasks'), ts('td.numSubmission'), ts('td.lec')],
    [ts('td.courseNum'), ts('td.courseNam'), ts('td.startDate'), ts('td.numTasks'), ts('td.numSubmission'),  ts('td.lec')]
  ]

 
     
  return <>
  
  
  <div className='container p-3  mt-5 '>
  <div>
        <h2 className='hvvv'>{t('title')}</h2>
            <div className=' row g-3 mt-4'>
                {  regInfo.map(function(reg , key){
                  return <div  key={key} className=' d-flex flex-column gap-3 col-sm-12 col-xl-6'>
                    <Regproaca cousretyp={reg.courseType} coursenam={reg.courseNAm} progress={reg.progress} />
                  </div>
                })              
               }
            </div>   
        </div>

        <div className=' mt-5'>             
        <h2 className=' hvvv'> {ts('title')}</h2>
        <h3> {ts('programDuration')}</h3>
        <CoursesTable 
        headers={tabHeaders} 
        courses={tabCourses} 
        btn={ts('dwnldLectable')} join={ts('join')} reg={ts('register')} lec={ts('td.lec')}/>
        </div>  
        </div>


    </>
}
