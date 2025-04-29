"use client";
import React from "react";
import wallet from "@/assets/wallet.png";
import timer from "@/assets/timer.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function InstallmentsPage() {
  const t = useTranslations("installments");
  const terms = t.raw("terms");

  return (
    <div className="row container justify-content-center">
      <h3 className="custsubtitle col-12 col-lg-8 mt-4">{t("title")}</h3>

      <div className="text-center text-white col-12 col-lg-8">
        {/* Summary Box */}
        <div
          className="border p-4 rounded-3 mb-4 d-flex flex-column justify-content-start align-items-start"
          style={{ borderColor: "#ccc" }}
        >
          <h5 className="mb-3 fw-bold text-white custsubtitle">
            {t("overview")}
          </h5>
          <p className="custfont">{t("programName")}</p>
          <p className="custfont d-flex flex-wrap align-items-center gap-3">
            <span className="d-flex align-items-center gap-1">
              <Image src={wallet} alt="wallet icon" width={20} height={16} />
              {t("installmentAmount")}
            </span>
            <span className="d-flex align-items-center gap-1">
              <Image src={timer} alt="timer icon" width={20} height={16} />
              {t("dueDate")}
            </span>
          </p>
        </div>

        {/* Terms Box */}
        <div className="border p-4 rounded-3 mb-4 d-flex flex-column justify-content-start align-items-start">
          <h5 className="mb-3 fw-bold text-white text-center">
            {t("termsTitle")}
          </h5>

          <p className="custfont mb-3">{t("termsIntro")}</p>

          <ol className="custfont d-flex flex-column justify-content-start align-items-start mt-4 p-0">
            {terms.map((item, index) => (
              <li
                className="mb-3 d-flex flex-column justify-content-start align-items-start"
                key={index}
              >
                <strong>{item.title}</strong>
                <div>{item.body}</div>
              </li>
            ))}
          </ol>

          <div
            className="alert alert-dark text-white mt-4"
            style={{
              backgroundColor: "#141F25",
              border: "none",
              borderRadius: "10px",
            }}
          >
            {t("importantNote")}
          </div>
        </div>

        <div className="d-flex justify-content-between mt-4 gap-3 flex-wrap">
          <button className="btn btn-secondary text-black px-4">
            {t("back")}
          </button>
          <button className="btn btn-secondary btn-light custfontbtn fs-6 px-4">
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
