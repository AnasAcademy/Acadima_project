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
        
        export default function NewSideBar() {

            const [actv , setActv] = useState(false)
 

             
            const t = useTranslations("SidebarA");
            const pathname = usePathname();
            const isPanel = pathname.includes("/org/panel");
            const isEmployeeprogress = pathname.includes(
              "/org/employeeprogress"
            );
            const isTechSupport = pathname.includes("/org/techsupport");
            const isOrgprofile = pathname.includes("/org/orgprofile");
            const isAiAssistant = pathname.includes("/org/ai-assistant");
            const isSettings = pathname.includes("/org/settings");
            const isAdminssion = pathname.includes(
              "/org/admission/"
            );
            const isAdmissionReq = pathname.includes(
              "/org/admission/admission-requirements"
            );
            const isStudentPermission = pathname.includes(
              "/org/admission/student-permission"
            );
            const isAllStudents = pathname.includes(
              "/org/students-records/all-students"
            );
            const isCreateAccount = pathname.includes(
              "/org/students-records/create-account"
            );
            const isSeatReservation = pathname.includes(
              "/org/students-records/seat-reservation"
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
              "/org/electronic-services"
            );
            const isClasses = pathname.includes("/org/classes");
            const isStudentsCodes = pathname.includes("/org/students-codes");
            const isInstructorCodes = pathname.includes(
              "/org/instructor-codes"
            );
            const isCategories = pathname.includes("/org/categories");

            const isSubscriptionmanagement = pathname.includes(
              "/org/subscription-management"
            );
            
            const isNotfiPage = pathname.includes("/org/notifications");
            const admission = [
              {
                tit: "admission-requirements",
                href: "/org/admission/admission-requirements",
                bg: isAdmissionReq,
              },
              {
                tit: "student-permission",
                href: "/org/admission/student-permission",
                bg: isStudentPermission,
              },
              {
                tit: "electronic-services",
                href: "/org/admission-requirements",
                bg: isStudentPermission,
              },
              {
                tit: "classes",
                href: "/org/admission-requirements",
                bg: isStudentPermission,
              },
              {
                tit: "student-codes",
                href: "/org/admission-requirements",
                bg: isStudentPermission,
              },
            ];

            const isRegistered = [
              {
                tit: "all-students",
                href: "/org/admission-requirements",
                
              },
              {
                tit: "create-account-form",
                href: "/org/admission-requirements",
              },
              {
                tit: "seat-reservation-form",
                href: "/org/admission-requirements",
              },
              {
                tit: "direct-registration",
                href: "/org/admission-requirements",
              },
              {
                tit: "scholarship-registration",
                href: "/org/admission-requirements",
              },
              
            ];
           const enrollment = [
             {
               tit: "enrollment-history",
               href: "/org/admission-requirements",
             },
             {
               tit: "add-student-to-class",
               href: "/org/admission-requirements",
             },
           ];

         
            const [tit ,setTit ] = useState([])
             const comp = {
               isAdmission: (
                 <>
                   <Link
                     className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
                     aria-current="page"
                   >
                     {t("admission")}
                   </Link>

                   <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   p-3 pt-1    ">
                     {admission.map((item, index) => {
                       return (
                         <li
                           className={`nav-item d-flex  p-2   w-100  align-items-center  ${item.bg ?  " bg-dark-subtle rounded-3" : ""  }  `}
                           title={t("dashboard")}
                         >
                           <Home className={`iconSize2 iconcolor `} />
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
                     href="/org/panel"
                   >
                     {t("registrations")}
                   </Link>

                   <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   p-3 pt-1    ">
                     {isRegistered.map((item, index) => {
                       return (
                         <li
                           className={`nav-item d-flex  p-2   w-100  align-items-center   `}
                           title={t("dashboard")}
                         >
                           <Home className={`iconSize2 iconcolor `} />
                           <Link
                             className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
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

                   {enrollment.map((item, index) => {
                     return (
                       <li
                         className={`nav-item d-flex  p-2   w-100  align-items-center   `}
                         title={t("dashboard")}
                       >
                         <Home className={`iconSize2 iconcolor `} />
                         <Link
                           className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                         >
                           {t(item.tit)}
                         </Link>
                       </li>
                     );
                   })}
                 </>
               ),
               isEdu: (
                 <>
                   <Link
                     className={` nav-link  Tit-14-700 text-dark text-nowrap p-3 `}
                     aria-current="page"
                     href="/org/panel"
                   >
                     {t("education")}
                   </Link>

                   <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start   p-3 pt-1    ">
                     <li
                       className={`nav-item d-flex  p-2   w-100  align-items-center   `}
                       title={t("dashboard")}
                     >
                       <Home className={`iconSize2 iconcolor `} />
                       <Link
                         className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                       >
                         {t("quizzes")}
                       </Link>
                     </li>

                     <li
                       className={`nav-item d-flex   p-2  w-100  align-items-center     `}
                     >
                       <Stat className={`iconSize2 iconcolor `} />
                       <Link
                         className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                       >
                         {t("assignments")}
                       </Link>
                     </li>

                     <li
                       className={`nav-item d-flex   p-2  w-100  align-items-center     `}
                     >
                       <Stat className={`iconSize2 iconcolor `} />
                       <Link
                         className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                       >
                         {t("courses")}
                       </Link>
                     </li>
                     <li
                       className={`nav-item d-flex   p-2  w-100  align-items-center     `}
                     >
                       <Stat className={`iconSize2 iconcolor`} />
                       <Link
                         className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                       >
                         {t("courses-registration")}
                       </Link>
                     </li>
                     <li
                       className={`nav-item d-flex   p-2  w-100  align-items-center     `}
                     >
                       <Stat
                         className={`iconSize2   ${
                           isEmployeeprogress ? "iconcolor" : "iconcolor2"
                         } `}
                       />
                       <Link
                         className={` nav-link  Tit-14-700 text-dark text-nowrap  `}
                       >
                         {t("bundles")}
                       </Link>
                     </li>
                   </ul>
                 </>
               ),
             };


            function setactvv(loc){
                  
           
                   setActv(!actv)
                   
                  setTit(loc)
                        
            }


          return (
            <>
              <div className=" d-flex flex-column ">
                <div className="  p-3   d-flex flex-column  ">
                  <div className=" pe-3 ">
                    <Link
                      className="text-white text-decoration-none  m-lg-auto  d-flex justify-content-center "
                      role="button"
                      href="/"
                    >
                      <Image
                        src={logo}
                        alt="ai"
                        width={120}
                        height={32}
                        priority
                      />
                    </Link>
                  </div>
                  <div className=" d-flex  mt-md-4   justify-content-center ">
                    <nav className="navbar navbar-light navbar-expand-lg  p-0    ">
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
                              <Link href="/org/employeeprogress">
                                <Stat
                                  className={`iconSize2   ${
                                    isEmployeeprogress
                                      ? "iconcolor"
                                      : "iconcolor2"
                                  } `}
                                />
                              </Link>
                            </li>

                            <li
                              className={`nav-item d-flex  p-2   w-100  align-items-center   `}
                            >
                              <Link href="/org/subscription-management">
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
                              <Link href="/org/notifications">
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
                              <Link href="/org/techsupport">
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
                                <Profile
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
                              <Ai
                                className={`iconSize2   iconcolor2 ${
                                  isStudentPermission
                                    ? "iconcolor2"
                                    : "iconcolor"
                                }  `}
                              />
                              {/* <Link
                            className="nav-link Tit-14-700 Gray-Gray-800 text-white "
                            aria-current="page"
                            href="/org/student-permission"
                          >
                            {t("student-permission")}
                          </Link> */}
                            </li>
                            <li
                              className={`nav-item d-flex  p-2   w-100  align-items-center      `}
                              onClick={() => {
                                setactvv("isenrollment");
                              }}
                            >
                              <Profile
                                className={`iconSize2  iconcolor2  ${
                                  isElectronicServices
                                    ? "iconcolor2"
                                    : "iconcolor"
                                }  `}
                              />
                              {/* <Link
                            className="nav-link Tit-14-700 Gray-Gray-800 text-white "
                            aria-current="page"
                            href="/org/electronic-services"
                          >
                            {t("electronic-services")}
                          </Link> */}
                            </li>
                            <li
                              className={`nav-item d-flex  p-2   w-100  align-items-center   `}
                              onClick={() => {
                                setactvv("isEdu");
                              }}
                            >
                              <Profile
                                className={`iconSize2  iconcolor2  ${
                                  isClasses ? "iconcolor2" : "iconcolor"
                                }  `}
                              />
                              {/* <Link
                            className="nav-link Tit-14-700 Gray-Gray-800 text-white "
                            aria-current="page"
                            href="/org/classes"
                          >
                            {t("classes")}
                          </Link> */}
                            </li>
                            <li
                              className={`nav-item d-flex  p-2   w-100  align-items-center   `}
                            >
                              <Profile
                                className={`iconSize2  iconcolor2  ${
                                  isStudentsCodes ? "iconcolor2" : "iconcolor"
                                }  `}
                              />
                              {/* <Link
                            className="nav-link Tit-14-700 Gray-Gray-800 text-white "
                            aria-current="page"
                            href="/org/students-codes"
                          >
                            {t("student-codes")}
                          </Link> */}
                            </li>
                            <li
                              className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                                isInstructorCodes ? "cardbg  rounded-4   " : ""
                              }   `}
                            >
                              <Profile
                                className={`iconSize2   iconcolor2 ${
                                  isInstructorCodes ? "iconcolor2" : "iconcolor"
                                }  `}
                              />
                              {/* <Link
                            className="nav-link Tit-14-700 Gray-Gray-800 text-white "
                            aria-current="page"
                            href="/org/instructor-codes"
                          >
                            {t("instructor-codes")}
                          </Link> */}
                            </li>
                            <li
                              className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                                isCategories ? "cardbg  rounded-4   " : ""
                              }   `}
                            >
                              <Profile
                                className={`iconSize2  iconcolor2  ${
                                  isCategories ? "iconcolor2" : "iconcolor"
                                }  `}
                              />
                              {/* <Link
                            className="nav-link Tit-14-700 Gray-Gray-800 text-white "
                            aria-current="page"
                            href="/org/categories"
                          >
                            {t("categories")}
                          </Link> */}
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
        