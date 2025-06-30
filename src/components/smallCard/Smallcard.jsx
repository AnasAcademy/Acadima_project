import React from "react";


import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Smallcard({Frame  , Img}) {
  const t = useTranslations(Frame);

  

  return (
    <>
      <div className=" w-100  p-4 rounded-4  d-flex justify-content-between flex-column align-items-center  gap-2  cardbg text-white min-nam-ht ">
        <Image src="/" className="iconSize2" width={100}  height={100} alt="uimage"/>

        <h3 className=" tit-14-400 custcolor  text-center  ">{t("title1")}</h3>

        <div className=" ">
          <p className=" text-center tit-14-400 Gray-Gray-700 ">{t("info2")}</p>
        </div>
        <div className=" ">
          <button className=" btn btn-light custfontbtn btncolor white-c   d-flex justify-content-center">
            {t("btn2")}
          </button>
        </div>
      </div>
    </>
  );
}
