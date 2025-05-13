"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import CardIcon from "@/assets/settings/cards.svg";
import LinkIcon from "@/assets/settings/link.svg";
import ObjectIcon from "@/assets/settings/OBJECTS.svg";
import UserIcon from "@/assets/settings/user.svg";
import BasicData from "@/components/BasicData/BasicData";
import PersonalData from "@/components/PersonalData/PersonalData";
import EduCard from "@/components/eduCard/EduCard";
import AddInfo from "@/components/AddInfo/AddInfo";
import ProfilLinks from "@/components/ProfilLinks/ProfilLinks";
import Connections from "@/components/connections/Connections";

export default function SettingSidebar() {
  const t = useTranslations();
  const info = t.raw("settings");

  const [tabinfo, setTabinfo] = useState("");
  const [progress, setProgress] = useState("4%");

  const components = {
    basic: <BasicData setTab={setTabinfo} setPro={setProgress} />,
    personal: (
      <PersonalData
        tit={info.academic_info}
        save={info.save}
        setPro={setProgress}
      />
    ),
    edu: <EduCard save={info.save} />,
    addinfo: <AddInfo save={info.save} />,
    profil: <ProfilLinks save={info.save} />,
    conn: <Connections save={info.save} />,
  };

  function setToggle(valu) {
    if (valu === "basic") {
      setTabinfo("basic");
    } else if (valu === "personal") {
      setTabinfo("personal");
    } else if (valu === "edu") {
      setTabinfo("edu");
    } else if (valu === "addinfo") {
      setTabinfo("addinfo");
    } else if (valu === "profil") {
      setTabinfo("profil");
    } else {
      setTabinfo("conn");
    }
  }

  useEffect(() => {
    setTabinfo("basic");
  }, []);

  return (
    <>
      <div className="row flex-column flex-lg-row  ">
        <div className="col-lg-4 col-12">
          <div className=" w-100">
            <h2 className="htitle"> {info.settings_header} </h2>
            <div className=" d-flex flex-row mt-4  align-items-baseline gap-2">
              <div className="progress w-50" style={{ height: "8px" }}>
                <div
                  className="progress-bar custButton"
                  role="progressbar"
                  style={{ width: progress }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>

              <div>
                <h4>{progress}</h4>
              </div>
            </div>
            <p className=" ad2  text-white  w-75">{info.completion_note}</p>
          </div>

          <div className=" d-flex   justify-content-lg-start justify-content-center ">
            <ul className=" d-flex flex-column gap-1  p-0 ">
              <div className=" d-flex flex-column  gap-2 ">
                <div className=" row d-flex justify-content-around   m-0 p-0 ">
                  <li
                    className={`nav-item   col-4 col-lg-7  d-flex   p-0 m-0`}
                  >
                    <button
                      className={` btn btn-light custfontbtn text-nowrap  d-flex gap-2   w-100 justify-content-center ${
                        tabinfo === "basic" ? "" : "bg-transparent border-0"
                      } `}
                      onClick={() => {
                        setToggle("basic");
                      }}
                    >
                      <UserIcon
                        className={`iconcolor iconSize3 ${
                          tabinfo === "basic" ? "iconcolors" : "iconcolor"
                        }`}
                      />
                      <Link
                        className={`  ${
                          tabinfo === "basic" ? "hvvs" : "hvv"
                        }  `}
                        aria-current="page"
                        href="/settings"
                      >
                        {info.basic_data}
                      </Link>
                    </button>
                  </li>

                  <li className="  col-lg-5 d-flex p-0 m-0"></li>

                  <li
                    className={`nav-item d-flex col-4 col-lg-7   d-flex   p-0 m-0`}
                  >
                    <button
                      className={` btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2 w-100  justify-content-center  ${
                        tabinfo === "personal" ? "" : "bg-transparent border-0"
                      } `}
                      onClick={() => {
                        setToggle("personal");
                      }}
                    >
                      <CardIcon
                        className={`iconcolor iconSize3 ${
                          tabinfo === "personal" ? "iconcolors" : "iconcolor"
                        }`}
                      />
                      <Link
                        className={`  ${
                          tabinfo === "personal" ? "hvvs" : "hvv"
                        }  `}
                        aria-current="page"
                        href="/settings"
                      >
                        {info.personal_data}
                      </Link>
                    </button>
                  </li>

                  <li className="    col-lg-5  d-flex p-0 m-0"></li>

                  <li
                    className={`d-flex  col-4 col-lg-7 d-flex   p-0 m-0 `}
                  >
                    <button
                      className={` btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2  w-100 justify-content-center  ${
                        tabinfo === "edu" ? "" : "bg-transparent border-0"
                      } `}
                      onClick={() => {
                        setToggle("edu");
                      }}
                    >
                      <CardIcon
                        className={`iconcolor iconSize3 ${
                          tabinfo === "edu" ? "iconcolors" : "iconcolor"
                        }`}
                      />
                      <Link
                        className={` text-nowarp  ${
                          tabinfo === "edu" ? "hvvs" : "hvv"
                        }  `}
                        aria-current="page"
                        href="/settings"
                      >
                        {info.education}
                      </Link>
                    </button>
                  </li>

                  <li className="  col-lg-5  d-flex p-0 m-0"></li>

                  <li
                    className={` d-flex  col-4 col-lg-7 d-flex   p-0 m-0 `}
                  >
                    <button
                      className={` btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2 w-100 justify-content-center   ${
                        tabinfo === "addinfo" ? "" : "bg-transparent border-0"
                      } `}
                      onClick={() => {
                        setToggle("addinfo");
                      }}
                    >
                      <ObjectIcon
                        className={`iconcolor iconSize3 ${
                          tabinfo === "addinfo" ? "iconcolors" : "iconcolor"
                        }`}
                      />
                      <Link
                        className={` text-nowarp  ${
                          tabinfo === "addinfo" ? "hvvs" : "hvv"
                        }  `}
                        aria-current="page"
                        href="/settings"
                      >
                        {info.extra_info}
                      </Link>
                    </button>
                  </li>

                  <li className="  col-lg-5  d-flex p-0 m-0"></li>

                  <li
                    className={` d-flex  col-4 col-lg-7 d-flex   p-0 m-0`}
                  >
                    <button
                      className={` btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2   w-100 justify-content-center ${
                        tabinfo === "profil" ? "" : "bg-transparent border-0"
                      } `}
                      onClick={() => {
                        setToggle("profil");
                      }}
                    >
                      <LinkIcon
                        className={`iconcolor iconSize3 ${
                          tabinfo === "profil" ? "iconcolors" : "iconcolor"
                        }`}
                      />
                      <Link
                        className={` text-nowarp  ${
                          tabinfo === "profil" ? "hvvs" : "hvv"
                        }  `}
                        aria-current="page"
                        href="/settings"
                      >
                        {info.portfolio_links}
                      </Link>
                    </button>
                  </li>

                  <li className="  col-lg-5 d-flex p-0 m-0"></li>

                  <li className={`d-flex  col-4 col-lg-7 d-flex   p-0 m-0 `}>
                    <button
                      className={` btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2  w-100 justify-content-center   ${
                        tabinfo === "conn" ? "" : "bg-transparent border-0"
                      } `}
                      onClick={() => {
                        setToggle("conn");
                      }}
                    >
                      <CardIcon
                        className={`iconcolor iconSize3 ${
                          tabinfo === "conn" ? "iconcolors" : "iconcolor"
                        }`}
                      />
                      <Link
                        className={` text-nowarp  ${
                          tabinfo === "conn" ? "hvvs" : "hvv"
                        }  `}
                        aria-current="page"
                        href="/settings"
                      >
                        {info.connections}
                      </Link>
                    </button>
                  </li>

                  <li className="  col-lg-5  d-flex p-0 m-0"></li>
                </div>
              </div>
            </ul>
          </div>
        </div>

        <div className=" col-lg-8 col-12 ">{components[tabinfo]}</div>
      </div>
    </>
  );
}
