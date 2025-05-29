import Image from "next/image";
import React from "react";
import line from "@/assets/payments icons/Line 54.png";
import CheckIcon from "@/assets/payments icons/Vector.svg";
import Line from "@/assets/calendar/Line 50.svg";
import Rs from '@/assets/payments icons/rs.svg'


export default function PaymentsCard({ info, title }) {
  return (
    <>
      <div className=" w-100  ">
        <div className="row d-flex gy-4">
          <div className=" d-flex  flex-column gap-4">
            <div className="cardbg p-4 rounded-4 shadow-sm  w-100 d-flex flex-column min-pay-ht ">
              <div className=" d-flex gap-4 flex-xl-row flex-lg-column flex-column  justify-content-lg-center  justify-content-xl-start   align-items-center   text-center align-items-xl-start  text-lg-center  text-xl-start   ">
                <div>
                  <div>
                    <div className="d-flex flex-column  mb-2 gap-2">
                      <h4 className="custsubtitle3 text-lg-center  text-center  text-xl-end ">
                        {title}
                      </h4>
                      <h5 className="ftnote text-lg-center text-center  text-xl-end">
                        {info.install_reg.vat_note}
                      </h5>
                    </div>
                    <p className="pricetit text-lg-center  text-center  text-xl-end d-flex gap-2 align-items-center justify-content-center">
                      {info.early_reg.price}
                      <Rs className="iconcolor" />
                    </p>

                    <div className=" d-flex   d-lg-flex d-xl-none">
                      <Line width={250} />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start align-items-center  gap-2 mt-1">
                    <div className=" d-xl-flex   d-lg-none  d-none">
                      <button className="btn btn-light custfontbtn px-3 text-nowrap srv-btn-width">
                        <a className="d-xl-flex d-lg-flex d-sm-none d-none  ">
                          {" "}
                          {info.early_reg.button}
                        </a>
                      </button>
                    </div>
                  </div>
                </div>

                <div className=" d-xl-flex   d-lg-none d-none">
                  <Image src={line} alt="line icon" />
                </div>

                <div className="  d-flex  flex-column gap-2">
                  <div className="d-flex gap-2">
                    <CheckIcon className="iconcolor iconSize3" />
                    <h3 className="ftnote">{info.early_reg.notes[0]}</h3>
                  </div>
                  <div className="d-flex gap-2">
                    <CheckIcon className="iconcolor iconSize3" />
                    <h3 className="ftnote">{info.early_reg.notes[0]}</h3>
                  </div>
                </div>

                <div className=" d-xl-none d-lg-flex d-flex">
                  <button className="btn btn-light custfontbtn  text-nowrap srv-btn-width">
                    <a className=""> {info.early_reg.button}</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
