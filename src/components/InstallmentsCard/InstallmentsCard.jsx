import Image from "next/image";
import React from "react";
import Money from "@/assets/payments icons/money.svg";
import Ring from "@/assets/payments icons/Ring-chart.svg";
import CoursesTable from "@/components/CoursesTable/CoursesTable";
import InstallSmallCard from "@/components/InstallSmallCard/InstallSmallCard";


import { useTranslations } from "next-intl";

export default function InstallmentsCard({ info }) {
  const tabHeaders = info.table.headers;
  const tabCourses = info.table.rows;



 const ts = useTranslations("CourseSchedule");



  const tabCourses1 = [
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
      <div className="w-100">
        <div className="row d-flex gy-4">
          <div className=" d-flex  flex-column gap-4 col-xl-9 col-lg-9  col-sm-12">
            <div className="cardbg p-4 rounded-4 shadow-sm      d-flex  flex-xl-row flex-lg-row  gap-4   flex-sm-column flex-column   justify-content-between align-items-center align-items-md-start">
              <div className=" d-flex gap-4 ">
                <div>
                  <div>
                    <div className="d-flex   flex-column  mb-2 gap-2">
                      <h4 className="htitle ">{info.program_details.name}</h4>
                      <h4 className="ftnote">
                        {info.program_details.reg_date}
                      </h4>
                      <h4 className="ftnote">{info.program_details.status}</h4>
                    </div>
                    <div className=" d-flex gap-2 mt-5">
                      <Money className=" iconSize1" />
                      <p className="custsubtitle3">
                        {info.program_details.install_dtls_titl}
                      </p>
                    </div>
                    <div className=" d-flex flex-xl-row flex-lg-row flex-sm-column flex-column gap-3">
                      <h4 className="ftnote">{info.program_details.fee}</h4>
                      <h4 className="ftnote">
                        {info.program_details.installment_info}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="  d-flex  position-relative flex-column gap-2">
                <div className="centered-absolute   justify-content-center flex-column  align-items-center d-xl-flex d-lg-flex d-sm-none  d-none ">
                  <h4 className="  ">{info.summary.amount_paid}</h4>
                  <h2 className="  ">{info.summary.paid}</h2>
                  <h4 className="  text-nowrap ">{info.summary.note}</h4>
                </div>
                <div className="d-xl-flex d-lg-flex d-sm-none  d-none">
                  <Ring className="ringSize" />
                </div>
              </div>
            </div>
          </div>

          <div className=" col-12  mt-5">
            <h4 className="hvvv ">{info.table.title}</h4>
            <div className="d-xl-flex d-lg-flex d-sm-none  d-none">
              <CoursesTable headers={tabHeaders} courses={tabCourses1} />
            </div>
          </div>

          <div className="d-xl-none d-lg-none d-sm-flex  d-flex col-12">
            <InstallSmallCard headers={tabHeaders} courses={tabCourses} />
          </div>
        </div>
      </div>
    </>
  );
}
