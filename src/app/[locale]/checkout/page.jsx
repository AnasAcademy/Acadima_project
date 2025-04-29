import Image from "next/image";
import React from "react";
import image from "@/assets/payments icons/Rectangle 174.png";
import line from "@/assets/payments icons/Line 57.svg";

import { useTranslations } from "next-intl";

export default function Checkout() {
  const t = useTranslations();
  const info = t.raw("comp-pay");

  return (
    <>
      <div className="   container p-3  mt-5 ">
        <div className="row">
          <div className=" position-relative col-xl-7 col-lg-7 col-sm-12 col-12">
            <div className=" position-absolute centered-absolut z-3 ">
              <h2 className="htitle  "> {info.page_title} </h2>
              <h4 className="htitle  ">{info.page_subtitle}</h4>
            </div>
            <Image
              src={image}
              alt="back-image"
              className="w-100 h-auto img-opacity"
            />
          </div>

          <h2 className="htitle mt-5  "> {info.section_title} </h2>
          <div className="mt-5 col-xl-6 col-lg-6 col-sm-12 col-12">
            <h2 className="ad1  "> {info.coupon_instruction}</h2>
            <input
              type="text"
              className=" input bg-transparent border-light w-100 mt-4 p-2 rounded-2"
              placeholder={info.coupon_placeholder}
            />
            <button className="btn btn-light custfontbtn px-3 text-nowrap srv-btn-width mt-4">
              {info.validate_button}
            </button>
          </div>

          <div className="mt-5 col-xl-6 col-lg-6 col-sm-12 col-12">
            <div className=" d-flex justify-content-between">
              <h2 className="htitle  "> {info.subtotal} </h2>
              <h2 className="ad1 "> 559 $</h2>
            </div>

            <div className=" d-flex justify-content-start">
              <Image
                src={line}
                alt="line"
                className="w-100   bg-white  my-2"
                height={2}
              />
            </div>
            <div className=" d-flex justify-content-between">
              <h2 className="htitle  "> {info.discount} </h2>
              <h2 className="ad1 "> 0</h2>
            </div>

            <div className=" d-flex justify-content-start">
              <Image
                src={line}
                alt="line"
                className=" w-100   bg-white  my-2"
                height={2}
              />
            </div>

            <div className=" d-flex justify-content-between">
              <h2 className="htitle  "> {info.total} </h2>
              <h2 className="ad1 "> 559 $</h2>
            </div>
          </div>

          <div className=" d-flex justify-content-between col-12 align-items-center">
            <h2 className="ad1 mt-5 "> {info.amount_due}</h2>
            <button className="btn btn-light custfontbtn px-3 text-nowrap mt-4 ">
              {info.pay_button}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
