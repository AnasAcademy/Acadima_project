"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import logo from "../../../assets/admin/logo2.png";
import Home from "../../../assets/admin/Homdoor.svg";
import Stat from "../../../assets/admin/Reports.svg";
import Card from "../../../assets/admin/sidecard.svg";
import Notif from "../../../assets/admin/Bell.svg";
import Option from "../../../assets/admin/Settings.svg";
import SmallLogo from "@/assets/admin/Logo.svg";
import Ai from "../../../assets/admin/ai.svg";
import HelpIcon from "../../../assets/admin/helpIcon.svg";
import Setting from "../../../assets/admin/Settings.svg";
import bk from "../../../assets/admin/Background.png";
import pwr from "@/assets/Sidebar icons/powered.png";
import Employpro from "@/assets/admin/employpro.svg";
import Allstudent from "@/assets/admin/allstudent.svg";
import Quiz from "@/assets/admin/quiz.svg";
import Studentper from "@/assets/admin/studentper.svg";
import Electric from "@/assets/admin/elctric.svg";
import Classes from "@/assets/admin/classes.svg";
import StudentCode from "@/assets/admin/studentcode.svg";
import Instruc from "@/assets/admin/instruc.svg";
import Cat from "@/assets/admin/category.svg";
import CreateAcc from "@/assets/admin/createacc.svg";
import Seat from "@/assets/admin/seatreserv.svg";
import Direct from "@/assets/admin/direct.svg";
import Scholarship from "@/assets/admin/scholarship.svg";
import History from "@/assets/admin/history.svg";
import Exam from "@/assets/admin/exam.svg";
import Homework from "@/assets/admin/homework.svg";
import Courses from "@/assets/admin/courses.svg";
import Dot from "@/assets/admin/dot.svg";
import AdmissionIcon from "@/assets/admin/admission.svg";
import ObjectIcon from "@/assets/settings/OBJECTS.svg";
import ClassesIcon from "@/assets/admin/classes.svg";
import Profile from "@/assets/admin/profile.svg";
import Personal from "@/assets/admin/personal.svg";

import toggle from "@/assets/admin/sidebar-toggle.png";

import { usePathname } from "next/navigation";

export default function NewSideBar() {
  const [actv, setActv] = useState(false);

  const t = useTranslations("SidebarA");
  const pathname = usePathname();
  const isPanel = pathname.includes("/org/panel");
  const isEmployeeprogress = pathname.includes("/org/employeeprogress");
  const isTechSupport = pathname.includes("/org/techsupport");
  const isOrgprofile = pathname.includes(
    "r/org/education/programs-statistics/"
  );
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
  const education = pathname.includes("/org/education/");
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
  const studentsRecords = pathname.includes("/org/students-records");
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

  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      href: "/org/education/programs-statistics/bundlesStats",
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

  const users = [
    {
      icon: Dot,
      tit: "staff",
      href: "/org/financial/balances",
      bg: isBundlesStats,
    },
    {
      icon: Dot,
      tit: "students",
      href: "/org/financial/sales-list",
      bg: isWebinarsStats,
    },
    {
      icon: Dot,
      tit: "new-user",
      href: "/org/financial/sales-list",
      bg: isWebinarsStats,
    },
    {
      icon: Dot,
      tit: "roles",
      href: "/org/financial/sales-list",
      bg: isWebinarsStats,
    },
    {
      icon: Dot,
      tit: "groups",
      href: "/org/financial/sales-list",
      bg: isWebinarsStats,
    },
    {
      icon: Dot,
      tit: "not-access-to-content",
      href: "/org/financial/sales-list",
      bg: isWebinarsStats,
    },
  ];

  const [tit, setTit] = useState([]);
  const comp = {
    isAdmission: (
      <>
        <div className=" d-flex   flex-column h-100  newSidebarpadding ">
          <Link
            className={` nav-link  Tit-14-700 text-dark text-nowrap  p-3 `}
            aria-current="page"
          >
            {t("admission")}
          </Link>

          <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start  newsidebarr    ">
            {admission.map((item, index) => {
              return (
                <li
                  className={`nav-item d-flex w-100  align-items-center   ${
                    item.bg ? " bgNewSidebar rounded-3" : ""
                  }  `}
                  title={t("dashboard")}
                >
                  <item.icon className={`iconSize2 iconcolor `} />
                  <Link
                    className={` nav-link   tit-14-400 text-dark text-nowrap  `}
                    href={item.href}
                  >
                    {t(item.tit)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    ),
    isRegistered: (
      <>
        <div className=" d-flex   flex-column h-100  newSidebarpadding ">
          <Link
            className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
            aria-current="page"
          >
            {t("registrations")}
          </Link>

          <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start    newsidebarr   ">
            {isRegistered.map((item, index) => {
              return (
                <li
                  className={`nav-item d-flex     w-100  align-items-center  ${
                    item.bg ? " bgNewSidebar rounded-3" : ""
                  }   `}
                >
                  <item.icon className={`iconSize2 iconcolor `} />
                  <Link
                    className={` nav-link  tit-14-400 text-dark text-nowrap  `}
                    href={item.href}
                  >
                    {t(item.tit)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    ),
    isenrollment: (
      <>
        <div className=" d-flex   flex-column h-100  newSidebarpadding ">
          <Link
            className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
            aria-current="page"
          >
            {t("enrollment")}
          </Link>
          <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   newsidebarr     ">
            {enrollment.map((item, index) => {
              return (
                <li
                  className={`nav-item d-flex    w-100  align-items-center   ${
                    item.bg ? " bgNewSidebar rounded-3" : ""
                  }   `}
                >
                  <item.icon className={`iconSize2 iconcolor `} />
                  <Link
                    className={` nav-link  tit-14-400 text-dark text-nowrap  `}
                    href={item.href}
                  >
                    {t(item.tit)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    ),
    isEdu: (
      <>
        <div className=" d-flex   flex-column h-100  newSidebarpadding ">
          <Link
            className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
            aria-current="page"
          >
            {t("education")}
          </Link>
          <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   newsidebarr    ">
            {edu.map((item, index) => {
              return (
                <li
                  className={`nav-item d-flex    w-100  align-items-center   ${
                    item.bg ? " bgNewSidebar rounded-3" : ""
                  }   `}
                >
                  <item.icon className={`iconSize2 iconcolor `} />
                  <Link
                    className={` nav-link  tit-14-400 text-dark text-nowrap  `}
                    href={item.href}
                  >
                    {t(item.tit)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
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
    users: (
      <>
        <Link
          className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
          aria-current="page"
        >
          {t("users")}
        </Link>
        <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   p-4  pt-1    ">
          {users.map((item, index) => {
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
    setSidebarOpen(true);
    if (loc !== "") {
      if (actv === true) {
        setTit(loc);

      } else {
        setActv(!actv);
        setTit(loc);
      }
    } else {
      if (actv === true) {
        setActv(!actv);
      }
    }
  }

  return (
    <>
      <div className=" d-flex flex-column  ">
        <div className="     d-flex flex-column  pt-4  bg-white  newSiebarMargin ">
          <div className=" pe-3  ps-3  ">
            <Link
              className="text-white text-decoration-none  m-lg-auto  d-flex  "
              role="button"
              href="/"
            >
              <Image src={logo} alt="ai" width={120} height={28} priority />
            </Link>
          </div>
          <Image
            src={toggle}
            alt="toggle"
            width={20}
            height={20}
            className="position-absolute"
            style={{ top: "12%", right: "0.5%", zIndex: "100" }}
            onClick={() => setSidebarOpen((prev) => !prev)}
          />

          <div className=" d-flex  mt-md-4      newbg  pt-4  position-relative">
            <nav className="navbar navbar-light navbar-expand-lg  p-0       ">
              <div className=" d-flex flex-sm-row flex-lg-column flex-row flex-md-row flex-xl-column h-100  align-items-start p-0   ">
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

                {/* <div
                  className={` d-flex   w-100    justify-content-center   bg-white   p-3  m-0 ${
                    actv ? "NewsideLogov3actv" : ""
                  } `}
                >
                  <SmallLogo
                    className={`iconSize1     ${
                      isPanel ? "iconcolor" : "iconcolor2"
                    } `}
                  />
                </div> */}

                <div
                  className="collapse navbar-collapse       d-flex flex-column   "
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav   d-lg-flex w-100 flex-lg-column    p-3    bg-white    newSidebar  ">
                    <div className="d-flex align-items-center justify-content-center">
                      <h6 className=" text-center text-nowrap tit-10-400">
                        لوحة الإدارة
                      </h6>
                    </div>

                    <li
                      className={`nav-item d-flex  p-2     align-items-center  besideHover  ${
                        isPanel && "onSelect"
                      }  `}
                    >
                      <Link
                        href="/org/panel"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Home
                          className={`iconSize1      ${
                            isPanel ? "iconcolor" : "iconcolor2"
                          } `}
                        />
                      </Link>
                      <span
                        className={`text-nowrap ${
                          sidebarOpen
                            ? "tooltipText text-body-secondary"
                            : "w-100 text-center"
                        }`}
                      >
                        {t("dashboard")}
                      </span>
                    </li>

                    <li
                      className={`nav-item d-flex   p-2   align-items-center  besideHover  ${
                        isEmployeeprogress && "onSelect"
                      }  `}
                    >
                      <Link
                        href="/org/employeeprogress"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Stat
                          className={`iconSize1  ${
                            isEmployeeprogress ? "iconcolor" : "iconcolor2"
                          } `}
                        />
                      </Link>
                      <span
                        className={`text-nowrap ${
                          sidebarOpen
                            ? "tooltipText text-body-secondary"
                            : "w-100 text-center"
                        }`}
                      >
                        {t("Employee progress")}
                      </span>
                    </li>

                    <li
                      className={`nav-item d-flex  p-2    align-items-center  besideHover  ${
                        isSubscriptionmanagement && "onSelect"
                      }  `}
                    >
                      <Link
                        href="/org/subscription-management"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Card
                          className={`iconSize1    ${
                            isSubscriptionmanagement
                              ? "iconcolor"
                              : "iconcolor2"
                          }  `}
                        />
                      </Link>
                      <span
                        className={`text-nowrap ${
                          sidebarOpen
                            ? "tooltipText text-body-secondary"
                            : "w-100 text-center"
                        }`}
                      >
                        {t("Subscription Management")}
                      </span>
                    </li>
                    <li
                      className={`nav-item d-flex  p-2    align-items-center    besideHover  ${
                        isNotfiPage && "onSelect"
                      }   `}
                    >
                      <Link
                        href="/org/notifications"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Notif
                          className={`iconSize1   ${
                            isNotfiPage ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                      <span
                        className={`text-nowrap ${
                          sidebarOpen
                            ? "tooltipText text-body-secondary"
                            : "w-100 text-center"
                        }`}
                      >
                        {t("Notifications")}
                      </span>
                    </li>
                    <li
                      className={`nav-item d-flex  p-2    align-items-center  besideHover  ${
                        isTechSupport && "onSelect"
                      } `}
                    >
                      <Link
                        href="/org/techsupport"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Option
                          className={`iconSize1    ${
                            isTechSupport ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                      <span
                        className={`text-nowrap ${
                          sidebarOpen
                            ? "tooltipText text-body-secondary"
                            : "w-100 text-center"
                        }`}
                      >
                        {t("Technical Support")}
                      </span>
                    </li>
                  </ul>
                  <ul
                    className={`navbar-nav  w-100  d-lg-flex  flex-lg-column    p-3    bg-white    lastPart    `}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <h6 className=" text-center text-nowrap tit-10-400 ">
                        الأكاديمية{" "}
                      </h6>
                    </div>
                    <li
                      className={`nav-item d-flex  p-2   align-items-center  besideHover  ${
                        isAdminssion && "onSelect"
                      }  `}
                      onClick={() => {
                        setactvv("isAdmission");
                      }}
                    >
                      <Link href="/org/admission/admission-requirements">
                        <AdmissionIcon
                          className={`iconSize1    ${
                            isAdminssion ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                      <span
                        className={`text-nowrap ${
                          sidebarOpen
                            ? "tooltipText text-body-secondary"
                            : "w-100 text-center"
                        }`}
                      >
                        {t("admission")}
                      </span>
                    </li>
                    <li
                      className={`nav-item d-flex  p-2    align-items-center besideHover  ${
                        studentsRecords && "onSelect"
                      }      `}
                      onClick={() => {
                        setactvv("isRegistered");
                      }}
                    >
                      <Link href="/org/students-records/all-students">
                        <ClassesIcon
                          className={`iconSize1   ${
                            studentsRecords ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                      <span
                        className={`text-nowrap ${
                          sidebarOpen
                            ? "tooltipText text-body-secondary"
                            : "w-100 text-center"
                        }`}
                      >
                        {t("registrations")}
                      </span>
                    </li>
                    <li
                      className={`nav-item d-flex  p-2     align-items-center  besideHover ${
                        iSenrollment && "onSelect"
                      }    `}
                      onClick={() => {
                        setactvv("isenrollment");
                      }}
                    >
                      <Link href="/org/enrollment/history">
                        <Profile
                          className={`iconSize1    ${
                            iSenrollment ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                      <span
                        className={`text-nowrap ${
                          sidebarOpen
                            ? "tooltipText text-body-secondary"
                            : "w-100 text-center"
                        }`}
                      >
                        {t("enrollment")}
                      </span>
                    </li>

                    <li
                      className={`nav-item d-flex  p-2     align-items-center besideHover ${
                        education && "onSelect"
                      }  `}
                      onClick={() => {
                        setactvv("isEdu");
                      }}
                    >
                      <Link href="/org/education/quizzes">
                        <Quiz
                          className={`iconSize1    ${
                            education ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>

                      <span
                        className={`text-nowrap ${
                          sidebarOpen
                            ? "tooltipText text-body-secondary"
                            : "w-100 text-center"
                        }`}
                      >
                        {t("education")}
                      </span>
                    </li>
                    {/* <li
                      className={`nav-item d-flex  p-2     align-items-center  besideHover ${
                        isOrgprofile && "onSelect"
                      } `}
                      onClick={() => {
                        setactvv("isprogramreg");
                      }}
                    >
                      <Link href="/org/education/programs-statistics/bundlesStats">
                        <Personal
                          className={`iconSize1    ${
                            isOrgprofile ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                      </Link>
                      <span
  className={`text-nowrap ${sidebarOpen ? "tooltipText text-body-secondary" : "w-100 text-center"}`}
>
                        {t("programs-statistics")}
                      </span>
                    </li> */}
                  </ul>

                  {/* <li
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
                    </li> */}

                  {/* <li
                      className={`nav-item d-flex  p-2   w-100  align-items-center     `}
                      onClick={() => {
                        setactvv("users");
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
                    </li> */}

                  {/* <li
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
                    </li> */}
                </div>
              </div>
            </nav>

            <div className=" bg-white  d-flex  flex-column        ">
              <div className=" d-flex flex-column h-100">
                {actv && <>{comp[tit]}</>}
              </div>
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
