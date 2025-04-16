"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { CiSearch } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import LanguageSwitcher from "@/components/languageSwitcher/LanguageSwitcher";
import mainlogo from "@/assets/navbar assets/mainlogo.png"
import notfi from"@/assets/navbar assets/notifi.svg"
import line from "@/assets/navbar assets/Line 49.svg"
import circle from "@/assets/navbar assets/Ellipse 16.svg"
import Sidebar from "../sidebarr/Sidebar";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");


 const t = useTranslations("Navbar");


  return (
    <div className=" d-flex flex-row-reverse  navbgCol  ">
      <nav className="navbar navbar-expand-lg bg-bluish-white  w-100   navBg      justify-content-start d-flex align-items-start">
  
      <div className="d-flex justify-content-between w-100  align-items-center flex-sm-row flex-row flex-md-row flex-lg-row-reverse   ">
 
        <div className="d-flex align-items-center     ">
        

        
          <form className="d-none d-sm-none  d-md-none d-lg-flex justify-content-end " style={{ gap: "24px" }} >
            <div className=" d-flex justify-content-center align-items-center">
              <LanguageSwitcher />
            </div>

            <div className={` d-none d-md-flex align-items-center  `}>
            
             <Image src={notfi} alt="notification"  width={24} height={27}/>

           
            </div>
            <div>

                          <Image src={line} alt="line" />
            </div>

            <div
              className=" d-flex justify-content-center align-items-center " style={{ gap: "14px" }}
            >
            
               
               <div className=" d-flex flex-column">
              <h4> {t('fullName')} </h4>
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
      <div className=" d-xl-none d-lg-none  w-25  "    >
        <Sidebar />
      </div>
    </div>

  );
};

export default Navbar;
