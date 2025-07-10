"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import logo from "../../../assets/admin/logo2.png";
import Home from "../../../assets/admin/home.svg";
import Stat from "../../../assets/admin/stat.svg";
import Card from "../../../assets/admin/card.svg";
import Notif from "../../../assets/admin/notif.svg";
import Option from "../../../assets/admin/option.svg";

import Ai from "../../../assets/admin/ai.svg";
import HelpIcon from "../../../assets/admin/helpIcon.svg";
import Setting from "../../../assets/admin/setting.svg";
import bk from "../../../assets/admin/Background.png";
import pwr from "@/assets/Sidebar icons/powered.png";
import Employpro from "@/assets/admin/employpro.svg"
import Allstudent from "@/assets/admin/allstudent.svg"
import Quiz from "@/assets/admin/quiz.svg"
import Studentper from "@/assets/admin/studentper.svg"
import Electric from "@/assets/admin/elctric.svg"
import Classes from "@/assets/admin/classes.svg"
import StudentCode from "@/assets/admin/studentcode.svg"
import Instruc from "@/assets/admin/instruc.svg"
import Cat from "@/assets/admin/category.svg"
import CreateAcc from "@/assets/admin/createacc.svg"
import Seat from "@/assets/admin/seatreserv.svg"
import Direct from "@/assets/admin/direct.svg"
import Scholarship from "@/assets/admin/scholarship.svg"
import History from "@/assets/admin/history.svg"
import Exam from "@/assets/admin/exam.svg"
import Homework from "@/assets/admin/homework.svg"
import Courses from "@/assets/admin/courses.svg"
import Dot from "@/assets/admin/dot.svg"
import AdmissionIcon from "@/assets/Sidebar icons/admission.svg";
import ObjectIcon from "@/assets/settings/OBJECTS.svg";
import ClassesIcon from "@/assets/Sidebar icons/classes.svg";
import Profile from "@/assets/admin/profile.svg";

import { usePathname } from "next/navigation";

export default function NewSideBar() {
  const [actv, setActv] = useState(false);

  const t = useTranslations("SidebarA");
  const pathname = usePathname();
  const isPanel = pathname.includes("/org/panel");
  const isEmployeeprogress = pathname.includes("/org/employeeprogress");
  const isTechSupport = pathname.includes("/org/techsupport");
  const isOrgprofile = pathname.includes("/org/orgprofile");
  const isAiAssistant = pathname.includes("/org/ai-assistant");
  const isSettings = pathname.includes("/org/settings");
  const isAdminssion = pathname.includes("/org/admission/");
  const iSenrollment = pathname.includes("/org/enrollment/");
  const isBundlesStats = pathname.includes(
    "/org/education/programs-statistics/bundles"
  );
  const isWebinarsStats = pathname.includes(
    "/org/education/programs-statistics/webinars"
  );
  const education = pathname.includes("/org/education");
  const isQuizzes = pathname.includes("/org/education/quizzes");
  const isAssignments = pathname.includes("/org/education/assignments");
  const isCourses = pathname.includes("/org/education/courses");
  const isCoursesRegistration = pathname.includes(
    "/org/education/course-registration"
  );
  const isBundles = pathname.includes("/org/education/bundles");
  const iSenrollmentHis = pathname.includes("/org/enrollment/history");
  const iSenrollmentAddClass = pathname.includes(
    "/org/enrollment/add-student-to-class"
  );

  const isAdmissionReq = pathname.includes(
    "/org/admission/admission-requirements"
  );
  const isStudentPermission = pathname.includes(
    "/org/admission/student-permission"
  );
  const studentsRecords = pathname.includes(
    "/org/students-records"
  );
  const isAllStudents = pathname.includes("/org/students-records/all-students");
  const isCreateAccount = pathname.includes(
    "/org/students-records/create-account"
  );
  const isSeatReservation = pathname.includes(
    "/org/students-records/seat-reservations"
  );
  const isProgramRegistration = pathname.includes(
    "/org/students-records/program-registration"
  );
  const isDirectRegistration = pathname.includes(
    "/org/students-records/direct-registration"
  );
  const isScholarshipRegistration = pathname.includes(
    "/org/students-records/scholarship-registration"
  );
  const isElectronicServices = pathname.includes(
    "/org/admission/electronic-services"
  );
  const isClasses = pathname.includes("/org/admission/classes");
  const isStudentsCodes = pathname.includes("/org/admission/students-codes");
  const isInstructorCodes = pathname.includes(
    "/org/admission/instructor-codes"
  );
  const isCategories = pathname.includes("/org/admission/categories");
  const isSubscriptionmanagement = pathname.includes(
    "/org/subscription-management"
  );
  const isNotfiPage = pathname.includes("/org/notifications");
  const admission = [
    {
      icon: Dot,
      tit: "admission-requirements",
      href: "/org/admission/admission-requirements",
      bg: isAdmissionReq,
    },
    {
      icon: Dot,
      tit: "student-permission",
      href: "/org/admission/student-permission",
      bg: isStudentPermission,
    },
    {
      icon: Dot,
      tit: "electronic-services",
      href: "/org/admission/electronic-services",
      bg: isElectronicServices,
    },
    {
      icon: Dot,
      tit: "classes",
      href: "/org/admission/classes",
      bg: isClasses,
    },
    {
      icon: Dot,
      tit: "student-codes",
      href: "/org/admission/students-codes",
      bg: isStudentsCodes,
    },
    {
      icon: Dot,
      tit: "instructor-codes",
      href: "/org/admission/instructor-codes",
      bg: isInstructorCodes,
    },
    {
      icon: Dot,
      tit: "categories",
      href: "/org/admission/categories",
      bg: isCategories,
    },
  ];

  const isRegistered = [
    {
      icon: Dot,
      tit: "all-students",
      href: "/org/students-records/all-students",
      bg: isAllStudents,
    },
    {
      icon: Dot,
      tit: "create-account-form",
      href: "/org/students-records/create-account",
      bg: isCreateAccount,
    },
    {
      icon: Dot,
      tit: "seat-reservation-form",
      href: "/org/students-records/seat-reservations",
      bg: isSeatReservation,
    },
    {
      icon: Dot,
      tit: "direct-registration",
      href: "/org/students-records/direct-registration",
      bg: isDirectRegistration,
    },
    {
      icon: Dot,
      tit: "scholarship-registration",
      href: "/org/students-records/scholarship-registration",
      bg: isScholarshipRegistration,
    },
  ];
  const enrollment = [
    {
      icon: Dot,
      tit: "enrollment-history",
      href: "/org/enrollment/history",
      bg: iSenrollmentHis,
    },
    {
      icon: Dot,
      tit: "add-student-to-class",
      href: "/org/enrollment/add-student-to-class",
      bg: iSenrollmentAddClass,
    },
  ];

  const edu = [
    {
      icon: Dot,
      tit: "quizzes",
      href: "/org/education/quizzes",
      bg: isQuizzes,
    },
    {
      icon: Dot,
      tit: "assignments",
      href: "/org/education/assignments",
      bg: isAssignments,
    },
    {
      icon: Dot,
      tit: "courses",
      href: "/org/education/assignments",
      bg: isAssignments,
    },
    {
      icon: Dot,
      tit: "courses-registration",
      href: "/org/education/assignments",
      bg: isAssignments,
    },
    {
      icon: Dot,
      tit: "bundles",
      href: "/org/education/assignments",
      bg: isAssignments,
    },
  ];

  const proreg = [
    {
      icon: Dot,
      tit: "bundles",
      href: "/org/education/programs-statistics/bundles",
      bg: isBundlesStats,
    },
    {
      icon: Dot,
      tit: "webinars",
      href: "/org/education/programs-statistics/webinars",
      bg: isWebinarsStats,
    },
  ];
  const finan = [
    {
      icon: Dot,
      tit: "balances",
      href: "/org/financial/balances",
      bg: isBundlesStats,
    },
    {
      icon: Dot,
      tit: "sales-list",
      href: "/org/financial/sales-list",
      bg: isWebinarsStats,
    },
    {
      icon: Dot,
      tit: "offline-payments",
      href: "/org/financial/sales-list",
      bg: isWebinarsStats,
    },
    {
      icon: Dot,
      tit: "installments",
      href: "/org/financial/sales-list",
      bg: isWebinarsStats,
    },
    {
      icon: Dot,
      tit: "discount-codes",
      href: "/org/financial/sales-list",
      bg: isWebinarsStats,
    },
  ];



  const [tit, setTit] = useState([]);
  const comp = {
    isAdmission: (
      <>
        <Link
          className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
          aria-current="page"
        >
          {t("admission")}
        </Link>

        <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   p-4  pt-1    ">
          {admission.map((item, index) => {
            return (
              <li
                className={`nav-item d-flex     w-100  align-items-center  ${
                  item.bg ? " bg-dark-subtle rounded-3" : ""
                }  `}
                title={t("dashboard")}
              >
                <item.icon className={`iconSize2 iconcolor `} />
                <Link
                  className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                  href={item.href}
                >
                  {t(item.tit)}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    ),
    isRegistered: (
      <>
        <Link
          className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
          aria-current="page"
        >
          {t("registrations")}
        </Link>

        <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   p-4  pt-1    ">
          {isRegistered.map((item, index) => {
            return (
              <li
                className={`nav-item d-flex     w-100  align-items-center  ${
                  item.bg ? " bg-dark-subtle rounded-3" : ""
                }   `}
              >
                <item.icon className={`iconSize2 iconcolor `} />
                <Link
                  className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                  href={item.href}
                >
                  {t(item.tit)}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    ),
    isenrollment: (
      <>
        <Link
          className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
          aria-current="page"
        >
          {t("enrollment")}
        </Link>
        <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   p-4  pt-1    ">
          {enrollment.map((item, index) => {
            return (
              <li
                className={`nav-item d-flex    w-100  align-items-center   ${
                  item.bg ? " bg-dark-subtle rounded-3" : ""
                }   `}
              >
                <item.icon className={`iconSize2 iconcolor `} />
                <Link
                  className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                  href={item.href}
                >
                  {t(item.tit)}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    ),
    isEdu: (
      <>
        <Link
          className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
          aria-current="page"
        >
          {t("education")}
        </Link>
        <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   p-4  pt-1    ">
          {edu.map((item, index) => {
            return (
              <li
                className={`nav-item d-flex    w-100  align-items-center   ${
                  item.bg ? " bg-dark-subtle rounded-3" : ""
                }   `}
              >
                <item.icon className={`iconSize2 iconcolor `} />
                <Link
                  className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                  href={item.href}
                >
                  {t(item.tit)}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    ),

    isprogramreg: (
      <>
        <Link
          className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
          aria-current="page"
        >
          {t("programs-statistics")}
        </Link>
        <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   p-4  pt-1    ">
          {proreg.map((item, index) => {
            return (
              <li
                className={`nav-item d-flex    w-100  align-items-center   ${
                  item.bg ? " bg-dark-subtle rounded-3" : ""
                }   `}
              >
                <item.icon className={`iconSize2 iconcolor `} />
                <Link
                  className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                  href={item.href}
                >
                  {t(item.tit)}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    ),
    isFinancial: (
      <>
        <Link
          className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
          aria-current="page"
        >
          {t("financial")}
        </Link>
        <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   p-4  pt-1    ">
          {finan.map((item, index) => {
            return (
              <li
                className={`nav-item d-flex    w-100  align-items-center   ${
                  item.bg ? " bg-dark-subtle rounded-3" : ""
                }   `}
              >
                <item.icon className={`iconSize2 iconcolor `} />
                <Link
                  className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                  href={item.href}
                >
                  {t(item.tit)}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    ),
  };

  function setactvv(loc) {
    setActv(!actv);

    setTit(loc);
  }

  return (
    <>
      <div className=" d-flex flex-column ">
        <div className="  p-3   d-flex flex-column  pt-4   ">
          <div className=" pe-3  ">
            <Link
              className="text-white text-decoration-none  m-lg-auto  d-flex   "
              role="button"
              href="/"
            >
              <Image src={logo} alt="ai" width={120} height={32} priority />
            </Link>
          </div>
          <div className=" d-flex  mt-md-4   justify-content-center  ">
            <nav className="navbar navbar-light navbar-expand-lg  p-0     ">
              <div className=" d-flex flex-sm-row flex-lg-column flex-row flex-md-row flex-xl-column min-vh-lg-100   align-items-start p-0   ">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse  mt-5  btncolor     h-auto "
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start      ">
                    <li
                      className={`nav-item d-flex  p-2   w-100  align-items-center   `}
                      title={t("dashboard")}
                    >
                      <Link
                        href="/org/panel"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Home
                          className={`iconSize2     ${
                            isPanel ? "iconcolor" : "iconcolor2"
                          } `}
                        />
                      </Link>
                    </li>

                    <li
                      className={`nav-item d-flex   p-2  w-100  align-items-center     `}
                    >
                      <Link
                        href="/org/employeeprogress"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Stat
                          className={`iconSize2   ${
                            isEmployeeprogress ? "iconcolor" : "iconcolor2"
                          } `}
                        />
                      </Link>
                    </li>

                    <li
                      className={`nav-item d-flex  p-2   w-100  align-items-center   `}
                    >
                      <Link
                        href="/org/subscription-management"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Card
                          className={`iconSize2    ${
                            isSubscriptionmanagement
                              ? "iconcolor"
                              : "iconcolor2"
                          }  `}
                        />
                      </Link>
                    </li>
                    <li
                      className={`nav-item d-flex  p-2   w-100  align-items-center   `}
                    >
                      <Link
                        href="/org/notifications"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Notif
                          className={`iconSize2   ${
                            isNotfiPage ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                    </li>
                    <li
                      className={`nav-item d-flex  p-2   w-100  align-items-center `}
                    >
                      <Link
                        href="/org/techsupport"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Option
                          className={`iconSize2    ${
                            isTechSupport ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                    </li>

                    <li
                      className={`nav-item d-flex  p-2   w-100  align-items-center     `}
                      onClick={() => {
                        setactvv("isAdmission");
                      }}
                    >
                      <Link href="/org/admission/admission-requirements">
                        <AdmissionIcon
                          className={`iconSize2    ${
                            isAdminssion ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                    </li>

                    <li
                      className={`nav-item d-flex  p-2   w-100  align-items-center     `}
                      onClick={() => {
                        setactvv("isRegistered");
                      }}
                    >
                      <Link href="/org/students-records/all-students">
                        <ClassesIcon
                          className={`iconSize2   ${
                            studentsRecords ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                    </li>
                    <li
                      className={`nav-item d-flex  p-2   w-100  align-items-center      `}
                      onClick={() => {
                        setactvv("isenrollment");
                      }}
                    >
                      {/* 
                      fgafhfdh */}
                      <Link href="/org/enrollment/history">
                        <Profile
                          className={`iconSize2    ${
                            iSenrollment ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                    </li>
                    <li
                      className={`nav-item d-flex  p-2   w-100  align-items-center   `}
                      onClick={() => {
                        setactvv("isEdu");
                      }}
                    >
                      <Link href="/org/education/quizzes">
                        <Quiz
                          className={`iconSize2    ${
                            education ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                    </li>

                    <li
                      className={`nav-item d-flex  p-2   w-100  align-items-center   `}
                      onClick={() => {
                        setactvv("isprogramreg");
                      }}
                    >
                      <Link href="/org/education/programs-statistics/bundles">
                        <Quiz
                          className={`iconSize2    ${
                            education ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                    </li>

                    <li
                      className={`nav-item d-flex  p-2   w-100  align-items-center     `}
                      onClick={() => {
                        setactvv("isFinancial");
                      }}
                    >
                      <Link href="/org/financial/balances">
                        <AdmissionIcon
                          className={`iconSize2    ${
                            isAdminssion ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                    </li>

                    <li
                      className={`nav-item d-flex  p-2   w-100  align-items-center   `}
                    >
                      <Link
                        href="/org/orgprofile"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Profile
                          className={`iconSize2     ${
                            isOrgprofile ? "iconcolor" : "iconcolor2"
                          } `}
                        />
                      </Link>
                    </li>

                    <li
                      className={`nav-item d-flex   p-2  w-100  align-items-center     `}
                    >
                      <Link
                        href="/org/ai-assistant"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Ai
                          className={`iconSize2   ${
                            isAiAssistant ? "iconcolor" : "iconcolor2"
                          } `}
                        />
                      </Link>
                    </li>

                    <li
                      className={`nav-item d-flex  p-2   w-100  align-items-center   `}
                    >
                      <Link
                        href="/org/settings"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Setting
                          className={`iconSize2    ${
                            isSettings ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className=" bg-white  d-flex  flex-column mt-5  ">
              <div> {actv && comp[tit]}</div>
            </div>
          </div>
        </div>
        {/* 
                <div>
                  <div className="bg-container m-4 d-lg-flex d-sm-none d-none   position-relative ">
                    <div className="d-flex  flex-column  position-absolute  gap-1  p-3 ">
                      <HelpIcon className="iconSize2 iconcolor" />
                      <h4 className="Tit-14-700 white-c  mb-0">{t("ad1")}</h4>
                      <h6 className="tit-12-400 white-c ">{t("ad2")}</h6>
                      <button className="btn btn-light tit-10-700  Gray-Gray-700 btn-custom ">
                        {t("ad3")}
                      </button>
                    </div>

                    <div className="   ">
                      <Image src={bk} alt="ai" width={250} height={169.5} />
                    </div>
                  </div>

                  <div className="powered d-flex justify-content-center gap-1  mt-2  ">
                    <p>Powered By</p>
                    <Image
                      src={logo}
                      alt="ai"
                      width={60}
                      height={18}
                      priority
                      className=" mt-1"
                    />
                  </div>
                </div> */}
      </div>
    </>
  );
}
