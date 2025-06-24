import React from "react";
import { useTranslations } from "next-intl";
import Techcard from '@/assets/admin/Techcard.svg';

export default function NewTechCard() {
  const t = useTranslations("techSupport");

  return (
    <>
      <div className="p-0 w-100   mt-1 rounded-4  cardbg text-white min-nam-ht ">
        <div className=" d-flex flex-column justify-content-center align-items-start  text-white">
          <div className="circbg w-100 techcardtop">
            <h2 className="p-3 py-4 m-0 text-white">{t("create-new-ticket")}</h2>
          </div>
          <div className="p-4">
            <h2 className="">{t("create-new-ticket")}</h2>
            <p className="text-black">{t("create-new-ticket-p")}</p>
            <button className=" btn btn-light custfontbtn btncolor white-c d-flex justify-content-center align-items-center gap-2">
              <Techcard />
              {t("create-new-ticket-button")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
