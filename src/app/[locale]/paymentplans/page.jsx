import React from "react";
import { useTranslations } from "next-intl";
import PaymentsIcon from "@/assets/payments icons/Layer_1.svg";
import PaymentsCard from "@/components/PaymentsCard/PaymentsCard";






export default function Paymentplans() {
  const t = useTranslations();
  const info = t.raw("payments");

  const early_title = info.early_reg.title;
  const install_reg = info.install_reg.title;

  return (
    <>
      <div className="  container p-3 pt-lg-0 pt-5  mt-5 ">
        <div className=" d-flex gap-2">
          <PaymentsIcon className="iconSize2 iconcolor" />
          <h2 className="htitle">{info.title}</h2>
        </div>
        <h2 className="htitle mt-5">{info.program}</h2>

        <div className=" d-flex row  ">

          <div className=" mt-4 d-flex gap-3 col-12  col-sm-12  col-md-6 col-lg-6  col-xl-6   ">
            <PaymentsCard info={info} title={early_title} />
          </div>

          <div className=" mt-4 d-flex gap-3  col-12  col-sm-12   col-md-6  col-lg-6 col-xl-6   ">
            <PaymentsCard info={info} title={install_reg} />
          </div>

        </div>

        <div className=" mt-5">
          <h4> {info.or_contact}</h4>
          <button className="btn btn-light custfontbtn px-3 text-nowrap srv-btn-width mt-2">
            <a className="  "> {info.book_call}</a>
          </button>
        </div>
      </div>
    </>
  );
}
