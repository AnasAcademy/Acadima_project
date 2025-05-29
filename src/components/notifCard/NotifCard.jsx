"use client";
import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";
import Circle from "@/assets/notifCard/Ellipse 26.svg";
import PrevCard from "@/components/prevCard/PrevCard";
import { NotificationContext } from "@/context/NotificationContext";




export default function NotifCard() {
  const { info, key, setKey , flag , setFlag} = useContext(NotificationContext);
  const [show, setShow] = useState("");
  const [index, setIndex] = useState(null);
  const [MsgData, setmsgData] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");


//false --->  green 

  function showMessage(key) {

    setShow("show");
    setmsgData(info[key].body);
    setTitle(info[key].title);
    setDate(info[key].date);
   

    if (index === key) {

      setIndex(null);

    } else {

      setIndex(key);
      setmsgData(info[key].body);
      setTitle(info[key].title);
      setDate(info[key].date);
      setFlag((prevFlags) => {
        const newFlags = [...prevFlags];
        newFlags[key] = "true"; 
        return newFlags;
      });
       
    }
  }

  useEffect(() => {


    console.log(key);
    console.log(flag);
    

      setFlag(flag);


    if (key !== null  ) {
      setShow("show");
      setmsgData(info[key].body);
      setTitle(info[key].title);
      setDate(info[key].date);
      setFlag((prevFlags) => {
        const newFlags = [...prevFlags];
        newFlags[key] = "true";
        return newFlags;
      });

    } else {
      setShow("hide");
    }

 
     
  }, [key]);

  return (
    <>
   
        <div className=" w-100 ">
          <div className="row d-flex gy-4">
            <div className=" col-lg-4 col-xl-3  col-sm-11 col-11 d-flex   justify-content-start align-items-center flex-column gap-4">
              {info.map((dat, key) => {
                return (
                  <div
                    key={key}
                    className={` " rounded-4 shadow-sm  w-100 d-flex flex-column    p-3 min-notfi-ht ${
                      index === key ? " cardbg swap" : " cardbg "
                    }    "  `}
                  >
                    <div className=" d-flex gap-1">
                      <div className=" ">
                        <Circle
                          width={10}
                          height={10}
                          className={` ${
                            flag[key] === "true" ? "flg" : " iconcol"
                          } `}
                        />
                      </div>
                      <div className=" d-flex flex-column ">
                        <div className=" d-flex flex-column ">
                          <div className=" d-flex flex-column gap-2">
                            <h4
                              className={`custsubtitle3 p-0 m-0 ${
                                index === key ? " swap" : "  "
                              }  `}
                            >
                              {dat.title}
                            </h4>
                            <p
                              className={`ft p-0 m-0  ${
                                index === key ? " swap" : "  "
                              } `}
                            >
                              {dat.date}
                            </p>
                          </div>
                          <p
                            className={`ft d-xl-flex     mt-3 d-sm-none d-none ${
                              index === key ? " swap" : "  "
                            }`}
                          >
                            {dat.body}
                          </p>
                          {index === key ? (
                            <p className=" d-xl-none d-lg-none d-sm-flex d-flex">
                              <div className=" h6v  message mt-3 p-3  ">
                                {MsgData}
                              </div>
                            </p>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="d-flex justify-content-start align-items-center  mt-xl-0  mt-lg-4 mt-4 gap-2">
                          <button
                            className="btn btn-light custfontbtn px-3 text-nowrap srv-btn-width"
                            onClick={() => {
                              showMessage(key);
                            }}
                          >
                            <a className="d-xl-flex d-lg-flex d-sm-none d-none  ">
                              {info[0].button}
                            </a>
                            <a className="d-xl-none d-lg-none d-sm-flex d-flex justify-content-center">
                              {index === key ? info[0].close : info[0].button}
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className=" mt-4 col-lg-8  col-xl-9 col-sm-12 col-12 ">
              {
                <PrevCard
                  date={date}
                  title={title}
                  show={show}
                  MsgData={MsgData}
                />
              }
            </div>
          </div>
        </div>
  
    </>
  );
}
