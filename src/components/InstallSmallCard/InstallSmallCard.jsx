"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import circle from "@/assets/payments icons/Group 233.svg";
import up from "@/assets/payments icons/up.svg";
import down from "@/assets/payments icons/down.svg";
import paid from "@/assets/payments icons/paid.svg";

export default function InstallSmallCard({ headers, courses }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState("");

  function toggle(key) {
    if (open) {
      setOpen(false);
      setIndex("");
    } else {
      setOpen(true);
      setIndex(key);
    }
  }

  return (
    <>
      <div className=" d-flex  flex-column-reverse w-100">
        {courses.map((course, key) => {
          return (
            <div key={key} className=" d-flex flex-column mt-3  ">
              <div className="bg-white-color ">
                <div className="bg-white-color d-flex justify-content-around  align-items-center p-3 ">
                  <Image
                    src={course[5] === "مدفوع" ? paid : circle}
                    alt="circle"
                  />
                  <h4 className=" h8"> {course[1]} </h4>
                  <Image
                    src={open && index === key ? up : down}
                    alt="icon"
                    onClick={() => {
                      toggle(key);
                    }}
                  />
                </div>
              </div>
              {open && index === key ? (
                <div className=" mt-3">
                  <div className=" d-flex gap-4 justify-content-around  flex-column  pt-3 pb-3 ">
                    <div className=" d-flex  text-start  justify-content-around  p-2  bg-prim-color  ">
                      <h3 className=" custsubtitle3 ">{headers[2]} </h3>
                      <h3 className=" custsubtitle3 ">{course[2]} </h3>
                    </div>
                    <div className=" d-flex  text-start  justify-content-around  p-2 bg-prim-color ">
                      <h3 className=" custsubtitle3"> {headers[3]} </h3>
                      <h3 className=" custsubtitle3"> {course[3]} </h3>
                    </div>

                    <div className=" d-flex  text-start  justify-content-around   p-2  bg-prim-color ">
                      <h3 className=" custsubtitle3"> {headers[4]} </h3>
                      <h3 className=" custsubtitle3"> {course[4]} </h3>
                    </div>

                    <div className=" d-flex  text-start   justify-content-around   p-2  bg-prim-color ">
                      <h3 className=" custsubtitle3"> {headers[5]} </h3>
                      <h3 className=" custsubtitle3"> {course[5]} </h3>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
