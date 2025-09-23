"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";

// Icons
import DashboardIcon from "@/assets/Sidebar icons/dashboard.svg";
import AdmissionIcon from "@/assets/Sidebar icons/admission.svg";
import ClassesIcon from "@/assets/Sidebar icons/classes.svg";
import CertificateIcon from "@/assets/Sidebar icons/certifi.svg";
import NotifiIcon from "@/assets/Sidebar icons/nottfi.svg";
import ScheduleIcon from "@/assets/Sidebar icons/schedule.svg";
import SettingsIcon from "@/assets/Sidebar icons/settings.svg";
import PaymentIcon from "@/assets/Sidebar icons/payment.svg";
import HelpIcon from "@/assets/admin/helpIcon.svg";

// Components
import LogoutButton from "@/components/LogoutButton/LogoutButton";

// Assets
import logo from "@/assets/admin/logo2.png";
import bk from "@/assets/admin/Background.png";

export default function Sidebar() {
  const t = useTranslations("Sidebar");
  const ts = useTranslations("SidebarA");

  const pathname = usePathname();

  const [inMobile, setInMobile] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => setIsMenuVisible((prev) => !prev);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      setInMobile(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Menu items
  const menuItems = [
    {
      href: "/panel",
      icon: DashboardIcon,
      active: pathname.includes("/panel"),
      label: t("dashboard"),
    },
    {
      href: "/admissions",
      icon: AdmissionIcon,
      active: pathname.includes("/admissions"),
      label: t("Subscription Management"),
    },
    {
      href: "/courses",
      icon: ClassesIcon,
      active: pathname.includes("/courses"),
      label: t("Notifications"),
    },
    {
      href: "/certificates",
      icon: CertificateIcon,
      active: pathname.includes("/certificates"),
      label: t("Technical Support"),
    },
    {
      href: "/assignments",
      icon: ScheduleIcon,
      active: pathname.includes("/assignments"),
      label: t("assignments"),
    },
    {
      href: "/quizzes",
      icon: ScheduleIcon,
      active: pathname.includes("/quizzes"),
      label: t("quizzes"),
    },
    {
      href: "/paymentplans",
      icon: PaymentIcon,
      active: pathname.includes("/paymentplans"),
      label: t("pay_pro_fees"),
    },
    {
      href: "/installments",
      icon: PaymentIcon,
      active: pathname.includes("/installments"),
      label: t("installments"),
    },
    {
      href: "/notifications",
      icon: NotifiIcon,
      active: pathname.includes("/notifications"),
      label: t("Account Management"),
    },
    {
      href: "/services",
      icon: ScheduleIcon,
      active: pathname.includes("/services"),
      label: t("elctro"),
    },
    {
      href: "/settings",
      icon: SettingsIcon,
      active: pathname.includes("/settings"),
      label: t("AI Assistant"),
    },
  ];

  return (
    <div className={` p-3 d-flex flex-column bg-white ${isMenuVisible ? "w-75" : "w-100"} `}>
      <nav className="navbar navbar-light navbar-expand-lg">
        <div className="container-fluid d-flex flex-sm-row flex-lg-column flex-row flex-md-row flex-xl-column min-vh-lg-100 align-items-start p-0">
          {/* Mobile Logo */}
          <div className="d-lg-none d-flex">
            <Link
              className="text-white text-decoration-none m-lg-auto d-flex justify-content-center"
              role="button"
              href="/"
            >
              <Image src={logo} alt="logo" width={120} height={32} priority />
            </Link>
          </div>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuVisible}
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div
            id="navbarSupportedContent"
            className={`collapse navbar-collapse ms-4 me-4 mt-4 ${
              isMenuVisible ? "show" : ""
            }`}
          >
            <ul className="navbar-nav d-lg-flex flex-lg-column justify-content-start align-items-start p-0">
              {menuItems.map((item, i) => (
                <li
                  key={i}
                  className={`nav-item d-flex p-2 w-100 align-items-center ${
                    item.active ? "cardbg rounded-4" : ""
                  }`}
                >
                  <item.icon
                    className={`iconSize2 ${
                      item.active ? "iconcolor2" : "iconcolor"
                    }`}
                  />
                  <Link className="nav-link Tit-14-700" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}

              {/* Logout */}
              <li className="nav-item d-flex p-2 w-100 align-items-center">
                <LogoutButton className="iconSize2 iconcolor" />
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
        <Image src={bk} alt="background" width={250} height={169.5} />
      </div>

      {/* Powered by */}
      <div className="powered d-flex justify-content-center gap-2 align-items-center p-2">
        <p className="p-0 m-0">Powered By</p>
        <Image src={logo} alt="logo" width={60} height={18} priority />
      </div>
    </div>
  );
}
