"use client";
import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";
import Circle from "@/assets/notifCard/Ellipse 26.svg";
import PrevCard from "@/components/prevCard/PrevCard";
import { NotificationContext } from "@/context/NotificationContext";

export default function NotifCard() {
  const { info, key, setKey } = useContext(NotificationContext);
  const [show, setShow] = useState("");
  const [index, setIndex] = useState(null);
  const [MsgData, setmsgData] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
const [flag, setFlag] = useState([]);

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



      const initialFlags = info.map((notifi) => notifi.flag);

      setFlag(initialFlags);


    if (key !== null) {
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
          <div className="col-xl-5  col-lg-5  col-sm-12 col-12 d-flex  justify-content-center align-items-center flex-column gap-4">
            {info.map((dat, key) => {
              return (
                <div
                  key={key}
                  className="cardbg p-4 rounded-4 shadow-sm  w-100 d-flex flex-column justify-content-center align-items-center align-items-md-center "
                >
                  <div>
                    <div className="d-flex justify-content-center justify-content-md-start  align-items-center mb-3 gap-2">
                      <Circle
                        width={10}
                        height={10}
                        className={` ${
                          flag[key] === "true" ? "flg" : " iconcol"
                        } `}
                      />
                      <h4 className="custsubtitle3 ">{dat.title}</h4>
                    </div>
                    <p className="ft">{dat.date}</p>
                    <p className="ft d-xl-flex    d-sm-none d-none">
                      {dat.body}
                    </p>
                    {index === key ? (
                      <p className=" d-xl-none d-lg-none d-sm-flex d-flex">
                        <div className=" h6v  message m-3 p-3  ">{MsgData}</div>
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="d-flex justify-content-start align-items-center  gap-2">
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
              );
            })}
          </div>

          <div className=" mt-4 col-lg-7  col-sm-12 col-12 ">
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
