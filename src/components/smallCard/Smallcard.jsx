import React from "react";


import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Smallcard({Frame , title , dis ,btn}) {
  const t = useTranslations("smallcard");

  

  return (
    <>
      <div className=" w-100  p-4 rounded-2  d-flex justify-content-between flex-column align-items-center  gap-2  cardbg text-white min-nam-ht ">
        <Frame className="iconSize2" />

        <h3 className=" tit-14-400 custcolor  text-center  ">{title}</h3>

        <div className=" ">
          <p className=" text-center tit-14-400 Gray-Gray-700 ">{dis}</p>
        </div>
        <div className=" ">
          <button className=" btn btn-light custfontbtn btncolor white-c   d-flex justify-content-center">
            {btn}
          </button>
        </div>
      </div>
    </>
  );
}
