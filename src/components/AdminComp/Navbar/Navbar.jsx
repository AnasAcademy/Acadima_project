"use client";

import { useState, useEffect, useContext } from "react";
import { useTranslations } from "next-intl";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/languageSwitcher/LanguageSwitcher";
import { NotificationContext } from "@/context/NotificationContext";
import Circle from "@/assets/notifCard/Ellipse 26.svg";
import Link from "next/link";
import Sidebar from "../../sidebar/sidebarr/Sidebar";

const Navbar = () => {
  const tn = useTranslations("Navbar");
  const ts = useTranslations("Sidebar");
  const pathnam = usePathname();
  const [actvPath, setActvPath] = useState("");

  const { info, setKey ,key ,flag  , setFlag } = useContext(NotificationContext);

  const [index, setIndex] = useState(null);

  const [isVisible, setIsVisible] = useState(false);

  function toggle() {
    
    setIsVisible(!isVisible);
  }

 function  handleClick(key){

 
     
  if (index === key) {
    setIndex(null);
  
  } else {
    setIndex(key);
       setKey(key);
    setFlag((prevFlags) => {
      const newFlags = [...prevFlags];
      newFlags[key] = "true";
      return newFlags;
    });
  }


 }

  useEffect(() => {
    if (pathnam.includes("dashboard")) {
      setActvPath("dashboard");
    } else if (pathnam.includes("admissions")) {
      setActvPath("Subscription Management");
    } else if (pathnam.includes("courses")) {
      setActvPath("Notifications");
    } else if (pathnam.includes("certificates")) {
      setActvPath("Technical Support");
    } else if (pathnam.includes("paymentplans")) {
      setActvPath("pay_pro_fees");
    } else if (pathnam.includes("notifications")) {
      setActvPath("Account Management");
    } else if (pathnam.includes("services")) {
      setActvPath("elctro");
    } else if (pathnam.includes("settings")) {
      setActvPath("AI Assistant");
    }
  }, [pathnam]);



  useEffect(()=>{

    
    console.log(key);
    console.log(flag);
    if (key !== null) {
   
      setFlag((prevFlags) => {
        
        const newFlags = [...prevFlags];
        newFlags[key] = "true";
        return newFlags;
      });
    } 


    
  },[key])
 

  return (
    <div className="  w-100 ">
      <nav className="            navbar  bg-bluish-white p-3 px-xl-5 px-lg-4    d-flex align-items-start  justify-content-start   container-fluid  d-none d-sm-none  d-md-none d-lg-flex  ">
        <div className="d-flex justify-content-between align-items-start align-items-md-center  flex-row-reverse w-100 ">
          <div className="d-flex align-items-center    ">
            <form className="       d-flex   gap-2    justify-content-end ">
              <div className=" d-flex justify-content-center align-items-center">
                <LanguageSwitcher />
              </div>

              <div className={` d-none d-md-flex align-items-center  `}>
                <div className=" position-relative">
                  <button
                    type="button"
                    className="btn btn-light p-1"
                    onClick={toggle}
                  >
                    <IoNotifications className="textcolor" size={20} />
                  </button>

                  {isVisible && (
                    <div className="notfiNavbar  position-absolute d-flex justify-content-center align-items-start flex-column  gap-3 pt-4 pb-4 ps-3 pe-3 cursor-pointer  z-3">
                      {info.map((dat, key) => {
                        return (
                          <>
                            <div key={key} className=" d-flex   gap-3">
                              <Circle
                                width={10}
                                height={10}
                                className={` ${
                                  flag[key] === "true" ? "flg" : " iconcol"
                                } `}
                              />

                              <Link href="/notifications">
                                <div
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
                          {tn("allNotif")}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <Link href="/login" className="btn btn-light p-1">
                  <FaUser className="textcolor" size={18} />
                </Link>
              </div>
            </form>

            <div className=" d-flex justify-content-center align-items-center gap-3 p-1 ">
              <Link href="/panel">
                <button className=" btn  custfontbtn rounded-2">user</button>
              </Link>
              <Link href="/org/panel">
                <button className=" btn custfontbtn  rounded-2">
                  Organization
                </button>
              </Link>
            </div>
          </div>

          {/* Right Section: Breadcrumbs */}
          {/* <div className=" d-none d-sm-none  d-md-none d-lg-flex flex-column ">
            <div className="d-flex ">
              <p className="text-m-black px-1 m-0 text-nowrap">
                {actvPath && ts(actvPath)}
              </p>
            </div>
          </div> */}
        </div>
      </nav>

      <div className="  d-lg-none position-relative  mb-5  ">
        <div className=" navbgCol position-absolute top-0 end-0  z-3  w-100">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
