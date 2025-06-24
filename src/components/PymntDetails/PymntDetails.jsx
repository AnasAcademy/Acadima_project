import React from "react";
import { useTranslations } from "next-intl";
import Download from "@/assets/admin/download.svg";

export default function PymntDetails() {
  const t = useTranslations("SubMan");

  return (
    <>
      <div className=" cardbg p-3 min-yourplan-ht ">
        <h3 className=" hvvv text-dark  tit-18-700    p-3 m-4  mb-0 mt-0  ">
          {" "}
          {t("payment_details")}{" "}
        </h3>

        <div className=" d-flex gap-4 flex-column m-4 mt-1">
          <div className="d-flex justify-content-between p-3  rounded-4  newbg">
            <div>
              <h4 className="Tit-14-700"> {t("payment_operation")} </h4>
              <p className=" d-flex flex-column">
                <span className="tit-12-400">{t("subscriptionAmount")}</span>
                <span className="tit-12-400">{t("emaill")}</span>
                <span className="tit-12-400"> {t("referenceNumber")}</span>
              </p>
            </div>
            <div className=" d-flex gap-2 p-3">
              <Download />
              <h3 className="Tit-12-700 text-nowrap">
                {" "}
                {t("download_receipt")}{" "}
              </h3>
            </div>
          </div>

          <div className="d-flex justify-content-between p-3    rounded-4  newbg">
            <div>
              <h4 className="Tit-14-700"> {t("payment_operation")} </h4>
              <p className=" d-flex flex-column">
                <span className="tit-12-400">{t("subscriptionAmount")}</span>
                <span className="tit-12-400">{t("emaill")}</span>
                <span className="tit-12-400"> {t("referenceNumber")}</span>
              </p>
            </div>
            <div className=" d-flex gap-2  p-3">
              <Download />
              <h3 className="Tit-12-700 text-nowrap">
                {" "}
                {t("download_receipt")}{" "}
              </h3>
            </div>
          </div>
          <div className="d-flex justify-content-between p-3   rounded-4  newbg">
            <div>
              <h4 className="Tit-14-700"> {t("payment_operation")} </h4>
              <p className=" d-flex flex-column">
                <span className="tit-12-400">{t("subscriptionAmount")}</span>
                <span className="tit-12-400">{t("emaill")}</span>
                <span className="tit-12-400"> {t("referenceNumber")}</span>
              </p>
            </div>

            <div className=" d-flex gap-2  p-3">
              <Download />
              <h3 className="Tit-12-700 text-nowrap">
                {t("download_receipt")}{" "}
              </h3>
            </div>
          </div>

          <div className="d-flex justify-content-between p-3  rounded-4  newbg">
            <div>
              <h4 className="Tit-14-700"> {t("payment_operation")} </h4>
              <p className=" d-flex flex-column">
                <span className="tit-12-400">{t("subscriptionAmount")}</span>
                <span className="tit-12-400">{t("emaill")}</span>
                <span className="tit-12-400"> {t("referenceNumber")}</span>
              </p>
            </div>

            <div className=" d-flex gap-2  p-3">
              <Download />
              <h3 className="Tit-12-700 text-nowrap">
                {t("download_receipt")}{" "}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
