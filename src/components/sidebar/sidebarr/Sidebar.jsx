"use client";
import React, {useContext,  useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import DashboardIcon from "@/assets/Sidebar icons/dashboard.svg";
import AdmissionIcon from "@/assets/Sidebar icons/admission.svg";
import ClassesIcon from "@/assets/Sidebar icons/classes.svg";
import CertificateIcon from "@/assets/Sidebar icons/certifi.svg";
import NotifiIcon from "@/assets/Sidebar icons/nottfi.svg";
import ScheduleIcon from "@/assets/Sidebar icons/schedule.svg";
import SettingsIcon from "@/assets/Sidebar icons/settings.svg";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import PaymentIcon from "@/assets/Sidebar icons/payment.svg";
import logo from "../../../assets/admin/logo2.png";
import HelpIcon from "../../../assets/admin/helpIcon.svg";
import bk from "../../../assets/admin/Background.png";
import { usePathname } from 'next/navigation';
import pwr from '@/assets/Sidebar icons/powered.png'




export default function Sidebar() {
  const t = useTranslations("Sidebar");
  const [isRotating, setIsRotating] = useState(false);

  const [isButtVis, setIsButtVis] = useState(true);

  const pathname = usePathname();

  const [actv, setActv] = useState("");

  const ts = useTranslations("SidebarA");

  const isCoursesPage = pathname.includes("/courses");
  const isDashPage = pathname.includes("/panel");
  const isAdminPage = pathname.includes("/admissions");
  const isCertfiPage = pathname.includes("/certificates");
  const isPayPage = pathname.includes("/paymentplans");
  const isNotfiPage = pathname.includes("/notifications");
  const isServPage = pathname.includes("/services");
  const isSettPage = pathname.includes("/settings");

  function toggle(index) {
    setActv(index);
  }

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 992) {
        // Bootstrap's 'lg' breakpoint
        setIsButtVis(true); // Button is visible on smaller screens
      } else {
        setIsButtVis(false); // Button is hidden on larger screens
      }
    };

    // Check screen size on initial load
    checkScreenSize();

    // Add event listener on resize
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [setActv]);

  useEffect(() => {}, []);

  const handleToggle = () => {
    const sidebar = document.getElementById("navbarSupportedContent");
    sidebar.classList.toggle("show");

    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 200); // stop after 1 second
  };

  return (
    <>
      <div
        className=" p-3 ps-lg-0 pe-lg-0  d-flex flex-column   "
   >
        <nav className="navbar navbar-light navbar-expand-lg       ">
          <div className="container-fluid  d-flex  flex-sm-row-reverse flex-lg-column flex-row-reverse flex-md-row-reverse flex-xl-column    align-items-start   p-0   ">
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
              className="collapse navbar-collapse ms-4 me-4 mt-lg-5    "
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start  vh-100      pt-sm-4 pt-4 pt-lg-0 ">
                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isDashPage ? "cardbg  rounded-4   " : ""
                  }   `}
                  onClick={() => {
                    toggle("das");
                  }}
                >
                  <DashboardIcon
                    className={`cust-iconSize  p-1 ${
                      isDashPage ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className={` nav-link  Tit-14-700 `}
                    aria-current="page"
                    href="/panel"
                  >
                    {t("dashboard")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex   p-2  w-100  align-items-center   ${
                    isAdminPage ? "cardbg  rounded-2 " : ""
                  }   `}
                  onClick={() => {
                    toggle("admiss");
                  }}
                >
                  <AdmissionIcon
                    className={`cust-iconSize p-1  ${
                      isAdminPage ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800 "
                    aria-current="page"
                    href="/admissions"
                  >
                    {t("Subscription Management")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isCoursesPage ? "cardbg  rounded-4   " : ""
                  }   `}
                  onClick={() => {
                    toggle("class");
                  }}
                >
                  <ClassesIcon
                    className={`cust-iconSize p-1  ${
                      isCoursesPage ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link  Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/courses"
                  >
                    {t("Notifications")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isCertfiPage ? "cardbg  rounded-4   " : ""
                  }   `}
                  onClick={() => {
                    toggle("cert");
                  }}
                >
                  <CertificateIcon
                    className={`cust-iconSize p-1  ${
                      isCertfiPage ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link  Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/certificates"
                  >
                    {t("Technical Support")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isPayPage ? "cardbg  rounded-4   " : ""
                  }   `}
                  onClick={() => {
                    toggle("pay");
                  }}
                >
                  <PaymentIcon
                    className={`cust-iconSize p-1 ${
                      isPayPage ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800 "
                    aria-current="page"
                    href="/paymentplans"
                  >
                    {t("pay_pro_fees")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isNotfiPage ? "cardbg  rounded-4   " : ""
                  }   `}
                  onClick={() => {
                    toggle("notif");
                  }}
                >
                  <NotifiIcon
                    className={`cust-iconSize p-1  ${
                      isNotfiPage ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/notifications"
                  >
                    {t("Account Management")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isServPage ? "cardbg  rounded-4   " : ""
                  }   `}
                  onClick={() => {
                    toggle("sch");
                  }}
                >
                  <ScheduleIcon
                    className={`cust-iconSize  p-1 ${
                      isServPage ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/services"
                  >
                    {t("elctro")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    isSettPage ? "cardbg  rounded-4   " : ""
                  }   `}
                  onClick={() => {
                    toggle("sett");
                  }}
                >
                  <SettingsIcon
                    className={`cust-iconSize  p-1 ${
                      isSettPage ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/settings"
                  >
                    {t("AI Assistant")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    actv === "log" ? "cardbg  rounded-4   " : ""
                  }   `}
                  onClick={() => {
                    toggle("log");
                  }}
                >
                  <LogoutButton
                    className={`cust-iconSize p-1  ${
                      actv === "log" ? "iconcolor2 " : "iconcolor"
                    }  `}
                  />

                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800 "
                    aria-current="page"
                    href="/org-settings"
                  ></Link>
                </li>

                <div className="bg-container m-4 d-lg-flex d-sm-none d-none   position-relative ">
                  <div className="d-flex  flex-column  position-absolute  gap-1  p-3 ">
                    <HelpIcon className="iconSize2 iconcolor" />
                    <h4 className="Tit-14-700 white-c  mb-0">{ts("ad1")}</h4>
                    <h6 className="tit-12-400 white-c ">{ts("ad2")}</h6>
                    <button className="btn btn-light tit-10-700  Gray-Gray-700 btn-custom ">
                      {ts("ad3")}
                    </button>
                  </div>

                  <div className="   ">
                    <Image src={bk} alt="ai" width={250} height={169.5} />
                  </div>
                </div>

                <div className=" d-flex justify-content-center gap-1 mt-2    w-100">
                  <Image
                    src={logo}
                    alt="ai"
                    width={60}
                    height={18}
                    priority
                    className=" mt-1"
                  />
                  <p>Powered By</p>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
