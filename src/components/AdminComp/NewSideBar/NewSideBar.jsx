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
import Regper from "@/assets/admin/regreq.svg";
import Allstudent from "@/assets/admin/allstudent.svg";
import Quiz from "@/assets/admin/quiz.svg";
import Studentper from "@/assets/admin/studentper.svg";
import Programs from "@/assets/admin/programs.svg";
import Classess from "@/assets/admin/classess.svg";
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
import AdmissionIcon from "@/assets/admin/admission.svg";
import ClassesIcon from "@/assets/admin/classes.svg";
import User1 from "@/assets/admin/user1.svg";
import LogoutIcon from "@/assets/Sidebar icons/logoutadmin.svg";
import Elctronc from "@/assets/admin/Electronc.svg";
import AddStud from "@/assets/admin/addStudent.svg";
import Regcourse from "@/assets/admin/regcourse.svg";
import Balance from "@/assets/admin/balance.svg";
import User2 from "@/assets/admin/user2.svg";
import toggle from "@/assets/admin/sidebar-toggle.png";
import User3 from "@/assets/admin/user3.svg";
import User4 from "@/assets/admin/user4.svg";
import User5 from "@/assets/admin/user5.svg";
import User6 from "@/assets/admin/user6.svg";
import User7 from "@/assets/admin/user7.svg";
import User8 from "@/assets/admin/user8.svg";
import User9 from "@/assets/admin/user9.svg";
import User10 from "@/assets/admin/user10.svg";
import User11 from "@/assets/admin/user11.svg";
import User12 from "@/assets/admin/user12.svg";
import Accmanage from "@/assets/admin/accmange.svg";
import Acc1 from "@/assets/admin/accmange1.svg";
import Acc2 from "@/assets/admin/accmange2.svg";
import SettingsIcons from "@/assets/admin/settingsIcons.svg";
import Userss from "@/assets/admin/userss.svg";
import Statics from "@/assets/admin/stattics.svg";
import Submange from "@/assets/admin/submange.svg";
import Frame15 from "@/assets/admin/Frame15.svg";
import Supports from "@/assets/admin/supports.svg";
import { usePathname } from "next/navigation";
import AIChat from "@/components/AIChat/AIChat";
import Animate from "@/assets/admin/animate.gif";
import arrowDown from "@/assets/admin/Arrow-down.svg";
import point from "@/assets/Vector.svg";

export default function NewSideBar() {
  // const [actv, setActv] = useState(false);
  const [active, setActive] = useState(null);
  const [message, setMessage] = useState(false);
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
  const isprostatic = pathname.includes("/org/programs-statistics");
  const isBundlesStats = pathname.includes("/org/programs-statistics/bundles");
  const isWebinarsStats = pathname.includes(
    "/org/programs-statistics/webinars"
  );

  const isFin = pathname.includes("/org/financial/");
  const isBalances = pathname.includes("/org/financial/balances");
  const isSaleslist = pathname.includes("/org/financial/sales-list");
  const isOfflinepay = pathname.includes("/org/financial/offline-payments");
  const isInstallments = pathname.includes("/org/financial/installments");
  const isInstallmentsPlans = pathname.includes(
    "/org/financial/installments/plans"
  );
  const isInstallmentsPurchases = pathname.includes(
    "/org/financial/installments/purchases"
  );
  const isInstallmentsOverdue = pathname.includes(
    "/org/financial/installments/overdue"
  );
  const isInstallmentsOverdueHistory = pathname.includes(
    "/org/financial/installments/history"
  );
  const isInstallmentSettings = pathname.includes("/org/financial/installments/settings");
  const isDiscountcodes = pathname.includes("/org/financial/discount-codes");

  const isQuizzes = pathname.includes("/org/education/quizzes");
  const isAssignments = pathname.includes("/org/education/assignments");
  const education = pathname.includes("/org/education/");

  const isCourses = pathname.includes("/org/education/courses");
  const isCourse = pathname.includes("/org/education/courses/course");
  const isWebinar = pathname.includes("/org/education/courses/webinars");
  const isGradProject = pathname.includes(
    "/org/education/courses/graduation-projects"
  );
  const isTextLesson = pathname.includes("/org/education/courses/text-lessons");
  const isCertificates = pathname.includes("/org/education/certificates");
  const isCertificateTemplates = pathname.includes(
    "/org/education/certificates/certificate-templates"
  );
  const isCourseCertificates = pathname.includes(
    "/org/education/certificates/course-certificate"
  );
  const isQuizCertificates = pathname.includes(
    "/org/education/certificates/quiz-certificate"
  );
  const isCoursesRegistration = pathname.includes(
    "/org/education/course-registration"
  );
  const isBundles = pathname.includes("/org/education/bundles");
  const isPrograms = pathname.includes("/org/education/bundles/programs");
  const isBridgingPrograms = pathname.includes(
    "/org/education/bundles/bridging-programs"
  );
  const iSenrollmentHis = pathname.includes("/org/enrollment/history");

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
  const isUsers = pathname.includes("/org/user-management");
  const isUsersStaff = pathname.includes("/org/user-management/users/staff");
  const isUsersStudent = pathname.includes(
    "/org/user-management/users/students"
  );
  const isUserInstructor = pathname.includes(
    "/org/user-management/users/instructors"
  );
  const isUsersNewacc = pathname.includes(
    "/org/user-management/users/new-user"
  );
  const isPlans = pathname.includes("/org/plans");
  const isUsersRoles = pathname.includes("/org/user-management/roles");
  const isUsersgroups = pathname.includes("/org/user-management/groups");
  const isUsersaccs = pathname.includes(
    "/org/user-management/users/not-access-to-content"
  );
  const isLogOut = pathname.includes("/org/logout");
  const isNotfiPage = pathname.includes("/org/notifications");
  // const isAccMange = isOrgprofile || isAiAssistant || isSettings;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [AiChatOpen, setAiChatOpen] = useState(false);

  const [openIndex, setOpenIndex] = useState(null);
  const [openFinIndex, setOpenFinIndex] = useState(null);

  const accmange = [
    {
      icon: Acc1,
      tit: "Organization Profile",
      href: "/org/orgprofile",
      bg: isOrgprofile,
    },
    // {
    //   icon: Acc2,
    //   tit: "AI Assistant",
    //   href: "/org/ai-assistant",
    //   bg: isAiAssistant,
    // },
    // {
    //   icon: Acc3,
    //   tit: "Settings",
    //   href: "/org/settings",
    //   bg: isSettings,
    // },
    // {
    //   icon: Acc3,
    //   tit: "plans",
    //   href: "/org/plans",
    //   bg: isPlans,
    // },
  ];

  const admission = [
    {
      icon: Regper,
      tit: "admission-requirements",
      href: "/org/admission/admission-requirements",
      bg: isAdmissionReq,
    },
    {
      icon: Studentper,
      tit: "student-permission",
      href: "/org/admission/student-permission",
      bg: isStudentPermission,
    },
    {
      icon: Elctronc,
      tit: "electronic-services",
      href: "/org/admission/electronic-services",
      bg: isElectronicServices,
    },
    {
      icon: Classess,
      tit: "classes",
      href: "/org/admission/classes",
      bg: isClasses,
    },
    {
      icon: StudentCode,
      tit: "student-codes",
      href: "/org/admission/students-codes",
      bg: isStudentsCodes,
    },
    {
      icon: Instruc,
      tit: "instructor-codes",
      href: "/org/admission/instructor-codes",
      bg: isInstructorCodes,
    },
    {
      icon: Cat,
      tit: "categories",
      href: "/org/admission/categories",
      bg: isCategories,
    },
  ];

  const isRegistered = [
    {
      icon: Allstudent,
      tit: "all-students",
      href: "/org/students-records/all-students",
      bg: isAllStudents,
    },
    {
      icon: CreateAcc,
      tit: "create-account-form",
      href: "/org/students-records/create-account",
      bg: isCreateAccount,
    },
    {
      icon: Seat,
      tit: "seat-reservation-form",
      href: "/org/students-records/seat-reservations",
      bg: isSeatReservation,
    },
    {
      icon: Direct,
      tit: "direct-registration",
      href: "/org/students-records/direct-registration",
      bg: isDirectRegistration,
    },
    {
      icon: Scholarship,
      tit: "scholarship-registration",
      href: "/org/students-records/scholarship-registration",
      bg: isScholarshipRegistration,
    },
  ];
  const enrollment = [
    {
      icon: History,
      tit: "enrollment-history",
      href: "/org/enrollment/history",
      bg: iSenrollmentHis,
    },
  ];

  const edu = [
    {
      icon: Exam,
      tit: "quizzes",
      href: "/org/education/quizzes",
      bg: isQuizzes,
    },
    {
      icon: Homework,
      tit: "assignments",
      href: "/org/education/assignments",
      bg: isAssignments,
    },
    {
      icon: Courses,
      tit: "courses",
      href: "/org/education/courses",
      bg: isCourses,
      arrow: arrowDown,
      icon2: point,
      children: [
        {
          tit: "webinars",
          href: "/org/education/courses/course",
          bg: isCourse,
        },
        // {
        //   tit: "courses_webinars",
        //   href: "/org/education/courses/webinars",
        //  bg: isWebinar
        // },
        // {
        //   tit: "graduation_projects",
        //   href: "/org/education/courses/graduation-projects",
        // bg: isGradProject
        // },
        // {
        //   tit: "text_lessons",
        //   href: "/org/education/courses/text-lessons",
        // bg: isTextLesson
        // },
      ],
    },
    {
      icon: Regcourse,
      tit: "courses-registration",
      href: "/org/education/course-registration",
      bg: isCoursesRegistration,
    },
    {
      icon: Programs,
      tit: "bundles",
      href: "/org/education/bundles",
      bg: isBundles,
      arrow: arrowDown,
      icon2: point,
      children: [
        {
          tit: "programs",
          href: "/org/education/bundles/programs",
          bg: isPrograms,
        },
        {
          tit: "bridging_programs",
          href: "/org/education/bundles/bridging-programs",
          bg: isBridgingPrograms,
        },
      ],
    },
    {
      icon: Programs,
      tit: "certificates",
      href: "/org/education/certificates",
      bg: isCertificates,
      arrow: arrowDown,
      icon2: point,
      children: [
        {
          tit: "quiz_certificates",
          href: "/org/education/certificates/quiz-certificate",
          bg: isQuizCertificates,
        },
        {
          tit: "course_certificates",
          href: "/org/education/certificates/course-certificate",
          bg: isCourseCertificates,
        },
        {
          tit: "certificate_templates",
          href: "/org/education/certificates/certificate-templates",
          bg: isCertificateTemplates,
        },
      ],
    },
  ];

  const proreg = [
    {
      icon: User7,
      tit: "bundles",
      href: "/org/programs-statistics/bundlesStats",
      bg: isBundlesStats,
    },
    {
      icon: User8,
      tit: "webinars",
      href: "/org/programs-statistics/webinarsStats",
      bg: isWebinarsStats,
    },
  ];
  const finan = [
    {
      icon: Balance,
      tit: "balances",
      href: "/org/financial/balances",
      bg: isBalances,
    },
    {
      icon: User9,
      tit: "sales-list",
      href: "/org/financial/sales-list",
      bg: isSaleslist,
    },
    {
      icon: User10,
      tit: "offline-payments",
      href: "/org/financial/offline-payments",
      bg: isOfflinepay,
    },
    {
      icon: User11,
      tit: "installments",
      href: "/org/financial/installments",
      bg: isInstallments,
      arrow: arrowDown,
      icon2: point,
      children: [
        {
          tit: "installment_plans",
          href: "/org/financial/installments/plans",
          bg: isInstallmentsPlans,
        },
        {
          tit: "purchases",
          href: "/org/financial/installments/purchases",
          bg: isInstallmentsPurchases,
        },
        {
          tit: "overdue",
          href: "/org/financial/installments/overdue",
          bg: isInstallmentsOverdue,
        },
        {
          tit: "overdue_history",
          href: "/org/financial/installments/history",
          bg: isInstallmentsOverdueHistory,
        },
        {
          tit: "installment_settings",
          href: "/org/financial/installments/settings",
          bg: isInstallmentSettings
        },
      ],
    },
    {
      icon: User12,
      tit: "discount-codes",
      href: "/org/financial/discount-codes",
      bg: isDiscountcodes,
    },
  ];

  const users = [
    {
      icon: User1,
      tit: "staff",
      href: "/org/user-management/users/staff",
      bg: isUsersStaff,
    },
    {
      icon: User2,
      tit: "students",
      href: "/org/user-management/users/students",
      bg: isUsersStudent,
    },
    {
      icon: User2,
      tit: "instructors",
      href: "/org/user-management/users/instructors",
      bg: isUserInstructor,
    },
    {
      icon: User3,
      tit: "new-user",
      href: "/org/user-management/users/new-user",
      bg: isUsersNewacc,
    },
    {
      icon: User4,
      tit: "roles",
      href: "/org/user-management/roles",
      bg: isUsersRoles,
    },
    {
      icon: User5,
      tit: "groups",
      href: "/org/user-management/groups",
      bg: isUsersgroups,
    },
    // {
    //   icon: User6,
    //   tit: "not-access-to-content",
    //   href: "/org/user-management/not-access-to-content",
    //   bg: isUsersaccs,
    // },
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
                  key={index}
                  className={`nav-item d-flex w-100  align-items-center  p-2  ${
                    item.bg ? " bgNewSidebar rounded-3" : ""
                  }  `}
                  title={t("dashboard")}
                >
                  <item.icon className={`iconSize1 iconcolor m-1 `} />
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
                  key={index}
                  className={`nav-item d-flex     w-100  align-items-center p-2  ${
                    item.bg ? " bgNewSidebar rounded-3" : ""
                  }   `}
                >
                  <item.icon className={`iconSize1 iconcolor m-1 `} />
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
                  key={index}
                  className={`nav-item d-flex    w-100  align-items-center p-2  ${
                    item.bg ? " bgNewSidebar rounded-3" : ""
                  }   `}
                >
                  <item.icon className={`iconSize1 iconcolor m-1 `} />
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
        <div className="d-flex flex-column h-100 newSidebarpadding">
          <Link
            className="nav-link Tit-14-700 text-dark text-nowrap p-3"
            aria-current="page"
          >
            {t("education")}
          </Link>

          <ul className="navbar-nav d-lg-flex flex-lg-column justify-content-start align-items-start">
            {edu.map((item, index) => {
              const hasChildren =
                Array.isArray(item.children) && item.children.length > 0;
              const isOpen = openIndex === index;
              const childActive =
                hasChildren && item.children.some((ch) => ch.bg); // 👈 check children

              return (
                <li
                  key={index}
                  className={`nav-item w-100 align-items-center d-flex flex-column cursor-pointer p-2 ${
                    item.bg && !childActive ? "bgNewSidebar rounded-3" : "" // 👈 parent bg only if no child active
                  }`}
                >
                  <div
                    className="d-flex w-100 align-items-center"
                    onClick={() =>
                      hasChildren
                        ? setOpenIndex((prev) =>
                            prev === index ? null : index
                          )
                        : null
                    }
                  >
                    <item.icon className="iconSize1 iconcolor m-1" />

                    {hasChildren ? (
                      <span className="tit-14-400 text-dark text-nowrap">
                        {t(item.tit)}
                        {item.arrow && (
                          <item.arrow
                            className={`iconcolor m-1 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </span>
                    ) : (
                      <Link
                        className="tit-14-400 text-dark text-nowrap"
                        href={item.href}
                      >
                        {t(item.tit)}
                      </Link>
                    )}
                  </div>

                  {hasChildren && isOpen && (
                    <ul className="pe-2">
                      {item.children.map((child, cIdx) => (
                        <li
                          key={cIdx}
                          className={`d-flex align-items-center px-2 rounded-3 ${
                            child.bg ? "bgNewSidebar" : ""
                          }`}
                        >
                          <Link
                            className="nav-link tit-14-400 text-dark text-nowrap py-2"
                            href={child.href}
                          >
                            {t(child.tit)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </>
    ),
    isprogramreg: (
      <>
        <div className=" d-flex   flex-column h-100  newSidebarpadding ">
          <Link
            className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
            aria-current="page"
          >
            {t("programs-statistics")}
          </Link>
          <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   newsidebarr    ">
            {proreg.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`nav-item d-flex    w-100  align-items-center  p-2  ${
                    item.bg ? " bgNewSidebar rounded-3" : ""
                  }   `}
                >
                  <item.icon className={`iconSize1 iconcolor `} />
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
    isFinancial: (
      <>
        <div className="d-flex flex-column h-100 newSidebarpadding">
          <Link
            className="nav-link Tit-14-700 text-dark text-nowrap p-3"
            aria-current="page"
          >
            {t("financial")}
          </Link>

          <ul className="navbar-nav d-lg-flex flex-lg-column justify-content-start align-items-start">
            {finan.map((item, index) => {
              const hasChildren =
                Array.isArray(item.children) && item.children.length > 0;
              const isOpen = openFinIndex === index;

              // parent is active ONLY on its exact route (no descendants)
              const parentActiveStrict =
                typeof item.href === "string" &&
                (pathname === item.href || pathname === `${item.href}/`);

              // any child is active?
              const childActive =
                hasChildren &&
                item.children.some(
                  (ch) =>
                    ch.bg ||
                    (typeof ch.href === "string" &&
                      (pathname === ch.href ||
                        pathname.startsWith(`${ch.href}/`)))
                );

              return (
                <li
                  key={index}
                  className="nav-item w-100 align-items-center d-flex flex-column cursor-pointer p-2"
                >
                  {/* Parent row: no bg on open; bg only if parentActiveStrict AND no child active */}
                  <div
                    className={`d-flex w-100 align-items-center ${
                      parentActiveStrict && !childActive
                        ? "bgNewSidebar rounded-3"
                        : ""
                    }`}
                    onClick={() => {
                      if (hasChildren)
                        setOpenFinIndex((prev) =>
                          prev === index ? null : index
                        );
                    }}
                  >
                    <item.icon className="iconSize1 iconcolor m-1" />

                    {hasChildren ? (
                      <span className="tit-14-400 text-dark text-nowrap">
                        {t(item.tit)}
                        {item.arrow && (
                          <item.arrow
                            className={`iconcolor m-1 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </span>
                    ) : (
                      <Link
                        className="tit-14-400 text-dark text-nowrap"
                        href={item.href}
                      >
                        {t(item.tit)}
                      </Link>
                    )}
                  </div>

                  {/* Children list */}
                  {hasChildren && isOpen && (
                    <ul className="pe-2">
                      {item.children.map((child, cIdx) => {
                        const childIsActive =
                          child.bg ||
                          (typeof child.href === "string" &&
                            (pathname === child.href ||
                              pathname.startsWith(`${child.href}/`)));

                        return (
                          <li
                            key={cIdx}
                            className="d-flex align-items-center px-2 rounded-3"
                            onClick={(e) => e.stopPropagation()} // don't toggle parent when clicking child
                          >
                            <Link
                              className={`nav-link tit-14-400 text-dark text-nowrap py-2 ${
                                childIsActive ? "bgNewSidebar rounded-3" : ""
                              }`}
                              href={child.href}
                            >
                              {t(child.tit)}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </>
    ),
    users: (
      <>
        <div className=" d-flex   flex-column h-100  newSidebarpadding ">
          <Link
            className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
            aria-current="page"
          >
            {t("users")}
          </Link>
          <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   newsidebarr    ">
            {users.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`nav-item d-flex    w-100  align-items-center  p-2 ${
                    item.bg ? "bgNewSidebar rounded-3" : ""
                  }   `}
                >
                  <item.icon className={`iconSize1 iconcolor `} />
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
    accmange: (
      <>
        <div className=" d-flex   flex-column h-100  newSidebarpadding ">
          <Link
            className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
            aria-current="page"
          >
            {t("account_management")}
          </Link>
          <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   newsidebarr    ">
            {accmange.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`nav-item d-flex    w-100  align-items-center  p-2 ${
                    item.bg ? " bgNewSidebar rounded-3" : ""
                  }   `}
                >
                  <item.icon className={`iconSize1 iconcolor `} />
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
  };

  // function setactvv(loc) {
  //   setActv(prev => {
  //     const next = !prev;
  //     if (next && loc) setTit(loc);
  //     return next;
  //   });
  // }

  function togglePanel(loc) {
    setTit(loc);
    setActive((prev) => (prev === loc ? null : loc));
  }

  return (
    <>
      <div className=" d-flex flex-column  ">
        <div className="d-flex flex-column newSiebarMargin ">
          {/* <div className=" pe-3  ps-3  ">
            <Link
              className="text-white text-decoration-none  m-lg-auto  d-flex  "
              role="button"
              href="/"
            >
              <Image src={logo} alt="ai" width={120} height={33} priority />
            </Link>
          </div> */}
          <Image
            src={toggle}
            alt="toggle"
            width={20}
            height={20}
            className=" sidebarimgToggle"
            onClick={() => setSidebarOpen((prev) => !prev)}
          />
          <div
            className="position-fixed Aichat"
            style={{
              top: message ? "33%" : "46%",
            }}
          >
            {AiChatOpen ? (
              <div
                className=" bg-white"
                style={{
                  borderRadius: "5%",
                  cursor: "pointer",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                <div className=" d-flex justify-content-between align-items-center p-4">
                  {" "}
                  <Acc2 width={40} height={40} /> <h3>AI Chat Boat</h3>
                </div>

                <div className=" d-flex justify-content-center flex-column align-items-center ">
                  {message && (
                    <div className=" d-flex justify-content-center flex-column align-items-center ">
                      <Image
                        src={Animate}
                        alt="Loading animation"
                        width={94}
                        height={94}
                      />
                      <h4>كيف يمكنني مساعدتك اليوم ..؟</h4>
                    </div>
                  )}
                </div>

                <AIChat
                  minHeight="260px"
                  maxHeight="230px"
                  setMessage={setMessage}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div
            className="position-fixed m-1 Aichatt"
            onClick={() => setAiChatOpen((prev) => !prev)}
          >
            <Frame15 width={70} height={70} />
          </div>
          <div className=" d-flex  mt-md-4      newbg    position-relative">
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
                  <ul className="navbar-nav   d-lg-flex w-100 flex-lg-column    p-3    bg-white    newSidebar     ">
                    <div className="d-flex align-items-center justify-content-center">
                      <h6 className=" text-center text-nowrap tit-10-400">
                        {t("admin_dashboard")}
                      </h6>
                    </div>

                    <li
                      className={`nav-item   besideHover width-fit  ${
                        isPanel && "onSelect"
                      }  `}
                    >
                      <Link
                        href="/org/panel"
                        className="d-flex  p-2   gap-2  align-items-end"
                        onClick={() => {
                          togglePanel("");
                        }}
                      >
                        <Home
                          className={`iconSize1      ${
                            isPanel ? "iconcolor" : "iconcolor2"
                          } `}
                        />
                        <span
                          className={`text-nowrap custfont ${
                            sidebarOpen
                              ? "tooltipText text-body-secondary"
                              : "w-100 "
                          }`}
                        >
                          {t("dashboard")}
                        </span>
                      </Link>
                    </li>

                    {/* <li
                      className={`nav-item besideHover width-fit  ${
                        isEmployeeprogress && "onSelect"
                      }  `}
                      >
                        <Link
                          href="/org/employeeprogress"
                          className="d-flex  p-2   gap-2  align-items-end"
                          onClick={() => {
                            setactvv("");
                          }}
                        >
                          <Stat
                            className={`iconSize1  ${
                              isEmployeeprogress ? "iconcolor" : "iconcolor2"
                            } `}
                          />
                          <span
                            className={`text-nowrap custfont ${
                              sidebarOpen
                                ? "tooltipText text-body-secondary"
                                : "w-100"
                            }`}
                          >
                            {t("Employee progress")}
                          </span>
                        </Link>
                      </li> */}

                    <li
                      className={`nav-item  besideHover width-fit  ${
                        isNotfiPage && "onSelect"
                      }   `}
                    >
                      <Link
                        href="/org/notifications"
                        className="d-flex  p-2   gap-2  align-items-end"
                        onClick={() => {
                          togglePanel("");
                        }}
                      >
                        <Notif
                          className={`iconSize1   ${
                            isNotfiPage ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                        <span
                          className={`text-nowrap custfont ${
                            sidebarOpen
                              ? "tooltipText text-body-secondary"
                              : "w-100 "
                          }`}
                        >
                          {t("Notifications")}
                        </span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item  besideHover width-fit  ${
                        isTechSupport && "onSelect"
                      } `}
                    >
                      <Link
                        href="/org/techsupport"
                        className="d-flex  p-2   gap-2  align-items-end"
                        onClick={() => {
                          togglePanel("");
                        }}
                      >
                        <Supports
                          className={`iconSize1    ${
                            isTechSupport ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                        <span
                          className={`text-nowrap custfont ${
                            sidebarOpen
                              ? "tooltipText text-body-secondary"
                              : "w-100"
                          }`}
                        >
                          {t("Technical Support")}
                        </span>
                      </Link>
                    </li>
                    <li
                      className={`nav-item  besideHover width-fit  ${
                        isOrgprofile && "onSelect"
                      } `}
                    >
                      <Link
                        href="/org/orgprofile"
                        className="d-flex  p-2   gap-2  align-items-end"
                        onClick={() => {
                          togglePanel("");
                        }}
                      >
                        <Accmanage
                          className={`iconSize1    ${
                            isOrgprofile ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                        <span
                          className={`text-nowrap custfont ${
                            sidebarOpen
                              ? "tooltipText text-body-secondary"
                              : "w-100"
                          }`}
                        >
                          {t("Account Management")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                  <ul
                    className={`navbar-nav  w-100  d-lg-flex  flex-lg-column    p-3    bg-white    lastPart    `}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <h6 className=" text-center text-nowrap tit-10-400 ">
                        {t("academy")}
                      </h6>
                    </div>
                    <li
                      className={`nav-item d-flex  p-2 gap-2  align-items-end  besideHover width-fit  ${
                        isAdminssion && "onSelect"
                      }  `}
                      onClick={() => {
                        togglePanel("isAdmission");
                      }}
                    >
                      <p
                        // href="/org/admission/admission-requirements"
                        className="d-flex  m-0  gap-2  align-items-end cursor-pointer"
                      >
                        <AdmissionIcon
                          className={`iconSize1    ${
                            isAdminssion ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                        <span
                          className={`text-nowrap custfont ${
                            sidebarOpen
                              ? "tooltipText text-body-secondary"
                              : "w-100"
                          }`}
                        >
                          {t("admission")}
                        </span>
                      </p>
                    </li>
                    <li
                      className={`nav-item d-flex  gap-2   align-items-end besideHover width-fit  ${
                        (studentsRecords || iSenrollmentHis) && "onSelect"
                      }      `}
                      onClick={() => {
                        togglePanel("isRegistered");
                      }}
                    >
                      <p
                        // href="/org/students-records/all-students"
                        className="d-flex  p-2 m-0 cursor-pointer  gap-2  align-items-end"
                      >
                        <ClassesIcon
                          className={`iconSize1   ${
                            studentsRecords || iSenrollmentHis
                              ? "iconcolor"
                              : "iconcolor2"
                          }  `}
                        />
                        <span
                          className={`text-nowrap custfont ${
                            sidebarOpen
                              ? "tooltipText text-body-secondary"
                              : "w-100"
                          }`}
                        >
                          {t("registrations")}
                        </span>
                      </p>
                    </li>

                    <li
                      className={`nav-item d-flex  gap-2   align-items-end besideHover width-fit  ${
                        education && "onSelect"
                      }  `}
                      onClick={() => {
                        togglePanel("isEdu");
                      }}
                    >
                      <p
                        // href="/org/education/quizzes"
                        className="d-flex  p-2 m-0 cursor-pointer  gap-2  align-items-end"
                      >
                        <Quiz
                          className={`iconSize1    ${
                            education ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                        <span
                          className={`text-nowrap custfont ${
                            sidebarOpen
                              ? "tooltipText text-body-secondary"
                              : "w-100"
                          }`}
                        >
                          {t("education")}
                        </span>
                      </p>
                    </li>

                    <li
                      className={`nav-item d-flex   gap-2  align-items-end    besideHover width-fit ${
                        isUsers && "onSelect"
                      }  `}
                      onClick={() => {
                        togglePanel("users");
                      }}
                    >
                      <p
                        // href="/org/user-management/users/staff"
                        className="d-flex  p-2 m-0 cursor-pointer  gap-2  align-items-end"
                      >
                        <Userss
                          className={`iconSize1    ${
                            isUsers ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                        <span
                          className={`text-nowrap custfont ${
                            sidebarOpen
                              ? "tooltipText text-body-secondary"
                              : "w-100"
                          }`}
                        >
                          {t("users")}
                        </span>
                      </p>
                    </li>
                  </ul>
                  <ul
                    className={`navbar-nav  w-100  d-lg-flex  flex-lg-column    p-3    bg-white    lastPartt    `}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <h6 className=" text-center text-nowrap tit-10-400 ">
                        {t("reports_and_finance")}
                      </h6>
                    </div>

                    <li
                      className={`nav-item d-flex  gap-2   align-items-end  besideHover width-fit ${
                        isprostatic && "onSelect"
                      } `}
                      onClick={() => {
                        togglePanel("isprogramreg");
                      }}
                    >
                      <p
                        // href="/org/education/programs-statistics/bundlesStats"
                        className="d-flex  p-2 m-0 cursor-pointer  gap-2  align-items-end"
                      >
                        <Statics
                          className={`iconSize1    ${
                            isprostatic ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                        <span
                          className={`text-nowrap custfont ${
                            sidebarOpen
                              ? "tooltipText text-body-secondary"
                              : "w-100"
                          }`}
                        >
                          {t("programs-statistics")}
                        </span>
                      </p>
                    </li>

                    <li
                      className={`nav-item d-flex   gap-2   align-items-end    besideHover width-fit ${
                        isFin && "onSelect"
                      }   `}
                      onClick={() => {
                        togglePanel("isFinancial");
                      }}
                    >
                      <p
                        // href="/org/financial/balances"
                        className="d-flex  p-2 m-0 cursor-pointer  gap-2  align-items-end"
                      >
                        <Card
                          className={`iconSize1    ${
                            isFin ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                        <span
                          className={`text-nowrap custfont ${
                            sidebarOpen
                              ? "tooltipText text-body-secondary"
                              : "w-100"
                          }`}
                        >
                          {t("financial")}
                        </span>
                      </p>
                    </li>

                    <li
                      className={`nav-item d-flex   gap-2  align-items-end  besideHover width-fit  ${
                        isSubscriptionmanagement && "onSelect"
                      }  `}
                    >
                      <Link
                        href="/org/subscription-management"
                        className="d-flex  p-2 m-0 cursor-pointer  gap-2  align-items-end"
                        onClick={() => {
                          togglePanel("");
                        }}
                      >
                        <Submange
                          className={`iconSize1    ${
                            isSubscriptionmanagement
                              ? "iconcolor"
                              : "iconcolor2"
                          }  `}
                        />
                        <span
                          className={`text-nowrap custfont ${
                            sidebarOpen
                              ? "tooltipText text-body-secondary"
                              : "w-100"
                          }`}
                        >
                          {t("Subscription Management")}
                        </span>
                      </Link>
                    </li>
                  </ul>

                  <ul
                    className={`navbar-nav  w-100  d-lg-flex  flex-lg-column    p-3    bg-white    lastPartt    `}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <h6 className=" text-center text-nowrap tit-10-400 ">
                        {t("Settings")}
                      </h6>
                    </div>

                    <li
                      className={`nav-item d-flex  p-2  gap-2  align-items-end  besideHover     justify-content-center ${
                        isSettings && "onSelect"
                      }  `}
                    >
                      <Link
                        href="/org/settings"
                        onClick={() => {
                          togglePanel("");
                        }}
                      >
                        <SettingsIcons
                          className={`iconSize3    ${
                            isSettings ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                        <span
                          className={`text-nowrap custfont ${
                            sidebarOpen
                              ? "tooltipText text-body-secondary"
                              : "w-100"
                          }`}
                        >
                          {t("Settings")}
                        </span>
                      </Link>
                    </li>

                    <li
                      className={`nav-item d-flex  p-2  gap-2  align-items-end  besideHover width-fit   ${
                        isLogOut && "onSelect"
                      }  `}
                    >
                      <Link
                        href="/login"
                        // onClick={() => {
                        //   setactvv("");
                        // }}
                      >
                        <LogoutIcon
                          className={`iconSize2    ${
                            isLogOut ? "iconcolor" : "iconcolor2"
                          }  `}
                        />
                        <span
                          className={`text-nowrap custfont ${
                            sidebarOpen
                              ? "tooltipText text-body-secondary"
                              : "w-100"
                          }`}
                        >
                          {t("logout")}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className=" bg-white  d-flex  flex-column">
              <div className=" d-flex flex-column h-100">
                {active === "isAdmission" && comp[tit]}
                {active === "isRegistered" && comp[tit]}
                {active === "isEdu" && comp[tit]}
                {active === "users" && comp[tit]}
                {active === "isprogramreg" && comp[tit]}
                {active === "isFinancial" && comp[tit]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
