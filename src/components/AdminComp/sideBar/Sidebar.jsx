"use client";
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import logo from '../../../assets/admin/logo2.png'
import Home from "../../../assets/admin/home.svg";
import Stat from "../../../assets/admin/stat.svg";
import Card from "../../../assets/admin/card.svg";
import Notif from "../../../assets/admin/notif.svg";
import Option from "../../../assets/admin/option.svg";
import Profile from "../../../assets/admin/profile.svg";
import Ai from "../../../assets/admin/ai.svg";
import HelpIcon from "../../../assets/admin/helpIcon.svg";
import Setting from "../../../assets/admin/setting.svg";
import bk  from "../../../assets/admin/Background.png"
import pwr from "@/assets/Sidebar icons/powered.png";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const t = useTranslations('SidebarA');
  const pathname = usePathname();
  const isPanel = pathname.includes("/org/panel");
  const isEmployeeprogress = pathname.includes("/org/employeeprogress");
  const isTechSupport = pathname.includes("/org/techsupport");
  const isOrgprofile = pathname.includes("/org/orgprofile");

  const isSubscriptionmanagement = pathname.includes(
    "/org/subscription-management"
  );
  const isNotfiPage = pathname.includes("/org/notifications");






  return (
    <>
      <div className=" p-3  d-flex flex-column ">
        <nav className="navbar navbar-light navbar-expand-lg     mt-md-4">
          <div className="container-fluid  d-flex flex-sm-row flex-lg-column flex-row flex-md-row flex-xl-column min-vh-lg-100   align-items-start p-0  ">
            <Link
              className="text-white text-decoration-none  m-lg-auto  d-flex justify-content-center "
              role="button"
              href="/"
            >
              <Image src={logo} alt="" width={120} height={32} priority />
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
                    isEmployeeprogress ? "cardbg  rounded-2 " : ""
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
                  <Link
                    className="nav-link Tit-12-700 Gray-Gray-700 "
                    aria-current="page"
                    href="/org/orgprofile"
                  >
                    {t("Account Management")}
                  </Link>
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
                    "option" === "ai" ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Ai
                    className={`iconSize2   ${
                      1 == 0 ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800"
                    aria-current="page"
                    href="/org/employeeprogress"
                  >
                    {t("AI Assistant")}
                  </Link>
                </li>

                <li
                  className={`nav-item d-flex  p-2   w-100  align-items-center   ${
                    "option" === "sett" ? "cardbg  rounded-4   " : ""
                  }   `}
                >
                  <Setting className="iconSize2 iconcolor" />
                  <Link
                    className="nav-link Tit-14-700 Gray-Gray-800 "
                    aria-current="page"
                    href="/org/employeeprogress"
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
            <Image src={bk} width={250} height={169.5} />
          </div>
        </div>

        <div className=" d-flex justify-content-center gap-1 mt-2   ">
          <Image src={logo} width={60} height={18} priority className=" mt-1" />
          <p>Powered By</p>
        </div>
      </div>
    </>
  );
}
