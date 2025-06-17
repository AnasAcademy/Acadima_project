"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";

import DashboardIcon from "@/assets/Sidebar icons/dashboard.svg";
import AdmissionIcon from "@/assets/Sidebar icons/admission.svg";
import ClassesIcon from "@/assets/Sidebar icons/classes.svg";
import CertificateIcon from "@/assets/Sidebar icons/certifi.svg";
import NotifiIcon from "@/assets/Sidebar icons/nottfi.svg";
import ScheduleIcon from "@/assets/Sidebar icons/schedule.svg";
import SettingsIcon from "@/assets/Sidebar icons/settings.svg";
import PaymentIcon from "@/assets/Sidebar icons/payment.svg";
import HelpIcon from "@/assets/admin/helpIcon.svg";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import logo from "@/assets/admin/logo2.png";
import bk from "@/assets/admin/Background.png";

export default function Sidebar() {
  const t = useTranslations("Sidebar");
  const ts = useTranslations("SidebarA");

  const pathname = usePathname();

  const isCoursesPage = pathname.includes("/courses");
  const isDashPage = pathname.includes("/panel");
  const isAdminPage = pathname.includes("/admissions");
  const isCertfiPage = pathname.includes("/certificates");
  const isPayPage = pathname.includes("/paymentplans");
  const isInstallments = pathname.includes("/installments");
  const isNotfiPage = pathname.includes("/notifications");
  const isServPage = pathname.includes("/services");
  const isSettPage = pathname.includes("/settings");
  const isQuizzesPage = pathname.includes("/quizzes");

  const [actv, setActv] = useState("");

  const toggle = (index) => {
    setActv(index);
  };

  return (
    <>
      <div className="p-3 d-flex flex-column">
        <nav className="navbar navbar-light navbar-expand-lg mt-md-4">
          <div className="container-fluid d-flex flex-sm-row flex-lg-column flex-row flex-md-row flex-xl-column min-vh-lg-100 align-items-start p-0">
            <Link
              className="text-white text-decoration-none m-lg-auto d-flex justify-content-center"
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
              className="collapse navbar-collapse ms-4 me-4 mt-5"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav d-lg-flex flex-lg-column justify-content-start align-items-start p-0">
                <li
                  className={`nav-item d-flex p-2 w-100 align-items-center ${
                    isDashPage ? "cardbg rounded-4" : ""
                  }`}
                  onClick={() => toggle("das")}
                >
                  <DashboardIcon
                    className={`iconSize2  ${
                      isDashPage ? "iconcolor2" : "iconcolor"
                    }`}
                  />
                  <Link className="nav-link Tit-14-700" href="/panel">
                    {t("dashboard")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex p-2 w-100 align-items-center ${
                    isAdminPage ? "cardbg rounded-4" : ""
                  }`}
                  onClick={() => toggle("admiss")}
                >
                  <AdmissionIcon
                    className={`iconSize2 ${
                      isAdminPage ? "iconcolor2" : "iconcolor"
                    }`}
                  />
                  <Link className="nav-link Tit-14-700" href="/admissions">
                    {t("Subscription Management")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex p-2 w-100 align-items-center ${
                    isCoursesPage ? "cardbg rounded-4" : ""
                  }`}
                  onClick={() => toggle("class")}
                >
                  <ClassesIcon
                    className={`iconSize2 ${
                      isCoursesPage ? "iconcolor2" : "iconcolor"
                    }`}
                  />
                  <Link className="nav-link Tit-14-700" href="/courses">
                    {t("Notifications")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex p-2 w-100 align-items-center ${
                    isCertfiPage ? "cardbg rounded-4" : ""
                  }`}
                  onClick={() => toggle("cert")}
                >
                  <CertificateIcon
                    className={`iconSize2 ${
                      isCertfiPage ? "iconcolor2" : "iconcolor"
                    }`}
                  />
                  <Link className="nav-link Tit-14-700" href="/certificates">
                    {t("Technical Support")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex p-2 w-100 align-items-center ${
                    isQuizzesPage ? "cardbg rounded-4" : ""
                  }`}
                  onClick={() => toggle("cert")}
                >
                  <ScheduleIcon
                    className={`iconSize2 ${
                      isQuizzesPage ? "iconcolor2" : "iconcolor"
                    }`}
                  />
                  <Link className="nav-link Tit-14-700" href="/quizzes">
                    {t("quizzes")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex p-2 w-100 align-items-center ${
                    isPayPage ? "cardbg rounded-4" : ""
                  }`}
                  onClick={() => toggle("pay")}
                >
                  <PaymentIcon
                    className={`iconSize2 ${
                      isPayPage ? "iconcolor2" : "iconcolor"
                    }`}
                  />
                  <Link className="nav-link Tit-14-700" href="/paymentplans">
                    {t("pay_pro_fees")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex p-2 w-100 align-items-center ${
                    isInstallments ? "cardbg rounded-4" : ""
                  }`}
                  onClick={() => toggle("pay")}
                >
                  <PaymentIcon
                    className={`iconSize2 ${
                      isInstallments ? "iconcolor2" : "iconcolor"
                    }`}
                  />
                  <Link className="nav-link Tit-14-700" href="/installments">
                    {t("installments")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex p-2 w-100 align-items-center ${
                    isNotfiPage ? "cardbg rounded-4" : ""
                  }`}
                  onClick={() => toggle("notif")}
                >
                  <NotifiIcon
                    className={`iconSize2 ${
                      isNotfiPage ? "iconcolor2" : "iconcolor"
                    }`}
                  />
                  <Link className="nav-link Tit-14-700" href="/notifications">
                    {t("Account Management")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex p-2 w-100 align-items-center ${
                    isServPage ? "cardbg rounded-4" : ""
                  }`}
                  onClick={() => toggle("sch")}
                >
                  <ScheduleIcon
                    className={`iconSize2 ${
                      isServPage ? "iconcolor2" : "iconcolor"
                    }`}
                  />
                  <Link className="nav-link Tit-14-700" href="/services">
                    {t("elctro")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex p-2 w-100 align-items-center ${
                    isSettPage ? "cardbg rounded-4" : ""
                  }`}
                  onClick={() => toggle("sett")}
                >
                  <SettingsIcon
                    className={`iconSize2 ${
                      isSettPage ? "iconcolor2" : "iconcolor"
                    }`}
                  />
                  <Link className="nav-link Tit-14-700" href="/settings">
                    {t("AI Assistant")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex p-2 w-100 align-items-center ${
                    actv === "log" ? "cardbg rounded-4" : ""
                  }`}
                  onClick={() => toggle("log")}
                >
                  <LogoutButton
                    className={`iconSize2 ${
                      actv === "log" ? "iconcolor2" : "iconcolor"
                    }`}
                  />
                  
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Promo Section */}
        <div className="bg-container m-4 d-lg-flex d-sm-none d-none position-relative">
          <div className="d-flex flex-column position-absolute gap-1 p-3">
            <HelpIcon className="iconSize2 iconcolor" />
            <h4 className="Tit-14-700 white-c mb-0">{ts("ad1")}</h4>
            <h6 className="tit-12-400 white-c">{ts("ad2")}</h6>
            <button className="btn btn-light tit-10-700 Gray-Gray-700 btn-custom">
              {ts("ad3")}
            </button>
          </div>
          <Image src={bk} alt="ai" width={250} height={169.5} />
        </div>

        {/* Powered by */}
        <div className="powered d-flex justify-content-center gap-1">
          <p>Powered By</p>
          <Image
            src={logo}
            alt="ai"
            width={60}
            height={18}
            priority
            className="mt-1"
          />
        </div>
      </div>
    </>
  );
}
