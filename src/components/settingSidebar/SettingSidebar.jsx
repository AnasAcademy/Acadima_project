"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import CardIcon from "@/assets/settings/cards.svg";
import Edu from "@/assets/settings/edu.svg";
import LinkIcon from "@/assets/settings/link.svg";
import ObjectIcon from "@/assets/settings/OBJECTS.svg";
import Bag from "@/assets/settings/bag.svg";
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
  
  const [percent , setPrecent] = useState("0%")


  const components = {
    basic: <BasicData setTab={setTabinfo} setPro={setPrecent} />,
    personal: (
      <PersonalData
        tit={info.academic_info}
        save={info.save}
        setPro={setPrecent}
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
        <div className="col-lg-3 col-12">
          <div className=" w-100">
            <h2 className="htitle"> {info.settings_header} </h2>
            <div className=" d-flex flex-row mt-4  align-items-baseline gap-2">
              <div className="progress w-50" style={{ height: "8px" }}>
                <div
                  className="progress-bar custButton"
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
            <p className=" ad2   w-75">{info.completion_note}</p>
          </div>

          <ul className="   row   p-0   g-2   ">
            <div className="   col-lg-12  col-12 row g-2   ">
              <button
                className={` btn btn-light custfontbtns    col-sm-6  col-lg-12  col-xl-8  col-6    text-nowrap   ${
                  tabinfo === "basic" ? "" : "bg-transparent border-0"
                }   `}
                onClick={() => {
                  setToggle("basic");
                }}
              >
                <div className=" d-flex   justifiy-content-start gap-2 align-items-center">
                  <UserIcon
                    className={`iconSize3 navftSize   ${
                      tabinfo === "basic" ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className={` ${
                      tabinfo === "basic" ? "chvvs hvvss" : "chvv hvv2"
                    }  `}
                    aria-current="page"
                    href="/settings"
                  >
                    {info.basic_data}
                  </Link>
                </div>
              </button>

              <button
                className={` btn btn-light custfontbtns    col-sm-6  col-lg-12   col-xl-8  col-6 text-nowrap   ${
                  tabinfo === "personal" ? "" : "bg-transparent border-0"
                } `}
                onClick={() => {
                  setToggle("personal");
                }}
              >
                <div className=" d-flex   justifiy-content-start gap-2 align-items-center">
                  <CardIcon
                    className={`iconSize3 navftSize  ${
                      tabinfo === "personal" ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className={`  ${
                      tabinfo === "personal" ? "chvvs hvvss" : "chvv hvv2"
                    }  `}
                    aria-current="page"
                    href="/settings"
                  >
                    {info.personal_data}
                  </Link>
                </div>
              </button>

              <button
                className={` btn btn-light custfontbtns    col-sm-6  col-lg-12 col-xl-8 col-6   text-nowrap   ${
                  tabinfo === "edu" ? "" : "bg-transparent border-0"
                } `}
                onClick={() => {
                  setToggle("edu");
                }}
              >
                <div className=" d-flex   justifiy-content-start  gap-2 align-items-center ">
                  <Edu
                    className={`iconSize3 navftSize  ${
                      tabinfo === "edu" ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className={` text-nowarp  ${
                      tabinfo === "edu" ? "chvvs hvvss" : "chvv hvv2"
                    }  `}
                    aria-current="page"
                    href="/settings"
                  >
                    {info.education}
                  </Link>
                </div>
              </button>

              <button
                className={` btn btn-light custfontbtns     col-sm-6  col-lg-12 col-xl-8 col-6  text-nowrap   ${
                  tabinfo === "addinfo" ? "" : "bg-transparent border-0"
                } `}
                onClick={() => {
                  setToggle("addinfo");
                }}
              >
                <div className=" d-flex   justifiy-content-start gap-2 align-items-center">
                  <ObjectIcon
                    className={`iconSize3 navftSize  ${
                      tabinfo === "addinfo" ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className={` text-nowarp  ${
                      tabinfo === "addinfo" ? "chvvs hvvss" : "chvv hvv2"
                    }  `}
                    aria-current="page"
                    href="/settings"
                  >
                    {info.extra_info}
                  </Link>
                </div>
              </button>

              <button
                className={` btn btn-light custfontbtns     col-sm-6  col-lg-12  col-xl-8 col-6  text-nowrap    ${
                  tabinfo === "profil" ? "" : "bg-transparent border-0"
                } `}
                onClick={() => {
                  setToggle("profil");
                }}
              >
                <div className=" d-flex   justifiy-content-start gap-2 align-items-center">
                  <LinkIcon
                    className={`iconSize3 navftSize  ${
                      tabinfo === "profil" ? "iconcolor2" : "iconcolor"
                    } `}
                  />

                  <Link
                    className={` text-nowarp  ${
                      tabinfo === "profil" ? "chvvs hvvss" : "chvv hvv2"
                    }  `}
                    aria-current="page"
                    href="/settings"
                  >
                    {info.portfolio_links}
                  </Link>
                </div>
              </button>

              <button
                className={` btn btn-light custfontbtns    col-sm-6  col-lg-12   col-xl-8 col-6  text-nowrap   ${
                  tabinfo === "conn" ? "" : "bg-transparent border-0"
                } `}
                onClick={() => {
                  setToggle("conn");
                }}
              >
                <div className=" d-flex   justifiy-content-start gap-2 align-items-center">
                  <Bag
                    className={`iconSize3 navftSize  ${
                      tabinfo === "conn" ? "iconcolor2" : "iconcolor"
                    }  `}
                  />
                  <Link
                    className={` text-nowarp  ${
                      tabinfo === "conn" ? "chvvs hvvss" : "chvv hvv2"
                    }  `}
                    aria-current="page"
                    href="/settings"
                  >
                    {info.connections}
                  </Link>
                </div>
              </button>
            </div>
          </ul>
        </div>

        <div className=" col-lg-9 col-12 p-0">{components[tabinfo]}</div>
      </div>
    </>
  );
}
