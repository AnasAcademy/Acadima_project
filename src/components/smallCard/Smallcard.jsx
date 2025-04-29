import React from "react";
import frame1 from "../../assets/smallCard assets/Frame_31.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Smallcard() {
  const t = useTranslations("smallcard");

  return (
    <>
      <div className=" w-100  p-3 rounded-2  d-flex justify-content-center flex-column align-items-center gap-2  cardbg text-white">
        <Image src={frame1} alt="frame" />

        <h3 className=" custfont custcolor"> {t("title")}</h3>

        <p className=" text-center custfont">{t("info")}</p>
        <button className=" btn btn-light custfontbtn">{t("btn")} </button>
      </div>
    </>
  );
}
