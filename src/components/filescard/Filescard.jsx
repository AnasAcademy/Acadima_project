import React from "react";
import File from "../../assets/filescard/Ellipse 22.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Filescard() {
  const t = useTranslations("importantFiles");

  return (
    <>
      <div className="  p-3 rounded-2  w-100 d-flex justify-content-start flex-column align-items-start  cardbg text-white min-file-ht ">
        <h3 className=" tit-18-700 Gray-Gray-700  "> {t("title")} </h3>

        <div className=" d-flex flex-column gap-3 mt-4  ">
          <div className=" d-flex  gap-2  ">
            <File className="iconSize1" />
            <p className="tit-16-400 Gray-Gray-700"> {t("guide")} </p>
          </div>

          <div className=" d-flex gap-2 ">
            <File className="iconSize1" />
            <p className="tit-16-400 Gray-Gray-700"> {t("guide")} </p>
          </div>

          <div className=" d-flex gap-2">
            <File className="iconSize1" />
            <p className="tit-16-400 Gray-Gray-700"> {t("guide")} </p>
          </div>

          <div className=" d-flex gap-2">
            <File className="iconSize1" />
            <p className="tit-16-400 Gray-Gray-700"> {t("guide")} </p>
          </div>

          <div className=" d-flex gap-2">
            <File className="iconSize1" />
            <p className="tit-16-400 Gray-Gray-700"> {t("guide")} </p>
          </div>
        </div>
      </div>
    </>
  );
}
