"use client";
import React, { useEffect, useState } from "react";
import logo from "../../../assets/admin/logo2.png";
import Link from "next/link";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import Split from "@/assets/lessons/split screen.svg"



export default function LessonsNavbar({setFull ,full}) {
  const [percent, setPrecent] = useState("100%");

   

    function toggle(){
  
       

      setFull(!full);

    }


  return (
    <>
      <div className="  w-100 d-flex justify-content-around align-items-center cardbg  ">
        <div className=" row w-100  d-flex justify-content-around align-items-center p-3  ">
          <div className=" col-6  d-lg-none   d-sm-flex  d-flex  ">
            <nav className="navbar navbar-light      ">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon  "></span>
              </button>
            </nav>
          </div>
          <div className=" col-6 p-3 d-flex  justify-content-lg-start  justify-content-end  col-lg-2   ">
            <Link
              className="text-white text-decoration-none  "
              role="button"
              href="/"
            >
              <Image src={logo} alt="" width={120} height={32} priority />
            </Link>
          </div>

          <div className=" col-12  d-flex pt-sm-2 pt-lg-0 pt-2  col-lg-8  ">
            <div className="   ">
              <div className=" ">
                <p className=" p-0 m-0">
                  الذكاء الاصطناعي Open IA للمبتدئين : التوجيه البرمجي الذكاء
                </p>
              </div>
              <div className=" d-flex flex-row  align-items-baseline gap-2   ">
                <div className="progress w-50" style={{ height: "8px" }}>
                  <div
                    className="progress-bar custButton "
                    role="progressbar"
                    style={{ width: percent }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>

                <div>
                  <h4>{percent}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className=" col-2 d-lg-flex d-md-none d-none col-lg-1   justify-content-end    ">
            <div className=" d-flex justify-content-center align-items-center gap-2">
              <button className=" btn   custButt-outline  p-2   ">
                جدول المقررات
              </button>
              <div className=" cursor-pointer" onClick={toggle}>
                <Split className=" iconSize2 p-1 " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
