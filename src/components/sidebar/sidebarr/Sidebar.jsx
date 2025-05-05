"use client";
import React, { useEffect, useState } from "react";
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
import logo from "@/assets/Sidebar icons/sidebarLogo.png";
import line from "@/assets/Sidebar icons/Line 48.png";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import PaymentIcon from "@/assets/Sidebar icons/payment.svg";

export default function Sidebar() {
  const t = useTranslations("Sidebar");

  const [actv, setActv] = useState("");

  useEffect(() => {
    setActv("first");
  }, [setActv]);

  return (
    <>
      <div className="d-flex">
        <div className="flex-column   d-flex">
          <nav className="navbar navbar-dark navbar-expand-lg  ">
            <div
              className="container-fluid  d-flex flex-sm-row flex-lg-column flex-row flex-md-row flex-xl-column min-vh-lg-100  justify-content-center   align-items-start p-0 sidebar    "
              style={{ gap: "61px" }}
            >
              <Image
                src={logo}
                alt="acadimaLogo"
                className="d-none  d-sm-none  d-lg-flex"
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
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul
                  className="navbar-nav   d-lg-flex  flex-lg-column  justify-content-start align-items-start  p-0 "
                  style={{ gap: "20px" }}
                >
                  <li
                    className={`nav-item d-flex w-100  text-white align-items-center mt-2  gap-2 `}
                  >
                    <DashboardIcon className="iconSize1 iconcolor" />
                    <Link
                      className="nav-link hvv text-nowrap"
                      aria-current="page"
                      href="/dashboard"
                    >
                      {t("dashboard")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white  align-items-center  gap-2  `}
                  >
                    <AdmissionIcon className="iconSize1 iconcolor" />
                    <Link
                      className="nav-link hvv text-nowrap"
                      aria-current="page"
                      href="/admissions"
                    >
                      {t("Subscription Management")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white  align-items-center  gap-2 `}
                  >
                    <ClassesIcon className="iconSize1 iconcolor" />
                    <Link
                      className="nav-link hvv text-nowrap"
                      aria-current="page"
                      href="/courses"
                    >
                      {t("Notifications")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white  align-items-center   gap-2`}
                  >
                    <CertificateIcon className="iconSize1 iconcolor" />
                    <Link
                      className="nav-link hvv text-nowrap"
                      aria-current="page"
                      href="/certificates"
                    >
                      {t("Technical Support")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white  align-items-center  gap-2 `}
                  >
                    <PaymentIcon className="iconSize1 iconcolor" />
                    <Link
                      className="nav-link hvv text-nowrap"
                      aria-current="page"
                      href="/paymentplans"
                    >
                      {t("pay_pro_fees")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white align-items-center  gap-2 `}
                  >
                    <NotifiIcon className="iconSize1 iconcolor" />
                    <Link
                      className="nav-link hvv text-nowrap"
                      aria-current="page"
                      href="/notifications"
                    >
                      {t("Account Management")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white align-items-center  gap-2  `}
                  >
                    <ScheduleIcon className="iconSize1 iconcolor" />
                    <Link
                      className="nav-link hvv text-nowrap"
                      aria-current="page"
                      href="/services"
                    >
                      {t("elctro")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white  align-items-center  gap-2`}
                  >
                    <SettingsIcon
                      className="iconSize1 iconcolor"
                
                    />
                    <Link
                      className="nav-link hvv"
                      aria-current="page"
                      href="/settings"
                    >
                      {t("AI Assistant")}
                    </Link>
                  </li>

                  <li
                    className={`nav-item d-flex text-white  align-items-center   `}
                  >
                    <LogoutButton />
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
