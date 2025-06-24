import React from 'react'
import { useTranslations } from "next-intl";


export default function AdminSmallCard({ Frame, Img }) {

    const t = useTranslations(Frame);
  return (
    <>
      <div className=" w-100  p-4 rounded-4  d-flex flex-column  gap-3 cardbg text-white  ">
        <div className=" d-flex justify-content-center align-items-center flex-column">
          <Img className="iconSize14" />
          <h3 className="  tit-18-700  text-center   text-nowrap">{t("title1")}</h3>

          <p className=" text-center  Tit-12-700 circbgg2 ">{t("info2")}</p>
        </div>
        <div className=" d-flex flex-column justify-content-center  align-items-center gap-1">
          <button className=" btn btn-light custfontbtn btncolor  w-75  d-flex justify-content-center">
            {t("btn2")}
          </button>
          <p className=" tit-10-700 text-dark text-center mb-0"> {t("days_remaining")} </p>
        </div>
      </div>
    </>
  );
}
