'use client'
import React, { useEffect } from 'react'
import { useTranslations } from "next-intl";
import Image from 'next/image'
import Notif from "../../../assets/admin/notif.svg"
import Line from "../../../assets/admin/Line.svg";
import Alert from "../../../assets/admin/alert.svg";
import Check from "../../../assets/admin/Check_All.svg";






export default function LatestTrain({h}) {
     
const t = useTranslations("HomePageA");

  


  return (
    <>
      <div
        className={`   rounded-3 shadow-sm    container-fluid  p-5 rounded-4 cardbg  ${

          h ? h : "min-train-ht "
        }`}
      >
        <h3 className=" tit-18-700 "> {t("updat")} </h3>

        <div className=" d-flex  mt-5 flex-column gap-2   ">
          <div className=" d-flex gap-3   ">
            <div className=" d-flex flex-column   cust-w align-items-center">
              <Notif />

              <Line />
            </div>
            <div>
              <h3 className="  h3v"> {t("update")} </h3>

              <h6> {t("subupdate")}</h6>
            </div>
          </div>

          <div className=" d-flex gap-3">
            <div className=" d-flex flex-column cust-w   align-items-center">
              <Check />

              <Line />
            </div>
            <div>
              <h3 className=" h3v"> {t("update")} </h3>

              <h6> {t("subupdate")}</h6>
            </div>
          </div>

          <div className=" d-flex gap-3">
            <div className=" d-flex flex-column cust-w   align-items-center">
              <Notif />

              <Line />
            </div>
            <div>
              <h3 className=" h3v"> {t("update")} </h3>

              <h6> {t("subupdate")}</h6>
            </div>
          </div>

          <div className=" d-flex gap-3">
            <div className=" d-flex flex-column cust-w align-items-center">
              <Alert />

              <Line />
            </div>
            <div>
              <h3 className=" h3v"> {t("update")} </h3>

              <h6> {t("subupdate")}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
