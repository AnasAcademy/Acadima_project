import Image from "next/image";
import React from "react";
import line from "@/assets/payments icons/Line 54.png";
import check from "@/assets/payments icons/Vector.svg";

export default function PaymentsCard({ info, title }) {
  return (
    <>
      <div className=" w-100 ">
        <div className="row d-flex gy-4">
          <div className=" d-flex  flex-column gap-4">
            <div className="cardbg p-4 rounded-4 shadow-sm  w-100 d-flex flex-column justify-content-between align-items-center align-items-md-start">
              <div className=" d-flex gap-4">
                <div>
                  <div>
                    <div className="d-flex   flex-column  mb-2 gap-2">
                      <h4 className="custsubtitle3 ">{title}</h4>
                      <h5 className="ftnote">{info.install_reg.vat_note}</h5>
                    </div>
                    <p className="pricetit">{info.early_reg.price}</p>
                  </div>
                  <div className="d-flex justify-content-start align-items-center  gap-2 mt-1">
                    <button className="btn btn-light custfontbtn px-3 text-nowrap srv-btn-width">
                      <a className="d-xl-flex d-lg-flex d-sm-none d-none  ">
                        {" "}
                        {info.early_reg.button}
                      </a>
                    </button>
                  </div>
                </div>

                <div>
                  <Image src={line} alt="line icon" />
                </div>

                <div className="  d-flex  flex-column gap-2">
                  <div className="d-flex gap-2">
                    <Image src={check} alt="check" />
                    <h3 className="ftnote">{info.early_reg.notes[0]}</h3>
                  </div>
                  <div className="d-flex gap-2">
                    <Image src={check} alt="check" />
                    <h3 className="ftnote">{info.early_reg.notes[0]}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
