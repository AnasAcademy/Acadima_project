import React from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";

import logo from "@/assets/Sidebar icons/sidebarLogo.png";

export default function ServiceCards() {
  const t = useTranslations("services");
  const services = t.raw("items");

  return (
    <div className="container ">
      <h3 className="custsubtitle mb-4">{t("title")}</h3>
      <div className="row gy-4">
        {services.map((service, index) => (
          <div className="col-12 col-md-6 col-lg-6 col-xl-4 " key={index}>
            <div className="cardbg p-4 rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between align-items-center align-items-md-start min-serv-ht">
              <div>
                <div className="d-flex justify-content-center justify-content-md-start  align-items-center mb-3 gap-2 ">
                  <Image src={logo} alt="acadimaLogo" className="" width={24} />
                  <h4 className="custcalendartit m-0">{service.title}</h4>
                </div>
                <p className="custfont m-0  " style={{ fontSize: "13px" }}>
                  {service.description}
                </p>
              </div>
              <div className="d-flex justify-content-start align-items-center mt-4 gap-2">
                <button
                  className="btn custButt-outline-secondary px-3 py-2 srv-btn-width"
                  style={{
                    pointerEvents: "none",
                    cursor: "default",
                    opacity: 1,
                  }}
                >
                  {service.price}
                </button>

                <button className="btn btn-light custfontbtn px-3 text-nowrap srv-btn-width">
                  {t("apply")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
