"use client";
import Image from "next/image";
import React, { useState } from "react";
import Message from "@/assets/notifCard/Frame 34462.svg";
import Elipse from "@/assets/admin/Ellipse.svg"
export default function AdminPrevCard({ date, title, show, MsgData }) {
  return (
    <>
      <div className=" text-white d-lg-flex  h-100  w-100 justify-content-center    d-sm-none d-none min-prev-ht     ">
        {show === "show" ? (
          <div className="  w-100 ">
            <div className=" d-flex  justify-content-between p-4    pb-0    align-items-center">
              <div className=" d-flex justify-content-between    ">
                <Elipse className="iconSize2 m-2" />
                <div className=" d-flex flex-column gap-2">
                  <h3 className="custsubtitle3 m-0">{title}</h3>
                  <p className={`ft p-0 m-0 namcolr   `}>أسم الجهة المرسلة</p>
                </div>
              </div>
             
            </div>
            <div>
              <div className=" h6v  w-50 message m-3 p-3  pe-5 ps-5 text-dark pt-0 ">{MsgData}</div>
            </div>
          </div>
        ) : (
          <div className=" d-flex justify-content-center align-items-center  w-100">
            {" "}
            <Message width={70} height={100} />{" "}
          </div>
        )}
      </div>
    </>
  );
}
