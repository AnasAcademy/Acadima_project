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
import Profile from "../../../assets/admin/profile.svg";
import Ai from "../../../assets/admin/ai.svg";
import HelpIcon from "../../../assets/admin/helpIcon.svg";
import Setting from "../../../assets/admin/setting.svg";
import bk from "../../../assets/admin/Background.png";
import pwr from "@/assets/Sidebar icons/powered.png";



import { usePathname } from "next/navigation";

export default function Sidebar() {
  const t = useTranslations("SidebarA");
  const pathname = usePathname();
  const isPanel = pathname.includes("/org/panel");
  const isEmployeeprogress = pathname.includes("/org/employeeprogress");
  const isTechSupport = pathname.includes("/org/techsupport");
  const isOrgprofile = pathname.includes("/org/orgprofile");
  const isAiAssistant = pathname.includes("/org/ai-assistant");
  const isSettings = pathname.includes("/org/settings");

  const isAdmissionReq = pathname.includes(
    "/org/admission/admission-requirements"
  );
  const isStudentPermission = pathname.includes(
    "/org/admission/student-permission"
  );
  const isAllStudents = pathname.includes(
    "/org/admission/students-records/all-students"
  );
  const isCreateAccount = pathname.includes(
    "/org/admission/students-records/create-account"
  );
  const isSeatReservation = pathname.includes(
    "/org/admission/students-records/seat-reservation"
  );
  const isProgramRegistration = pathname.includes(
    "/org/admission/students-records/program-registration"
  );
  const isDirectRegistration = pathname.includes(
    "/org/admission/students-records/direct-registration"
  );
  const isScholarshipRegistration = pathname.includes(
    "/org/admission/students-records/scholarship-registration"
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
  const isEnrollmentHistory = pathname.includes(
    "/org/admission/enrollment/history"
  );
  const isAddStudent = pathname.includes(
    "/org/admission/enrollment/add-student-to-class"
  );

  const isBundlesStats = pathname.includes(
    "/org/education/programs-statistics/bundles"
  );
  const isWebinarsStats = pathname.includes(
    "/org/education/programs-statistics/webinars"
  );
  const isQuizzes = pathname.includes("/org/education/quizzes");
  const isAssignments = pathname.includes("/org/education/assignments");
  const isCourses = pathname.includes("/org/education/courses");
  const isCoursesRegistration = pathname.includes(
    "/org/education/course-registration"
  );
  const isBundles = pathname.includes("/org/education/bundles");

  const isBalances = pathname.includes("/org/financial/balances");
  const isSalesList = pathname.includes("/org/financial/sales-list");
  const isOfflinePayments = pathname.includes(
    "/org/financial/offline-payments"
  );
  const isInstallments = pathname.includes("/org/financial/installments");
  const isDiscountCodes = pathname.includes("/org/financial/discount-codes");

  const isStaff = pathname.includes("/org/user-management/users/staff");
  const isStudents = pathname.includes("/org/user-management/users/students");
  const isInstructors = pathname.includes("/org/user-management/users/instructors");
  const isNewUser = pathname.includes("/org/user-management/users/new-user");
  const isRoles = pathname.includes("/org/user-management/roles");
  const isGroups = pathname.includes("/org/user-management/groups");
  const isNotAccessToContent = pathname.includes("/org/user-management/not-access-to-content");

  const isSubscriptionmanagement = pathname.includes(
    "/org/subscription-management"
  );
  const isNotfiPage = pathname.includes("/org/notifications");

  return (
    <>
      <div className=" p-3  d-flex flex-column">
        <nav className="navbar navbar-light navbar-expand-lg     mt-md-4">
          <div className="container-fluid  d-flex flex-sm-row flex-lg-column flex-row flex-md-row flex-xl-column min-vh-lg-100   align-items-start p-0  ">
            <Link
              className="text-white text-decoration-none  m-lg-auto  d-flex justify-content-center "
              role="button"
              href="/"
            >
              <Image src={logo} alt="ai" width={120} height={32} priority />
            </Link>

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
              className="collapse navbar-collapse ms-4 me-4 mt-5   "
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   p-0   ">
                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isPanel ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Home
                    className={`iconSize2   ${
                      isPanel ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 `}
                    aria-current="page"
                    href="/org/panel"
                  >
                    {t("dashboard")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex   p-2  w-100  align-items-center   ${
                    isEmployeeprogress ? "cardbg  rounded-4 " : ""
                  }   `}
                >
                  <Stat
                    className={`iconSize2   ${
                      isEmployeeprogress ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800 "
                    aria-current="page"
                    href="/org/employeeprogress"
                  >
                    {t("Employee progress")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isSubscriptionmanagement ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Card
                    className={`iconSize2   ${
                      isSubscriptionmanagement ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link  Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/subscription-management"
                  >
                    {t("Subscription Management")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isNotfiPage ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Notif
                    className={`iconSize2   ${
                      isNotfiPage ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link  Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/notifications"
                  >
                    {t("Notifications")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isTechSupport ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Option
                    className={`iconSize2   ${
                      isTechSupport ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800 "
                    aria-current="page"
                    href="/org/techsupport"
                  >
                    {t("Technical Support")}
                  </Link>
                </li>

                <li className={`nav-item d-flex  align-items-center  `}>
                  <h3 className="nav-link Tit-12-700 Gray-Gray-700 m-0">
                    {t("admission")}
                  </h3>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center  bg-danger  ${
                    isAdmissionReq ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isAdmissionReq ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/admission-requirements"
                  >
                    {t("admission-requirements")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isStudentPermission ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Ai
                    className={`iconSize2   ${
                      isStudentPermission ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/student-permission"
                  >
                    {t("student-permission")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isElectronicServices ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isElectronicServices ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/electronic-services"
                  >
                    {t("electronic-services")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isClasses ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isClasses ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/classes"
                  >
                    {t("classes")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isStudentsCodes ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isStudentsCodes ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/students-codes"
                  >
                    {t("student-codes")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isInstructorCodes ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isInstructorCodes ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/instructor-codes"
                  >
                    {t("instructor-codes")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isCategories ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isCategories ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/categories"
                  >
                    {t("categories")}
                  </Link>
                </li>

                <li className={`nav-item d-flex  align-items-center  `}>
                  <h3 className="nav-link Tit-12-700 Gray-Gray-700 m-0">
                    {t("registrations")}
                  </h3>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isAllStudents ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isAllStudents ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/students-records/all-students"
                  >
                    {t("all-students")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isCreateAccount ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isCreateAccount ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/students-records/create-account"
                  >
                    {t("create-account-form")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isSeatReservation ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isSeatReservation ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/students-records/seat-reservations"
                  >
                    {t("seat-reservation-form")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isProgramRegistration ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isProgramRegistration ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800 bg-danger"
                    aria-current="page"
                    href="/org/admission/students-records/program-registration"
                  >
                    {t("program-registration")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isDirectRegistration ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isDirectRegistration ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/students-records/direct-registration"
                  >
                    {t("direct-registration")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isScholarshipRegistration ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isScholarshipRegistration ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/students-records/scholarship-registration"
                  >
                    {t("scholarship-registration")}
                  </Link>
                </li>

                <li className={`nav-item d-flex  align-items-center   bg-success`}>
                  <h3 className="nav-link Tit-12-700 Gray-Gray-700 m-0">
                    {t("enrollment")}
                  </h3>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isEnrollmentHistory ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isEnrollmentHistory ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/enrollment/history"
                  >
                    {t("enrollment-history")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isAddStudent ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isAddStudent ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/admission/enrollment/add-student-to-class"
                  >
                    {t("add-student-to-class")}
                  </Link>
                </li>

                <li className={`nav-item d-flex  align-items-center  `}>
                  <h3 className="nav-link Tit-12-700 Gray-Gray-700 m-0">
                    {t("education")}
                  </h3>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isQuizzes ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isQuizzes ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/education/quizzes"
                  >
                    {t("quizzes")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isAssignments ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isAssignments ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/education/assignments"
                  >
                    {t("assignments")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isCourses ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isCourses ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/education/courses"
                  >
                    {t("courses")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isCoursesRegistration ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isCoursesRegistration ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/education/course-registration"
                  >
                    {t("courses-registration")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isBundles ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isBundles ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/education/bundles"
                  >
                    {t("bundles")}
                  </Link>
                </li>

                <li className={`nav-item d-flex  align-items-center  `}>
                  <h3 className="nav-link Tit-12-700 Gray-Gray-700 m-0">
                    {t("programs-statistics")}
                  </h3>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isBundlesStats ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isBundlesStats ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/education/programs-statistics/bundles"
                  >
                    {t("bundles")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isWebinarsStats ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isWebinarsStats ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/education/programs-statistics/webinars"
                  >
                    {t("webinars")}
                  </Link>
                </li>

                <li className={`nav-item d-flex  align-items-center  `}>
                  <h3 className="nav-link Tit-12-700 Gray-Gray-700 m-0">
                    {t("financial")}
                  </h3>
                </li>

                 <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isBalances ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Home
                    className={`iconSize2     ${
                      isBalances ? "iconcolor" : "iconcolor2"
                    } `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                    href="/org/financial/balances"
                  >
                    {t("balances")}
                  </Link>
                </li>

                 <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isSalesList ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Home
                    className={`iconSize2     ${
                      isSalesList ? "iconcolor" : "iconcolor2"
                    } `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                    href="/org/financial/sales-list"
                  >
                    {t("sales-list")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isOfflinePayments ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Home
                    className={`iconSize2     ${
                      isOfflinePayments ? "iconcolor" : "iconcolor2"
                    } `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                    href="/org/financial/offline-payments"
                  >
                    {t("offline-payments")}
                  </Link>
                </li>

                 <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isInstallments ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Home
                    className={`iconSize2     ${
                      isInstallments ? "iconcolor" : "iconcolor2"
                    } `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                    href="/org/financial/installments"
                  >
                    {t("installments")}
                  </Link>
                </li>

                 <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isDiscountCodes ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Home
                    className={`iconSize2     ${
                      isDiscountCodes ? "iconcolor" : "iconcolor2"
                    } `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                    href="/org/financial/discount-codes"
                  >
                    {t("discount-codes")}
                  </Link>
                </li>

                <li className={`nav-item d-flex  align-items-center  `}>
                  <h3 className="nav-link Tit-12-700 Gray-Gray-700 m-0">
                    {t("users")}
                  </h3>
                </li>   

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isStaff ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Home
                    className={`iconSize2     ${
                      isStaff ? "iconcolor" : "iconcolor2"
                    } `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                    href="/org/user-management/users/staff"
                  >
                    {t("staff")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isStudents ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Home
                    className={`iconSize2     ${
                      isStudents ? "iconcolor" : "iconcolor2"
                    } `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                    href="/org/user-management/users/students"
                  >
                    {t("students")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isInstructors ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Home
                    className={`iconSize2     ${
                      isInstructors ? "iconcolor" : "iconcolor2"
                    } `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                    href="/org/user-management/users/instructors"
                  >
                    {t("instructors")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isNewUser ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Home
                    className={`iconSize2     ${
                      isNewUser ? "iconcolor" : "iconcolor2"
                    } `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                    href="/org/user-management/users/new-user"
                  >
                    {t("new-user")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isRoles ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Home
                    className={`iconSize2     ${
                      isRoles ? "iconcolor" : "iconcolor2"
                    } `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                    href="/org/user-management/roles"
                  >
                    {t("roles")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isGroups ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Home
                    className={`iconSize2     ${
                      isGroups ? "iconcolor" : "iconcolor2"
                    } `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                    href="/org/user-management/groups"
                  >
                    {t("groups")}
                  </Link>
                </li>

                 <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isNotAccessToContent ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Home
                    className={`iconSize2     ${
                      isNotAccessToContent ? "iconcolor" : "iconcolor2"
                    } `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                    href="/org/user-management/not-access-to-content"
                  >
                    {t("not-access-to-content")}
                  </Link>
                </li>

                <li className={`nav-item d-flex  align-items-center  `}>
                  <h3 className="nav-link Tit-12-700 Gray-Gray-700 m-0">
                    {t("Account Management")}
                  </h3>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isOrgprofile ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Profile
                    className={`iconSize2   ${
                      isOrgprofile ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/orgprofile"
                  >
                    {t("Organization Profile")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isAiAssistant ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Ai
                    className={`iconSize2   ${
                      isAiAssistant ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/ai-assistant"
                  >
                    {t("AI Assistant")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isSettings ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Setting
                    className={`iconSize2   ${
                      isSettings ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800 "
                    aria-current="page"
                    href="/org/settings"
                  >
                    {t("Settings")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

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
      </div>
    </>
  );
}
