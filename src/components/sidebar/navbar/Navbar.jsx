"use client";

import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/languageSwitcher/LanguageSwitcher";
import mainlogo from "@/assets/navbar assets/mainlogo.png";
import NotfiIcon from "@/assets/navbar assets/notifi.svg";
import LineIcon from "@/assets/navbar assets/Line 49.svg";
import CircleIcon from "@/assets/navbar assets/Ellipse 16.svg";
import Sidebar from "../sidebarr/Sidebar";
import messagebar from "@/assets/notifCard/dialog_box_line.svg";
import Circle from "@/assets/notifCard/Ellipse 26.svg";
import Link from "next/link";
import { NotificationContext } from "@/context/NotificationContext";

const Navbar = () => {
 
  const { info, setKey, } = useContext(NotificationContext);
  const t = useTranslations("Navbar");
 
  const [isVisible, setIsVisible] = useState(false);

 const notificationsRef = useRef(null);

  function toggle() {

       setIsVisible(!isVisible);
  
  }

  const handleClick = (key) => {
    setKey(key);
  };
  
const handleClickOutside = (event) =>
 {

    if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
       setIsVisible(true);
    }
  }


   useEffect(() => {
     document.addEventListener("mousedown", handleClickOutside);

     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, []);


  return (
    <>
      <div className=" d-flex flex-row-reverse  navbgCol    ">
        <div className=" row  w-100 d-flex flex-row-reverse m-0   ">
          <nav className="navbar navbar-expand-lg bg-bluish-white     col-7 col-lg-12  navBg   justify-content-start d-flex align-items-start">
            <div className="d-flex justify-content-center  justify-content-lg-between w-100  align-items-center flex-sm-row flex-row flex-md-row flex-lg-row-reverse   ">
              <div className="d-flex align-items-center">
                <form
                  className="d-none d-sm-none  d-md-none d-lg-flex justify-content-end  "
                  style={{ gap: "24px" }}
                >
                  <div className=" d-flex justify-content-center align-items-center">
                    <LanguageSwitcher />
                  </div>

                  <div className=" d-none d-md-flex align-items-center position-relative">
                    <NotfiIcon
                      width={24}
                      height={27}
                      onClick={(e) => {
                        toggle();
                      }}
                    />

                    {isVisible && (
                      <div
                        ref={notificationsRef}
                        onClick={(e) => e.stopPropagation()}
                        className="notfiNavbar  position-absolute d-flex justify-content-center align-items-start flex-column  gap-3 pt-4 pb-4 ps-3 pe-3 cursor-pointer  z-3"
                      >
                        {info.map((dat, key) => {
                          return (
                            <>
                              <div className=" d-flex   gap-3">
                                <Circle
                                  width={10}
                                  height={10}
                                  className={` ${
                                    1 === 1
                                      ? " iconcol  mt-2"
                                      : "  iconcolor mt-2"
                                  } `}
                                />

                                <Link href="/notifications">
                                  <div
                                    key={key}
                                    className=""
                                    onClick={() => handleClick(key)}
                                  >
                                    <h4 className="custsubtitle3  text-black">
                                      {" "}
                                      {dat.title}{" "}
                                    </h4>
                                    <p className="ft text-black">{dat.date}</p>
                                  </div>
                                </Link>
                              </div>
                            </>
                          );
                        })}

                        <div className=" d-flex justify-content-center w-100  ">
                          <Link
                            href="/notifications"
                            className="btn btn-dark custfontbtn border-0"
                          >
                            {" "}
                            {t("allNotif")}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <LineIcon style={{ width: "1px", height: "66px" }} />
                  </div>

                  <div
                    className=" d-flex justify-content-center align-items-center "
                    style={{ gap: "14px" }}
                  >
                    <div className=" d-flex flex-column">
                      <h4> {t("fullName")} </h4>
                      <h4>000000</h4>
                    </div>
                    <CircleIcon style={{ width: "59px", height: "59px" }} />
                  </div>
                </form>
              </div>

              <div className="d-flex flex-column   ">
                <div className="d-flex  d-lg-none justify-content-around  ">
                  <Image
                    src={mainlogo}
                    alt="mainlogo"
                    width={130}
                    height={52}
                  />
                </div>
                <div className="d-lg-flex  d-none justify-content-around  ">
                  <Image
                    src={mainlogo}
                    alt="mainlogo"
                    width={180}
                    height={70.31}
                  />
                </div>
              </div>
            </div>
          </nav>

          <div className="  d-lg-none col-5  position-relative  ">
            <div className=" navbgCol position-absolute top-0 end-0  z-3 ">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
