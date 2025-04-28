"use client";

import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/languageSwitcher/LanguageSwitcher";
import mainlogo from "@/assets/navbar assets/mainlogo.png";
import notfi from "@/assets/navbar assets/notifi.svg";
import line from "@/assets/navbar assets/Line 49.svg";
import circle from "@/assets/navbar assets/Ellipse 16.svg";
import Sidebar from "../sidebarr/Sidebar";
import messagebar from "@/assets/notifCard/dialog_box_line.svg";
import Link from "next/link";
import { NotificationContext } from "@/context/NotificationContext";

const Navbar = () => {
  const [show, setShow] = useState("");
  const { info, setKey } = useContext(NotificationContext);
  const t = useTranslations("Navbar");
  const notfiRef = useRef();

  function toggle() {
    if (show === "show") {
      setShow("hide");
    } else {
      setShow("show");
    }
  }

  const handleClick = (key) => {
    setKey(key);
  };

  return (
    <div className=" d-flex flex-row-reverse  navbgCol  ">
      <nav className="navbar navbar-expand-lg bg-bluish-white  w-100   navBg      justify-content-start d-flex align-items-start">
        <div className="d-flex justify-content-between w-100  align-items-center flex-sm-row flex-row flex-md-row flex-lg-row-reverse   ">
          <div className="d-flex align-items-center">
            <form
              className="d-none d-sm-none  d-md-none d-lg-flex justify-content-end "
              style={{ gap: "24px" }}
            >
              <div className=" d-flex justify-content-center align-items-center">
                <LanguageSwitcher />
              </div>
              <div
                ref={notfiRef}
                className=" d-none d-md-flex align-items-center position-relative "
              >
                <Image
                  src={notfi}
                  alt="notification"
                  width={24}
                  height={27}
                  onClick={toggle}
                />

                {show === "show" && (
                  <div className="notfiNavbar  position-absolute d-flex justify-content-center align-items-start flex-column  gap-3 pt-4 pb-4 ps-3 pe-3 cursor-pointer ">
                    {info.map((dat, key) => {
                      return (
                        <Link href="/notifications">
                          <div
                            key={key}
                            className="mt-3 "
                            onClick={() => handleClick(key)}
                          >
                            <h4 className="custsubtitle3  text-black">
                              {" "}
                              {dat.title}{" "}
                            </h4>
                            <p className="ft text-black">{dat.date}</p>
                          </div>
                        </Link>
                      );
                    })}

                    <div className=" d-flex justify-content-center w-100  ">
                      <Link
                        href="/notifications"
                        className="btn btn-dark custfontbtn border-0"
                      >
                        {" "}
                        كل الاشعارات
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Image src={line} alt="line" />
              </div>

              <div
                className=" d-flex justify-content-center align-items-center "
                style={{ gap: "14px" }}
              >
                <div className=" d-flex flex-column">
                  <h4> {t("fullName")} </h4>
                  <h4>000000</h4>
                </div>
                <Image src={circle} alt="circle logo" />
              </div>
            </form>
          </div>

          <div className="d-flex flex-column">
            <div className="d-flex flex-row-reverse ">
              <Image src={mainlogo} alt="mainlogo" />
            </div>
          </div>
        </div>
      </nav>
      <div className=" d-xl-none d-lg-none  w-25  ">
        <Sidebar />
      </div>
    </div>
  );
};

export default Navbar;
