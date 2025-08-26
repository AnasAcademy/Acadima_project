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
import Acc3 from "@/assets/admin/accmange3.svg";
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
  const [actv, setActv] = useState(false);
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
  const isprostatic = pathname.includes("/org/education/programs-statistics");
  const isBundlesStats = pathname.includes(
    "/org/education/programs-statistics/bundles"
  );
  const isFin = pathname.includes("/org/financial/");
  const isWebinarsStats = pathname.includes(
    "/org/education/programs-statistics/webinars"
  );
  const isQuizzes = pathname.includes("/org/education/quizzes");
  const isAssignments = pathname.includes("/org/education/assignments");
  const education = isQuizzes || isAssignments;

  const isCourses = pathname.includes("/org/education/courses");
  const isCertificates = pathname.includes("/org/education/certificates");
  const isCoursesRegistration = pathname.includes(
    "/org/education/course-registration"
  );
  const isBundles = pathname.includes("/org/education/bundles");
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
  const isUsersNewacc = pathname.includes(
    "/org/user-management/users/new-user"
  );
  const isPlans = pathname.includes("/org/plans");
  const isUsersRoles = pathname.includes("/org/user-management/users/roles");
  const isUsersgroups = pathname.includes("/org/user-management/users/groups");
  const isUsersaccs = pathname.includes(
    "/org/user-management/users/not-access-to-content"
  );
  const isLogOut = pathname.includes("/org/logout");
  const isNotfiPage = pathname.includes("/org/notifications");
  // const isAccMange = isOrgprofile || isAiAssistant || isSettings;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [AiChatOpen, setAiChatOpen] = useState(false);

  const [openIndex, setOpenIndex] = useState(null);

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
        },
        {
          tit: "courses_webinars",
          href: "/org/education/courses/webinars",
        },
        {
          tit: "graduation_projects",
          href: "/org/education/courses/graduation-projects",
        },
        {
          tit: "text_lessons",
          href: "/org/education/courses/text-lessons",
        },
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
        },
        {
          tit: "bridging_programs",
          href: "/org/education/bundles/bridging-programs",
        }
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
        },
        {
          tit: "course_certificates",
          href: "/org/education/certificates/course-certificate",
        },
        {
          tit: "certificate_templates",
          href: "/org/education/certificates/certificate-templates",
        },
      ],
    },
  ];

  const proreg = [
    {
      icon: User7,
      tit: "bundles",
      href: "/org/education/programs-statistics/bundlesStats",
      bg: isBundlesStats,
    },
    {
      icon: User8,
      tit: "webinars",
      href: "/org/education/programs-statistics/webinars",
      bg: isWebinarsStats,
    },
  ];
  const finan = [
    {
      icon: Balance,
      tit: "balances",
      href: "/org/financial/balances",
      bg: isBundlesStats,
    },
    {
      icon: User9,
      tit: "sales-list",
      href: "/org/financial/sales-list",
      bg: isWebinarsStats,
    },
    {
      icon: User10,
      tit: "offline-payments",
      href: "/org/financial/sales-list",
      bg: isWebinarsStats,
    },
    {
      icon: User11,
      tit: "installments",
      href: "/org/financial/sales-list",
      bg: isWebinarsStats,
    },
    {
      icon: User12,
      tit: "discount-codes",
      href: "/org/financial/sales-list",
      bg: isWebinarsStats,
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
    {
      icon: User6,
      tit: "not-access-to-content",
      href: "/org/user-management/not-access-to-content",
      bg: isUsersaccs,
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
        <div className=" d-flex   flex-column h-100  newSidebarpadding ">
          <Link
            className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
            aria-current="page"
          >
            {t("education")}
          </Link>
          <ul className="navbar-nav d-lg-flex flex-lg-column justify-content-start align-items-start">
            {edu.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = openIndex === index;

              return (
                <li
                  key={index}
                  className=" d-flex flex-column p-2 cursor-pointer"
                >
                  <div
                    className={`d-flex w-100 align-items-center ${
                      isOpen ? "active-bg rounded-2" : ""
                    }`}
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
                      <span className=" tit-14-400 text-dark text-nowrap">
                        {t(item.tit)}
                        <item.arrow className="iconcolor m-1 " />
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
                        <li key={cIdx} className=" d-flex align-items-center">
                          {/* <item.icon2 className="iconcolor m-1"/> */}
                          <Link
                            className="nav-link tit-14-400 text-dark text-nowrap"
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
        <div className=" d-flex   flex-column h-100  newSidebarpadding ">
          <Link
            className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
            aria-current="page"
          >
            {t("financial")}
          </Link>
          <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   newsidebarr    ">
            {finan.map((item, index) => {
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

  function setactvv(loc) {
  setActv(prev => {
    const next = !prev;          // toggle
    if (next && loc) setTit(loc); // only set title when opening
    // optional: when closing you could clear the title
    // if (!next) setTit("");
    return next;
  });
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
                          setactvv("");
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
                          setactvv("");
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
                          setactvv("");
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
                          setactvv("");
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
                        setactvv("isAdmission");
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
                        studentsRecords && "onSelect"
                      }      `}
                      onClick={() => {
                        setactvv("isRegistered");
                      }}
                    >
                      <p
                        // href="/org/students-records/all-students"
                        className="d-flex  p-2 m-0 cursor-pointer  gap-2  align-items-end"
                      >
                        <ClassesIcon
                          className={`iconSize1   ${
                            studentsRecords ? "iconcolor" : "iconcolor2"
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
                        setactvv("isEdu");
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
                        setactvv("users");
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
                        setactvv("isprogramreg");
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
                        setactvv("isFinancial");
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
                      <p
                        // href="/org/subscription-management"
                        className="d-flex  p-2 m-0 cursor-pointer  gap-2  align-items-end"
                        onClick={() => {
                          setactvv("");
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
                      </p>
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
                      className={`nav-item d-flex  p-2  gap-2  align-items-end  besideHover width-fit  ${
                        isSettings && "onSelect"
                      }  `}
                    >
                      <Link
                        href="/org/settings"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <Acc3
                          className={`iconSize1    ${
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
                      className={`nav-item d-flex  p-2  gap-2  align-items-end  besideHover width-fit  ${
                        isLogOut && "onSelect"
                      }  `}
                    >
                      <Link
                        href="/login"
                        onClick={() => {
                          setactvv("");
                        }}
                      >
                        <LogoutIcon
                          className={`iconSize2    ${
                            isLogOut
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
                {actv && <>{comp[tit]}</>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
