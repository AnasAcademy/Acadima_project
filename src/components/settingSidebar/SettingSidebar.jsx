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
import Pen from "@/assets/admin/pen.svg";




export default function SettingSidebar() {
  const t = useTranslations();
  const info = t.raw("settings");

  const [tabinfo, setTabinfo] = useState("");

  const [percent, setPrecent] = useState("0%");


  const [sel , setSel] = useState(null)
     const [activeTab, setActiveTab] = useState(1);
    const selector = {
      1: <BasicData setTab={setTabinfo} setPro={setPrecent} />,
      2: <PersonalData
      tit={info.academic_info}
      save={info.save}
      setPro={setPrecent}
    />,
      3: <EduCard save={info.save} />,
      4:<AddInfo save={info.save} />,
      5: <ProfilLinks save={info.save} />,
      6: <Connections save={info.save} />
      

    }

    useEffect(()=>{

      
        setSel(selector[1])

       
    },[])
    
 

    function select(num){

        setSel(selector[num]);

        setActiveTab(num);


   }













  return (
    <>
      <div className=" row m-0   g-3 ">
        <div className="col-12 col-xl-2  p-5 pt-0 pb-1 p-xl-0   ">
          <div className=" d-flex flex-column gap-4 pt-5 mt-2  ps-4 pe-4 pb-5 cardbg  mb-3 align-items-center align-items-lg-start ">
            <div
              className=" d-flex gap-2  align-items-center cursor-pointer "
              onClick={() => {
                select(1);
              }}
            >
              <UserIcon
                className={`iconSize1  ${
                  activeTab === 1 ? "iconcolor2" : "iconcolor3"
                }       `}
              />
              <h3
                className={` Tit-14-700   mb-0    ${
                  activeTab === 1 ? " textcolor" : ""
                }       `}
              >
                {info.basic_data}
              </h3>
            </div>
            <div
              className=" d-flex gap-2  align-items-center cursor-pointer"
              onClick={() => {
                select(2);
              }}
            >
              <CardIcon
                className={`iconSize1  ${
                  activeTab === 2 ? "iconcolor2" : "iconcolor3"
                }       `}
              />
              <h3
                className={` Tit-14-700   mb-0    ${
                  activeTab === 2 ? " textcolor" : ""
                }       `}
              >
                {info.personal_data}
              </h3>
            </div>
            <div
              className=" d-flex gap-2  align-items-center cursor-pointer"
              onClick={() => {
                select(3);
              }}
            >
              <Edu
                className={`iconSize1  ${
                  activeTab === 3 ? "iconcolor2" : "iconcolor3"
                }       `}
              />
              <h3
                className={` Tit-14-700   mb-0    ${
                  activeTab === 3 ? " textcolor" : ""
                }       `}
              >
                {info.education}
              </h3>
            </div>
            <div
              className=" d-flex gap-2  align-items-center cursor-pointer"
              onClick={() => {
                select(4);
              }}
            >
              <ObjectIcon
                className={`iconSize1  ${
                  activeTab === 4 ? "iconcolor2" : "iconcolor3"
                }       `}
              />
              <h3
                className={` Tit-14-700   mb-0    ${
                  activeTab === 4 ? " textcolor" : ""
                }       `}
              >
                {info.extra_info}
              </h3>
            </div>
            <div
              className=" d-flex gap-2  align-items-center cursor-pointer"
              onClick={() => {
                select(5);
              }}
            >
              <LinkIcon
                className={`iconSize1  ${
                  activeTab === 5 ? "iconcolor2" : "iconcolor3"
                }       `}
              />
              <h3
                className={` Tit-14-700   mb-0    ${
                  activeTab === 5 ? " textcolor" : ""
                }       `}
              >
                {info.portfolio_links}
              </h3>
            </div>
            <div
              className=" d-flex gap-2  align-items-center cursor-pointer"
              onClick={() => {
                select(6);
              }}
            >
              <Bag
                className={`iconSize1  ${
                  activeTab === 6 ? "iconcolor2" : "iconcolor3"
                }       `}
              />
              <h3
                className={` Tit-14-700   mb-0    ${
                  activeTab === 6 ? " textcolor" : ""
                }       `}
              >
                {info.connections}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-10     p-5   pt-0 ">{sel}</div>
      </div>

      {/* <div className="row flex-column flex-lg-row  ">
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
      </div> */}
    </>
  );
}
