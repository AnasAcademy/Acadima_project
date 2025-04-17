"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import dashboard from "@/assets/Sidebar icons/dashboard.svg";
import admission from "@/assets/Sidebar icons/admission.png";
import classes from "@/assets/Sidebar icons/classes.svg";
import certificate from "@/assets/Sidebar icons/certificate.png";
import notifi from "@/assets/Sidebar icons/notifications.png";
import schedule from "@/assets/Sidebar icons/schedule.png";
import settings from "@/assets/Sidebar icons/settings.png";
import logout from "@/assets/Sidebar icons/logout.svg";
import logo from "@/assets/Sidebar icons/sidebarLogo.png";
import line from "@/assets/Sidebar icons/Line 48.png";

export default function Sidebar() {
  const t = useTranslations("Sidebar");

  const [actv, setActv] = useState("");

  useEffect(() => {
    setActv("first");
  }, [setActv]);

  return (
    <>
      <div className=" d-flex     ">
        <div className="     flex-column   d-flex ">
          <nav className="navbar navbar-dark navbar-expand-lg  ">
            <div
              className="container-fluid  d-flex flex-sm-row flex-lg-column flex-row flex-md-row flex-xl-column min-vh-lg-100  justify-content-center   align-items-start p-0 sidebar    "
              style={{ gap: "61px" }}
            >
              <Image
                src={logo}
                alt="acadimaLogo"
                className="d-none  d-sm-none d-md-none d-lg-flex"
              />

              <button
                className="navbar-toggler "
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
                className="collapse navbar-collapse    "
                id="navbarSupportedContent "
              >
                <ul
                  className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start    p-0 "
                  style={{ gap: "20px" }}
                >
                  <li
                    className={`nav-item d-flex w-100  text-white align-items-center mt-2 `}
                  >
                    <Image src={dashboard} alt="Dashboard" />
                    <Link
                      className="nav-link hvv"
                      aria-current="page"
                      href="/dashboard"
                    >
                      {t("dashboard")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white  align-items-center   `}
                  >
                    <Image src={admission} alt="admission" />
                    <Link
                      className="nav-link hvv"
                      aria-current="page"
                      href="/admissions"
                    >
                      {t("Subscription Management")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white  align-items-center  `}
                  >
                    <Image src={classes} alt="classes" />
                    <Link
                      className="nav-link hvv"
                      aria-current="page"
                      href="/courses"
                    >
                      {t("Notifications")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white  align-items-center `}
                  >
                    <Image src={certificate} alt="Dashboard" />
                    <Link
                      className="nav-link hvv"
                      aria-current="page"
                      href="/certificates"
                    >
                      {t("Technical Support")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white align-items-center  `}
                  >
                    <Image src={notifi} alt="notification" />
                    <Link
                      className="nav-link hvv"
                      aria-current="page"
                      href="/engagement/progress-tracker"
                    >
                      {t("Account Management")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white align-items-center  `}
                  >
                    <Image src={schedule} alt="Dashboard" />
                    <Link
                      className="nav-link hvv"
                      aria-current="page"
                      href="/services"
                    >
                      {t("elctro")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white  align-items-center `}
                  >
                    <Image src={settings} alt="Dashboard" />
                    <Link
                      className="nav-link hvv"
                      aria-current="page"
                      href="/org-settings"
                    >
                      {t("AI Assistant")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white  align-items-center `}
                  >
                    <Image src={logout} alt="Dashboard" />
                    <Link
                      className="nav-link hvv"
                      aria-current="page"
                      href="/org-settings"
                    >
                      {t("logout")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className=" d-none  d-sm-none d-md-none d-lg-flex d-xl-flex mt-5">
          <Image src={line} alt="line" />
        </div>
      </div>
    </>
  );
}
