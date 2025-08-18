import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function AdminSmallCard({ Frame, Img, isUpgrade }) {
  const t = useTranslations(Frame);
  return (
    <>
      <div className=" w-100  p-4 rounded-4  d-flex flex-column  gap-3 cardbg text-white  ">
        <div className=" d-flex justify-content-center align-items-center flex-column border-bottom">
          <Img className="iconSize14" />
          <h3 className="  tit-18-700  text-center   text-nowrap">
            {t("title1")}
          </h3>
          {isUpgrade ? (
            <p className=" text-center  Tit-12-700 circbgg2 ">{t("info2")}</p>
          ) : (
            <p className=" text-center  Tit-12-700 circbgg2 ">{t("info3")}</p>
          )}
        </div>
        <div className=" d-flex flex-column justify-content-center  align-items-center gap-1">
          {isUpgrade ? (
            <span className=" Tit-12-700 btncolor px-4 py-1 rounded-2 text-bg-dark text-nowrap">
              {t("btn2")}
            </span>
          ) : (
            <button className=" btn btn-light custfontbtn btncolor px-4 py-1  d-flex justify-content-center">
              {t("show_bundles")}
            </button>
          )}

          {isUpgrade ? (
            <p className=" tit-10-700 text-dark text-center mb-0">
              {" "}
              {t("days_remaining")}{" "}
            </p>
          ) : (
            <Link
              href="/org/plans"
              className=" tit-10-700 text-dark text-center mb-0 text-decoration-underline"
            >
              {" "}
              {t("Unsubscribe")}{" "}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
