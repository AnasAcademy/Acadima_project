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
      <div className="row flex-column flex-lg-row ">
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

          <div className=" d-flex   justify-content-lg-start justify-content-center">
            <ul className=" d-flex flex-column gap-1  p-0 ">
              <div className=" d-flex flex-column  gap-2 ">
                <div className=" d-flex flex-lg-column flex-row    gap-2    align-items-lg-start   justify-content-center ">
                  <li className={`nav-item d-flex `}>
                    <button
                      className={` btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2  ${
                        tabinfo === "basic" ? "" : "bg-transparent border-0"
                      } `}
                      onClick={() => {
                        setToggle("basic");
                      }}
                    >
                      <div className=" d-flex gap-2 align-items-center">
                        <UserIcon className="iconcolor iconSize3" />
                        <Link
                          className=" hvv "
                          aria-current="page"
                          href="/settings"
                        >
                          {info.basic_data}
                        </Link>
                      </div>
                    </button>
                  </li>

                  <li className={` d-flex `}>
                    <button
                      className={` btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2 ${
                        tabinfo === "personal" ? "" : "bg-transparent border-0"
                      } `}
                      onClick={() => {
                        setToggle("personal");
                      }}
                    >
                      <div className=" d-flex gap-2 align-items-center">
                        <CardIcon className="iconcolor iconSize3" />
                        <Link
                          className=" hvv   text-nowrap "
                          aria-current="page"
                          href="/settings"
                        >
                          {info.personal_data}
                        </Link>
                      </div>
                    </button>
                  </li>
                </div>

                <div className=" d-flex flex-lg-column flex-row  gap-2     align-items-lg-start    justify-content-center ">
                  <li className={`d-flex  `}>
                    <button
                      className={` btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2  ${
                        tabinfo === "edu" ? "" : "bg-transparent border-0"
                      } `}
                      onClick={() => {
                        setToggle("edu");
                      }}
                    >
                      <div className=" d-flex gap-2 align-items-center">
                        <CardIcon className="iconcolor iconSize3" />
                        <Link
                          className=" hvv text-nowrap "
                          aria-current="page"
                          href="/settings"
                        >
                          {info.education}
                        </Link>
                      </div>
                    </button>
                  </li>
                  <li className={` d-flex    `}>
                    <button
                      className={` btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2  ${
                        tabinfo === "addinfo" ? "" : "bg-transparent border-0"
                      } `}
                      onClick={() => {
                        setToggle("addinfo");
                      }}
                    >
                      <div className=" d-flex gap-2 align-items-center">
                        <ObjectIcon className="iconcolor iconSize3" />
                        <Link
                          className=" hvv  text-nowrap "
                          aria-current="page"
                          href="/settings"
                        >
                          {info.extra_info}
                        </Link>
                      </div>
                    </button>
                  </li>
                </div>

                <div className=" d-flex flex-lg-column flex-row align-items-lg-start   gap-lg-2  gap-sm-4  gap-4 justify-content-start ">
                  <li className={` d-flex `}>
                    <button
                      className={` btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2   ${
                        tabinfo === "profil" ? "" : "bg-transparent border-0"
                      } `}
                      onClick={() => {
                        setToggle("profil");
                      }}
                    >
                      <div className=" d-flex gap-2 align-items-center">
                        <LinkIcon className="iconcolor iconSize3" />
                        <Link
                          className=" hvv text-nowrap  "
                          aria-current="page"
                          href="/settings"
                        >
                          {info.portfolio_links}
                        </Link>
                      </div>
                    </button>
                  </li>
                  <li className={`nav-item d-flex  `}>
                    <button
                      className={` btn btn-light custfontbtn px-3  py-2 text-nowrap  d-flex gap-2  ${
                        tabinfo === "conn" ? "" : "bg-transparent border-0"
                      } `}
                      onClick={() => {
                        setToggle("conn");
                      }}
                    >
                      <div className=" d-flex gap-2 align-items-center">
                        <CardIcon className="iconcolor iconSize3" />
                        <Link
                          className="nav-link hvv text-nowrap  "
                          aria-current="page"
                          href="/settings"
                        >
                          {info.connections}
                        </Link>
                      </div>
                    </button>
                  </li>
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
