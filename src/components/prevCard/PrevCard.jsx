"use client";
import Image from "next/image";
import React, { useState } from "react";
import Message from "@/assets/notifCard/Frame 34462.svg";

export default function PrevCard({ date, title, show, MsgData }) {
  return (
    <>
      <div className=" text-white prevcard d-lg-flex  h-100  w-100 justify-content-center    d-sm-none d-none ">
        {show === "show" ? (
          <div className="  w-100 ">
            <div className=" d-flex  justify-content-between p-4    prevcardt  align-items-center">
              <h3 className="custsubtitle3 m-0">{title}</h3>

              <p className="ft m-0">{date}</p>
            </div>

            <div>
              <div className=" h6v  w-50 message m-3 p-3  ">{MsgData}</div>
            </div>
          </div>
        ) : (
          <div className=" d-flex justify-content-center align-items-center  w-100">
            {" "}
            <Message  width={70} height={100} />{" "}
          </div>
        )}
      </div>
    </>
  );
}
