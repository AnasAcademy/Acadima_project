"use client";
import React from "react";
import wallet from "@/assets/wallet.png";
import timer from "@/assets/timer.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Money from "@/assets/wallet.svg";


export default function InstallmentsConditionsPage() {
  const t = useTranslations("installments-conditions");
  const terms = t.raw("terms");

  return (
    <div className="container my-5">
      <div className="row container justify-content-center">
        <h3 className="custsubtitle col-12 col-lg-8 my-4">{t("title")}</h3>

        <div className="text-center text-dark col-12 col-lg-8">
          {/* Summary Box */}
          <div
            className=" cardbg p-4 rounded-3 mb-4 d-flex flex-column justify-content-start align-items-start"
          >
            <h5 className="mb-3 fw-bold custsubtitle">{t("overview")}</h5>
            <p className="custfont">{t("programName")}</p>
            <p className="custfont d-flex flex-wrap align-items-center gap-3">
              <span className="d-flex align-items-center gap-1">
                <Money className=" iconSize1" />
                {t("installmentAmount")}
              </span>
              <span className="d-flex align-items-center gap-1">
                <Money className=" iconSize1" />
                {t("dueDate")}
              </span>
            </p>
          </div>

          {/* Terms Box */}
          <div className=" cardbg p-4 rounded-3 mb-4 d-flex flex-column justify-content-start align-items-start">
            <h5 className="mb-3 fw-bold text-dark text-center">
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
              className="alert alert-dark text-dark mt-4 w-100"
              style={{
                backgroundColor: "#1EE0BB",
                border: "none",
                borderRadius: "10px",
              }}
            >
              {t("importantNote")}
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4 gap-3 flex-wrap">
            <Link href="/paymentplans">
              <button className="btn btn-secondary text-white px-4">
                {t("back")}
              </button>
            </Link>
            <Link href="/checkout">
              <button className="btn btn-secondary btn-light custfontbtn fs-6 px-4">
                {t("confirm")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
