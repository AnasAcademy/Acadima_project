import Image from "next/image";
import React from "react";
import rectangleImg from "@/assets/payments icons/Rectangle-174.jpg";
// import LineSvg from "@/assets/payments icons/Line 57.svg";

import { useTranslations } from "next-intl";

export default function Checkout() {
  const t = useTranslations();
  const info = t.raw("comp-pay");

  return (
    <>
      <div className="position-relative col-12 d-flex flex-column justify-content-center align-items-center p-0 hero-height">
        {/* Blurred Background Image Layer */}
        <img
          src={rectangleImg.src}
          alt="Background"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            objectFit: "cover",
            filter: "brightness(0.8) blur(2px)", // Adjust intensity as needed
            zIndex: 0,
          }}
        />

        {/* Foreground Content (Text) */}
        <div className="position-relative col-xl-8 col-10 z-1 d-flex flex-column justify-content-center align-items-sart h-100">
          <h1 className="text-white">{info.page_title}</h1>
          <h1 className="text-white">{info.page_subtitle}</h1>
        </div>
      </div>

      <div className="   container-lg p-4 p-lg-3  mb-5">
        <div className="row">
          <h2 className="htitle mt-0 mt-lg-5  "> {info.section_title} </h2>
          <div className="mt-5 col-xl-6 col-lg-6 col-sm-12 col-12">
            <h2 className="ad1  "> {info.coupon_instruction}</h2>
            <input
              type="text"
              className=" input bg-transparent w-100 mt-4 p-2 rounded-2"
              placeholder={info.coupon_placeholder}
            />
            <button className="btn btn-light custfontbtn px-3 text-nowrap srv-btn-width mt-4">
              {info.validate_button}
            </button>
          </div>

          <div className="mt-5 col-xl-6 col-lg-6 col-sm-12 col-12">
            <div className=" d-flex justify-content-between align-items-center border-bottom py-2">
              <h2 className="htitle  "> {info.subtotal} </h2>
              <h2 className="ad1 "> 559 $</h2>
            </div>

            {/* <div className=" d-flex justify-content-start">
              <div className="w-100 bg-white my-2">
                <LineSvg />
              </div>
            </div> */}
            <div className=" d-flex justify-content-between align-items-center border-bottom py-2">
              <h2 className="htitle  "> {info.discount} </h2>
              <h2 className="ad1 "> 0</h2>
            </div>

            {/* <div className=" d-flex justify-content-start">
              <div className="w-100 bg-white my-2">
                <LineSvg />
              </div>
            </div> */}

            <div className=" d-flex justify-content-between align-items-center py-2">
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
